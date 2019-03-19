
angular
  .module('app')
  .component('register', {
    templateUrl: 'app/register.html',
    controller: registerController,
    controllerAs: 'vm'
  });

function registerController() {
  var vm = this;

  vm.formRegister = {};

  function clickRegister(data) {
    if (data.password !== data.password2) {
      alert('Konfirmasi password baru anda salah');
    } else {
      console.log(data);
      // buat layanan register new user
    }
  }

  vm.clickRegister = clickRegister;
}
