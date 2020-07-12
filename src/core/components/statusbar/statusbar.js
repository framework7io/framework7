import { getWindow } from 'ssr-window';
import $ from '../../utils/dom7';
import { bindMethods } from '../../utils/utils';
import { getDevice } from '../../utils/get-device';

const Statusbar = {
  hide() {
    const window = getWindow();
    const device = getDevice();
    if (device.cordova && window.StatusBar) {
      window.StatusBar.hide();
    }
  },
  show() {
    const window = getWindow();
    const device = getDevice();
    if (device.cordova && window.StatusBar) {
      window.StatusBar.show();
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
      pageContent = app.root
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
  },
  setBackgroundColor(color) {
    const window = getWindow();
    const device = getDevice();
    if (device.cordova && window.StatusBar) {
      window.StatusBar.backgroundColorByHexString(color);
    }
  },
  isVisible() {
    const window = getWindow();
    const device = getDevice();
    if (device.cordova && window.StatusBar) {
      return window.StatusBar.isVisible;
    }
    return false;
  },
  overlaysWebView(overlays = true) {
    const window = getWindow();
    const device = getDevice();
    if (device.cordova && window.StatusBar) {
      window.StatusBar.overlaysWebView(overlays);
    }
  },
  init() {
    const app = this;
    const window = getWindow();
    const device = getDevice();
    const params = app.params.statusbar;
    if (!params.enabled) return;

    if (device.cordova && window.StatusBar) {
      if (params.scrollTopOnClick) {
        $(window).on('statusTap', Statusbar.onClick.bind(app));
      }
      if (device.ios) {
        if (params.iosOverlaysWebView) {
          window.StatusBar.overlaysWebView(true);
        } else {
          window.StatusBar.overlaysWebView(false);
        }
        if (params.iosTextColor === 'white') {
          window.StatusBar.styleLightContent();
        } else {
          window.StatusBar.styleDefault();
        }
      }
      if (device.android) {
        if (params.androidOverlaysWebView) {
          window.StatusBar.overlaysWebView(true);
        } else {
          window.StatusBar.overlaysWebView(false);
        }
        if (params.androidTextColor === 'white') {
          window.StatusBar.styleLightContent();
        } else {
          window.StatusBar.styleDefault();
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
