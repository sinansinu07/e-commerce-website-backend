const mongoose = require('mongoose')
require('dotenv').config()
const configureDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log('Connected to MongoDB')
    } catch(err) {
        console.error('Error Connecting to MongoDB', err)
    }
}

module.exports = configureDB