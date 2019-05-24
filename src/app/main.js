angular
  .module('app')
  .component('main', {
    templateUrl: 'app/main.html',
    controller: mainController,
    controllerAs: 'vm'
  });

function mainController($rootScope, $scope, leafletData, $timeout, MapLayerService, UserService, lodash, LayerService, MarkerService) {
  var vm = this;

  vm.isAuthenticated = $rootScope.isAuthenticated;


  // io.socket.get('/sigap/say/hello', function(msg){
  //   console.log('connect ya');
  //   console.log(msg);
  // });
  io.socket.get('/sigap/subscribe', function (msg) {
    console.log(JSON.stringify(msg, null, 2));
  });

  io.socket.on('layers', function (msg) {
    if (msg.verb === 'created') {
      console.log(msg.data);
    }
  })

  // get user
  function getUser() {
    var a = UserService.getCurrentUser();
    return a;
  }
  vm.user = getUser();

  // default layer
  vm.listLayer = [
    {
      id: 0,
      label: 'draw'
    }
  ];

  vm.center = {
    lat: 5.551,
    lng: 95.322,
    zoom: 15
  };

  vm.defaults = {};
  vm.defaults.baselayers = angular.copy(MapLayerService.baselayers);
  var basicOverlays = angular.copy(MapLayerService.overlays);
  vm.defaults.overlays = basicOverlays;

  vm.controls = {
    draw: {
      draw: {
        marker: false
      }
    }
  };

  // Get layer list from server and push it to appropiate places in this page
  LayerService.getActiveLayerList(vm.user.id).then(function(d) {
    var temp = d.data;
    var tempLength = temp.length;
    for (var i = 0; i < tempLength; i++) {
      vm.listLayer.push({
        id: temp[i].id,
        label: temp[i].name
      });

      var thisLayerId = temp[i].id.toString();

      // key in object cannot directly use from var. so, we should insert it into its own object called x, then merge it with overlayObj
      // to make a correctly structured object that later can be assigned using lodash to vm.defaults.overlays
      var x = {};
      var key = thisLayerId;
      var overlayObj = {
        layerId: temp[i].id,
        name: temp[i].name,
        type: 'group',
        visible: true,
        layerParams: {
          showOnSelector: true
        }
      };
      x[key] = overlayObj;
      vm.defaults.overlays = lodash.assign({}, x, vm.defaults.overlays);
    }
    // initialize the first selected layer is the first custom layer
    vm.selectedLayer = angular.copy(vm.listLayer[1]);

    // after layers all placed, then define markers that will fill the layer(s)
    vm.markers = [];

    // Get marker list from server and push it to appropiate places in this page
    MarkerService.getMarkerList(vm.user.id).then(function(d){
      var temp = d.data;
      temp.forEach(function(element){
        // layer name in leaflet shoud be in string. so, convert each element.layer (id) into string, before push it to markers array
        element.layer = element.layer.toString();
        vm.markers.push(element);
      });
    });

  });

  vm.events = {};

  // check to enable add/edit marker
  vm.markerBool = false;
  vm.addLayer = function () {
    vm.markerBool = true;
  };

  // Add new custom layer where user can place markers (in progress)
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
    };
    vm.defaults.overlays[addId] = newCustomLayer;

    vm.showAddLayerButton = false;
  };

  vm.isDrawVisible = false;

  vm.close = false;

  vm.closeAlert = function () {
    vm.close = true;
  };

  function openAlert() {
    vm.close = false;
  }

  leafletData.getMap().then(function (map) {
    leafletData.getLayers().then(function (baselayers) {
      var drawnItems = baselayers.overlays.draw;
      map.on('draw:created', function (e) {
        var layer = e.layer;
        drawnItems.addLayer(layer);
        // console.log(JSON.stringify(layer.toGeoJSON()));
      });
    });
  });

  // Use this function to operate to give a blinking effect color in the responding div, based on selected marker.
  var blinkClick = function (idFromMarker) {
    var getId = '#' + idFromMarker;
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

    MarkerService.deleteMarker(marker);

    // return vm.marker list, minus deleted marker
    vm.markers = vm.markers.filter(function (el) {
      return marker.pointId !== el.pointId;
    });

  };

  vm.saveMarker = function (marker) {
    console.log(marker);
    MarkerService.submitMarker(marker);
    // after save, user cannot edit the marker anymore by making draggable false
    vm.markers.find(function (v) {
      return v.pointId === marker.pointId;
    }).draggable = false;

  };

  vm.editMarker = function(marker) {
    vm.markers.find(function (v) {
      return v.pointId === marker.pointId;
    }).draggable = true;
  };

  vm.toggleDraw = function (layer) {
    // TODO: when toggle, save preference (last opened layer as default to show to server)
    openAlert();
    if (vm.selectedLayer.label === 'draw') {
      vm.defaults.overlays.draw.visible = true;
      if (vm.isDrawVisible === true) {
        vm.isDrawVisible = false;
        angular.element(document.querySelector('.leaflet-draw-section')).css('visibility', 'hidden');
      } else {
        vm.isDrawVisible = true;
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
          var layer = vm.selectedLayer.id.toString();
          var leafEvent = args.leafletEvent;
          var lat = leafEvent.latlng.lat;
          var lng = leafEvent.latlng.lng;
          var pointId = makeid();
          var info = 'marker baru';
          vm.markers.push({
            // here in markers, layer must be string. thats why instead using layer 'name' defined (that can be renamed eventually,)
            // we use layerId that converted to string.
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
          alert ('Anda berada pada layer draw. Ganti layer agar bisa memasukkan titik koordinat!');
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
  // Currently disabled to avoid user accidentally double click marker
  // $scope.$on('leafletDirectiveMarker.dblclick', function (event, args) {
  //   vm.markers = vm.markers.filter(function (el) {
  //     return args.model.pointId !== el.pointId;
  //   });
  // });

  vm.removeMarkers = function () {
    vm.markers = [];
  };

  vm.status = {
    isCustomHeaderOpen: false,
    isFirstOpen: true,
    isFirstDisabled: false
  };

  // Main toggle sidebar
  vm.isShowSidebar = true;
  vm.colChange = 'col-xs-7';

  vm.toggleSideBar = function () {
    if (vm.colChange === 'col-xs-7') {
      vm.colChange = 'col-xs-12';
      vm.isShowSidebar = false;
    } else {
      vm.colChange = 'col-xs-7';
      vm.isShowSidebar = true;
    }
  };

  // need to call scope digest to make sure all elements updated
  $scope.digest;
}
