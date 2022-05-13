(function (window) {
  const App = window.App || {}; // If there's an App property of the window, we'll assign the local App to it. If not, the label App will refer to a new, empty object. || is the default operator.
  const Promise = window.Promise;

  function DataStore() {
    this.data = {};
  }

  DataStore.prototype.add = function (key, val) {
    this.data[key] = val;
    const promise = new Promise(function(resolve, reject) {
      this.data[key] = val;
      resolve();
    }.bind(this));

    return promise;
  }; // Stores the order info (val), using the customer's email address (key)

  DataStore.prototype.get = function (key) {
    const promise = new Promise(function(resolve, reject) {
      resolve(this.data[key]);
    }.bind(this));

    return promise;
  }; // This is a get method that accepts a key, looks up the value for it in the instance's data property and returns it.

  DataStore.prototype.getAll = function () {
    const promise = new Promise(function(resolve, reject) {
      resolve(this.data);
    }.bind(this));
    return promise;
  }; // This is a getAll method, looks up the value for a single key, returns a reference to the data property.

  DataStore.prototype.remove = function (key) {
    const promise = new Promise(function(resolve, reject) {
          delete this.data[key];
          resolve();
        }.bind(this));
        return promise;
    }; // The delete operator removes a key/value pair from an object when the new remove emthod is called.

  App.DataStore = DataStore;
  window.App = App; // We have atatched DataStore to the App object a reassigned the global App property to the newly modified App.
})(window);

// This is the DataStore module, which can store data, provide stored data in response to queries and delete unneccessary data on command.
