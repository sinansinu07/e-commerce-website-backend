const mongoose = require('mongoose')

const { Schema, model } = mongoose

const orderSchema = new Schema ({
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    lineItems: [
        {
            product: {
                type: Schema.Types.ObjectId,
                ref: 'Product'
            },
            quantity: {
                type: Number,
                default: 1
            },
            price: Number
        }
    ],
    totalAmount: Number,
    status: {
        type: String,
        enum: ['Placed', 'Canceled', 'Dispatched', 'Delivered'],
        default: "Placed"
    },
    payment : {
        type: Schema.Types.ObjectId,
        ref: 'Payment'
    }
}, { timestamps : true })

const Order = model('Order', orderSchema)

module.exports = Order