const mongoose = require('mongoose')

const { Schema, model } = mongoose

const couponSchema = new Schema({
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    order: {
        type: Schema.Types.ObjectId,
        ref: 'Order'
    },
    couponCode: String,
    description: String
})

const Coupon = model('Coupon', couponSchema)

module.exports = Coupon