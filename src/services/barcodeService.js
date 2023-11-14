const Barcode = require('../models/barcodeModel');


class BarcodeService {
  constructor() {
    this.availableBarcodes = [
      new Barcode('123456'),
      new Barcode('789012'),
    ];
  }

  getAvailableBarcodes() {
    return this.availableBarcodes;
  }

  validateBarcode(barcodeValue) {
    const barcode = this.availableBarcodes.find((b) => b.value === barcodeValue);

    if (barcode) {
      barcode.isValid = true;
      return { valid: true };
    } else {
      return { valid: false, error: 'Invalid barcode' };
    }
  }

  deliverBarcode(barcodeValue) {
    const validation = this.validateBarcode(barcodeValue);

    if (!validation.valid) {
      return { valid: false, error: 'Invalid barcode' };
    }

    const index = this.availableBarcodes.findIndex((b) => b.value === barcodeValue);

    if (index !== -1) {
      const deliveredBarcode = this.availableBarcodes.splice(index, 1)[0];
      return { isDelivered: true, barcode: deliveredBarcode };
    }

    return { isDelivered: false, error: 'Barcode not found' };
  }
}

module.exports = new BarcodeService();