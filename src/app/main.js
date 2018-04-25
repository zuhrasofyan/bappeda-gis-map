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

  vm.defaults = {
    baselayers: {
      // tileLayer: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      // maxZoom: 20,
      // path: {
      //   weight: 10,
      //   color: '#800000',
      //   opacity: 1
      // }
      bappedaBaseMap: {
        name: 'Bappeda Basemap',
        url: 'https://bappeda.bandaacehkota.go.id/geoserver/uptb_gis_bna/wms',
        type: 'wms',
        maxZoom: 20,
        visible: true,
        layerOptions: {
          layers: 'uptb_gis_bna_basemap_bappeda',
          format: 'image/png',
          transparent: true,
          tiled: true,
          showOnSelector: true
        }
      },
      ikonos2005BaseMap: {
        name: 'Basemap IKONOS 2005',
        url: 'https://bappeda.bandaacehkota.go.id/geoserver/uptb_gis_bna/wms',
        type: 'wms',
        maxZoom: 20,
        visible: true,
        layerOptions: {
          layers: 'uptb_gis_bna:Ikonos_Jan2005_V2',
          format: 'image/png',
          transparent: true,
          tiled: true,
          showOnSelector: true
        }
      },
      ikonos2002BaseMap: {
        name: 'Basemap IKONOS 2002',
        url: 'https://bappeda.bandaacehkota.go.id/geoserver/uptb_gis_bna/wms',
        type: 'wms',
        maxZoom: 20,
        visible: true,
        layerOptions: {
          layers: 'uptb_gis_bna:Ikonos_2002',
          format: 'image/png',
          transparent: true,
          tiled: true,
          showOnSelector: true
        }
      },
      mapboxLight: {
        name: 'OSM',
        url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        type: 'xyz',
        maxZoom: 20,
        visible: false,
        // path: {
        //   weight: 10,
        //   color: '#800000',
        //   opacity: 1
        // },
        layerParams: {
          showOnSelector: true
        }
      },
      bingRoad: {
        name: 'Bing Jalan',
        type: 'bing',
        key: 'AlShs5Jq3KqQxpuRNEtxI4_LL5H4-okI9vxBBE_TZo2TNtJNe2Kl2le-rJ4F9jS7',
        layerOptions: {
          type: 'Road'
        }
      },
      bingTerrain: {
        name: 'Bing Satelit',
        type: 'bing',
        key: 'AlShs5Jq3KqQxpuRNEtxI4_LL5H4-okI9vxBBE_TZo2TNtJNe2Kl2le-rJ4F9jS7',
        layerOptions: {
          type: 'Aerial'
        }
      },
      // googleTerrain: {
      //   name: 'Google Terrain',
      //   layerType: 'TERRAIN',
      //   type: 'google'
      // },
      googleHybrid: {
        name: 'Google Satelit',
        layerType: 'HYBRID',
        type: 'google'
      },
      googleRoadmap: {
        name: 'Google (Jalan)',
        layerType: 'ROADMAP',
        type: 'google'
      }
    },
    overlays: {
      // fire: {
      //   name: "Fire Stations",
      //   type: "xyz",
      //   url: "http://openfiremap.org/hytiles/{z}/{x}/{y}.png",
      //   layerOptions: {
      //     attribution: "&copy; <a href=\"http://www.openfiremap.org\">OpenFireMap</a> contributors - &copy; <a href=\"http://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors",
      //     continuousWorld: true
      //   },
      //   group: "Open Fire Map"
      // },
      // em: {
      //   name: "Emergency Rooms",
      //   type: "xyz",
      //   url: "http://openfiremap.org/eytiles/{z}/{x}/{y}.png",
      //   layerOptions: {
      //     attribution: "&copy; <a href=\"http://www.openfiremap.org\">OpenFireMap</a> contributors - &copy; <a href=\"http://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors",
      //     continuousWorld: true
      //   },
      //   group: "Open Fire Map"
      // },
      draw: {
        name: 'draw',
        type: 'group',
        visible: true,
        layerParams: {
          showOnSelector: true
        }
      },
      satu: {
        name: 'SATU',
        type: 'group',
        visible: true,
        layerParams: {
          showOnSelector: true
        }
      },
      dua: {
        name: 'DUA',
        type: 'group',
        visible: true,
        layerParams: {
          showOnSelector: true
        }
      },
      lokasi: {
        name: 'Lokasi Utama',
        type: 'wms',
        visible: true,
        url: 'https://bappeda.bandaacehkota.go.id/geoserver/uptb_gis_bna/wms',
        layerParams: {
          showOnSelector: true
        },
        layerOptions: {
          layers: 'uptb_gis_bna:lokasi_utama',
          format: 'image/png',
          transparent: true,
          tiled: true,
          showOnSelector: false,
          zIndex: 1000
        },
        group: 'POI'
      },
      kantor: {
        name: 'Perkantoran',
        type: 'wms',
        visible: false,
        url: 'https://bappeda.bandaacehkota.go.id/geoserver/uptb_gis_bna/wms',
        layerParams: {
          layers: 'uptb_gis_bna:lokasi_kantor',
          format: 'image/png',
          transparent: true,
          tiled: true,
          showOnSelector: true,
          zIndex: 1000
        },
        group: 'POI'
      },
      miniMarket: {
        name: 'Lokasi Swalayan Survey Bappeda 2016',
        type: 'wms',
        visible: false,
        url: 'https://bappeda.bandaacehkota.go.id/geoserver/uptb_gis_bna/wms',
        layerParams: {
          layers: 'uptb_gis_bna:mini_market_2016_mysql',
          format: 'image/png',
          transparent: true,
          tiled: true,
          showOnSelector: true,
          zIndex: 1000
        }
      },
      baliho2016: {
        name: 'Lokasi Baliho Survey Bappeda 2016',
        type: 'wms',
        visible: false,
        url: 'https://bappeda.bandaacehkota.go.id/geoserver/uptb_gis_bna/wms',
        layerParams: {
          layers: 'uptb_gis_bna:baliho_2016',
          format: 'image/png',
          transparent: true,
          tiled: true,
          showOnSelector: true,
          zIndex: 1000
        }
      },
      fiberOptic2017: {
        name: 'Titik Fiber Optic Tower - Dinas Perhubungan Banda Aceh 2017',
        type: 'wms',
        visible: false,
        url: 'https://bappeda.bandaacehkota.go.id/geoserver/uptb_gis_bna/wms',
        layerParams: {
          layers: 'uptb_gis_bna:tiang_fo_jenis_tinggi_tiang_dengan_style',
          format: 'image/png',
          transparent: true,
          tiled: true,
          showOnSelector: true,
          zIndex: 1000
        }
      }
    }
  };
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
