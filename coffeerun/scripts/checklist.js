(function (window) {
  const App = window.App || {};
  const $ = window.jQuery;

  function CheckList(selector) {
    if (!selector) {
      throw new Error('No selector provided');
    }

    this.$element = $(selector);
    if (this.$element.length === 0) {
      throw new Error('Could not find element with selector: ' + selector);
    }
  }

  CheckList.prototype.addRow = function (coffeeOrder) {
    // Remove any existing rows that match the email address
    this.removeRow(coffeeOrder.email);
    // Create a new instance of a row, using the coffe order info
    const rowElement = new Row(coffeeOrder);
    // Add the new row instance's $element property to the CheckList
    this.$element.append(rowElement.$element);
  };

  CheckList.prototype.removeRow = function (email) {
    this.$element
      .find('[value="' + email + '"]')
      .closest('[data-coffee-order="checkbox"]')
      .empty();
  }; // chaining several methods together

  CheckList.prototype.addClickHandler = function (fn) {
    this.$element.on('click', 'input', function (event) {
      fn(event.target.value)
      .then(function() {
        this.removeRow(event.target.value);
      }.bind(this));
    }.bind(this));
  };

function Row(coffeeOrder) {
  const $div = $('<div/>', {
    'data-coffee-order': 'checkbox',
    class: 'checkbox'
  });

  const $label = $('<label></label>');

  const $checkbox = $('<input></input>', {
    type: 'checkbox',
    value: coffeeOrder.email
  });

  let description = coffeeOrder.size + ' ';
  if (coffeeOrder.flavor) {
    description += coffeeOrder.flavor + ' ';
  }
  description += coffeeOrder.coffee + ', ';
  description += ' (' + coffeeOrder.email + ')';
  description += ' [' + coffeeOrder.strength + 'x]';

  $label.append($checkbox);
  $label.append(description);
  $div.append($label);

  this.$element = $div;
}

App.CheckList = CheckList;
window.App = App;
})(window);
