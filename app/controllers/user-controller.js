const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../models/user-model')

const userCltr = {}

userCltr.register = async (req, res) =>{
    const { body } = req
    const user = new User(body)
    console.log(body)
    try {
        const salt = await bcrypt.genSalt()
        const encryptedPassword = await bcrypt.hash(user.password, salt)
        user.password = encryptedPassword
        await user.save()
        res.status(201).json(user)
    } catch(err) {
        res.status(500).json({error:'Internal Server Error'})
        console.error(err)
    }
}

userCltr.login = async (req, res) => {
    const { body } = req
    console.log(body)
    try {
        console.log(body)
        const user = await User.findOne({$or:[{ 'phone.number' : body.username}, {email : body.username}]})
        if(!user) {
            return res.status(401).json({error: '1, Invalid Username/Password'})
        }

        const checkPassword = await bcrypt.compare(body.password, user.password)
        if(!checkPassword) {
            return res.status(401).json({error: '2, Invalid Username/Password'})
        }
        const tokenData = {
            id : user._id
        }
        console.log(tokenData)
        const token = jwt.sign(tokenData, process.env.JWT_SECRET, {expiresIn: '7d'})
        const newUser = await User.findOneAndUpdate({$or:[{'phone.number':body.username}, {email:body.username}]}, {jwtToken: token}, {new: true})
        res.status(201).json({token : token, user : newUser})
    } catch(err) {
        res.status(500).json({error:'Internal Server Error'})
    }
}

userCltr.account =async (req,res)=>{
    try{
        const user = await(User.findById(req.user.id).select({password:0}))
        res.status(201).json(user)
    }catch(err){
        res.status(500).json({error:"Internal Server Error"})
    }
}

module.exports = userCltr