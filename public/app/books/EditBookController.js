'use strict';

(function() {
  angular
    .module( 'app' )
    .controller( 'EditBookController', editBookController )
  ;
  editBookController.$inject = ['$routeParams', 'books', '$cookies'];
  function editBookController( $routeParams, books, $cookies ) {
    const vm = this;
    vm.currentBook = books.filter( item => item.book_id === parseInt( $routeParams.bookId, 10 ) )[0];
    vm.setAsFavorite = function() {
      $cookies.put( 'favoriteBook', vm.currentBook.title, {'samesite': 'strict'} );
    };
    $cookies.putObject( 'lastEdited', vm.currentBook, {'samesite': 'strict'} );
  }
})();

