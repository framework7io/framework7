'use strict';

var _typeof3 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _typeof2 = typeof Symbol === "function" && _typeof3(Symbol.iterator) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof3(obj);
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof3(obj);
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.back = exports.loadBack = exports.backward = undefined;

var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
};

var _dom = require('dom7');

var _dom2 = _interopRequireDefault(_dom);

var _ssrWindow = require('ssr-window');

var _utils = require('../../utils/utils');

var _utils2 = _interopRequireDefault(_utils);

var _device = require('../../utils/device');

var _device2 = _interopRequireDefault(_device);

var _history = require('../../utils/history');

var _history2 = _interopRequireDefault(_history);

var _redirect = require('./redirect');

var _redirect2 = _interopRequireDefault(_redirect);

var _preRoute = require('./pre-route');

var _preRoute2 = _interopRequireDefault(_preRoute);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }return obj;
}

function backward(el, backwardOptions) {
  var router = this;
  var app = router.app;
  var view = router.view;

  var options = _utils2.default.extend({
    animate: router.params.animate,
    pushState: true
  }, backwardOptions);

  var dynamicNavbar = router.dynamicNavbar;
  var separateNavbar = router.separateNavbar;

  var $newPage = (0, _dom2.default)(el);
  var $oldPage = router.$el.children('.page-current');

  if ($newPage.length) {
    // Remove theme elements
    router.removeThemeElements($newPage);
  }

  var $navbarEl = void 0;
  var $newNavbarInner = void 0;
  var $oldNavbarInner = void 0;

  if (dynamicNavbar) {
    $newNavbarInner = $newPage.children('.navbar').children('.navbar-inner');
    if (separateNavbar) {
      $navbarEl = router.$navbarEl;
      if ($newNavbarInner.length > 0) {
        $newPage.children('.navbar').remove();
      }
      if ($newNavbarInner.length === 0 && $newPage[0].f7Page) {
        // Try from pageData
        $newNavbarInner = $newPage[0].f7Page.$navbarEl;
      }
      $oldNavbarInner = $navbarEl.find('.navbar-current');
    } else {
      $oldNavbarInner = $oldPage.children('.navbar').children('.navbar-inner');
    }
  }

  router.allowPageChange = false;
  if ($newPage.length === 0 || $oldPage.length === 0) {
    router.allowPageChange = true;
    return router;
  }

  // Remove theme elements
  router.removeThemeElements($newPage);

  // New Page
  $newPage.addClass('page-previous').removeClass('stacked').removeAttr('aria-hidden');

  if (dynamicNavbar && $newNavbarInner.length > 0) {
    $newNavbarInner.addClass('navbar-previous').removeClass('stacked').removeAttr('aria-hidden');
  }

  // Remove previous page in case of "forced"
  var backIndex = void 0;
  if (options.force) {
    if ($oldPage.prev('.page-previous:not(.stacked)').length > 0 || $oldPage.prev('.page-previous').length === 0) {
      if (router.history.indexOf(options.route.url) >= 0) {
        backIndex = router.history.length - router.history.indexOf(options.route.url) - 1;
        router.history = router.history.slice(0, router.history.indexOf(options.route.url) + 2);
        view.history = router.history;
      } else if (router.history[[router.history.length - 2]]) {
        router.history[router.history.length - 2] = options.route.url;
      } else {
        router.history.unshift(router.url);
      }

      if (backIndex && router.params.stackPages) {
        $oldPage.prevAll('.page-previous').each(function (index, pageToRemove) {
          var $pageToRemove = (0, _dom2.default)(pageToRemove);
          var $navbarToRemove = void 0;
          if (separateNavbar) {
            // $navbarToRemove = $oldNavbarInner.prevAll('.navbar-previous').eq(index);
            $navbarToRemove = (0, _dom2.default)(app.navbar.getElByPage($pageToRemove));
          }
          if ($pageToRemove[0] !== $newPage[0] && $pageToRemove.index() > $newPage.index()) {
            if (router.initialPages.indexOf($pageToRemove[0]) >= 0) {
              $pageToRemove.addClass('stacked');
              if (separateNavbar) {
                $navbarToRemove.addClass('stacked');
              }
            } else {
              router.pageCallback('beforeRemove', $pageToRemove, $navbarToRemove, 'previous', undefined, options);
              router.removePage($pageToRemove);
              if (separateNavbar && $navbarToRemove.length > 0) {
                router.removeNavbar($navbarToRemove);
              }
            }
          }
        });
      } else {
        var $pageToRemove = $oldPage.prev('.page-previous:not(.stacked)');
        var $navbarToRemove = void 0;
        if (separateNavbar) {
          // $navbarToRemove = $oldNavbarInner.prev('.navbar-inner:not(.stacked)');
          $navbarToRemove = (0, _dom2.default)(app.navbar.getElByPage($pageToRemove));
        }
        if (router.params.stackPages && router.initialPages.indexOf($pageToRemove[0]) >= 0) {
          $pageToRemove.addClass('stacked');
          $navbarToRemove.addClass('stacked');
        } else if ($pageToRemove.length > 0) {
          router.pageCallback('beforeRemove', $pageToRemove, $navbarToRemove, 'previous', undefined, options);
          router.removePage($pageToRemove);
          if (separateNavbar && $navbarToRemove.length) {
            router.removeNavbar($navbarToRemove);
          }
        }
      }
    }
  }

  // Insert new page
  var newPageInDom = $newPage.parents(_ssrWindow.document).length > 0;
  var f7Component = $newPage[0].f7Component;

  function insertPage() {
    if ($newPage.next($oldPage).length === 0) {
      if (!newPageInDom && f7Component) {
        f7Component.$mount(function (componentEl) {
          (0, _dom2.default)(componentEl).insertBefore($oldPage);
        });
      } else {
        $newPage.insertBefore($oldPage);
      }
    }
    if (separateNavbar && $newNavbarInner.length) {
      $newNavbarInner.insertBefore($oldNavbarInner);
      if ($oldNavbarInner.length > 0) {
        $newNavbarInner.insertBefore($oldNavbarInner);
      } else {
        if (!router.$navbarEl.parents(_ssrWindow.document).length) {
          router.$el.prepend(router.$navbarEl);
        }
        $navbarEl.append($newNavbarInner);
      }
    }
    if (!newPageInDom) {
      router.pageCallback('mounted', $newPage, $newNavbarInner, 'previous', 'current', options, $oldPage);
    }
  }

  if (options.preload) {
    // Insert Page
    insertPage();
    // Tab route
    if (options.route.route.tab) {
      router.tabLoad(options.route.route.tab, _utils2.default.extend({}, options, {
        history: false,
        pushState: false,
        preload: true
      }));
    }
    // Page init and before init events
    router.pageCallback('init', $newPage, $newNavbarInner, 'previous', 'current', options, $oldPage);
    if ($newPage.prevAll('.page-previous:not(.stacked)').length > 0) {
      $newPage.prevAll('.page-previous:not(.stacked)').each(function (index, pageToRemove) {
        var $pageToRemove = (0, _dom2.default)(pageToRemove);
        var $navbarToRemove = void 0;
        if (separateNavbar) {
          // $navbarToRemove = $newNavbarInner.prevAll('.navbar-previous:not(.stacked)').eq(index);
          $navbarToRemove = (0, _dom2.default)(app.navbar.getElByPage($pageToRemove));
        }
        if (router.params.stackPages && router.initialPages.indexOf(pageToRemove) >= 0) {
          $pageToRemove.addClass('stacked');
          if (separateNavbar) {
            $navbarToRemove.addClass('stacked');
          }
        } else {
          router.pageCallback('beforeRemove', $pageToRemove, $navbarToRemove, 'previous', undefined);
          router.removePage($pageToRemove);
          if (separateNavbar && $navbarToRemove.length) {
            router.removeNavbar($navbarToRemove);
          }
        }
      });
    }
    router.allowPageChange = true;
    return router;
  }

  // History State
  if (!(_device2.default.ie || _device2.default.edge)) {
    if (router.params.pushState && options.pushState) {
      if (backIndex) _history2.default.go(-backIndex);else _history2.default.back();
    }
  }

  // Update History
  if (router.history.length === 1) {
    router.history.unshift(router.url);
  }
  router.history.pop();
  router.saveHistory();

  // Current Page & Navbar
  router.currentPageEl = $newPage[0];
  if (dynamicNavbar && $newNavbarInner.length) {
    router.currentNavbarEl = $newNavbarInner[0];
  } else {
    delete router.currentNavbarEl;
  }

  // Current Route
  router.currentRoute = options.route;

  // History State
  if (_device2.default.ie || _device2.default.edge) {
    if (router.params.pushState && options.pushState) {
      if (backIndex) _history2.default.go(-backIndex);else _history2.default.back();
    }
  }

  // Insert Page
  insertPage();

  // Load Tab
  if (options.route.route.tab) {
    router.tabLoad(options.route.route.tab, _utils2.default.extend({}, options, {
      history: false,
      pushState: false
    }));
  }

  // Page init and before init events
  router.pageCallback('init', $newPage, $newNavbarInner, 'previous', 'current', options, $oldPage);

  // Before animation callback
  router.pageCallback('beforeIn', $newPage, $newNavbarInner, 'previous', 'current', options);
  router.pageCallback('beforeOut', $oldPage, $oldNavbarInner, 'current', 'next', options);

  // Animation
  function afterAnimation() {
    // Set classes
    var pageClasses = 'page-previous page-current page-next';
    var navbarClasses = 'navbar-previous navbar-current navbar-next';
    $newPage.removeClass(pageClasses).addClass('page-current').removeAttr('aria-hidden');
    $oldPage.removeClass(pageClasses).addClass('page-next').attr('aria-hidden', 'true');
    if (dynamicNavbar) {
      $newNavbarInner.removeClass(navbarClasses).addClass('navbar-current').removeAttr('aria-hidden');
      $oldNavbarInner.removeClass(navbarClasses).addClass('navbar-next').attr('aria-hidden', 'true');
    }

    // After animation event
    router.pageCallback('afterIn', $newPage, $newNavbarInner, 'previous', 'current', options);
    router.pageCallback('afterOut', $oldPage, $oldNavbarInner, 'current', 'next', options);

    // Remove Old Page
    if (router.params.stackPages && router.initialPages.indexOf($oldPage[0]) >= 0) {
      $oldPage.addClass('stacked');
      if (separateNavbar) {
        $oldNavbarInner.addClass('stacked');
      }
    } else {
      router.pageCallback('beforeRemove', $oldPage, $oldNavbarInner, 'next', undefined, options);
      router.removePage($oldPage);
      if (separateNavbar && $oldNavbarInner.length) {
        router.removeNavbar($oldNavbarInner);
      }
    }

    router.allowPageChange = true;
    router.emit('routeChanged', router.currentRoute, router.previousRoute, router);

    // Preload previous page
    var preloadPreviousPage = app.theme === 'ios' ? router.params.preloadPreviousPage || router.params.iosSwipeBack : router.params.preloadPreviousPage;
    if (preloadPreviousPage && router.history[router.history.length - 2]) {
      router.back(router.history[router.history.length - 2], { preload: true });
    }
    if (router.params.pushState) {
      _history2.default.clearRouterQueue();
    }
  }

  function setPositionClasses() {
    var pageClasses = 'page-previous page-current page-next';
    var navbarClasses = 'navbar-previous navbar-current navbar-next';
    $oldPage.removeClass(pageClasses).addClass('page-current');
    $newPage.removeClass(pageClasses).addClass('page-previous').removeAttr('aria-hidden');
    if (dynamicNavbar) {
      $oldNavbarInner.removeClass(navbarClasses).addClass('navbar-current');
      $newNavbarInner.removeClass(navbarClasses).addClass('navbar-previous').removeAttr('aria-hidden');
    }
  }

  if (options.animate) {
    setPositionClasses();
    router.animate($oldPage, $newPage, $oldNavbarInner, $newNavbarInner, 'backward', function () {
      afterAnimation();
    });
  } else {
    afterAnimation();
  }

  return router;
}
function loadBack(backParams, backOptions, ignorePageChange) {
  var router = this;

  if (!router.allowPageChange && !ignorePageChange) return router;
  var params = backParams;
  var options = backOptions;
  var url = params.url,
      content = params.content,
      el = params.el,
      pageName = params.pageName,
      template = params.template,
      templateUrl = params.templateUrl,
      component = params.component,
      componentUrl = params.componentUrl;

  if (options.route.url && router.url === options.route.url && !(options.reloadCurrent || options.reloadPrevious) && !router.params.allowDuplicateUrls) {
    return false;
  }

  if (!options.route && url) {
    options.route = router.parseRouteUrl(url);
  }

  // Component Callbacks
  function resolve(pageEl, newOptions) {
    return router.backward(pageEl, _utils2.default.extend(options, newOptions));
  }
  function reject() {
    router.allowPageChange = true;
    return router;
  }

  if (url || templateUrl || componentUrl) {
    router.allowPageChange = false;
  }

  // Proceed
  if (content) {
    router.backward(router.getPageEl(content), options);
  } else if (template || templateUrl) {
    // Parse template and send page element
    try {
      router.pageTemplateLoader(template, templateUrl, options, resolve, reject);
    } catch (err) {
      router.allowPageChange = true;
      throw err;
    }
  } else if (el) {
    // Load page from specified HTMLElement or by page name in pages container
    router.backward(router.getPageEl(el), options);
  } else if (pageName) {
    // Load page by page name in pages container
    router.backward(router.$el.children('.page[data-name="' + pageName + '"]').eq(0), options);
  } else if (component || componentUrl) {
    // Load from component (F7/Vue/React/...)
    try {
      router.pageComponentLoader(router.el, component, componentUrl, options, resolve, reject);
    } catch (err) {
      router.allowPageChange = true;
      throw err;
    }
  } else if (url) {
    // Load using XHR
    if (router.xhr) {
      router.xhr.abort();
      router.xhr = false;
    }
    router.xhrRequest(url, options).then(function (pageContent) {
      router.backward(router.getPageEl(pageContent), options);
    }).catch(function () {
      router.allowPageChange = true;
    });
  }
  return router;
}
function back() {
  var navigateUrl = void 0;
  var navigateOptions = void 0;
  if (_typeof(arguments.length <= 0 ? undefined : arguments[0]) === 'object') {
    navigateOptions = (arguments.length <= 0 ? undefined : arguments[0]) || {};
  } else {
    navigateUrl = arguments.length <= 0 ? undefined : arguments[0];
    navigateOptions = (arguments.length <= 1 ? undefined : arguments[1]) || {};
  }

  var router = this;
  var app = router.app;
  if (!router.view) {
    app.views.main.router.back(navigateUrl, navigateOptions);
    return router;
  }

  var currentRouteIsModal = router.currentRoute.modal;
  var modalType = void 0;
  if (!currentRouteIsModal) {
    'popup popover sheet loginScreen actions customModal'.split(' ').forEach(function (modalLoadProp) {
      if (router.currentRoute.route[modalLoadProp]) {
        currentRouteIsModal = true;
        modalType = modalLoadProp;
      }
    });
  }
  if (currentRouteIsModal) {
    var modalToClose = router.currentRoute.modal || router.currentRoute.route.modalInstance || app[modalType].get();
    var previousUrl = router.history[router.history.length - 2];
    var previousRoute = router.findMatchingRoute(previousUrl);
    if (!previousRoute && previousUrl) {
      previousRoute = {
        url: previousUrl,
        path: previousUrl.split('?')[0],
        query: _utils2.default.parseUrlQuery(previousUrl),
        route: {
          path: previousUrl.split('?')[0],
          url: previousUrl
        }
      };
    }
    if (!previousRoute || !modalToClose) {
      return router;
    }
    if (router.params.pushState && navigateOptions.pushState !== false) {
      _history2.default.back();
    }
    router.currentRoute = previousRoute;
    router.history.pop();
    router.saveHistory();
    router.modalRemove(modalToClose);
    return router;
  }
  var $previousPage = router.$el.children('.page-current').prevAll('.page-previous').eq(0);
  if (!navigateOptions.force && $previousPage.length > 0) {
    if (router.params.pushState && $previousPage[0].f7Page && router.history[router.history.length - 2] !== $previousPage[0].f7Page.route.url) {
      router.back(router.history[router.history.length - 2], _utils2.default.extend(navigateOptions, { force: true }));
      return router;
    }
    router.loadBack({ el: $previousPage }, _utils2.default.extend(navigateOptions, {
      route: $previousPage[0].f7Page.route
    }));
    return router;
  }

  // Navigate URL
  if (navigateUrl === '#') {
    navigateUrl = undefined;
  }
  if (navigateUrl && navigateUrl[0] !== '/' && navigateUrl.indexOf('#') !== 0) {
    navigateUrl = ((router.path || '/') + navigateUrl).replace('//', '/');
  }
  if (!navigateUrl && router.history.length > 1) {
    navigateUrl = router.history[router.history.length - 2];
  }

  // Find route to load
  var route = router.findMatchingRoute(navigateUrl);
  if (!route) {
    if (navigateUrl) {
      route = {
        url: navigateUrl,
        path: navigateUrl.split('?')[0],
        query: _utils2.default.parseUrlQuery(navigateUrl),
        route: {
          path: navigateUrl.split('?')[0],
          url: navigateUrl
        }
      };
    }
  }
  if (!route) {
    return router;
  }

  if (route.route.redirect) {
    return _redirect2.default.call(router, 'back', route, navigateOptions);
  }

  var options = {};
  if (route.route.options) {
    _utils2.default.extend(options, route.route.options, navigateOptions, { route: route });
  } else {
    _utils2.default.extend(options, navigateOptions, { route: route });
  }

  if (options && options.context) {
    route.context = options.context;
    options.route.context = options.context;
  }

  var backForceLoaded = void 0;
  if (options.force && router.params.stackPages) {
    router.$el.children('.page-previous.stacked').each(function (index, pageEl) {
      if (pageEl.f7Page && pageEl.f7Page.route && pageEl.f7Page.route.url === route.url) {
        backForceLoaded = true;
        router.loadBack({ el: pageEl }, options);
      }
    });
    if (backForceLoaded) {
      return router;
    }
  }
  function resolve() {
    var routerLoaded = false;
    'url content component pageName el componentUrl template templateUrl'.split(' ').forEach(function (pageLoadProp) {
      if (route.route[pageLoadProp] && !routerLoaded) {
        routerLoaded = true;
        router.loadBack(_defineProperty({}, pageLoadProp, route.route[pageLoadProp]), options);
      }
    });
    if (routerLoaded) return;
    // Async
    function asyncResolve(resolveParams, resolveOptions) {
      router.allowPageChange = false;
      if (resolveOptions && resolveOptions.context) {
        if (!route.context) route.context = resolveOptions.context;else route.context = _utils2.default.extend({}, route.context, resolveOptions.context);
        options.route.context = route.context;
      }
      router.loadBack(resolveParams, _utils2.default.extend(options, resolveOptions), true);
    }
    function asyncReject() {
      router.allowPageChange = true;
    }
    if (route.route.async) {
      router.allowPageChange = false;

      route.route.async.call(router, route, router.currentRoute, asyncResolve, asyncReject);
    }
  }
  function reject() {
    router.allowPageChange = true;
  }

  if (router.params.preRoute || route.route.preRoute) {
    router.allowPageChange = false;
    _preRoute2.default.call(router, route.route.preRoute, route, router.currentRoute, function () {
      router.allowPageChange = true;
      resolve();
    }, function () {
      reject();
    });
  } else {
    resolve();
  }

  // Return Router
  return router;
}
exports.backward = backward;
exports.loadBack = loadBack;
exports.back = back;