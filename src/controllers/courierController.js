const courierService = require('../services/courierService');
const ErrorResponseModel = require('../models/errorResponseModel')

const getAllCouriers = (req, res) => {
  const couriers = courierService.getAllCouriers();
  res.json(couriers);
};

const getCourierById = (req, res) => {
  const courierId = parseInt(req.params.id);
  const courier = courierService.getCourierById(courierId);
  if (!courier) 
  {
    res.status(404).json(new ErrorResponseModel(404, 'Courier could not be found' ));
  } 
  else 
  {
    res.status(200).json(courier);
  }
};

const addCourier = (req, res) => {
  const { firstName, lastName, age, licenses } = req.body;
  if (!firstName || !lastName || !age || !licenses) 
  {
    res.status(400).json(new ErrorResponseModel(400, 'Incomplete courier information' ));
  } 
  else 
  {
    const newCourier = courierService.addCourier(firstName, lastName, age, licenses);
    res.status(201).json(newCourier);
  }
};

const updateCourier = (req, res) => {
  const courierId = parseInt(req.params.id);
  const { firstName, lastName, age, licenses } = req.body;
  const oldCourier = courierService.getCourierById(courierId);
  if (!firstName || !lastName || !age || !licenses) {
    res.status(400).json(new ErrorResponseModel(400, 'Incomplete courier information' ));
  }
  else if(!oldCourier)
  {
    res.status(404).json(new ErrorResponseModel(404, 'Courier could not be found using provided Id'));
  }
  else 
  {
    const updatedCourier = courierService.updateCourier(courierId, firstName, lastName, age, licenses);
    res.status(200).json(updatedCourier);
  }
};

module.exports = {
  getAllCouriers,
  getCourierById,
  addCourier,
  updateCourier
};