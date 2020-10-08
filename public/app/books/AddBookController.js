(function () {
  function addBookController($log, $location, dataService) {
    const vm = this;
    vm.newBook = {};

    function addBookSuccess(message) {
      $log.info(message);
      $location.path('/');
    }
    function addBookError(errorMessage) {
      $log.error(errorMessage);
    }
    vm.addBook = function () {
      dataService
        .addBook(vm.newBook)
        .then(addBookSuccess)
        .catch(addBookError);
    };
  }
  // eslint-disable-next-line no-undef
  angular
    .module('app')
    .controller('AddBookController', addBookController);
  addBookController.$inject = ['$log', '$location', 'dataService'];
}());
