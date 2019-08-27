angular
  .module('app')
  .component('adminViewUserDashboard', {
    templateUrl: 'app/adminViewUserDashboard.html',
    controller: adminViewUserDashboardController,
    controllerAs: 'vm'
  });

function adminViewUserDashboardController() {
  var vm = this;
  vm.hello = 'hello yaa';
}
