const express = require('express')
const router = express.Router()

const orderCltr = require('../controllers/order-controller')
const authenticateUser = require('../middlewares/auth')

router
    .route('/:id')
        .post(authenticateUser, orderCltr.create)
        .put(authenticateUser, orderCltr.cancelOrder)
router
    .route('/myOrders')
        .get(authenticateUser, orderCltr.getMyOrders)


module.exports = router