(function () {
  function currentUser() {
    const lastBookEdited = {};
    return { lastBookEdited };
  }
  // eslint-disable-next-line no-undef
  angular
    .module('app')
    .factory('currentUser', currentUser);
}());
