'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ssrWindow = require('ssr-window');

var _dom = require('dom7');

var _dom2 = _interopRequireDefault(_dom);

var _device = require('../../utils/device');

var _device2 = _interopRequireDefault(_device);

var _viClass = require('./vi-class');

var _viClass2 = _interopRequireDefault(_viClass);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

exports.default = {
  name: 'vi',
  params: {
    vi: {
      enabled: false,
      autoplay: true,
      fallbackOverlay: true,
      fallbackOverlayText: 'Please watch this ad',
      showMute: true,
      startMuted: (_device2.default.ios || _device2.default.android) && !_device2.default.cordova,
      appId: null,
      appVer: null,
      language: null,
      width: null,
      height: null,
      placementId: 'pltd4o7ibb9rc653x14',
      placementType: 'interstitial',
      videoSlot: null,
      showProgress: true,
      showBranding: true,
      os: null,
      osVersion: null,
      orientation: null,
      age: null,
      gender: null,
      advertiserId: null,
      latitude: null,
      longitude: null,
      accuracy: null,
      storeId: null,
      ip: null,
      manufacturer: null,
      model: null,
      connectionType: null,
      connectionProvider: null
    }
  },
  create: function create() {
    var app = this;
    app.vi = {
      sdkReady: false,
      createAd: function createAd(adParams) {
        return new _viClass2.default(app, adParams);
      },
      loadSdk: function loadSdk() {
        if (app.vi.skdReady) return;
        var script = _ssrWindow.document.createElement('script');
        script.onload = function onload() {
          app.emit('viSdkReady');
          app.vi.skdReady = true;
        };
        script.src = 'https://c.vi-serve.com/viadshtml/vi.min.js';
        (0, _dom2.default)('head').append(script);
      }
    };
  },

  on: {
    init: function init() {
      var app = this;
      if (app.params.vi.enabled || app.passedParams.vi && app.passedParams.vi.enabled !== false) app.vi.loadSdk();
    }
  }
};