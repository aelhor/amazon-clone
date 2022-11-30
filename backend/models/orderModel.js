const mongoose = require('mongoose')


//  disallowed required properity 
const orderSchema = new mongoose.Schema(
    {
        orderItems: [{
            name: { type: String, },
            qty: { type: Number, },
            price: { type: Number, },
            image: { type: String },
            product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', },
        }],
        shippingAddress: {
            fullName: { type: String, },
            address: { type: String, },
            city: { type: String, },
            postalCode: { type: String, },
            country: { type: String, },
        },
        paymentMethod: { type: String, required: true, default: 'paypal' },
        paymentResult: {
            id: String,
            status: String,
            update_time: String,
            email_address: String,
        },
        itemsPrice: { type: Number, },
        shippingPrice: { type: Number, },
        taxPrice: { type: Number, },
        totalPrice: { type: Number, },
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', },
        isPaid: { type: Boolean, default: false },
        paidAt: { type: Date },
        isDelivered: { type: Boolean, default: false },
        deliveredAt: { type: Date },
    },
    { timestamps: true }
);
const order = mongoose.model('Order', orderSchema);
module.exports = order