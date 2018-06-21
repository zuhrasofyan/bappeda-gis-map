angular
.module('app')
.service('LayerService', LayerService);

function LayerService($http, APIURL) {
  var vm = this;

  function getLayerList(id) {
    return $http.get(APIURL + 'sigap/layer-list/' + id);
  }
  vm.getLayerList = getLayerList;
}