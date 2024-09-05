const mongoose = require('mongoose')

const { Schema, model } = mongoose

const userSchema = new Schema({
    username: String,
    email: String,
    phone:{
        countryCode : String,
        number: String
    },
    password: String,
    jwtToken: {
        type: String,
        default: null
    }
}, {timestamps : true})

const User = model('User', userSchema)
module.exports = User