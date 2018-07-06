angular
  .module('app')
  .component('adminDashboard', {
    templateUrl: 'app/adminDashboard.html',
    controller: adminDashboardController,
    controllerAs: 'vm'
  });

function adminDashboardController() {
  var vm = this;
}