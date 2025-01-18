const fs = require('node:fs')
const path = require('node:path')

const productFilePath = path.resolve(__dirname, '../', 'data/products.json')
const orderFilePath = path.resolve(__dirname, '../', 'data/orders.json')

const addReview = (req, res) => {
    try {
        let orders = JSON.parse(fs.readFileSync(orderFilePath, 'utf-8'))
        const products = JSON.parse(fs.readFileSync(productFilePath, 'utf-8'))
        const user = req.user
        const {id} = req.params

        const product = products.find(product => product.id == id)

        let order = orders.find(order => order.customerId == user.id)


        if (order) {
            const existingItem = order.items.find(item => item.productId == id)

            if (existingItem) {
                existingItem.quantity++
            } else {
                
                order.items.push({ productId: id, quantity: 1 })
            }

            
            order.totalPrice = order.items.reduce((total, item) => {
                const product = products.find(p => p.id == item.productId)
                return total + product.price * item.quantity
            }, 0)

            order.date = new Date().toISOString()
        } else {
            order = {
                id: Date.now(),
                customerId: user.id,
                items: [{ productId: id, quantity: 1 }],
                totalPrice: product.price,
                date: new Date().toISOString()
            }

            orders.push(order)
        }
        fs.writeFileSync(orderFilePath, JSON.stringify(orders, null, 2))

        return res.status(200).json({ message: 'Item added to order' })
    } catch (err) {
        console.error(err)
        return res.status(500).json({ message: 'Server error' })
    }
}

module.exports = {
    addReview
}
