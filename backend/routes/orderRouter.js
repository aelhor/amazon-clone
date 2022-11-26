const Order = require('../models/orderModel')
const express = require('express')
const expressAsyncHandler = require('express-async-handler')
const {isAuth} = require('../utils'); 

const orderRouter = express.Router();

orderRouter.get('/', expressAsyncHandler(async (req, res) => {
    const orders = await Order.find({})
    res.send({count:orders.length ,orders :orders})
})
);

orderRouter.post('/', isAuth, expressAsyncHandler(async (req, res) => {
    const data = req.body.order 
    if (req.body.order.orderItems.length === 0) {
        return res.status(400).send('order is empty')
    }
    else {
        const order = new Order({
            orderItems: data.orderItems,
            shippingAddress: data.shippingAddress.data,
            paymentMethod: data.paymentMethod,
            itemsPrice: data.itemsPrice,
            shippingPrice: data.shippingPrice,
            taxPrice: data.taxPrice,
            totalPrice: data.totalPrice,
            user: req.user._id,
        })
        const savedOrder = await order.save() 
        res.status(201).send({messsage: 'new order created', order:savedOrder})
    }
})
);

module.exports = orderRouter
