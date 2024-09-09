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
    discount: Number,
    description: String,
    startDate: Date,
    endDate: Date
}, {Timestamp : true})

const Coupon = model('Coupon', couponSchema)

module.exports = Coupon