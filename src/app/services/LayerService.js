angular
.module('app')
.service('LayerService', LayerService);

function LayerService($http, APIURL) {
  var vm = this;

  function submitLayer(layer) {
    $http.post(APIURL + 'sigap/tambah-layer/' + layer.userId, {
      name: layer.name,
      userId: layer.userId
    }).then (function(result){
      if (result.status !== 200) {
        alert(result.data);
      } else if (result.status === 200) {
        alert('layer berhasil disimpan');
        // $state.reload();
      } else {
        alert('Terjadi kesalahan pada server.');
      }
    });
  }
  vm.submitLayer = submitLayer;

  function getLayerList(id) {
    return $http.get(APIURL + 'sigap/layer-list/' + id);
  }
  vm.getLayerList = getLayerList;
}