(function () {
  function editBookController($routeParams, books, $cookies, dataService, $log, $location) {
    const vm = this;
    function getBookSuccess(book) {
      vm.currentBook = book;
      $cookies.putObject('lastEdited', vm.currentBook, { samesite: 'strict' });
    }
    function getBookError(reason) {
      $log.error(reason);
    }
    dataService
      .getBookById($routeParams.bookId)
      .then(getBookSuccess)
      .catch(getBookError);

    // vm.currentBook = books.filter(
    // item => item.book_id === parseInt( $routeParams.bookId, 10 ) )[0];
    vm.setAsFavorite = function () {
      $cookies.put('favoriteBook', vm.currentBook.title, { samesite: 'strict' });
    };
    function updateBookSuccess(message) {
      $log.info(message);
      $location.path('/');
    }
    function updateBookError(errorMessage) {
      $log.error(errorMessage);
    }
    vm.saveBook = function () {
      dataService
        .updateBook(vm.currentBook)
        .then(updateBookSuccess)
        .catch(updateBookError);
      /* vm.currentBook.$update();
      $location.path('/'); */
    };
  }
  // eslint-disable-next-line no-undef
  angular
    .module('app')
    .controller('EditBookController', editBookController);
  editBookController.$inject = ['$routeParams', 'books', '$cookies', 'dataService', '$log', '$location'];
}());
