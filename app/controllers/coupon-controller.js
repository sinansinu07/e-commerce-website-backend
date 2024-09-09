const Coupon = require('../models/coupon-model')
const Order = require('../models/order-model')

const couponCltr = {}

couponCltr.createCoupon1 = async (req, res) => {
    const orderId = req.params.id
    try {
        const coupon = new Coupon(req.body)
        coupon.customer = req.user.id
        coupon.order = orderId
        coupon.couponCode = "10%OFF"
        coupon.description = "A 10% discount for the next purchase."
        coupon.discount = 10
        const order = await Order.findById(orderId)
        coupon.startDate = order.createdAt
        const endDate = new Date(coupon.startDate)
        endDate.setMonth(endDate.getMonth() + 1)
        coupon.endDate = endDate
        await coupon.save()
        const newCoupon = await Coupon.findById(coupon._id).populate('customer', ['userName', 'email'])
        res.status(201).json(newCoupon)
    } catch(err) {
        res.status(500).json({ message: 'Internal Server Error' })
    }
}

couponCltr.createCoupon2 = async (req, res) => {
    const orderId = req.params.id
    try {
        const coupon = new Coupon(req.body)
        coupon.customer = req.user.id
        coupon.order = orderId
        coupon.couponCode = "20%OFF"
        coupon.description = "A 20% discount for the next purchase."
        coupon.discount = 20
        const order = await Order.findById(orderId)
        coupon.startDate = order.createdAt
        const endDate = new Date(coupon.startDate)
        endDate.setMonth(endDate.getMonth() + 1)
        coupon.endDate = endDate
        await coupon.save()
        const newCoupon = await Coupon.findById(coupon._id).populate('customer', ['userName', 'email'])
        res.status(201).json(newCoupon)
    } catch(err) {
        res.status(500).json({ message: 'Internal Server Error' })
    }
}

couponCltr.list = async (req, res) => {
    try {
        const coupons = await Coupon.find({ customer : req.user.id }).populate('customer', ['userName', 'email'])
        res.status(201).json(coupons)
    } catch(err) {
        res.status(500).json({ message: 'Internal Server Error' })
    }
}

module.exports = couponCltr