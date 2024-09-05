require('dotenv').config()
const express = require('express')
const fileupload = require('express-fileupload')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 5002

const configureDB = require('./config/db')
configureDB()

app.use(cors())
app.use(express.json())
app.use(fileupload({useTempFiles: true}))

const userRoutes = require('./app/routes/user-routes')
app.use('/api/user', userRoutes)

const addressRoutes = require('./app/routes/address-routes')
app.use('/api/user/address', addressRoutes)

const productRoutes = require('./app/routes/product-routes')
app.use('/api/products', productRoutes)

const cartRoutes = require('./app/routes/cart-routes')
app.use('/api/user/cart', cartRoutes)

const orderRoutes = require('./app/routes/order-routes')
app.use('/api/user/orders', orderRoutes)

const paymentRoutes = require('./app/routes/payment-routes')
app.use('/api/user/payments', paymentRoutes)

const reviewRoutes = require('./app/routes/review-routes')
app.use('/api/reviews', reviewRoutes)

const couponRoutes = require('./app/routes/coupon-routes')
app.use('/api/user/coupons', couponRoutes)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})