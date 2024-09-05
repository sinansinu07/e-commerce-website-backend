const mongoose = require('mongoose')

const { Schema, model } = mongoose

const cartSchema = new Schema  ({
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
    totalAmount: Number
}, { timestamps: true })

const Cart = model('Cart', cartSchema)

module.exports = Cart