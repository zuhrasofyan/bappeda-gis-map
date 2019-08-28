angular
  .module('app')
  .component('adminViewUserDashboard', {
    templateUrl: 'app/adminViewUserDashboard.html',
    controller: adminViewUserDashboardController,
    controllerAs: 'vm'
  });

function adminViewUserDashboardController(UserManagementService, $stateParams) {
  var vm = this;
  var userId = $stateParams.userId;
  UserManagementService.getUser(userId).then(function (d) {
    vm.user = d.data;
  });
}
