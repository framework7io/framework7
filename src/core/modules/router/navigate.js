import { getDocument } from 'ssr-window';
import $ from '../../shared/dom7.js';
import { extend, parseUrlQuery } from '../../shared/utils.js';
import History from '../../shared/history.js';
import redirect from './redirect.js';
import processRouteQueue from './process-route-queue.js';
import appRouterCheck from './app-router-check.js';
import asyncComponent from './async-component.js';

function refreshPage(props = {}) {
  const router = this;
  appRouterCheck(router, 'refreshPage');
  return router.navigate(router.currentRoute.url, {
    ignoreCache: true,
    reloadCurrent: true,
    props,
  });
}

function forward(router, el, forwardOptions = {}) {
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
      history: true,
      reloadCurrent: router.params.reloadPages,
      reloadPrevious: false,
      reloadAll: false,
      clearPreviousHistory: false,
      reloadDetail: router.params.reloadDetail,
      on: {},
    },
    forwardOptions,
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
  let otherDetailPageEl;
  let detailsInBetweenRemoved = 0;

  let currentRouteIsModal = router.currentRoute.modal;
  let modalType;
  if (!currentRouteIsModal) {
    'popup popover sheet loginScreen actions customModal panel'
      .split(' ')
      .forEach((modalLoadProp) => {
        if (
          router.currentRoute &&
          router.currentRoute.route &&
          router.currentRoute.route[modalLoadProp]
        ) {
          currentRouteIsModal = true;
          modalType = modalLoadProp;
        }
      });
  }

  if (currentRouteIsModal) {
    const modalToClose =
      router.currentRoute.modal || router.currentRoute.route.modalInstance || app[modalType].get();
    const previousUrl = router.history[router.history.length - 2];
    let previousRoute = router.findMatchingRoute(previousUrl);
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

    router.modalRemove(modalToClose);
  }

  const dynamicNavbar = router.dynamicNavbar;

  const $viewEl = router.$el;
  const $newPage = $el;
  const reload = options.reloadPrevious || options.reloadCurrent || options.reloadAll;
  let $oldPage;

  let $navbarsEl;
  let $newNavbarEl;
  let $oldNavbarEl;

  router.allowPageChange = false;
  if ($newPage.length === 0) {
    router.allowPageChange = true;
    return router;
  }

  if ($newPage.length) {
    // Remove theme elements
    router.removeThemeElements($newPage);
  }

  if (dynamicNavbar) {
    $newNavbarEl = $newPage.children('.navbar');
    $navbarsEl = router.$navbarsEl;
    if ($newNavbarEl.length === 0 && $newPage[0] && $newPage[0].f7Page) {
      // Try from pageData
      $newNavbarEl = $newPage[0].f7Page.$navbarEl;
    }
  }

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
  const $pagesInView = $viewEl.children('.page').filter((pageInView) => pageInView !== $newPage[0]);

  // Navbars In View
  let $navbarsInView;
  if (dynamicNavbar) {
    $navbarsInView = $navbarsEl
      .children('.navbar')
      .filter((navbarInView) => navbarInView !== $newNavbarEl[0]);
  }

  // Exit when reload previous and only 1 page in view so nothing ro reload
  if (options.reloadPrevious && $pagesInView.length < 2) {
    router.allowPageChange = true;
    return router;
  }

  // Find Detail' master page
  let isDetail;
  let reloadDetail;
  let isDetailRoot;
  if (masterDetailEnabled && !options.reloadAll) {
    for (let i = 0; i < $pagesInView.length; i += 1) {
      if (!masterPageEl && $pagesInView[i].classList.contains('page-master')) {
        masterPageEl = $pagesInView[i];
        continue; // eslint-disable-line
      }
    }
    isDetail = !isMaster && masterPageEl;

    if (isDetail) {
      // Find Other Detail
      if (masterPageEl) {
        for (let i = 0; i < $pagesInView.length; i += 1) {
          if ($pagesInView[i].classList.contains('page-master-detail')) {
            otherDetailPageEl = $pagesInView[i];
            continue; // eslint-disable-line
          }
        }
      }
    }
    reloadDetail =
      isDetail &&
      options.reloadDetail &&
      app.width >= router.params.masterDetailBreakpoint &&
      masterPageEl;
  }
  if (isDetail) {
    isDetailRoot = !otherDetailPageEl || reloadDetail || options.reloadAll || options.reloadCurrent;
  }

  // New Page
  let newPagePosition = 'next';
  if (options.reloadCurrent || options.reloadAll || reloadDetail) {
    newPagePosition = 'current';
  } else if (options.reloadPrevious) {
    newPagePosition = 'previous';
  }
  $newPage
    .removeClass('page-previous page-current page-next')
    .addClass(
      `page-${newPagePosition}${isMaster ? ' page-master' : ''}${
        isDetail ? ' page-master-detail' : ''
      }${isDetailRoot ? ' page-master-detail-root' : ''}`,
    )
    .trigger('page:unstack')
    .trigger('page:position', { position: newPagePosition });
  router.emit('pageUnstack', $newPage[0]);
  router.emit('pagePosition', $newPage[0], newPagePosition);

  if (isMaster || isDetail) {
    $newPage.trigger('page:role', { role: isMaster ? 'master' : 'detail', root: !!isDetailRoot });
    router.emit('pageRole', $newPage[0], {
      role: isMaster ? 'master' : 'detail',
      detailRoot: !!isDetailRoot,
    });
  }

  if (dynamicNavbar && $newNavbarEl.length) {
    $newNavbarEl
      .removeClass('navbar-previous navbar-current navbar-next')
      .addClass(
        `navbar-${newPagePosition}${isMaster ? ' navbar-master' : ''}${
          isDetail ? ' navbar-master-detail' : ''
        }${isDetailRoot ? ' navbar-master-detail-root' : ''}`,
      );
    $newNavbarEl.trigger('navbar:position', { position: newPagePosition });
    router.emit('navbarPosition', $newNavbarEl[0], newPagePosition);
    if (isMaster || isDetail) {
      router.emit('navbarRole', $newNavbarEl[0], {
        role: isMaster ? 'master' : 'detail',
        detailRoot: !!isDetailRoot,
      });
    }
  }

  // Find Old Page
  if (options.reloadCurrent || reloadDetail) {
    if (reloadDetail) {
      $oldPage = $pagesInView.filter((pageEl) => !pageEl.classList.contains('page-master'));
      if (dynamicNavbar) {
        $oldNavbarEl = $($oldPage.map((pageEl) => app.navbar.getElByPage(pageEl)));
      }
      if ($oldPage.length > 1 && masterPageEl) {
        detailsInBetweenRemoved = $oldPage.length - 1;
        $(masterPageEl).removeClass('page-master-stacked').trigger('page:masterunstack');
        router.emit('pageMasterUnstack', masterPageEl);
        if (dynamicNavbar) {
          $(app.navbar.getElByPage(masterPageEl)).removeClass('navbar-master-stacked');
          router.emit('navbarMasterUnstack', app.navbar.getElByPage(masterPageEl));
        }
      }
    } else {
      $oldPage = $pagesInView.eq($pagesInView.length - 1);
      if (dynamicNavbar) {
        $oldNavbarEl = $(app.navbar.getElByPage($oldPage));
      }
    }
  } else if (options.reloadPrevious) {
    $oldPage = $pagesInView.eq($pagesInView.length - 2);
    if (dynamicNavbar) {
      // $oldNavbarEl = $navbarsInView.eq($pagesInView.length - 2);
      $oldNavbarEl = $(app.navbar.getElByPage($oldPage));
    }
  } else if (options.reloadAll) {
    $oldPage = $pagesInView.filter((pageEl) => pageEl !== $newPage[0]);
    if (dynamicNavbar) {
      $oldNavbarEl = $navbarsInView.filter((navbarEl) => navbarEl !== $newNavbarEl[0]);
    }
  } else {
    let removedPageEls = [];
    let removedNavbarEls = [];
    if ($pagesInView.length > 1) {
      let i = 0;
      for (i = 0; i < $pagesInView.length - 1; i += 1) {
        if (masterPageEl && $pagesInView[i] === masterPageEl) {
          $pagesInView.eq(i).addClass('page-master-stacked');
          $pagesInView.eq(i).trigger('page:masterstack');
          router.emit('pageMasterStack', $pagesInView[i]);
          if (dynamicNavbar) {
            $(app.navbar.getElByPage(masterPageEl)).addClass('navbar-master-stacked');
            router.emit('navbarMasterStack', app.navbar.getElByPage(masterPageEl));
          }
          continue; // eslint-disable-line
        }
        const oldNavbarEl = app.navbar.getElByPage($pagesInView.eq(i));

        // Page remove event
        removedPageEls.push($pagesInView[i]);
        router.pageCallback(
          'beforeRemove',
          $pagesInView[i],
          $navbarsInView && $navbarsInView[i],
          'previous',
          undefined,
          options,
        );
        router.removePage($pagesInView[i]);
        if (dynamicNavbar && oldNavbarEl) {
          removedNavbarEls.push(oldNavbarEl);
          router.removeNavbar(oldNavbarEl);
        }
      }
    }
    $oldPage = $viewEl
      .children('.page')
      .filter((pageEl) => pageEl !== $newPage[0] && removedPageEls.indexOf(pageEl) < 0);
    if (dynamicNavbar) {
      $oldNavbarEl = $navbarsEl
        .children('.navbar')
        .filter(
          (navbarEl) =>
            navbarEl !== $newNavbarEl[0] && removedNavbarEls.indexOf(removedNavbarEls) < 0,
        );
    }
    removedPageEls = [];
    removedNavbarEls = [];
  }

  if (isDetail && !options.reloadAll) {
    if ($oldPage.length > 1 || reloadDetail) {
      $oldPage = $oldPage.filter((pageEl) => !pageEl.classList.contains('page-master'));
    }
    if ($oldNavbarEl && ($oldNavbarEl.length > 1 || reloadDetail)) {
      $oldNavbarEl = $oldNavbarEl.filter(
        (navbarEl) => !navbarEl.classList.contains('navbar-master'),
      );
    }
  }

  // Push State
  if (
    router.params.browserHistory &&
    (options.browserHistory || options.replaceState) &&
    !options.reloadPrevious
  ) {
    const browserHistoryRoot = router.params.browserHistoryRoot || '';
    History[
      options.reloadCurrent ||
      (reloadDetail && otherDetailPageEl) ||
      options.reloadAll ||
      options.replaceState
        ? 'replace'
        : 'push'
    ](
      view.id,
      {
        url: options.route.url,
      },
      browserHistoryRoot + router.params.browserHistorySeparator + options.route.url,
    );
  }

  if (!options.reloadPrevious) {
    // Current Page & Navbar
    router.currentPageEl = $newPage[0];
    if (dynamicNavbar && $newNavbarEl.length) {
      router.currentNavbarEl = $newNavbarEl[0];
    } else {
      delete router.currentNavbarEl;
    }

    // Current Route
    router.currentRoute = options.route;
  }

  // Update router history
  const url = options.route.url;
  if (options.history) {
    if (
      ((options.reloadCurrent || (reloadDetail && otherDetailPageEl)) && router.history.length) >
        0 ||
      options.replaceState
    ) {
      if (reloadDetail && detailsInBetweenRemoved > 0) {
        router.history = router.history.slice(0, router.history.length - detailsInBetweenRemoved);
        router.propsHistory = router.propsHistory.slice(
          0,
          router.propsHistory.length - detailsInBetweenRemoved,
        );
      }
      router.history[router.history.length - (options.reloadPrevious ? 2 : 1)] = url;
      router.propsHistory[router.propsHistory.length - (options.reloadPrevious ? 2 : 1)] =
        options.props || {};
    } else if (options.reloadPrevious) {
      router.history[router.history.length - 2] = url;
      router.propsHistory[router.propsHistory.length - 2] = options.props || {};
    } else if (options.reloadAll) {
      router.history = [url];
      router.propsHistory = [options.props || {}];
    } else {
      router.history.push(url);
      router.propsHistory.push(options.props || {});
    }
  }
  router.saveHistory();

  // Insert new page and navbar
  const newPageInDom = $newPage.parents(document).length > 0;
  const f7Component = $newPage[0].f7Component;
  if (options.reloadPrevious) {
    if (f7Component && !newPageInDom) {
      f7Component.mount((componentEl) => {
        $(componentEl).insertBefore($oldPage);
      });
    } else {
      $newPage.insertBefore($oldPage);
    }
    if (dynamicNavbar && $newNavbarEl.length) {
      if ($newNavbarEl.find('.title-large').length) {
        $newNavbarEl.addClass('navbar-large');
      }
      if ($oldNavbarEl.length) {
        $newNavbarEl.insertBefore($oldNavbarEl);
      } else {
        if (!router.$navbarsEl.parents(document).length) {
          router.$el.prepend(router.$navbarsEl);
        }
        $navbarsEl.append($newNavbarEl);
      }
    }
  } else {
    if ($oldPage.next('.page')[0] !== $newPage[0]) {
      if (f7Component && !newPageInDom) {
        f7Component.mount((componentEl) => {
          $viewEl.append(componentEl);
        });
      } else {
        $viewEl.append($newPage[0]);
      }
    }
    if (dynamicNavbar && $newNavbarEl.length) {
      if ($newNavbarEl.find('.title-large').length) {
        $newNavbarEl.addClass('navbar-large');
      }
      if (!router.$navbarsEl.parents(document).length) {
        router.$el.prepend(router.$navbarsEl);
      }
      $navbarsEl.append($newNavbarEl[0]);
    }
  }
  if (!newPageInDom) {
    router.pageCallback(
      'mounted',
      $newPage,
      $newNavbarEl,
      newPagePosition,
      reload ? newPagePosition : 'current',
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
      newPagePosition,
      reload ? newPagePosition : 'current',
      options,
      $oldPage,
    );
  }

  // Remove old page
  if ((options.reloadCurrent || reloadDetail) && $oldPage.length > 0) {
    // Page remove event
    router.pageCallback('beforeOut', $oldPage, $oldNavbarEl, 'current', undefined, options);
    router.pageCallback('afterOut', $oldPage, $oldNavbarEl, 'current', undefined, options);
    router.pageCallback('beforeRemove', $oldPage, $oldNavbarEl, 'current', undefined, options);
    router.removePage($oldPage);
    if (dynamicNavbar && $oldNavbarEl && $oldNavbarEl.length) {
      router.removeNavbar($oldNavbarEl);
    }
  } else if (options.reloadAll) {
    $oldPage.each((pageEl, index) => {
      const $oldPageEl = $(pageEl);
      const $oldNavbarElEl = $(app.navbar.getElByPage($oldPageEl));

      // Page remove event
      if ($oldPageEl.hasClass('page-current')) {
        router.pageCallback('beforeOut', $oldPage, $oldNavbarEl, 'current', undefined, options);
        router.pageCallback('afterOut', $oldPage, $oldNavbarEl, 'current', undefined, options);
      }
      router.pageCallback(
        'beforeRemove',
        $oldPageEl,
        $oldNavbarEl && $oldNavbarEl.eq(index),
        'previous',
        undefined,
        options,
      );
      router.removePage($oldPageEl);
      if (dynamicNavbar && $oldNavbarElEl.length) {
        router.removeNavbar($oldNavbarElEl);
      }
    });
  } else if (options.reloadPrevious) {
    // Page remove event
    router.pageCallback('beforeRemove', $oldPage, $oldNavbarEl, 'previous', undefined, options);
    router.removePage($oldPage);
    if (dynamicNavbar && $oldNavbarEl && $oldNavbarEl.length) {
      router.removeNavbar($oldNavbarEl);
    }
  }

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
  if (masterDetailEnabled) {
    view.checkMasterDetailBreakpoint();
  }

  // Page init and before init events
  router.pageCallback(
    'init',
    $newPage,
    $newNavbarEl,
    newPagePosition,
    reload ? newPagePosition : 'current',
    options,
    $oldPage,
  );

  if (options.reloadCurrent || options.reloadAll || reloadDetail) {
    router.allowPageChange = true;
    router.pageCallback('beforeIn', $newPage, $newNavbarEl, newPagePosition, 'current', options);
    $newPage.removeAttr('aria-hidden');
    if (dynamicNavbar && $newNavbarEl) {
      $newNavbarEl.removeAttr('aria-hidden');
    }
    router.pageCallback('afterIn', $newPage, $newNavbarEl, newPagePosition, 'current', options);
    if (options.reloadCurrent && options.clearPreviousHistory) router.clearPreviousHistory();
    if (reloadDetail) {
      router.setPagePosition($(masterPageEl), 'previous');
      if (masterPageEl.f7Page && masterPageEl.f7Page.navbarEl) {
        router.setNavbarPosition($(masterPageEl.f7Page.navbarEl), 'previous');
      }
    }
    return router;
  }
  if (options.reloadPrevious) {
    router.allowPageChange = true;
    return router;
  }

  // Before animation event
  router.pageCallback('beforeOut', $oldPage, $oldNavbarEl, 'current', 'previous', options);
  router.pageCallback('beforeIn', $newPage, $newNavbarEl, 'next', 'current', options);

  // Animation
  function afterAnimation() {
    router.setPagePosition($newPage, 'current', false);
    router.setPagePosition($oldPage, 'previous', !$oldPage.hasClass('page-master'));
    if (dynamicNavbar) {
      router.setNavbarPosition($newNavbarEl, 'current', false);
      router.setNavbarPosition($oldNavbarEl, 'previous', !$oldNavbarEl.hasClass('navbar-master'));
    }
    // After animation event
    router.allowPageChange = true;
    router.pageCallback('afterOut', $oldPage, $oldNavbarEl, 'current', 'previous', options);
    router.pageCallback('afterIn', $newPage, $newNavbarEl, 'next', 'current', options);

    let keepOldPage =
      (router.params.preloadPreviousPage || router.params[`${app.theme}SwipeBack`]) && !isMaster;
    if (!keepOldPage) {
      if (
        $newPage.hasClass('smart-select-page') ||
        $newPage.hasClass('photo-browser-page') ||
        $newPage.hasClass('autocomplete-page') ||
        $newPage.hasClass('color-picker-page')
      ) {
        keepOldPage = true;
      }
    }
    if (!keepOldPage) {
      if (!($newPage.attr('data-name') && $newPage.attr('data-name') === 'smart-select-page')) {
        // Remove event
        router.pageCallback('beforeRemove', $oldPage, $oldNavbarEl, 'previous', undefined, options);
        router.removePage($oldPage);
        if (dynamicNavbar && $oldNavbarEl.length) {
          router.removeNavbar($oldNavbarEl);
        }
      }
    }
    if (options.clearPreviousHistory) router.clearPreviousHistory();
    router.emit('routeChanged', router.currentRoute, router.previousRoute, router);

    if (router.params.browserHistory) {
      History.clearRouterQueue();
    }
  }
  function setPositionClasses() {
    router.setPagePosition($oldPage, 'current', false);
    router.setPagePosition($newPage, 'next', false);
    if (dynamicNavbar) {
      router.setNavbarPosition($oldNavbarEl, 'current', false);
      router.setNavbarPosition($newNavbarEl, 'next', false);
    }
  }
  if (options.animate && !(isMaster && app.width >= router.params.masterDetailBreakpoint)) {
    const delay = router.params[`${router.app.theme}PageLoadDelay`];
    let transition = router.params.transition;
    if (options.transition) transition = options.transition;
    if (!transition && router.currentRoute && router.currentRoute.route) {
      transition = router.currentRoute.route.transition;
    }
    if (!transition && router.currentRoute && router.currentRoute.route.options) {
      transition = router.currentRoute.route.options.transition;
    }
    if (transition) {
      $newPage[0].f7PageTransition = transition;
    }

    if (delay) {
      setTimeout(() => {
        setPositionClasses();
        router.animate(
          $oldPage,
          $newPage,
          $oldNavbarEl,
          $newNavbarEl,
          'forward',
          transition,
          () => {
            afterAnimation();
          },
        );
      }, delay);
    } else {
      setPositionClasses();
      router.animate($oldPage, $newPage, $oldNavbarEl, $newNavbarEl, 'forward', transition, () => {
        afterAnimation();
      });
    }
  } else {
    afterAnimation();
  }
  return router;
}
function load(router, loadParams = {}, loadOptions = {}, ignorePageChange) {
  if (!router.allowPageChange && !ignorePageChange) return router;
  const params = loadParams;
  const options = loadOptions;
  const { url, content, el, pageName, component, componentUrl } = params;

  if (
    !options.reloadCurrent &&
    options.route &&
    options.route.route &&
    options.route.route.parentPath &&
    router.currentRoute.route &&
    router.currentRoute.route.parentPath === options.route.route.parentPath
  ) {
    // Do something nested
    if (options.route.url === router.url) {
      router.allowPageChange = true;
      return false;
    }
    // Check for same params
    let sameParams =
      Object.keys(options.route.params).length === Object.keys(router.currentRoute.params).length;
    if (sameParams) {
      // Check for equal params name
      Object.keys(options.route.params).forEach((paramName) => {
        if (
          !(paramName in router.currentRoute.params) ||
          router.currentRoute.params[paramName] !== options.route.params[paramName]
        ) {
          sameParams = false;
        }
      });
    }
    if (sameParams) {
      if (options.route.route.tab) {
        return router.tabLoad(options.route.route.tab, options);
      }
      return false;
    }
    if (
      !sameParams &&
      options.route.route.tab &&
      router.currentRoute.route.tab &&
      router.currentRoute.parentPath === options.route.parentPath
    ) {
      return router.tabLoad(options.route.route.tab, options);
    }
  }

  if (
    options.route &&
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
    extend(options.route, { route: { url, path: url } });
  }

  // Component Callbacks
  function resolve(pageEl, newOptions) {
    return forward(router, pageEl, extend(options, newOptions));
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
    forward(router, router.getPageEl(content), options);
  } else if (el) {
    // Load page from specified HTMLElement or by page name in pages container
    forward(router, router.getPageEl(el), options);
  } else if (pageName) {
    // Load page by page name in pages container
    forward(router, router.$el.children(`.page[data-name="${pageName}"]`).eq(0), options);
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
        forward(router, router.getPageEl(pageContent), options);
      })
      .catch(() => {
        router.allowPageChange = true;
      });
  }
  return router;
}

