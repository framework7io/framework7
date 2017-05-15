import $ from 'dom7';
import Use from '../../utils/use';
import Utils from '../../utils/utils';
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
  init() {
    const router = this;
    let initUrl;
    if (router.params.url) {
      initUrl = router.params.url;
    } else {
      initUrl = document.location.href.split(document.location.origin)[1];
    }
    if (router.params.pushState && initUrl.indexOf(router.params.pushStateSeparator) >= 0) {
      initUrl = initUrl.split(router.params.pushStateSeparator)[1];
    }

    router.currentRoute = router.findMatchingRoute(initUrl);
    if (!router.currentRoute) {
      router.currentRoute = Utils.extend(router.findMatchingRoute(initUrl, true), {
        route: {
          url: initUrl,
          path: initUrl.split('?')[0],
        },
      });
    }
    router.url = initUrl;
    router.path = router.currentRoute.path;

    router.initialPages = [];
    if (router.params.stackPages) {
      router.$pagesEl.find('.page').each((index, page) => {
        router.initialPages.push(page);
      });
    }

    if (router.$pagesEl.find('.page:not(.stacked)').length === 0 && router.url) {
      router.navigate(initUrl, {
        reloadCurrent: true,
        pushState: false,
      });
    } else {
      router.history.push(router.currentRoute.url);
      router.$pagesEl.find('.page:not(.stacked)').each((index, pageEl) => {
        $(pageEl).addClass('page-current');
        router.pageInitCallback(pageEl, 'current', router.currentRoute);
      });
    }
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
  getPageData(el, position, route = {}, direction) {
    const router = this;
    const $el = $(el);
    const currentPage = $el[0].f7Page || {};
    const page = {
      $el,
      el: $el[0],
      name: $el.attr('data-page'),
      view: router.view,
      position,
      direction,
      route: currentPage.route ? currentPage.route : route,
    };
    $el[0].f7Page = page;
    return page;
  }
  // Callbacks
  pageRemoveCallback(el, position) {
    if (!el) return;
    const router = this;
    const $el = $(el);

    let page = {};
    if ($el[0].f7Page) {
      page = Utils.extend($el[0].f7Page, { position });
    } else {
      page = router.getPageData(el, position);
    }
    // Emit
    router.emit('pageBeforeRemove', page);
    $el.trigger('pageBeforeRemove page:beforeremove', page);
    $el[0].f7Page = null;
    page = null;
  }
  pageInitCallback(el, position, route) {
    if (!el) return;
    const router = this;
    const $el = $(el);

    const page = router.getPageData(el, position, route);

    if ($el[0].f7PageInitialized) {
      router.emit('pageReinit page:reinit', page);
      $el.trigger('pageReinit page:reinit', page);
    }

    // Emit
    router.emit('pageBeforeInit page:beforeinit', page);
    $el.trigger('pageBeforeInit page:beforeinit', page);

    router.emit('pageInit page:init', page);
    $el.trigger('pageInit page:init', page);

    $el[0].f7PageInitialized = true;
  }
  pageBeforeInCallback(el, position, route, direction) {
    if (!el) return;
    const router = this;
    const $el = $(el);

    const page = router.getPageData(el, position, route, direction);

    router.emit('pageBeforeIn page:beforein', page);
    $el.trigger('pageBeforeIn page:beforein', page);
  }
  pageAfterInCallback(el, position, route, direction) {
    if (!el) return;
    const router = this;
    const $el = $(el);

    const page = router.getPageData(el, position, route, direction);

    router.emit('pageAfterIn page:afterin', page);
    $el.trigger('pageAfterIn page:afterin', page);
  }
  pageBeforeStackCallback(el, position, route) {
    if (!el) return;
    const router = this;
    const $el = $(el);

    const page = router.getPageData(el, position, route);

    router.emit('pageBeforeStack page:beforestack', page);
    $el.trigger('pageBeforeStack page:beforestack', page);
  }
  pageAfterStackCallback(el, position, route) {
    if (!el) return;
    const router = this;
    const $el = $(el);

    const page = router.getPageData(el, position, route);

    router.emit('pageAfterStack page:afterstack', page);
    $el.trigger('pageAfterStack page:afterstack', page);
  }
  pageBeforeOutCallback(el, position, route) {
    if (!el) return;
    const router = this;
    const $el = $(el);

    const page = router.getPageData(el, position, route);

    router.emit('pageBeforeOut page:beforeout', page);
    $el.trigger('pageBeforeOut page:beforeout', page);
  }
  pageAfterOutCallback(el, position, route) {
    if (!el) return;
    const router = this;
    const $el = $(el);

    const page = router.getPageData(el, position, route);

    router.emit('pageAfterOut page:afterout', page);
    $el.trigger('pageAfterOut page:afterout', page);
  }
}

// Use Events
Use(Router).use(Events);

export default Router;
