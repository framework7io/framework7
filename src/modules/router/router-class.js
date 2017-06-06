import $ from 'dom7';
import t7 from 'template7';
import Framework7Class from '../../utils/class';
import Utils from '../../utils/utils';
import Component from '../../utils/component';
import SwipeBack from './swipe-back';

import { forward, load, navigate } from './navigate';
import loadTab from './load-tab';
import { backward as RouterBackward, loadBack as RouterLoadBack, back as RouterBack } from './back';

class Router extends Framework7Class {
  constructor(app, view) {
    super({}, [typeof view === 'undefined' ? app : view]);
    const router = this;

    // Is App Router
    router.isAppRouter = typeof view === 'undefined';

    if (router.isAppRouter) {
      // App Router
      Utils.extend(router, {
        app,
        params: app.params.router,
        routes: app.routes || [],
        cache: app.cache,
      });
    } else {
      // View Router
      Utils.extend(router, {
        app,
        view,
        params: view.params.router,
        routes: view.routes || [],
        $el: view.$el,
        $navbarEl: view.$navbarEl,
        navbarEl: view.navbarEl,
        history: view.history,
        cache: app.cache,
        dynamicNavbar: app.theme === 'ios' && view.params.router.iosDynamicNavbar,
        separateNavbar: app.theme === 'ios' && view.params.router.iosDynamicNavbar && view.params.router.iosSeparateDynamicNavbar,
        initialPages: [],
        initialNavbars: [],
      });
    }

    // Install Modules
    router.useInstanceModules();

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
        router.url = currentRoute.url;
        router.emit('routeChange route:change', newRoute, previousRoute, router);
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
    });

    // Load
    router.forward = forward;
    router.load = load;
    router.navigate = navigate;
    router.loadTab = loadTab;

    // Back
    router.backward = RouterBackward;
    router.loadBack = RouterLoadBack;
    router.back = RouterBack;

    return router;
  }
  prepareNavbars(oldNavbarInner, newNavbarInner, direction) {
    const router = this;
    let slidingEls;
    if (newNavbarInner.hasClass('sliding')) {
      slidingEls = newNavbarInner.children('.left, .right, .title, .subnavbar');
    } else {
      slidingEls = newNavbarInner.find('.sliding');
    }
    if (!slidingEls) return;
    let navbarWidth;
    if (!router.separateNavbar) {
      navbarWidth = newNavbarInner[0].offsetWidth;
    }

    let oldNavbarTitleEl;
    if (oldNavbarInner.find('.title.sliding').length > 0) {
      oldNavbarTitleEl = oldNavbarInner.find('.title.sliding');
    } else {
      oldNavbarTitleEl = oldNavbarInner.hasClass('sliding') && oldNavbarInner.find('.title');
    }

    slidingEls.each((index, slidingEl) => {
      const $slidingEl = $(slidingEl);
      const slidingOffset = direction === 'forward' ? slidingEl.f7NavbarRightOffset : slidingEl.f7NavbarLeftOffset;
      if (router.params.iosAnimateNavbarBackIcon && $slidingEl.hasClass('left') && $slidingEl.find('.back .icon').length > 0) {
        let iconSlidingOffset = -slidingOffset;
        const iconTextEl = $slidingEl.find('.back span').eq(0);
        if (!router.separateNavbar) {
          if (direction === 'forward') {
            iconSlidingOffset -= navbarWidth;
          } else {
            iconSlidingOffset += navbarWidth / 5;
          }
        }
        $slidingEl.find('.back .icon').transform(`translate3d(${iconSlidingOffset}px,0,0)`);
        if (oldNavbarTitleEl && iconTextEl.length > 0) {
          oldNavbarTitleEl[0].f7NavbarLeftOffset += iconTextEl[0].offsetLeft;
        }
      }
      $slidingEl.transform(`translate3d(${slidingOffset}px,0,0)`);
    });
  }
  animateNavbars(oldNavbarInner, newNavbarInner, direction) {
    const router = this;
    const animateIcon = router.params.iosAnimateNavbarBackIcon;

    let navbarIconOffset = 0;
    let oldNavbarWidth;
    if (!router.separateNavbar && animateIcon) {
      oldNavbarWidth = oldNavbarInner[0].offsetWidth;
      if (direction === 'forward') {
        navbarIconOffset = oldNavbarWidth / 5;
      } else {
        navbarIconOffset = -oldNavbarWidth;
      }
    }

    // Old Navbar Sliding
    let oldNavbarSlidingEls;
    if (oldNavbarInner.hasClass('sliding')) {
      oldNavbarSlidingEls = oldNavbarInner.children('.left, .right, .title, .subnavbar');
    } else {
      oldNavbarSlidingEls = oldNavbarInner.find('.sliding');
    }

    if (oldNavbarSlidingEls) {
      oldNavbarSlidingEls.each((index, slidingEl) => {
        const $slidingEl = $(slidingEl);
        const offset = direction === 'forward' ? slidingEl.f7NavbarLeftOffset : slidingEl.f7NavbarRightOffset;
        $slidingEl.transform(`translate3d(${offset}px,0,0)`);
        if (animateIcon) {
          if ($slidingEl.hasClass('left') && $slidingEl.find('.back .icon').length > 0) {
            $slidingEl.find('.back .icon').transform(`translate3d(${-offset + navbarIconOffset}px,0,0)`);
          }
        }
      });
    }
  }

  animate(oldPage, newPage, oldNavbarInner, newNavbarInner, direction, callback) {
    const router = this;
    const pageClasses = 'page-current page-next page-previous';
    const navbarClasses = 'navbar-current navbar-next navbar-previous';
    const dynamicNavbar = router.dynamicNavbar;
    let eventPage;
    if (direction === 'forward') {
      eventPage = newPage;
      oldPage.removeClass(pageClasses).addClass('page-current');
      newPage.removeClass(pageClasses).addClass('page-next');
      if (dynamicNavbar) {
        oldNavbarInner.removeClass(navbarClasses).addClass('navbar-current');
        newNavbarInner.removeClass(navbarClasses).addClass('navbar-next');
      }
    } else {
      eventPage = oldPage;
      oldPage.removeClass(pageClasses).addClass('page-current');
      newPage.removeClass(pageClasses).addClass('page-previous');
      if (dynamicNavbar) {
        oldNavbarInner.removeClass(navbarClasses).addClass('navbar-current');
        newNavbarInner.removeClass(navbarClasses).addClass('navbar-previous');
      }
    }

    // Router Animation class
    const routerClass = `router-animate-${direction}`;

    // AnimationEnd Callback
    eventPage.animationEnd(() => {
      router.$el.removeClass(routerClass);
      if (callback) callback();
    });

    if (router.dynamicNavbar) {
      // Prepare Navbars
      router.prepareNavbars(oldNavbarInner, newNavbarInner, direction);
      Utils.nextFrame(() => {
        // Add class, start animation
        router.$el.addClass(routerClass);
        router.animateNavbars(oldNavbarInner, newNavbarInner, direction);
      });
    } else {
      // Add class, start animation
      router.$el.addClass(routerClass);
    }
  }
  remove(el) {
    const router = this;
    if (router.params.removeWithTimeout) {
      setTimeout(() => {
        $(el).remove();
      }, 0);
    } else {
      $(el).remove();
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
    const modalsSelector = '.popup, .modal, .popover, .actions-modal, .picker-modal, .login-screen';

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
    let flattenedRoutes = [];
    routes.forEach((route) => {
      if ('routes' in route) {
        const mergedPathsRoutes = route.routes.map((childRoute) => {
          const cRoute = Utils.extend({}, childRoute);
          cRoute.path = (`${route.path}/${cRoute.path}`).replace('///', '/').replace('//', '/');
          return cRoute;
        });
        flattenedRoutes = flattenedRoutes.concat(route, this.flattenRoutes(mergedPathsRoutes));
      } else if ('tabs' in route && route.tabs) {
        const mergedPathsRoutes = route.tabs.map((tabRoute) => {
          const tRoute = Utils.extend({}, route, {
            path: (`${route.path}/${tabRoute.path}`).replace('///', '/').replace('//', '/'),
            parentPath: route.path,
            tab: tabRoute,
          });
          delete tRoute.tabs;
          return tRoute;
        });
        flattenedRoutes = flattenedRoutes.concat(this.flattenRoutes(mergedPathsRoutes));
      } else {
        flattenedRoutes.push(route);
      }
    });
    return flattenedRoutes;
  }
  findMatchingRoute(url, parseOnly) {
    if (!url) return undefined;
    const router = this;
    const routes = router.routes;
    const flattenedRoutes = router.flattenRoutes(routes);
    const query = Utils.parseUrlQuery(url);
    const hash = url.split('#')[1];
    const params = {};
    const path = url.split('#')[0].split('?')[0];
    const urlParts = path.split('/').filter(part => part !== '');
    if (parseOnly) {
      return {
        query,
        hash,
        params,
        url,
        path,
      };
    }

    let matchingRoute;
    function parseRoute(str = '') {
      const parts = [];
      str.split('/').forEach((part) => {
        if (part !== '') {
          if (part.indexOf(':') === 0) {
            parts.push({
              name: part.replace(':', ''),
            });
          } else parts.push(part);
        }
      });
      return parts;
    }
    flattenedRoutes.forEach((route) => {
      if (matchingRoute) return;
      const parsedRoute = parseRoute(route.path);
      if (parsedRoute.length !== urlParts.length) return;
      let matchedParts = 0;
      parsedRoute.forEach((routePart, index) => {
        if (typeof routePart === 'string' && urlParts[index] === routePart) {
          matchedParts += 1;
        }
        if (typeof routePart === 'object') {
          params[routePart.name] = urlParts[index];
          matchedParts += 1;
        }
      });
      if (matchedParts === urlParts.length) {
        matchingRoute = {
          query,
          hash,
          params,
          url,
          path,
          route,
        };
      }
    });
    return matchingRoute;
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
  xhrRequest(requestUrl, ignoreCache) {
    const router = this;
    const params = router.params;
    let url = requestUrl;
    // should we ignore get params or not
    if (params.xhrCacheIgnoreGetParameters && url.indexOf('?') >= 0) {
      url = url.split('?')[0];
    }

    return Utils.promise((resolve, reject) => {
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
      router.xhr = $.ajax({
        url,
        method: 'GET',
        beforeSend() {
          router.emit('routerAjaxStart router:ajaxstart');
        },
        complete(xhr, status) {
          router.emit('routerAjaxComplete router:ajaxcomplete');
          if ((status !== 'error' && status !== 'timeout' && (xhr.status >= 200 && xhr.status < 300)) || xhr.status === 0) {
            if (params.xhrCache && xhr.responseText !== '') {
              router.removeFromXhrCache(url);
              router.cache.xhr.push({
                url,
                time: Utils.now(),
                content: xhr.responseText,
              });
            }
            resolve(xhr.responseText);
          } else {
            reject(xhr);
          }
        },
        error(xhr) {
          router.emit('ajaxError ajax:error');
          reject(xhr);
        },
      });
    });
  }
  templateLoader(template, templateUrl, options, resolve, reject) {
    const router = this;
    function compile(t) {
      let compiledHtml;
      let context;
      try {
        context = options.context || {};
        if (typeof context === 'function') context = context.call(router.app);
        else if (typeof context === 'string') {
          try {
            context = JSON.parse(context);
          } catch (err) {
            reject();
            throw (err);
          }
        }
        if (typeof t === 'function') {
          compiledHtml = t(context);
        } else {
          compiledHtml = t7.compile(t)(Utils.extend({}, context || {}, {
            $app: router.app,
            $root: router.app.data,
            $route: options.route,
            $router: router,
            $theme: {
              ios: router.app.theme === 'ios',
              md: router.app.theme === 'md',
            },
          }));
        }
      } catch (err) {
        reject();
        throw (err);
      }
      resolve(compiledHtml, { context });
    }
    if (templateUrl) {
      // Load via XHR
      if (router.xhr) {
        router.xhr.abort();
        router.xhr = false;
      }
      router
        .xhrRequest(templateUrl)
        .then((templateContent) => {
          compile(templateContent);
        })
        .catch(() => {
          reject();
        });
    } else {
      compile(template);
    }
  }
  tabTemplateLoader(tabEl, template, templateUrl, options, resolve, reject) {
    const router = this;
    return router.templateLoader(template, templateUrl, options, (html) => {
      resolve($(html));
    }, reject);
  }
  pageTemplateLoader(template, templateUrl, options, resolve, reject) {
    const router = this;
    return router.templateLoader(template, templateUrl, options, (html, newOptions = {}) => {
      resolve(router.getPageEl(html), newOptions);
    }, reject);
  }
  componentLoader(component, componentUrl, options, resolve, reject) {
    const router = this;
    const url = typeof component === 'string' ? component : componentUrl;
    function compile(c) {
      const compiled = Component.compile(c, {
        $app: router.app,
        $root: router.app.data,
        $route: options.route,
        $router: router,
        $theme: {
          ios: router.app.theme === 'ios',
          md: router.app.theme === 'md',
        },
      });
      const $el = $(compiled.dom);

      let styleEl;
      if (c.style) {
        styleEl = document.createElement('style');
        styleEl.innerHTML = c.style;
        $('head').append(styleEl);
        if (c.styleScope) $el.attr('data-scope', c.styleScope);
      }
      if (compiled.events && compiled.events.length) {
        compiled.events.forEach((event) => {
          $(event.el)[event.once ? 'once' : 'on'](event.name, event.handler);
        });
        $el.once('pageBeforeRemove', () => {
          if (c.style && styleEl) {
            $(styleEl).remove();
          }
          compiled.events.forEach((event) => {
            $(event.el).off(event.name, event.handler);
          });
        });
      }
      resolve($el, { pageEvents: c.on });
    }
    if (url) {
      // Load via XHR
      if (router.xhr) {
        router.xhr.abort();
        router.xhr = false;
      }
      router
        .xhrRequest(url)
        .then((loadedComponent) => {
          compile(Component.parse(loadedComponent));
        })
        .catch(() => {
          reject();
        });
    } else {
      compile(component);
    }
  }
  tabComponentLoader(tabEl, component, componentUrl, options, resolve, reject) {
    const router = this;
    router.componentLoader(component, componentUrl, options, (el) => {
      resolve(el);
    }, reject);
  }
  pageComponentLoader(component, componentUrl, options, resolve, reject) {
    const router = this;
    router.componentLoader(component, componentUrl, options, (el, newOptions = {}) => {
      resolve(el, newOptions);
    }, reject);
  }
  getPageData(pageEl, navbarEl, from, to, route = {}) {
    const router = this;
    const $pageEl = $(pageEl);
    const $navbarEl = $(navbarEl);
    const currentPage = $pageEl[0].f7Page || {};
    const page = {
      app: router.app,
      view: router.view,
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
      route: currentPage.route ? currentPage.route : route,
    };
    $pageEl[0].f7Page = page;
    return page;
  }
  // Callbacks
  pageCallback(callback, pageEl, navbarEl, from, to, options = {}) {
    if (!pageEl) return;
    const router = this;
    const $pageEl = $(pageEl);
    const { route, on = {} } = options;

    const camelName = `page${callback[0].toUpperCase() + callback.slice(1, callback.length)}`;
    const colonName = `page:${callback.toLowerCase()}`;
    const callbackName = `${camelName} ${colonName}`;

    let page = {};
    if (callback === 'beforeRemove' && $pageEl[0].f7Page) {
      page = Utils.extend($pageEl[0].f7Page, { from, to, position: from });
    } else {
      page = router.getPageData(pageEl, navbarEl, from, to, route);
    }

    function attachEvents() {
      if ($pageEl[0].f7PageEventsAttached) return;
      $pageEl[0].f7PageEventsAttached = true;
      if (options.pageEvents) {
        Object.keys(options.pageEvents).forEach((eventName) => {
          $pageEl.on(eventName, () => {
            options.pageEvents[eventName](page);
          });
        });
      }
    }
    if (callback === 'attached') {
      attachEvents();
    }
    if (callback === 'init') {
      attachEvents();
      if ($pageEl[0].f7PageInitialized) {
        if (on.pageReinit) on.pageReinit(page);
        router.emit('pageReinit page:reinit', page);
        $pageEl.trigger('pageReinit page:reinit', page);
        return;
      }
      $pageEl[0].f7PageInitialized = true;
    }
    if (on[camelName]) on[camelName](page);
    router.emit(callbackName, page);
    $pageEl.trigger(callbackName, page);

    if (callback === 'beforeRemove') {
      $pageEl[0].f7Page = null;
      page = null;
    }
  }
  saveHistory() {
    const router = this;
    router.view.history = router.history;
    if (router.params.pushState) {
      window.localStorage[`f7_router_${router.view.index}_history`] = JSON.stringify(router.history);
    }
  }
  restoreHistory() {
    const router = this;
    if (router.params.pushState && window.localStorage[`f7_router_${router.view.index}_history`]) {
      router.history = JSON.parse(window.localStorage[`f7_router_${router.view.index}_history`]);
      router.view.history = router.history;
    }
  }
  clearHistory() {
    const router = this;
    router.history = [];
    router.saveHistory();
  }
  init() {
    const router = this;
    const app = router.app;

    // Init Swipeback
    if (router.view && router.params.swipeBackPage && app.theme === 'ios') {
      SwipeBack(router);
    }

    // Dynamic not separated navbbar
    if (router.dynamicNavbar && !router.separateNavbar) {
      router.$el.addClass('router-dynamic-navbar-inside');
    }

    let initUrl = router.params.url;
    const documentUrl = document.location.href.split(document.location.origin)[1];
    let historyRestored;
    if (!router.params.pushState) {
      if (!initUrl) {
        initUrl = documentUrl;
      }
    } else {
      if (documentUrl.indexOf(router.params.pushStateSeparator) >= 0) {
        initUrl = documentUrl.split(router.params.pushStateSeparator)[1];
      } else {
        initUrl = documentUrl;
      }
      router.restoreHistory();
      if (router.history.indexOf(initUrl) >= 0) {
        router.history = router.history.slice(0, router.history.indexOf(initUrl) + 1);
      } else {
        router.history = [documentUrl.split(router.params.pushStateSeparator)[0], initUrl];
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
        currentRoute = Utils.extend(router.findMatchingRoute(router.history[0], true), {
          route: {
            url: router.history[0],
            path: router.history[0].split('?')[0],
          },
        });
      }
    } else {
      // Don't load page
      currentRoute = router.findMatchingRoute(initUrl);
      if (!router.currentRoute) {
        currentRoute = Utils.extend(router.findMatchingRoute(initUrl, true), {
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
        reloadCurrent: true,
        pushState: false,
      });
    } else {
      // Init current DOM page
      router.currentRoute = currentRoute;
      router.$el.children('.page:not(.stacked)').each((index, pageEl) => {
        const $pageEl = $(pageEl);
        let $navbarInnerEl;
        $pageEl.addClass('page-current');
        if (router.separateNavbar) {
          $navbarInnerEl = $pageEl.children('.navbar').children('.navbar-inner');
          if ($navbarInnerEl.length > 0) {
            router.$navbarEl.append($navbarInnerEl);
            $pageEl.children('.navbar').remove();
          }
        }
        router.pageCallback('init', $pageEl, $navbarInnerEl, 'current', undefined, { route: router.currentRoute });
      });
      if (historyRestored) {
        router.navigate(initUrl, {
          pushState: false,
          history: false,
          animate: router.params.pushStateAnimateOnLoad,
          on: {
            pageAfterIn() {
              if (router.history.length > 2) {
                router.back({ preload: true });
              }
            },
          },
        });
      } else {
        router.history.push(initUrl);
        router.saveHistory();
      }
    }
    router.emit('routerInit router:init', router);
  }
  destroy() {
    let router = this;

    router.emit('routerDestroy router:destroy', router);

    // Delete props & methods
    Object.keys(router).forEach((routerProp) => {
      router[routerProp] = null;
      delete router[routerProp];
    });

    router = null;
  }
}

export default Router;
