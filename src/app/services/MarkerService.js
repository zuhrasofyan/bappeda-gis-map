angular
  .module('app')
  .service('MarkerService', MarkerService);

function MarkerService($http, $rootScope, APIURL) {
  var vm = this;

  function submitMarker(marker) {
    $http.post(APIURL + 'sigap/tambah-marker/' + marker.id, {
      layer: marker.layer,
      lat: marker.lat,
      lng: marker.lng,
      userId: marker.userId,
      pointId: marker.id,
      message: marker.message
    }).then (function(result){
      if (result.status !== 200) {
        alert(result.data);
      } else if (result.status === 200) {
        alert('marker berhasil disimpan');
        $state.reload();
      } else {
        alert('Terjadi kesalahan pada server.');
      }
    });
  }
  vm.submitMarker = submitMarker;
}

