(function () {
  // eslint-disable-next-line no-undef
  angular.module('app', ['ngRoute', 'ngCookies', 'ngResource']);
  // eslint-disable-next-line no-undef
  angular
    .module('app')
    .provider('books', ['constants', function (constants) {
      let includeVersionInTitle = false;
      this.setIncludeVersionInTitle = (value) => {
        includeVersionInTitle = value;
      };
      this.$get = function () {
        let appName = constants.APP_TITLE;
        const appDesc = constants.APP_DESCRIPTION;
        const version = constants.APP_VERSION;
        if (includeVersionInTitle) {
          appName += ` ${version}`;
        }
        return { appName, appDesc };
      };
    }])
    .config(['booksProvider', '$routeProvider', '$logProvider', '$httpProvider',
      function (booksProvider, $routeProvider, $logProvider, $httpProvider) {
        booksProvider.setIncludeVersionInTitle(true);
        $logProvider.debugEnabled(true);
        $httpProvider.interceptors.push('bookLoggerInterceptor');
        $routeProvider
          .when('/', {
            templateUrl: '/app/templates/books.html',
            controller: 'BooksController',
            controllerAs: 'books'
          })
          .when('/addBook', {
            templateUrl: '/app/templates/addBook.html',
            controller: 'AddBookController',
            controllerAs: 'bookAdder'
          })
          .when('/editBook/:bookId', {
            templateUrl: '/app/templates/editBook.html',
            controller: 'EditBookController',
            controllerAs: 'bookEditor'
          })
          .otherwise('/');
      }])
    .run(['$rootScope', '$log', function ($rootScope, $log) {
      $rootScope
        .$on('$routeChangeSuccess', () => {
          $log.info('$routeChangeSuccess: Successfully changed routes...');
        });
      $rootScope
        .$on('$routeChangeError', (event, current, previous, rejection) => {
          $log.info('$routeChangeError: Error changing routes...');
          $log.info('event', event);
          $log.info('current', current);
          $log.info('previous', previous);
          $log.info('rejection', rejection);
        });
    }]);
}());
