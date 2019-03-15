angular
  .module('app')
  .service('AuthService', function ($http, $rootScope, store, UserService, authManager, $state, APIURL){
    var vm = this;

    function submitRegister(userData) {
      $http.post(APIURL + 'register', {
        email: userData.email,
        password: userData.password
      }).then(function(result){
        if (result.status !== 200) {
          alert(result.data);
        } else if (result.status === 200) {
          alert('user berhasil didaftarkan. \nSilahkan cek email untuk mengaktifkan akun anda \nsebelum anda login.');
          $state.go('login')
        } else {
          alert('Terjadi kesalahan pada server.');
        }
      });
    }

    function submitLogin(loginData) {
      $http.post(APIURL + 'auth/login', {
        email: loginData.email,
        password: loginData.password
      }).then(function(result){
        if (result.status === 200) {
          if (store.get('user')) {
            store.remove('user');
          }
          if (store.get('token')) {
            store.remove('token');
          }
          UserService.setCurrentUser(result.data.user);
          UserService.setCurrentToken(result.data.token);
          authManager.authenticate();

          $state.go('dashboard');

        } else {
          if (result.status === 400) {
            alert(result.data.message);
          } else if (result.status === 401) {
            alert(result.data.message);
          } else {
            alert(result.data.message);
          }
        // TODO: else check if bad credential (result.status !== 200) return, show notification
        // else {}
        }
      });
    }

    function logout() {
      store.remove('user');
      store.remove('token');

      authManager.unauthenticate();
      $state.go('login');
    }

    function submitChangePassword(userData) {
      // console.log(APIURL + 'change-password/' + userData.id);
      $http.patch(APIURL + 'user/change-password/' + userData.id, {
        newPassword: userData.newPassword
      }).then(function(result){
        if (result.status !== 200) {
          alert(result.data);
        } else if (result.status === 200) {
          alert('Password berhasil diubah! \n Silahkan login dengan password baru anda!');
          logout();
          // $state.go('login')
        } else {
          alert('Terjadi kesalahan pada server.');
        }
      });
    }

    // register the functions
    vm.submitRegister = submitRegister;
    vm.submitLogin = submitLogin;
    vm.logout = logout;
    vm.submitChangePassword = submitChangePassword;

  })
