class CouponController {
    constructor(couponService) {
        this.couponService = couponService;
    }

    getAll = async (req, res) => {
        const coupons = await this.couponService.getAllCoupons();
        res.status(200).json(coupons);
    }

    getById = async (req, res) => {
        const { id } = req.params;
        const coupon = await this.couponService.getCouponById(id);
        if (coupon) {
            res.status(200).json(coupon);
        } else {
            res.status(404).json({ message: 'Cupón no encontrado' });
        }
    }

    getByCode = async (req, res) => {
        const { code } = req.params;
        const coupon = await this.couponService.getCouponByCode(code);
        if (coupon) {
            res.status(200).json(coupon);
        } else {
            res.status(404).json({ message: 'Cupón no encontrado' });
        }
    }

    create = async (req, res) => {
        const coupon = await this.couponService.createCoupon(req.body);
        res.status(201).json(coupon);
    }

    update = async (req, res) => {
        const { id } = req.params;
        const coupon = await this.couponService.updateCoupon(id, req.body);
        if (coupon) {
            res.status(200).json(coupon);
        } else {
            res.status(404).json({ message: 'Cupón no encontrado' });
        }
    }

    delete = async (req, res) => {
        const { id } = req.params;
        await this.couponService.deleteCoupon(id);
        res.status(204).send();
    }

    validate = async (req, res) => {
        const { code, purchaseAmount } = req.body;

        if (!code || purchaseAmount === undefined) {
            return res.status(400).json({
                message: 'Se requiere código de cupón y monto de compra'
            });
        }

        const validation = await this.couponService.validateCoupon(code, purchaseAmount);

        if (validation.isValid) {
            res.status(200).json({
                valid: true,
                message: validation.message,
                discount: validation.discount,
                coupon: {
                    code: validation.coupon.code,
                    discountType: validation.coupon.discountType,
                    discountValue: validation.coupon.discountValue
                }
            });
        } else {
            res.status(400).json({
                valid: false,
                message: validation.message,
                discount: 0
            });
        }
    }
}

module.exports = CouponController;
