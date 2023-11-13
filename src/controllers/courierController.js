const courierService = require('../services/courierService');

const getAllCouriers = (req, res) => {
  const couriers = courierService.getAllCouriers();
  res.json(couriers);
};

const getCourierById = (req, res) => {
  const courierId = parseInt(req.params.id);
  const courier = courierService.getCourierById(courierId);

  if (!courier) {
    res.status(404).json({ error: 'Courier not found' });
  } else {
    res.json(courier);
  }
};

const addCourier = (req, res) => {
  const { firstName, lastName, age, licenses } = req.body;

  if (!firstName || !lastName || !age || !licenses) {
    res.status(400).json({ error: 'Incomplete courier information' });
  } else {
    const newCourier = courierService.addCourier(firstName, lastName, age, licenses);
    res.status(201).json(newCourier);
  }
};

const updateCourier = (req, res) => {
  const courierId = parseInt(req.params.id);
  const { firstName, lastName, age, licenses } = req.body;

  const updatedCourier = courierService.updateCourier(courierId, firstName, lastName, age, licenses);

  if (updatedCourier) {
    res.json(updatedCourier);
  } else {
    res.status(404).json({ error: 'Courier not found' });
  }
};

module.exports = {
  getAllCouriers,
  getCourierById,
  addCourier,
  updateCourier
};