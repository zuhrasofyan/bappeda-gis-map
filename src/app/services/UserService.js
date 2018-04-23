angular
  .module('app')
  .service('UserService', UserService);

function UserService(store, jwtHelper) {
  var vm = this;
  var currentUser = null, currentToken = null;

  function setCurrentToken (token) {
    currentToken = token;
    store.set('token', token);
    return currentToken;
  }

  function setCurrentUser (user) {
    currentUser = user;
    store.set('user', user);
    return currentUser;
  }

  function getCurrentUser () {
    if (!currentUser) {
      if (!store.get('user')) {
        currentUser = {username: 'none'};
      } else {
        currentUser = store.get('user');
      }
    }
    return currentUser;
  }

  function getCurrentToken() {

    //if (!currentToken) {
      currentToken = store.get('token');
    //}
    // if (jwtHelper.isTokenExpired(store.get('token'))) {
    //   currentToken = null;
    // }
    return currentToken;
  }

  vm.setCurrentUser = setCurrentUser;
  vm.setCurrentToken = setCurrentToken;
  vm.getCurrentUser = getCurrentUser;
  vm.getCurrentToken = getCurrentToken;

}
