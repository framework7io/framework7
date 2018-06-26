'use strict';

var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _ssrWindow = require('ssr-window');

var _dom = require('dom7');

var _dom2 = _interopRequireDefault(_dom);

var _template = require('template7');

var _template2 = _interopRequireDefault(_template);

var _pathToRegexp = require('path-to-regexp');

var _pathToRegexp2 = _interopRequireDefault(_pathToRegexp);

var _class = require('../../utils/class');

var _class2 = _interopRequireDefault(_class);

var _utils = require('../../utils/utils');

var _utils2 = _interopRequireDefault(_utils);

var _component = require('../../utils/component');

var _component2 = _interopRequireDefault(_component);

var _history = require('../../utils/history');

var _history2 = _interopRequireDefault(_history);

var _swipeBack = require('./swipe-back');

var _swipeBack2 = _interopRequireDefault(_swipeBack);

var _navigate = require('./navigate');

var _tab = require('./tab');

var _modal = require('./modal');

var _back = require('./back');

var _clearPreviousHistory = require('./clear-previous-history');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
} // eslint-disable-line


var Router = function (_Framework7Class) {
  _inherits(Router, _Framework7Class);

  function Router(app, view) {
    var _ret;

    _classCallCheck(this, Router);

    var _this = _possibleConstructorReturn(this, (Router.__proto__ || Object.getPrototypeOf(Router)).call(this, {}, [typeof view === 'undefined' ? app : view]));

    var router = _this;

    // Is App Router
    router.isAppRouter = typeof view === 'undefined';

    if (router.isAppRouter) {
      // App Router
      _utils2.default.extend(false, router, {
        app: app,
        params: app.params.view,
        routes: app.routes || [],
        cache: app.cache
      });
    } else {
      // View Router
      _utils2.default.extend(false, router, {
        app: app,
        view: view,
        viewId: view.id,
        params: view.params,
        routes: view.routes,
        $el: view.$el,
        el: view.el,
        $navbarEl: view.$navbarEl,
        navbarEl: view.navbarEl,
        history: view.history,
        scrollHistory: view.scrollHistory,
        cache: app.cache,
        dynamicNavbar: app.theme === 'ios' && view.params.iosDynamicNavbar,
        separateNavbar: app.theme === 'ios' && view.params.iosDynamicNavbar && view.params.iosSeparateDynamicNavbar,
        initialPages: [],
        initialNavbars: []
      });
    }

    // Install Modules
    router.useModules();

    // Temporary Dom
    router.tempDom = _ssrWindow.document.createElement('div');

    // AllowPageChage
    router.allowPageChange = true;

    // Current Route
    var currentRoute = {};
    var previousRoute = {};
    Object.defineProperty(router, 'currentRoute', {
      enumerable: true,
      configurable: true,
      set: function set() {
        var newRoute = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        previousRoute = _utils2.default.extend({}, currentRoute);
        currentRoute = newRoute;
        if (!currentRoute) return;
        router.url = currentRoute.url;
        router.emit('routeChange', newRoute, previousRoute, router);
      },
      get: function get() {
        return currentRoute;
      }
    });
    Object.defineProperty(router, 'previousRoute', {
      enumerable: true,
      configurable: true,
      get: function get() {
        return previousRoute;
      },
      set: function set(newRoute) {
        previousRoute = newRoute;
      }
    });

    _utils2.default.extend(router, {
      // Load
      forward: _navigate.forward,
      load: _navigate.load,
      navigate: _navigate.navigate,
      refreshPage: _navigate.refreshPage,
      // Tab
      tabLoad: _tab.tabLoad,
      tabRemove: _tab.tabRemove,
      // Modal
      modalLoad: _modal.modalLoad,
      modalRemove: _modal.modalRemove,
      // Back
      backward: _back.backward,
      loadBack: _back.loadBack,
      back: _back.back,
      // Clear history
      clearPreviousHistory: _clearPreviousHistory.clearPreviousHistory
    });

    return _ret = router, _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Router, [{
    key: 'animatableNavElements',
    value: function animatableNavElements(newNavbarInner, oldNavbarInner) {
      var router = this;
      var dynamicNavbar = router.dynamicNavbar;
      var animateIcon = router.params.iosAnimateNavbarBackIcon;

      var newNavEls = void 0;
      var oldNavEls = void 0;
      function animatableNavEl(el, navbarInner) {
        var $el = (0, _dom2.default)(el);
        var isSliding = $el.hasClass('sliding') || navbarInner.hasClass('sliding');
        var isSubnavbar = $el.hasClass('subnavbar');
        var needsOpacityTransition = isSliding ? !isSubnavbar : true;
        var hasIcon = isSliding && animateIcon && $el.hasClass('left') && $el.find('.back .icon').length > 0;
        var $iconEl = void 0;
        if (hasIcon) $iconEl = $el.find('.back .icon');
        return {
          $el: $el,
          $iconEl: $iconEl,
          hasIcon: hasIcon,
          leftOffset: $el[0].f7NavbarLeftOffset,
          rightOffset: $el[0].f7NavbarRightOffset,
          isSliding: isSliding,
          isSubnavbar: isSubnavbar,
          needsOpacityTransition: needsOpacityTransition
        };
      }
      if (dynamicNavbar) {
        newNavEls = [];
        oldNavEls = [];
        newNavbarInner.children('.left, .right, .title, .subnavbar').each(function (index, navEl) {
          newNavEls.push(animatableNavEl(navEl, newNavbarInner));
        });
        oldNavbarInner.children('.left, .right, .title, .subnavbar').each(function (index, navEl) {
          oldNavEls.push(animatableNavEl(navEl, oldNavbarInner));
        });
        [oldNavEls, newNavEls].forEach(function (navEls) {
          navEls.forEach(function (navEl) {
            var n = navEl;
            var isSliding = navEl.isSliding,
                $el = navEl.$el;

            var otherEls = navEls === oldNavEls ? newNavEls : oldNavEls;
            if (!(isSliding && $el.hasClass('title') && otherEls)) return;
            otherEls.forEach(function (otherNavEl) {
              if (otherNavEl.$el.hasClass('left') && otherNavEl.hasIcon) {
                var iconTextEl = otherNavEl.$el.find('.back span')[0];
                n.leftOffset += iconTextEl ? iconTextEl.offsetLeft : 0;
              }
            });
          });
        });
      }

      return { newNavEls: newNavEls, oldNavEls: oldNavEls };
    }
  }, {
    key: 'animateWithCSS',
    value: function animateWithCSS(oldPage, newPage, oldNavbarInner, newNavbarInner, direction, callback) {
      var router = this;
      var dynamicNavbar = router.dynamicNavbar;
      var separateNavbar = router.separateNavbar;
      var ios = router.app.theme === 'ios';
      // Router Animation class
      var routerTransitionClass = 'router-transition-' + direction + ' router-transition-css-' + direction;

      var newNavEls = void 0;
      var oldNavEls = void 0;
      var navbarWidth = 0;

      if (ios && dynamicNavbar) {
        if (!separateNavbar) {
          navbarWidth = newNavbarInner[0].offsetWidth;
        }
        var navEls = router.animatableNavElements(newNavbarInner, oldNavbarInner);
        newNavEls = navEls.newNavEls;
        oldNavEls = navEls.oldNavEls;
      }

      function animateNavbars(progress) {
        if (ios && dynamicNavbar) {
          newNavEls.forEach(function (navEl) {
            var $el = navEl.$el;
            var offset = direction === 'forward' ? navEl.rightOffset : navEl.leftOffset;
            if (navEl.isSliding) {
              $el.transform('translate3d(' + offset * (1 - progress) + 'px,0,0)');
            }
            if (navEl.hasIcon) {
              if (direction === 'forward') {
                navEl.$iconEl.transform('translate3d(' + (-offset - navbarWidth) * (1 - progress) + 'px,0,0)');
              } else {
                navEl.$iconEl.transform('translate3d(' + (-offset + navbarWidth / 5) * (1 - progress) + 'px,0,0)');
              }
            }
          });
          oldNavEls.forEach(function (navEl) {
            var $el = navEl.$el;
            var offset = direction === 'forward' ? navEl.leftOffset : navEl.rightOffset;
            if (navEl.isSliding) {
              $el.transform('translate3d(' + offset * progress + 'px,0,0)');
            }
            if (navEl.hasIcon) {
              if (direction === 'forward') {
                navEl.$iconEl.transform('translate3d(' + (-offset + navbarWidth / 5) * progress + 'px,0,0)');
              } else {
                navEl.$iconEl.transform('translate3d(' + (-offset - navbarWidth) * progress + 'px,0,0)');
              }
            }
          });
        }
      }

      // AnimationEnd Callback
      function onDone() {
        if (router.dynamicNavbar) {
          if (newNavbarInner.hasClass('sliding')) {
            newNavbarInner.find('.title, .left, .right, .left .icon, .subnavbar').transform('');
          } else {
            newNavbarInner.find('.sliding').transform('');
          }
          if (oldNavbarInner.hasClass('sliding')) {
            oldNavbarInner.find('.title, .left, .right, .left .icon, .subnavbar').transform('');
          } else {
            oldNavbarInner.find('.sliding').transform('');
          }
        }
        router.$el.removeClass(routerTransitionClass);
        if (callback) callback();
      }

      (direction === 'forward' ? newPage : oldPage).animationEnd(function () {
        onDone();
      });

      // Animate
      if (dynamicNavbar) {
        // Prepare Navbars
        animateNavbars(0);
        _utils2.default.nextTick(function () {
          // Add class, start animation
          animateNavbars(1);
          router.$el.addClass(routerTransitionClass);
        });
      } else {
        // Add class, start animation
        router.$el.addClass(routerTransitionClass);
      }
    }
  }, {
    key: 'animateWithJS',
    value: function animateWithJS(oldPage, newPage, oldNavbarInner, newNavbarInner, direction, callback) {
      var router = this;
      var dynamicNavbar = router.dynamicNavbar;
      var separateNavbar = router.separateNavbar;
      var ios = router.app.theme === 'ios';
      var duration = ios ? 400 : 250;
      var routerTransitionClass = 'router-transition-' + direction + ' router-transition-js-' + direction;

      var startTime = null;
      var done = false;

      var newNavEls = void 0;
      var oldNavEls = void 0;
      var navbarWidth = 0;

      if (ios && dynamicNavbar) {
        if (!separateNavbar) {
          navbarWidth = newNavbarInner[0].offsetWidth;
        }
        var navEls = router.animatableNavElements(newNavbarInner, oldNavbarInner);
        newNavEls = navEls.newNavEls;
        oldNavEls = navEls.oldNavEls;
      }

      var $shadowEl = void 0;
      var $opacityEl = void 0;

      if (ios) {
        $shadowEl = (0, _dom2.default)('<div class="page-shadow-effect"></div>');
        $opacityEl = (0, _dom2.default)('<div class="page-opacity-effect"></div>');

        if (direction === 'forward') {
          newPage.append($shadowEl);
          oldPage.append($opacityEl);
        } else {
          newPage.append($opacityEl);
          oldPage.append($shadowEl);
        }
      }
      var easing = _utils2.default.bezier(0.25, 0.1, 0.25, 1);

      function onDone() {
        newPage.transform('').css('opacity', '');
        oldPage.transform('').css('opacity', '');
        if (ios) {
          $shadowEl.remove();
          $opacityEl.remove();
          if (dynamicNavbar) {
            newNavEls.forEach(function (navEl) {
              navEl.$el.transform('');
              navEl.$el.css('opacity', '');
            });
            oldNavEls.forEach(function (navEl) {
              navEl.$el.transform('');
              navEl.$el.css('opacity', '');
            });
            newNavEls = [];
            oldNavEls = [];
          }
        }

        router.$el.removeClass(routerTransitionClass);

        if (callback) callback();
      }

      function render() {
        var time = _utils2.default.now();
        if (!startTime) startTime = time;
        var progress = Math.max(Math.min((time - startTime) / duration, 1), 0);
        var easeProgress = easing(progress);

        if (progress >= 1) {
          done = true;
        }
        var inverter = router.app.rtl ? -1 : 1;
        if (ios) {
          if (direction === 'forward') {
            newPage.transform('translate3d(' + (1 - easeProgress) * 100 * inverter + '%,0,0)');
            oldPage.transform('translate3d(' + -easeProgress * 20 * inverter + '%,0,0)');
            $shadowEl[0].style.opacity = easeProgress;
            $opacityEl[0].style.opacity = easeProgress;
          } else {
            newPage.transform('translate3d(' + -(1 - easeProgress) * 20 * inverter + '%,0,0)');
            oldPage.transform('translate3d(' + easeProgress * 100 * inverter + '%,0,0)');
            $shadowEl[0].style.opacity = 1 - easeProgress;
            $opacityEl[0].style.opacity = 1 - easeProgress;
          }
          if (dynamicNavbar) {
            newNavEls.forEach(function (navEl) {
              var $el = navEl.$el;
              var offset = direction === 'forward' ? navEl.rightOffset : navEl.leftOffset;
              if (navEl.needsOpacityTransition) {
                $el[0].style.opacity = easeProgress;
              }
              if (navEl.isSliding) {
                $el.transform('translate3d(' + offset * (1 - easeProgress) + 'px,0,0)');
              }
              if (navEl.hasIcon) {
                if (direction === 'forward') {
                  navEl.$iconEl.transform('translate3d(' + (-offset - navbarWidth) * (1 - easeProgress) + 'px,0,0)');
                } else {
                  navEl.$iconEl.transform('translate3d(' + (-offset + navbarWidth / 5) * (1 - easeProgress) + 'px,0,0)');
                }
              }
            });
            oldNavEls.forEach(function (navEl) {
              var $el = navEl.$el;
              var offset = direction === 'forward' ? navEl.leftOffset : navEl.rightOffset;
              if (navEl.needsOpacityTransition) {
                $el[0].style.opacity = 1 - easeProgress;
              }
              if (navEl.isSliding) {
                $el.transform('translate3d(' + offset * easeProgress + 'px,0,0)');
              }
              if (navEl.hasIcon) {
                if (direction === 'forward') {
                  navEl.$iconEl.transform('translate3d(' + (-offset + navbarWidth / 5) * easeProgress + 'px,0,0)');
                } else {
                  navEl.$iconEl.transform('translate3d(' + (-offset - navbarWidth) * easeProgress + 'px,0,0)');
                }
              }
            });
          }
        } else if (direction === 'forward') {
          newPage.transform('translate3d(0, ' + (1 - easeProgress) * 56 + 'px,0)');
          newPage.css('opacity', easeProgress);
        } else {
          oldPage.transform('translate3d(0, ' + easeProgress * 56 + 'px,0)');
          oldPage.css('opacity', 1 - easeProgress);
        }

        if (done) {
          onDone();
          return;
        }
        _utils2.default.nextFrame(render);
      }

      router.$el.addClass(routerTransitionClass);

      _utils2.default.nextFrame(render);
    }
  }, {
    key: 'animate',
    value: function animate() {
      // Args: oldPage, newPage, oldNavbarInner, newNavbarInner, direction, callback
      var router = this;

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      if (router.params.animateCustom) {
        router.params.animateCustom.apply(router, args);
      } else if (router.params.animateWithJS) {
        router.animateWithJS.apply(router, args);
      } else {
        router.animateWithCSS.apply(router, args);
      }
    }
  }, {
    key: 'removeModal',
    value: function removeModal(modalEl) {
      var router = this;
      router.removeEl(modalEl);
    }
    // eslint-disable-next-line

  }, {
    key: 'removeTabContent',
    value: function removeTabContent(tabEl) {
      var $tabEl = (0, _dom2.default)(tabEl);
      $tabEl.html('');
    }
  }, {
    key: 'removeNavbar',
    value: function removeNavbar(el) {
      var router = this;
      router.removeEl(el);
    }
  }, {
    key: 'removePage',
    value: function removePage(el) {
      var router = this;
      router.removeEl(el);
    }
  }, {
    key: 'removeEl',
    value: function removeEl(el) {
      if (!el) return;
      var router = this;
      var $el = (0, _dom2.default)(el);
      if ($el.length === 0) return;
      if ($el[0].f7Component && $el[0].f7Component.$destroy) {
        $el[0].f7Component.$destroy();
      }
      $el.find('.tab').each(function (tabIndex, tabEl) {
        (0, _dom2.default)(tabEl).children().each(function (index, tabChild) {
          if (tabChild.f7Component) {
            (0, _dom2.default)(tabChild).trigger('tab:beforeremove');
            tabChild.f7Component.$destroy();
          }
        });
      });
      if (!router.params.removeElements) {
        return;
      }
      if (router.params.removeElementsWithTimeout) {
        setTimeout(function () {
          $el.remove();
        }, router.params.removeElementsTimeout);
      } else {
        $el.remove();
      }
    }
  }, {
    key: 'getPageEl',
    value: function getPageEl(content) {
      var router = this;
      if (typeof content === 'string') {
        router.tempDom.innerHTML = content;
      } else {
        if ((0, _dom2.default)(content).hasClass('page')) {
          return content;
        }
        router.tempDom.innerHTML = '';
        (0, _dom2.default)(router.tempDom).append(content);
      }

      return router.findElement('.page', router.tempDom);
    }
  }, {
    key: 'findElement',
    value: function findElement(stringSelector, container, notStacked) {
      var router = this;
      var view = router.view;
      var app = router.app;

      // Modals Selector
      var modalsSelector = '.popup, .dialog, .popover, .actions-modal, .sheet-modal, .login-screen, .page';

      var $container = (0, _dom2.default)(container);
      var selector = stringSelector;
      if (notStacked) selector += ':not(.stacked)';

      var found = $container.find(selector).filter(function (index, el) {
        return (0, _dom2.default)(el).parents(modalsSelector).length === 0;
      });

      if (found.length > 1) {
        if (typeof view.selector === 'string') {
          // Search in related view
          found = $container.find(view.selector + ' ' + selector);
        }
        if (found.length > 1) {
          // Search in main view
          found = $container.find('.' + app.params.viewMainClass + ' ' + selector);
        }
      }
      if (found.length === 1) return found;

      // Try to find not stacked
      if (!notStacked) found = router.findElement(selector, $container, true);
      if (found && found.length === 1) return found;
      if (found && found.length > 1) return (0, _dom2.default)(found[0]);
      return undefined;
    }
  }, {
    key: 'flattenRoutes',
    value: function flattenRoutes() {
      var _this2 = this;

      var routes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.routes;

      var flattenedRoutes = [];
      routes.forEach(function (route) {
        if ('routes' in route) {
          var mergedPathsRoutes = route.routes.map(function (childRoute) {
            var cRoute = _utils2.default.extend({}, childRoute);
            cRoute.path = (route.path + '/' + cRoute.path).replace('///', '/').replace('//', '/');
            return cRoute;
          });
          flattenedRoutes = flattenedRoutes.concat(route, _this2.flattenRoutes(mergedPathsRoutes));
        } else if ('tabs' in route && route.tabs) {
          var _mergedPathsRoutes = route.tabs.map(function (tabRoute) {
            var tRoute = _utils2.default.extend({}, route, {
              path: (route.path + '/' + tabRoute.path).replace('///', '/').replace('//', '/'),
              parentPath: route.path,
              tab: tabRoute
            });
            delete tRoute.tabs;
            return tRoute;
          });
          flattenedRoutes = flattenedRoutes.concat(_this2.flattenRoutes(_mergedPathsRoutes));
        } else {
          flattenedRoutes.push(route);
        }
      });
      return flattenedRoutes;
    }
    // eslint-disable-next-line

  }, {
    key: 'parseRouteUrl',
    value: function parseRouteUrl(url) {
      if (!url) return {};
      var query = _utils2.default.parseUrlQuery(url);
      var hash = url.split('#')[1];
      var params = {};
      var path = url.split('#')[0].split('?')[0];
      return {
        query: query,
        hash: hash,
        params: params,
        url: url,
        path: path
      };
    }
  }, {
    key: 'findTabRoute',
    value: function findTabRoute(tabEl) {
      var router = this;
      var $tabEl = (0, _dom2.default)(tabEl);
      var parentPath = router.currentRoute.route.parentPath;
      var tabId = $tabEl.attr('id');
      var flattenedRoutes = router.flattenRoutes(router.routes);
      var foundTabRoute = void 0;
      flattenedRoutes.forEach(function (route) {
        if (route.parentPath === parentPath && route.tab && route.tab.id === tabId) {
          foundTabRoute = route;
        }
      });
      return foundTabRoute;
    }
  }, {
    key: 'findRouteByKey',
    value: function findRouteByKey(key, value) {
      var router = this;
      var routes = router.routes;
      var flattenedRoutes = router.flattenRoutes(routes);
      var matchingRoute = void 0;

      flattenedRoutes.forEach(function (route) {
        if (matchingRoute) return;
        if (route[key] === value) {
          matchingRoute = route;
        }
      });
      return matchingRoute;
    }
  }, {
    key: 'findMatchingRoute',
    value: function findMatchingRoute(url) {
      if (!url) return undefined;
      var router = this;
      var routes = router.routes;
      var flattenedRoutes = router.flattenRoutes(routes);

      var _router$parseRouteUrl = router.parseRouteUrl(url),
          path = _router$parseRouteUrl.path,
          query = _router$parseRouteUrl.query,
          hash = _router$parseRouteUrl.hash,
          params = _router$parseRouteUrl.params;

      var matchingRoute = void 0;
      flattenedRoutes.forEach(function (route) {
        if (matchingRoute) return;
        var keys = [];

        var pathsToMatch = [route.path];
        if (route.alias) {
          if (typeof route.alias === 'string') pathsToMatch.push(route.alias);else if (Array.isArray(route.alias)) {
            route.alias.forEach(function (aliasPath) {
              pathsToMatch.push(aliasPath);
            });
          }
        }

        var matched = void 0;
        pathsToMatch.forEach(function (pathToMatch) {
          if (matched) return;
          matched = (0, _pathToRegexp2.default)(pathToMatch, keys).exec(path);
        });

        if (matched) {
          keys.forEach(function (keyObj, index) {
            if (typeof keyObj.name === 'number') return;
            var paramValue = matched[index + 1];
            params[keyObj.name] = paramValue;
          });

          var parentPath = void 0;
          if (route.parentPath) {
            parentPath = path.split('/').slice(0, route.parentPath.split('/').length - 1).join('/');
          }

          matchingRoute = {
            query: query,
            hash: hash,
            params: params,
            url: url,
            path: path,
            parentPath: parentPath,
            route: route,
            name: route.name
          };
        }
      });
      return matchingRoute;
    }
  }, {
    key: 'removeFromXhrCache',
    value: function removeFromXhrCache(url) {
      var router = this;
      var xhrCache = router.cache.xhr;
      var index = false;
      for (var i = 0; i < xhrCache.length; i += 1) {
        if (xhrCache[i].url === url) index = i;
      }
      if (index !== false) xhrCache.splice(index, 1);
    }
  }, {
    key: 'xhrRequest',
    value: function xhrRequest(requestUrl, options) {
      var router = this;
      var params = router.params;
      var ignoreCache = options.ignoreCache;

      var url = requestUrl;

      var hasQuery = url.indexOf('?') >= 0;
      if (params.passRouteQueryToRequest && options && options.route && options.route.query && Object.keys(options.route.query).length) {
        url += '' + (hasQuery ? '&' : '?') + _utils2.default.serializeObject(options.route.query);
        hasQuery = true;
      }

      if (params.passRouteParamsToRequest && options && options.route && options.route.params && Object.keys(options.route.params).length) {
        url += '' + (hasQuery ? '&' : '?') + _utils2.default.serializeObject(options.route.params);
        hasQuery = true;
      }

      if (url.indexOf('{{') >= 0 && options && options.route && options.route.params && Object.keys(options.route.params).length) {
        Object.keys(options.route.params).forEach(function (paramName) {
          var regExp = new RegExp('{{' + paramName + '}}', 'g');
          url = url.replace(regExp, options.route.params[paramName] || '');
        });
      }
      // should we ignore get params or not
      if (params.xhrCacheIgnoreGetParameters && url.indexOf('?') >= 0) {
        url = url.split('?')[0];
      }
      return _utils2.default.promise(function (resolve, reject) {
        if (params.xhrCache && !ignoreCache && url.indexOf('nocache') < 0 && params.xhrCacheIgnore.indexOf(url) < 0) {
          for (var i = 0; i < router.cache.xhr.length; i += 1) {
            var cachedUrl = router.cache.xhr[i];
            if (cachedUrl.url === url) {
              // Check expiration
              if (_utils2.default.now() - cachedUrl.time < params.xhrCacheDuration) {
                // Load from cache
                resolve(cachedUrl.content);
                return;
              }
            }
          }
        }
        router.xhr = router.app.request({
          url: url,
          method: 'GET',
          beforeSend: function beforeSend(xhr) {
            router.emit('routerAjaxStart', xhr, options);
          },
          complete: function complete(xhr, status) {
            router.emit('routerAjaxComplete', xhr);
            if (status !== 'error' && status !== 'timeout' && xhr.status >= 200 && xhr.status < 300 || xhr.status === 0) {
              if (params.xhrCache && xhr.responseText !== '') {
                router.removeFromXhrCache(url);
                router.cache.xhr.push({
                  url: url,
                  time: _utils2.default.now(),
                  content: xhr.responseText
                });
              }
              router.emit('routerAjaxSuccess', xhr, options);
              resolve(xhr.responseText);
            } else {
              router.emit('routerAjaxError', xhr, options);
              reject(xhr);
            }
          },
          error: function error(xhr) {
            router.emit('routerAjaxError', xhr, options);
            reject(xhr);
          }
        });
      });
    }

    // Remove theme elements

  }, {
    key: 'removeThemeElements',
    value: function removeThemeElements(el) {
      var router = this;
      var theme = router.app.theme;
      (0, _dom2.default)(el).find('.' + (theme === 'md' ? 'ios' : 'md') + '-only, .if-' + (theme === 'md' ? 'ios' : 'md')).remove();
    }
  }, {
    key: 'templateLoader',
    value: function templateLoader(template, templateUrl, options, resolve, reject) {
      var router = this;
      function compile(t) {
        var compiledHtml = void 0;
        var context = void 0;
        try {
          context = options.context || {};
          if (typeof context === 'function') context = context.call(router);else if (typeof context === 'string') {
            try {
              context = JSON.parse(context);
            } catch (err) {
              reject();
              throw err;
            }
          }
          if (typeof t === 'function') {
            compiledHtml = t(context);
          } else {
            compiledHtml = _template2.default.compile(t)(_utils2.default.extend({}, context || {}, {
              $app: router.app,
              $root: _utils2.default.extend({}, router.app.data, router.app.methods),
              $route: options.route,
              $router: router,
              $theme: {
                ios: router.app.theme === 'ios',
                md: router.app.theme === 'md'
              }
            }));
          }
        } catch (err) {
          reject();
          throw err;
        }
        resolve(compiledHtml, { context: context });
      }
      if (templateUrl) {
        // Load via XHR
        if (router.xhr) {
          router.xhr.abort();
          router.xhr = false;
        }
        router.xhrRequest(templateUrl, options).then(function (templateContent) {
          compile(templateContent);
        }).catch(function () {
          reject();
        });
      } else {
        compile(template);
      }
    }
  }, {
    key: 'modalTemplateLoader',
    value: function modalTemplateLoader(template, templateUrl, options, resolve, reject) {
      var router = this;
      return router.templateLoader(template, templateUrl, options, function (html) {
        resolve(html);
      }, reject);
    }
  }, {
    key: 'tabTemplateLoader',
    value: function tabTemplateLoader(template, templateUrl, options, resolve, reject) {
      var router = this;
      return router.templateLoader(template, templateUrl, options, function (html) {
        resolve(html);
      }, reject);
    }
  }, {
    key: 'pageTemplateLoader',
    value: function pageTemplateLoader(template, templateUrl, options, resolve, reject) {
      var router = this;
      return router.templateLoader(template, templateUrl, options, function (html) {
        var newOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        resolve(router.getPageEl(html), newOptions);
      }, reject);
    }
  }, {
    key: 'componentLoader',
    value: function componentLoader(component, componentUrl) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var resolve = arguments[3];
      var reject = arguments[4];

      var router = this;
      var url = typeof component === 'string' ? component : componentUrl;
      function compile(c) {
        var context = options.context || {};
        if (typeof context === 'function') context = context.call(router);else if (typeof context === 'string') {
          try {
            context = JSON.parse(context);
          } catch (err) {
            reject();
            throw err;
          }
        }
        var extendContext = _utils2.default.merge({}, context, {
          $: _dom2.default,
          $$: _dom2.default,
          $app: router.app,
          $root: _utils2.default.merge({}, router.app.data, router.app.methods),
          $route: options.route,
          $router: router,
          $dom7: _dom2.default,
          $theme: {
            ios: router.app.theme === 'ios',
            md: router.app.theme === 'md'
          }
        });
        var createdComponent = _component2.default.create(c, extendContext);
        resolve(createdComponent.el);
      }
      if (url) {
        // Load via XHR
        if (router.xhr) {
          router.xhr.abort();
          router.xhr = false;
        }
        router.xhrRequest(url, options).then(function (loadedComponent) {
          compile(_component2.default.parse(loadedComponent));
        }).catch(function (err) {
          reject();
          throw err;
        });
      } else {
        compile(component);
      }
    }
  }, {
    key: 'modalComponentLoader',
    value: function modalComponentLoader(rootEl, component, componentUrl, options, resolve, reject) {
      var router = this;
      router.componentLoader(component, componentUrl, options, function (el) {
        resolve(el);
      }, reject);
    }
  }, {
    key: 'tabComponentLoader',
    value: function tabComponentLoader(tabEl, component, componentUrl, options, resolve, reject) {
      var router = this;
      router.componentLoader(component, componentUrl, options, function (el) {
        resolve(el);
      }, reject);
    }
  }, {
    key: 'pageComponentLoader',
    value: function pageComponentLoader(routerEl, component, componentUrl, options, resolve, reject) {
      var router = this;
      router.componentLoader(component, componentUrl, options, function (el) {
        var newOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        resolve(el, newOptions);
      }, reject);
    }
  }, {
    key: 'getPageData',
    value: function getPageData(pageEl, navbarEl, from, to) {
      var route = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
      var pageFromEl = arguments[5];

      var router = this;
      var $pageEl = (0, _dom2.default)(pageEl);
      var $navbarEl = (0, _dom2.default)(navbarEl);
      var currentPage = $pageEl[0].f7Page || {};
      var direction = void 0;
      var pageFrom = void 0;
      if (from === 'next' && to === 'current' || from === 'current' && to === 'previous') direction = 'forward';
      if (from === 'current' && to === 'next' || from === 'previous' && to === 'current') direction = 'backward';
      if (currentPage && !currentPage.fromPage) {
        var $pageFromEl = (0, _dom2.default)(pageFromEl);
        if ($pageFromEl.length) {
          pageFrom = $pageFromEl[0].f7Page;
        }
      }
      pageFrom = currentPage.pageFrom || pageFrom;
      if (pageFrom && pageFrom.pageFrom) {
        pageFrom.pageFrom = null;
      }
      var page = {
        app: router.app,
        view: router.view,
        router: router,
        $el: $pageEl,
        el: $pageEl[0],
        $pageEl: $pageEl,
        pageEl: $pageEl[0],
        $navbarEl: $navbarEl,
        navbarEl: $navbarEl[0],
        name: $pageEl.attr('data-name'),
        position: from,
        from: from,
        to: to,
        direction: direction,
        route: currentPage.route ? currentPage.route : route,
        pageFrom: pageFrom
      };

      if ($navbarEl && $navbarEl[0]) {
        $navbarEl[0].f7Page = page;
      }
      $pageEl[0].f7Page = page;
      return page;
    }

    // Callbacks

  }, {
    key: 'pageCallback',
    value: function pageCallback(callback, pageEl, navbarEl, from, to) {
      var options = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {};
      var pageFromEl = arguments[6];

      if (!pageEl) return;
      var router = this;
      var $pageEl = (0, _dom2.default)(pageEl);
      if (!$pageEl.length) return;
      var route = options.route;

      var restoreScrollTopOnBack = router.params.restoreScrollTopOnBack;

      var camelName = 'page' + (callback[0].toUpperCase() + callback.slice(1, callback.length));
      var colonName = 'page:' + callback.toLowerCase();

      var page = {};
      if (callback === 'beforeRemove' && $pageEl[0].f7Page) {
        page = _utils2.default.extend($pageEl[0].f7Page, { from: from, to: to, position: from });
      } else {
        page = router.getPageData(pageEl, navbarEl, from, to, route, pageFromEl);
      }
      page.swipeBack = !!options.swipeBack;

      var _ref = options.route ? options.route.route : {},
          _ref$on = _ref.on,
          on = _ref$on === undefined ? {} : _ref$on,
          _ref$once = _ref.once,
          once = _ref$once === undefined ? {} : _ref$once;

      if (options.on) {
        _utils2.default.extend(on, options.on);
      }
      if (options.once) {
        _utils2.default.extend(once, options.once);
      }

      function attachEvents() {
        if ($pageEl[0].f7RouteEventsAttached) return;
        $pageEl[0].f7RouteEventsAttached = true;
        if (on && Object.keys(on).length > 0) {
          $pageEl[0].f7RouteEventsOn = on;
          Object.keys(on).forEach(function (eventName) {
            on[eventName] = on[eventName].bind(router);
            $pageEl.on(_utils2.default.eventNameToColonCase(eventName), on[eventName]);
          });
        }
        if (once && Object.keys(once).length > 0) {
          $pageEl[0].f7RouteEventsOnce = once;
          Object.keys(once).forEach(function (eventName) {
            once[eventName] = once[eventName].bind(router);
            $pageEl.once(_utils2.default.eventNameToColonCase(eventName), once[eventName]);
          });
        }
      }

      function detachEvents() {
        if (!$pageEl[0].f7RouteEventsAttached) return;
        if ($pageEl[0].f7RouteEventsOn) {
          Object.keys($pageEl[0].f7RouteEventsOn).forEach(function (eventName) {
            $pageEl.off(_utils2.default.eventNameToColonCase(eventName), $pageEl[0].f7RouteEventsOn[eventName]);
          });
        }
        if ($pageEl[0].f7RouteEventsOnce) {
          Object.keys($pageEl[0].f7RouteEventsOnce).forEach(function (eventName) {
            $pageEl.off(_utils2.default.eventNameToColonCase(eventName), $pageEl[0].f7RouteEventsOnce[eventName]);
          });
        }
        $pageEl[0].f7RouteEventsAttached = null;
        $pageEl[0].f7RouteEventsOn = null;
        $pageEl[0].f7RouteEventsOnce = null;
        delete $pageEl[0].f7RouteEventsAttached;
        delete $pageEl[0].f7RouteEventsOn;
        delete $pageEl[0].f7RouteEventsOnce;
      }

      if (callback === 'mounted') {
        attachEvents();
      }
      if (callback === 'init') {
        if (restoreScrollTopOnBack && (from === 'previous' || !from) && to === 'current' && router.scrollHistory[page.route.url] && !$pageEl.hasClass('no-restore-scroll')) {
          var $pageContent = $pageEl.find('.page-content');
          if ($pageContent.length > 0) {
            // eslint-disable-next-line
            $pageContent = $pageContent.filter(function (pageContentIndex, pageContentEl) {
              return (0, _dom2.default)(pageContentEl).parents('.tab:not(.tab-active)').length === 0 && !(0, _dom2.default)(pageContentEl).is('.tab:not(.tab-active)');
            });
          }
          $pageContent.scrollTop(router.scrollHistory[page.route.url]);
        }
        attachEvents();
        if ($pageEl[0].f7PageInitialized) {
          $pageEl.trigger('page:reinit', page);
          router.emit('pageReinit', page);
          return;
        }
        $pageEl[0].f7PageInitialized = true;
      }
      if (restoreScrollTopOnBack && callback === 'beforeOut' && from === 'current' && to === 'previous') {
        // Save scroll position
        var _$pageContent = $pageEl.find('.page-content');
        if (_$pageContent.length > 0) {
          // eslint-disable-next-line
          _$pageContent = _$pageContent.filter(function (pageContentIndex, pageContentEl) {
            return (0, _dom2.default)(pageContentEl).parents('.tab:not(.tab-active)').length === 0 && !(0, _dom2.default)(pageContentEl).is('.tab:not(.tab-active)');
          });
        }
        router.scrollHistory[page.route.url] = _$pageContent.scrollTop();
      }
      if (restoreScrollTopOnBack && callback === 'beforeOut' && from === 'current' && to === 'next') {
        // Delete scroll position
        delete router.scrollHistory[page.route.url];
      }

      $pageEl.trigger(colonName, page);
      router.emit(camelName, page);

      if (callback === 'beforeRemove') {
        detachEvents();
        $pageEl[0].f7Page = null;
      }
    }
  }, {
    key: 'saveHistory',
    value: function saveHistory() {
      var router = this;
      router.view.history = router.history;
      if (router.params.pushState) {
        _ssrWindow.window.localStorage['f7router-' + router.view.id + '-history'] = JSON.stringify(router.history);
      }
    }
  }, {
    key: 'restoreHistory',
    value: function restoreHistory() {
      var router = this;
      if (router.params.pushState && _ssrWindow.window.localStorage['f7router-' + router.view.id + '-history']) {
        router.history = JSON.parse(_ssrWindow.window.localStorage['f7router-' + router.view.id + '-history']);
        router.view.history = router.history;
      }
    }
  }, {
    key: 'clearHistory',
    value: function clearHistory() {
      var router = this;
      router.history = [];
      if (router.view) router.view.history = [];
      router.saveHistory();
    }
  }, {
    key: 'init',
    value: function init() {
      var router = this;
      var app = router.app,
          view = router.view;

      // Init Swipeback

      if ("universal" !== 'desktop') {
        if (view && router.params.iosSwipeBack && app.theme === 'ios' || view && router.params.mdSwipeBack && app.theme === 'md') {
          (0, _swipeBack2.default)(router);
        }
      }

      // Dynamic not separated navbbar
      if (router.dynamicNavbar && !router.separateNavbar) {
        router.$el.addClass('router-dynamic-navbar-inside');
      }

      var initUrl = router.params.url;
      var documentUrl = _ssrWindow.document.location.href.split(_ssrWindow.document.location.origin)[1];
      var historyRestored = void 0;
      var _router$params = router.params,
          pushState = _router$params.pushState,
          pushStateOnLoad = _router$params.pushStateOnLoad,
          pushStateSeparator = _router$params.pushStateSeparator,
          pushStateAnimateOnLoad = _router$params.pushStateAnimateOnLoad;
      var pushStateRoot = router.params.pushStateRoot;

      if (_ssrWindow.window.cordova && pushState && !pushStateSeparator && !pushStateRoot && _ssrWindow.document.location.pathname.indexOf('index.html')) {
        // eslint-disable-next-line
        console.warn('Framework7: wrong or not complete pushState configuration, trying to guess pushStateRoot');
        pushStateRoot = _ssrWindow.document.location.pathname.split('index.html')[0];
      }

      if (!pushState || !pushStateOnLoad) {
        if (!initUrl) {
          initUrl = documentUrl;
        }
        if (_ssrWindow.document.location.search && initUrl.indexOf('?') < 0) {
          initUrl += _ssrWindow.document.location.search;
        }
        if (_ssrWindow.document.location.hash && initUrl.indexOf('#') < 0) {
          initUrl += _ssrWindow.document.location.hash;
        }
      } else {
        if (pushStateRoot && documentUrl.indexOf(pushStateRoot) >= 0) {
          documentUrl = documentUrl.split(pushStateRoot)[1];
          if (documentUrl === '') documentUrl = '/';
        }
        if (pushStateSeparator.length > 0 && documentUrl.indexOf(pushStateSeparator) >= 0) {
          initUrl = documentUrl.split(pushStateSeparator)[1];
        } else {
          initUrl = documentUrl;
        }
        router.restoreHistory();
        if (router.history.indexOf(initUrl) >= 0) {
          router.history = router.history.slice(0, router.history.indexOf(initUrl) + 1);
        } else if (router.params.url === initUrl) {
          router.history = [initUrl];
        } else if (_history2.default.state && _history2.default.state[view.id] && _history2.default.state[view.id].url === router.history[router.history.length - 1]) {
          initUrl = router.history[router.history.length - 1];
        } else {
          router.history = [documentUrl.split(pushStateSeparator)[0] || '/', initUrl];
        }
        if (router.history.length > 1) {
          historyRestored = true;
        } else {
          router.history = [];
        }
        router.saveHistory();
      }
      var currentRoute = void 0;
      if (router.history.length > 1) {
        // Will load page
        currentRoute = router.findMatchingRoute(router.history[0]);
        if (!currentRoute) {
          currentRoute = _utils2.default.extend(router.parseRouteUrl(router.history[0]), {
            route: {
              url: router.history[0],
              path: router.history[0].split('?')[0]
            }
          });
        }
      } else {
        // Don't load page
        currentRoute = router.findMatchingRoute(initUrl);
        if (!currentRoute) {
          currentRoute = _utils2.default.extend(router.parseRouteUrl(initUrl), {
            route: {
              url: initUrl,
              path: initUrl.split('?')[0]
            }
          });
        }
      }

      if (router.params.stackPages) {
        router.$el.children('.page').each(function (index, pageEl) {
          var $pageEl = (0, _dom2.default)(pageEl);
          router.initialPages.push($pageEl[0]);
          if (router.separateNavbar && $pageEl.children('.navbar').length > 0) {
            router.initialNavbars.push($pageEl.children('.navbar').find('.navbar-inner')[0]);
          }
        });
      }

      if (router.$el.children('.page:not(.stacked)').length === 0 && initUrl) {
        // No pages presented in DOM, reload new page
        router.navigate(initUrl, {
          initial: true,
          reloadCurrent: true,
          pushState: false
        });
      } else {
        // Init current DOM page
        var hasTabRoute = void 0;
        router.currentRoute = currentRoute;
        router.$el.children('.page:not(.stacked)').each(function (index, pageEl) {
          var $pageEl = (0, _dom2.default)(pageEl);
          var $navbarInnerEl = void 0;
          $pageEl.addClass('page-current');
          if (router.separateNavbar) {
            $navbarInnerEl = $pageEl.children('.navbar').children('.navbar-inner');
            if ($navbarInnerEl.length > 0) {
              if (!router.$navbarEl.parents(_ssrWindow.document).length) {
                router.$el.prepend(router.$navbarEl);
              }
              router.$navbarEl.append($navbarInnerEl);
              $pageEl.children('.navbar').remove();
            } else {
              router.$navbarEl.addClass('navbar-hidden');
            }
          }
          var initOptions = {
            route: router.currentRoute
          };
          if (router.currentRoute && router.currentRoute.route && router.currentRoute.route.options) {
            _utils2.default.extend(initOptions, router.currentRoute.route.options);
          }
          router.currentPageEl = $pageEl[0];
          if (router.dynamicNavbar && $navbarInnerEl.length) {
            router.currentNavbarEl = $navbarInnerEl[0];
          }
          router.removeThemeElements($pageEl);
          if (router.dynamicNavbar && $navbarInnerEl.length) {
            router.removeThemeElements($navbarInnerEl);
          }
          if (initOptions.route.route.tab) {
            hasTabRoute = true;
            router.tabLoad(initOptions.route.route.tab, _utils2.default.extend({}, initOptions));
          }
          router.pageCallback('init', $pageEl, $navbarInnerEl, 'current', undefined, initOptions);
        });
        if (historyRestored) {
          router.navigate(initUrl, {
            initial: true,
            pushState: false,
            history: false,
            animate: pushStateAnimateOnLoad,
            once: {
              pageAfterIn: function pageAfterIn() {
                if (router.history.length > 2) {
                  router.back({ preload: true });
                }
              }
            }
          });
        }
        if (!historyRestored && !hasTabRoute) {
          router.history.push(initUrl);
          router.saveHistory();
        }
      }
      if (initUrl && pushState && pushStateOnLoad && (!_history2.default.state || !_history2.default.state[view.id])) {
        _history2.default.initViewState(view.id, {
          url: initUrl
        });
      }
      router.emit('local::init routerInit', router);
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      var router = this;

      router.emit('local::destroy routerDestroy', router);

      // Delete props & methods
      Object.keys(router).forEach(function (routerProp) {
        router[routerProp] = null;
        delete router[routerProp];
      });

      router = null;
    }
  }]);

  return Router;
}(_class2.default);

exports.default = Router;