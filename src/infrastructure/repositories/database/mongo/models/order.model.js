const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    //orderId: { type: String, default: () => `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}` },
    userId: { type: String, default: () => Math.floor(1000000000 + Math.random() * 9000000000).toString() },
    products: [{
        _id: false,
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true, min: 1 }
    }],
    description: { type: String, required: true },
    discount: { type: Number, default: 0 },
    totalAmount: { type: Number, required: true },
    status: { type: String, enum: ['pending', 'completed', 'cancelled'], default: 'pending' },
    createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Order', orderSchema);
