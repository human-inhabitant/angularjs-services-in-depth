'use strict';

(function(){
  angular.module( 'app', ['ngRoute','ngCookies'] );
  angular
    .module( 'app' )
    .provider( 'books', [ 'constants', function( constants ) {
      this.$get = function() {
        let appName = constants.APP_TITLE;
        let appDesc = constants.APP_DESCRIPTION;
        let version = constants.APP_VERSION;
        if ( includeVersionInTitle ) {
          appName += ` ${version}`;
        }
        return {
          appName, appDesc
        };
      };

      let includeVersionInTitle = false;
      this.setIncludeVersionInTitle = value => {
        includeVersionInTitle = value;
      };
    }])
    .config(['booksProvider', '$routeProvider', function( booksProvider, $routeProvider ) {
      booksProvider.setIncludeVersionInTitle( true );
      $routeProvider
        .when( '/', {
          templateUrl: '/app/templates/books.html',
          controller: 'BooksController',
          controllerAs: 'books'
        })
        .when( '/addBook',{
          templateUrl: '/app/templates/addBook.html',
          controller: 'AddBookController',
          controllerAs: 'addBook'
        })
        .when( '/editBook/:bookId',{
          templateUrl: '/app/templates/editBook.html',
          controller: 'EditBookController',
          controllerAs: 'bookEditor',
          resolve: {
            books: dataService => dataService.getAllBooks()
          }
        })
        .otherwise( '/' )
      ;
    }])
    .run(['$rootScope', function( $rootScope ) {
      $rootScope
        .$on( '$routeChangeSuccess', function( event, current, previous ) {
          console.info( '$routeChangeSuccess: Successfully changed routes...' );
        })
      ;
      $rootScope
        .$on( '$routeChangeError', function( event, current, previous, rejection ) {
          console.info( '$routeChangeError: Error changing routes...' );
          console.info( 'event', event );
          console.info( 'current', current );
          console.info( 'previous', previous );
          console.info( 'rejection', rejection );
        })
      ;
    }])
  ;
})();
