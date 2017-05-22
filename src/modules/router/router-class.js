import $ from 'dom7';
import t7 from 'template7';
import Use from '../../utils/use';
import Utils from '../../utils/utils';
import Component from '../../utils/component';
import Events from '../../modules/events/events';
import SwipeBack from './swipe-back';

// import RouterNavigate from './navigate';
import { forward as RouterForward, load as RouterLoad, navigate as RouterNavigate } from './load';
import { backward as RouterBackward, loadBack as RouterLoadBack, back as RouterBack } from './back';

/*
  parameters: {
    url: String, // load page by XHR request
    content: String, // load page from string content
    name: String, // load page by name (inline pages)
    el: Object (HTMLElement), // load page by passed DOM element
    component: Object, // f7 component
    componentUrl: String, // component to load
    template: String or Function, // t7 template
    templateUrl: String, // template to load
  }

  options: {
    reloadAll: Boolean,
    reloadCurrent: Boolean
    reloadPrevious: Boolean,

    effect: String, // TODO
    animate: Boolean,

    context: Object,

    pushState: Boolean,
    ignoreCache: Boolean,
    force: Boolean,

    route: {}
  }

  Routes example:
  [
    // Load page by URL
    {
      path: '/some-page/',
      url: 'about.html',
    },
    // Dynamic + Content
    {
      path: '/some-page/:user/:id/',
      content: '<div class="page">...</div>',
    },
    // Inline Page
    {
      path: '/another-page/',
      name: 'another-page',
    },
    // Page Element
    {
      path: '/another-page/',
      el: document.querySelector('.page'),
    },
    // Template
    {
      path: '/page/',
      template: '<div class="page">{{hello}}</div>',
      context: { hello: 'Hello World!' },
    },
    // Component (For Vue/React)
    {
      path: '/page/',
      component: require('some-page.vue'),
    },
    // Nested Tabs
    {
      path: '/page-with-tabs/',
      url: 'page-tabs.html',
      routes: [
        {
          path: 'tab1/',
          tab: 'tab1',
        },
        {
          path: 'tab1/',
          tab: 'tab1',
        },

      ],
      tabs: [
        {
          path: '/',
          id: 'tab1',
          // available options: url, component, content, template, async
        }
      ]
    },
    // Async
    {
      path: '/async-page/',
      async(load) {
        setTimeout(() => {
          load({
            content: '<div class="page">...</div>',
          })
        });
      },
    },
    // Popup
    {
      path: '/popup/',
      popup: {

      }
    },
  ]
*/

