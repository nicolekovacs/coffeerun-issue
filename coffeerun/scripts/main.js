(function (window) {
  const form_selector = '[data-coffee-order="form"]';
  const checklist_selector = '[data-coffee-order="checklist"]';
  const server_url = 'http://coffeerun-v1-rest-api.herokuapp.com/api/coffeeorders/';

  const App = window.App;
  const Truck = App.Truck;
  const DataStore = App.DataStore;
  const RemoteDataStore = App.RemoteDataStore;
  const FormHandler = App.FormHandler;
  const Validation = App.Validation;
  const CheckList = App.CheckList;

  const remoteDS = new RemoteDataStore(server_url);

  const myTruck = new Truck('coffeeCat', remoteDS); // creates an instance of Truck, providing it an id an an instance of DS
  window.myTruck = myTruck; // exporting the variables to global namespace

  const checkList = new CheckList(checklist_selector);
  checkList.addClickHandler(myTruck.deliverOrder.bind(myTruck));

  const formHandler = new FormHandler(form_selector);

  formHandler.addSubmitHandler(function (data) {
    return myTruck.createOrder.call(myTruck, data)
      .then(function() {
          checkList.addRow.call(checkList, data);
      });
  });

  formHandler.addInputHandler(Validation.isCompanyEmail);

  myTruck.printOrders(checkList.addRow.bind(checkList));
})(window);
