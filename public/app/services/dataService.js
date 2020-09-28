'use strict';

(function() {
  angular
    .module( 'app' )
    .factory( 'dataService', dataService )
  ;
  dataService.$inject = ['$q', '$timeout', 'logger'];
  function dataService( $q, $timeout, logger ) {
    return { getAllBooks, getAllReaders };

    function getAllBooks() {
      logger.output( 'Getting all books...' );
      const booksArray = [
        {
          book_id: 1,
          title: 'Harry Potter and the Deathly Hallows',
          author: 'J.K. Rowling',
          yearPublished: 2000
        },
        {
          book_id: 2,
          title: 'The Cat in the Hat',
          author: 'Dr. Seuss',
          yearPublished: 1957
        },
        {
          book_id: 3,
          title: 'Encyclopedia Brown, Boy Detective',
          author: 'Donald J. Sobol',
          yearPublished: 1963
        }
      ];
      const deferred = $q.defer();
      $timeout( () => {
        let success = true;
        if ( success ) {
          deferred.notify( 'Just getting started gathering books...' );
          deferred.notify( 'Almost done gathering books...' );
          deferred.resolve( booksArray );
        } else {
          deferred.reject( 'Error retrieving books...' );
        }
      }, 1e3 );
      return deferred.promise;
    }
    function getAllReaders() {
      logger.output( 'Getting all readers...' );
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
      $timeout( () => {
        deferred.resolve( readersArray );
      }, 16e2 );
      return deferred.promise;
    }
  }
})();

