const express = require('express')
const router = express.Router()

const addressCltr = require('../controllers/address-controller')
const authenticateUser = require('../middlewares/auth')

router
    .route('/')
        .post(authenticateUser, addressCltr.create)
        .get(authenticateUser, addressCltr.myAddresses)
router
    .route('/:id')
        .delete(authenticateUser, addressCltr.delete)
        .put(authenticateUser, addressCltr.update)
router
    .route('/:id/setDefault')
        .put(authenticateUser, addressCltr.setDefault)

module.exports = router