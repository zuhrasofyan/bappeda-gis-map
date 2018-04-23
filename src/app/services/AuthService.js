angular
  .module('app')
  .service('AuthService', function ($http, $rootScope, store, UserService, authManager, $state){
    var vm = this;

    function submitRegister(userData) {
      $http.post('http://localhost:1337/register', {
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
      })
    }

    function submitLogin(loginData) {
      $http.post('http://localhost:1337/auth/login', {
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

          $state.go('dashboard.home');

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
      })
    };
    
    function logout() {
      store.remove('user');
      store.remove('token');

      authManager.unauthenticate();
      $state.go('login');
    }

    // register the functions
    vm.submitRegister = submitRegister;
    vm.submitLogin = submitLogin;
    vm.logout = logout;

  })