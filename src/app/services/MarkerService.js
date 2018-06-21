angular
  .module('app')
  .service('MarkerService', MarkerService);

function MarkerService($http, $rootScope, APIURL) {
  var vm = this;

  function submitMarker(marker) {
    $http.post(APIURL + 'sigap/save-marker/' + marker.userId, {
      layer: marker.layer,
      lat: marker.lat,
      lng: marker.lng,
      userId: marker.userId,
      pointId: marker.pointId,
      message: marker.message
    }).then (function(result){
      if (result.status !== 200) {
        alert(result.data);
      } else if (result.status === 200) {
        alert('marker berhasil disimpan');
        // $state.reload();
      } else {
        alert('Terjadi kesalahan pada server.');
      }
    });
  }
  vm.submitMarker = submitMarker;

  function deleteMarker(marker) {
    $http.post(APIURL + 'sigap/delete-marker/' + marker.userId, {
      userId: marker.userId,
      pointId: marker.pointId
    }).then (function(result){
      if (result.status !== 200) {
        alert(result.data);
      } else if (result.status === 200) {
        alert('marker berhasil didelete');
        // $state.reload();
      } else {
        alert('Terjadi kesalahan pada server.');
      }
    });
  }
  vm.deleteMarker = deleteMarker;

  function getMarkerList(id) {
    return $http.get(APIURL + 'sigap/marker-list/' + id);
  }
  vm.getMarkerList = getMarkerList;
}

