import { getWindow, getDocument } from 'ssr-window';
import { pathToRegexp, compile } from 'path-to-regexp';
import $ from '../../shared/dom7.js';
import Framework7Class from '../../shared/class.js';
import {
  extend,
  nextFrame,
  parseUrlQuery,
  serializeObject,
  now,
  eventNameToColonCase,
} from '../../shared/utils.js';
import History from '../../shared/history.js';
import SwipeBack from './swipe-back.js';

import { refreshPage, navigate } from './navigate.js';
import { tabLoad, tabRemove } from './tab.js';
import { modalLoad, modalRemove } from './modal.js';
import { back } from './back.js';
import { clearPreviousHistory } from './clear-previous-history.js';
import appRouterCheck from './app-router-check.js';

class Router extends Framework7Class {
  constructor(app, view) {
    super({}, [typeof view === 'undefined' ? app : view]);
    const router = this;

    // Is App Router
    router.isAppRouter = typeof view === 'undefined';

    if (router.isAppRouter) {
      // App Router
      extend(false, router, {
        app,
        params: app.params.view,
        routes: app.routes || [],
        cache: app.cache,
      });
    } else {
      // View Router
      extend(false, router, {
        app,
        view,
        viewId: view.id,
        id: view.params.routerId,
        params: view.params,
        routes: view.routes,
        history: view.history,
        propsHistory: [],
        scrollHistory: view.scrollHistory,
        cache: app.cache,
        dynamicNavbar: app.theme === 'ios' && view.params.iosDynamicNavbar,
        initialPages: [],
        initialNavbars: [],
      });
    }

    // Install Modules
    router.useModules();

    // AllowPageChage
    router.allowPageChange = true;

    // Current Route
    let currentRoute = {};
    let previousRoute = {};
    Object.defineProperty(router, 'currentRoute', {
      enumerable: true,
      configurable: true,
      set(newRoute = {}) {
        previousRoute = extend({}, currentRoute);
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

  mount() {
    const router = this;
    const view = router.view;
    const document = getDocument();

    extend(false, router, {
      tempDom: document.createElement('div'),
      $el: view.$el,
      el: view.el,
      $navbarsEl: view.$navbarsEl,
      navbarsEl: view.navbarsEl,
    });

    router.emit('local::mount routerMount', router);
  }

  animatableNavElements($newNavbarEl, $oldNavbarEl, toLarge, fromLarge, direction) {
    const router = this;
    const dynamicNavbar = router.dynamicNavbar;
    const animateIcon = router.params.iosAnimateNavbarBackIcon;

    let newNavEls;
    let oldNavEls;
    function animatableNavEl($el, $navbarInner) {
      const isSliding = $el.hasClass('sliding') || $navbarInner.hasClass('sliding');
      const isSubnavbar = $el.hasClass('subnavbar');
      const needsOpacityTransition = isSliding ? !isSubnavbar : true;
      const $iconEl = $el.find('.back .icon');
      let isIconLabel;
      if (
        isSliding &&
        animateIcon &&
        $el.hasClass('left') &&
        $iconEl.length > 0 &&
        $iconEl.next('span').length
      ) {
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
      $newNavbarEl
        .children('.navbar-inner')
        .children('.left, .right, .title, .subnavbar')
        .each((navEl) => {
          const $navEl = $(navEl);
          if ($navEl.hasClass('left') && fromLarge && direction === 'forward') return;
          if ($navEl.hasClass('title') && toLarge) return;
          newNavEls.push(animatableNavEl($navEl, $newNavbarEl.children('.navbar-inner')));
        });
      if (
        !(
          $oldNavbarEl.hasClass('navbar-master') &&
          router.params.masterDetailBreakpoint > 0 &&
          router.app.width >= router.params.masterDetailBreakpoint
        )
      ) {
        $oldNavbarEl
          .children('.navbar-inner')
          .children('.left, .right, .title, .subnavbar')
          .each((navEl) => {
            const $navEl = $(navEl);
            if ($navEl.hasClass('left') && toLarge && !fromLarge && direction === 'forward') return;
            if ($navEl.hasClass('left') && toLarge && direction === 'backward') return;
            if ($navEl.hasClass('title') && fromLarge) {
              return;
            }
            oldNavEls.push(animatableNavEl($navEl, $oldNavbarEl.children('.navbar-inner')));
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
              n.leftOffset += iconTextEl ? iconTextEl.offsetLeft || 0 : 0;
            }
          });
        });
      });
    }

    return { newNavEls, oldNavEls };
  }

  animate($oldPageEl, $newPageEl, $oldNavbarEl, $newNavbarEl, direction, transition, callback) {
    const router = this;
    if (router.params.animateCustom) {
      router.params.animateCustom.apply(router, [
        $oldPageEl,
        $newPageEl,
        $oldNavbarEl,
        $newNavbarEl,
        direction,
        callback,
      ]);
      return;
    }
    const dynamicNavbar = router.dynamicNavbar;
    const ios = router.app.theme === 'ios';
    if (transition) {
      const routerCustomTransitionClass = `router-transition-custom router-transition-${transition}-${direction}`;
      // Animate
      const onCustomTransitionDone = () => {
        router.$el.removeClass(routerCustomTransitionClass);
        if (dynamicNavbar && router.$navbarsEl.length) {
          if ($newNavbarEl) {
            router.$navbarsEl.prepend($newNavbarEl);
          }
          if ($oldNavbarEl) {
            router.$navbarsEl.prepend($oldNavbarEl);
          }
        }
        if (callback) callback();
      };

      (direction === 'forward' ? $newPageEl : $oldPageEl).animationEnd(onCustomTransitionDone);
      if (dynamicNavbar) {
        if ($newNavbarEl && $newPageEl) {
          router.setNavbarPosition($newNavbarEl, '');
          $newNavbarEl.removeClass('navbar-next navbar-previous navbar-current');
          $newPageEl.prepend($newNavbarEl);
        }
        if ($oldNavbarEl && $oldPageEl) {
          router.setNavbarPosition($oldNavbarEl, '');
          $oldNavbarEl.removeClass('navbar-next navbar-previous navbar-current');
          $oldPageEl.prepend($oldNavbarEl);
        }
      }

      router.$el.addClass(routerCustomTransitionClass);
      return;
    }

    // Router Animation class
    const routerTransitionClass = `router-transition-${direction} router-transition`;

    let newNavEls;
    let oldNavEls;

    let fromLarge;
    let toLarge;
    let toDifferent;

    let oldIsLarge;
    let newIsLarge;

    if (ios && dynamicNavbar) {
      const betweenMasterAndDetail =
        router.params.masterDetailBreakpoint > 0 &&
        router.app.width >= router.params.masterDetailBreakpoint &&
        (($oldNavbarEl.hasClass('navbar-master') &&
          $newNavbarEl.hasClass('navbar-master-detail')) ||
          ($oldNavbarEl.hasClass('navbar-master-detail') &&
            $newNavbarEl.hasClass('navbar-master')));
      if (!betweenMasterAndDetail) {
        oldIsLarge = $oldNavbarEl && $oldNavbarEl.hasClass('navbar-large');
        newIsLarge = $newNavbarEl && $newNavbarEl.hasClass('navbar-large');
        fromLarge = oldIsLarge && !$oldNavbarEl.hasClass('navbar-large-collapsed');
        toLarge = newIsLarge && !$newNavbarEl.hasClass('navbar-large-collapsed');
        toDifferent = (fromLarge && !toLarge) || (toLarge && !fromLarge);
      }
      const navEls = router.animatableNavElements(
        $newNavbarEl,
        $oldNavbarEl,
        toLarge,
        fromLarge,
        direction,
      );
      newNavEls = navEls.newNavEls;
      oldNavEls = navEls.oldNavEls;
    }

    function animateNavbars(progress) {
      if (!(ios && dynamicNavbar)) return;
      if (progress === 1) {
        if (toLarge) {
          $newNavbarEl.addClass('router-navbar-transition-to-large');
          $oldNavbarEl.addClass('router-navbar-transition-to-large');
        }
        if (fromLarge) {
          $newNavbarEl.addClass('router-navbar-transition-from-large');
          $oldNavbarEl.addClass('router-navbar-transition-from-large');
        }
      }
      newNavEls.forEach((navEl) => {
        const $el = navEl.$el;
        const offset = direction === 'forward' ? navEl.rightOffset : navEl.leftOffset;
        if (navEl.isSliding) {
          if (navEl.isSubnavbar && newIsLarge) {
            // prettier-ignore
            $el[0].style.setProperty(
              'transform',
              `translate3d(${offset * (1 - progress)}px, calc(-1 * var(--f7-navbar-large-collapse-progress) * var(--f7-navbar-large-title-height)), 0)`,
              'important',
            );
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
            $el.transform(
              `translate3d(${
                offset * progress
              }px, calc(-1 * var(--f7-navbar-large-collapse-progress) * var(--f7-navbar-large-title-height)), 0)`,
            );
          } else {
            $el.transform(`translate3d(${offset * progress}px,0,0)`);
          }
        }
      });
    }

    // AnimationEnd Callback
    function onDone() {
      if (router.dynamicNavbar) {
        if ($newNavbarEl) {
          $newNavbarEl.removeClass(
            'router-navbar-transition-to-large router-navbar-transition-from-large',
          );
          $newNavbarEl.addClass('navbar-no-title-large-transition');
          nextFrame(() => {
            $newNavbarEl.removeClass('navbar-no-title-large-transition');
          });
        }
        if ($oldNavbarEl) {
          $oldNavbarEl.removeClass(
            'router-navbar-transition-to-large router-navbar-transition-from-large',
          );
        }
        if (
          $newNavbarEl.hasClass('sliding') ||
          $newNavbarEl.children('.navbar-inner.sliding').length
        ) {
          $newNavbarEl.find('.title, .left, .right, .left .icon, .subnavbar').transform('');
        } else {
          $newNavbarEl.find('.sliding').transform('');
        }
        if (
          $oldNavbarEl.hasClass('sliding') ||
          $oldNavbarEl.children('.navbar-inner.sliding').length
        ) {
          $oldNavbarEl.find('.title, .left, .right, .left .icon, .subnavbar').transform('');
        } else {
          $oldNavbarEl.find('.sliding').transform('');
        }
      }
      router.$el.removeClass(routerTransitionClass);
      if (callback) callback();
    }

    // eslint-disable-next-line
    (direction === 'forward' ? $newPageEl : ios ? $oldPageEl : $newPageEl).animationEnd(() => {
      onDone();
    });

    // Animate
    if (dynamicNavbar) {
      // Prepare Navbars
      animateNavbars(0);
      nextFrame(() => {
        // Add class, start animation
        router.$el.addClass(routerTransitionClass);
        if (toDifferent) {
          // eslint-disable-next-line
          router.el._clientLeft = router.el.clientLeft;
        }
        animateNavbars(1);
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
    $el.find('.tab').each((tabEl) => {
      $(tabEl)
        .children()
        .each((tabChild) => {
          if (tabChild.f7Component) {
            $(tabChild).trigger('tab:beforeremove');
            tabChild.f7Component.destroy();
          }
        });
    });
    if ($el[0].f7Component && $el[0].f7Component.destroy) {
      $el[0].f7Component.destroy();
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

  findElement(stringSelector, container) {
    const router = this;
    const view = router.view;
    const app = router.app;

    // Modals Selector
    const modalsSelector =
      '.popup, .dialog, .popover, .actions-modal, .sheet-modal, .login-screen, .page';

    const $container = $(container);
    const selector = stringSelector;

    let found = $container
      .find(selector)
      .filter((el) => $(el).parents(modalsSelector).length === 0);

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

    found = router.findElement(selector, $container);
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
          const tRoute = extend({}, route, {
            path: `${route.path}/${tabRoute.path}`.replace('///', '/').replace('//', '/'),
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
          const dRoute = extend({}, detailRoute);
          dRoute.masterRoute = route;
          dRoute.masterRoutePath = route.path;
          return dRoute;
        });
        flattenedRoutes = flattenedRoutes.concat(route, router.flattenRoutes(mergedPathsRoutes));
      }
      if ('routes' in route) {
        const mergedPathsRoutes = route.routes.map((childRoute) => {
          const cRoute = extend({}, childRoute);
          cRoute.path = `${route.path}/${cRoute.path}`.replace('///', '/').replace('//', '/');
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
    const query = parseUrlQuery(url);
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

  generateUrl(parameters = {}) {
    if (typeof parameters === 'string') {
      return parameters;
    }
    const { name, path, params, query } = parameters;
    if (!name && !path) {
      throw new Error('Framework7: "name" or "path" parameter is required');
    }
    const router = this;
    const route = name ? router.findRouteByKey('name', name) : router.findRouteByKey('path', path);

    if (!route) {
      if (name) {
        throw new Error(`Framework7: route with name "${name}" not found`);
      } else {
        throw new Error(`Framework7: route with path "${path}" not found`);
      }
    }
    const url = router.constructRouteUrl(route, { params, query });

    if (url === '') {
      return '/';
    }

    if (!url) {
      throw new Error(`Framework7: can't construct URL for route with name "${name}"`);
    }
    return url;
  }

  // eslint-disable-next-line
  constructRouteUrl(route, { params, query } = {}) {
    const { path } = route;
    const toUrl = compile(path);
    let url;
    try {
      url = toUrl(params || {});
    } catch (error) {
      throw new Error(
        `Framework7: error constructing route URL from passed params:\nRoute: ${path}\n${error.toString()}`,
      );
    }

    if (query) {
      if (typeof query === 'string') url += `?${query}`;
      else if (Object.keys(query).length) url += `?${serializeObject(query)}`;
    }

    return url;
  }

  findTabRouteUrl(tabEl) {
    const router = this;
    const $tabEl = $(tabEl);
    const parentPath = router.currentRoute.route.parentPath;
    const tabId = $tabEl.attr('id');
    const flattenedRoutes = router.flattenRoutes(router.routes);
    let foundTabRouteUrl;
    flattenedRoutes.forEach((route) => {
      if (route.parentPath === parentPath && route.tab && route.tab.id === tabId) {
        if (router.currentRoute.params && Object.keys(router.currentRoute.params).length > 0) {
          foundTabRouteUrl = router.constructRouteUrl(route, {
            params: router.currentRoute.params,
            query: router.currentRoute.query,
          });
        } else {
          foundTabRouteUrl = route.path;
        }
      }
    });
    return foundTabRouteUrl;
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

      const pathsToMatch = [route.path || '/'];
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
        matched = pathToRegexp(pathToMatch, keys).exec(path || '/');
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
          parentPath = (path || '/')
            .split('/')
            .slice(0, route.parentPath.split('/').length - 1)
            .join('/');
        }

        matchingRoute = {
          query,
          hash,
          params,
          url,
          path: path || '/',
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
    if (
      typeof compiledUrl === 'string' &&
      compiledUrl.indexOf('{{') >= 0 &&
      options &&
      options.route &&
      options.route.params &&
      Object.keys(options.route.params).length
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
    if (
      params.passRouteQueryToRequest &&
      options &&
      options.route &&
      options.route.query &&
      Object.keys(options.route.query).length
    ) {
      url += `${hasQuery ? '&' : '?'}${serializeObject(options.route.query)}`;
      hasQuery = true;
    }

    if (
      params.passRouteParamsToRequest &&
      options &&
      options.route &&
      options.route.params &&
      Object.keys(options.route.params).length
    ) {
      url += `${hasQuery ? '&' : '?'}${serializeObject(options.route.params)}`;
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
      if (
        params.xhrCache &&
        !ignoreCache &&
        url.indexOf('nocache') < 0 &&
        params.xhrCacheIgnore.indexOf(url) < 0
      ) {
        for (let i = 0; i < router.cache.xhr.length; i += 1) {
          const cachedUrl = router.cache.xhr[i];
          if (cachedUrl.url === url) {
            // Check expiration
            if (now() - cachedUrl.time < params.xhrCacheDuration) {
              // Load from cache
              resolve(cachedUrl.content);
              return;
            }
          }
        }
      }
      router.xhrAbortController = new AbortController();
      let fetchRes;
      fetch(url, { signal: router.xhrAbortController.signal, method: 'GET' })
        .then((res) => {
          fetchRes = res;
          return res.text();
        })
        .then((responseText) => {
          const { status } = fetchRes;
          router.emit('routerAjaxComplete', fetchRes);
          if (
            (status !== 'error' && status !== 'timeout' && status >= 200 && status < 300) ||
            status === 0
          ) {
            if (params.xhrCache && responseText !== '') {
              router.removeFromXhrCache(url);
              router.cache.xhr.push({
                url,
                time: now(),
                content: responseText,
              });
            }
            router.emit('routerAjaxSuccess', fetchRes, options);
            resolve(responseText);
          } else {
            router.emit('routerAjaxError', fetchRes, options);
            reject(fetchRes);
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  setNavbarPosition($el, position, ariaHidden) {
    const router = this;
    $el.removeClass('navbar-previous navbar-current navbar-next');
    if (position) {
      $el.addClass(`navbar-${position}`);
    }

    if (ariaHidden === false) {
      $el.removeAttr('aria-hidden');
    } else if (ariaHidden === true) {
      $el.attr('aria-hidden', 'true');
    }
    $el.trigger('navbar:position', { position });
    router.emit('navbarPosition', $el[0], position);
  }

  setPagePosition($el, position, ariaHidden) {
    const router = this;
    $el.removeClass('page-previous page-current page-next');
    $el.addClass(`page-${position}`);
    if (ariaHidden === false) {
      $el.removeAttr('aria-hidden');
    } else if (ariaHidden === true) {
      $el.attr('aria-hidden', 'true');
    }
    $el.trigger('page:position', { position });
    router.emit('pagePosition', $el[0], position);
  }

  // Remove theme elements
  removeThemeElements(el) {
    const router = this;
    const theme = router.app.theme;
    let toRemove;
    if (theme === 'ios') {
      toRemove = '.md-only, .if-md, .if-not-ios, .not-ios';
    } else if (theme === 'md') {
      toRemove = '.ios-only, .if-ios, .if-not-md, .not-md';
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
    if ((from === 'next' && to === 'current') || (from === 'current' && to === 'previous'))
      direction = 'forward';
    if ((from === 'current' && to === 'next') || (from === 'previous' && to === 'current'))
      direction = 'backward';
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
    const restoreScrollTopOnBack =
      router.params.restoreScrollTopOnBack &&
      !(
        router.params.masterDetailBreakpoint > 0 &&
        $pageEl.hasClass('page-master') &&
        router.app.width >= router.params.masterDetailBreakpoint
      );
    const keepAlive =
      $pageEl[0].f7Page &&
      $pageEl[0].f7Page.route &&
      $pageEl[0].f7Page.route.route &&
      $pageEl[0].f7Page.route.route.keepAlive;

    if (callback === 'beforeRemove' && keepAlive) {
      callback = 'beforeUnmount'; // eslint-disable-line
    }

    const camelName = `page${callback[0].toUpperCase() + callback.slice(1, callback.length)}`;
    const colonName = `page:${callback.toLowerCase()}`;

    let page = {};
    if (callback === 'beforeRemove' && $pageEl[0].f7Page) {
      page = extend($pageEl[0].f7Page, { from, to, position: from });
    } else {
      page = router.getPageData($pageEl[0], $navbarEl[0], from, to, route, pageFromEl);
    }
    page.swipeBack = !!options.swipeBack;

    const { on = {}, once = {} } = options.route ? options.route.route : {};
    if (options.on) {
      extend(on, options.on);
    }
    if (options.once) {
      extend(once, options.once);
    }

    function attachEvents() {
      if ($pageEl[0].f7RouteEventsAttached) return;
      $pageEl[0].f7RouteEventsAttached = true;
      if (on && Object.keys(on).length > 0) {
        $pageEl[0].f7RouteEventsOn = on;
        Object.keys(on).forEach((eventName) => {
          on[eventName] = on[eventName].bind(router);
          $pageEl.on(eventNameToColonCase(eventName), on[eventName]);
        });
      }
      if (once && Object.keys(once).length > 0) {
        $pageEl[0].f7RouteEventsOnce = once;
        Object.keys(once).forEach((eventName) => {
          once[eventName] = once[eventName].bind(router);
          $pageEl.once(eventNameToColonCase(eventName), once[eventName]);
        });
      }
    }

    function detachEvents() {
      if (!$pageEl[0].f7RouteEventsAttached) return;
      if ($pageEl[0].f7RouteEventsOn) {
        Object.keys($pageEl[0].f7RouteEventsOn).forEach((eventName) => {
          $pageEl.off(eventNameToColonCase(eventName), $pageEl[0].f7RouteEventsOn[eventName]);
        });
      }
      if ($pageEl[0].f7RouteEventsOnce) {
        Object.keys($pageEl[0].f7RouteEventsOnce).forEach((eventName) => {
          $pageEl.off(eventNameToColonCase(eventName), $pageEl[0].f7RouteEventsOnce[eventName]);
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
      if (
        restoreScrollTopOnBack &&
        (from === 'previous' || !from) &&
        to === 'current' &&
        router.scrollHistory[page.route.url] &&
        !$pageEl.hasClass('no-restore-scroll')
      ) {
        let $pageContent = $pageEl.find('.page-content');
        if ($pageContent.length > 0) {
          // eslint-disable-next-line
          $pageContent = $pageContent.filter((pageContentEl) => {
            return (
              $(pageContentEl).parents('.tab:not(.tab-active)').length === 0 &&
              !$(pageContentEl).is('.tab:not(.tab-active)')
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
    if (
      restoreScrollTopOnBack &&
      callback === 'beforeOut' &&
      from === 'current' &&
      to === 'previous'
    ) {
      // Save scroll position
      let $pageContent = $pageEl.find('.page-content');
      if ($pageContent.length > 0) {
        // eslint-disable-next-line
        $pageContent = $pageContent.filter((pageContentEl) => {
          return (
            $(pageContentEl).parents('.tab:not(.tab-active)').length === 0 &&
            !$(pageContentEl).is('.tab:not(.tab-active)')
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
    const window = getWindow();
    router.view.history = router.history;
    if (
      router.params.browserHistory &&
      router.params.browserHistoryStoreHistory &&
      window.localStorage
    ) {
      window.localStorage[`f7router-${router.view.id}-history`] = JSON.stringify(router.history);
    }
  }

  restoreHistory() {
    const router = this;
    const window = getWindow();
    if (
      router.params.browserHistory &&
      router.params.browserHistoryStoreHistory &&
      window.localStorage &&
      window.localStorage[`f7router-${router.view.id}-history`]
    ) {
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
      extend(router.currentRoute, {
        query,
        hash,
        params,
        url,
        path,
      });
    }

    if (router.params.browserHistory) {
      const browserHistoryRoot = router.params.browserHistoryRoot || '';
      History.replace(
        router.view.id,
        {
          url: newUrl,
        },
        browserHistoryRoot + router.params.browserHistorySeparator + newUrl,
      );
    }

    // Save History
    router.saveHistory();

    router.emit('routeUrlUpdate', router.currentRoute, router);
  }

  getInitialUrl() {
    const router = this;
    if (router.initialUrl) {
      return {
        initialUrl: router.initialUrl,
        historyRestored: router.historyRestored,
      };
    }
    const { app, view } = router;
    const document = getDocument();
    const window = getWindow();

    const location =
      app.params.url && typeof app.params.url === 'string' && typeof URL !== 'undefined'
        ? new URL(app.params.url)
        : document.location;

    let initialUrl = router.params.url;
    let documentUrl = location.href.split(location.origin)[1];

    let historyRestored;
    const { browserHistory, browserHistoryOnLoad, browserHistorySeparator } = router.params;
    let { browserHistoryRoot } = router.params;
    if (
      (window.cordova || (window.Capacitor && window.Capacitor.isNative)) &&
      browserHistory &&
      !browserHistorySeparator &&
      !browserHistoryRoot &&
      location.pathname.indexOf('index.html')
    ) {
      // eslint-disable-next-line
      console.warn(
        'Framework7: wrong or not complete browserHistory configuration, trying to guess browserHistoryRoot',
      );
      browserHistoryRoot = location.pathname.split('index.html')[0];
    }
    if (!browserHistory || !browserHistoryOnLoad) {
      if (!initialUrl) {
        initialUrl = documentUrl;
      }
      if (location.search && initialUrl.indexOf('?') < 0) {
        initialUrl += location.search;
      }
      if (location.hash && initialUrl.indexOf('#') < 0) {
        initialUrl += location.hash;
      }
    } else {
      if (browserHistoryRoot && documentUrl.indexOf(browserHistoryRoot) >= 0) {
        documentUrl = documentUrl.substring(
          documentUrl.indexOf(browserHistoryRoot) + browserHistoryRoot.length,
        );
        if (documentUrl === '') documentUrl = '/';
      }
      if (browserHistorySeparator.length > 0 && documentUrl.indexOf(browserHistorySeparator) >= 0) {
        initialUrl = documentUrl.substring(
          documentUrl.indexOf(browserHistorySeparator) + browserHistorySeparator.length,
        );
      } else {
        initialUrl = documentUrl;
      }
      router.restoreHistory();
      if (router.history.indexOf(initialUrl) >= 0) {
        router.history = router.history.slice(0, router.history.indexOf(initialUrl) + 1);
      } else if (router.params.url === initialUrl) {
        router.history = [initialUrl];
      } else if (
        History.state &&
        History.state[view.id] &&
        History.state[view.id].url === router.history[router.history.length - 1]
      ) {
        initialUrl = router.history[router.history.length - 1];
      } else {
        router.history = [documentUrl.split(browserHistorySeparator)[0] || '/', initialUrl];
      }
      if (router.history.length > 1) {
        historyRestored = true;
      } else {
        router.history = [];
      }
      router.saveHistory();
    }

    router.initialUrl = initialUrl;
    router.historyRestored = historyRestored;
    return { initialUrl, historyRestored };
  }

  init() {
    const router = this;
    const { app, view } = router;
    const document = getDocument();

    router.mount();

    const { initialUrl, historyRestored } = router.getInitialUrl();

    // Init Swipeback
    if (
      (view && router.params.iosSwipeBack && app.theme === 'ios') ||
      (view && router.params.mdSwipeBack && app.theme === 'md')
    ) {
      SwipeBack(router);
    }

    const {
      browserHistory,
      browserHistoryOnLoad,
      browserHistoryAnimateOnLoad,
      browserHistoryInitialMatch,
    } = router.params;

    let currentRoute;
    if (router.history.length > 1) {
      // Will load page
      const initUrl = browserHistoryInitialMatch ? initialUrl : router.history[0];
      currentRoute = router.findMatchingRoute(initUrl);
      if (!currentRoute) {
        currentRoute = extend(router.parseRouteUrl(initUrl), {
          route: {
            url: initUrl,
            path: initUrl.split('?')[0],
          },
        });
      }
    } else {
      // Don't load page
      currentRoute = router.findMatchingRoute(initialUrl);
      if (!currentRoute) {
        currentRoute = extend(router.parseRouteUrl(initialUrl), {
          route: {
            url: initialUrl,
            path: initialUrl.split('?')[0],
          },
        });
      }
    }

    if (router.$el.children('.page').length === 0 && initialUrl && router.params.loadInitialPage) {
      // No pages presented in DOM, reload new page
      router.navigate(initialUrl, {
        initial: true,
        reloadCurrent: true,
        browserHistory: false,
        animate: false,
        once: {
          modalOpen() {
            if (!historyRestored) return;
            const preloadPreviousPage =
              router.params.preloadPreviousPage || router.params[`${app.theme}SwipeBack`];
            if (preloadPreviousPage && router.history.length > 1) {
              router.back({ preload: true });
            }
          },
          pageAfterIn() {
            if (!historyRestored) return;
            const preloadPreviousPage =
              router.params.preloadPreviousPage || router.params[`${app.theme}SwipeBack`];
            if (preloadPreviousPage && router.history.length > 1) {
              router.back({ preload: true });
            }
          },
        },
      });
    } else if (router.$el.children('.page').length) {
      // Init current DOM page
      let hasTabRoute;
      router.currentRoute = currentRoute;
      router.$el.children('.page').each((pageEl) => {
        const $pageEl = $(pageEl);
        let $navbarEl;
        router.setPagePosition($pageEl, 'current');
        if (router.dynamicNavbar) {
          $navbarEl = $pageEl.children('.navbar');
          if ($navbarEl.length > 0) {
            if (!router.$navbarsEl.parents(document).length) {
              router.$el.prepend(router.$navbarsEl);
            }
            router.setNavbarPosition($navbarEl, 'current');
            router.$navbarsEl.append($navbarEl);
            if ($navbarEl.children('.title-large').length) {
              $navbarEl.addClass('navbar-large');
            }
            $pageEl.children('.navbar').remove();
          } else {
            router.$navbarsEl.addClass('navbar-hidden');
            if ($navbarEl.children('.title-large').length) {
              router.$navbarsEl.addClass('navbar-hidden navbar-large-hidden');
            }
          }
        }
        if (
          router.currentRoute &&
          router.currentRoute.route &&
          (router.currentRoute.route.master === true ||
            (typeof router.currentRoute.route.master === 'function' &&
              router.currentRoute.route.master(app, router))) &&
          router.params.masterDetailBreakpoint > 0
        ) {
          $pageEl.addClass('page-master');
          $pageEl.trigger('page:role', { role: 'master' });
          if ($navbarEl && $navbarEl.length) {
            $navbarEl.addClass('navbar-master');
          }
          view.checkMasterDetailBreakpoint();
        }
        const initOptions = {
          route: router.currentRoute,
        };
        if (router.currentRoute && router.currentRoute.route && router.currentRoute.route.options) {
          extend(initOptions, router.currentRoute.route.options);
        }
        router.currentPageEl = $pageEl[0];
        if (router.dynamicNavbar && $navbarEl.length) {
          router.currentNavbarEl = $navbarEl[0];
        }
        router.removeThemeElements($pageEl);
        if (router.dynamicNavbar && $navbarEl.length) {
          router.removeThemeElements($navbarEl);
        }
        if (initOptions.route.route.tab) {
          hasTabRoute = true;
          router.tabLoad(initOptions.route.route.tab, extend({}, initOptions));
        }
        router.pageCallback('init', $pageEl, $navbarEl, 'current', undefined, initOptions);
        router.pageCallback('beforeIn', $pageEl, $navbarEl, 'current', undefined, initOptions);
        router.pageCallback('afterIn', $pageEl, $navbarEl, 'current', undefined, initOptions);
      });
      if (historyRestored) {
        if (browserHistoryInitialMatch) {
          const preloadPreviousPage =
            router.params.preloadPreviousPage || router.params[`${app.theme}SwipeBack`];
          if (preloadPreviousPage && router.history.length > 1) {
            router.back({ preload: true });
          }
        } else {
          router.navigate(initialUrl, {
            initial: true,
            browserHistory: false,
            history: false,
            animate: browserHistoryAnimateOnLoad,
            once: {
              pageAfterIn() {
                const preloadPreviousPage =
                  router.params.preloadPreviousPage || router.params[`${app.theme}SwipeBack`];
                if (preloadPreviousPage && router.history.length > 2) {
                  router.back({ preload: true });
                }
              },
            },
          });
        }
      }
      if (!historyRestored && !hasTabRoute) {
        router.history.push(initialUrl);
        router.saveHistory();
      }
    }
    if (
      initialUrl &&
      browserHistory &&
      browserHistoryOnLoad &&
      (!History.state || !History.state[view.id])
    ) {
      History.initViewState(view.id, {
        url: initialUrl,
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
Router.prototype.navigate = navigate;
Router.prototype.refreshPage = refreshPage;
// Tab
Router.prototype.tabLoad = tabLoad;
Router.prototype.tabRemove = tabRemove;
// Modal
Router.prototype.modalLoad = modalLoad;
Router.prototype.modalRemove = modalRemove;
// Back
Router.prototype.back = back;
// Clear history
Router.prototype.clearPreviousHistory = clearPreviousHistory;

export default Router;
