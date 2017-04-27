import $ from 'dom7';
import Use from '../utils/use';
import Utils from '../utils/utils';
import Events from '../modules/events';

/*
  url
  content
  name
  el
  component
  template

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
      // App Params
      router.params = app.params.router;
      // App Routes
      router.routes = app.params.routes;
    } else {
      // View Params
      router.params = Utils.extend({}, app.params.router, (view.params.router || {}));
      // View Routes
      router.routes = [].concat(app.params.routes, view.params.routes);
    }
    router.useInstanceModules({
      events: {
        parents: [router.isAppRouter ? app : view],
      },
    });

    // XHR Cache
    router.xhrCache = app.xhrCache;

    router.navigate = function navigate(url, navigateOptions) {
      const options = navigateOptions;
      const route = router.findMatchingRoute(url);
      if (!route) return router;

      return router;
    };
    /*
    Router load, back params:
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
      query: Object,

      Types:
      url
      content
      component
      name
      el
      template
    */
    router.forward = function forward(forwardParams = {}, forwardOptions = {}) {
      const params = forwardParams;
      const options = forwardOptions;
      const { url, content, template, el, name, component } = params;
      const { templateContext, templateContextName } = options;
      const { reloadAll, reloadCurrent, reloadPrevious } = options;
      const { effect, animate } = options;
      const { pushState, ignoreCache, query, force } = options;

      if (content || template) {
        // Parse content/template and add to dom
      }
    };
    router.load = function load(loadParams = {}, loadOptions = {}) {
      const params = loadParams;
      const options = loadOptions;
      const { url, content, template, el, name, component } = params;
      const { ignoreCache } = options;

      if (content || template) {
        router.forward({ content, template, url }, options);
      } else if (el || name) {
        // Load page from specified HTMLElement or by page name in pages container
        router.forward({ el, name, url }, options);
      } else if (component) {
        // Load from component (Vue/React/...)
        router.forward({ component, url }, options);
      } else if (url) {
        // Load using XHR
        if (router.xhr) {
          router.xhr.abort();
          router.xhr = false;
        }
        if (url.indexOf('?') >= 0 && !options.query) {
          options.query = Utils.parseUrlQuery(url);
        }
        router.xhrRequest(url, ignoreCache)
          .then((pageContent) => {
            router.forward({ url, content: pageContent }, options);
          });
      }
    };
    router.back = function back(backParams = {}, backOptions = {}) {
      const params = loadParams;
      const options = backOptions;
    };

    return router;
  }

  findMatchingRoute(url) {
    if (!url) return undefined;
    const routes = this.routes;
    const query = Utils.parseUrlQuery(url);
    const hash = url.split('#')[1];
    const params = {};
    const path = url.split('#')[0].split('?')[0];
    const urlParts = path.split('/').filter((part) => {
      if (part !== '') {
        return true;
      }
      return false;
    });

    let matchingRoute;
    function parseRoute(str) {
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
    routes.forEach((route) => {
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
    let index;
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
        // beforeSend: app.params.onAjaxStart,
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
            // callback(xhr.responseText, false);
          } else {
            reject(xhr);
          }
          // if (app.params.onAjaxComplete) app.params.onAjaxComplete(xhr);
        },
        error(xhr) {
          reject(xhr);
            // if (app.params.onAjaxError) app.params.onAjaxError(xhr);
        },
      });
    });
  }
}

// Use Events
Use(Router).use(Events);

export default Router;
