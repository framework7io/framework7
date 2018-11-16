import $ from 'dom7';
import { document } from 'ssr-window';
import Utils from '../../utils/utils';
import Device from '../../utils/device';
import History from '../../utils/history';
import redirect from './redirect';
import processRouteQueue from './process-route-queue';

function backward(el, backwardOptions) {
  const router = this;
  const app = router.app;
  const view = router.view;

  const options = Utils.extend({
    animate: router.params.animate,
    pushState: true,
  }, backwardOptions);

  const dynamicNavbar = router.dynamicNavbar;
  const separateNavbar = router.separateNavbar;

  const $newPage = $(el);
  const $oldPage = router.$el.children('.page-current');

  if ($newPage.length) {
    // Remove theme elements
    router.removeThemeElements($newPage);
  }

  let $navbarEl;
  let $newNavbarInner;
  let $oldNavbarInner;

  if (dynamicNavbar) {
    $newNavbarInner = $newPage.children('.navbar').children('.navbar-inner');
    if (separateNavbar) {
      $navbarEl = router.$navbarEl;
      if ($newNavbarInner.length > 0) {
        $newPage.children('.navbar').remove();
      }
      if ($newNavbarInner.length === 0 && $newPage[0] && $newPage[0].f7Page) {
        // Try from pageData
        $newNavbarInner = $newPage[0].f7Page.$navbarEl;
      }
      $oldNavbarInner = $navbarEl.find('.navbar-current');
    } else {
      $oldNavbarInner = $oldPage.children('.navbar').children('.navbar-inner');
    }
  }

  router.allowPageChange = false;
  if ($newPage.length === 0 || $oldPage.length === 0) {
    router.allowPageChange = true;
    return router;
  }

  // Remove theme elements
  router.removeThemeElements($newPage);

  // New Page
  $newPage
    .addClass('page-previous')
    .removeClass('stacked')
    .removeAttr('aria-hidden')
    .trigger('page:unstack')
    .trigger('page:position', { position: 'previous' });

  if (dynamicNavbar && $newNavbarInner.length > 0) {
    $newNavbarInner
      .addClass('navbar-previous')
      .removeClass('stacked')
      .removeAttr('aria-hidden');
  }


  // Remove previous page in case of "forced"
  let backIndex;
  if (options.force) {
    if ($oldPage.prev('.page-previous:not(.stacked)').length > 0 || $oldPage.prev('.page-previous').length === 0) {
      if (router.history.indexOf(options.route.url) >= 0) {
        backIndex = router.history.length - router.history.indexOf(options.route.url) - 1;
        router.history = router.history.slice(0, router.history.indexOf(options.route.url) + 2);
        view.history = router.history;
      } else if (router.history[[router.history.length - 2]]) {
        router.history[router.history.length - 2] = options.route.url;
      } else {
        router.history.unshift(router.url);
      }

      if (backIndex && router.params.stackPages) {
        $oldPage.prevAll('.page-previous').each((index, pageToRemove) => {
          const $pageToRemove = $(pageToRemove);
          let $navbarToRemove;
          if (separateNavbar) {
            // $navbarToRemove = $oldNavbarInner.prevAll('.navbar-previous').eq(index);
            $navbarToRemove = $(app.navbar.getElByPage($pageToRemove));
          }
          if ($pageToRemove[0] !== $newPage[0] && $pageToRemove.index() > $newPage.index()) {
            if (router.initialPages.indexOf($pageToRemove[0]) >= 0) {
              $pageToRemove.addClass('stacked');
              $pageToRemove.trigger('page:stack');
              if (separateNavbar) {
                $navbarToRemove.addClass('stacked');
              }
            } else {
              router.pageCallback('beforeRemove', $pageToRemove, $navbarToRemove, 'previous', undefined, options);
              router.removePage($pageToRemove);
              if (separateNavbar && $navbarToRemove.length > 0) {
                router.removeNavbar($navbarToRemove);
              }
            }
          }
        });
      } else {
        const $pageToRemove = $oldPage.prev('.page-previous:not(.stacked)');
        let $navbarToRemove;
        if (separateNavbar) {
          // $navbarToRemove = $oldNavbarInner.prev('.navbar-inner:not(.stacked)');
          $navbarToRemove = $(app.navbar.getElByPage($pageToRemove));
        }
        if (router.params.stackPages && router.initialPages.indexOf($pageToRemove[0]) >= 0) {
          $pageToRemove.addClass('stacked');
          $pageToRemove.trigger('page:stack');
          $navbarToRemove.addClass('stacked');
        } else if ($pageToRemove.length > 0) {
          router.pageCallback('beforeRemove', $pageToRemove, $navbarToRemove, 'previous', undefined, options);
          router.removePage($pageToRemove);
          if (separateNavbar && $navbarToRemove.length) {
            router.removeNavbar($navbarToRemove);
          }
        }
      }
    }
  }

  // Insert new page
  const newPageInDom = $newPage.parents(document).length > 0;
  const f7Component = $newPage[0].f7Component;

  function insertPage() {
    if ($newPage.next($oldPage).length === 0) {
      if (!newPageInDom && f7Component) {
        f7Component.$mount((componentEl) => {
          $(componentEl).insertBefore($oldPage);
        });
      } else {
        $newPage.insertBefore($oldPage);
      }
    }
    if (separateNavbar && $newNavbarInner.length) {
      $newNavbarInner.insertBefore($oldNavbarInner);
      if ($oldNavbarInner.length > 0) {
        $newNavbarInner.insertBefore($oldNavbarInner);
      } else {
        if (!router.$navbarEl.parents(document).length) {
          router.$el.prepend(router.$navbarEl);
        }
        $navbarEl.append($newNavbarInner);
      }
    }
    if (!newPageInDom) {
      router.pageCallback('mounted', $newPage, $newNavbarInner, 'previous', 'current', options, $oldPage);
    }
  }

  if (options.preload) {
    // Insert Page
    insertPage();
    // Tab route
    if (options.route.route.tab) {
      router.tabLoad(options.route.route.tab, Utils.extend({}, options, {
        history: false,
        pushState: false,
        preload: true,
      }));
    }
    // Page init and before init events
    router.pageCallback('init', $newPage, $newNavbarInner, 'previous', 'current', options, $oldPage);
    if ($newPage.prevAll('.page-previous:not(.stacked)').length > 0) {
      $newPage.prevAll('.page-previous:not(.stacked)').each((index, pageToRemove) => {
        const $pageToRemove = $(pageToRemove);
        let $navbarToRemove;
        if (separateNavbar) {
          // $navbarToRemove = $newNavbarInner.prevAll('.navbar-previous:not(.stacked)').eq(index);
          $navbarToRemove = $(app.navbar.getElByPage($pageToRemove));
        }
        if (router.params.stackPages && router.initialPages.indexOf(pageToRemove) >= 0) {
          $pageToRemove.addClass('stacked');
          $pageToRemove.trigger('page:stack');
          if (separateNavbar) {
            $navbarToRemove.addClass('stacked');
          }
        } else {
          router.pageCallback('beforeRemove', $pageToRemove, $navbarToRemove, 'previous', undefined);
          router.removePage($pageToRemove);
          if (separateNavbar && $navbarToRemove.length) {
            router.removeNavbar($navbarToRemove);
          }
        }
      });
    }
    router.allowPageChange = true;
    return router;
  }

  // History State
  if (!(Device.ie || Device.edge || (Device.firefox && !Device.ios))) {
    if (router.params.pushState && options.pushState) {
      if (backIndex) History.go(-backIndex);
      else History.back();
    }
  }

  // Update History
  if (router.history.length === 1) {
    router.history.unshift(router.url);
  }
  router.history.pop();
  router.saveHistory();

  // Current Page & Navbar
  router.currentPageEl = $newPage[0];
  if (dynamicNavbar && $newNavbarInner.length) {
    router.currentNavbarEl = $newNavbarInner[0];
  } else {
    delete router.currentNavbarEl;
  }

  // Current Route
  router.currentRoute = options.route;

  // History State
  if (Device.ie || Device.edge || (Device.firefox && !Device.ios)) {
    if (router.params.pushState && options.pushState) {
      if (backIndex) History.go(-backIndex);
      else History.back();
    }
  }

  // Insert Page
  insertPage();

  // Load Tab
  if (options.route.route.tab) {
    router.tabLoad(options.route.route.tab, Utils.extend({}, options, {
      history: false,
      pushState: false,
    }));
  }

  // Page init and before init events
  router.pageCallback('init', $newPage, $newNavbarInner, 'previous', 'current', options, $oldPage);

  // Before animation callback
  router.pageCallback('beforeIn', $newPage, $newNavbarInner, 'previous', 'current', options);
  router.pageCallback('beforeOut', $oldPage, $oldNavbarInner, 'current', 'next', options);

  // Animation
  function afterAnimation() {
    // Set classes
    const pageClasses = 'page-previous page-current page-next';
    const navbarClasses = 'navbar-previous navbar-current navbar-next';
    $newPage.removeClass(pageClasses).addClass('page-current').removeAttr('aria-hidden');
    $oldPage.removeClass(pageClasses).addClass('page-next').attr('aria-hidden', 'true');
    if (dynamicNavbar) {
      $newNavbarInner.removeClass(navbarClasses).addClass('navbar-current').removeAttr('aria-hidden');
      $oldNavbarInner.removeClass(navbarClasses).addClass('navbar-next').attr('aria-hidden', 'true');
    }

    // After animation event
    router.pageCallback('afterIn', $newPage, $newNavbarInner, 'previous', 'current', options);
    router.pageCallback('afterOut', $oldPage, $oldNavbarInner, 'current', 'next', options);

    // Remove Old Page
    if (router.params.stackPages && router.initialPages.indexOf($oldPage[0]) >= 0) {
      $oldPage.addClass('stacked');
      $oldPage.trigger('page:stack');
      if (separateNavbar) {
        $oldNavbarInner.addClass('stacked');
      }
    } else {
      router.pageCallback('beforeRemove', $oldPage, $oldNavbarInner, 'next', undefined, options);
      router.removePage($oldPage);
      if (separateNavbar && $oldNavbarInner.length) {
        router.removeNavbar($oldNavbarInner);
      }
    }

    router.allowPageChange = true;
    router.emit('routeChanged', router.currentRoute, router.previousRoute, router);

    // Preload previous page
    const preloadPreviousPage = app.theme === 'ios' ? (router.params.preloadPreviousPage || router.params.iosSwipeBack) : router.params.preloadPreviousPage;
    if (preloadPreviousPage && router.history[router.history.length - 2]) {
      router.back(router.history[router.history.length - 2], { preload: true });
    }
    if (router.params.pushState) {
      History.clearRouterQueue();
    }
  }

  function setPositionClasses() {
    const pageClasses = 'page-previous page-current page-next';
    const navbarClasses = 'navbar-previous navbar-current navbar-next';
    $oldPage.removeClass(pageClasses).addClass('page-current');
    $newPage.removeClass(pageClasses).addClass('page-previous').removeAttr('aria-hidden');
    if (dynamicNavbar) {
      $oldNavbarInner.removeClass(navbarClasses).addClass('navbar-current');
      $newNavbarInner.removeClass(navbarClasses).addClass('navbar-previous').removeAttr('aria-hidden');
    }
  }

  if (options.animate) {
    setPositionClasses();
    router.animate($oldPage, $newPage, $oldNavbarInner, $newNavbarInner, 'backward', () => {
      afterAnimation();
    });
  } else {
    afterAnimation();
  }

  return router;
}
function loadBack(backParams, backOptions, ignorePageChange) {
  const router = this;

  if (!router.allowPageChange && !ignorePageChange) return router;
  const params = backParams;
  const options = backOptions;
  const { url, content, el, pageName, template, templateUrl, component, componentUrl } = params;

  if (
    options.route.url
    && router.url === options.route.url
    && !(options.reloadCurrent || options.reloadPrevious)
    && !router.params.allowDuplicateUrls
  ) {
    return false;
  }

  if (!options.route && url) {
    options.route = router.parseRouteUrl(url);
  }

  // Component Callbacks
  function resolve(pageEl, newOptions) {
    return router.backward(pageEl, Utils.extend(options, newOptions));
  }
  function reject() {
    router.allowPageChange = true;
    return router;
  }

  if (url || templateUrl || componentUrl) {
    router.allowPageChange = false;
  }

  // Proceed
  if (content) {
    router.backward(router.getPageEl(content), options);
  } else if (template || templateUrl) {
    // Parse template and send page element
    try {
      router.pageTemplateLoader(template, templateUrl, options, resolve, reject);
    } catch (err) {
      router.allowPageChange = true;
      throw err;
    }
  } else if (el) {
    // Load page from specified HTMLElement or by page name in pages container
    router.backward(router.getPageEl(el), options);
  } else if (pageName) {
    // Load page by page name in pages container
    router.backward(router.$el.children(`.page[data-name="${pageName}"]`).eq(0), options);
  } else if (component || componentUrl) {
    // Load from component (F7/Vue/React/...)
    try {
      router.pageComponentLoader(router.el, component, componentUrl, options, resolve, reject);
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
    router.xhrRequest(url, options)
      .then((pageContent) => {
        router.backward(router.getPageEl(pageContent), options);
      })
      .catch(() => {
        router.allowPageChange = true;
      });
  }
  return router;
}
function back(...args) {
  const router = this;
  if (router.swipeBackActive) return router;
  let navigateUrl;
  let navigateOptions;
  let route;
  if (typeof args[0] === 'object') {
    navigateOptions = args[0] || {};
  } else {
    navigateUrl = args[0];
    navigateOptions = args[1] || {};
  }

  const { name, params, query } = navigateOptions;
  if (name) {
    // find route by name
    route = router.findRouteByKey('name', name);
    if (!route) {
      throw new Error(`Framework7: route with name "${name}" not found`);
    }
    navigateUrl = router.constructRouteUrl(route, { params, query });
    if (navigateUrl) {
      return router.back(navigateUrl, Utils.extend({}, navigateOptions, {
        name: null,
        params: null,
        query: null,
      }));
    }
    throw new Error(`Framework7: can't construct URL for route with name "${name}"`);
  }

  const app = router.app;
  if (!router.view) {
    app.views.main.router.back(...args);
    return router;
  }

  let currentRouteIsModal = router.currentRoute.modal;
  let modalType;
  if (!currentRouteIsModal) {
    ('popup popover sheet loginScreen actions customModal panel').split(' ').forEach((modalLoadProp) => {
      if (router.currentRoute.route[modalLoadProp]) {
        currentRouteIsModal = true;
        modalType = modalLoadProp;
      }
    });
  }
  if (currentRouteIsModal) {
    const modalToClose = router.currentRoute.modal
                         || router.currentRoute.route.modalInstance
                         || app[modalType].get();
    const previousUrl = router.history[router.history.length - 2];
    let previousRoute;
    // check if previous route is modal too
    if (modalToClose && modalToClose.$el) {
      const prevOpenedModals = modalToClose.$el.prevAll('.modal-in');
      if (prevOpenedModals.length && prevOpenedModals[0].f7Modal) {
        previousRoute = prevOpenedModals[0].f7Modal.route;
      }
    }
    if (!previousRoute) {
      previousRoute = router.findMatchingRoute(previousUrl);
    }

    if (!previousRoute && previousUrl) {
      previousRoute = {
        url: previousUrl,
        path: previousUrl.split('?')[0],
        query: Utils.parseUrlQuery(previousUrl),
        route: {
          path: previousUrl.split('?')[0],
          url: previousUrl,
        },
      };
    }
    if (!previousRoute || !modalToClose) {
      return router;
    }
    if (router.params.pushState && navigateOptions.pushState !== false) {
      History.back();
    }
    router.currentRoute = previousRoute;
    router.history.pop();
    router.saveHistory();
    router.modalRemove(modalToClose);
    return router;
  }
  const $previousPage = router.$el.children('.page-current').prevAll('.page-previous').eq(0);
  if (!navigateOptions.force && $previousPage.length > 0) {
    if (router.params.pushState
      && $previousPage[0].f7Page
      && router.history[router.history.length - 2] !== $previousPage[0].f7Page.route.url
    ) {
      router.back(
        router.history[router.history.length - 2],
        Utils.extend(navigateOptions, { force: true })
      );
      return router;
    }

    const previousPageRoute = $previousPage[0].f7Page.route;
    processRouteQueue.call(
      router,
      previousPageRoute,
      router.currentRoute,
      () => {
        router.loadBack({ el: $previousPage }, Utils.extend(navigateOptions, {
          route: previousPageRoute,
        }));
      },
      () => {}
    );

    return router;
  }

  // Navigate URL
  if (navigateUrl === '#') {
    navigateUrl = undefined;
  }
  if (navigateUrl && navigateUrl[0] !== '/' && navigateUrl.indexOf('#') !== 0) {
    navigateUrl = ((router.path || '/') + navigateUrl).replace('//', '/');
  }
  if (!navigateUrl && router.history.length > 1) {
    navigateUrl = router.history[router.history.length - 2];
  }

  // Find route to load
  route = router.findMatchingRoute(navigateUrl);
  if (!route) {
    if (navigateUrl) {
      route = {
        url: navigateUrl,
        path: navigateUrl.split('?')[0],
        query: Utils.parseUrlQuery(navigateUrl),
        route: {
          path: navigateUrl.split('?')[0],
          url: navigateUrl,
        },
      };
    }
  }
  if (!route) {
    return router;
  }

  if (route.route.redirect) {
    return redirect.call(router, 'back', route, navigateOptions);
  }

  const options = {};
  if (route.route.options) {
    Utils.extend(options, route.route.options, navigateOptions, { route });
  } else {
    Utils.extend(options, navigateOptions, { route });
  }

  if (options && options.context) {
    route.context = options.context;
    options.route.context = options.context;
  }

  let backForceLoaded;
  if (options.force && router.params.stackPages) {
    router.$el.children('.page-previous.stacked').each((index, pageEl) => {
      if (pageEl.f7Page && pageEl.f7Page.route && pageEl.f7Page.route.url === route.url) {
        backForceLoaded = true;
        router.loadBack({ el: pageEl }, options);
      }
    });
    if (backForceLoaded) {
      return router;
    }
  }
  function resolve() {
    let routerLoaded = false;
    ('url content component pageName el componentUrl template templateUrl').split(' ').forEach((pageLoadProp) => {
      if (route.route[pageLoadProp] && !routerLoaded) {
        routerLoaded = true;
        router.loadBack({ [pageLoadProp]: route.route[pageLoadProp] }, options);
      }
    });
    if (routerLoaded) return;
    // Async
    function asyncResolve(resolveParams, resolveOptions) {
      router.allowPageChange = false;
      if (resolveOptions && resolveOptions.context) {
        if (!route.context) route.context = resolveOptions.context;
        else route.context = Utils.extend({}, route.context, resolveOptions.context);
        options.route.context = route.context;
      }
      router.loadBack(resolveParams, Utils.extend(options, resolveOptions), true);
    }
    function asyncReject() {
      router.allowPageChange = true;
    }
    if (route.route.async) {
      router.allowPageChange = false;

      route.route.async.call(router, route, router.currentRoute, asyncResolve, asyncReject);
    }
  }
  function reject() {
    router.allowPageChange = true;
  }

  if (options.preload) {
    resolve();
  } else {
    processRouteQueue.call(
      router,
      route,
      router.currentRoute,
      () => {
        if (route.route.modules) {
          app
            .loadModules(Array.isArray(route.route.modules) ? route.route.modules : [route.route.modules])
            .then(() => {
              resolve();
            })
            .catch(() => {
              reject();
            });
        } else {
          resolve();
        }
      },
      () => {
        reject();
      },
    );
  }

  // Return Router
  return router;
}
export { backward, loadBack, back };
