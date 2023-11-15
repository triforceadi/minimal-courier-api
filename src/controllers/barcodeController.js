const barcodeService = require('../services/barcodeService');
const ErrorResponseModel = require('../models/errorResponseModel')

const getAvailableBarcodes = (req, res) => {
  const barcodes = barcodeService.getAvailableBarcodes();
  res.json(barcodes);
};

const validateBarcode = (req, res) => {
  const { barcode } = req.body;
  const result = barcodeService.validateBarcode(barcode);
  if (!barcode) 
  {
    res.status(400).json(new ErrorResponseModel(400, "Barcode is required" ));
  } 
  else
  {
    res.status(200).json("Barcode has been validated")
  }
};

const addBarcode = (req, res) => {
  const { barcode } = req.body;
  if (!barcode) 
  {
    res.status(400).json(new ErrorResponseModel(400, "Barcode value is required"));
  } 
  else 
  {
    const newBarcode = barcodeService.addBarcode(barcode);
    res.status(201).json(newBarcode);
  }
};

const deliverBarcode = (req, res) => {
  const { barcode } = req.body;

  if (!barcode) {
    res.status(400).json(new ErrorResponseModel(400, "Barcode is required" ));
  } 
  else if (!barcodeService.getAvailableBarcodes().find((b) => b.value === barcode))
  {
    res.status(404).json(new ErrorResponseModel(404, "Barcode could not be found" ));
  }
  else
  {
    const deliveredBarcode = barcodeService.deliverBarcode(barcode);
    res.status(200).json(deliveredBarcode);
  }
};

module.exports = {
  getAvailableBarcodes,
  validateBarcode,
  deliverBarcode,
  addBarcode
};