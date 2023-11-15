// src/routes/courierRoutes.js
/**
 * @swagger
 * tags:
 *   name: Couriers
 *   description: Courier information
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ErrorResponseModel:
 *       type: object
 *       properties:
 *         code:
 *           type: integer
 *           description: HTTP status code
 *         message:
 *           type: string
 *           description: Error message
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
 *             example: [{ "id": 1, "firstName": "John", "lastName": "Doe", "age": 25, "licenses": ["Driver License"] }]
 */
/**
 * @swagger
 * /couriers/{id}:
 *   get:
 *     summary: Get a courier by ID
 *     tags: [Couriers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the courier
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: { "id": 1, "firstName": "John", "lastName": "Doe", "age": 25, "licenses": ["Driver License"] }
 *       '404':
 *         description: Courier not found
 *         content:
 *           application/json:
 *             example: { "code": 404, "message": "Courier could not be found" }
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
 *         description: Courier added successfully
 *         content:
 *           application/json:
 *             example: { "id": 1, "firstName": "John", "lastName": "Doe", "age": 25, "licenses": ["Driver License"] }
 *       '400':
 *         description: Incomplete request or missing courier information
 *         content:
 *           application/json:
 *             example: { "code": 400, "message": "Incomplete courier information" }
 */
/**
 * @swagger
 * /couriers/{id}:
 *   put:
 *     summary: Update a courier by ID
 *     tags: [Couriers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the courier
 *         schema:
 *           type: integer
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
 *         description: Courier updated successfully
 *         content:
 *           application/json:
 *             example: { "id": 1, "firstName": "Updated", "lastName": "Courier", "age": 30, "licenses": ["Updated License"] }
 *       '400':
 *         description: Incomplete request or missing courier information
 *         content:
 *           application/json:
 *             example: { "code": 400, "message": 'Incomplete courier information' }
 *       '404':
 *         description: Courier not found
 *         content:
 *           application/json:
 *             example: { "code": 404, "message": "Courier could not be found using provided Id" }
 */


 const express = require('express');
 const router = express.Router();
 const courierController = require('../controllers/courierController');
 
 router.get('/', courierController.getAllCouriers);
 router.get('/:id', courierController.getCourierById);
 router.post('/', courierController.addCourier);
 router.put('/:id', courierController.updateCourier);
 
 module.exports = router;