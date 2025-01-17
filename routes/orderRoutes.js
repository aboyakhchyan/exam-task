const express = require('express')
const authMiddleware = require('../middlewares/authMiddleware')
const controller = require('../controllers/orderController')
const router = express.Router()

router.post('/products/:id/reviews', authMiddleware, controller.addReview)

module.exports = router