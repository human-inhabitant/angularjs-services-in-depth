'use strict';

(function() {
  angular
    .module( 'app' )
    .controller( 'BooksController', BooksController )
  ;
  BooksController.$inject = ['$q', 'books', 'dataService', 'badgeService', 'logger'];
  function BooksController( $q, books, dataService, badgeService, logger ) {
    const vm = this;
    vm.appName = books.appName;
    vm.getBadge = badgeService.retrieveBadge;
    logger.output( 'BooksController has been created.' );

    const booksPromise = dataService.getAllBooks();
    const readerPromise = dataService.getAllReaders();
    $q
      .all([booksPromise, readerPromise])
      .then( getAllDataSuccess )
      .catch( getAllDataError )
    ;
    function getAllDataSuccess( dataArray ) {
      vm.allBooks = dataArray[0];
      vm.allReaders = dataArray[1];
    }
    function getAllDataError( reason ) {
      console.error( 'Error Message:', reason );
    }

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
})();
