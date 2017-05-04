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

    router.navigate = function navigate(url, navigateOptions) {
      let navigateUrl = url;
      if (navigateUrl[0] !== '/') {
        navigateUrl = ((router.path || '/') + navigateUrl).replace('//', '/');
      }
      const route = router.findMatchingRoute(navigateUrl);
      if (!route) return router;
      const options = Utils.extend(navigateOptions, { route });

      ('url content name el component template').split(' ').forEach((pageLoadProp) => {
        if (route.route[pageLoadProp]) {
          router.load({ [pageLoadProp]: route.route[pageLoadProp] }, options);
        }
      });
      if (route.route.async) {
        route.route.async((loadParams) => {
          router.load(loadParams, options);
        });
      }
      return router;
    };
    /*
    Types:
      url
      content
      component
      name
      el
      template

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

    router.forward = function forward(el, forwardOptions = {}) {
      const options = Utils.extend({
        animate: true,
        pushState: true,
      }, forwardOptions);
      const $newPage = $(el);
      const $pagesEl = router.$pagesEl;
      let $oldPage;

      // New Page
      if (options.reloadCurrent) {
        $newPage.addClass('page-current');
      } else if (options.reloadPrevious) {
        $newPage.addClass('page-previous');
      } else {
        $newPage.addClass('page-next');
      }
      $newPage.removeClass('stacked');

      // Pages In View
      const pagesInView = $pagesEl
        .children('.page:not(.stacked)')
        .filter((index, pageInView) => pageInView !== $newPage[0]);

      // Find Old Page
      if (options.reloadCurrent) {
        $oldPage = pagesInView.eq(pagesInView.length - 1);
      } else if (options.reloadPrevious) {
        $oldPage = pagesInView.eq(pagesInView.length - 2);
      } else {
        if (pagesInView.length > 1) {
          let i = 0;
          for (i = 0; i < pagesInView.length - 2; i += 1) {
            if (router.params.stackPages) {
              pagesInView.eq(i).addClass('stacked');
            } else {
              // Page remove event
              // --- TODO ---
              router.remove(pagesInView[i]);
            }
          }
          if (!router.params.stackPages) {
            // Page remove event
            // --- TODO ---
            router.remove(pagesInView[i]);
          } else {
            pagesInView.eq(i).addClass('stacked');
          }
        }
        $oldPage = $pagesEl
          .children('.page:not(.stacked)')
          .filter((index, page) => page !== $newPage[0]);
      }

      // Push State
      if (router.params.pushState && options.pushState && !options.reloadPrevious) {
        const pushStateRoot = router.params.pushStateRoot || '';
        const method = options.reloadCurrent ? 'replaceState' : 'pushState';

        // if (!isDynamicPage && !pageName) {
        window.history[method]({
          url: options.route.url,
          view: app.views.indexOf(view),
        }, '', pushStateRoot + router.params.pushStateSeparator + options.route.url);
        // }
        // else if (isDynamicPage && content) {
        //   history[method]({content: typeof content === 'string' ? content : '', url: url, viewIndex: app.views.indexOf(view)}, '', pushStateRoot + app.params.pushStateSeparator + url);
        // }
        // else if (pageName) {
        //   history[method]({pageName: pageName, url: url, viewIndex: app.views.indexOf(view)}, '', pushStateRoot + app.params.pushStateSeparator + url);
        // }
      }

      // Update router history
      const url = options.route.url;
      router.url = options.route.url;
      router.path = options.route.path;
      if (options.reloadCurrent) {
        const lastUrl = router.history[router.history.length - (options.reloadPrevious ? 2 : 1)];
        if (lastUrl &&
          lastUrl.indexOf('#') === 0 &&
          lastUrl in router.cache.content &&
          lastUrl !== url &&
          router.history.indexOf(lastUrl) === -1) {
          router.cache.content[lastUrl] = null;
          delete router.cache.content[lastUrl];
        } else if (lastUrl &&
          lastUrl in router.cache.pages &&
          lastUrl !== url &&
          (router.history.indexOf(lastUrl) === -1 || router.history.indexOf(lastUrl) === router.history.length - 1)) {
          router.cache.pages[lastUrl] = null;
          delete router.cache.pages[lastUrl];
        }
        if (lastUrl &&
          lastUrl in router.cache.context &&
          lastUrl !== url &&
          (router.history.indexOf(lastUrl) === -1 || router.history.indexOf(lastUrl) === router.history.length - 1)) {
          router.cache.context[lastUrl] = null;
          delete router.cache.context[lastUrl];
        }
        router.history[router.history.length - (options.reloadPrevious ? 2 : 1)] = url;
      } else {
        router.history.push(url);
      }

      // Unique history
      let historyBecameUnique = false;
      if (router.params.uniqueHistory) {
        let newHistory = router.history;
        let newUrl = url;
        if (router.params.uniqueHistoryIgnoreGetParameters) {
          newHistory = [];
          newUrl = url.split('?')[0];
          for (let i = 0; i < router.history.length; i += 1) {
            newHistory.push(router.history[i].split('?')[0]);
          }
        }

        if (newHistory.indexOf(newUrl) !== newHistory.lastIndexOf(newUrl)) {
          router.history = router.history.slice(0, newHistory.indexOf(newUrl));
          router.history.push(url);
          historyBecameUnique = true;
        }
      }

      // Insert new page
      if (options.reloadPrevious) {
        $newPage.insertBefore($oldPage);
      } else if ($oldPage.next('.page')[0] !== $newPage[0]) {
        $pagesEl.append($newPage[0]);
      }

      // Remove old page
      if (options.reloadCurrent) {
        if (router.params.stackPages && view.initialPages.indexOf($oldPage[0]) >= 0) {
          $oldPage.addClass('stacked');
        } else {
          // Page remove event
          // --- TODO ---
          router.remove($oldPage);
        }
      }

      // Page init and before init events
      // --- TODO ---

      if (options.reloadCurrent) {
        // view.allowPageChange = true;
        // if (historyBecameUnique) view.refreshPreviousPage();
        return;
      }

      // Before animation event
      // --- TODO ---

      // Animation
      function afterAnimation() {
        const pageClasses = 'page-previous page-current page-next page-next-in page-out page-previous-in page-stack';
        $newPage.removeClass(pageClasses).addClass('page-current');
        $oldPage.removeClass(pageClasses).addClass('page-previous');
        // After animation event
        // --- TODO ---

        if (!(view.params.swipeBackPage || router.params.preloadPreviousPage)) {
          if (router.params.stackPages) {
            $oldPage.addClass('stacked');
          } else if (!(url.indexOf('#') === 0 && $newPage.attr('data-page').indexOf('smart-select-') === 0)) {
            // Remove event
            // --- TODO ---
            router.remove($oldPage);
          }
        }
        // if (router.params.uniqueHistory && historyBecameUnique) {
        //     view.refreshPreviousPage();
        // }
      }

      if (options.animate) {
        if (app.theme === 'md' && router.params.mdThemePageLoadDelay) {
          setTimeout(() => {
            router.animatePages($oldPage, $newPage, 'next', 'current');
          }, router.params.mdThemePageLoadDelay);
        } else {
          router.animatePages($oldPage, $newPage, 'next', 'current');
        }
        $newPage.animationEnd(() => {
          afterAnimation($oldPage, $newPage);
        });
      } else {
        afterAnimation($oldPage, $newPage);
      }
    };

    router.load = function load(loadParams = {}, loadOptions = {}) {
      const params = loadParams;
      const options = loadOptions;
      const { url, content, template, el, name, component } = params;
      const { ignoreCache } = options;
      // console.log(params);
      // console.log(options);
      if (!options.route && url) {
        options.route = router.findMatchingRoute(url, true);
      }
      if (content) {
        router.forward(router.getPageEl(content), options);
      } else if (template) {

      } else if (el) {
        // Load page from specified HTMLElement or by page name in pages container
        router.forward(el, options);
      } else if (name) {
        // Load page by page name in pages container
        router.forward(router.$pagesEl.find(`.page[data-page="${name}"]`), options);
      } else if (component) {
        // Load from component (Vue/React/...)
        try {
          router.componentLoader(router, component, options, (pageEl) => {
            router.forward(pageEl, options);
          });
        } catch (err) {
          throw err;
        }
      } else if (url) {
        // Load using XHR
        if (router.xhr) {
          router.xhr.abort();
          router.xhr = false;
        }
        router.xhrRequest(url, ignoreCache)
          .then((pageContent) => {
            router.forward(router.getPageEl(pageContent), options);
          });
      }
      return router;
    };

    router.back = function back(backParams = {}, backOptions = {}) {
      const params = loadParams;
      const options = backOptions;
    };

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

    router.tempDom.innerHTML = content;

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
