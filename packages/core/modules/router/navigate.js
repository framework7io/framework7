'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.navigate = exports.load = exports.forward = exports.refreshPage = undefined;

var _dom = require('dom7');

var _dom2 = _interopRequireDefault(_dom);

var _ssrWindow = require('ssr-window');

var _utils = require('../../utils/utils');

var _utils2 = _interopRequireDefault(_utils);

var _history = require('../../utils/history');

var _history2 = _interopRequireDefault(_history);

var _redirect = require('./redirect');

var _redirect2 = _interopRequireDefault(_redirect);

var _preRoute = require('./pre-route');

var _preRoute2 = _interopRequireDefault(_preRoute);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function refreshPage() {
  var router = this;
  return router.navigate(router.currentRoute.url, {
    ignoreCache: true,
    reloadCurrent: true
  });
}

function forward(el) {
  var forwardOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var router = this;
  var app = router.app;
  var view = router.view;

  var options = _utils2.default.extend({
    animate: router.params.animate,
    pushState: true,
    replaceState: false,
    history: true,
    reloadCurrent: router.params.reloadPages,
    reloadPrevious: false,
    reloadAll: false,
    clearPreviousHistory: false,
    on: {}
  }, forwardOptions);

  var dynamicNavbar = router.dynamicNavbar;
  var separateNavbar = router.separateNavbar;

  var $viewEl = router.$el;
  var $newPage = (0, _dom2.default)(el);
  var reload = options.reloadPrevious || options.reloadCurrent || options.reloadAll;
  var $oldPage = void 0;

  var $navbarEl = void 0;
  var $newNavbarInner = void 0;
  var $oldNavbarInner = void 0;

  if ($newPage.length) {
    // Remove theme elements
    router.removeThemeElements($newPage);
  }

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
    }
  }

  router.allowPageChange = false;
  if ($newPage.length === 0) {
    router.allowPageChange = true;
    return router;
  }

  // Pages In View
  var $pagesInView = $viewEl.children('.page:not(.stacked)').filter(function (index, pageInView) {
    return pageInView !== $newPage[0];
  });

  // Navbars In View
  var $navbarsInView = void 0;
  if (separateNavbar) {
    $navbarsInView = $navbarEl.children('.navbar-inner:not(.stacked)').filter(function (index, navbarInView) {
      return navbarInView !== $newNavbarInner[0];
    });
  }

  // Exit when reload previous and only 1 page in view so nothing ro reload
  if (options.reloadPrevious && $pagesInView.length < 2) {
    router.allowPageChange = true;
    return router;
  }

  // New Page
  var newPagePosition = 'next';
  if (options.reloadCurrent || options.reloadAll) {
    newPagePosition = 'current';
  } else if (options.reloadPrevious) {
    newPagePosition = 'previous';
  }
  $newPage.addClass('page-' + newPagePosition).removeClass('stacked');

  if (dynamicNavbar && $newNavbarInner.length) {
    $newNavbarInner.addClass('navbar-' + newPagePosition).removeClass('stacked');
  }

  // Find Old Page
  if (options.reloadCurrent) {
    $oldPage = $pagesInView.eq($pagesInView.length - 1);
    if (separateNavbar) {
      // $oldNavbarInner = $navbarsInView.eq($pagesInView.length - 1);
      $oldNavbarInner = (0, _dom2.default)(app.navbar.getElByPage($oldPage));
    }
  } else if (options.reloadPrevious) {
    $oldPage = $pagesInView.eq($pagesInView.length - 2);
    if (separateNavbar) {
      // $oldNavbarInner = $navbarsInView.eq($pagesInView.length - 2);
      $oldNavbarInner = (0, _dom2.default)(app.navbar.getElByPage($oldPage));
    }
  } else if (options.reloadAll) {
    $oldPage = $pagesInView.filter(function (index, pageEl) {
      return pageEl !== $newPage[0];
    });
    if (separateNavbar) {
      $oldNavbarInner = $navbarsInView.filter(function (index, navbarEl) {
        return navbarEl !== $newNavbarInner[0];
      });
    }
  } else {
    if ($pagesInView.length > 1) {
      var i = 0;
      for (i = 0; i < $pagesInView.length - 1; i += 1) {
        var oldNavbarInnerEl = app.navbar.getElByPage($pagesInView.eq(i));
        if (router.params.stackPages) {
          $pagesInView.eq(i).addClass('stacked');
          if (separateNavbar) {
            // $navbarsInView.eq(i).addClass('stacked');
            (0, _dom2.default)(oldNavbarInnerEl).addClass('stacked');
          }
        } else {
          // Page remove event
          router.pageCallback('beforeRemove', $pagesInView[i], $navbarsInView && $navbarsInView[i], 'previous', undefined, options);
          router.removePage($pagesInView[i]);
          if (separateNavbar && oldNavbarInnerEl) {
            router.removeNavbar(oldNavbarInnerEl);
          }
        }
      }
    }
    $oldPage = $viewEl.children('.page:not(.stacked)').filter(function (index, page) {
      return page !== $newPage[0];
    });
    if (separateNavbar) {
      $oldNavbarInner = $navbarEl.children('.navbar-inner:not(.stacked)').filter(function (index, navbarInner) {
        return navbarInner !== $newNavbarInner[0];
      });
    }
  }
  if (dynamicNavbar && !separateNavbar) {
    $oldNavbarInner = $oldPage.children('.navbar').children('.navbar-inner');
  }

  // Push State
  if (router.params.pushState && (options.pushState || options.replaceState) && !options.reloadPrevious) {
    var pushStateRoot = router.params.pushStateRoot || '';
    _history2.default[options.reloadCurrent || options.reloadAll || options.replaceState ? 'replace' : 'push'](view.id, {
      url: options.route.url
    }, pushStateRoot + router.params.pushStateSeparator + options.route.url);
  }

  if (!options.reloadPrevious) {
    // Current Page & Navbar
    router.currentPageEl = $newPage[0];
    if (dynamicNavbar && $newNavbarInner.length) {
      router.currentNavbarEl = $newNavbarInner[0];
    } else {
      delete router.currentNavbarEl;
    }

    // Current Route
    router.currentRoute = options.route;
  }

  // Update router history
  var url = options.route.url;

  if (options.history) {
    if ((options.reloadCurrent && router.history.length) > 0 || options.replaceState) {
      router.history[router.history.length - (options.reloadPrevious ? 2 : 1)] = url;
    } else if (options.reloadPrevious) {
      router.history[router.history.length - 2] = url;
    } else if (options.reloadAll) {
      router.history = [url];
    } else {
      router.history.push(url);
    }
  }
  router.saveHistory();

  // Insert new page and navbar
  var newPageInDom = $newPage.parents(_ssrWindow.document).length > 0;
  var f7Component = $newPage[0].f7Component;
  if (options.reloadPrevious) {
    if (f7Component && !newPageInDom) {
      f7Component.$mount(function (componentEl) {
        (0, _dom2.default)(componentEl).insertBefore($oldPage);
      });
    } else {
      $newPage.insertBefore($oldPage);
    }
    if (separateNavbar && $newNavbarInner.length) {
      if ($oldNavbarInner.length) {
        $newNavbarInner.insertBefore($oldNavbarInner);
      } else {
        if (!router.$navbarEl.parents(_ssrWindow.document).length) {
          router.$el.prepend(router.$navbarEl);
        }
        $navbarEl.append($newNavbarInner);
      }
    }
  } else {
    if ($oldPage.next('.page')[0] !== $newPage[0]) {
      if (f7Component && !newPageInDom) {
        f7Component.$mount(function (componentEl) {
          $viewEl.append(componentEl);
        });
      } else {
        $viewEl.append($newPage[0]);
      }
    }
    if (separateNavbar && $newNavbarInner.length) {
      if (!router.$navbarEl.parents(_ssrWindow.document).length) {
        router.$el.prepend(router.$navbarEl);
      }
      $navbarEl.append($newNavbarInner[0]);
    }
  }
  if (!newPageInDom) {
    router.pageCallback('mounted', $newPage, $newNavbarInner, newPagePosition, reload ? newPagePosition : 'current', options, $oldPage);
  }

  // Remove old page
  if (options.reloadCurrent && $oldPage.length > 0) {
    if (router.params.stackPages && router.initialPages.indexOf($oldPage[0]) >= 0) {
      $oldPage.addClass('stacked');
      if (separateNavbar) {
        $oldNavbarInner.addClass('stacked');
      }
    } else {
      // Page remove event
      router.pageCallback('beforeRemove', $oldPage, $oldNavbarInner, 'previous', undefined, options);
      router.removePage($oldPage);
      if (separateNavbar && $oldNavbarInner && $oldNavbarInner.length) {
        router.removeNavbar($oldNavbarInner);
      }
    }
  } else if (options.reloadAll) {
    $oldPage.each(function (index, pageEl) {
      var $oldPageEl = (0, _dom2.default)(pageEl);
      var $oldNavbarInnerEl = (0, _dom2.default)(app.navbar.getElByPage($oldPageEl));
      if (router.params.stackPages && router.initialPages.indexOf($oldPageEl[0]) >= 0) {
        $oldPageEl.addClass('stacked');
        if (separateNavbar) {
          $oldNavbarInnerEl.addClass('stacked');
        }
      } else {
        // Page remove event
        router.pageCallback('beforeRemove', $oldPageEl, $oldNavbarInner && $oldNavbarInner.eq(index), 'previous', undefined, options);
        router.removePage($oldPageEl);
        if (separateNavbar && $oldNavbarInnerEl.length) {
          router.removeNavbar($oldNavbarInnerEl);
        }
      }
    });
  } else if (options.reloadPrevious) {
    if (router.params.stackPages && router.initialPages.indexOf($oldPage[0]) >= 0) {
      $oldPage.addClass('stacked');
      if (separateNavbar) {
        $oldNavbarInner.addClass('stacked');
      }
    } else {
      // Page remove event
      router.pageCallback('beforeRemove', $oldPage, $oldNavbarInner, 'previous', undefined, options);
      router.removePage($oldPage);
      if (separateNavbar && $oldNavbarInner && $oldNavbarInner.length) {
        router.removeNavbar($oldNavbarInner);
      }
    }
  }

  // Load Tab
  if (options.route.route.tab) {
    router.tabLoad(options.route.route.tab, _utils2.default.extend({}, options, {
      history: false,
      pushState: false
    }));
  }

  // Page init and before init events
  router.pageCallback('init', $newPage, $newNavbarInner, newPagePosition, reload ? newPagePosition : 'current', options, $oldPage);

  if (options.reloadCurrent || options.reloadAll) {
    router.allowPageChange = true;
    router.pageCallback('beforeIn', $newPage, $newNavbarInner, newPagePosition, 'current', options);
    router.pageCallback('afterIn', $newPage, $newNavbarInner, newPagePosition, 'current', options);
    if (options.reloadCurrent && options.clearPreviousHistory) router.clearPreviousHistory();
    return router;
  }
  if (options.reloadPrevious) {
    router.allowPageChange = true;
    return router;
  }

  // Before animation event
  router.pageCallback('beforeIn', $newPage, $newNavbarInner, 'next', 'current', options);
  router.pageCallback('beforeOut', $oldPage, $oldNavbarInner, 'current', 'previous', options);

  // Animation
  function afterAnimation() {
    var pageClasses = 'page-previous page-current page-next';
    var navbarClasses = 'navbar-previous navbar-current navbar-next';
    $newPage.removeClass(pageClasses).addClass('page-current').removeAttr('aria-hidden');
    $oldPage.removeClass(pageClasses).addClass('page-previous').attr('aria-hidden', 'true');
    if (dynamicNavbar) {
      $newNavbarInner.removeClass(navbarClasses).addClass('navbar-current').removeAttr('aria-hidden');
      $oldNavbarInner.removeClass(navbarClasses).addClass('navbar-previous').attr('aria-hidden', 'true');
    }
    // After animation event
    router.allowPageChange = true;
    router.pageCallback('afterIn', $newPage, $newNavbarInner, 'next', 'current', options);
    router.pageCallback('afterOut', $oldPage, $oldNavbarInner, 'current', 'previous', options);

    var keepOldPage = app.theme === 'ios' ? router.params.preloadPreviousPage || router.params.iosSwipeBack : router.params.preloadPreviousPage;
    if (!keepOldPage) {
      if ($newPage.hasClass('smart-select-page') || $newPage.hasClass('photo-browser-page') || $newPage.hasClass('autocomplete-page')) {
        keepOldPage = true;
      }
    }
    if (!keepOldPage) {
      if (router.params.stackPages) {
        $oldPage.addClass('stacked');
        if (separateNavbar) {
          $oldNavbarInner.addClass('stacked');
        }
      } else if (!($newPage.attr('data-name') && $newPage.attr('data-name') === 'smart-select-page')) {
        // Remove event
        router.pageCallback('beforeRemove', $oldPage, $oldNavbarInner, 'previous', undefined, options);
        router.removePage($oldPage);
        if (separateNavbar && $oldNavbarInner.length) {
          router.removeNavbar($oldNavbarInner);
        }
      }
    }
    if (options.clearPreviousHistory) router.clearPreviousHistory();
    router.emit('routeChanged', router.currentRoute, router.previousRoute, router);

    if (router.params.pushState) {
      _history2.default.clearRouterQueue();
    }
  }
  function setPositionClasses() {
    var pageClasses = 'page-previous page-current page-next';
    var navbarClasses = 'navbar-previous navbar-current navbar-next';
    $oldPage.removeClass(pageClasses).addClass('page-current').removeAttr('aria-hidden');
    $newPage.removeClass(pageClasses).addClass('page-next').removeAttr('aria-hidden');
    if (dynamicNavbar) {
      $oldNavbarInner.removeClass(navbarClasses).addClass('navbar-current').removeAttr('aria-hidden');
      $newNavbarInner.removeClass(navbarClasses).addClass('navbar-next').removeAttr('aria-hidden');
    }
  }
  if (options.animate) {
    var delay = router.app.theme === 'md' ? router.params.materialPageLoadDelay : router.params.iosPageLoadDelay;
    if (delay) {
      setTimeout(function () {
        setPositionClasses();
        router.animate($oldPage, $newPage, $oldNavbarInner, $newNavbarInner, 'forward', function () {
          afterAnimation();
        });
      }, delay);
    } else {
      setPositionClasses();
      router.animate($oldPage, $newPage, $oldNavbarInner, $newNavbarInner, 'forward', function () {
        afterAnimation();
      });
    }
  } else {
    afterAnimation();
  }
  return router;
}
function load() {
  var loadParams = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var loadOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var ignorePageChange = arguments[2];

  var router = this;
  if (!router.allowPageChange && !ignorePageChange) return router;
  var params = loadParams;
  var options = loadOptions;
  var url = params.url,
      content = params.content,
      el = params.el,
      pageName = params.pageName,
      template = params.template,
      templateUrl = params.templateUrl,
      component = params.component,
      componentUrl = params.componentUrl;


  if (!options.reloadCurrent && options.route && options.route.route && options.route.route.parentPath && router.currentRoute.route && router.currentRoute.route.parentPath === options.route.route.parentPath) {
    // Do something nested
    if (options.route.url === router.url) {
      return false;
    }
    // Check for same params
    var sameParams = Object.keys(options.route.params).length === Object.keys(router.currentRoute.params).length;
    if (sameParams) {
      // Check for equal params name
      Object.keys(options.route.params).forEach(function (paramName) {
        if (!(paramName in router.currentRoute.params) || router.currentRoute.params[paramName] !== options.route.params[paramName]) {
          sameParams = false;
        }
      });
    }
    if (sameParams) {
      if (options.route.route.tab) {
        return router.tabLoad(options.route.route.tab, options);
      }
      return false;
    }
  }

  if (options.route && options.route.url && router.url === options.route.url && !(options.reloadCurrent || options.reloadPrevious) && !router.params.allowDuplicateUrls) {
    router.allowPageChange = true;
    return false;
  }

  if (!options.route && url) {
    options.route = router.parseRouteUrl(url);
    _utils2.default.extend(options.route, { route: { url: url, path: url } });
  }

  // Component Callbacks
  function resolve(pageEl, newOptions) {
    return router.forward(pageEl, _utils2.default.extend(options, newOptions));
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
    router.forward(router.getPageEl(content), options);
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
    router.forward(router.getPageEl(el), options);
  } else if (pageName) {
    // Load page by page name in pages container
    router.forward(router.$el.children('.page[data-name="' + pageName + '"]').eq(0), options);
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
      router.forward(router.getPageEl(pageContent), options);
    }).catch(function () {
      router.allowPageChange = true;
    });
  }
  return router;
}
function navigate(navigateParams) {
  var navigateOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var router = this;
  var url = void 0;
  var createRoute = void 0;
  if (typeof navigateParams === 'string') {
    url = navigateParams;
  } else {
    url = navigateParams.url;
    createRoute = navigateParams.route;
  }
  var app = router.app;
  if (!router.view) {
    if (app.views.main) {
      app.views.main.router.navigate(url, navigateOptions);
    }
    return router;
  }
  if (url === '#' || url === '') {
    return router;
  }

  var navigateUrl = url.replace('./', '');
  if (navigateUrl[0] !== '/' && navigateUrl.indexOf('#') !== 0) {
    var currentPath = router.currentRoute.parentPath || router.currentRoute.path;
    navigateUrl = ((currentPath ? currentPath + '/' : '/') + navigateUrl).replace('///', '/').replace('//', '/');
  }
  var route = void 0;
  if (createRoute) {
    route = _utils2.default.extend(router.parseRouteUrl(navigateUrl), {
      route: _utils2.default.extend({}, createRoute)
    });
  } else {
    route = router.findMatchingRoute(navigateUrl);
  }

  if (!route) {
    return router;
  }

  if (route.route.redirect) {
    return _redirect2.default.call(router, 'navigate', route, navigateOptions);
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

  function resolve() {
    var routerLoaded = false;
    'popup popover sheet loginScreen actions customModal'.split(' ').forEach(function (modalLoadProp) {
      if (route.route[modalLoadProp] && !routerLoaded) {
        routerLoaded = true;
        router.modalLoad(modalLoadProp, route, options);
      }
    });
    'url content component pageName el componentUrl template templateUrl'.split(' ').forEach(function (pageLoadProp) {
      if (route.route[pageLoadProp] && !routerLoaded) {
        routerLoaded = true;
        router.load(_defineProperty({}, pageLoadProp, route.route[pageLoadProp]), options);
      }
    });
    if (routerLoaded) return;
    // Async
    function asyncResolve(resolveParams, resolveOptions) {
      router.allowPageChange = false;
      var resolvedAsModal = false;
      if (resolveOptions && resolveOptions.context) {
        if (!route.context) route.context = resolveOptions.context;else route.context = _utils2.default.extend({}, route.context, resolveOptions.context);
        options.route.context = route.context;
      }
      'popup popover sheet loginScreen actions customModal'.split(' ').forEach(function (modalLoadProp) {
        if (resolveParams[modalLoadProp]) {
          resolvedAsModal = true;
          var modalRoute = _utils2.default.extend({}, route, { route: resolveParams });
          router.allowPageChange = true;
          router.modalLoad(modalLoadProp, modalRoute, _utils2.default.extend(options, resolveOptions));
        }
      });
      if (resolvedAsModal) return;
      router.load(resolveParams, _utils2.default.extend(options, resolveOptions), true);
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
exports.refreshPage = refreshPage;
exports.forward = forward;
exports.load = load;
exports.navigate = navigate;