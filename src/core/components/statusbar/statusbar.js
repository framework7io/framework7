import $ from 'dom7';
import { window } from 'ssr-window';
import Utils from '../../utils/utils';
import Device from '../../utils/device';

const Statusbar = {
  hide() {
    if (Device.cordova && window.StatusBar) {
      window.StatusBar.hide();
    }
  },
  show() {
    if (Device.cordova && window.StatusBar) {
      window.StatusBar.show();
    }
  },
  onClick() {
    const app = this;
    let pageContent;
    if ($('.popup.modal-in').length > 0) {
      // Check for opened popup
      pageContent = $('.popup.modal-in').find('.page:not(.page-previous):not(.page-next):not(.cached)').find('.page-content');
    } else if ($('.panel.panel-in').length > 0) {
      // Check for opened panel
      pageContent = $('.panel.panel-in').find('.page:not(.page-previous):not(.page-next):not(.cached)').find('.page-content');
    } else if ($('.views > .view.tab-active').length > 0) {
      // View in tab bar app layout
      pageContent = $('.views > .view.tab-active').find('.page:not(.page-previous):not(.page-next):not(.cached)').find('.page-content');
    } else if ($('.views').length > 0) {
      pageContent = $('.views').find('.page:not(.page-previous):not(.page-next):not(.cached)').find('.page-content');
    } else {
      pageContent = app.root.children('.view').find('.page:not(.page-previous):not(.page-next):not(.cached)').find('.page-content');
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
    if (Device.cordova && window.StatusBar) {
      if (color === 'white') {
        window.StatusBar.styleLightContent();
      } else {
        window.StatusBar.styleDefault();
      }
    }
  },
  setBackgroundColor(color) {
    if (Device.cordova && window.StatusBar) {
      window.StatusBar.backgroundColorByHexString(color);
    }
  },
  isVisible() {
    if (Device.cordova && window.StatusBar) {
      return window.StatusBar.isVisible;
    }
    return false;
  },
  overlaysWebView(overlays = true) {
    if (Device.cordova && window.StatusBar) {
      window.StatusBar.overlaysWebView(overlays);
    }
  },
  init() {
    const app = this;
    const params = app.params.statusbar;
    if (!params.enabled) return;

    if (Device.cordova && window.StatusBar) {
      if (params.scrollTopOnClick) {
        $(window).on('statusTap', Statusbar.onClick.bind(app));
      }
      if (Device.ios) {
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
      if (Device.android) {
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
    if (params.iosBackgroundColor && Device.ios) {
      Statusbar.setBackgroundColor(params.iosBackgroundColor);
    }
    if (params.androidBackgroundColor && Device.android) {
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
    Utils.extend(app, {
      statusbar: {
        hide: Statusbar.hide,
        show: Statusbar.show,
        overlaysWebView: Statusbar.overlaysWebView,
        setTextColor: Statusbar.setTextColor,
        setBackgroundColor: Statusbar.setBackgroundColor,
        isVisible: Statusbar.isVisible,
        init: Statusbar.init.bind(app),
      },
    });
  },
  on: {
    init() {
      const app = this;
      Statusbar.init.call(app);
    },
  },
};
