'use strict';

(function() {
  angular
    .module( 'app' )
    .controller( 'BooksController', ['$scope', BooksController])
  ;
  function BooksController( $scope ) {
    const vm = this;
  }
})();
