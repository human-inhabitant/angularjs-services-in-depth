(function () {
  function booksResource($resource) {
    return $resource('/api/books/:book_id', { book_id: '@book_id' }, { update: { method: 'PUT' } });
  }
  // eslint-disable-next-line no-undef
  angular
    .module('app')
    .factory('BooksResource', booksResource);
  booksResource.$inject = ['$resource'];
}());
