const express = require('express')
const controller = require('../controllers/customerController')
const router = express.Router()

router.post('/customer/register', controller.customerRegister)
router.post('/customer/login', controller.customerLogin)

module.exports = router