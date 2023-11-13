const Courier = require('../models/courierModel');

let couriers = [
  new Courier(1, 'John', 'Doe', 25, ['Driver License']),
  new Courier(2, 'Jane', 'Smith', 30, ['Driver License', 'Courier Certification']),
];

const getAllCouriers = () => {
  return couriers;
};

const getCourierById = (id) => {
  return couriers.find((courier) => courier.id === id);
};

const addCourier = (firstName, lastName, age, licenses) => {
  const id = couriers.length + 1;
  const newCourier = new Courier(id, firstName, lastName, age, licenses);
  couriers.push(newCourier);
  return newCourier;
};

const updateCourier = (id, firstName, lastName, age, licenses) => {
  const index = couriers.findIndex((courier) => courier.id === id);

  if (index !== -1) {
    couriers[index] = new Courier(id, firstName, lastName, age, licenses);
    return couriers[index];
  }

  return null;
};

module.exports = {
  getAllCouriers,
  getCourierById,
  addCourier,
  updateCourier
};