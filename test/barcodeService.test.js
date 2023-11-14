const chai = require('chai');
const res = require('express/lib/response');
const expect = chai.expect;

const Barcode = require('../src/models/barcodeModel');
const barcodeService = require('../src/services/barcodeService');

describe('BarcodeService', () => {


  it('should get available barcodes', () => {
    const result = barcodeService.getAvailableBarcodes();
    expect(result).not.null;
    expect(result).not.undefined;
    expect(result).not.empty;
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
    expect(result.barcode.value).equals(barcodeValue)
    expect(result.barcode.isDelivered).to.equal(true)
  });

  it('should not deliver an invalid barcode', () => {
    const barcodeValue = 'invalidBarcode';
    const result = barcodeService.deliverBarcode(barcodeValue);
    expect(result).to.contain({ error: 'Invalid barcode', valid: false });
  });
});