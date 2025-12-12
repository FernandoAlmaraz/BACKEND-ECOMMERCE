const Coupon = require('../../domain/entities/coupon.entity');

class CouponService {
    constructor(couponRepository) {
        this.couponRepository = couponRepository;
    }

    async getAllCoupons() {
        return this.couponRepository.getAll();
    }

    async getCouponById(id) {
        return this.couponRepository.getById(id);
    }

    async getCouponByCode(code) {
        return this.couponRepository.getByCode(code);
    }

    async createCoupon(couponData) {
        const couponEntity = new Coupon(
            null,
            couponData.code,
            couponData.discountType,
            couponData.discountValue,
            couponData.minPurchaseAmount || 0,
            couponData.maxUses || null,
            0,
            couponData.expirationDate || null,
            couponData.isActive !== undefined ? couponData.isActive : true,
            null
        );
        return this.couponRepository.create(couponEntity);
    }

    async updateCoupon(id, couponData) {
        const couponEntity = new Coupon(
            id,
            couponData.code,
            couponData.discountType,
            couponData.discountValue,
            couponData.minPurchaseAmount,
            couponData.maxUses,
            couponData.usedCount,
            couponData.expirationDate,
            couponData.isActive,
            couponData.createdAt
        );
        return this.couponRepository.update(id, couponEntity);
    }

    async deleteCoupon(id) {
        return this.couponRepository.delete(id);
    }

    /**
     * Valida si un cupón puede ser aplicado a una compra
     * @param {string} code - Código del cupón
     * @param {number} purchaseAmount - Monto de la compra
     * @returns {Object} - { isValid: boolean, coupon: Coupon|null, message: string, discount: number }
     */
    async validateCoupon(code, purchaseAmount) {
        const coupon = await this.couponRepository.getByCode(code);

        if (!coupon) {
            return {
                isValid: false,
                coupon: null,
                message: 'Cupón no encontrado',
                discount: 0
            };
        }

        if (!coupon.isActive) {
            return {
                isValid: false,
                coupon,
                message: 'El cupón no está activo',
                discount: 0
            };
        }

        if (coupon.expirationDate && new Date(coupon.expirationDate) < new Date()) {
            return {
                isValid: false,
                coupon,
                message: 'El cupón ha expirado',
                discount: 0
            };
        }

        // 4. Verificar si ha alcanzado el máximo de usos
        if (coupon.maxUses !== null && coupon.usedCount >= coupon.maxUses) {
            return {
                isValid: false,
                coupon,
                message: 'El cupón ha alcanzado su límite de usos',
                discount: 0
            };
        }

        // 5. Verificar monto mínimo de compra
        if (purchaseAmount < coupon.minPurchaseAmount) {
            return {
                isValid: false,
                coupon,
                message: `El monto mínimo de compra es $${coupon.minPurchaseAmount}`,
                discount: 0
            };
        }
        const discount = this.calculateDiscount(coupon, purchaseAmount);

        return {
            isValid: true,
            coupon,
            message: 'Cupón válido',
            discount
        };
    }

    /**
     * Calcula el descuento basado en el tipo de cupón
     * @param {Coupon} coupon - Objeto cupón
     * @param {number} subtotal - Subtotal de la compra
     * @returns {number} - Monto del descuento
     */
    calculateDiscount(coupon, subtotal) {
        if (coupon.discountType === 'percentage') {
            return (subtotal * coupon.discountValue) / 100;
        } else if (coupon.discountType === 'fixed') {
            return Math.min(coupon.discountValue, subtotal);
        }
        return 0;
    }

    /**
     * Aplica un cupón (incrementa el contador de uso)
     * @param {string} code - Código del cupón
     */
    async applyCoupon(code) {
        return this.couponRepository.incrementUsage(code);
    }
}

module.exports = CouponService;
