const Order = require('../../domain/entities/order.entity');

class OrderService {
    constructor(orderRepository) {
        this.orderRepository = orderRepository;
    }

    async getAllOrders() {
        return this.orderRepository.getAll();
    }

    async getOrderById(id) {
        return this.orderRepository.getById(id);
    }

    async createOrder(orderData) {
        const orderEntity = new Order(
            null,
            orderData.orderId,
            orderData.userId,
            orderData.products,
            orderData.description,
            orderData.discount || 0,
            orderData.totalAmount,
            orderData.status || 'pending',
            null
        );
        return this.orderRepository.create(orderEntity);
    }

    async updateOrder(id, orderData) {
        const orderEntity = new Order(
            id,
            orderData.orderId,
            orderData.userId,
            orderData.products,
            orderData.description,
            orderData.discount,
            orderData.totalAmount,
            orderData.status,
            orderData.createdAt
        );
        return this.orderRepository.update(id, orderEntity);
    }

    async deleteOrder(id) {
        return this.orderRepository.delete(id);
    }
}

module.exports = OrderService;
