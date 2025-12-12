const { Router } = require('express');
const CouponController = require('../controllers/coupon.controller');
const CouponService = require('../../application/use-cases/coupon.service');
const CouponMongoRepository = require('../../infrastructure/repositories/database/mongo/coupon.mongo.repository');
 
const couponRepository = new CouponMongoRepository();
const couponService = new CouponService(couponRepository);
const couponController = new CouponController(couponService);
 
const router = Router();
 
/**
* @swagger
* tags:
*   name: Coupons
*   description: Gestión de cupones de descuento
*/
 
/**
* @swagger
* /coupons:
*   get:
*     summary: Obtener todos los cupones
*     tags: [Coupons]
*     security:
*       - bearerAuth: []
*     responses:
*       200:
*         description: Lista de cupones
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/Coupon'
*/
router.get('/', couponController.getAll);
 
/**
* @swagger
* /coupons/{id}:
*   get:
*     summary: Obtener un cupón por ID
*     tags: [Coupons]
*     security:
*       - bearerAuth: []
*     parameters:
*       - in: path
*         name: id
*         required: true
*         schema:
*           type: string
*         description: ID del cupón
*     responses:
*       200:
*         description: Cupón encontrado
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Coupon'
*       404:
*         description: Cupón no encontrado
*/
router.get('/:id', couponController.getById);
 
/**
* @swagger
* /coupons/code/{code}:
*   get:
*     summary: Obtener un cupón por código
*     tags: [Coupons]
*     security:
*       - bearerAuth: []
*     parameters:
*       - in: path
*         name: code
*         required: true
*         schema:
*           type: string
*         description: Código del cupón (ej DESCUENTO20)
*     responses:
*       200:
*         description: Cupón encontrado
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Coupon'
*       404:
*         description: Cupón no encontrado
*/
router.get('/code/:code', couponController.getByCode);
 
/**
* @swagger
* /coupons:
*   post:
*     summary: Crear un nuevo cupón
*     tags: [Coupons]
*     security:
*       - bearerAuth: []
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/CouponInput'
*     responses:
*       201:
*         description: Cupón creado exitosamente
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Coupon'
*       400:
*         description: Datos inválidos
*/
router.post('/', couponController.create);
 
/**
* @swagger
* /coupons/validate:
*   post:
*     summary: Validar un cupón antes de aplicarlo
*     tags: [Coupons]
*     security:
*       - bearerAuth: []
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             required:
*               - code
*               - purchaseAmount
*             properties:
*               code:
*                 type: string
*                 description: Código del cupón
*                 example: "DESCUENTO20"
*               purchaseAmount:
*                 type: number
*                 description: Monto total de la compra
*                 example: 500
*     responses:
*       200:
*         description: Cupón válido
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 valid:
*                   type: boolean
*                   example: true
*                 message:
*                   type: string
*                   example: "Cupón válido"
*                 discount:
*                   type: number
*                   example: 100
*                 coupon:
*                   type: object
*                   properties:
*                     code:
*                       type: string
*                     discountType:
*                       type: string
*                     discountValue:
*                       type: number
*       400:
*         description: Cupón inválido
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 valid:
*                   type: boolean
*                   example: false
*                 message:
*                   type: string
*                   example: "El cupón ha expirado"
*                 discount:
*                   type: number
*                   example: 0
*/
router.post('/validate', couponController.validate);
 
/**
* @swagger
* /coupons/{id}:
*   put:
*     summary: Actualizar un cupón
*     tags: [Coupons]
*     security:
*       - bearerAuth: []
*     parameters:
*       - in: path
*         name: id
*         required: true
*         schema:
*           type: string
*         description: ID del cupón
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/CouponInput'
*     responses:
*       200:
*         description: Cupón actualizado
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Coupon'
*       404:
*         description: Cupón no encontrado
*/
router.put('/:id', couponController.update);
 
/**
* @swagger
* /coupons/{id}:
*   delete:
*     summary: Eliminar un cupón
*     tags: [Coupons]
*     security:
*       - bearerAuth: []
*     parameters:
*       - in: path
*         name: id
*         required: true
*         schema:
*           type: string
*         description: ID del cupón
*     responses:
*       204:
*         description: Cupón eliminado
*       404:
*         description: Cupón no encontrado
*/
router.delete('/:id', couponController.delete);
 
module.exports = router;
 