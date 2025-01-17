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

        const productsFilter = products.filter(product => product.id == id)
        const product = products.find(product => product.id == id)
        const orderCheck = orders.find(order => order.customerId == user.id)

        const totalPrice = productsFilter.reduce((aggr, product) => aggr + product.price, 0)

        if(orderCheck) {
            orders = orders.map(order => {
                if(order.customerId == user.id) {
                    const result = {
                        id: Date.now(),
                        customerId: user.id,
                        totalPrice,
                        items: order.items.map(item => {
                            if(item.productId == id) {
                                return {
                                    productId,
                                    quantity: ++item.quantity
                                }
                            }else {
                                return item
                            }
                        }),
                        date: new Date().toISOString()
                      }

                      return result
                }else {
                    return order
                }
            })

            fs.writeFileSync(orderFilePath, JSON.stringify(orders, null, 2))

            return res.status.json({message: 'item added'})
        }

        orders.push({
            id: Date.now(),
            customerId: user.id,
            totalPrice: product,
            items: [{
                productId: id,
                quantity: 1
            }],
            totalPrice: product.price,
            date: new Date.toISOString()
        })

        fs.writeFileSync(orderFilePath, JSON.stringify(orders, null, 2))

        return res.status.json({message: 'item added'})


    }catch (err) {
        return res.status(500).json({message: 'server error'})
    }
    


    res.status(201).json({message: 'orders added'})
}

module.exports = {
    addReview
}