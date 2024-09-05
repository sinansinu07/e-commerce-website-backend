const mongoose = require('mongoose')

const { Schema, model } = mongoose

const productSchema = new Schema({
    productName: String,
    description: String,
    price: Number,
    size: String,
    color: String,
    productImage: {
        image_url: {
                type: String,
                required: true
            }
    }
},{timestamps : true})

const  Product = model("Product", productSchema)

module.exports=  Product;