const Order = require('../../domain/entities/order.entity');

class OrderService {
    constructor(orderRepository, couponService) {
        this.orderRepository = orderRepository;
        this.couponService = couponService;
    }

    async getAllOrders() {
        return this.orderRepository.getAll();
    }

    async getOrderById(id) {
        return this.orderRepository.getById(id);
    }

    async createOrder(orderData) {
        let discount = 0;
        let couponCode = null;

        if (orderData.couponCode) {
            const validation = await this.couponService.validateCoupon(
                orderData.couponCode,
                orderData.subtotal || 0
            );

            if (validation.isValid) {
                discount = validation.discount;
                couponCode = orderData.couponCode.toUpperCase();
                await this.couponService.applyCoupon(orderData.couponCode);
            } else {
                throw new Error(validation.message);
            }
        }

        const totalAmount = (orderData.subtotal || 0) - discount;

        const orderEntity = new Order(
            null,
            orderData.orderId,
            orderData.userId,
            orderData.products,
            orderData.description,
            discount,
            couponCode,
            totalAmount,
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
            orderData.couponCode,
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
