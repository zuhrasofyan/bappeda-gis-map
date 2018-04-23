angular
  .module('app')
  .service('APIInterceptor', APIInterceptor);

function APIInterceptor ($rootScope, UserService) {
  var vm = this;
  vm.request = function(config) {
    var currentUser = UserService.getCurrentUser();
    var currentToken = UserService.getCurrentToken();
    var accessToken = currentToken ? currentToken : null;
    if (accessToken) {
      config.headers.authorization = 'Bearer ' + accessToken;
    }
    return config;
  };
  vm.responseError = function (response) {
    if (response.status === 401) {
      $rootScope.$broadcast('unauthorized');
    }
    return response;
  };
}
