angular
.module('app')
.component('header', {
  templateUrl: 'app/components/header/header.html',
  controller: headerController,
  controllerAs: 'vm'
});

function headerController($rootScope, AuthService) {
  var vm = this;
  vm.navCollapsed = true;
  vm.isAuthenticated = $rootScope.isAuthenticated;

  function logout() {
    AuthService.logout();
  }
  vm.logout = logout;
}
