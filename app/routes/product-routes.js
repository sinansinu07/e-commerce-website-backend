const express = require('express')
const router = express.Router()
const productCltr = require('../controllers/product-controller')

router
    .route('/')
        .get(productCltr.getAllProducts)
        .post(productCltr.create)
router
    .route('/:id')
        .delete(productCltr.delete)
        .put(productCltr.update)
        
module.exports= router
