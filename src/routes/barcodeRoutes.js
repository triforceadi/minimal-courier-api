// src/routes/barcodeRoutes.js
/**
 * @swagger
 * tags:
 *   name: Barcodes
 *   description: Barcode information
 */

/**
 * @swagger
 * /barcodes/deliver:
 *   post:
 *     summary: Deliver a barcode
 *     tags: [Barcodes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               barcode:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Barcode delivered successfully
 *         content:
 *           application/json:
 *             example: { "isDelivered": true, "barcode": "123456" }
 *       '400':
 *         description: Incomplete request or missing barcode
 *         content:
 *           application/json:
 *             example: { "code": 400, "message": "Barcode is required" }
 *       '404':
 *         description: Barcode not found
 *         content:
 *           application/json:
 *             example: { "code": 404, "message": "Barcode could not be found" }
 */

/**
 * @swagger
 * /barcodes/add:
 *   post:
 *     summary: Add a new barcode
 *     tags: [Barcodes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               barcode:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Barcode added successfully
 *         content:
 *           application/json:
 *             example: "123456"
 *       '400':
 *         description: Incomplete request or missing barcode value
 *         content:
 *           application/json:
 *             example: { "code": 400, "message": "Barcode value is required" }
 */
/**
 * @swagger
 * /barcodes/validate:
 *   put:
 *     summary: Validate a barcode
 *     tags: [Barcodes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               barcode:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Barcode validated successfully
 *         content:
 *           application/json:
 *             example: Barcode has been validated
 *       '400':
 *         description: Incomplete request or missing barcode
 *         content:
 *           application/json:
 *             example: { "code": 400, "message": "Barcode is required" }
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
 * /barcodes:
 *   get:
 *     summary: Get available barcodes
 *     tags: [Barcodes]
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: ["123456", "789012"]
 */

 const express = require('express');
 const router = express.Router();
 const barcodeController = require('../controllers/barcodeController');
 
 router.get('/', barcodeController.getAvailableBarcodes);
 router.post('/validate', barcodeController.validateBarcode);
 router.put('/deliver', barcodeController.deliverBarcode);
 router.post('/new', barcodeController.addBarcode);
 
 module.exports = router;