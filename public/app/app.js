'use strict';

(function(){
  angular.module( 'app', [] );
  angular
    .module( 'app' )
    .provider( 'books', function() {
      this.$get = function() {
        let appName = 'Book Logger';
        const appDesc = 'Track which books you read.';
        const version = '0.6.5';
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
    })
    .config( function( booksProvider ) {
      booksProvider.setIncludeVersionInTitle( true );
    })
  ;
})();
