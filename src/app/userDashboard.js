angular
  .module('app')
  .component('userDashboard', {
    templateUrl: 'app/userDashboard.html',
    controller: userDashboardController,
    controllerAs: 'vm'
  });

function userDashboardController(UserService, AuthService) {
  var vm = this;

  function getUser() {
    var a = UserService.getCurrentUser();
    return a;
  }
  vm.user = getUser();

  vm.formChangePassword = {id: vm.user.id};

  function clickChangePassword(data) {
    if (data.newPassword !== data.confirmNewPassword) {
      alert('Konfirmasi password baru anda salah');
    } else {
      console.log(data);
      // buat sebuah layanan AuthService untuk submit password change
      // alert('OK');
      AuthService.submitChangePassword(data);
    }
  }
  vm.clickChangePassword = clickChangePassword;
}
