(function () {
  function dataService($q, $timeout, $http, constants) {
    function sendResponseData(response) {
      return response.data;
    }
    function sendGetBooksError(response) {
      return $q.reject(`Error retrieving book(s). [HTTP Status: ${response.status}]`);
    }
    function transformGetBooks(data, headersGetter) {
      // eslint-disable-next-line no-undef
      const transformed = angular.fromJson(data);
      transformed.forEach((currentValue, index, array) => {
        // eslint-disable-next-line no-param-reassign
        currentValue.dateDownloaded = new Date();
      });
      return transformed;
    }
    function getAllBooks() {
      return $http({
        method: 'GET',
        url: 'api/books',
        headers: {
          'BookLogger-Version': constants.APP_VERSION
        },
        transformResponse: transformGetBooks
      })
        .then(sendResponseData)
        .catch(sendGetBooksError);
    }
    function getBookById(bookId) {
      return $http.get(`api/books/${bookId}`)
        .then(sendResponseData)
        .catch(sendGetBooksError);
    }

    function updateBookSuccess(response) {
      return `Book updated: ${response.config.data.title}`;
    }
    function updateBookError(response) {
      return $q.reject(`Error updating book. [HTTP Status: ${response.status}]`);
    }
    function updateBook(book) {
      return $http({
        method: 'PUT',
        url: `api/books/${book.book_id}`,
        data: book,
        headers: {
          'BookLogger-Version': constants.APP_VERSION
        }
      })
        .then(updateBookSuccess)
        .catch(updateBookError);
    }

    function addBookSuccess(response) {
      return `Book added: ${response.config.data.title}`;
    }
    function addBookError(response) {
      return $q.reject(`Error adding book. [HTTP Status: ${response.status}]`);
    }
    function transformPostRequest(data, headersGetter) {
      // eslint-disable-next-line no-param-reassign
      data.newBook = true;
      return JSON.stringify(data);
    }
    function addBook(newBook) {
      return $http.post('api/books', newBook, {
        transformRequest: transformPostRequest
      })
        .then(addBookSuccess)
        .catch(addBookError);
    }

    function deleteBookSuccess(response) {
      return `Book deleted: ${response.config.data.title}`;
    }
    function deleteBookError(response) {
      return $q.reject(`Error deleting book. [HTTP Status: ${response.status}]`);
    }
    function deleteBook(bookId) {
      return $http({
        method: 'DELETE',
        url: `api/books/${bookId}`
      })
        .then(deleteBookSuccess)
        .catch(deleteBookError);
    }

    function getAllReaders() {
      const readersArray = [
        {
          reader_id: 1,
          name: 'Marie',
          weeklyReadingGoal: 315,
          totalMinutesRead: 5600
        },
        {
          reader_id: 2,
          name: 'Daniel',
          weeklyReadingGoal: 210,
          totalMinutesRead: 3000
        },
        {
          reader_id: 3,
          name: 'Lanier',
          weeklyReadingGoal: 140,
          totalMinutesRead: 600
        }
      ];
      const deferred = $q.defer();
      deferred.resolve(readersArray);
      return deferred.promise;
    }
    return {
      getAllBooks, getBookById, addBook, deleteBook, updateBook, getAllReaders
    };
  }
  // eslint-disable-next-line no-undef
  angular
    .module('app')
    .factory('dataService', dataService);
  dataService.$inject = ['$q', '$timeout', '$http', 'constants'];
}());
