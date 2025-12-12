class Coupon {
    constructor(id, code, discountType, discountValue, minPurchaseAmount, maxUses, usedCount, expirationDate, isActive, createdAt) {
        this.id = id;
        this.code = code;
        this.discountType = discountType;
        this.discountValue = discountValue;
        this.minPurchaseAmount = minPurchaseAmount;
        this.maxUses = maxUses;
        this.usedCount = usedCount;
        this.expirationDate = expirationDate;
        this.isActive = isActive;
        this.createdAt = createdAt;
    }
}

module.exports = Coupon;
