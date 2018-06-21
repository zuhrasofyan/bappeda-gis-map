angular
  .module('app', ['ui.router', 'angular-storage', 'angular-jwt', 'ngAnimate', 'ngTouch', 'ui.bootstrap', 'nemLogging', 'ui-leaflet', 'ngLodash'])
  // 'APIURL', 'https://bappeda.bandaacehkota.go.id/service/kpk/'
  .constant('APIURL', 'http://localhost:1337/')
  .run(function ($rootScope, $state, store, jwtHelper, $location, authManager) {
    // authManager.checkAuthOnRefresh();
    // run check on each of refreshed state
    $rootScope.$on('$locationChangeStart', function() {
      // Get the JWT that is saved in localStorage
      // and if it is there, check whether it is expired.
      // If it isn't, set the user's auth state
      var token = store.get('token');
      if (token) {
        if (!jwtHelper.isTokenExpired(token)) {
          if (authManager.isAuthenticated) {
            authManager.authenticate(store.get('user'), token);
          }
        }
      }
      else {
        // Otherwise, redirect to the home route
        $rootScope.isAuthenticated = false;
        // do not use $state.go('login') since it will redirect everything to login even when in the unprotected state
        // $location.path('/');
      }
    });
  });
