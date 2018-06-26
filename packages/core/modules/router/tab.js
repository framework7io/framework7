'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tabRemove = exports.tabLoad = undefined;

var _dom = require('dom7');

var _dom2 = _interopRequireDefault(_dom);

var _utils = require('../../utils/utils');

var _utils2 = _interopRequireDefault(_utils);

var _history = require('../../utils/history');

var _history2 = _interopRequireDefault(_history);

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

function tabLoad(tabRoute) {
  var loadOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var router = this;
  var options = _utils2.default.extend({
    animate: router.params.animate,
    pushState: true,
    history: true,
    parentPageEl: null,
    preload: false,
    on: {}
  }, loadOptions);

  var currentRoute = void 0;
  var previousRoute = void 0;
  if (options.route) {
    // Set Route
    if (!options.preload && options.route !== router.currentRoute) {
      previousRoute = router.previousRoute;
      router.currentRoute = options.route;
    }
    if (options.preload) {
      currentRoute = options.route;
      previousRoute = router.currentRoute;
    } else {
      currentRoute = router.currentRoute;
      if (!previousRoute) previousRoute = router.previousRoute;
    }

    // Update Browser History
    if (router.params.pushState && options.pushState && !options.reloadPrevious) {
      _history2.default.replace(router.view.id, {
        url: options.route.url
      }, (router.params.pushStateRoot || '') + router.params.pushStateSeparator + options.route.url);
    }

    // Update Router History
    if (options.history) {
      router.history[Math.max(router.history.length - 1, 0)] = options.route.url;
      router.saveHistory();
    }
  }

  // Show Tab
  var $parentPageEl = (0, _dom2.default)(options.parentPageEl || router.currentPageEl);
  var tabEl = void 0;
  if ($parentPageEl.length && $parentPageEl.find('#' + tabRoute.id).length) {
    tabEl = $parentPageEl.find('#' + tabRoute.id).eq(0);
  } else if (router.view.selector) {
    tabEl = router.view.selector + ' #' + tabRoute.id;
  } else {
    tabEl = '#' + tabRoute.id;
  }
  var tabShowResult = router.app.tab.show({
    tabEl: tabEl,
    animate: options.animate,
    tabRoute: options.route
  });

  var $newTabEl = tabShowResult.$newTabEl,
      $oldTabEl = tabShowResult.$oldTabEl,
      animated = tabShowResult.animated,
      onTabsChanged = tabShowResult.onTabsChanged;

  if ($newTabEl && $newTabEl.parents('.page').length > 0 && options.route) {
    var tabParentPageData = $newTabEl.parents('.page')[0].f7Page;
    if (tabParentPageData && options.route) {
      tabParentPageData.route = options.route;
    }
  }

  // Tab Content Loaded
  function onTabLoaded(contentEl) {
    // Remove theme elements
    router.removeThemeElements($newTabEl);

    var tabEventTarget = $newTabEl;
    if (typeof contentEl !== 'string') tabEventTarget = (0, _dom2.default)(contentEl);

    tabEventTarget.trigger('tab:init tab:mounted', tabRoute);
    router.emit('tabInit tabMounted', $newTabEl[0], tabRoute);

    if ($oldTabEl && router.params.unloadTabContent) {
      if (animated) {
        onTabsChanged(function () {
          router.tabRemove($oldTabEl, $newTabEl, tabRoute);
        });
      } else {
        router.tabRemove($oldTabEl, $newTabEl, tabRoute);
      }
    }
  }
  if (!router.params.unloadTabContent) {
    if ($newTabEl[0].f7RouterTabLoaded) return router;
  }

  // Load Tab Content
  function loadTab(loadTabParams, loadTabOptions) {
    // Load Tab Props
    var url = loadTabParams.url,
        content = loadTabParams.content,
        el = loadTabParams.el,
        template = loadTabParams.template,
        templateUrl = loadTabParams.templateUrl,
        component = loadTabParams.component,
        componentUrl = loadTabParams.componentUrl;
    // Component/Template Callbacks

    function resolve(contentEl) {
      router.allowPageChange = true;
      if (!contentEl) return;
      if (typeof contentEl === 'string') {
        $newTabEl.html(contentEl);
      } else {
        $newTabEl.html('');
        if (contentEl.f7Component) {
          contentEl.f7Component.$mount(function (componentEl) {
            $newTabEl.append(componentEl);
          });
        } else {
          $newTabEl.append(contentEl);
        }
      }
      if (!router.params.unloadTabContent) {
        $newTabEl[0].f7RouterTabLoaded = true;
      }
      onTabLoaded(contentEl);
    }
    function reject() {
      router.allowPageChange = true;
      return router;
    }

    if (content) {
      resolve(content);
    } else if (template || templateUrl) {
      try {
        router.tabTemplateLoader(template, templateUrl, loadTabOptions, resolve, reject);
      } catch (err) {
        router.allowPageChange = true;
        throw err;
      }
    } else if (el) {
      resolve(el);
    } else if (component || componentUrl) {
      // Load from component (F7/Vue/React/...)
      try {
        router.tabComponentLoader($newTabEl[0], component, componentUrl, loadTabOptions, resolve, reject);
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
      router.xhrRequest(url, loadTabOptions).then(function (tabContent) {
        resolve(tabContent);
      }).catch(function () {
        router.allowPageChange = true;
      });
    }
  }

  'url content component el componentUrl template templateUrl'.split(' ').forEach(function (tabLoadProp) {
    if (tabRoute[tabLoadProp]) {
      loadTab(_defineProperty({}, tabLoadProp, tabRoute[tabLoadProp]), options);
    }
  });

  // Async
  function asyncResolve(resolveParams, resolveOptions) {
    loadTab(resolveParams, _utils2.default.extend(options, resolveOptions));
  }
  function asyncReject() {
    router.allowPageChange = true;
  }
  if (tabRoute.async) {
    tabRoute.async.call(router, currentRoute, previousRoute, asyncResolve, asyncReject);
  }
  return router;
}
function tabRemove($oldTabEl, $newTabEl, tabRoute) {
  var router = this;
  var hasTabComponentChild = void 0;
  $oldTabEl.children().each(function (index, tabChild) {
    if (tabChild.f7Component) {
      hasTabComponentChild = true;
      (0, _dom2.default)(tabChild).trigger('tab:beforeremove', tabRoute);
      tabChild.f7Component.$destroy();
    }
  });
  if (!hasTabComponentChild) {
    $oldTabEl.trigger('tab:beforeremove', tabRoute);
  }
  router.emit('tabBeforeRemove', $oldTabEl[0], $newTabEl[0], tabRoute);
  router.removeTabContent($oldTabEl[0], tabRoute);
}

exports.tabLoad = tabLoad;
exports.tabRemove = tabRemove;