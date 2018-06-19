angular
  .module('app')
  .component('main', {
    templateUrl: 'app/main.html',
    controller: mainController,
    controllerAs: 'vm'
  });

function mainController($scope, leafletData, $timeout, MapLayerService, UserService) {
  var vm = this;
  vm.events = {};

  vm.listLayer = [
    {
      id: 0,
      label: 'draw'
    },
    {
      id: 1,
      label: 'satu'
    }
  ];

  // check to enable add/edit marker
  vm.markerBool = false;
  // vm.showButtorAddMarker = true;
  vm.addLayer = function () {
    vm.markerBool = true;
  }

  // get user
  function getUser() {
    var a = UserService.getCurrentUser();
    return a;
  }
  vm.user = getUser();

  vm.defaults = {};
  vm.defaults.baselayers = angular.copy(MapLayerService.baselayers);
  vm.defaults.overlays = angular.copy(MapLayerService.overlays);
  vm.center = {
    lat: 5.551,
    lng: 95.322,
    zoom: 15
  };

  // Add new custom layer where user can place markers
  vm.nameCustomLayer = '';
  vm.showAddLayerButton = false;
  vm.buttonShowAddLayer = function () {
    vm.showAddLayerButton = true;
    vm.nameCustomLayer = '';
  };
  vm.addCustomLayer = function (layerName) {
    var addId = vm.listLayer.length + 1;
    vm.listLayer.push({
      id: addId,
      label: layerName
    });
    // cannot since its overlay not updated by angular digest
    var newCustomLayer = {
      name: layerName,
      type: 'group',
      visible: true,
      layerParams: {
        showOnSelector: true
      }
    }
    vm.defaults.overlays[addId] = newCustomLayer;

    // vm.defaults.overlays.push(
    //   addId: {
    //     name: layerName,
    //     type: 'group',
    //     visible: true,
    //     layerParams: {
    //       showOnSelector: true
    //     }
    //   }
    // );
    vm.showAddLayerButton = false;
  };

  // initialize the first selected layer is the first custom layer
  vm.selectedLayer = angular.copy(vm.listLayer[1]);

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
      return marker.pointId !== el.pointId;
    });
  };

  vm.saveMarker = function (marker) {
    console.log(marker);
    vm.markers.find(function(v){
      return v.pointId === marker.pointId;
    }).draggable = false;
  };

  vm.toggleDraw = function (layer) {
    // TODO: when toggle, save preference (last opened layer as default to show to server)
    openAlert();
    //vm.selectedLayer = layerName;
    if (vm.selectedLayer.label === 'draw') {
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

  vm.addMarker = function () {
    vm.markerBool = true;
    // if click on map, add marker by pushing it to vm.markers array
    $scope.$on('leafletDirectiveMap.click', function (event, args) {
      // console.log(args);
      if (vm.selectedLayer.label !== 'draw') {
        if (vm.markerBool === true) {
          var layer = vm.selectedLayer.label;
          var leafEvent = args.leafletEvent;
          var lat = leafEvent.latlng.lat;
          var lng = leafEvent.latlng.lng;
          var pointId = makeid();
          var info = 'marker baru';
          vm.markers.push({
            layer: layer,
            lat: lat,
            lng: lng,
            message: info,
            draggable: true,
            focus: true,
            pointId: pointId,
            userId: vm.user.id
          });
          vm.markerBool = false;
        }
      } else {
        if (vm.markerBool === true) {
          alert('Anda berada pada layer draw. Ganti layer agar bisa memasukkan titik koordinat!');
        }
        vm.markerBool = false;
      }
    });
  };

  $scope.$on('leafletDirectiveMarker.click', function (event, args) {
    vm.thisClass = false;
    blinkClick(args.model.pointId);
  });

  // if doubleclick on marker, remove marker by filtering it based on marker lattitude
  $scope.$on('leafletDirectiveMarker.dblclick', function (event, args) {
    vm.markers = vm.markers.filter(function (el) {
      // console.log(el.info);
      // console.log(args.model.info);
      return args.model.pointId !== el.pointId;
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
