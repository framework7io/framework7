import $ from 'dom7';
import Use from '../../utils/use';
import Utils from '../../utils/utils';
import Component from '../../utils/component';
import Events from '../../modules/events/events';

// import RouterNavigate from './navigate';
import { forward as RouterForward, load as RouterLoad, navigate as RouterNavigate } from './load';
import { backward as RouterBackward, back as RouterBack, navigateBack as RouterNavigateBack } from './back';

/*
  url
  content
  name
  el
  component
  template
  templateId

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
      Utils.extend(router, {
        app,
        params: app.params.router,
        routes: app.params.routes,
      });
    } else {
      Utils.extend(router, {
        app,
        view,
        params: view.params.router,
        routes: view.params.routes,
        $pagesEl: view.$pagesEl,
        pagesEl: view.$pagesEl[0],
        history: view.history,
        cache: view.cache,
      });
    }
    router.useInstanceModules({
      events: {
        parents: [router.isAppRouter ? app : view],
      },
    });

    // Temporary Dom
    router.tempDom = document.createElement('div');

    // XHR Cache
    router.xhrCache = app.xhrCache;

    // AllowPageChage
    router.allowPageChange = true;

    /*
    Types:
      url
      content
      component
      name
      el
      template
      templateId

    Router load/ back options:
      reloadAll: Boolean,
      reloadCurrent: Boolean
      reloadPrevious: Boolean,

      effect: String,
      animate: Boolean,

      templateContext: Object,
      templateContextName: String,

      pushState: Boolean,
      ignoreCache: Boolean,
      force: Boolean,

      route: {}

    */

    // Load
    router.forward = RouterForward;
    router.load = RouterLoad;
    router.navigate = RouterNavigate;

    // Back
    router.backward = RouterBackward;
    router.back = RouterBack;
    router.navigateBack = RouterNavigateBack;

    return router;
  }
  animatePages(oldPage, newPage, from, to) {
    const removeClasses = 'page-current page-next page-previous';
    if (from === 'next' && to === 'current') {
      oldPage.removeClass(removeClasses).addClass('page-stack');
      newPage.removeClass(removeClasses).addClass('page-next-in');
    }
    if (from === 'previous' && to === 'current') {
      oldPage.removeClass(removeClasses).addClass('page-out');
      newPage.removeClass(removeClasses).addClass('page-previous-in');
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
    const xhrCache = router.xhrCache;
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
        for (let i = 0; i < router.xhrCache.length; i += 1) {
          const cachedUrl = router.xhrCache[i];
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
              router.xhrCache.push({
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
  componentLoader(component, options, proceed, release) {
    const router = this;
    function render(c) {
      const parsed = Component.render(c, {
        $root: router.app.data,
        $route: options.route,
      });
      proceed(router.getPageEl(parsed.html), { pageEvents: parsed.component.on });
    }
    if (typeof component === 'string') {
      // Load via XHR
      Component
        .get(component)
        .then((loadedComponent) => {
          render(loadedComponent);
        })
        .catch(() => {
          release();
        });
    } else {
      render(component);
    }
  }
  getPageData(el, position, route = {}) {
    const router = this;
    const $el = $(el);
    const currentPage = $el[0].f7Page || {};
    const page = {
      app: router.app,
      view: router.view,
      $el,
      el: $el[0],
      name: $el.attr('data-page'),
      position,
      route: currentPage.route ? currentPage.route : route,
    };
    $el[0].f7Page = page;
    return page;
  }
  // Callbacks
  pageCallback(callback, el, position, options = {}) {
    if (!el) return;
    const router = this;
    const $el = $(el);
    const { route, on = {} } = options;

    const camelName = `page${callback[0].toUpperCase() + callback.slice(1, callback.length)}`;
    const colonName = `page:${callback.toLowerCase()}`;
    const callbackName = `${camelName} ${colonName}`;

    let page = {};
    if (callback === 'beforeRemove' && $el[0].f7Page) {
      page = Utils.extend($el[0].f7Page, { position });
    } else {
      page = router.getPageData(el, position, route);
    }

    function attachEvents() {
      if (options.pageEvents) {
        Object.keys(options.pageEvents).forEach((eventName) => {
          $el.on(eventName, () => {
            options.pageEvents[eventName](page);
          });
        });
      }
    }

    if (callback === 'init') {
      if ($el[0].f7PageInitialized) {
        if (on.pageReinit) on.pageReinit(page);
        router.emit('pageReinit page:reinit', page);
        $el.trigger('pageReinit page:reinit', page);
        return;
      }
      attachEvents();
      $el[0].f7PageInitialized = true;
    }
    if (on[camelName]) on[camelName](page);
    router.emit(callbackName, page);
    $el.trigger(callbackName, page);

    if (callback === 'beforeRemove') {
      $el[0].f7Page = null;
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
    let initUrl = router.params.url;
    const documentUrl = document.location.href.split(document.location.origin)[1];
    let historyRestored;
    if (!router.params.pushState) {
      if (!initUrl) {
        initUrl = documentUrl;
      }
    } else {
      // initUrl = documentUrl;
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
    if (router.history.length > 1) {
      // Will load page
      router.currentRoute = router.findMatchingRoute(router.history[0]);
      if (!router.currentRoute) {
        router.currentRoute = Utils.extend(router.findMatchingRoute(router.history[0], true), {
          route: {
            url: router.history[0],
            path: router.history[0].split('?')[0],
          },
        });
      }
    } else {
      // Don't load page
      router.currentRoute = router.findMatchingRoute(initUrl);
      if (!router.currentRoute) {
        router.currentRoute = Utils.extend(router.findMatchingRoute(initUrl, true), {
          route: {
            url: initUrl,
            path: initUrl.split('?')[0],
          },
        });
      }
    }

    router.url = router.currentRoute.url;
    router.path = router.currentRoute.path;

    router.initialPages = [];
    if (router.params.stackPages) {
      router.$pagesEl.find('.page').each((index, page) => {
        router.initialPages.push(page);
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
      router.$pagesEl.find('.page:not(.stacked)').each((index, pageEl) => {
        $(pageEl).addClass('page-current');
        router.pageCallback('init', pageEl, 'current', router.currentRoute);
      });
      if (historyRestored) {
        router.navigate(initUrl, {
          pushState: false,
          history: false,
          animate: router.params.pushStateAnimateOnLoad,
          on: {
            pageAfterIn() {
              if (router.history.length > 2) {
                router.navigateBack({ preload: true });
              }
            },
          },
        });
      } else {
        router.history.push(initUrl);
        router.saveHistory();
      }
    }
  }
}

// Use Events
Use(Router).use(Events);

export default Router;
