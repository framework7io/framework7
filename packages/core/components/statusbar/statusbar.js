'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dom = require('dom7');

var _dom2 = _interopRequireDefault(_dom);

var _ssrWindow = require('ssr-window');

var _utils = require('../../utils/utils');

var _utils2 = _interopRequireDefault(_utils);

var _device = require('../../utils/device');

var _device2 = _interopRequireDefault(_device);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var Statusbar = {
  hide: function hide() {
    (0, _dom2.default)('html').removeClass('with-statusbar');
    if (_device2.default.cordova && _ssrWindow.window.StatusBar) {
      _ssrWindow.window.StatusBar.hide();
    }
  },
  show: function show() {
    if (_device2.default.cordova && _ssrWindow.window.StatusBar) {
      _ssrWindow.window.StatusBar.show();
      _utils2.default.nextTick(function () {
        if (_device2.default.needsStatusbarOverlay()) {
          (0, _dom2.default)('html').addClass('with-statusbar');
        }
      });
      return;
    }
    (0, _dom2.default)('html').addClass('with-statusbar');
  },
  onClick: function onClick() {
    var app = this;
    var pageContent = void 0;
    if ((0, _dom2.default)('.popup.modal-in').length > 0) {
      // Check for opened popup
      pageContent = (0, _dom2.default)('.popup.modal-in').find('.page:not(.page-previous):not(.page-next):not(.cached)').find('.page-content');
    } else if ((0, _dom2.default)('.panel.panel-active').length > 0) {
      // Check for opened panel
      pageContent = (0, _dom2.default)('.panel.panel-active').find('.page:not(.page-previous):not(.page-next):not(.cached)').find('.page-content');
    } else if ((0, _dom2.default)('.views > .view.tab-active').length > 0) {
      // View in tab bar app layout
      pageContent = (0, _dom2.default)('.views > .view.tab-active').find('.page:not(.page-previous):not(.page-next):not(.cached)').find('.page-content');
    } else if ((0, _dom2.default)('.views').length > 0) {
      pageContent = (0, _dom2.default)('.views').find('.page:not(.page-previous):not(.page-next):not(.cached)').find('.page-content');
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
  setIosTextColor: function setIosTextColor(color) {
    if (_device2.default.cordova && _ssrWindow.window.StatusBar) {
      if (color === 'white') {
        _ssrWindow.window.StatusBar.styleLightContent();
      } else {
        _ssrWindow.window.StatusBar.styleDefault();
      }
    }
  },
  setBackgroundColor: function setBackgroundColor(color) {
    (0, _dom2.default)('.statusbar').css('background-color', color);
    if (_device2.default.cordova && _ssrWindow.window.StatusBar) {
      _ssrWindow.window.StatusBar.backgroundColorByHexString(color);
    }
  },
  isVisible: function isVisible() {
    if (_device2.default.cordova && _ssrWindow.window.StatusBar) {
      return _ssrWindow.window.StatusBar.isVisible;
    }
    return false;
  },
  iosOverlaysWebView: function iosOverlaysWebView() {
    var overlays = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

    if (!_device2.default.ios) return;
    if (_device2.default.cordova && _ssrWindow.window.StatusBar) {
      _ssrWindow.window.StatusBar.overlaysWebView(overlays);
      if (overlays) {
        (0, _dom2.default)('html').addClass('with-statusbar');
      } else {
        (0, _dom2.default)('html').removeClass('with-statusbar');
      }
    }
  },
  checkOverlay: function checkOverlay() {
    if (_device2.default.needsStatusbarOverlay()) {
      (0, _dom2.default)('html').addClass('with-statusbar');
    } else {
      (0, _dom2.default)('html').removeClass('with-statusbar');
    }
  },
  init: function init() {
    var app = this;
    var params = app.params.statusbar;
    if (!params.enabled) return;

    if (params.overlay === 'auto') {
      if (_device2.default.needsStatusbarOverlay()) {
        (0, _dom2.default)('html').addClass('with-statusbar');
      } else {
        (0, _dom2.default)('html').removeClass('with-statusbar');
      }

      if (_device2.default.ios && (_device2.default.cordova || _device2.default.webView)) {
        if (_ssrWindow.window.orientation === 0) {
          app.once('resize', function () {
            Statusbar.checkOverlay();
          });
        }

        (0, _dom2.default)(_ssrWindow.document).on('resume', function () {
          Statusbar.checkOverlay();
        }, false);

        app.on(_device2.default.ios ? 'orientationchange' : 'orientationchange resize', function () {
          Statusbar.checkOverlay();
        });
      }
    } else if (params.overlay === true) {
      (0, _dom2.default)('html').addClass('with-statusbar');
    } else if (params.overlay === false) {
      (0, _dom2.default)('html').removeClass('with-statusbar');
    }

    if (_device2.default.cordova && _ssrWindow.window.StatusBar) {
      if (params.scrollTopOnClick) {
        (0, _dom2.default)(_ssrWindow.window).on('statusTap', Statusbar.onClick.bind(app));
      }
      if (params.iosOverlaysWebView) {
        _ssrWindow.window.StatusBar.overlaysWebView(true);
      } else {
        _ssrWindow.window.StatusBar.overlaysWebView(false);
      }

      if (params.iosTextColor === 'white') {
        _ssrWindow.window.StatusBar.styleLightContent();
      } else {
        _ssrWindow.window.StatusBar.styleDefault();
      }
    }
    if (params.iosBackgroundColor && app.theme === 'ios') {
      Statusbar.setBackgroundColor(params.iosBackgroundColor);
    }
    if (params.materialBackgroundColor && app.theme === 'md') {
      Statusbar.setBackgroundColor(params.materialBackgroundColor);
    }
  }
};

exports.default = {
  name: 'statusbar',
  params: {
    statusbar: {
      enabled: true,
      overlay: 'auto',
      scrollTopOnClick: true,
      iosOverlaysWebView: true,
      iosTextColor: 'black',
      iosBackgroundColor: null,
      materialBackgroundColor: null
    }
  },
  create: function create() {
    var app = this;
    _utils2.default.extend(app, {
      statusbar: {
        checkOverlay: Statusbar.checkOverlay,
        hide: Statusbar.hide,
        show: Statusbar.show,
        iosOverlaysWebView: Statusbar.iosOverlaysWebView,
        setIosTextColor: Statusbar.setIosTextColor,
        setBackgroundColor: Statusbar.setBackgroundColor,
        isVisible: Statusbar.isVisible,
        init: Statusbar.init.bind(app)
      }
    });
  },

  on: {
    init: function init() {
      var app = this;
      Statusbar.init.call(app);
    }
  },
  clicks: {
    '.statusbar': function onStatusbarClick() {
      var app = this;
      if (!app.params.statusbar.enabled) return;
      if (!app.params.statusbar.scrollTopOnClick) return;
      Statusbar.onClick.call(app);
    }
  }
};