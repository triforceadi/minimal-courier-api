// src/routes/barcodeRoutes.js
/**
 * @swagger
 * tags:
 *   name: Barcodes
 *   description: Barcode information
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
 *             example:
 *               - value: '123456'
 *                 isValid: true
 *               - value: '789012'
 *                 isValid: true
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
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               value: '123456'
 *               isValid: true
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             example:
 *               error: Barcode is required
 *       '404':
 *         description: Barcode not found
 *         content:
 *           application/json:
 *             example:
 *               error: Barcode not found
 */
/**
 * @swagger
 * /barcodes/validate:
 *   post:
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
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               valid: true
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             example:
 *               error: Barcode is required
 *       '404':
 *         description: Invalid barcode
 *         content:
 *           application/json:
 *             example:
 *               valid: false
 *               error: Invalid barcode
 */
/**
 * @swagger
 * /barcodes/addBarcode:
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
 *               barcodeValue:
 *                 type: string
 *                 description: The value of the new barcode
 *     responses:
 *       201:
 *         description: Barcode added successfully
 *       400:
 *         description: Barcode value is required
 */

 const express = require('express');
 const router = express.Router();
 const barcodeController = require('../controllers/barcodeController');
 
 router.get('/', barcodeController.getAvailableBarcodes);
 router.post('/validate', barcodeController.validateBarcode);
 router.post('/deliver', barcodeController.deliverBarcode);
 router.post('/addBarcode', barcodeController.addBarcode);
 
 module.exports = router;