(function (window) {
  const App = window.App || {};
  const $ = window.jQuery;

  function FormHandler(selector) {
      if (!selector) {
        throw new Error('No selector provided');
      }
      this.$formElement = $(selector); // with $ the variable refers to the elements selected w/ jQuery
      if (this.$formElement.length === 0) {
        throw new Error('Could not find element with selector: ' + selector);
      }
  // For the module to be usable with any form element, we pass a selector matching the form element in html.

FormHandler.prototype.addSubmitHandler = function (fn) {
  console.log('Setting submit handler for form');
  this.$formElement.on('submit', function (event) { // Here we are using jquery's on method, which is similiar to AddEventListener.
    event.preventDefault();

    var data = {
          coffee: this.elements.coffee.value,
          email: this.elements.emailAddress.value,
          size: this.elements.size.value,
          flavor: this.elements.flavor.value,
          strength: this.elements.strength.value
        };
    console.log(data); // returns the form data as an array of objects
    fn(data)
      .then(function() {
        this.reset();
        this.elements[0].focus();
      }.bind(this));
  });
};
}
FormHandler.prototype.addInputHandler = function (fn) {
  console.log('Setting input handler for form');
  this.$formElement.on('input', '[name="emailAddress"]', function (event) {
    const emailAddress = event.target.value;
    if (fn(emailAddress)) {
      event.target.setCustomValidity('');
    } else {
      event.target.setCustomValidity(emailAddress + ' is not an authorized email address!');
    }
  });
};

  App.FormHandler = FormHandler;
  window.App = App;
})(window);
