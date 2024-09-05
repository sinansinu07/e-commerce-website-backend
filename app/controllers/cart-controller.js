// const { validationResult } = require('express-validator')
const Cart = require('../models/cart-model')
const Product = require('../models/product-model')

const cartCltr = {}

cartCltr.create = async (req, res) => {
    // const errors = validationResult(req)
    // if(!errors.isEmpty()) {
    //     return res.status(400).json({ error : errors.array() })
    // }
    const body = req.body
    const cartObj = {...body}
    // console.log("cart Obj", cartObj)
    try {
        cartObj.customer = req.user.id

        cartObj.totalAmount = cartObj.lineItems.reduce((acc, cv) => {
            return acc + cv.quantity * cv.price
        }, 0)
        
        const oldCart = await Cart.findOne({ customer : req.user.id })

        const oldCartAmount = oldCart && oldCart.totalAmount
        // console.log(cartObj)
        if(oldCart) {
            // console.log("cartObj", cartObj)
            // console.log("oldCart", oldCart)
            const oldLineItems = oldCart.lineItems.find((ele) => ele.product == cartObj.lineItems[0].product)
            if(oldLineItems) {
                console.log("Increment quantity of the same LineItem")
                oldCart.lineItems.forEach((ele) => {
                    if(ele.product == cartObj.lineItems[0].product) {
                        ele.quantity += 1
                    }
                })
                oldCart.totalAmount = oldCart.lineItems.reduce((acc, cv) => {
                    return acc + cv.quantity * cv.price
                }, 0)
                // console.log("changed Old cart", oldCart)
                await oldCart.save()
                const newCart = await Cart.findById(oldCart._id)
                        .populate('customer', ['userName', 'email'])
                            .populate('lineItems.product', ['productName', 'description', 'price', 'size', 'color', 'productImage'])
                res.status(200).json(newCart)
            } else {
                console.log("Add items to lineItems")
                // console.log(oldCart)
                // console.log(cartObj)
                for(let i = 0; i < cartObj.lineItems.length ; i++) {
                    oldCart.lineItems.push(cartObj.lineItems[i])
                    oldCart.totalAmount = cartObj.totalAmount + oldCartAmount
                }
                // console.log(oldCart)
                await oldCart.save()
                const newCart = await Cart.findById(oldCart._id)
                        .populate('customer', ['userName', 'email'])
                            .populate('lineItems.product', ['productName', 'description', 'price', 'size', 'color', 'productImage'])
                res.status(200).json(newCart)
                console.log(newCart)
            }
        } else {
            console.log("create new Cart")
            const cart = await Cart.create(cartObj)
            const newCart = await Cart.findById(cart._id)
                    .populate('customer', ['userName', 'email'])
            res.status(200).json(newCart)
        }
        
    } catch(err) {
        res.status(500).json('Internal Server Error')
        console.group(err)
    }
}

cartCltr.myCart = async (req, res) => {
    const id = req.user.id
    // console.log(id)
    try {
        const cart = await Cart.findOne({ customer : id })
                .populate('customer', ['userName', 'email'])
                    .populate('lineItems.product', ['productName', 'description', 'price', 'size', 'color', 'productImage'])
        res.status(200).json(cart)
    } catch(err) {
        res.status(500.).json('Internal Server Error')
    }
}

cartCltr.emptyCart = async (req, res) => {
    const id = req.user.id
    // console.log(id)
    try {
        const cart = await Cart.findOneAndDelete({ customer : id })
        res.status(200).json(cart)
    } catch(err) {
        res.status(500.).json('Internal Server Error')
    }
}

cartCltr.incQty = async (req, res) => {
    const productId = req.params.id
    try {
        const cart = await Cart.findOne({ customer : req.user.id })
        // console.log(cart)
        cart.lineItems.forEach((ele) => {
            if(ele.product == productId) {
                ele.quantity ++
                // console.log("Product found")
            }
        })
        cart.totalAmount = cart.lineItems.reduce((acc, cv) => {
            return acc + cv.quantity * cv.price
        }, 0)

        // console.log(cart)
        await cart.save()
        const newCart = await Cart.findById(cart._id)
                .populate('customer', ['userName', 'email'])
                    .populate('lineItems.product', ['productName', 'description', 'price', 'size', 'color', 'productImage'])
        res.status(200).json(newCart)
    } catch(err) {
        res.status(500.).json('Internal Server Error')
    }
}

cartCltr.decQty = async (req, res) => {
    const productId = req.params.id
    try {
        const cart = await Cart.findOne({ customer : req.user.id })
        // console.log(cart)
        cart.lineItems.forEach((ele) => {
            if(ele.product == productId) {
                ele.quantity --
                // console.log("product found")
            }
        })
        cart.totalAmount = cart.lineItems.reduce((acc, cv) => {
            return acc + cv.quantity * cv.price
        }, 0)

        // console.log(cart)
        await cart.save()
        const newCart = await Cart.findById(cart._id)
                .populate('customer', ['userName', 'email'])
                    .populate('lineItems.product', ['productName', 'description', 'price', 'size', 'color', 'productImage'])
        res.status(200).json(newCart)
    } catch(err) {
        res.status(500.).json('Internal Server Error')
    }
}

cartCltr.removeLineItem = async (req, res) => {
    const productId = req.params.id
    try {
        const cart = await Cart.findOne({ customer : req.user.id })
        // console.log(cart)
        const newArr = cart.lineItems.filter((ele) => ele.product != productId)
        // console.log(newArr)
        cart.lineItems = newArr
        cart.totalAmount = cart.lineItems.reduce((acc, cv) => {
            return acc + cv.quantity * cv.price
        }, 0)
        // console.log(cart)
        await cart.save()
        const newCart = await Cart.findById(cart._id)
                .populate('customer', ['userName', 'email'])
                    .populate('lineItems.product', ['productName', 'description', 'price', 'size', 'color', 'productImage'])
        res.status(200).json(newCart)
    } catch(err) {
        res.status(500.).json('Internal Server Error')
    }
}

module.exports = cartCltr