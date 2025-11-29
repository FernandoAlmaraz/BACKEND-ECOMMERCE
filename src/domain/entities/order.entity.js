class Order {
    constructor(id, orderId, userId, products, description, discount, totalAmount, status, createdAt) {
        this.id = id;
        this.orderId = orderId;
        this.userId = userId;
        this.products = products;
        this.description = description;
        this.discount = discount;
        this.totalAmount = totalAmount;
        this.status = status;
        this.createdAt = createdAt;
    }
}
module.exports = Order;