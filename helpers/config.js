require('dotenv').config()

class Config {
    static port = process.env.PORT
    static host = process.env.HOST
    static jwtSecret = process.env.JWT_SECRET
}

module.exports = Config