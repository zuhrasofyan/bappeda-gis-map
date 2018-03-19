angular
  .module('app')
  .component('main', {
    templateUrl: 'app/main.html',
    controller: mainController,
    controllerAs: 'vm'
  });

function mainController($scope, leafletDirective) {
  var vm = this;
  vm.hello = 'Hello hai hai';
  vm.events = {};
  vm.markers = [{
    lat: 5.551,
    lng: 95.322,
    message: 'Banda Aceh',
    focus: true
  }];
  vm.defaults = {
    tileLayer: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    maxZoom: 20,
    path: {
      weight: 10,
      color: '#800000',
      opacity: 1
    }
  };
  vm.center = {
    lat: 5.551,
    lng: 95.322,
    zoom: 15
  };
  $scope.$on("leafletDirectiveMap.click", function(event, args){
    var leafEvent = args.leafletEvent;
    var lat = leafEvent.latlng.lat;
    var lng = leafEvent.latlng.lng;
    vm.markers.push({
      lat: leafEvent.latlng.lat,
      lng: leafEvent.latlng.lng,
      message: 'Lat:' + lat + '<br>Long:' + lng,
      draggable: true,
      focus: true
    });
});

}
