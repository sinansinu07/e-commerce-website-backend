const express = require('express')
const router = express.Router()
const paymentsCltr = require('../controllers/payment-controller')
const authenticateUser = require('../middlewares/auth')

router
    .route('/')
        .post(authenticateUser, paymentsCltr.payment)
router
    .route('/:id/success')
        .put(authenticateUser, paymentsCltr.successUpdate)
router
    .route('/:id/failed')
        .put(authenticateUser, paymentsCltr.failedUpdate)

module.exports = router