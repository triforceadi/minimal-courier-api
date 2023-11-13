const barcodeService = require('../services/barcodeService');

const getAvailableBarcodes = (req, res) => {
  const barcodes = barcodeService.getAvailableBarcodes();
  res.json(barcodes);
};

const validateBarcode = (req, res) => {
  const { barcode } = req.body;

  if (!barcode) {
    res.status(400).json({ error: 'Barcode is required' });
  } else {
    const result = barcodeService.validateBarcode(barcode);
    res.json(result);
  }
};

const deliverBarcode = (req, res) => {
  const { barcode } = req.body;

  if (!barcode) {
    res.status(400).json({ error: 'Barcode is required' });
  } else {
    const deliveredBarcode = barcodeService.deliverBarcode(barcode);

    if (deliveredBarcode) {
      res.json(deliveredBarcode);
    } else {
      res.status(404).json({ error: 'Barcode not found' });
    }
  }
};

module.exports = {
  getAvailableBarcodes,
  validateBarcode,
  deliverBarcode,
};