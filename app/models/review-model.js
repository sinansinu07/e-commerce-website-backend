const mongoose = require('mongoose')

const { Schema, model } = mongoose

const reviewSchema = new Schema({
    name: String,
    email: String,
    rating: {
        type: Number,
        required: true
    },
    description: String
}, {timestamps: true})

const Review = model('Review', reviewSchema)

module.exports = Review