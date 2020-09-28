'use strict';

(function() {
  angular
    .module( 'app' )
    .controller( 'BooksController', BooksController )
  ;
  BooksController.$inject = ['books', 'dataService', 'badgeService', 'logger'];
  function BooksController( books, dataService, badgeService, logger ) {
    const vm = this;
    vm.appName = books.appName;
    vm.allBooks = dataService.getAllBooks();
    vm.allReaders = dataService.getAllReaders();
    vm.getBadge = badgeService.retrieveBadge;
    logger.output( 'BooksController has been created.' );
  }
})();
