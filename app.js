const express = require('express')
const Config = require('./helpers/config')
const bodyParser = require('body-parser')
const customerRouter = require('./routes/customerRoutes')
const productRouter = require('./routes/productRoutes')
const orderRoutes = require('./routes/orderRoutes')
const app = express()

app.use(bodyParser.json())

app.use(customerRouter)
app.use(productRouter)
app.use(orderRoutes)



app.listen(Config.port, () => {
    console.log(`Server runing in ${Config.host}:${Config.port}`)
})