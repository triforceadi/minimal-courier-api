const fs = require('fs');
const path = require('path');
const Barcode = require('../models/barcodeModel');

const barcodesFilePath = path.join(__dirname, '..', 'db', 'barcodes.json');

const getAvailableBarcodes = () => {
  const barcodesData = fs.readFileSync(barcodesFilePath, 'utf-8');
  return JSON.parse(barcodesData);
};

const validateBarcode = (barcodeValue) => {
  const barcodes = getAvailableBarcodes();
  const barcode = barcodes.find((b) => b.value === barcodeValue);

  if (barcode) {
    if (!barcode.isValid) {
      barcode.isValid = true;
      fs.writeFileSync(barcodesFilePath, JSON.stringify(barcodes, null, 2), 'utf-8');
    }
    return { valid: true };
  } else {
    return { valid: false, error: 'Invalid barcode' };
  }
};

const addBarcode = (barcodeValue, isValid = true) => {
  const newBarcode = new Barcode(barcodeValue);
  newBarcode.isValid = isValid;
  newBarcode.isDelivered = false;
  
  const barcodes = getAvailableBarcodes();
  barcodes.push(newBarcode);

  fs.writeFileSync(barcodesFilePath, JSON.stringify(barcodes, null, 2), 'utf-8');

  return newBarcode;
};

const deliverBarcode = (barcodeValue) => {
  const validation = validateBarcode(barcodeValue);

  if (!validation.valid) {
    return { valid: false, error: 'Invalid barcode' };
  }

  const barcodes = getAvailableBarcodes();
  const index = barcodes.findIndex((b) => b.value === barcodeValue);

  if (index !== -1) {
    barcodes[index].isDelivered = true;

    fs.writeFileSync(barcodesFilePath, JSON.stringify(barcodes, null, 2), 'utf-8');
    return {barcode: barcodes[index] };
  }

  return { isDelivered: false, error: 'Barcode not found' };
};

module.exports = {
  getAvailableBarcodes,
  validateBarcode,
  deliverBarcode,
  addBarcode
};