angular
.module('app')
.service('LayerService', LayerService);

function LayerService($http, APIURL, $state) {
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
        $state.reload();
      } else {
        alert('Terjadi kesalahan pada server.');
      }
    });
  }
  vm.submitLayer = submitLayer;

  function getLayerList(id) {
    return $http.get(APIURL + 'sigap/all-layer-list/' + id);
  }
  vm.getLayerList = getLayerList;

  function getActiveLayerList(id) {
    return $http.get(APIURL + 'sigap/layer-list/' + id);
  }
  vm.getActiveLayerList = getActiveLayerList;

  function editLayer(layer) {
    $http.patch(APIURL + 'sigap/edit-layer/' + layer.userId + '/' +layer.id, {
      newLayerName: layer.name
    }).then(function(result){
      if (result.status !== 200) {
        alert(result.data);
      } else if (result.status === 200) {
        alert('layer berhasil diubah');
        $state.reload();
      } else {
        alert('Terjadi kesalahan pada server.');
      }
    });
  }
  vm.editLayer = editLayer;

  function deactivateLayer(layer) {
    $http.patch(APIURL + 'sigap/layer-deactivate/' + layer.userId + '/' +layer.id, {})
    .then(function(result){
      if (result.status !== 200) {
        alert(result.data);
      } else if (result.status === 200) {
        alert('layer berhasil di nonaktifkan');
        $state.reload();
      } else {
        alert('Terjadi kesalahan pada server.');
      }
    });
  }
  vm.deactivateLayer = deactivateLayer;

  function activateLayer(layer) {
    $http.patch(APIURL + 'sigap/layer-activate/' + layer.userId + '/' +layer.id, {})
    .then(function(result){
      if (result.status !== 200) {
        alert(result.data);
      } else if (result.status === 200) {
        alert('layer berhasil diaktifkan');
        $state.reload();
      } else {
        alert('Terjadi kesalahan pada server.');
      }
    });
  }
  vm.activateLayer = activateLayer;
}
