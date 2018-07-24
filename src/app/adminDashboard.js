angular
  .module('app')
  .component('adminDashboard', {
    templateUrl: 'app/adminDashboard.html',
    controller: adminDashboardController,
    controllerAs: 'vm'
  });

function adminDashboardController(UserManagementService, $scope) {
  var vm = this;

  // get the list of user first
  UserManagementService.getAllUser().then(function(d){
  	vm.users = d.data;
  	vm.totalUser = d.data.length;

    // Pagination of users
    vm.viewBy = 10;
    $scope.currentPage = 1;
    vm.userPerPage = vm.viewBy;
    vm.maxSize = 5; // Max number of page buttons to show

    vm.setPage = function(pageNo) {
      $scope.currentPage = pageNo;
    }

    vm.pageChanged = function() {
      console.log('Page changed to: ' + $scope.currentPage);
    };

    // set paging should be inside this called function UserManagementService.getAllUser() 
    // otherwise, scope watch is being executed first before vm.users loaded, thus, list of user is undefined.
    function setPagingData(page) {
      var pagedData = vm.users.slice(
        (page - 1) * vm.userPerPage,
        page * vm.userPerPage
      );
      vm.thisPageUser = pagedData;
    }

    $scope.$watch("currentPage", function() {
      setPagingData($scope.currentPage);
    });
  });
  

  

}