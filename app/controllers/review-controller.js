const Review = require("../models/review-model")

const reviewCltr = {}

reviewCltr.create = async (req, res) => {
    const productId = req.params.id
    const { body } = req
    const review = new Review(body)
    try {
        review.customer = req.user.id
        review.product = productId
        const savedReview = await review.save()
        res.status(201).json(savedReview)
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