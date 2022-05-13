(function (window) {
  const App = window.App || {};

  function Truck(truckId, db) {
    this.truckId = truckId;
    this.db = db;
  } // The parameters were added to the constructor so that each instance will have a unique identifier and its own DataStore instance

  Truck.prototype.createOrder = function (order) {
    console.log('Adding order for ' + order.email);
    return this.db.add(order.email, order);
  }; // When this method is called, the Truck instance will interact with its db property through the DataStore methods, specifically the DS's add method, to store a coffee order, using the email address.

  Truck.prototype.deliverOrder = function (customerId) {
    console.log('Delivering order for ' + customerId);
    return this.db.remove(customerId);
  }; // After an order is delivered, the Truck instance removes the order from its database.

  Truck.prototype.printOrders = function (printFn) {
    this.db.getAll()
    .then(function(allData) {
      const customerIdArray = Object.keys(allData);
      console.log('Truck #' + this.truckId + ' has pending orders:');
      customerIdArray.forEach(function (id) {
        console.log(allData[id]);
        if (printFn) {
          printFn(allData[id]);
        }
      }.bind(this));
    }.bind(this)); // bind method accepts an object argument, returns a new version of the function
  }; // Retrieves all the coffee orders from the db object, then uses object.keys method to get an array of the email addresses, then iterate through the array and run a callback function for each element.

  App.Truck = Truck;
  window.App = App;

})(window);
