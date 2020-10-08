(function () {
  function dataService($q, $timeout, $http, constants, $cacheFactory) {
    function deleteSummaryCache() {
      const dataCache = $cacheFactory.get('bookLoggerCache');
      dataCache.remove('summary');
    }
    function deleteAllBooksResponseFromCache() {
      const httpCache = $cacheFactory.get('$http');
      httpCache.remove('api/books');
    }
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
        transformResponse: transformGetBooks,
        cache: true
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
      deleteSummaryCache();
      deleteAllBooksResponseFromCache();
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
      deleteSummaryCache();
      deleteAllBooksResponseFromCache();
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
      deleteSummaryCache();
      deleteAllBooksResponseFromCache();
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

    function getUserSummary() {
      const deferred = $q.defer();
      let dataCache = $cacheFactory.get('bookLoggerCache');
      if (!dataCache) {
        dataCache = $cacheFactory('bookLoggerCache');
      }
      const summaryFromCache = dataCache.get('summary');
      if (summaryFromCache) {
        console.info('Returning summary from cache...');
        deferred.resolve(summaryFromCache);
      } else {
        console.info('Gathering new summary data...');
        const booksPromise = getAllBooks();
        const readersPromise = getAllReaders();
        $q
          .all([booksPromise, readersPromise])
          .then((bookLoggerData) => {
            const [allBooks, allReaders] = bookLoggerData;
            let grandTotalMinutes = 0;
            allReaders.forEach((currentReader, index, array) => {
              grandTotalMinutes += currentReader.totalMinutesRead;
            });
            const summaryData = {
              bookCount: allBooks.length,
              readerCount: allReaders.length,
              grandTotalMinutes
            };
            dataCache.put('summary', summaryData);
            deferred.resolve(summaryData);
          });
      }
      return deferred.promise;
    }
    return {
      getAllBooks, getBookById, addBook, deleteBook, updateBook, getAllReaders, getUserSummary
    };
  }
  // eslint-disable-next-line no-undef
  angular
    .module('app')
    .factory('dataService', dataService);
  dataService.$inject = ['$q', '$timeout', '$http', 'constants', '$cacheFactory'];
}());
