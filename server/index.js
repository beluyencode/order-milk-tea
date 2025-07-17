const express = require('express')
const mockData = require('./mockMenuData')
const app = express()
const port = 3000
const cors = require('cors')

app.use(cors("*"))
app.use(express.json())

app.get('/api/categories', (req, res) => {
    const menu = mockData.categories
    res.json(menu)
})

app.get('/api/items/:categoryId', (req, res) => {
    const { categoryId } = req.params
    const items = mockData.products.filter(item => item.categoryId === +categoryId)
    res.json(items)
})

app.post('/api/order', (req, res) => {
    const order = req.body
    let errorMessage = null;

    for (const item of mockData.products) {
        const product = order.filter(i => i.id === item.id);
        if (product.length) {
            const orderCount = product.reduce((acc, curr) => acc + curr.count, 0);
            const quantity = item.inventory.quantity - orderCount;
            if (quantity > 0) {
                item.inventory.quantity -= orderCount;
            } else if (quantity === 0) {
                item.inventory.quantity = 0;
                item.inventory.status = 'out_of_stock';
            } else {
                errorMessage = 'Insufficient stock for item: ' + item.name;
                break;
            }
        }
    }

    if (errorMessage) {
        res.json({ success: false, message: errorMessage });
    } else {
        res.json({ success: true, order });
    }
})

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})