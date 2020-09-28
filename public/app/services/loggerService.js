'use strict';

(function() {
  angular
    .module( 'app' )
    .service( 'logger', BookAppLogger )
  ;

  function LoggerBase() {}
  LoggerBase.prototype.output = message => {
    console.info( 'LoggerBase: %s', message );
  };
  function BookAppLogger() {
    LoggerBase.call( this );
    this.logBook = book => {
      console.info( 'Book: %s', book.title );
    };
  }
  BookAppLogger.prototype = Object.create( LoggerBase.prototype );
})();
