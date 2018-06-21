angular
  .module('app')
  .component('dashboard', {
    templateUrl: 'app/dashboard.html',
    controller: dashboardController,
    controllerAs: 'vm'
  });


function dashboardController(UserService, LayerService, $state) {
  var vm = this;

  function getUser() {
    var a = UserService.getCurrentUser();
    return a;
  }
  vm.user = getUser();

  LayerService.getLayerList(vm.user.id).then(function(d) {
    vm.layerList = d.data;
  });

  vm.newLayer = {};

  function addNewLayer(data) {
    data.userId = vm.user.id;
    LayerService.submitLayer(data);
    LayerService.getLayerList(vm.user.id).then(function(d) {
      vm.layerList = d.data;
    });
    $state.reload();
  }
  vm.addNewLayer = addNewLayer;
}


