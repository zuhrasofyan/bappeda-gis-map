angular
  .module('app')
  .component('login', {
    templateUrl: 'app/login.html',
    controller: loginController,
    controllerAs: 'vm'
  });

function loginController(store, AuthService) {
  var vm = this;
  vm.namaApp = 'SIGAP';

  vm.formLogin = {};

  vm.myToken = '';

  function clickLogin(data) {
    AuthService.submitLogin(data);
    if (store.get('token')) {
      vm.myToken = store.get('token');
    }
  }
  vm.clickLogin = clickLogin;
}

