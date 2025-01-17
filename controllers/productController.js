const fs = require('node:fs')
const path = require('node:path')

const filePath = path.resolve(__dirname, '../', 'data/products.json')

const addProduct = (req, res) => {
    try {
        const products = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
        const {name, price, description} = req.body

        const product = products.find(product => product.name == name)

        if(product) {
            return res.status(400).json({message: 'product name is busy'})
        }
        products.push({id: Date.now(), name, price, description})

        fs.writeFileSync(filePath, JSON.stringify(products, null, 2))

        return res.status(201).json({message: 'product created is successfully'})
    }catch (err) {
        return res.status(500).json({message: 'server error'})
    }
}

const getProducts = (req, res) => {
    try {
        const products = JSON.parse(fs.readFileSync(filePath, 'utf-8'))

        return res.status(200).json({payload: products})
    }catch (err) {
        return res.status(500).json({message: 'server error'})
    }
}

module.exports = {
    addProduct,
    getProducts
}