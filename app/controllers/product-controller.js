const Product = require('../models/product-model')
const cloudinary = require('../../config/cloudinary')
const _ = require('lodash');
const productCltr = {}

// Get all products
productCltr.getAllProducts = async (req, res)=>{
    try{
        const products = await Product.find();
        res.status(201).json(products)
    }catch(err){
        res.status(500).json('Internal Server Error')
    }
}

// create product
productCltr.create = async (req, res)=>{
    // const errors = validationResult(req)
    // if(!errors.isEmpty()){
    //     return res.status(400).json({error:errors.array()})
    // }
    // console.log(req)
    const body = _.pick(req.body, ['productName', 'description', 'price', 'size', 'color'])
    console.log(body)
    const product = new Product(body)
    try {
        const image = req.files.productImage;
        console.log('Image file:', image);

        const result = await cloudinary.uploader.upload(image.tempFilePath, {
            folder: "products"
        });
        console.log('Cloudinary response:', result);

        product.productImage = { image_url: result.secure_url };
        console.log('Product with image:', product);

        const productObj = await product.save();
        res.status(201).json(productObj);
    } catch (err) {
        console.error('Error uploading image:', err);
        res.status(500).json('Internal Server Error');
    }
}

// update product
productCltr.update = async (req, res) => {
    // const errors = validationResult(req)
    // if (!errors.isEmpty()) {
    //   return res.status(400).json({ error: errors.array() })
    // }
    const body = _.pick(req.body, ['productName', 'description', 'price', 'size', 'color'])
    try{
        const image = req.files.productImage
        const {files} = req
        if (files && files.productImage) {
            const result = await cloudinary.uploader.upload(image.tempFilePath,{
                folder : "products"
            })
            body.productImage = { image_url : result.secure_url }
        }
      const productObj = await Product.findByIdAndUpdate(req.params.id, body, { new: true })
      res.status(201).json(productObj)
    }
    catch(err){
        res.status(500).json('Internal Server Error');
    }
  }

productCltr.delete = async(req,res)=>{
    const id = req.params.id
    try{
        const product = await  Product.findByIdAndDelete(id)
        res.status(201).json(product)
    }catch(err){
        res.status(500).json('Internal Server Error')
    }
}
module.exports = productCltr