const express = require('express')
const router = express.Router()
const reviewCltr = require('../controllers/review-controller')
// const authenticateUser = require('../middlewares/auth')

router
    .route('/')
        .post(reviewCltr.create)
        .get(reviewCltr.list)        

module.exports = router