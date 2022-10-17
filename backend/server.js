const express = require('express')
const data = require('./data')
const app = express()

app.get('/', (req, res) => {
    res.send("Hello")
})

app.get('/api/products', (req, res) => {
    res.send(data.products)
})

app.get('/api/products/:id', (req, res) => {
    const product = data.products.find((x) => x._id == req.params.id);
    console.log(req.params.id)
    if (product) {
        console.log('Product',product)
        res.send(product);
    } else {

        res.status(404).send({ message: 'Product Not Found' });
    }
});






const port = process.env.PORT || 5000
app.listen(port, () => console.log(`server on ${port}`))