import { window, document } from 'ssr-window';
import $ from 'dom7';
import PathToRegexp from 'path-to-regexp'; // eslint-disable-line
import Framework7Class from '../../utils/class';
import Utils from '../../utils/utils';
import History from '../../utils/history';
import SwipeBack from './swipe-back';

import { refreshPage, forward, load, navigate } from './navigate';
import { tabLoad, tabRemove } from './tab';
import { modalLoad, modalRemove } from './modal';
import { backward, loadBack, back } from './back';
import { clearPreviousHistory, clearPreviousPages } from './clear-previous-history';
import appRouterCheck from './app-router-check';

class Router extends Framework7Class {
  constructor(app, view) {
    super({}, [typeof view === 'undefined' ? app : view]);
    const router = this;

    // Is App Router
    router.isAppRouter = typeof view === 'undefined';

    if (router.isAppRouter) {
      // App Router
      Utils.extend(false, router, {
        app,
        params: app.params.view,
        routes: app.routes || [],
        cache: app.cache,
      });
    } else {
      // View Router
      Utils.extend(false, router, {
        app,
        view,
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
        initialNavbars: [],
      });
    }

    // Install Modules
    router.useModules();

    // Temporary Dom
    router.tempDom = document.createElement('div');

    // AllowPageChage
    router.allowPageChange = true;

    // Current Route
    let currentRoute = {};
    let previousRoute = {};
    Object.defineProperty(router, 'currentRoute', {
      enumerable: true,
      configurable: true,
      set(newRoute = {}) {
        previousRoute = Utils.extend({}, currentRoute);
        currentRoute = newRoute;
        if (!currentRoute) return;
        router.url = currentRoute.url;
        router.emit('routeChange', newRoute, previousRoute, router);
      },
      get() {
        return currentRoute;
      },
    });
    Object.defineProperty(router, 'previousRoute', {
      enumerable: true,
      configurable: true,
      get() {
        return previousRoute;
      },
      set(newRoute) {
        previousRoute = newRoute;
      },
    });

    return router;
  }

  animatableNavElements(newNavbarInner, oldNavbarInner, toLarge, fromLarge, direction) {
    const router = this;
    const dynamicNavbar = router.dynamicNavbar;
    const separateNavbar = router.separateNavbar;
    const animateIcon = router.params.iosAnimateNavbarBackIcon;

    let newNavEls;
    let oldNavEls;
    function animatableNavEl($el, navbarInner) {
      const isSliding = $el.hasClass('sliding') || navbarInner.hasClass('sliding');
      const isSubnavbar = $el.hasClass('subnavbar');
      const needsOpacityTransition = isSliding ? !isSubnavbar : true;
      const $iconEl = $el.find('.back .icon');
      let isIconLabel;
      if (isSliding && animateIcon && $el.hasClass('left') && $iconEl.length > 0 && $iconEl.next('span').length) {
        $el = $iconEl.next('span'); // eslint-disable-line
        isIconLabel = true;
      }
      return {
        $el,
        isIconLabel,
        leftOffset: $el[0].f7NavbarLeftOffset,
        rightOffset: $el[0].f7NavbarRightOffset,
        isSliding,
        isSubnavbar,
        needsOpacityTransition,
      };
    }
    if (dynamicNavbar) {
      newNavEls = [];
      oldNavEls = [];
      newNavbarInner.children('.left, .right, .title, .subnavbar').each((index, navEl) => {
        const $navEl = $(navEl);
        if ($navEl.hasClass('left') && fromLarge && direction === 'forward' && separateNavbar) return;
        if ($navEl.hasClass('title') && toLarge) return;
        newNavEls.push(animatableNavEl($navEl, newNavbarInner));
      });
      if (!(oldNavbarInner.hasClass('navbar-master') && router.params.masterDetailBreakpoint > 0 && router.app.width >= router.params.masterDetailBreakpoint)) {
        oldNavbarInner.children('.left, .right, .title, .subnavbar').each((index, navEl) => {
          const $navEl = $(navEl);
          if ($navEl.hasClass('left') && toLarge && !fromLarge && direction === 'forward' && separateNavbar) return;
          if ($navEl.hasClass('left') && toLarge && direction === 'backward' && separateNavbar) return;
          if ($navEl.hasClass('title') && fromLarge) {
            return;
          }
          oldNavEls.push(animatableNavEl($navEl, oldNavbarInner));
        });
      }
      [oldNavEls, newNavEls].forEach((navEls) => {
        navEls.forEach((navEl) => {
          const n = navEl;
          const { isSliding, $el } = navEl;
          const otherEls = navEls === oldNavEls ? newNavEls : oldNavEls;
          if (!(isSliding && $el.hasClass('title') && otherEls)) return;
          otherEls.forEach((otherNavEl) => {
            if (otherNavEl.isIconLabel) {
              const iconTextEl = otherNavEl.$el[0];
              n.leftOffset += iconTextEl ? (iconTextEl.offsetLeft || 0) : 0;
            }
          });
        });
      });
    }

    return { newNavEls, oldNavEls };
  }

