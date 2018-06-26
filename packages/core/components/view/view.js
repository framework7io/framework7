'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dom = require('dom7');

var _dom2 = _interopRequireDefault(_dom);

var _utils = require('../../utils/utils');

var _utils2 = _interopRequireDefault(_utils);

var _viewClass = require('./view-class');

var _viewClass2 = _interopRequireDefault(_viewClass);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getCurrentView(app) {
  var popoverView = (0, _dom2.default)('.popover.modal-in .view');
  var popupView = (0, _dom2.default)('.popup.modal-in .view');
  var panelView = (0, _dom2.default)('.panel.panel-active .view');
  var appViews = (0, _dom2.default)('.views');
  if (appViews.length === 0) appViews = app.root;
  // Find active view as tab
  var appView = appViews.children('.view');
  // Propably in tabs or split view
  if (appView.length > 1) {
    if (appView.hasClass('tab')) {
      // Tabs
      appView = appViews.children('.view.tab-active');
    } else {
      // Split View, leave appView intact
    }
  }
  if (popoverView.length > 0 && popoverView[0].f7View) return popoverView[0].f7View;
  if (popupView.length > 0 && popupView[0].f7View) return popupView[0].f7View;
  if (panelView.length > 0 && panelView[0].f7View) return panelView[0].f7View;
  if (appView.length > 0) {
    if (appView.length === 1 && appView[0].f7View) return appView[0].f7View;
    if (appView.length > 1) {
      return app.views.main;
    }
  }
  return undefined;
}

exports.default = {
  name: 'view',
  params: {
    view: {
      name: undefined,
      main: false,
      router: true,
      linksView: null,
      stackPages: false,
      xhrCache: true,
      xhrCacheIgnore: [],
      xhrCacheIgnoreGetParameters: false,
      xhrCacheDuration: 1000 * 60 * 10, // Ten minutes
      preloadPreviousPage: true,
      uniqueHistory: false,
      uniqueHistoryIgnoreGetParameters: false,
      allowDuplicateUrls: false,
      reloadPages: false,
      removeElements: true,
      removeElementsWithTimeout: false,
      removeElementsTimeout: 0,
      restoreScrollTopOnBack: true,
      unloadTabContent: true,
      passRouteQueryToRequest: true,
      passRouteParamsToRequest: false,
      // Swipe Back
      iosSwipeBack: true,
      iosSwipeBackAnimateShadow: true,
      iosSwipeBackAnimateOpacity: true,
      iosSwipeBackActiveArea: 30,
      iosSwipeBackThreshold: 0,
      mdSwipeBack: false,
      mdSwipeBackAnimateShadow: true,
      mdSwipeBackAnimateOpacity: false,
      mdSwipeBackActiveArea: 30,
      mdSwipeBackThreshold: 0,
      // Push State
      pushState: false,
      pushStateRoot: undefined,
      pushStateAnimate: true,
      pushStateAnimateOnLoad: false,
      pushStateSeparator: '#!',
      pushStateOnLoad: true,
      // Animate Pages
      animate: true,
      animateWithJS: false,
      // iOS Dynamic Navbar
      iosDynamicNavbar: true,
      iosSeparateDynamicNavbar: true,
      // Animate iOS Navbar Back Icon
      iosAnimateNavbarBackIcon: true,
      // Delays
      iosPageLoadDelay: 0,
      materialPageLoadDelay: 0
    }
  },
  static: {
    View: _viewClass2.default
  },
  create: function create() {
    var app = this;
    _utils2.default.extend(app, {
      views: _utils2.default.extend([], {
        create: function create(el, params) {
          return new _viewClass2.default(app, el, params);
        },
        get: function get(viewEl) {
          var $viewEl = (0, _dom2.default)(viewEl);
          if ($viewEl.length && $viewEl[0].f7View) return $viewEl[0].f7View;
          return undefined;
        }
      })
    });
    Object.defineProperty(app.views, 'current', {
      enumerable: true,
      configurable: true,
      get: function get() {
        return getCurrentView(app);
      }
    });
    // Alias
    app.view = app.views;
  },

  on: {
    init: function init() {
      var app = this;
      (0, _dom2.default)('.view-init').each(function (index, viewEl) {
        if (viewEl.f7View) return;
        var viewParams = (0, _dom2.default)(viewEl).dataset();
        app.views.create(viewEl, viewParams);
      });
    },
    modalOpen: function modalOpen(modal) {
      var app = this;
      modal.$el.find('.view-init').each(function (index, viewEl) {
        if (viewEl.f7View) return;
        var viewParams = (0, _dom2.default)(viewEl).dataset();
        app.views.create(viewEl, viewParams);
      });
    },
    modalBeforeDestroy: function modalBeforeDestroy(modal) {
      if (!modal || !modal.$el) return;
      modal.$el.find('.view-init').each(function (index, viewEl) {
        var view = viewEl.f7View;
        if (!view) return;
        view.destroy();
      });
    }
  }
};