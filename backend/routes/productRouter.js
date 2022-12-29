const Product = require('../models/productModel')
const express = require('express')
const productRouter = express.Router();
const { isAuth, isAdmin } = require('../utils')
// don't write try catch use expressAsyncHandler insted
const expressAsyncHandler = require('express-async-handler')
const multer = require('multer')



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



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = `${Date.now()}${file.originalname}`
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})
const upload = multer({ storage })



// POST /api/products 
// decs : Craete new products 

productRouter.post('/', isAuth, isAdmin, upload.single('image'), expressAsyncHandler(async (req, res) => {
    if (req.file) {
        
        const product = new Product({
            image: req.file.path,
            name: req.body.name,
            brand: req.body.brand,
            category: req.body.category,
            description: req.body.description,
            price: req.body.price,
            countInStock: req.body.countInStock,
        })
        const createdProduct = await product.save()
        res.status(200).send({ message: 'product created', product: createdProduct })
    } else {
        res.send('image is required')
    }
}))

module.exports = productRouter

