import $ from 'dom7';
import { document } from 'ssr-window';
import Utils from '../../utils/utils';
import History from '../../utils/history';
import redirect from './redirect';
import processRouteQueue from './process-route-queue';
import appRouterCheck from './app-router-check';
import asyncComponent from './async-component';

function refreshPage() {
  const router = this;
  appRouterCheck(router, 'refreshPage');
  return router.navigate(router.currentRoute.url, {
    ignoreCache: true,
    reloadCurrent: true,
  });
}

function forward(el, forwardOptions = {}) {
  const router = this;
  const $el = $(el);
  const app = router.app;
  const view = router.view;
  const options = Utils.extend(false, {
    animate: router.params.animate,
    pushState: true,
    replaceState: false,
    history: true,
    reloadCurrent: router.params.reloadPages,
    reloadPrevious: false,
    reloadAll: false,
    clearPreviousHistory: false,
    reloadDetail: router.params.reloadDetail,
    on: {},
  }, forwardOptions);

  const masterDetailEnabled = router.params.masterDetailBreakpoint > 0;
  const isMaster = masterDetailEnabled && options.route && options.route.route && options.route.route.master === true;
  let masterPageEl;
  let otherDetailPageEl;

  let currentRouteIsModal = router.currentRoute.modal;
  let modalType;
  if (!currentRouteIsModal) {
    ('popup popover sheet loginScreen actions customModal panel').split(' ').forEach((modalLoadProp) => {
      if (router.currentRoute && router.currentRoute.route && router.currentRoute.route[modalLoadProp]) {
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
    let previousRoute = router.findMatchingRoute(previousUrl);
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
  if (options.route && options.route.route && options.route.route.keepAlive && !options.route.route.keepAliveData) {
    options.route.route.keepAliveData = {
      pageEl: $el[0],
    };
  }

  // Pages In View
  const $pagesInView = $viewEl
    .children('.page:not(.stacked)')
    .filter((index, pageInView) => pageInView !== $newPage[0]);

  // Navbars In View
  let $navbarsInView;
  if (dynamicNavbar) {
    $navbarsInView = $navbarsEl
      .children('.navbar:not(.stacked)')
      .filter((index, navbarInView) => navbarInView !== $newNavbarEl[0]);
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
      if (!masterPageEl
        && $pagesInView[i].classList.contains('page-master')
      ) {
        masterPageEl = $pagesInView[i];
        continue; // eslint-disable-line
      }
    }
    isDetail = !isMaster && masterPageEl;

    if (isDetail) {
      // Find Other Detail
      if (masterPageEl) {
        for (let i = 0; i < $pagesInView.length; i += 1) {
          if ($pagesInView[i].classList.contains('page-master-detail')
          ) {
            otherDetailPageEl = $pagesInView[i];
            continue; // eslint-disable-line
          }
        }
      }
    }
    reloadDetail = isDetail && options.reloadDetail && app.width >= router.params.masterDetailBreakpoint && masterPageEl;
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
    .addClass(`page-${newPagePosition}${isMaster ? ' page-master' : ''}${isDetail ? ' page-master-detail' : ''}${isDetailRoot ? ' page-master-detail-root' : ''}`)
    .removeClass('stacked')
    .trigger('page:unstack')
    .trigger('page:position', { position: newPagePosition });
  router.emit('pageUnstack', $newPage[0]);
  router.emit('pagePosition', $newPage[0], newPagePosition);

  if (isMaster || isDetail) {
    $newPage.trigger('page:role', { role: isMaster ? 'master' : 'detail', root: !!isDetailRoot });
    router.emit('pageRole', $newPage[0], { role: isMaster ? 'master' : 'detail', detailRoot: !!isDetailRoot });
  }

  if (dynamicNavbar && $newNavbarEl.length) {
    $newNavbarEl
      .removeClass('navbar-previous navbar-current navbar-next')
      .addClass(`navbar-${newPagePosition}${isMaster ? ' navbar-master' : ''}${isDetail ? ' navbar-master-detail' : ''}${isDetailRoot ? ' navbar-master-detail-root' : ''}`)
      .removeClass('stacked');
  }

  // Find Old Page
  if (options.reloadCurrent || reloadDetail) {
    $oldPage = $pagesInView.eq($pagesInView.length - 1);
    if (dynamicNavbar) {
      // $oldNavbarEl = $navbarsInView.eq($pagesInView.length - 1);
      $oldNavbarEl = $(app.navbar.getElByPage($oldPage));
    }
  } else if (options.reloadPrevious) {
    $oldPage = $pagesInView.eq($pagesInView.length - 2);
    if (dynamicNavbar) {
      // $oldNavbarEl = $navbarsInView.eq($pagesInView.length - 2);
      $oldNavbarEl = $(app.navbar.getElByPage($oldPage));
    }
  } else if (options.reloadAll) {
    $oldPage = $pagesInView.filter((index, pageEl) => pageEl !== $newPage[0]);
    if (dynamicNavbar) {
      $oldNavbarEl = $navbarsInView.filter((index, navbarEl) => navbarEl !== $newNavbarEl[0]);
    }
  } else {
    if ($pagesInView.length > 1) {
      let i = 0;
      for (i = 0; i < $pagesInView.length - 1; i += 1) {
        if (masterPageEl
          && $pagesInView[i] === masterPageEl
        ) {
          $pagesInView.eq(i).addClass('page-master-stacked');
          $pagesInView.eq(i).trigger('page:masterstack');
          router.emit('pageMasterStack', $pagesInView[i]);
          if (dynamicNavbar) {
            $(app.navbar.getElByPage(masterPageEl)).addClass('navbar-master-stacked');
          }
          continue; // eslint-disable-line
        }
        const oldNavbarEl = app.navbar.getElByPage($pagesInView.eq(i));
        if (router.params.stackPages) {
          $pagesInView.eq(i).addClass('stacked');
          $pagesInView.eq(i).trigger('page:stack');
          router.emit('pageStack', $pagesInView[i]);
          if (dynamicNavbar) {
            $(oldNavbarEl).addClass('stacked');
          }
        } else {
          // Page remove event
          router.pageCallback('beforeRemove', $pagesInView[i], $navbarsInView && $navbarsInView[i], 'previous', undefined, options);
          router.removePage($pagesInView[i]);
          if (dynamicNavbar && oldNavbarEl) {
            router.removeNavbar(oldNavbarEl);
          }
        }
      }
    }
    $oldPage = $viewEl
      .children('.page:not(.stacked)')
      .filter((index, page) => page !== $newPage[0]);
    if (dynamicNavbar) {
      $oldNavbarEl = $navbarsEl
        .children('.navbar:not(.stacked)')
        .filter((index, navbarEl) => navbarEl !== $newNavbarEl[0]);
    }
  }

  if (isDetail && !options.reloadAll) {
    if ($oldPage.length > 1 || reloadDetail) {
      $oldPage = $oldPage.filter((pageIndex, pageEl) => !pageEl.classList.contains('page-master'));
    }
    if ($oldNavbarEl && ($oldNavbarEl.length > 1 || reloadDetail)) {
      $oldNavbarEl = $oldNavbarEl.filter((navbarIndex, navbarEl) => !navbarEl.classList.contains('navbar-master'));
    }
  }

  // Push State
  if (router.params.pushState && (options.pushState || options.replaceState) && !options.reloadPrevious) {
    const pushStateRoot = router.params.pushStateRoot || '';
    History[options.reloadCurrent || (reloadDetail && otherDetailPageEl) || options.reloadAll || options.replaceState ? 'replace' : 'push'](
      view.id,
      {
        url: options.route.url,
      },
      pushStateRoot + router.params.pushStateSeparator + options.route.url
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
    if (((options.reloadCurrent || (reloadDetail && otherDetailPageEl)) && router.history.length) > 0 || options.replaceState) {
      router.history[router.history.length - (options.reloadPrevious ? 2 : 1)] = url;
    } else if (options.reloadPrevious) {
      router.history[router.history.length - 2] = url;
    } else if (options.reloadAll) {
      router.history = [url];
    } else {
      router.history.push(url);
    }
  }
  router.saveHistory();

  // Insert new page and navbar
  const newPageInDom = $newPage.parents(document).length > 0;
  const f7Component = $newPage[0].f7Component;
  if (options.reloadPrevious) {
    if (f7Component && !newPageInDom) {
      f7Component.$mount((componentEl) => {
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
        f7Component.$mount((componentEl) => {
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
    router.pageCallback('mounted', $newPage, $newNavbarEl, newPagePosition, (reload ? newPagePosition : 'current'), options, $oldPage);
  } else if (options.route && options.route.route && options.route.route.keepAlive && !$newPage[0].f7PageMounted) {
    $newPage[0].f7PageMounted = true;
    router.pageCallback('mounted', $newPage, $newNavbarEl, newPagePosition, (reload ? newPagePosition : 'current'), options, $oldPage);
  }

  // Remove old page
  if ((options.reloadCurrent || reloadDetail) && $oldPage.length > 0) {
    if (router.params.stackPages && router.initialPages.indexOf($oldPage[0]) >= 0) {
      $oldPage.addClass('stacked');
      $oldPage.trigger('page:stack');
      router.emit('pageStack', $oldPage[0]);
      if (dynamicNavbar) {
        $oldNavbarEl.addClass('stacked');
      }
    } else {
      // Page remove event
      router.pageCallback('beforeOut', $oldPage, $oldNavbarEl, 'current', undefined, options);
      router.pageCallback('afterOut', $oldPage, $oldNavbarEl, 'current', undefined, options);
      router.pageCallback('beforeRemove', $oldPage, $oldNavbarEl, 'current', undefined, options);
      router.removePage($oldPage);
      if (dynamicNavbar && $oldNavbarEl && $oldNavbarEl.length) {
        router.removeNavbar($oldNavbarEl);
      }
    }
  } else if (options.reloadAll) {
    $oldPage.each((index, pageEl) => {
      const $oldPageEl = $(pageEl);
      const $oldNavbarElEl = $(app.navbar.getElByPage($oldPageEl));
      if (router.params.stackPages && router.initialPages.indexOf($oldPageEl[0]) >= 0) {
        $oldPageEl.addClass('stacked');
        $oldPageEl.trigger('page:stack');
        router.emit('pageStack', $oldPageEl[0]);
        if (dynamicNavbar) {
          $oldNavbarElEl.addClass('stacked');
        }
      } else {
        // Page remove event
        if ($oldPageEl.hasClass('page-current')) {
          router.pageCallback('beforeOut', $oldPage, $oldNavbarEl, 'current', undefined, options);
          router.pageCallback('afterOut', $oldPage, $oldNavbarEl, 'current', undefined, options);
        }
        router.pageCallback('beforeRemove', $oldPageEl, $oldNavbarEl && $oldNavbarEl.eq(index), 'previous', undefined, options);
        router.removePage($oldPageEl);
        if (dynamicNavbar && $oldNavbarElEl.length) {
          router.removeNavbar($oldNavbarElEl);
        }
      }
    });
  } else if (options.reloadPrevious) {
    if (router.params.stackPages && router.initialPages.indexOf($oldPage[0]) >= 0) {
      $oldPage.addClass('stacked');
      $oldPage.trigger('page:stack');
      router.emit('pageStack', $oldPage[0]);
      if (dynamicNavbar) {
        $oldNavbarEl.addClass('stacked');
      }
    } else {
      // Page remove event
      router.pageCallback('beforeRemove', $oldPage, $oldNavbarEl, 'previous', undefined, options);
      router.removePage($oldPage);
      if (dynamicNavbar && $oldNavbarEl && $oldNavbarEl.length) {
        router.removeNavbar($oldNavbarEl);
      }
    }
  }

  // Load Tab
  if (options.route.route.tab) {
    router.tabLoad(options.route.route.tab, Utils.extend({}, options, {
      history: false,
      pushState: false,
    }));
  }

  // Check master detail
  if (masterDetailEnabled) {
    view.checkMasterDetailBreakpoint();
  }

  // Page init and before init events
  router.pageCallback('init', $newPage, $newNavbarEl, newPagePosition, reload ? newPagePosition : 'current', options, $oldPage);

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
      masterPageEl.classList.add('page-previous');
      masterPageEl.classList.remove('page-current');
      $(masterPageEl).trigger('page:position', { position: 'previous' });
      router.emit('pagePosition', masterPageEl, 'previous');

      if (masterPageEl.f7Page && masterPageEl.f7Page.navbarEl) {
        masterPageEl.f7Page.navbarEl.classList.add('navbar-previous');
        masterPageEl.f7Page.navbarEl.classList.remove('navbar-current');
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
    const pageClasses = 'page-previous page-current page-next';
    const navbarClasses = 'navbar-previous navbar-current navbar-next';
    $newPage.removeClass(pageClasses).addClass('page-current').removeAttr('aria-hidden').trigger('page:position', { position: 'current' });
    router.emit('pagePosition', $newPage[0], 'current');
    $oldPage.removeClass(pageClasses).addClass('page-previous').trigger('page:position', { position: 'previous' });
    router.emit('pagePosition', $oldPage[0], 'previous');

    if (!$oldPage.hasClass('page-master')) {
      $oldPage.attr('aria-hidden', 'true');
    }
    if (dynamicNavbar) {
      $newNavbarEl.removeClass(navbarClasses).addClass('navbar-current').removeAttr('aria-hidden');
      $oldNavbarEl.removeClass(navbarClasses).addClass('navbar-previous');
      if (!$oldNavbarEl.hasClass('navbar-master')) {
        $oldNavbarEl.attr('aria-hidden', 'true');
      }
    }
    // After animation event
    router.allowPageChange = true;
    router.pageCallback('afterOut', $oldPage, $oldNavbarEl, 'current', 'previous', options);
    router.pageCallback('afterIn', $newPage, $newNavbarEl, 'next', 'current', options);

    let keepOldPage = (router.params.preloadPreviousPage || router.params[`${app.theme}SwipeBack`]) && !isMaster;
    if (!keepOldPage) {
      if ($newPage.hasClass('smart-select-page') || $newPage.hasClass('photo-browser-page') || $newPage.hasClass('autocomplete-page') || $newPage.hasClass('color-picker-page')) {
        keepOldPage = true;
      }
    }
    if (!keepOldPage) {
      if (router.params.stackPages) {
        $oldPage.addClass('stacked');
        $oldPage.trigger('page:stack');
        router.emit('pageStack', $oldPage[0]);
        if (dynamicNavbar) {
          $oldNavbarEl.addClass('stacked');
        }
      } else if (!($newPage.attr('data-name') && $newPage.attr('data-name') === 'smart-select-page')) {
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

    if (router.params.pushState) {
      History.clearRouterQueue();
    }
  }
  function setPositionClasses() {
    const pageClasses = 'page-previous page-current page-next';
    const navbarClasses = 'navbar-previous navbar-current navbar-next';
    $oldPage.removeClass(pageClasses).addClass('page-current').removeAttr('aria-hidden').trigger('page:position', { position: 'current' });
    router.emit('pagePosition', $oldPage[0], 'current');
    $newPage.removeClass(pageClasses).addClass('page-next').removeAttr('aria-hidden').trigger('page:position', { position: 'next' });
    router.emit('pagePosition', $newPage[0], 'next');
    if (dynamicNavbar) {
      $oldNavbarEl.removeClass(navbarClasses).addClass('navbar-current').removeAttr('aria-hidden');
      $newNavbarEl.removeClass(navbarClasses).addClass('navbar-next').removeAttr('aria-hidden');
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
        router.animate($oldPage, $newPage, $oldNavbarEl, $newNavbarEl, 'forward', transition, () => {
          afterAnimation();
        });
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
function load(loadParams = {}, loadOptions = {}, ignorePageChange) {
  const router = this;
  if (!router.allowPageChange && !ignorePageChange) return router;
  const params = loadParams;
  const options = loadOptions;
  const { url, content, el, pageName, template, templateUrl, component, componentUrl } = params;

  if (!options.reloadCurrent
    && options.route
    && options.route.route
    && options.route.route.parentPath
    && router.currentRoute.route
    && router.currentRoute.route.parentPath === options.route.route.parentPath) {
    // Do something nested
    if (options.route.url === router.url) {
      router.allowPageChange = true;
      return false;
    }
    // Check for same params
    let sameParams = Object.keys(options.route.params).length === Object.keys(router.currentRoute.params).length;
    if (sameParams) {
      // Check for equal params name
      Object.keys(options.route.params).forEach((paramName) => {
        if (
          !(paramName in router.currentRoute.params)
          || (router.currentRoute.params[paramName] !== options.route.params[paramName])
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
    if (!sameParams
      && options.route.route.tab
      && router.currentRoute.route.tab
      && router.currentRoute.parentPath === options.route.parentPath
    ) {
      return router.tabLoad(options.route.route.tab, options);
    }
  }

  if (
    options.route
    && options.route.url
    && router.url === options.route.url
    && !(options.reloadCurrent || options.reloadPrevious)
    && !router.params.allowDuplicateUrls
  ) {
    router.allowPageChange = true;
    return false;
  }

  if (!options.route && url) {
    options.route = router.parseRouteUrl(url);
    Utils.extend(options.route, { route: { url, path: url } });
  }

  // Component Callbacks
  function resolve(pageEl, newOptions) {
    return router.forward(pageEl, Utils.extend(options, newOptions));
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
    router.forward(router.getPageEl(content), options);
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
    router.forward(router.getPageEl(el), options);
  } else if (pageName) {
    // Load page by page name in pages container
    router.forward(router.$el.children(`.page[data-name="${pageName}"]`).eq(0), options);
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
        router.forward(router.getPageEl(pageContent), options);
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
  let query;
  let params;
  let route;
  if (typeof navigateParams === 'string') {
    url = navigateParams;
  } else {
    url = navigateParams.url;
    createRoute = navigateParams.route;
    name = navigateParams.name;
    query = navigateParams.query;
    params = navigateParams.params;
  }
  if (name) {
    // find route by name
    route = router.findRouteByKey('name', name);
    if (!route) {
      throw new Error(`Framework7: route with name "${name}" not found`);
    }
    url = router.constructRouteUrl(route, { params, query });
    if (url) {
      return router.navigate(url, navigateOptions);
    }
    throw new Error(`Framework7: can't construct URL for route with name "${name}"`);
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
    route = Utils.extend(router.parseRouteUrl(navigateUrl), {
      route: Utils.extend({}, createRoute),
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
      throw new Error(`Framework7: There is no View with "${anotherViewName}" name that was specified in this route`);
    }
    if (anotherView !== router.view) {
      return anotherView.router.navigate(navigateParams, navigateOptions);
    }
  }

  if (route.route.redirect) {
    return redirect.call(router, 'navigate', route, navigateOptions);
  }


  const options = {};
  if (route.route.options) {
    Utils.extend(options, route.route.options, navigateOptions);
  } else {
    Utils.extend(options, navigateOptions);
  }
  options.route = route;

  if (options && options.context) {
    route.context = options.context;
    options.route.context = options.context;
  }

  function resolve() {
    let routerLoaded = false;
    ('popup popover sheet loginScreen actions customModal panel').split(' ').forEach((modalLoadProp) => {
      if (route.route[modalLoadProp] && !routerLoaded) {
        routerLoaded = true;
        router.modalLoad(modalLoadProp, route, options);
      }
    });
    if (route.route.keepAlive && route.route.keepAliveData) {
      router.load({ el: route.route.keepAliveData.pageEl }, options, false);
      routerLoaded = true;
    }
    ('url content component pageName el componentUrl template templateUrl').split(' ').forEach((pageLoadProp) => {
      if (route.route[pageLoadProp] && !routerLoaded) {
        routerLoaded = true;
        router.load({ [pageLoadProp]: route.route[pageLoadProp] }, options, false);
      }
    });
    if (routerLoaded) return;
    // Async
    function asyncResolve(resolveParams, resolveOptions) {
      router.allowPageChange = false;
      let resolvedAsModal = false;
      if (resolveOptions && resolveOptions.context) {
        if (!route.context) route.context = resolveOptions.context;
        else route.context = Utils.extend({}, route.context, resolveOptions.context);
        options.route.context = route.context;
      }
      ('popup popover sheet loginScreen actions customModal panel').split(' ').forEach((modalLoadProp) => {
        if (resolveParams[modalLoadProp]) {
          resolvedAsModal = true;
          const modalRoute = Utils.extend({}, route, { route: resolveParams });
          router.allowPageChange = true;
          router.modalLoad(modalLoadProp, modalRoute, Utils.extend(options, resolveOptions));
        }
      });
      if (resolvedAsModal) return;
      router.load(resolveParams, Utils.extend(options, resolveOptions), true);
    }
    function asyncReject() {
      router.allowPageChange = true;
    }
    if (route.route.async) {
      router.allowPageChange = false;
      route.route.async.call(router, options.route, router.currentRoute, asyncResolve, asyncReject);
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
        router.currentRoute.route.master
        && (
          router.currentRoute.route === route.route.masterRoute
          || router.currentRoute.route.path === route.route.masterRoute.path
        )
      ) {
        preloadMaster = false;
      }
      if (
        router.currentRoute.route.masterRoute
        && (router.currentRoute.route.masterRoute === route.route.masterRoute
          || router.currentRoute.route.masterRoute.path === route.route.masterRoute.path
        )
      ) {
        preloadMaster = false;
        masterLoaded = true;
      }
    }
    if (preloadMaster || (masterLoaded && navigateOptions.reloadAll)) {
      router.navigate(route.route.masterRoute.path, {
        animate: false,
        reloadAll: navigateOptions.reloadAll,
        reloadCurrent: navigateOptions.reloadCurrent,
        reloadPrevious: navigateOptions.reloadPrevious,
        pushState: !navigateOptions.initial,
        history: !navigateOptions.initial,
        once: {
          pageAfterIn() {
            router.navigate(navigateParams, Utils.extend({}, navigateOptions, {
              animate: false,
              reloadAll: false,
              reloadCurrent: false,
              reloadPrevious: false,
              history: !navigateOptions.initial,
              pushState: !navigateOptions.initial,
            }));
          },
        },
      });
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

  // Return Router
  return router;
}
export { refreshPage, forward, load, navigate };