class Router {
  constructor(app, view) {
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
        $pagesEl: view.$pagesEl,
        pagesEl: view.$pagesEl[0],
        $navbarEl: view.$navbarEl,
        navbarEl: view.navbarEl,
        history: view.history,
        cache: app.cache,
        dynamicNavbar: app.theme === 'ios' && view.params.router.iosDynamicNavbar,
        initialPages: [],
        initialNavbars: [],
      });
    }
    router.useInstanceModules({
      events: {
        parents: [router.isAppRouter ? app : view],
      },
    });

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
    router.forward = RouterForward;
    router.load = RouterLoad;
    router.navigate = RouterNavigate;

    // Back
    router.backward = RouterBackward;
    router.loadBack = RouterLoadBack;
    router.back = RouterBack;

    return router;
  }
  prepareNavbar(newNavbarInner, from) {
    const router = this;
    let slidingEls;
    if (newNavbarInner.hasClass('sliding')) {
      slidingEls = newNavbarInner.children('.left, .right, .title, .subnavbar');
    } else {
      slidingEls = newNavbarInner.find('.sliding');
    }
    if (!slidingEls) return;
    slidingEls.each((index, slidingEl) => {
      const $slidingEl = $(slidingEl);
      const slidingOffset = from === 'next' ? slidingEl.f7NavbarRightOffset : slidingEl.f7NavbarLeftOffset;
      if (router.params.iosAnimateNavbarBackIcon) {
        if ($slidingEl.hasClass('left') && $slidingEl.find('.back .icon').length > 0) {
          $slidingEl.find('.back .icon').transform(`translate3d(${-slidingOffset}px,0,0)`);
        }
      }
      $slidingEl.transform(`translate3d(${slidingOffset}px,0,0)`);
    });
  }
  animateNavbars(oldNavbarInner, newNavbarInner, from, to) {
    const router = this;
    const removeClasses = 'navbar-current navbar-next navbar-previous';
    router.prepareNavbar(newNavbarInner, from);
    const clientLeft = oldNavbarInner[0].clientLeft;

    // New Navbar Sliding
    let newNavbarSlidingEls;
    if (newNavbarInner.hasClass('sliding')) {
      newNavbarSlidingEls = newNavbarInner.children('.left, .right, .title, .subnavbar');
    } else {
      newNavbarSlidingEls = newNavbarInner.find('.sliding');
    }

    // Old Navbar Sliding
    let oldNavbarSlidingEls;
    if (oldNavbarInner.hasClass('sliding')) {
      oldNavbarSlidingEls = oldNavbarInner.children('.left, .right, .title, .subnavbar');
    } else {
      oldNavbarSlidingEls = oldNavbarInner.find('.sliding');
    }

    if (from === 'next' && to === 'current') {
      oldNavbarInner.removeClass(removeClasses).addClass('navbar-current-to-previous');
      newNavbarInner.removeClass(removeClasses).addClass('navbar-next-to-current');

      if (newNavbarSlidingEls) {
        newNavbarSlidingEls.each((index, slidingEl) => {
          const $slidingEl = $(slidingEl);
          $slidingEl.transform('translate3d(0px,0,0)');
          if (router.params.iosAnimateNavbarBackIcon) {
            if ($slidingEl.hasClass('left') && $slidingEl.find('.back .icon').length > 0) {
              $slidingEl.find('.back .icon').transform('translate3d(0px,0,0)');
            }
          }
        });
      }
      if (oldNavbarSlidingEls) {
        oldNavbarSlidingEls.each((oldElIndex, slidingEl) => {
          const $slidingEl = $(slidingEl);
          if (router.params.iosAnimateNavbarBackIcon) {
            if ($slidingEl.hasClass('title')) {
              let iconEl;
              let iconTextEl;
              newNavbarSlidingEls.each((newElIndex, el) => {
                const $el = $(el);
                if ($el.hasClass('left')) {
                  iconEl = $el.find('.back .icon').eq(0);
                  iconTextEl = $el.find('.back span').eq(0);
                }
              });
              if (iconEl && iconEl.length && iconTextEl && iconTextEl.length) {
                slidingEl.f7NavbarLeftOffset += iconTextEl[0].offsetLeft;
              }
            }
            if ($slidingEl.hasClass('left') && $slidingEl.find('.back .icon').length > 0) {
              $slidingEl.find('.back .icon').transform(`translate3d(${-slidingEl.f7NavbarLeftOffset}px,0,0)`);
            }
          }
          $slidingEl.transform(`translate3d(${slidingEl.f7NavbarLeftOffset}px,0,0)`);
        });
      }
    }
    if (from === 'previous' && to === 'current') {
      oldNavbarInner.removeClass(removeClasses).addClass('navbar-current-to-next');
      newNavbarInner.removeClass(removeClasses).addClass('navbar-previous-to-current');

      if (newNavbarSlidingEls) {
        newNavbarSlidingEls.each((index, slidingEl) => {
          const $slidingEl = $(slidingEl);
          $slidingEl.transform('translate3d(0px,0,0)');
          if (router.params.iosAnimateNavbarBackIcon) {
            if ($slidingEl.hasClass('left') && $slidingEl.find('.back .icon').length > 0) {
              $slidingEl.find('.back .icon').transform('translate3d(0px,0,0)');
            }
          }
        });
      }

      if (oldNavbarSlidingEls) {
        oldNavbarSlidingEls.each((index, slidingEl) => {
          const $slidingEl = $(slidingEl);
          if (router.params.iosAnimateNavbarBackIcon) {
            if ($slidingEl.hasClass('left') && $slidingEl.find('.back .icon').length > 0) {
              $slidingEl.find('.back .icon').transform(`translate3d(${-slidingEl.f7NavbarRightOffset}px,0,0)`);
            }
          }
          $slidingEl.transform(`translate3d(${slidingEl.f7NavbarRightOffset}px,0,0)`);
        });
      }
    }
  }
  animatePages(oldPage, newPage, from, to) {
    const removeClasses = 'page-current page-next page-previous';
    if (from === 'next' && to === 'current') {
      oldPage.removeClass(removeClasses).addClass('page-current-to-previous');
      newPage.removeClass(removeClasses).addClass('page-next-to-current');
    }
    if (from === 'previous' && to === 'current') {
      oldPage.removeClass(removeClasses).addClass('page-current-to-next');
      newPage.removeClass(removeClasses).addClass('page-previous-to-current');
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
      if (!('routes' in route)) {
        flattenedRoutes.push(route);
      } else {
        const metgedPathsRoutes = route.routes.map((childRoute) => {
          const cRoute = childRoute;
          cRoute.path = (`${route.path}/${cRoute.path}`).replace('///', '/').replace('//', '/');
          return cRoute;
        });
        flattenedRoutes = flattenedRoutes.concat(route, this.flattenRoutes(metgedPathsRoutes));
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
          router.emit('ajaxStart ajax:start');
        },
        complete(xhr, status) {
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
          router.emit('ajaxComplete ajax:complete');
        },
        error(xhr) {
          reject(xhr);
          router.emit('ajaxError ajax:error');
        },
      });
    });
  }
  templateLoader(template, templateUrl, options, proceed, release) {
    const router = this;
    function compile(t) {
      let compiledHtml;
      let context;
      try {
        context = options.context || {};
        if (typeof context === 'function') context = context();
        else if (typeof context === 'string') {
          try {
            context = JSON.parse(context);
          } catch (err) {
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
          }));
        }
      } catch (err) {
        release();
        throw (err);
      }
      proceed(router.getPageEl(compiledHtml), { context });
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
          release();
        });
    } else {
      compile(template);
    }
  }
  componentLoader(component, componentUrl, options, proceed, release) {
    const router = this;
    function compile(c) {
      const compiled = Component.compile(c, {
        $app: router.app,
        $root: router.app.data,
        $route: options.route,
        $router: router,
      });
      proceed(router.getPageEl(compiled.html), { pageEvents: compiled.component.on });
    }
    if (componentUrl) {
      // Load via XHR
      if (router.xhr) {
        router.xhr.abort();
        router.xhr = false;
      }
      router
        .xhrRequest(componentUrl)
        .then((loadedComponent) => {
          compile(Component.parse(loadedComponent));
        })
        .catch(() => {
          release();
        });
    } else {
      compile(component);
    }
  }
  getPageData(pageEl, navbarEl, from, to, route = {}) {
    const router = this;
    const $pageEl = $(pageEl);
    const $navbarEl = $(navbarEl);
    const currentPage = $pageEl[0].f7Page || {};
    const page = {
      app: router.app,
      view: router.view,
      $pageEl,
      pageEl: $pageEl[0],
      $navbarEl,
      navbarEl: $navbarEl[0],
      name: $pageEl.attr('data-page'),
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
      if (options.pageEvents) {
        Object.keys(options.pageEvents).forEach((eventName) => {
          $pageEl.on(eventName, () => {
            options.pageEvents[eventName](page);
          });
        });
      }
    }

    if (callback === 'init') {
      if ($pageEl[0].f7PageInitialized) {
        if (on.pageReinit) on.pageReinit(page);
        router.emit('pageReinit page:reinit', page);
        $pageEl.trigger('pageReinit page:reinit', page);
        return;
      }
      attachEvents();
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
      router.$pagesEl.find('.page').each((index, pageEl) => {
        const $pageEl = $(pageEl);
        router.initialPages.push($pageEl[0]);
        if (router.dynamicNavbar && $pageEl.children('.navbar').length > 0) {
          router.initialNavbars.push($pageEl.children('.navbar').find('.navbar-inner')[0]);
        }
      });
    }

    if (router.$pagesEl.find('.page:not(.stacked)').length === 0 && initUrl) {
      // No pages presented in DOM, reload new page
      router.navigate(initUrl, {
        reloadCurrent: true,
        pushState: false,
      });
    } else {
      // Init current DOM page
      router.currentRoute = currentRoute;
      router.$pagesEl.find('.page:not(.stacked)').each((index, pageEl) => {
        const $pageEl = $(pageEl);
        let $navbarInnerEl;
        $pageEl.addClass('page-current');
        if (router.dynamicNavbar) {
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

// Use Events
Use(Router)
  .use(Events)
  .use(SwipeBack);

export default Router;
