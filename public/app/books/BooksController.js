'use strict';

(function() {
  angular
    .module( 'app' )
    .controller( 'BooksController', ['books', BooksController])
  ;
  function BooksController( books ) {
    const vm = this;
    vm.appName = books.appName;
  }
})();
