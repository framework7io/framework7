'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dom = require('dom7');

var _dom2 = _interopRequireDefault(_dom);

var _ssrWindow = require('ssr-window');

var _device = require('../../utils/device');

var _device2 = _interopRequireDefault(_device);

var _support = require('../../utils/support');

var _support2 = _interopRequireDefault(_support);

var _viewClass = require('../../components/view/view-class');

var _viewClass2 = _interopRequireDefault(_viewClass);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function initClicks(app) {
  function handleClicks(e) {
    var clicked = (0, _dom2.default)(e.target);
    var clickedLink = clicked.closest('a');
    var isLink = clickedLink.length > 0;
    var url = isLink && clickedLink.attr('href');
    var isTabLink = isLink && clickedLink.hasClass('tab-link') && (clickedLink.attr('data-tab') || url && url.indexOf('#') === 0);

    // Check if link is external
    if (isLink) {
      // eslint-disable-next-line
      if (clickedLink.is(app.params.clicks.externalLinks) || url && url.indexOf('javascript:') >= 0) {
        var target = clickedLink.attr('target');
        if (url && (target === '_system' || target === '_blank' || target === '_browser')) {
          e.preventDefault();
          if (target !== '_browser' && _ssrWindow.window.cordova && _ssrWindow.window.cordova.InAppBrowser) {
            _ssrWindow.window.cordova.InAppBrowser.open(url, target);
          } else {
            _ssrWindow.window.open(url, target);
          }
        }
        return;
      }
    }

    // Modules Clicks
    Object.keys(app.modules).forEach(function (moduleName) {
      var moduleClicks = app.modules[moduleName].clicks;
      if (!moduleClicks) return;
      Object.keys(moduleClicks).forEach(function (clickSelector) {
        var matchingClickedElement = clicked.closest(clickSelector).eq(0);
        if (matchingClickedElement.length > 0) {
          moduleClicks[clickSelector].call(app, matchingClickedElement, matchingClickedElement.dataset());
        }
      });
    });

    // Load Page
    var clickedLinkData = {};
    if (isLink) {
      e.preventDefault();
      clickedLinkData = clickedLink.dataset();
    }
    var validUrl = url && url.length > 0 && url !== '#' && !isTabLink;
    var template = clickedLinkData.template;
    if (validUrl || clickedLink.hasClass('back') || template) {
      var view = void 0;
      if (clickedLinkData.view) {
        view = (0, _dom2.default)(clickedLinkData.view)[0].f7View;
      } else {
        view = clicked.parents('.view')[0] && clicked.parents('.view')[0].f7View;
        if (!clickedLink.hasClass('back') && view && view.params.linksView) {
          if (typeof view.params.linksView === 'string') view = (0, _dom2.default)(view.params.linksView)[0].f7View;else if (view.params.linksView instanceof _viewClass2.default) view = view.params.linksView;
        }
      }
      if (!view) {
        if (app.views.main) view = app.views.main;
      }
      if (!view || !view.router) return;
      if (clickedLinkData.context && typeof clickedLinkData.context === 'string') {
        try {
          clickedLinkData.context = JSON.parse(clickedLinkData.context);
        } catch (err) {
          // something wrong there
        }
      }
      if (clickedLink.hasClass('back')) view.router.back(url, clickedLinkData);else view.router.navigate(url, clickedLinkData);
    }
  }

  app.on('click', handleClicks);

  // Prevent scrolling on overlays
  function preventScrolling(e) {
    e.preventDefault();
  }
  if (_support2.default.touch && !_device2.default.android) {
    var activeListener = _support2.default.passiveListener ? { passive: false, capture: false } : false;
    (0, _dom2.default)(_ssrWindow.document).on(app.params.touch.fastClicks ? 'touchstart' : 'touchmove', '.panel-backdrop, .dialog-backdrop, .preloader-backdrop, .popup-backdrop, .searchbar-backdrop', preventScrolling, activeListener);
  }
}
exports.default = {
  name: 'clicks',
  params: {
    clicks: {
      // External Links
      externalLinks: '.external'
    }
  },
  on: {
    init: function init() {
      var app = this;
      initClicks(app);
    }
  }
};