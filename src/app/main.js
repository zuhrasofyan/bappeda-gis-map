angular
  .module('app')
  .component('main', {
    templateUrl: 'app/main.html',
    controller: mainController,
    controllerAs: 'vm'
  });

function mainController($scope, leafletData, $timeout) {
  var vm = this;
  vm.hello = 'Hello hai hai';
  vm.events = {};

  vm.markers = [];
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

  // Use this function to operate to give a blinking effect color in the responding div, based on selected marker.
  var blinkClick = function (idFromMarker) {
    var getId = '#'+idFromMarker;
    angular.element(document.querySelector(getId)).addClass('blinking');
    $timeout(function () {
      angular.element(document.querySelector(getId)).removeClass('blinking');
    }, 1000);
  };

  // random string for id
  function makeid() {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

    for (var i = 0; i < 5; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }
  vm.removeMarker = function (marker) {
    vm.markers = vm.markers.filter(function (el) {
      return marker.id !== el.id;
    });
  };

  // if click on map, add marker by pushing it to vm.markers array
  $scope.$on('leafletDirectiveMap.click', function (event, args) {
    // console.log(args);
    var leafEvent = args.leafletEvent;
    var lat = leafEvent.latlng.lat;
    var lng = leafEvent.latlng.lng;
    var id = makeid();
    var info = 'marker baru';
    vm.markers.push({
      lat: leafEvent.latlng.lat,
      lng: leafEvent.latlng.lng,
      message: '<b>ID: ' + id + '</b>',
      draggable: true,
      focus: true,
      id: id,
      info: info
    });
  });

  $scope.$on('leafletDirectiveMarker.click', function (event, args) {
    vm.thisClass = false;
    blinkClick(args.model.id);
  });

  // if doubleclick on marker, remove marker by filtering it based on marker lattitude
  $scope.$on('leafletDirectiveMarker.dblclick', function (event, args) {
    vm.markers = vm.markers.filter(function (el) {
      // console.log(el.info);
      // console.log(args.model.info);
      return args.model.id !== el.id;
    });
  });

  vm.removeMarkers = function () {
    vm.markers = [];
  };

  vm.status = {
    isCustomHeaderOpen: false,
    isFirstOpen: true,
    isFirstDisabled: false
  };

  // need to call scope digest to make sure all elements updated
  $scope.digest;
}
