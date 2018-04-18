angular
  .module('app')
  .component('login', {
    templateUrl: 'app/login.html',
    controller: loginController,
    controllerAs: 'vm'
  });

function loginController() {
  var vm = this;
  vm.namaApp = 'SIGAP';
}

