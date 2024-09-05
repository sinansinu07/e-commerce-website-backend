const Cart = require('../models/cart-model')
const Order = require('../models/order-model')
const Payment = require('../models/payment-model')

const {pick} = require('lodash')

const orderCltr = {}

orderCltr.create = async (req, res) => {
    const paymentId = req.params.id
    const body = req.body
    const orderObj = { ...body }
    try {
        orderObj.customer = req.user.id
        const cart = await Cart.findOne({ customer : req.user.id })
        // console.log(cart)
        orderObj.lineItems = cart.lineItems
        orderObj.totalAmount = cart.totalAmount
        // orderObj.status = "Placed"
        const payment = await Payment.findOne({_id : paymentId, customer : req.user.id })
        // console.log("payment", payment)
        if(payment) {
            if(payment.paymentStatus == 'Successful') {
                // orderObj.payment = payment.transactionId
                const order = await Order.create(orderObj)
                // console.log("Order Obj", order)
                const newOrder = await Order.findById(order._id)
                        .populate('customer', ['username', 'email'])
                            .populate('lineItems.product', ['productName', 'description', 'price', 'size', 'color', 'productImage'])
                                // .populate('payment', ['transactionId', 'paymentStatus'])
                await Cart.findByIdAndDelete(cart._id)
                // console.log("new order", newOrder)
                res.status(201).json(newOrder)
            }
        }
    } catch(err) {
        res.status(500).json('Internal Server Error')
    }
}

orderCltr.cancelOrder = async (req, res) => {
    const orderId = req.params.id
    const body = pick(req.body, ['status'])
    try {
        const canceledOrder = await Order.findByIdAndUpdate(orderId, body)
        // console.log(canceledOrder)
        res.status(201).json(canceledOrder)
        // await Order.findByIdAndDelete(orderId)
    } catch(err) {
        res.status(500).json('Internal Server Error')
    }
}

orderCltr.getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({customer : req.user.id, status : "Placed"}).sort({ createdAt : -1 })
                .populate('customer', ['username','email'])
                    .populate('lineItems.product', ['productName', 'description', 'price', 'size', 'color', 'productImage'])
                        // .populate('payment', ['transactionId', 'paymentStatus'])
        // console.log(orders)
        res.status(201).json(orders)
    } catch(err) {
        res.status(500).json('Internal Server Error')
    }
}

module.exports = orderCltr