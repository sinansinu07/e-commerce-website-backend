const jwt = require('jsonwebtoken')

const authenticateUser = async (req, res, next) => {
    const token = req.headers['authorization']
    if(!token) {
        return res.status(401).json({ error: 'Token is Required' })
    }
    try {
        const tokenData =jwt.verify(token, process.env.JWT_SECRET)
        // console.log(tokenData)
        req.user = {
            id : tokenData.id
        }
        next()
    } catch(err) {
        res.status(401).json({ error: 'UnAuthorized/Invalid token' })
    }
}

module.exports = authenticateUser