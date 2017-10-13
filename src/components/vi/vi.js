import $ from 'dom7';
import Device from '../../utils/device';
import ViAd from './vi-class';

export default {
  name: 'vi',
  params: {
    vi: {
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
      placementId: null,
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
      createAd(adParams) {
        return new ViAd(app, adParams);
      },
    };
  },
  on: {
    init() {
      const s1 = document.createElement('script');
      s1.src = 'vi.js';
      const s2 = document.createElement('script');
      s2.src = 'viFrame.js';

      $('head').append(s1);
      $('head').append(s2);
    },
  },
};
