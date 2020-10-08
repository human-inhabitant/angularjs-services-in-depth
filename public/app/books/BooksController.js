(function () {
  function BooksController($q, books, dataService, badgeService, $log, $cookies, $route, BooksResource) {
    const vm = this;
    vm.appName = books.appName;
    vm.getBadge = badgeService.retrieveBadge;
    vm.favoriteBook = $cookies.get('favoriteBook');
    vm.lastEdited = $cookies.getObject('lastEdited');

    $log.info('BooksController has been created.');

    const booksPromise = dataService.getAllBooks();
    const readerPromise = dataService.getAllReaders();

    function getAllDataSuccess(dataArray) {
      [vm.allBooks, vm.allReaders] = dataArray;
    }
    function getAllDataError(reason) {
      $log.error('Error Message:', reason);
    }
    $q
      .all([booksPromise, readerPromise])
      .then(getAllDataSuccess)
      .catch(getAllDataError);

    function deleteBookSuccess(message) {
      $log.info(message);
      $route.reload();
    }
    function deleteBookError(errorMessage) {
      $log.error(errorMessage);
    }
    vm.deleteBook = function (bookId) {
      dataService
        .deleteBook(bookId)
        .then(deleteBookSuccess)
        .catch(deleteBookError);
    };
    /*
    dataService
      .getAllBooks()
      .then( getBooksSuccess, null, getBooksNotification )
      .catch( errorCallback )
      .finally( getAllBooksComplete )
    ;
    dataService
      .getAllReaders()
      .then( getReadersSuccess )
      .catch( errorCallback )
      .finally( getAllReadersComplete )
    ;
    function getBooksSuccess( books ) {
      vm.allBooks = books;
    }
    function errorCallback( errorMsg ) {
      console.error( 'Error Message:', errorMsg );
    }
    function getBooksNotification( notification ) {
      console.info( 'Promise Notification: %s', notification );
    }
    function getAllBooksComplete() {
      console.info( 'getAllBooks has completed...' );
    }
    function getReadersSuccess( readers ) {
      vm.allReaders = readers;
    }
    function getAllReadersComplete() {
      console.info( 'getAllReaders has completed...' );
    }
    */
  }
  // eslint-disable-next-line no-undef
  angular
    .module('app')
    .controller('BooksController', BooksController);
  BooksController.$inject = ['$q', 'books', 'dataService', 'badgeService', '$log', '$cookies', '$route', 'BooksResource'];
}());
