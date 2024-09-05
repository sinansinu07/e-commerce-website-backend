const mongoose = require('mongoose')

const { Schema, model } = mongoose

const reviewSchema = new Schema({
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    },
    rating: {
        type: Number,
        required: true
    },
    description: String
})

const Review = model('Review', reviewSchema)

module.exports = Review