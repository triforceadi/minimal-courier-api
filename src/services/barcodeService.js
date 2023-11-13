const Barcode = require('../models/barcodeModel');

let availableBarcodes = [
  new Barcode('123456'),
  new Barcode('789012'),
];

const getAvailableBarcodes = () => {
  return availableBarcodes;
};

const validateBarcode = (barcodeValue) => {
  const barcode = availableBarcodes.find((b) => b.value === barcodeValue);

  if (barcode) {
    barcode.isValid = true;
    return { valid: true };
  } else {
    return { valid: false, error: 'Invalid barcode' };
  }
};

const deliverBarcode = (barcodeValue) => {
  const validation = validateBarcode(barcodeValue);

  if (!validation.valid) {
    return { valid: false, error: 'Invalid barcode' };
  }

  const index = availableBarcodes.findIndex((b) => b.value === barcodeValue);

  if (index !== -1) {
    const deliveredBarcode = availableBarcodes.splice(index, 1)[0];
    return { isDelivered: true, barcode: deliveredBarcode};
  }

  return { isDelivered: false, error: 'Barcode not found' };
};

module.exports = {
  getAvailableBarcodes,
  validateBarcode,
  deliverBarcode,
};