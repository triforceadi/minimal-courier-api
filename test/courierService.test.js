const chai = require('chai');
const { expect } = chai;
const courierService = require('../src/services/courierService');
const Courier = require('../src/models/courierModel');

describe('CourierService', () => {
  beforeEach(() => {
  });

  it('should add a new courier', () => {
    const newCourier = courierService.addCourier('John', 'Doe', 25, ['Driver License']);
    expect(newCourier).to.be.an.instanceOf(Courier);
    const newCourierAdded = courierService.getAllCouriers().find(courier => courier.firstName === "John");
    expect(newCourierAdded.firstName).equals("John");
    expect(newCourierAdded.lastName).equals("Doe");
    expect(newCourierAdded.age).equals(25);
    expect(newCourierAdded.id).not.null;
    expect(newCourierAdded.licenses).contains('Driver License')

  });

  it('should get a courier by id', () => {
    const existingCourier = new Courier(1, 'John', 'Doe', 25, ['Driver License']);
    courierService.addCourier(existingCourier);

    const retrievedCourier = courierService.getCourierById(1);
    expect(retrievedCourier).to.deep.equal(existingCourier);
  });

  it('should return null when getting a non-existent courier by id', () => {
    const retrievedCourier = courierService.getCourierById(999);
    expect(retrievedCourier).to.be.undefined;
  });

  it('should update a courier', () => {
    const existingCourier = new Courier(1, 'John', 'Doe', 25, ['Driver License']);
    const updatedCourier = courierService.updateCourier(1, 'Jane', 'Smith', 30, ['Driver License', 'Courier Certification']);
    const updatedCourierInList = courierService.getAllCouriers().find(courier => courier.id === updatedCourier.id);
    expect(updatedCourier).to.be.an.instanceOf(Courier);
    expect(updatedCourier).to.not.equal(existingCourier);
    expect(updatedCourierInList.firstName).to.equal('Jane');
    expect(updatedCourierInList.lastName).to.equal('Smith');
  });

  it('should return null when updating a non-existent courier', () => {
    const updatedCourier = courierService.updateCourier(99999, 'Jane', 'Smith', 30, ['Driver License', 'Courier Certification']);
    expect(updatedCourier).to.be.null;
  });
});