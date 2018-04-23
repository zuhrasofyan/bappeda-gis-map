angular
  .module('app')
  .component('dashboard', {
    templateUrl: 'app/dashboard.html',
    controller: dashboardController,
    controllerAs: 'vm'
  });


function dashboardController(UserService) {
  var vm = this;

  function getUser() {
    var a = UserService.getCurrentUser();
    return a;
  }

  vm.user = getUser();
}


