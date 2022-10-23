const Product = require('../models/productModel')
const express = require('express')
const data = require('../data')
const productRouter = express.Router();
// don't write try catch use expressAsyncHandler insted
const expressAsyncHandler = require('express-async-handler')


productRouter.get('/seed', expressAsyncHandler(async (req, res) => {
    const products = await Product.insertMany(data.products)
    res.send(products)
})
);

// GET /api/products
productRouter.get('/', expressAsyncHandler(async (req, res) => {
    const products = await Product.find()
    res.send(products)
}))

// GET /api/products/:id
productRouter.get('/:id', expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        res.send(product);
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
})
);

module.exports = productRouter

