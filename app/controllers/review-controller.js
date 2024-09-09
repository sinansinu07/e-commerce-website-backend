const Review = require("../models/review-model")

const reviewCltr = {}

reviewCltr.create = async (req, res) => {
    const { body } = req
    try {
        const review = new Review(body)
        await review.save()
        res.status(201).json(review)
    } catch(err) {
        res.status(500).json({ message: 'Internal Server Error' })
    }
}

reviewCltr.list = async (req, res) => {
    try {
        const reviews = await Review.find()
        res.status(201).json(reviews)
    } catch(err) {
        res.status(500).json({ message: 'Internal Server Error' })
    }
}

module.exports = reviewCltr