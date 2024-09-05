const Payment = require('../models/payment-model')
const Cart = require('../models/cart-model')
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const {pick} = require('lodash')
const Product = require('../models/product-model')
const paymentsCltr={}

paymentsCltr.payment = async (req, res)=>{
    const body = pick(req.body,['cart','amount'])
    const cart = await Cart.findOne({customer : req.user.id})
    try{
        if(cart) {
             //create a customer
            const customer = await stripe.customers.create({
                name: "Testing",
                address: {
                    line1: 'building-H',
                    postal_code: '500001',
                    city: 'Al-Karama',
                    state: 'Dubai',
                    country: 'UAE',
                },
            })
            
            //create a session object
            // console.log("cartLineItems", cart.lineItems)
            let productNames = await Promise.all(
                cart.lineItems.map(async (ele) => {
                const productId = String(ele.product);
                const product = await Product.findById(productId);
                return String(product.productName);
                })
            );
            // console.log("designNames", designNames)
            
            const lineItems = cart.lineItems.map((ele, i) => ({
                price_data: {
                    currency: 'inr',
                    product_data: {
                        name: String(productNames[i]), // assuming design has a name property
                    },
                    unit_amount: Number(ele.price) * 100,
                },
                quantity: Number(ele.quantity),
            }))
            // console.log("sessionLineItems", lineItems)
            const session = await stripe.checkout.sessions.create({
                payment_method_types:["card"],
                line_items:lineItems,
                mode:"payment",
                success_url:"http://localhost:3000/customer-container", //Change the url
                cancel_url: 'http://localhost:3000/cart',
                customer : customer.id
            })
            
            //create a payment
            const payment = new Payment(body)
            payment.customer = req.user.id
            payment.cart = cart._id
            payment.transactionId = session.id
            payment.amount = Number(cart.totalAmount)
            payment.paymentType = "card"
            await payment.save()
            res.json({id:session.id,url: session.url})
        } else {
            res.status(400).json({error: "Customer Cart is Empty" })
        }
    } catch(err){
        console.log(err)
        res.status(500).json({error:'Internal Server Error'})
    }
}

paymentsCltr.successUpdate=async(req,res)=>{
    try{
        const id = req.params.id
        const body = pick(req.body,['paymentStatus'])
        const updatedPayment = await Payment.findOneAndUpdate({transactionId:id}, body) 
        res.json(updatedPayment)
    }catch(err){
        console.log(err)
        res.status(500).json({error:'Internal Server Error'})
    }
}

paymentsCltr.failedUpdate=async(req,res)=>{
    try{
        const id = req.params.id
        const body = pick(req.body,['paymentStatus'])
        const updatedPayment = await Payment.findOneAndUpdate({transactionId:id}, body) 
        res.json(updatedPayment)
    }catch(err){
        console.log(err)
        res.status(500).json({error:'Internal Server Error'})
    }
}

module.exports = paymentsCltr