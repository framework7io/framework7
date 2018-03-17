import { document } from 'ssr-window';
import $ from 'dom7';
import Device from '../../utils/device';
import ViAd from './vi-class';

export default {
  name: 'vi',
  params: {
    vi: {
      enabled: false,
      autoplay: true,
      fallbackOverlay: true,
      fallbackOverlayText: 'Please watch this ad',
      showMute: true,
      startMuted: (Device.ios || Device.android) && !Device.cordova,
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
      connectionProvider: null,
    },
  },
  create() {
    const app = this;
    app.vi = {
      sdkReady: false,
      createAd(adParams) {
        return new ViAd(app, adParams);
      },
      loadSdk() {
        if (app.vi.skdReady) return;
        const script = document.createElement('script');
        script.onload = function onload() {
          app.emit('viSdkReady');
          app.vi.skdReady = true;
        };
        script.src = 'https://c.vi-serve.com/viadshtml/vi.min.js';
        $('head').append(script);
      },
    };
  },
  on: {
    init() {
      const app = this;
      if (app.params.vi.enabled || (app.passedParams.vi && app.passedParams.vi.enabled !== false)) app.vi.loadSdk();
    },
  },
};
