

angular
  .module('app')
  .service('UserManagementService', UserManagementService);

function UserManagementService($http, APIURL) {
  var vm = this;

	// get all user for admin & officer
  function getAllUser() {
    return $http.get(APIURL + 'officer/get-all-user');
  }

  function getUser(id) {
    return $http.get(APIURL + 'officer/get-single-user-data/' + id);
  }

  vm.getAllUser = getAllUser;
  vm.getUser = getUser;
}
