angular
  .module('app')
  .service('MapLayerService', MapLayerService);

function MapLayerService() {
	var vm = this;
	vm.baselayers = {
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
  };

  vm.overlays = {
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
}
