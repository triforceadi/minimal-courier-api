const fs = require('fs');
const path = require('path');
const Courier = require('../models/courierModel');

const couriersFilePath = path.join(__dirname, '..', 'db', 'couriers.json');

const getAllCouriers = () => {
  const couriersData = fs.readFileSync(couriersFilePath, 'utf-8');
  return JSON.parse(couriersData);
};

const getCourierById = (id) => {
  const couriers = getAllCouriers();
  return couriers.find((courier) => courier.id === id);
};

const addCourier = (firstName, lastName, age, licenses) => {
  const couriers = getAllCouriers();
  const id = couriers.length + 1;
  const newCourier = new Courier(id, firstName, lastName, age, licenses);
  couriers.push(newCourier);
  fs.writeFileSync(couriersFilePath, JSON.stringify(couriers, null, 2), 'utf-8');
  return newCourier;
};

const updateCourier = (id, firstName, lastName, age, licenses) => {
  const couriers = getAllCouriers();
  const index = couriers.findIndex((courier) => courier.id === id);

  if (index !== -1) {
    couriers[index] = new Courier(id, firstName, lastName, age, licenses);
    fs.writeFileSync(couriersFilePath, JSON.stringify(couriers, null, 2), 'utf-8');
    return couriers[index];
  }

  return null;
};

module.exports = {
  getAllCouriers,
  getCourierById,
  addCourier,
  updateCourier,
};