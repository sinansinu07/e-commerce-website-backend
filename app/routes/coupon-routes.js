const express = require('express')
const router = express.Router()
const couponCltr = require('../controllers/coupon-controller')
const authenticateUser = require('../middlewares/auth')

router
    .route('/:id/coupon1')
        .post(authenticateUser, couponCltr.createCoupon1)
router
    .route('/:id/coupon2')
        .post(authenticateUser, couponCltr.createCoupon2)
router 
    .route('/myCoupons')
        .get(authenticateUser, couponCltr.list)

module.exports = router