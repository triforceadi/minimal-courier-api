const Courier = require('../models/courierModel');

class CourierService {
  constructor() {
    this.couriers = [
      new Courier(1, 'John', 'Doe', 25, ['Driver License']),
      new Courier(2, 'Jane', 'Smith', 30, ['Driver License', 'Courier Certification']),
    ];
  }

  getAllCouriers() {
    return this.couriers;
  }

  getCourierById(id) {
    return this.couriers.find((courier) => courier.id === id);
  }

  addCourier(firstName, lastName, age, licenses) {
    const id = this.couriers.length + 1;
    const newCourier = new Courier(id, firstName, lastName, age, licenses);
    this.couriers.push(newCourier);
    return newCourier;
  }

  updateCourier(id, firstName, lastName, age, licenses) {
    const index = this.couriers.findIndex((courier) => courier.id === id);

    if (index !== -1) {
      this.couriers[index] = new Courier(id, firstName, lastName, age, licenses);
      return this.couriers[index];
    }

    return null;
  }
}

module.exports = new CourierService();