  animate(oldPage, newPage, oldNavbarInner, newNavbarInner, direction, callback) {
    const router = this;
    if (router.params.animateCustom) {
      router.params.animateCustom.apply(router, [oldPage, newPage, oldNavbarInner, newNavbarInner, direction, callback]);
      return;
    }
    const dynamicNavbar = router.dynamicNavbar;
    const ios = router.app.theme === 'ios';
    // Router Animation class
    const routerTransitionClass = `router-transition-${direction} router-transition`;

    let newNavEls;
    let oldNavEls;

    let fromLarge;
    let toLarge;

    let oldIsLarge;
    let newIsLarge;

    if (ios && dynamicNavbar) {
      oldIsLarge = oldNavbarInner && oldNavbarInner.hasClass('navbar-inner-large');
      newIsLarge = newNavbarInner && newNavbarInner.hasClass('navbar-inner-large');
      fromLarge = oldIsLarge && !oldNavbarInner.hasClass('navbar-inner-large-collapsed');
      toLarge = newIsLarge && !newNavbarInner.hasClass('navbar-inner-large-collapsed');
      const navEls = router.animatableNavElements(newNavbarInner, oldNavbarInner, toLarge, fromLarge, direction);
      newNavEls = navEls.newNavEls;
      oldNavEls = navEls.oldNavEls;
    }

    function animateNavbars(progress) {
      if (!(ios && dynamicNavbar)) return;
      if (progress === 1) {
        if (toLarge) {
          newNavbarInner.addClass('router-navbar-transition-to-large');
          oldNavbarInner.addClass('router-navbar-transition-to-large');
        }
        if (fromLarge) {
          newNavbarInner.addClass('router-navbar-transition-from-large');
          oldNavbarInner.addClass('router-navbar-transition-from-large');
        }
      }
      newNavEls.forEach((navEl) => {
        const $el = navEl.$el;
        const offset = direction === 'forward' ? navEl.rightOffset : navEl.leftOffset;
        if (navEl.isSliding) {
          if (navEl.isSubnavbar && newIsLarge) {
            $el[0].style.setProperty('transform', `translate3d(${offset * (1 - progress)}px, calc(-1 * var(--f7-navbar-large-collapse-progress) * var(--f7-navbar-large-title-height)), 0)`, 'important');
          } else {
            $el.transform(`translate3d(${offset * (1 - progress)}px,0,0)`);
          }
        }
      });
      oldNavEls.forEach((navEl) => {
        const $el = navEl.$el;
        const offset = direction === 'forward' ? navEl.leftOffset : navEl.rightOffset;
        if (navEl.isSliding) {
          if (navEl.isSubnavbar && oldIsLarge) {
            $el.transform(`translate3d(${offset * (progress)}px, calc(-1 * var(--f7-navbar-large-collapse-progress) * var(--f7-navbar-large-title-height)), 0)`);
          } else {
            $el.transform(`translate3d(${offset * (progress)}px,0,0)`);
          }
        }
      });
    }

    // AnimationEnd Callback
    function onDone() {
      if (router.dynamicNavbar) {
        if (newNavbarInner) {
          newNavbarInner.removeClass('router-navbar-transition-to-large router-navbar-transition-from-large');
          newNavbarInner.addClass('navbar-no-title-large-transition');
          Utils.nextFrame(() => {
            newNavbarInner.removeClass('navbar-no-title-large-transition');
          });
        }
        if (oldNavbarInner) {
          oldNavbarInner.removeClass('router-navbar-transition-to-large router-navbar-transition-from-large');
        }
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

    (direction === 'forward' ? newPage : oldPage).animationEnd(() => {
      onDone();
    });

    // Animate
    if (dynamicNavbar) {
      // Prepare Navbars
      animateNavbars(0);
      Utils.nextFrame(() => {
        // Add class, start animation
        animateNavbars(1);
        router.$el.addClass(routerTransitionClass);
      });
    } else {
      // Add class, start animation
      router.$el.addClass(routerTransitionClass);
    }
  }

  removeModal(modalEl) {
    const router = this;
    router.removeEl(modalEl);
  }
  // eslint-disable-next-line
  removeTabContent(tabEl) {
    const $tabEl = $(tabEl);
    $tabEl.html('');
  }

  removeNavbar(el) {
    const router = this;
    router.removeEl(el);
  }

  removePage(el) {
    const $el = $(el);
    const f7Page = $el && $el[0] && $el[0].f7Page;
    const router = this;
    if (f7Page && f7Page.route && f7Page.route.route && f7Page.route.route.keepAlive) {
      $el.remove();
      return;
    }
    router.removeEl(el);
  }

  removeEl(el) {
    if (!el) return;
    const router = this;
    const $el = $(el);
    if ($el.length === 0) return;
    $el.find('.tab').each((tabIndex, tabEl) => {
      $(tabEl).children().each((index, tabChild) => {
        if (tabChild.f7Component) {
          $(tabChild).trigger('tab:beforeremove');
          tabChild.f7Component.$destroy();
        }
      });
    });
    if ($el[0].f7Component && $el[0].f7Component.$destroy) {
      $el[0].f7Component.$destroy();
    }
    if (!router.params.removeElements) {
      return;
    }
    if (router.params.removeElementsWithTimeout) {
      setTimeout(() => {
        $el.remove();
      }, router.params.removeElementsTimeout);
    } else {
      $el.remove();
    }
  }

  getPageEl(content) {
    const router = this;
    if (typeof content === 'string') {
      router.tempDom.innerHTML = content;
    } else {
      if ($(content).hasClass('page')) {
        return content;
      }
      router.tempDom.innerHTML = '';
      $(router.tempDom).append(content);
    }

    return router.findElement('.page', router.tempDom);
  }

  findElement(stringSelector, container, notStacked) {
    const router = this;
    const view = router.view;
    const app = router.app;

    // Modals Selector
    const modalsSelector = '.popup, .dialog, .popover, .actions-modal, .sheet-modal, .login-screen, .page';

    const $container = $(container);
    let selector = stringSelector;
    if (notStacked) selector += ':not(.stacked)';

    let found = $container
      .find(selector)
      .filter((index, el) => $(el).parents(modalsSelector).length === 0);

    if (found.length > 1) {
      if (typeof view.selector === 'string') {
        // Search in related view
        found = $container.find(`${view.selector} ${selector}`);
      }
      if (found.length > 1) {
        // Search in main view
        found = $container.find(`.${app.params.viewMainClass} ${selector}`);
      }
    }
    if (found.length === 1) return found;

    // Try to find not stacked
    if (!notStacked) found = router.findElement(selector, $container, true);
    if (found && found.length === 1) return found;
    if (found && found.length > 1) return $(found[0]);
    return undefined;
  }

  flattenRoutes(routes = this.routes) {
    const router = this;
    let flattenedRoutes = [];
    routes.forEach((route) => {
      let hasTabRoutes = false;
      if ('tabs' in route && route.tabs) {
        const mergedPathsRoutes = route.tabs.map((tabRoute) => {
          const tRoute = Utils.extend({}, route, {
            path: (`${route.path}/${tabRoute.path}`).replace('///', '/').replace('//', '/'),
            parentPath: route.path,
            tab: tabRoute,
          });
          delete tRoute.tabs;
          delete tRoute.routes;
          return tRoute;
        });
        hasTabRoutes = true;
        flattenedRoutes = flattenedRoutes.concat(router.flattenRoutes(mergedPathsRoutes));
      }
      if ('detailRoutes' in route) {
        const mergedPathsRoutes = route.detailRoutes.map((detailRoute) => {
          const dRoute = Utils.extend({}, detailRoute);
          dRoute.masterRoute = route;
          dRoute.masterRoutePath = route.path;
          return dRoute;
        });
        flattenedRoutes = flattenedRoutes.concat(route, router.flattenRoutes(mergedPathsRoutes));
      }
      if ('routes' in route) {
        const mergedPathsRoutes = route.routes.map((childRoute) => {
          const cRoute = Utils.extend({}, childRoute);
          cRoute.path = (`${route.path}/${cRoute.path}`).replace('///', '/').replace('//', '/');
          return cRoute;
        });
        if (hasTabRoutes) {
          flattenedRoutes = flattenedRoutes.concat(router.flattenRoutes(mergedPathsRoutes));
        } else {
          flattenedRoutes = flattenedRoutes.concat(route, router.flattenRoutes(mergedPathsRoutes));
        }
      }
      if (!('routes' in route) && !('tabs' in route && route.tabs) && !('detailRoutes' in route)) {
        flattenedRoutes.push(route);
      }
    });
    return flattenedRoutes;
  }

  // eslint-disable-next-line
  parseRouteUrl(url) {
    if (!url) return {};
    const query = Utils.parseUrlQuery(url);
    const hash = url.split('#')[1];
    const params = {};
    const path = url.split('#')[0].split('?')[0];
    return {
      query,
      hash,
      params,
      url,
      path,
    };
  }

  // eslint-disable-next-line
  constructRouteUrl(route, { params, query } = {}) {
    const { path } = route;
    const toUrl = PathToRegexp.compile(path);
    let url;
    try {
      url = toUrl(params || {});
    } catch (error) {
      throw new Error(`Framework7: error constructing route URL from passed params:\nRoute: ${path}\n${error.toString()}`);
    }

    if (query) {
      if (typeof query === 'string') url += `?${query}`;
      else url += `?${Utils.serializeObject(query)}`;
    }

    return url;
  }

  findTabRoute(tabEl) {
    const router = this;
    const $tabEl = $(tabEl);
    const parentPath = router.currentRoute.route.parentPath;
    const tabId = $tabEl.attr('id');
    const flattenedRoutes = router.flattenRoutes(router.routes);
    let foundTabRoute;
    flattenedRoutes.forEach((route) => {
      if (
        route.parentPath === parentPath
        && route.tab
        && route.tab.id === tabId
      ) {
        foundTabRoute = route;
      }
    });
    return foundTabRoute;
  }

  findRouteByKey(key, value) {
    const router = this;
    const routes = router.routes;
    const flattenedRoutes = router.flattenRoutes(routes);
    let matchingRoute;

    flattenedRoutes.forEach((route) => {
      if (matchingRoute) return;
      if (route[key] === value) {
        matchingRoute = route;
      }
    });
    return matchingRoute;
  }

  findMatchingRoute(url) {
    if (!url) return undefined;
    const router = this;
    const routes = router.routes;
    const flattenedRoutes = router.flattenRoutes(routes);
    const { path, query, hash, params } = router.parseRouteUrl(url);
    let matchingRoute;
    flattenedRoutes.forEach((route) => {
      if (matchingRoute) return;
      const keys = [];

      const pathsToMatch = [route.path];
      if (route.alias) {
        if (typeof route.alias === 'string') pathsToMatch.push(route.alias);
        else if (Array.isArray(route.alias)) {
          route.alias.forEach((aliasPath) => {
            pathsToMatch.push(aliasPath);
          });
        }
      }

      let matched;
      pathsToMatch.forEach((pathToMatch) => {
        if (matched) return;
        matched = PathToRegexp(pathToMatch, keys).exec(path);
      });

      if (matched) {
        keys.forEach((keyObj, index) => {
          if (typeof keyObj.name === 'number') return;
          const paramValue = matched[index + 1];
          if (typeof paramValue === 'undefined' || paramValue === null) {
            params[keyObj.name] = paramValue;
          } else {
            params[keyObj.name] = decodeURIComponent(paramValue);
          }
        });

        let parentPath;
        if (route.parentPath) {
          parentPath = path.split('/').slice(0, route.parentPath.split('/').length - 1).join('/');
        }

        matchingRoute = {
          query,
          hash,
          params,
          url,
          path,
          parentPath,
          route,
          name: route.name,
        };
      }
    });
    return matchingRoute;
  }

  // eslint-disable-next-line
  replaceRequestUrlParams(url = '', options = {}) {
    let compiledUrl = url;
    if (typeof compiledUrl === 'string'
      && compiledUrl.indexOf('{{') >= 0
      && options
      && options.route
      && options.route.params
      && Object.keys(options.route.params).length
    ) {
      Object.keys(options.route.params).forEach((paramName) => {
        const regExp = new RegExp(`{{${paramName}}}`, 'g');
        compiledUrl = compiledUrl.replace(regExp, options.route.params[paramName] || '');
      });
    }
    return compiledUrl;
  }

  removeFromXhrCache(url) {
    const router = this;
    const xhrCache = router.cache.xhr;
    let index = false;
    for (let i = 0; i < xhrCache.length; i += 1) {
      if (xhrCache[i].url === url) index = i;
    }
    if (index !== false) xhrCache.splice(index, 1);
  }

  xhrRequest(requestUrl, options) {
    const router = this;
    const params = router.params;
    const { ignoreCache } = options;
    let url = requestUrl;

    let hasQuery = url.indexOf('?') >= 0;
    if (params.passRouteQueryToRequest
      && options
      && options.route
      && options.route.query
      && Object.keys(options.route.query).length
    ) {
      url += `${hasQuery ? '&' : '?'}${Utils.serializeObject(options.route.query)}`;
      hasQuery = true;
    }

    if (params.passRouteParamsToRequest
      && options
      && options.route
      && options.route.params
      && Object.keys(options.route.params).length
    ) {
      url += `${hasQuery ? '&' : '?'}${Utils.serializeObject(options.route.params)}`;
      hasQuery = true;
    }

    if (url.indexOf('{{') >= 0) {
      url = router.replaceRequestUrlParams(url, options);
    }
    // should we ignore get params or not
    if (params.xhrCacheIgnoreGetParameters && url.indexOf('?') >= 0) {
      url = url.split('?')[0];
    }
    return new Promise((resolve, reject) => {
      if (params.xhrCache && !ignoreCache && url.indexOf('nocache') < 0 && params.xhrCacheIgnore.indexOf(url) < 0) {
        for (let i = 0; i < router.cache.xhr.length; i += 1) {
          const cachedUrl = router.cache.xhr[i];
          if (cachedUrl.url === url) {
            // Check expiration
            if (Utils.now() - cachedUrl.time < params.xhrCacheDuration) {
              // Load from cache
              resolve(cachedUrl.content);
              return;
            }
          }
        }
      }
      router.xhr = router.app.request({
        url,
        method: 'GET',
        beforeSend(xhr) {
          router.emit('routerAjaxStart', xhr, options);
        },
        complete(xhr, status) {
          router.emit('routerAjaxComplete', xhr);
          if ((status !== 'error' && status !== 'timeout' && (xhr.status >= 200 && xhr.status < 300)) || xhr.status === 0) {
            if (params.xhrCache && xhr.responseText !== '') {
              router.removeFromXhrCache(url);
              router.cache.xhr.push({
                url,
                time: Utils.now(),
                content: xhr.responseText,
              });
            }
            router.emit('routerAjaxSuccess', xhr, options);
            resolve(xhr.responseText);
          } else {
            router.emit('routerAjaxError', xhr, options);
            reject(xhr);
          }
        },
        error(xhr) {
          router.emit('routerAjaxError', xhr, options);
          reject(xhr);
        },
      });
    });
  }

  // Remove theme elements
  removeThemeElements(el) {
    const router = this;
    const theme = router.app.theme;
    let toRemove;
    if (theme === 'ios') {
      toRemove = '.md-only, .aurora-only, .if-md, .if-aurora, .if-not-ios, .not-ios';
    } else if (theme === 'md') {
      toRemove = '.ios-only, .aurora-only, .if-ios, .if-aurora, .if-not-md, .not-md';
    } else if (theme === 'aurora') {
      toRemove = '.ios-only, .md-only, .if-ios, .if-md, .if-not-aurora, .not-aurora';
    }
    $(el).find(toRemove).remove();
  }

  getPageData(pageEl, navbarEl, from, to, route = {}, pageFromEl) {
    const router = this;
    const $pageEl = $(pageEl).eq(0);
    const $navbarEl = $(navbarEl).eq(0);
    const currentPage = $pageEl[0].f7Page || {};
    let direction;
    let pageFrom;
    if ((from === 'next' && to === 'current') || (from === 'current' && to === 'previous')) direction = 'forward';
    if ((from === 'current' && to === 'next') || (from === 'previous' && to === 'current')) direction = 'backward';
    if (currentPage && !currentPage.fromPage) {
      const $pageFromEl = $(pageFromEl);
      if ($pageFromEl.length) {
        pageFrom = $pageFromEl[0].f7Page;
      }
    }
    pageFrom = currentPage.pageFrom || pageFrom;
    if (pageFrom && pageFrom.pageFrom) {
      pageFrom.pageFrom = null;
    }
    const page = {
      app: router.app,
      view: router.view,
      router,
      $el: $pageEl,
      el: $pageEl[0],
      $pageEl,
      pageEl: $pageEl[0],
      $navbarEl,
      navbarEl: $navbarEl[0],
      name: $pageEl.attr('data-name'),
      position: from,
      from,
      to,
      direction,
      route: currentPage.route ? currentPage.route : route,
      pageFrom,
    };

    $pageEl[0].f7Page = page;
    return page;
  }

  // Callbacks
  pageCallback(callback, pageEl, navbarEl, from, to, options = {}, pageFromEl) {
    if (!pageEl) return;
    const router = this;
    const $pageEl = $(pageEl);
    if (!$pageEl.length) return;
    const $navbarEl = $(navbarEl);
    const { route } = options;
    const restoreScrollTopOnBack = router.params.restoreScrollTopOnBack
      && !(
        router.params.masterDetailBreakpoint > 0
        && $pageEl.hasClass('page-master')
        && router.app.width >= router.params.masterDetailBreakpoint
      );
    const keepAlive = $pageEl[0].f7Page && $pageEl[0].f7Page.route && $pageEl[0].f7Page.route.route && $pageEl[0].f7Page.route.route.keepAlive;

    if (callback === 'beforeRemove' && keepAlive) {
      callback = 'beforeUnmount'; // eslint-disable-line
    }

    const camelName = `page${callback[0].toUpperCase() + callback.slice(1, callback.length)}`;
    const colonName = `page:${callback.toLowerCase()}`;

    let page = {};
    if (callback === 'beforeRemove' && $pageEl[0].f7Page) {
      page = Utils.extend($pageEl[0].f7Page, { from, to, position: from });
    } else {
      page = router.getPageData($pageEl[0], $navbarEl[0], from, to, route, pageFromEl);
    }
    page.swipeBack = !!options.swipeBack;

    const { on = {}, once = {} } = options.route ? options.route.route : {};
    if (options.on) {
      Utils.extend(on, options.on);
    }
    if (options.once) {
      Utils.extend(once, options.once);
    }

    function attachEvents() {
      if ($pageEl[0].f7RouteEventsAttached) return;
      $pageEl[0].f7RouteEventsAttached = true;
      if (on && Object.keys(on).length > 0) {
        $pageEl[0].f7RouteEventsOn = on;
        Object.keys(on).forEach((eventName) => {
          on[eventName] = on[eventName].bind(router);
          $pageEl.on(Utils.eventNameToColonCase(eventName), on[eventName]);
        });
      }
      if (once && Object.keys(once).length > 0) {
        $pageEl[0].f7RouteEventsOnce = once;
        Object.keys(once).forEach((eventName) => {
          once[eventName] = once[eventName].bind(router);
          $pageEl.once(Utils.eventNameToColonCase(eventName), once[eventName]);
        });
      }
    }

    function detachEvents() {
      if (!$pageEl[0].f7RouteEventsAttached) return;
      if ($pageEl[0].f7RouteEventsOn) {
        Object.keys($pageEl[0].f7RouteEventsOn).forEach((eventName) => {
          $pageEl.off(Utils.eventNameToColonCase(eventName), $pageEl[0].f7RouteEventsOn[eventName]);
        });
      }
      if ($pageEl[0].f7RouteEventsOnce) {
        Object.keys($pageEl[0].f7RouteEventsOnce).forEach((eventName) => {
          $pageEl.off(Utils.eventNameToColonCase(eventName), $pageEl[0].f7RouteEventsOnce[eventName]);
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
        let $pageContent = $pageEl.find('.page-content');
        if ($pageContent.length > 0) {
          // eslint-disable-next-line
          $pageContent = $pageContent.filter((pageContentIndex, pageContentEl) => {
            return (
              $(pageContentEl).parents('.tab:not(.tab-active)').length === 0
              && !$(pageContentEl).is('.tab:not(.tab-active)')
            );
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
      let $pageContent = $pageEl.find('.page-content');
      if ($pageContent.length > 0) {
        // eslint-disable-next-line
        $pageContent = $pageContent.filter((pageContentIndex, pageContentEl) => {
          return (
            $(pageContentEl).parents('.tab:not(.tab-active)').length === 0
            && !$(pageContentEl).is('.tab:not(.tab-active)')
          );
        });
      }
      router.scrollHistory[page.route.url] = $pageContent.scrollTop();
    }
    if (restoreScrollTopOnBack && callback === 'beforeOut' && from === 'current' && to === 'next') {
      // Delete scroll position
      delete router.scrollHistory[page.route.url];
    }

    $pageEl.trigger(colonName, page);
    router.emit(camelName, page);

    if (callback === 'beforeRemove' || callback === 'beforeUnmount') {
      detachEvents();
      if (!keepAlive) {
        if ($pageEl[0].f7Page && $pageEl[0].f7Page.navbarEl) {
          delete $pageEl[0].f7Page.navbarEl.f7Page;
        }
        $pageEl[0].f7Page = null;
      }
    }
  }

  saveHistory() {
    const router = this;
    router.view.history = router.history;
    if (router.params.pushState) {
      window.localStorage[`f7router-${router.view.id}-history`] = JSON.stringify(router.history);
    }
  }

  restoreHistory() {
    const router = this;
    if (router.params.pushState && window.localStorage[`f7router-${router.view.id}-history`]) {
      router.history = JSON.parse(window.localStorage[`f7router-${router.view.id}-history`]);
      router.view.history = router.history;
    }
  }

  clearHistory() {
    const router = this;
    router.history = [];
    if (router.view) router.view.history = [];
    router.saveHistory();
  }

  updateCurrentUrl(newUrl) {
    const router = this;
    appRouterCheck(router, 'updateCurrentUrl');
    // Update history
    if (router.history.length) {
      router.history[router.history.length - 1] = newUrl;
    } else {
      router.history.push(newUrl);
    }

    // Update current route params
    const { query, hash, params, url, path } = router.parseRouteUrl(newUrl);
    if (router.currentRoute) {
      Utils.extend(router.currentRoute, {
        query,
        hash,
        params,
        url,
        path,
      });
    }

    if (router.params.pushState) {
      const pushStateRoot = router.params.pushStateRoot || '';
      History.replace(
        router.view.id,
        {
          url: newUrl,
        },
        pushStateRoot + router.params.pushStateSeparator + newUrl
      );
    }

    // Save History
    router.saveHistory();

    router.emit('routeUrlUpdate', router.currentRoute, router);
  }

  init() {
    const router = this;
    const { app, view } = router;

    // Init Swipeback
    if (process.env.TARGET !== 'desktop') {
      if (
        (view && router.params.iosSwipeBack && app.theme === 'ios')
        || (view && router.params.mdSwipeBack && app.theme === 'md')
        || (view && router.params.auroraSwipeBack && app.theme === 'aurora')
      ) {
        SwipeBack(router);
      }
    }

    // Dynamic not separated navbbar
    if (router.dynamicNavbar && !router.separateNavbar) {
      router.$el.addClass('router-dynamic-navbar-inside');
    }

    let initUrl = router.params.url;
    let documentUrl = document.location.href.split(document.location.origin)[1];
    let historyRestored;
    const { pushState, pushStateOnLoad, pushStateSeparator, pushStateAnimateOnLoad } = router.params;
    let { pushStateRoot } = router.params;
    if (window.cordova && pushState && !pushStateSeparator && !pushStateRoot && document.location.pathname.indexOf('index.html')) {
      // eslint-disable-next-line
      console.warn('Framework7: wrong or not complete pushState configuration, trying to guess pushStateRoot');
      pushStateRoot = document.location.pathname.split('index.html')[0];
    }
    if (!pushState || !pushStateOnLoad) {
      if (!initUrl) {
        initUrl = documentUrl;
      }
      if (document.location.search && initUrl.indexOf('?') < 0) {
        initUrl += document.location.search;
      }
      if (document.location.hash && initUrl.indexOf('#') < 0) {
        initUrl += document.location.hash;
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
      } else if (History.state && History.state[view.id] && History.state[view.id].url === router.history[router.history.length - 1]) {
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
    let currentRoute;
    if (router.history.length > 1) {
      // Will load page
      currentRoute = router.findMatchingRoute(router.history[0]);
      if (!currentRoute) {
        currentRoute = Utils.extend(router.parseRouteUrl(router.history[0]), {
          route: {
            url: router.history[0],
            path: router.history[0].split('?')[0],
          },
        });
      }
    } else {
      // Don't load page
      currentRoute = router.findMatchingRoute(initUrl);
      if (!currentRoute) {
        currentRoute = Utils.extend(router.parseRouteUrl(initUrl), {
          route: {
            url: initUrl,
            path: initUrl.split('?')[0],
          },
        });
      }
    }

    if (router.params.stackPages) {
      router.$el.children('.page').each((index, pageEl) => {
        const $pageEl = $(pageEl);
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
        pushState: false,
      });
    } else {
      // Init current DOM page
      let hasTabRoute;
      router.currentRoute = currentRoute;
      router.$el.children('.page:not(.stacked)').each((index, pageEl) => {
        const $pageEl = $(pageEl);
        let $navbarInnerEl;
        $pageEl.addClass('page-current');
        if (router.separateNavbar) {
          $navbarInnerEl = $pageEl.children('.navbar').children('.navbar-inner');
          if ($navbarInnerEl.length > 0) {
            if (!router.$navbarEl.parents(document).length) {
              router.$el.prepend(router.$navbarEl);
            }
            $navbarInnerEl.addClass('navbar-current');
            router.$navbarEl.append($navbarInnerEl);
            if ($navbarInnerEl.children('.title-large').length) {
              $navbarInnerEl.addClass('navbar-inner-large');
            }
            $pageEl.children('.navbar').remove();
          } else {
            router.$navbarEl.addClass('navbar-hidden');
            if ($navbarInnerEl.children('.title-large').length) {
              router.$navbarEl.addClass('navbar-hidden navbar-large-hidden');
            }
          }
        }
        if (router.currentRoute && router.currentRoute.route && router.currentRoute.route.master && router.params.masterDetailBreakpoint > 0) {
          $pageEl.addClass('page-master');
          $pageEl.trigger('page:role', { role: 'master' });
          if ($navbarInnerEl && $navbarInnerEl.length) {
            $navbarInnerEl.addClass('navbar-master');
          }
        }
        const initOptions = {
          route: router.currentRoute,
        };
        if (router.currentRoute && router.currentRoute.route && router.currentRoute.route.options) {
          Utils.extend(initOptions, router.currentRoute.route.options);
        }
        router.currentPageEl = $pageEl[0];
        if (router.separateNavbar && $navbarInnerEl.length) {
          router.currentNavbarEl = $navbarInnerEl[0];
        }
        router.removeThemeElements($pageEl);
        if (router.separateNavbar && $navbarInnerEl.length) {
          router.removeThemeElements($navbarInnerEl);
        }
        if (initOptions.route.route.tab) {
          hasTabRoute = true;
          router.tabLoad(initOptions.route.route.tab, Utils.extend({}, initOptions));
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
            pageAfterIn() {
              const preloadPreviousPage = router.params.preloadPreviousPage || router.params[`${app.theme}SwipeBack`];
              if (preloadPreviousPage && router.history.length > 2) {
                router.back({ preload: true });
              }
            },
          },
        });
      }
      if (!historyRestored && !hasTabRoute) {
        router.history.push(initUrl);
        router.saveHistory();
      }
    }
    if (initUrl && pushState && pushStateOnLoad && (!History.state || !History.state[view.id])) {
      History.initViewState(view.id, {
        url: initUrl,
      });
    }
    router.emit('local::init routerInit', router);
  }

  destroy() {
    let router = this;

    router.emit('local::destroy routerDestroy', router);

    // Delete props & methods
    Object.keys(router).forEach((routerProp) => {
      router[routerProp] = null;
      delete router[routerProp];
    });

    router = null;
  }
}

// Load
Router.prototype.forward = forward;
Router.prototype.load = load;
Router.prototype.navigate = navigate;
Router.prototype.refreshPage = refreshPage;
// Tab
Router.prototype.tabLoad = tabLoad;
Router.prototype.tabRemove = tabRemove;
// Modal
Router.prototype.modalLoad = modalLoad;
Router.prototype.modalRemove = modalRemove;
// Back
Router.prototype.backward = backward;
Router.prototype.loadBack = loadBack;
Router.prototype.back = back;
// Clear previoius pages from the DOM
Router.prototype.clearPreviousPages = clearPreviousPages;
// Clear history
Router.prototype.clearPreviousHistory = clearPreviousHistory;


export default Router;
