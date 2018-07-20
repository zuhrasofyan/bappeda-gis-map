angular
  .module('app')
  .component('dashboard', {
    templateUrl: 'app/dashboard.html',
    controller: dashboardController,
    controllerAs: 'vm'
  });


function dashboardController(UserService, LayerService, MarkerService, $state, $uibModal) {
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

  // after layers all placed, then define markers that will fill the layer(s)
  vm.markers = [];
  
  // Get marker list from server and push it to appropiate places in this page
  MarkerService.getMarkerList(vm.user.id).then(function(d){
    var temp = d.data;
    var tempLength = temp.length;
    for (var i = 0; i < tempLength; i++) {
      vm.markers.push(temp[i]);
    }
  });


  // show marker list of each layer
  // based on http://brianhann.com/pass-data-to-a-ui-bootstrap-modal-without-scope/
  function bukaModal(layer, markers) {
    $uibModal.open({
      templateUrl: 'app/components/modalTableMarker/modalTableMarker.html',
      controller: ['$uibModalInstance', 'layer', 'markers', ShowtableMarkerCtrl],
      controllerAs: 'vm',
      resolve: {
        layer: function() { return layer },
        markers: function() {return markers}
        // people: function () { return vm.people },
        // person: function() { return person; }
      }
    });
  }
  vm.bukaModal = bukaModal;

}
// Outside dashboard component
// Controller of component modalTableMarker
function ShowtableMarkerCtrl($uibModalInstance, layer, markers) {
  var vm = this;
  
  vm.layer = layer;
  vm.markers = markers;
  
  function tutup() {
    $uibModalInstance.close();
  }
  vm.tutup = tutup;

  function exportMarkerList() {
    var excelName = vm.layer.name + '.xlsx';
    // import and download the html table of a marker list 
    var wb = XLSX.utils.table_to_book(document.getElementById('tabel-marker'));
    XLSX.writeFile(wb, excelName);
  }
  vm.exportMarkerList = exportMarkerList;

}


