const express = require('express')
const router = express.Router()

const userCltr = require('../controllers/user-controller')
const authenticateUser = require('../middlewares/auth')
router
    .route('/register/')
        .post(userCltr.register)
router
    .route('/login/')
        .post(userCltr.login)
router
    .route('/account/')
        .get(authenticateUser, userCltr.account)

module.exports = router