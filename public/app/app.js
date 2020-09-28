'use strict';

(function(){
  angular.module( 'app', [] );
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
    .config(['booksProvider', 'constants', function( booksProvider, constants ) {
      booksProvider.setIncludeVersionInTitle( true );
      console.info( 'Title from constants service: %s', constants.APP_TITLE );
    }])
  ;
})();