function navigate(navigateParams, navigateOptions = {}) {
  const router = this;

  if (router.swipeBackActive) return router;
  let url;
  let createRoute;
  let name;
  let path;
  let query;
  let params;
  let route;
  if (typeof navigateParams === 'string') {
    url = navigateParams;
  } else {
    url = navigateParams.url;
    createRoute = navigateParams.route;
    name = navigateParams.name;
    path = navigateParams.path;
    query = navigateParams.query;
    params = navigateParams.params;
  }
  if (name || path) {
    url = router.generateUrl({ path, name, params, query });
    if (url) {
      return router.navigate(url, navigateOptions);
    }
    return router;
  }
  const app = router.app;
  appRouterCheck(router, 'navigate');
  if (url === '#' || url === '') {
    return router;
  }

  let navigateUrl = url.replace('./', '');
  if (navigateUrl[0] !== '/' && navigateUrl.indexOf('#') !== 0) {
    const currentPath = router.currentRoute.parentPath || router.currentRoute.path;
    navigateUrl = ((currentPath ? `${currentPath}/` : '/') + navigateUrl)
      .replace('///', '/')
      .replace('//', '/');
  }
  if (createRoute) {
    route = extend(router.parseRouteUrl(navigateUrl), {
      route: extend({}, createRoute),
    });
  } else {
    route = router.findMatchingRoute(navigateUrl);
  }

  if (!route) {
    return router;
  }
  if (route.route && route.route.viewName) {
    const anotherViewName = route.route.viewName;
    const anotherView = app.views[anotherViewName];
    if (!anotherView) {
      throw new Error(
        `Framework7: There is no View with "${anotherViewName}" name that was specified in this route`,
      );
    }
    if (anotherView !== router.view) {
      return anotherView.router.navigate(navigateParams, navigateOptions);
    }
  }

  if (route.route.redirect) {
    return redirect.call(router, 'forward', route, navigateOptions);
  }

  const options = {};
  if (route.route.options) {
    extend(options, route.route.options, navigateOptions);
  } else {
    extend(options, navigateOptions);
  }

  if (
    options.openIn &&
    (!router.params.ignoreOpenIn || (router.params.ignoreOpenIn && router.history.length > 0))
  ) {
    return router.openIn(router, navigateUrl, options);
  }

  options.route = route;

  function resolve() {
    let routerLoaded = false;
    'popup popover sheet loginScreen actions customModal panel'
      .split(' ')
      .forEach((modalLoadProp) => {
        if (route.route[modalLoadProp] && !routerLoaded) {
          routerLoaded = true;
          router.modalLoad(modalLoadProp, route, options, 'forward');
        }
      });
    if (route.route.keepAlive && route.route.keepAliveData) {
      load(router, { el: route.route.keepAliveData.pageEl }, options, false);
      routerLoaded = true;
    }
    'url content component pageName el componentUrl'.split(' ').forEach((pageLoadProp) => {
      if (route.route[pageLoadProp] && !routerLoaded) {
        routerLoaded = true;
        load(router, { [pageLoadProp]: route.route[pageLoadProp] }, options, false);
      }
    });
    if (routerLoaded) return;
    // Async
    function asyncResolve(resolveParams, resolveOptions) {
      router.allowPageChange = false;
      let resolvedAsModal = false;

      'popup popover sheet loginScreen actions customModal panel'
        .split(' ')
        .forEach((modalLoadProp) => {
          if (resolveParams[modalLoadProp]) {
            resolvedAsModal = true;
            const modalRoute = extend({}, route, { route: resolveParams });
            router.allowPageChange = true;
            router.modalLoad(modalLoadProp, modalRoute, extend(options, resolveOptions), 'forward');
          }
        });
      if (resolvedAsModal) return;
      load(router, resolveParams, extend(options, resolveOptions), true);
    }
    function asyncReject() {
      router.allowPageChange = true;
    }
    if (route.route.async) {
      router.allowPageChange = false;
      route.route.async.call(router, {
        router,
        to: options.route,
        from: router.currentRoute,
        resolve: asyncResolve,
        reject: asyncReject,
        direction: 'forward',
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

  if (router.params.masterDetailBreakpoint > 0 && route.route.masterRoute) {
    // load detail route
    let preloadMaster = true;
    let masterLoaded = false;
    if (router.currentRoute && router.currentRoute.route) {
      if (
        (router.currentRoute.route.master === true ||
          (typeof router.currentRoute.route.master === 'function' &&
            router.currentRoute.route.master(app, router))) &&
        (router.currentRoute.route === route.route.masterRoute ||
          router.currentRoute.route.path === route.route.masterRoute.path)
      ) {
        preloadMaster = false;
      }
      if (
        router.currentRoute.route.masterRoute &&
        (router.currentRoute.route.masterRoute === route.route.masterRoute ||
          router.currentRoute.route.masterRoute.path === route.route.masterRoute.path)
      ) {
        preloadMaster = false;
        masterLoaded = true;
      }
    }
    if (preloadMaster || (masterLoaded && navigateOptions.reloadAll)) {
      router.navigate(
        { path: route.route.masterRoute.path, params: route.params || {} },
        {
          animate: false,
          reloadAll: navigateOptions.reloadAll,
          reloadCurrent: navigateOptions.reloadCurrent,
          reloadPrevious: navigateOptions.reloadPrevious,
          browserHistory: !navigateOptions.initial,
          history: !navigateOptions.initial,
          once: {
            pageAfterIn() {
              router.navigate(
                navigateParams,
                extend({}, navigateOptions, {
                  animate: false,
                  reloadAll: false,
                  reloadCurrent: false,
                  reloadPrevious: false,
                  history: !navigateOptions.initial,
                  browserHistory: !navigateOptions.initial,
                }),
              );
            },
          },
        },
      );
      return router;
    }
  }

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
    'forward',
  );

  // Return Router
  return router;
}
export { refreshPage, navigate };
