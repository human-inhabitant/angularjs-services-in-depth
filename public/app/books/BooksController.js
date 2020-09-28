'use strict';

(function() {
  angular
    .module( 'app' )
    .controller( 'BooksController', ['books', 'dataService', 'logger', BooksController])
  ;
  function BooksController( books, dataService, logger ) {
    const vm = this;
    vm.appName = books.appName;
    vm.allBooks = dataService.getAllBooks();
    logger.output( 'BooksController has been created.' );
  }
})();
