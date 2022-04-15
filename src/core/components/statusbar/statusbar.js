import { getWindow } from 'ssr-window';
import $ from '../../shared/dom7.js';
import { bindMethods } from '../../shared/utils.js';
import { getDevice } from '../../shared/get-device.js';

const isCapacitor = () => {
  const window = getWindow();
  return (
    window.Capacitor &&
    window.Capacitor.isNative &&
    window.Capacitor.Plugins &&
    window.Capacitor.Plugins.StatusBar
  );
};

const Statusbar = {
  hide() {
    const window = getWindow();
    const device = getDevice();
    if (device.cordova && window.StatusBar) {
      window.StatusBar.hide();
    }
    if (isCapacitor()) {
      window.Capacitor.Plugins.StatusBar.hide();
    }
  },
  show() {
    const window = getWindow();
    const device = getDevice();
    if (device.cordova && window.StatusBar) {
      window.StatusBar.show();
    }
    if (isCapacitor()) {
      window.Capacitor.Plugins.StatusBar.show();
    }
  },
  onClick() {
    const app = this;
    let pageContent;
    if ($('.popup.modal-in').length > 0) {
      // Check for opened popup
      pageContent = $('.popup.modal-in')
        .find('.page:not(.page-previous):not(.page-next):not(.cached)')
        .find('.page-content');
    } else if ($('.panel.panel-in').length > 0) {
      // Check for opened panel
      pageContent = $('.panel.panel-in')
        .find('.page:not(.page-previous):not(.page-next):not(.cached)')
        .find('.page-content');
    } else if ($('.views > .view.tab-active').length > 0) {
      // View in tab bar app layout
      pageContent = $('.views > .view.tab-active')
        .find('.page:not(.page-previous):not(.page-next):not(.cached)')
        .find('.page-content');
    } else if ($('.views').length > 0) {
      pageContent = $('.views')
        .find('.page:not(.page-previous):not(.page-next):not(.cached)')
        .find('.page-content');
    } else {
      pageContent = app.$el
        .children('.view')
        .find('.page:not(.page-previous):not(.page-next):not(.cached)')
        .find('.page-content');
    }

    if (pageContent && pageContent.length > 0) {
      // Check for tab
      if (pageContent.hasClass('tab')) {
        pageContent = pageContent.parent('.tabs').children('.page-content.tab-active');
      }
      if (pageContent.length > 0) pageContent.scrollTop(0, 300);
    }
  },
  setTextColor(color) {
    const window = getWindow();
    const device = getDevice();
    if (device.cordova && window.StatusBar) {
      if (color === 'white') {
        window.StatusBar.styleLightContent();
      } else {
        window.StatusBar.styleDefault();
      }
    }
    if (isCapacitor()) {
      if (color === 'white') {
        window.Capacitor.Plugins.StatusBar.setStyle({ style: 'DARK' });
      } else {
        window.Capacitor.Plugins.StatusBar.setStyle({ style: 'LIGHT' });
      }
    }
  },
  setBackgroundColor(color) {
    const window = getWindow();
    const device = getDevice();
    if (device.cordova && window.StatusBar) {
      window.StatusBar.backgroundColorByHexString(color);
    }
    if (isCapacitor()) {
      window.Capacitor.Plugins.StatusBar.setBackgroundColor({ color });
    }
  },
  isVisible() {
    const window = getWindow();
    const device = getDevice();
    return new Promise((resolve) => {
      if (device.cordova && window.StatusBar) {
        resolve(window.StatusBar.isVisible);
      }
      if (isCapacitor()) {
        window.Capacitor.Plugins.StatusBar.getInfo().then((info) => {
          resolve(info.visible);
        });
      }
      resolve(false);
    });
  },
  overlaysWebView(overlays = true) {
    const window = getWindow();
    const device = getDevice();
    if (device.cordova && window.StatusBar) {
      window.StatusBar.overlaysWebView(overlays);
    }
    if (isCapacitor()) {
      window.Capacitor.Plugins.StatusBar.setOverlaysWebView({ overlay: overlays });
    }
  },
  init() {
    const app = this;
    const window = getWindow();
    const device = getDevice();
    const params = app.params.statusbar;
    if (!params.enabled) return;
    const isCordova = device.cordova && window.StatusBar;
    const isCap = isCapacitor();

    if (isCordova || isCap) {
      if (params.scrollTopOnClick) {
        $(window).on('statusTap', Statusbar.onClick.bind(app));
      }
      if (device.ios) {
        if (params.iosOverlaysWebView) {
          Statusbar.overlaysWebView(true);
        } else {
          Statusbar.overlaysWebView(false);
        }
        if (params.iosTextColor === 'white') {
          Statusbar.setTextColor('white');
        } else {
          Statusbar.setTextColor('black');
        }
      }
      if (device.android) {
        if (params.androidOverlaysWebView) {
          Statusbar.overlaysWebView(true);
        } else {
          Statusbar.overlaysWebView(false);
        }
        if (params.androidTextColor === 'white') {
          Statusbar.setTextColor('white');
        } else {
          Statusbar.setTextColor('black');
        }
      }
    }
    if (params.iosBackgroundColor && device.ios) {
      Statusbar.setBackgroundColor(params.iosBackgroundColor);
    }
    if (params.androidBackgroundColor && device.android) {
      Statusbar.setBackgroundColor(params.androidBackgroundColor);
    }
  },
};

export default {
  name: 'statusbar',
  params: {
    statusbar: {
      enabled: true,

      scrollTopOnClick: true,

      iosOverlaysWebView: true,
      iosTextColor: 'black',
      iosBackgroundColor: null,

      androidOverlaysWebView: false,
      androidTextColor: 'black',
      androidBackgroundColor: null,
    },
  },
  create() {
    const app = this;
    bindMethods(app, {
      statusbar: Statusbar,
    });
  },
  on: {
    init() {
      const app = this;
      Statusbar.init.call(app);
    },
  },
};
