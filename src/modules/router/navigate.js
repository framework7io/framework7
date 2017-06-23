import $ from 'dom7';
import Utils from '../../utils/utils';
import History from '../../utils/history';

function forward(el, forwardOptions = {}) {
  const router = this;
  const view = router.view;

  const options = Utils.extend({
    animate: router.params.animate,
    pushState: true,
    history: true,
    reloadCurrent: router.params.reloadPages,
    on: {},
  }, forwardOptions);

  const dynamicNavbar = router.dynamicNavbar;
  const separateNavbar = router.separateNavbar;

  const $viewEl = router.$el;
  const $newPage = $(el);
  const reload = options.reloadPrevious || options.reloadCurrent || options.reloadAll;
  let $oldPage;

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
      if ($newNavbarInner.length === 0 && $newPage[0].f7Page) {
        // Try from pageData
        $newNavbarInner = $newPage[0].f7Page.$navbarEl;
      }
    }
  }

  router.allowPageChange = false;
  if ($newPage.length === 0) {
    router.allowPageChange = true;
    return router;
  }
  // Remove theme elements
  router.removeThemeElements($newPage);

  // Pages In View
  const $pagesInView = $viewEl
    .children('.page:not(.stacked)')
    .filter((index, pageInView) => pageInView !== $newPage[0]);

  // Navbars In View
  let $navbarsInView;
  if (separateNavbar) {
    $navbarsInView = $navbarEl
      .children('.navbar-inner:not(.stacked)')
      .filter((index, navbarInView) => navbarInView !== $newNavbarInner[0]);
  }

  // Exit when reload previous and only 1 page in view so nothing ro reload
  if (options.reloadPrevious && $pagesInView.length < 2) {
    router.allowPageChange = true;
    return router;
  }

  // New Page
  let newPagePosition = 'next';
  if (options.reloadCurrent || options.reloadAll) {
    newPagePosition = 'current';
  } else if (options.reloadPrevious) {
    newPagePosition = 'previous';
  }
  $newPage
    .addClass(`page-${newPagePosition}`)
    .removeClass('stacked');

  if (dynamicNavbar) {
    $newNavbarInner
      .addClass(`navbar-${newPagePosition}`)
      .removeClass('stacked');
  }

  // Find Old Page
  if (options.reloadCurrent) {
    $oldPage = $pagesInView.eq($pagesInView.length - 1);
    if (separateNavbar) {
      $oldNavbarInner = $navbarsInView.eq($pagesInView.length - 1);
    }
  } else if (options.reloadPrevious) {
    $oldPage = $pagesInView.eq($pagesInView.length - 2);
    if (separateNavbar) {
      $oldNavbarInner = $navbarsInView.eq($pagesInView.length - 2);
    }
  } else if (options.reloadAll) {
    $oldPage = $pagesInView.filter((index, pageEl) => pageEl !== $newPage[0]);
    if (separateNavbar) {
      $oldNavbarInner = $navbarsInView.filter((index, navbarEl) => navbarEl !== $newNavbarInner[0]);
    }
  } else {
    if ($pagesInView.length > 1) {
      let i = 0;
      for (i = 0; i < $pagesInView.length - 1; i += 1) {
        if (router.params.stackPages) {
          $pagesInView.eq(i).addClass('stacked');
          if (separateNavbar) {
            $navbarsInView.eq(i).addClass('stacked');
          }
        } else {
          // Page remove event
          router.pageCallback('beforeRemove', $pagesInView[i], $navbarsInView && $navbarsInView[i], 'previous', undefined, options);
          router.remove($pagesInView[i]);
          if (separateNavbar) {
            router.remove($navbarsInView[i]);
          }
        }
      }
    }
    $oldPage = $viewEl
      .children('.page:not(.stacked)')
      .filter((index, page) => page !== $newPage[0]);
    if (separateNavbar) {
      $oldNavbarInner = $navbarEl
        .children('.navbar-inner:not(.stacked)')
        .filter((index, navbarInner) => navbarInner !== $newNavbarInner[0]);
    }
  }
  if (dynamicNavbar && !separateNavbar) {
    $oldNavbarInner = $oldPage.children('.navbar').children('.navbar-inner');
  }

  // Push State
  if (router.params.pushState && options.pushState && !options.reloadPrevious) {
    const pushStateRoot = router.params.pushStateRoot || '';
    History[options.reloadCurrent || options.reloadAll ? 'replace' : 'push'](
      {
        url: options.route.url,
        viewIndex: view.index,
      },
      pushStateRoot + router.params.pushStateSeparator + options.route.url);
  }

  // Update router history
  const url = options.route.url;
  router.url = options.route.url;
  if (options.history) {
    if (options.reloadCurrent && router.history.length > 0) {
      router.history[router.history.length - (options.reloadPrevious ? 2 : 1)] = url;
    } else if (options.reloadAll) {
      router.history = [url];
    } else {
      router.history.push(url);
    }
  }
  router.saveHistory();

  // Current Route
  router.currentRoute = options.route;
  router.currentPage = $newPage[0];

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
    if (separateNavbar) {
      $newNavbarInner.insertBefore($oldNavbarInner);
    }
  } else if ($oldPage.next('.page')[0] !== $newPage[0]) {
    if (f7Component && !newPageInDom) {
      f7Component.mount((componentEl) => {
        $viewEl.append(componentEl);
      });
    } else {
      $viewEl.append($newPage[0]);
    }
    if (separateNavbar) {
      $navbarEl.append($newNavbarInner[0]);
    }
  }
  if (!newPageInDom) {
    router.pageCallback('mounted', $newPage, $newNavbarInner, newPagePosition, reload ? newPagePosition : 'current', options);
  }

  // Remove old page
  if (options.reloadCurrent && $oldPage.length > 0) {
    if (router.params.stackPages && router.initialPages.indexOf($oldPage[0]) >= 0) {
      $oldPage.addClass('stacked');
      if (separateNavbar) {
        $newNavbarInner.addClass('stacked');
      }
    } else {
      // Page remove event
      router.pageCallback('beforeRemove', $oldPage, $newNavbarInner, 'previous', undefined, options);
      router.remove($oldPage);
      if (separateNavbar) {
        router.remove($oldNavbarInner);
      }
    }
  } else if (options.reloadAll) {
    $oldPage.each((index, pageEl) => {
      const $oldPageEl = $(pageEl);
      if (router.params.stackPages && router.initialPages.indexOf($oldPageEl[0]) >= 0) {
        $oldPageEl.addClass('stacked');
        if (separateNavbar) {
          $oldNavbarInner.eq(index).addClass('stacked');
        }
      } else {
        // Page remove event
        router.pageCallback('beforeRemove', $oldPageEl, $oldNavbarInner && $oldNavbarInner.eq(index), 'previous', undefined, options);
        router.remove($oldPageEl);
        if (separateNavbar) {
          router.remove($oldNavbarInner.eq(index));
        }
      }
    });
  }

  // Load Tab
  if (options.route.route.tab) {
    router.loadTab(options.route.route.tab, Utils.extend({}, options, {
      history: false,
      pushState: false,
    }));
  }

  // Page init and before init events
  router.pageCallback('init', $newPage, $newNavbarInner, newPagePosition, reload ? newPagePosition : 'current', options);

  if (options.reloadCurrent || options.reloadAll) {
    router.allowPageChange = true;
    return router;
  }

  // Before animation event
  router.pageCallback('beforeIn', $newPage, $newNavbarInner, 'next', 'current', options);
  router.pageCallback('beforeOut', $oldPage, $oldNavbarInner, 'current', 'previous', options);

  // Animation
  function afterAnimation() {
    const pageClasses = 'page-previous page-current page-next';
    const navbarClasses = 'navbar-previous navbar-current navbar-next';
    $newPage.removeClass(pageClasses).addClass('page-current');
    $oldPage.removeClass(pageClasses).addClass('page-previous');
    if (dynamicNavbar) {
      $newNavbarInner.removeClass(navbarClasses).addClass('navbar-current');
      $oldNavbarInner.removeClass(navbarClasses).addClass('navbar-previous');
    }
    // After animation event
    router.allowPageChange = true;
    router.pageCallback('afterIn', $newPage, $newNavbarInner, 'next', 'current', options);
    router.pageCallback('afterOut', $oldPage, $oldNavbarInner, 'current', 'previous', options);

    if (!router.params.preloadPreviousPage || router.app.theme === 'md') {
      if (router.params.stackPages) {
        $oldPage.addClass('stacked');
        if (separateNavbar) {
          $oldNavbarInner.addClass('stacked');
        }
      } else if (!($newPage.attr('data-name') && $newPage.attr('data-name').indexOf('smart-select-') === 0)) {
        // Remove event
        router.pageCallback('beforeRemove', $oldPage, $oldNavbarInner, 'previous', undefined, options);
        router.remove($oldPage);
        if (separateNavbar) {
          router.remove($oldNavbarInner);
        }
      }
    }
    router.emit('routeChanged route:changed', router.currentRoute, router.previousRoute, router);

    if (router.params.pushState) {
      History.clearQueue();
    }
  }
  if (options.animate) {
    if (router.app.theme === 'md' && router.params.materialPageLoadDelay) {
      setTimeout(() => {
        router.animate($oldPage, $newPage, $oldNavbarInner, $newNavbarInner, 'forward', () => {
          afterAnimation();
        });
      }, router.params.materialPageLoadDelay);
    } else {
      router.animate($oldPage, $newPage, $oldNavbarInner, $newNavbarInner, 'forward', () => {
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
  const { url, content, el, name, template, templateUrl, component, componentUrl } = params;
  const { ignoreCache } = options;

  if (options.route.route.parentPath &&
    router.currentRoute.route.parentPath &&
    options.route.route.parentPath === router.currentRoute.route.parentPath) {
    // Do something nested
    if (options.route.url === router.url) return false;
    if (options.route.route.tab) {
      return router.loadTab(options.route.route.tab, options);
    }
    return false;
  }

  if (
    options.route.url &&
    router.url === options.route.url &&
    !(options.reloadCurrent || options.reloadPrevious) &&
    !router.params.allowDuplicateUrls
    ) {
    return false;
  }


  if (!options.route && url) {
    options.route = router.findMatchingRoute(url, true);
  }

  // Component Callbacks
  function resolve(pageEl, newOptions) {
    return router.forward(pageEl, Utils.extend(options, newOptions));
  }
  function reject() {
    router.allowPageChange = true;
    return router;
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
  } else if (name) {
    // Load page by page name in pages container
    router.forward(router.$el.children(`.page[data-name="${name}"]`).eq(0), options);
  } else if (component || componentUrl) {
    // Load from component (F7/Vue/React/...)
    try {
      router.pageComponentLoader(component, componentUrl, options, resolve, reject);
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
    router.xhrRequest(url, ignoreCache)
      .then((pageContent) => {
        router.forward(router.getPageEl(pageContent), options);
      })
      .catch(() => {
        router.allowPageChange = true;
      });
  }
  return router;
}
function navigate(url, navigateOptions = {}) {
  const router = this;
  const app = router.app;
  if (!router.view) {
    app.views.main.router.navigate(url, navigateOptions);
    return router;
  }
  if (url === '#' || url === '') {
    return router;
  }
  let navigateUrl = url.replace('./', '');
  if (navigateUrl[0] !== '/' && navigateUrl.indexOf('#') !== 0) {
    const currentPath = router.currentRoute.route.parentPath || router.currentRoute.path;
    navigateUrl = ((currentPath || '/') + navigateUrl).replace('//', '/');
  }
  const route = router.findMatchingRoute(navigateUrl);

  if (!route) {
    return router;
  }
  const options = {};
  if (route.route.options) {
    Utils.extend(options, route.route.options, navigateOptions, { route });
  } else {
    Utils.extend(options, navigateOptions, { route });
  }
  ('url content name el component componentUrl template templateUrl').split(' ').forEach((pageLoadProp) => {
    if (route.route[pageLoadProp]) {
      router.load({ [pageLoadProp]: route.route[pageLoadProp] }, options);
    }
  });
  // Async
  function asyncResolve(resolveParams, resolveOptions) {
    router.allowPageChange = false;
    router.load(resolveParams, Utils.extend(options, resolveOptions), true);
  }
  function asyncReject() {
    router.allowPageChange = true;
  }
  if (route.route.async) {
    router.allowPageChange = false;

    route.route.async(asyncResolve, asyncReject);
  }
  // Retur Router
  return router;
}
export { forward, load, navigate };
