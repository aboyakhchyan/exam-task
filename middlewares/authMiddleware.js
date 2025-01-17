const jwt = require('jsonwebtoken')
const Config = require('../helpers/config')

const authMiddleware = (req, res, next) => {
    try {
        const auth = req.headers['authorization']
        const [key, token] = auth.split(' ')

        const user = jwt.verify(token, Config.jwtSecret)

        if(!user) {
            return res.status(403).json({message: 'user is not verified'})
        }

        req.user = user
        next()
    }catch (err){
        return res.status(403).json({message: 'user is not verified'})
    }
}

module.exports = authMiddleware