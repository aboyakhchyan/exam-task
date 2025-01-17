const fs = require('node:fs')
const path = require('node:path')
const jwt = require('jsonwebtoken')
const Config = require('../helpers/config')
const bcrypt = require('bcrypt')

const filePath = path.resolve(__dirname, '../', 'data/customers.json')

const customerRegister = async (req, res) => {
    try {
        const customers = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
        const {name, email, phone, password} = req.body

        const result = customers.some(customer => {
            return customer.name == name || customer.email == email
        })

        if(result) {
            return res.status(400).json({message: 'user data is busy'})
        }

        const newPassword = await bcrypt.hash(password, 10)

        customers.push({id: Date.now(), name, email, phone, password: newPassword})
        fs.writeFileSync(filePath, JSON.stringify(customers, null, 2))

        res.status(201).json({message: 'user created is successfully'})
    }catch (err) {
        return res.status(500).json({message: 'server error'})
    }
}

const customerLogin = async (req, res) => {
    try {
        const customers = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
        const {email, password} = req.body

        const customer = customers.find(customer => {
            return customer.email == email 
        })

        if(!customer) {
            return res.status(400).json({message: 'wrong credentials'})
        }

        const customerPassword = await bcrypt.compare(password, customer.password)

        if(!customerPassword) {
            return res.status(400).json({message: 'wrong credentials'})
        }
    

        const token = jwt.sign({
            id: customer.id,
            name: customer.name,
            email
        },
        Config.jwtSecret,
        {
            expiresIn: '1h'
        })

        res.status(200).json({token})
    }catch (err) {
        return res.status(500).json({message: 'server error'})
    }
}

module.exports = {
    customerRegister,
    customerLogin
}