const Order = require('../models/orderModel')
const express = require('express')
const expressAsyncHandler = require('express-async-handler')
const { isAuth } = require('../utils');
const order = require('../models/orderModel');

const orderRouter = express.Router();

// dev endpoint
// route : GET /api/orders
// disc : get all oredrs 
orderRouter.get('/', expressAsyncHandler(async (req, res) => {
    const orders = await Order.find({})
    res.send({ count: orders.length, orders: orders })
})
);




// route : GET /api/orders/all
// disc : get all oredrs for a specific user 
orderRouter.get('/all', isAuth, expressAsyncHandler(async (req, res) => {
    const userId = req.user._id
    const ordres = await Order.find({ user: userId })
    res.send(ordres)
}))


// route : GET /api/orders:orderId
// disc : get an order by ID
orderRouter.get('/:id', isAuth, expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)
    res.send(order)
})
);

// route : POST /api/orders
// disc : create an order
orderRouter.post('/', isAuth, expressAsyncHandler(async (req, res) => {
    const data = req.body.order
    console.log('data: ', data)
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
        res.status(201).send({ messsage: 'new order created', order: savedOrder })
    }
})
);


// route : PUT /api/orders
// disc : order payment 
orderRouter.put('/:orderId/pay', isAuth, expressAsyncHandler(async (req, res) => {
    const orderId = req.params.orderId
    const order = await Order.findById(orderId)
    if (order) {
        // update order 
        order.isPaid = true
        order.paidAt = Date.now()
        order.PaymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.email_address,
        }
        const updatedOrder = await Order.save()
        res.send({ messsage: 'order paid', order: updatedOrder })
    }
    else {
        res.status.apply(404).send({ messsage: "order not found" })
    }
}))




module.exports = orderRouter
