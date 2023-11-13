// src/routes/courierRoutes.js
/**
 * @swagger
 * tags:
 *   name: Couriers
 *   description: Courier information
 */

/**
 * @swagger
 * /couriers:
 *   get:
 *     summary: Get all couriers
 *     tags: [Couriers]
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               - id: 1
 *                 firstName: John
 *                 lastName: Doe
 *                 age: 25
 *                 licenses:
 *                   - Driver License
 *               - id: 2
 *                 firstName: Jane
 *                 lastName: Smith
 *                 age: 30
 *                 licenses:
 *                   - Driver License
 *                   - Courier Certification
 */

/**
 * @swagger
 * /couriers/{id}:
 *   get:
 *     summary: Get courier by ID
 *     tags: [Couriers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Courier ID
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               id: 1
 *               firstName: John
 *               lastName: Doe
 *               age: 25
 *               licenses:
 *                 - Driver License
 *       '404':
 *         description: Courier not found
 *         content:
 *           application/json:
 *             example:
 *               error: Courier not found
 */

/**
 * @swagger
 * /couriers:
 *   post:
 *     summary: Add a new courier
 *     tags: [Couriers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               age:
 *                 type: integer
 *               licenses:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       '201':
 *         description: Courier created successfully
 *         content:
 *           application/json:
 *             example:
 *               id: 3
 *               firstName: New
 *               lastName: Courier
 *               age: 28
 *               licenses:
 *                 - Courier Certification
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             example:
 *               error: Incomplete courier information
 */
/**
 * @swagger
 * /couriers/{id}:
 *   put:
 *     summary: Update courier information by ID
 *     tags: [Couriers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Courier ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               age:
 *                 type: integer
 *               licenses:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               id: 1
 *               firstName: John
 *               lastName: Doe
 *               age: 26
 *               licenses:
 *                 - Driver License
 *       '404':
 *         description: Courier not found
 *         content:
 *           application/json:
 *             example:
 *               error: Courier not found
 */

 const express = require('express');
 const router = express.Router();
 const courierController = require('../controllers/courierController');
 
 router.get('/', courierController.getAllCouriers);
 router.get('/:id', courierController.getCourierById);
 router.post('/', courierController.addCourier);
 router.put('/:id', courierController.updateCourier);
 
 module.exports = router;