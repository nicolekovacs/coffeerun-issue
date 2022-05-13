(function (window) {
  const App = window.App || {};

  const Validation = {
    isCompanyEmail: function (email) {
      return /@bignerdranch\.com/.test(email);
    }
  };

  App.Validation = Validation;
  window.App = App;
})(window);
