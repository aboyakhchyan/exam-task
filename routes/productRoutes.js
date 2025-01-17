const express = require('express')
const authMiddleware = require('../middlewares/authMiddleware')
const controller = require('../controllers/productController')
const router = express.Router()

router.get('/products', authMiddleware, controller.getProducts)
router.post('/products', authMiddleware, controller.addProduct)

module.exports = router