const { Router } = require('express');
const CouponController = require('../controllers/coupon.controller');
const CouponService = require('../../application/use-cases/coupon.service');
const CouponMongoRepository = require('../../infrastructure/repositories/database/mongo/coupon.mongo.repository');

const couponRepository = new CouponMongoRepository();
const couponService = new CouponService(couponRepository);
const couponController = new CouponController(couponService);

const router = Router();

router.get('/', couponController.getAll);

router.get('/:id', couponController.getById);

router.get('/code/:code', couponController.getByCode);

router.post('/validate', couponController.validate);

router.put('/:id', couponController.update);

router.delete('/:id', couponController.delete);

module.exports = router;
