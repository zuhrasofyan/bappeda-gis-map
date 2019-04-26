angular
  .module('app')
  .component('userDashboard', {
    templateUrl: 'app/userDashboard.html',
    controller: userDashboardController,
    controllerAs: 'vm'
  });

function userDashboardController(UserService, AuthService, EditUserService) {
  var vm = this;

  function getUser() {
    var a = UserService.getCurrentUser();
    return a;
  }
  vm.user = getUser();

  // vm.formChangeUsername = {};
  vm.formChangePassword = {id: vm.user.id};

  function clickChangePassword(data) {
    if (data.newPassword !== data.confirmNewPassword) {
      alert('Konfirmasi password baru anda salah');
    } else {
      AuthService.submitChangePassword(data);
    }
  }
  vm.clickChangePassword = clickChangePassword;

  function clickChangeUsername(data) {
    EditUserService.editCurrentUser(vm.user.id, data);
    // vm.user = getUser();
  }
  vm.clickChangeUsername = clickChangeUsername;
}
