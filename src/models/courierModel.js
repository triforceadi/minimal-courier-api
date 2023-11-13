const Person = require('./personModel');

class Courier extends Person {
  constructor(id, firstName, lastName, age, licenses) {
    super(id, firstName, lastName, age);
    this.licenses = licenses;
  }
}

module.exports = Courier;