import { getDocument } from 'ssr-window';
import $ from '../../shared/dom7.js';
import { extend, parseUrlQuery } from '../../shared/utils.js';
import { getDevice } from '../../shared/get-device.js';
import History from '../../shared/history.js';
import redirect from './redirect.js';
import processRouteQueue from './process-route-queue.js';
import appRouterCheck from './app-router-check.js';
import asyncComponent from './async-component.js';

function backward(router, el, backwardOptions) {
  const device = getDevice();
  const document = getDocument();
  const $el = $(el);
  const app = router.app;
  const view = router.view;

  const options = extend(
    false,
    {
      animate: router.params.animate,
      browserHistory: true,
      replaceState: false,
    },
    backwardOptions,
  );

  const masterDetailEnabled = router.params.masterDetailBreakpoint > 0;
  const isMaster =
    masterDetailEnabled &&
    options.route &&
    options.route.route &&
    (options.route.route.master === true ||
      (typeof options.route.route.master === 'function' &&
        options.route.route.master(app, router)));
  let masterPageEl;
  let masterPageRemoved;

  const dynamicNavbar = router.dynamicNavbar;

  const $newPage = $el;
  const $oldPage = router.$el.children('.page-current');
  const initialPreload = $oldPage.length === 0 && options.preload;
  const currentIsMaster = masterDetailEnabled && $oldPage.hasClass('page-master');

  if ($newPage.length) {
    // Remove theme elements
    router.removeThemeElements($newPage);
  }

  let $navbarsEl;
  let $newNavbarEl;
  let $oldNavbarEl;

  if (dynamicNavbar) {
    $newNavbarEl = $newPage.children('.navbar');
    $navbarsEl = router.$navbarsEl;
    if ($newNavbarEl.length === 0 && $newPage[0] && $newPage[0].f7Page) {
      // Try from pageData
      $newNavbarEl = $newPage[0].f7Page.$navbarEl;
    }
    $oldNavbarEl = $navbarsEl.find('.navbar-current');
  }

  router.allowPageChange = false;
  if ($newPage.length === 0 || ($oldPage.length === 0 && !options.preload)) {
    router.allowPageChange = true;
    return router;
  }

  // Remove theme elements
  router.removeThemeElements($newPage);

  // Save Keep Alive Cache
  if (
    options.route &&
    options.route.route &&
    options.route.route.keepAlive &&
    !options.route.route.keepAliveData
  ) {
    options.route.route.keepAliveData = {
      pageEl: $el[0],
    };
  }

  // Pages In View
  let isDetail;
  let isDetailRoot;
  if (masterDetailEnabled) {
    const $pagesInView = router.$el
      .children('.page')
      .filter((pageInView) => pageInView !== $newPage[0]);

    // Find Detail' master page
    for (let i = 0; i < $pagesInView.length; i += 1) {
      if (!masterPageEl && $pagesInView[i].classList.contains('page-master')) {
        masterPageEl = $pagesInView[i];
        continue; // eslint-disable-line
      }
    }

    isDetail =
      !isMaster &&
      masterPageEl &&
      router.history.indexOf(options.route.url) >
        router.history.indexOf(masterPageEl.f7Page.route.url);

    if (
      !isDetail &&
      !isMaster &&
      masterPageEl &&
      masterPageEl.f7Page &&
      options.route.route.masterRoute
    ) {
      isDetail = options.route.route.masterRoute.path === masterPageEl.f7Page.route.route.path;
    }
  }
  if (isDetail && masterPageEl && masterPageEl.f7Page) {
    isDetailRoot =
      router.history.indexOf(options.route.url) -
        router.history.indexOf(masterPageEl.f7Page.route.url) ===
      1;
  }

  // New Page
  $newPage
    .addClass(
      `page-${initialPreload ? 'current' : 'previous'}${isMaster ? ' page-master' : ''}${
        isDetail ? ' page-master-detail' : ''
      }${isDetailRoot ? ' page-master-detail-root' : ''}`,
    )
    .removeAttr('aria-hidden')
    .trigger('page:unstack')
    .trigger('page:position', { position: initialPreload ? 'current' : 'previous' });
  router.emit('pageUnstack', $newPage[0]);
  router.emit('pagePosition', $newPage[0], initialPreload ? 'current' : 'previous');
  if (isMaster || isDetail) {
    $newPage.trigger('page:role', { role: isMaster ? 'master' : 'detail', root: !!isDetailRoot });
    router.emit('pageRole', $newPage[0], {
      role: isMaster ? 'master' : 'detail',
      detailRoot: !!isDetailRoot,
    });
  }

  if (dynamicNavbar && $newNavbarEl.length > 0) {
    $newNavbarEl
      .addClass(
        `navbar-${initialPreload ? 'current' : 'previous'}${isMaster ? ' navbar-master' : ''}${
          isDetail ? ' navbar-master-detail' : ''
        }${isDetailRoot ? ' navbar-master-detail-root' : ''}`,
      )
      .removeAttr('aria-hidden');
    $newNavbarEl.trigger('navbar:position', { position: initialPreload ? 'current' : 'previous' });
    router.emit('navbarPosition', $newNavbarEl[0], initialPreload ? 'current' : 'previous');
    if (isMaster || isDetailRoot) {
      router.emit('navbarRole', $newNavbarEl[0], {
        role: isMaster ? 'master' : 'detail',
        detailRoot: !!isDetailRoot,
      });
    }
  }

  // Remove previous page in case of "forced"
  let backIndex;
  if (options.force) {
    if ($oldPage.prev('.page-previous').length >= 0) {
      if (router.history.indexOf(options.route.url) >= 0) {
        backIndex = router.history.length - router.history.indexOf(options.route.url) - 1;
        router.history = router.history.slice(0, router.history.indexOf(options.route.url) + 2);
        router.propsHistory = router.propsHistory.slice(
          0,
          router.history.indexOf(options.route.url) + 2,
        );
        view.history = router.history;
      } else if (router.history[[router.history.length - 2]]) {
        router.propsHistory[router.propsHistory.length - 2] = options.props || {};
      } else {
        router.history.unshift(router.url);
        router.propsHistory.unshift(options.props || {});
      }

      const $pageToRemove = $oldPage.prev('.page-previous');
      let $navbarToRemove;
      if (dynamicNavbar) {
        $navbarToRemove = $(app.navbar.getElByPage($pageToRemove));
      }
      if ($pageToRemove.length > 0) {
        router.pageCallback(
          'beforeRemove',
          $pageToRemove,
          $navbarToRemove,
          'previous',
          undefined,
          options,
        );
        if ($pageToRemove[0] === masterPageEl) {
          masterPageRemoved = true;
        }
        router.removePage($pageToRemove);
        if (dynamicNavbar && $navbarToRemove.length) {
          router.removeNavbar($navbarToRemove);
        }
      }
    }
  }

  // Insert new page
  const newPageInDom = $newPage.parents(document).length > 0;
  const f7Component = $newPage[0].f7Component;

  function insertPage() {
    if (initialPreload) {
      if (!newPageInDom && f7Component) {
        f7Component.mount((componentEl) => {
          router.$el.append(componentEl);
        });
      } else {
        router.$el.append($newPage);
      }
    }
    if ($newPage.next($oldPage).length === 0) {
      if (!newPageInDom && f7Component) {
        f7Component.mount((componentEl) => {
          $(componentEl).insertBefore($oldPage);
        });
      } else {
        $newPage.insertBefore($oldPage);
      }
    }
    if (dynamicNavbar && $newNavbarEl.length) {
      if ($newNavbarEl.find('.title-large').length) {
        $newNavbarEl.addClass('navbar-large');
      }
      $newNavbarEl.insertBefore($oldNavbarEl);
      if ($oldNavbarEl.length > 0) {
        $newNavbarEl.insertBefore($oldNavbarEl);
      } else {
        if (!router.$navbarsEl.parents(document).length) {
          router.$el.prepend(router.$navbarsEl);
        }
        $navbarsEl.append($newNavbarEl);
      }
    }
    if (!newPageInDom) {
      router.pageCallback(
        'mounted',
        $newPage,
        $newNavbarEl,
        'previous',
        'current',
        options,
        $oldPage,
      );
    } else if (
      options.route &&
      options.route.route &&
      options.route.route.keepAlive &&
      !$newPage[0].f7PageMounted
    ) {
      $newPage[0].f7PageMounted = true;
      router.pageCallback(
        'mounted',
        $newPage,
        $newNavbarEl,
        'previous',
        'current',
        options,
        $oldPage,
      );
    }
  }

  if (options.preload) {
    // Insert Page
    insertPage();
    // Tab route
    if (options.route.route.tab) {
      router.tabLoad(
        options.route.route.tab,
        extend({}, options, {
          history: false,
          browserHistory: false,
          preload: true,
        }),
      );
    }
    if (isMaster) {
      $newPage.removeClass('page-master-stacked').trigger('page:masterunstack');
      router.emit('pageMasterUnstack', $newPage[0]);
      if (dynamicNavbar) {
        $(app.navbar.getElByPage($newPage)).removeClass('navbar-master-stacked');
        router.emit('navbarMasterUnstack', app.navbar.getElByPage($newPage));
      }
    }
    // Page init and before init events
    router.pageCallback('init', $newPage, $newNavbarEl, 'previous', 'current', options, $oldPage);
    if (initialPreload) {
      router.pageCallback('beforeIn', $newPage, $newNavbarEl, 'current', undefined, options);
      router.pageCallback('afterIn', $newPage, $newNavbarEl, 'current', undefined, options);
    }
    const $previousPages = $newPage.prevAll('.page-previous:not(.page-master)');
    if ($previousPages.length > 0) {
      $previousPages.each((pageToRemove) => {
        const $pageToRemove = $(pageToRemove);
        let $navbarToRemove;
        if (dynamicNavbar) {
          $navbarToRemove = $(app.navbar.getElByPage($pageToRemove));
        }

        router.pageCallback('beforeRemove', $pageToRemove, $navbarToRemove, 'previous', undefined);
        router.removePage($pageToRemove);
        if (dynamicNavbar && $navbarToRemove.length) {
          router.removeNavbar($navbarToRemove);
        }
      });
    }
    router.allowPageChange = true;
    return router;
  }

  // History State
  if (!(device.ie || device.edge || (device.firefox && !device.ios))) {
    if (router.params.browserHistory && options.browserHistory) {
      if (options.replaceState) {
        const browserHistoryRoot = router.params.browserHistoryRoot || '';
        History.replace(
          view.id,
          {
            url: options.route.url,
          },
          browserHistoryRoot + router.params.browserHistorySeparator + options.route.url,
        );
      } else if (backIndex) {
        History.go(-backIndex);
      } else {
        History.back();
      }
    }
  }

  // Update History
  if (options.replaceState) {
    router.history[router.history.length - 1] = options.route.url;
    router.propsHistory[router.propsHistory.length - 1] = options.props || {};
  } else {
    if (router.history.length === 1) {
      router.history.unshift(router.url);
      router.propsHistory.unshift(options.props || {});
    }
    router.history.pop();
    router.propsHistory.pop();
  }
  router.saveHistory();

  // Current Page & Navbar
  router.currentPageEl = $newPage[0];
  if (dynamicNavbar && $newNavbarEl.length) {
    router.currentNavbarEl = $newNavbarEl[0];
  } else {
    delete router.currentNavbarEl;
  }

  // Current Route
  router.currentRoute = options.route;

  // History State
  if (device.ie || device.edge || (device.firefox && !device.ios)) {
    if (router.params.browserHistory && options.browserHistory) {
      if (options.replaceState) {
        const browserHistoryRoot = router.params.browserHistoryRoot || '';
        History.replace(
          view.id,
          {
            url: options.route.url,
          },
          browserHistoryRoot + router.params.browserHistorySeparator + options.route.url,
        );
      } else if (backIndex) {
        History.go(-backIndex);
      } else {
        History.back();
      }
    }
  }

  // Insert Page
  insertPage();

  // Load Tab
  if (options.route.route.tab) {
    router.tabLoad(
      options.route.route.tab,
      extend({}, options, {
        history: false,
        browserHistory: false,
      }),
    );
  }

  // Check master detail

  if (masterDetailEnabled && (currentIsMaster || masterPageRemoved)) {
    view.checkMasterDetailBreakpoint(false);
  }

  // Page init and before init events
  router.pageCallback('init', $newPage, $newNavbarEl, 'previous', 'current', options, $oldPage);

  // Before animation callback
  router.pageCallback('beforeOut', $oldPage, $oldNavbarEl, 'current', 'next', options);
  router.pageCallback('beforeIn', $newPage, $newNavbarEl, 'previous', 'current', options);

  // Animation
  function afterAnimation() {
    // Set classes
    router.setPagePosition($newPage, 'current', false);
    router.setPagePosition($oldPage, 'next', true);
    if (dynamicNavbar) {
      router.setNavbarPosition($newNavbarEl, 'current', false);
      router.setNavbarPosition($oldNavbarEl, 'next', true);
    }

    // After animation event
    router.pageCallback('afterOut', $oldPage, $oldNavbarEl, 'current', 'next', options);
    router.pageCallback('afterIn', $newPage, $newNavbarEl, 'previous', 'current', options);

    // Remove Old Page

    router.pageCallback('beforeRemove', $oldPage, $oldNavbarEl, 'next', undefined, options);
    router.removePage($oldPage);
    if (dynamicNavbar && $oldNavbarEl.length) {
      router.removeNavbar($oldNavbarEl);
    }

    router.allowPageChange = true;
    router.emit('routeChanged', router.currentRoute, router.previousRoute, router);

    // Preload previous page
    const preloadPreviousPage =
      router.params.preloadPreviousPage || router.params[`${app.theme}SwipeBack`];
    if (preloadPreviousPage && router.history[router.history.length - 2] && !isMaster) {
      router.back(router.history[router.history.length - 2], {
        preload: true,
        props: router.propsHistory[router.propsHistory.length - 2] || {},
      });
    }
    if (router.params.browserHistory) {
      History.clearRouterQueue();
    }
  }

  function setPositionClasses() {
    router.setPagePosition($oldPage, 'current');
    router.setPagePosition($newPage, 'previous', false);
    if (dynamicNavbar) {
      router.setNavbarPosition($oldNavbarEl, 'current');
      router.setNavbarPosition($newNavbarEl, 'previous', false);
    }
  }

  if (options.animate && !(currentIsMaster && app.width >= router.params.masterDetailBreakpoint)) {
    let transition = router.params.transition;
    if ($oldPage[0] && $oldPage[0].f7PageTransition) {
      transition = $oldPage[0].f7PageTransition;
      delete $oldPage[0].f7PageTransition;
    }
    if (options.transition) transition = options.transition;
    if (!transition && router.previousRoute && router.previousRoute.route) {
      transition = router.previousRoute.route.transition;
    }
    if (
      !transition &&
      router.previousRoute &&
      router.previousRoute.route &&
      router.previousRoute.route.options
    ) {
      transition = router.previousRoute.route.options.transition;
    }
    setPositionClasses();
    router.animate($oldPage, $newPage, $oldNavbarEl, $newNavbarEl, 'backward', transition, () => {
      afterAnimation();
    });
  } else {
    afterAnimation();
  }

  return router;
}
function loadBack(router, backParams, backOptions, ignorePageChange) {
  if (!router.allowPageChange && !ignorePageChange) return router;
  const params = backParams;
  const options = backOptions;
  const { url, content, el, pageName, component, componentUrl } = params;

  if (
    options.route.url &&
    router.url === options.route.url &&
    !(options.reloadCurrent || options.reloadPrevious) &&
    !router.params.allowDuplicateUrls
  ) {
    router.allowPageChange = true;
    return false;
  }

  if (!options.route && url) {
    options.route = router.parseRouteUrl(url);
  }

  // Component Callbacks
  function resolve(pageEl, newOptions) {
    return backward(router, pageEl, extend(options, newOptions));
  }
  function reject() {
    router.allowPageChange = true;
    return router;
  }

  if (url || componentUrl || component) {
    router.allowPageChange = false;
  }

  // Proceed
  if (content) {
    backward(router, router.getPageEl(content), options);
  } else if (el) {
    // Load page from specified HTMLElement or by page name in pages container
    backward(router, router.getPageEl(el), options);
  } else if (pageName) {
    // Load page by page name in pages container
    backward(router, router.$el.children(`.page[data-name="${pageName}"]`).eq(0), options);
  } else if (component || componentUrl) {
    // Load from component (F7/Vue/React/...)
    try {
      router.pageComponentLoader({
        routerEl: router.el,
        component,
        componentUrl,
        options,
        resolve,
        reject,
      });
    } catch (err) {
      router.allowPageChange = true;
      throw err;
    }
  } else if (url) {
    // Load using XHR
    if (router.xhrAbortController) {
      router.xhrAbortController.abort();
      router.xhrAbortController = false;
    }
    router
      .xhrRequest(url, options)
      .then((pageContent) => {
        backward(router, router.getPageEl(pageContent), options);
      })
      .catch(() => {
        router.allowPageChange = true;
      });
  }
  return router;
}
function back(...args) {
  const router = this;
  const device = getDevice();
  if (router.swipeBackActive) return router;
  let navigateUrl;
  let navigateOptions;
  let navigateProps;
  let route;
  if (typeof args[0] === 'object') {
    navigateOptions = args[0] || {};
  } else {
    navigateUrl = args[0];
    navigateOptions = args[1] || {};
  }

  const { name, params, query } = navigateOptions;
  if (name) {
    navigateUrl = router.generateUrl({ name, params, query });
    if (navigateUrl) {
      return router.back(
        navigateUrl,
        extend({}, navigateOptions, {
          name: null,
          params: null,
          query: null,
        }),
      );
    }
    return router;
  }

  const app = router.app;
  appRouterCheck(router, 'back');

  let currentRouteIsModal = router.currentRoute.modal;
  let modalType;
  if (!currentRouteIsModal) {
    'popup popover sheet loginScreen actions customModal panel'
      .split(' ')
      .forEach((modalLoadProp) => {
        if (router.currentRoute.route[modalLoadProp]) {
          currentRouteIsModal = true;
          modalType = modalLoadProp;
        }
      });
  }
  if (currentRouteIsModal && !navigateOptions.preload) {
    const modalToClose =
      router.currentRoute.modal || router.currentRoute.route.modalInstance || app[modalType].get();
    const previousUrl = router.history[router.history.length - 2];
    let previousRoute;
    // check if previous route is modal too
    if (modalToClose && modalToClose.$el) {
      const prevOpenedModals = modalToClose.$el.prevAll('.modal-in');
      if (prevOpenedModals.length && prevOpenedModals[0].f7Modal) {
        const modalEl = prevOpenedModals[0];
        // check if current router not inside of the modalEl
        if (!router.$el.parents(modalEl).length) {
          previousRoute = modalEl.f7Modal.route;
        }
      }
    }
    if (!previousRoute) {
      previousRoute = router.findMatchingRoute(previousUrl);
    }

    if (!previousRoute && previousUrl) {
      previousRoute = {
        url: previousUrl,
        path: previousUrl.split('?')[0],
        query: parseUrlQuery(previousUrl),
        route: {
          path: previousUrl.split('?')[0],
          url: previousUrl,
        },
      };
    }
    if (!navigateUrl || navigateUrl.replace(/[# ]/g, '').trim().length === 0) {
      if (!previousRoute || !modalToClose) {
        return router;
      }
    }
    const forceOtherUrl = navigateOptions.force && previousRoute && navigateUrl;
    if (previousRoute && modalToClose) {
      const isBrokenBrowserHistory = device.ie || device.edge || (device.firefox && !device.ios);
      const needHistoryBack =
        router.params.browserHistory && navigateOptions.browserHistory !== false;
      const currentRouteWithoutBrowserHistory =
        router.currentRoute &&
        router.currentRoute.route &&
        router.currentRoute.route.options &&
        router.currentRoute.route.options.browserHistory === false;
      if (needHistoryBack && !isBrokenBrowserHistory && !currentRouteWithoutBrowserHistory) {
        History.back();
      }
      router.currentRoute = previousRoute;
      router.history.pop();
      router.propsHistory.pop();
      router.saveHistory();

      if (needHistoryBack && isBrokenBrowserHistory && !currentRouteWithoutBrowserHistory) {
        History.back();
      }

      router.modalRemove(modalToClose);
      if (forceOtherUrl) {
        router.navigate(navigateUrl, { reloadCurrent: true });
      }
    } else if (modalToClose) {
      router.modalRemove(modalToClose);
      if (navigateUrl) {
        router.navigate(navigateUrl, { reloadCurrent: true });
      }
    }
    return router;
  }
  let $previousPage = router.$el
    .children('.page-current')
    .prevAll('.page-previous:not(.page-master)')
    .eq(0);

  let skipMaster;
  if (router.params.masterDetailBreakpoint > 0) {
    const classes = [];
    router.$el.children('.page').each((pageEl) => {
      classes.push(pageEl.className);
    });

    const $previousMaster = router.$el.children('.page-current').prevAll('.page-master').eq(0);
    if ($previousMaster.length) {
      const expectedPreviousPageUrl = router.history[router.history.length - 2];
      const expectedPreviousPageRoute = router.findMatchingRoute(expectedPreviousPageUrl);
      if (
        expectedPreviousPageRoute &&
        $previousMaster[0].f7Page &&
        expectedPreviousPageRoute.route === $previousMaster[0].f7Page.route.route
      ) {
        $previousPage = $previousMaster;
        if (!navigateOptions.preload) {
          skipMaster = app.width >= router.params.masterDetailBreakpoint;
        }
      }
    }
  }

  if (!navigateOptions.force && $previousPage.length && !skipMaster) {
    if (
      router.params.browserHistory &&
      $previousPage[0].f7Page &&
      router.history[router.history.length - 2] !== $previousPage[0].f7Page.route.url
    ) {
      router.back(
        router.history[router.history.length - 2],
        extend(navigateOptions, {
          force: true,
          props: router.propsHistory[router.propsHistory.length - 2] || {},
        }),
      );
      return router;
    }
    const previousPageRoute = $previousPage[0].f7Page.route;

    processRouteQueue.call(
      router,
      previousPageRoute,
      router.currentRoute,
      () => {
        loadBack(
          router,
          { el: $previousPage },
          extend(navigateOptions, {
            route: previousPageRoute,
          }),
        );
      },
      () => {},
      'backward',
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
    navigateProps = router.propsHistory[router.propsHistory.length - 2] || {};
  }
  if (skipMaster && !navigateOptions.force && router.history[router.history.length - 3]) {
    return router.back(
      router.history[router.history.length - 3],
      extend({}, navigateOptions || {}, {
        force: true,
        animate: false,
        props: router.propsHistory[router.propsHistory.length - 3] || {},
      }),
    );
  }
  if (skipMaster && !navigateOptions.force) {
    return router;
  }

  // Find route to load
  route = router.findMatchingRoute(navigateUrl);
  if (!route) {
    if (navigateUrl) {
      route = {
        url: navigateUrl,
        path: navigateUrl.split('?')[0],
        query: parseUrlQuery(navigateUrl),
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
    return redirect.call(router, 'backward', route, navigateOptions);
  }

  const options = {};
  if (route.route.options) {
    extend(options, route.route.options, navigateOptions, { props: navigateProps || {} });
  } else {
    extend(options, navigateOptions, { props: navigateProps || {} });
  }
  options.route = route;

  function resolve() {
    let routerLoaded = false;
    if (route.route.keepAlive && route.route.keepAliveData) {
      loadBack(router, { el: route.route.keepAliveData.pageEl }, options);
      routerLoaded = true;
    }
    'url content component pageName el componentUrl'.split(' ').forEach((pageLoadProp) => {
      if (route.route[pageLoadProp] && !routerLoaded) {
        routerLoaded = true;
        loadBack(router, { [pageLoadProp]: route.route[pageLoadProp] }, options);
      }
    });
    if (routerLoaded) return;
    // Async
    function asyncResolve(resolveParams, resolveOptions) {
      router.allowPageChange = false;
      loadBack(router, resolveParams, extend(options, resolveOptions), true);
    }
    function asyncReject() {
      router.allowPageChange = true;
    }
    if (route.route.async) {
      router.allowPageChange = false;
      route.route.async.call(router, {
        router,
        to: route,
        from: router.currentRoute,
        resolve: asyncResolve,
        reject: asyncReject,
        direction: 'backward',
        app,
      });
    }
    if (route.route.asyncComponent) {
      asyncComponent(router, route.route.asyncComponent, asyncResolve, asyncReject);
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
            .loadModules(
              Array.isArray(route.route.modules) ? route.route.modules : [route.route.modules],
            )
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
      'backward',
    );
  }

  // Return Router
  return router;
}
export { back };
