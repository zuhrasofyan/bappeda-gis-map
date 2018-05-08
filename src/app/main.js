angular
  .module('app')
  .component('main', {
    templateUrl: 'app/main.html',
    controller: mainController,
    controllerAs: 'vm'
  });

function mainController($scope, leafletData, $timeout, MapLayerService) {
  var vm = this;
  vm.hello = 'Hello hai hai';
  vm.events = {};
 
  vm.selectedLayer = 'satu';

  vm.isDrawVisible = false;

  vm.markers = [];
  vm.controls = {
    draw: {
      draw: {
        marker: false
      }
    },
  };


  vm.close = false;
  
  vm.closeAlert = function () {
    vm.close = true;
  }

  function openAlert() {
    vm.close = false;
  }

  vm.defaults = {};
  vm.defaults.baselayers = angular.copy(MapLayerService.baselayers);
  vm.defaults.overlays = angular.copy(MapLayerService.overlays);
  vm.center = {
    lat: 5.551,
    lng: 95.322,
    zoom: 15
  };

  leafletData.getMap().then(function (map) {
    leafletData.getLayers().then(function (baselayers) {
      var drawnItems = baselayers.overlays.draw;
      map.on('draw:created', function (e) {
        var layer = e.layer;
        drawnItems.addLayer(layer);
        console.log(JSON.stringify(layer.toGeoJSON()));
      });
    });
  });

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

  vm.toggleDraw = function (layerName) {
    openAlert();
    vm.selectedLayer = layerName;
    if (vm.selectedLayer === 'draw') {
      vm.defaults.overlays.draw.visible = true;
      if (vm.isDrawVisible === true) {
        vm.isDrawVisible = false;
        // angular.element(document.querySelector('.leaflet-draw-section')).addClass('my-class');
        angular.element(document.querySelector('.leaflet-draw-section')).css('visibility', 'hidden');
      } else {
        vm.isDrawVisible = true;
        // angular.element(document.querySelector('.leaflet-draw-section')).removeClass('my-class');
        angular.element(document.querySelector('.leaflet-draw-section')).css('visibility', 'visible');
      }
    } else {
      vm.defaults.overlays.draw.visible = false;
      vm.isDrawVisible = false;
      angular.element(document.querySelector('.leaflet-draw-section')).css('visibility', 'hidden');
    }
  };

  // if click on map, add marker by pushing it to vm.markers array
  $scope.$on('leafletDirectiveMap.click', function (event, args) {
    // console.log(args);
    if (vm.selectedLayer !== 'draw') {
      var layer = vm.selectedLayer;
      var leafEvent = args.leafletEvent;
      var lat = leafEvent.latlng.lat;
      var lng = leafEvent.latlng.lng;
      var id = makeid();
      var info = 'marker baru';
      vm.markers.push({
        layer: layer,
        lat: lat,
        lng: lng,
        message: info,
        draggable: true,
        focus: true,
        id: id,
        info: info
      });
    }
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
