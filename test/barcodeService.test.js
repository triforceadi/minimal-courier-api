const chai = require('chai');
const expect = chai.expect;

const Barcode = require('../src/models/barcodeModel');
const barcodeService = require('../src/services/barcodeService');

describe('BarcodeService', () => {
  let availableBarcodes;

  beforeEach(() => {
    availableBarcodes = [
      new Barcode('123456'),
      new Barcode('789012'),
    ];
  });

  it('should get available barcodes', () => {
    const result = barcodeService.getAvailableBarcodes();
    expect(result).to.deep.equal(availableBarcodes);
  });

  it('should validate a valid barcode', () => {
    const barcodeValue = '123456';
    const result = barcodeService.validateBarcode(barcodeValue);
    expect(result).to.deep.equal({ valid: true });
  });

  it('should not validate an invalid barcode', () => {
    const barcodeValue = 'invalidBarcode';
    const result = barcodeService.validateBarcode(barcodeValue);
    expect(result).to.deep.equal({ valid: false, error: 'Invalid barcode' });
  });

  it('should deliver a valid barcode', () => {
    const barcodeValue = '123456';
    const result = barcodeService.deliverBarcode(barcodeValue);
    expect(result).to.deep.equal({ isDelivered: true, barcode: new Barcode('123456') });
  });

  it('should not deliver an invalid barcode', () => {
    const barcodeValue = 'invalidBarcode';
    const result = barcodeService.deliverBarcode(barcodeValue);
    expect(result).to.contain({ error: 'Invalid barcode', valid: false });
  });
});