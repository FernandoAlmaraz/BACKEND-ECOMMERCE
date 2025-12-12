const CouponRepository = require('../../../../domain/repositories/coupon.repository.interface');
const CouponModel = require('./models/coupon.model');
const Coupon = require('../../../../domain/entities/coupon.entity');

class CouponMongoRepository extends CouponRepository {
    async getAll() {
        const coupons = await CouponModel.find();
        return coupons.map(c => new Coupon(
            c._id.toString(),
            c.code,
            c.discountType,
            c.discountValue,
            c.minPurchaseAmount,
            c.maxUses,
            c.usedCount,
            c.expirationDate,
            c.isActive,
            c.createdAt
        ));
    }

    async getById(id) {
        const coupon = await CouponModel.findById(id);
        if (!coupon) return null;
        return new Coupon(
            coupon._id.toString(),
            coupon.code,
            coupon.discountType,
            coupon.discountValue,
            coupon.minPurchaseAmount,
            coupon.maxUses,
            coupon.usedCount,
            coupon.expirationDate,
            coupon.isActive,
            coupon.createdAt
        );
    }

    async getByCode(code) {
        const coupon = await CouponModel.findOne({ code: code.toUpperCase() });
        if (!coupon) return null;
        return new Coupon(
            coupon._id.toString(),
            coupon.code,
            coupon.discountType,
            coupon.discountValue,
            coupon.minPurchaseAmount,
            coupon.maxUses,
            coupon.usedCount,
            coupon.expirationDate,
            coupon.isActive,
            coupon.createdAt
        );
    }

    async create(couponEntity) {
        const newCoupon = new CouponModel({
            code: couponEntity.code,
            discountType: couponEntity.discountType,
            discountValue: couponEntity.discountValue,
            minPurchaseAmount: couponEntity.minPurchaseAmount,
            maxUses: couponEntity.maxUses,
            usedCount: couponEntity.usedCount || 0,
            expirationDate: couponEntity.expirationDate,
            isActive: couponEntity.isActive !== undefined ? couponEntity.isActive : true
        });
        const savedCoupon = await newCoupon.save();
        return new Coupon(
            savedCoupon._id.toString(),
            savedCoupon.code,
            savedCoupon.discountType,
            savedCoupon.discountValue,
            savedCoupon.minPurchaseAmount,
            savedCoupon.maxUses,
            savedCoupon.usedCount,
            savedCoupon.expirationDate,
            savedCoupon.isActive,
            savedCoupon.createdAt
        );
    }

    async update(id, couponEntity) {
        const updatedCoupon = await CouponModel.findByIdAndUpdate(id, {
            code: couponEntity.code,
            discountType: couponEntity.discountType,
            discountValue: couponEntity.discountValue,
            minPurchaseAmount: couponEntity.minPurchaseAmount,
            maxUses: couponEntity.maxUses,
            usedCount: couponEntity.usedCount,
            expirationDate: couponEntity.expirationDate,
            isActive: couponEntity.isActive
        }, { new: true });

        if (!updatedCoupon) return null;
        return new Coupon(
            updatedCoupon._id.toString(),
            updatedCoupon.code,
            updatedCoupon.discountType,
            updatedCoupon.discountValue,
            updatedCoupon.minPurchaseAmount,
            updatedCoupon.maxUses,
            updatedCoupon.usedCount,
            updatedCoupon.expirationDate,
            updatedCoupon.isActive,
            updatedCoupon.createdAt
        );
    }

    async delete(id) {
        await CouponModel.findByIdAndDelete(id);
    }

    async incrementUsage(code) {
        const coupon = await CouponModel.findOneAndUpdate(
            { code: code.toUpperCase() },
            { $inc: { usedCount: 1 } },
            { new: true }
        );
        if (!coupon) return null;
        return new Coupon(
            coupon._id.toString(),
            coupon.code,
            coupon.discountType,
            coupon.discountValue,
            coupon.minPurchaseAmount,
            coupon.maxUses,
            coupon.usedCount,
            coupon.expirationDate,
            coupon.isActive,
            coupon.createdAt
        );
    }
}

module.exports = CouponMongoRepository;
