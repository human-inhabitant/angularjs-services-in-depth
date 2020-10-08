(function () {
  function bookLoggerInterceptor($q, $log) {
    function requestInterceptor(config) {
      $log.debug(`HTTP ${config.method} request - ${config.url}`);
      return config;
    }
    function responseErrorInterceptor(response) {
      $log.debug(`HTTP ${response.config.method} response error - ${response.config.error}`);
      return $q.reject(response);
    }
    return {
      request: requestInterceptor,
      responseError: responseErrorInterceptor
    };
  }
  // eslint-disable-next-line no-undef
  angular
    .module('app')
    .factory('bookLoggerInterceptor', bookLoggerInterceptor);
  bookLoggerInterceptor.$inject = ['$q', '$log'];
}());
