const OrderRepository = require('../../../../domain/repositories/order.repository.interface');
const OrderModel = require('./models/order.model');
const Order = require('../../../../domain/entities/order.entity');

class OrderMongoRepository extends OrderRepository {
    async getAll() {
        const orders = await OrderModel.find().populate('products.productId');
        return orders.map(o => new Order(
            o._id.toString(),
            o.orderId,
            o.userId,
            o.products,
            o.description,
            o.discount,
            o.couponCode,
            o.totalAmount,
            o.status,
            o.createdAt
        ));
    }

    async getById(id) {
        const order = await OrderModel.findById(id).populate('products.productId');
        if (!order) return null;
        return new Order(
            order._id.toString(),
            order.orderId,
            order.userId,
            order.products,
            order.description,
            order.discount,
            order.couponCode,
            order.totalAmount,
            order.status,
            order.createdAt
        );
    }

    async create(orderEntity) {
        const newOrder = new OrderModel({
            orderId: orderEntity.orderId,
            userId: orderEntity.userId,
            products: orderEntity.products,
            description: orderEntity.description,
            discount: orderEntity.discount,
            couponCode: orderEntity.couponCode,
            totalAmount: orderEntity.totalAmount,
            status: orderEntity.status
        });
        const savedOrder = await newOrder.save();
        return new Order(
            savedOrder._id.toString(),
            savedOrder.orderId,
            savedOrder.userId,
            savedOrder.products,
            savedOrder.description,
            savedOrder.discount,
            savedOrder.couponCode,
            savedOrder.totalAmount,
            savedOrder.status,
            savedOrder.createdAt
        );
    }

    async update(id, orderEntity) {
        const updatedOrder = await OrderModel.findByIdAndUpdate(id, {
            orderId: orderEntity.orderId,
            userId: orderEntity.userId,
            products: orderEntity.products,
            description: orderEntity.description,
            discount: orderEntity.discount,
            couponCode: orderEntity.couponCode,
            totalAmount: orderEntity.totalAmount,
            status: orderEntity.status
        }, { new: true }).populate('products.productId');

        if (!updatedOrder) return null;
        return new Order(
            updatedOrder._id.toString(),
            updatedOrder.orderId,
            updatedOrder.userId,
            updatedOrder.products,
            updatedOrder.description,
            updatedOrder.discount,
            updatedOrder.couponCode,
            updatedOrder.totalAmount,
            updatedOrder.status,
            updatedOrder.createdAt
        );
    }

    async delete(id) {
        await OrderModel.findByIdAndDelete(id);
    }
}

module.exports = OrderMongoRepository;
