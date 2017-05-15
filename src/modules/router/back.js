import $ from 'dom7';
import Utils from '../../utils/utils';
import History from '../../utils/history';

function afterBackward() {

}
function backward(el, backwardOptions) {
  const router = this;
  const app = router.app;
  const view = router.view;

  const options = Utils.extend({
    animate: router.params.animatePages,
    pushState: true,
  }, backwardOptions);

  const $pagesEl = router.$pagesEl;
  const $newPage = $(el);
  const $oldPage = $pagesEl.find('.page-current');

  router.allowPageChange = false;
  if ($newPage.length === 0 || $oldPage.length === 0) {
    router.allowPageChange = true;
    return router;
  }

  // New Page
  $newPage
    .addClass('page-previous')
    .removeClass('stacked');

  // Remove previous page in case of "forced"
  if (options.force) {
    const $pageToRemove = $oldPage.prev('.page-previous:not(.stacked)');
    if ($pageToRemove.length > 0) {
      if (router.params.stackPages && router.initialPages.indexOf($pageToRemove[0]) >= 0) {
        $pageToRemove.addClass('stacked');
      } else {
        router.pageRemoveCallback($pageToRemove, 'previous');
        router.remove($pageToRemove);
      }

      if (router.history[[router.history.length - 2]]) {
        router.history[router.history.length - 2] = router.url;
      } else {
        router.history.unshift(router.url);
      }
    }
  }

  // Push/Pop state
  // TODO

  // Insert new page
  $newPage.insertBefore($oldPage);

  if (options.preload) {
    // Page init and before init events
    router.pageInitCallback($newPage, 'previous', options.route);
    router.allowPageChange = true;
    return router;
  }

  // History State
  if (router.params.pushState && options.pushState) {
    History.back();
  }

  // Update History
  if (router.history.length === 1) {
    router.history.unshift(router.url);
  }
  router.history.pop();

  // Current Route
  router.currentRoute = options.route;
  router.currentPage = $newPage[0];
  router.url = router.currentRoute.url;
  router.emit('routeChange route:change', router.currentRoute, router);

  // Page init and before init events
  router.pageInitCallback($newPage, 'previous', options.route);

  // Before animation callback
  router.pageBeforeInCallback($newPage, 'previous', options.route, { from: 'previous', to: 'current' });
  router.pageBeforeOutCallback($oldPage, 'current', options.route);

  // Animation
  function afterAnimation() {
    // Set classes
    const pageClasses = 'page-previous page-current page-next page-next-in page-out page-previous-in page-stack';
    $newPage.removeClass(pageClasses).addClass('page-current');
    $oldPage.removeClass(pageClasses).addClass('page-next');

    // After animation event
    router.pageAfterInCallback($newPage, 'previous', options.route, { from: 'previous', to: 'current' });
    router.pageAfterOutCallback($oldPage, 'current', options.route);

    // Remove Old Page
    if (router.params.stackPages && router.initialPages.indexOf($oldPage[0]) >= 0) {
      $oldPage.addClass('stacked');
    } else {
      router.pageRemoveCallback($oldPage, 'next');
      router.remove($oldPage);
    }

    router.allowPageChange = true;
    router.emit('routeChanged route:changed', router.currentRoute, router);

    // Preload previous page
    if (router.params.preloadPreviousPage) {
      router.navigateBack(router.history[router.history.length - 2], { preload: true });
    }
  }

  if (options.animate) {
    // Set pages before animation
    router.animatePages($oldPage, $newPage, 'previous', 'current');

    $newPage.animationEnd(() => {
      afterAnimation();
    });
  } else {
      // if (dynamicNavbar) newNavbarInner.find('.sliding, .sliding .back .icon').transform('');
    afterAnimation();
  }
  return router;
}
function back(backParams, backOptions, ignorePageChange) {
  const router = this;

  if (!router.allowPageChange && !ignorePageChange) return router;
  const params = backParams;
  const options = backOptions;
  const { url, content, template, templateId, el, name, component } = params;
  const { ignoreCache } = options;

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

  // Current Route
  router.currentRoute = options.route;
  router.url = router.currentRoute.url;
  router.emit('routeChange route:change', router.currentRoute, router);

  // Proceed
  if (content) {
    router.backward(router.getPageEl(content), options);
  } else if (template || templateId) {
    // Parse template and send page element
  } else if (el) {
    // Load page from specified HTMLElement or by page name in pages container
    router.backward(router.getPageEl(el), options);
  } else if (name) {
    // Load page by page name in pages container
    router.backward(router.$pagesEl.find(`.page[data-page="${name}"]`).eq(0), options);
  } else if (component) {
    // Load from component (Vue/React/...)
    try {
      router.componentLoader(router, component, options, (pageEl, newOptions = {}) => {
        router.backward(pageEl, Utils.extend(options, newOptions));
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
        router.backward(router.getPageEl(pageContent), options);
      })
      .catch(() => {
        router.allowPageChange = true;
      });
  }
  return router;
}
function navigateBack(url = '', navigateOptions = {}) {
  const router = this;
  const view = router.view;
  const $previousPage = view.$pagesEl.find('.page-current').prevAll('.page-previous').eq(-1);
  if (!navigateOptions.force && $previousPage.length > 0) {
    // Load to current previous page
    router.backward($previousPage, Utils.extend(navigateOptions, {
      route: $previousPage[0].f7Page.route,
    }));
    return router;
  }
  // Find page to load
  let navigateUrl = url;
  if (navigateUrl && navigateUrl[0] !== '/' && navigateUrl.indexOf('#') !== 0) {
    navigateUrl = ((router.path || '/') + navigateUrl).replace('//', '/');
  }
  let route = router.findMatchingRoute(navigateUrl);
  if (!route && navigateUrl) {
    route = {
      url: navigateUrl,
      path: navigateUrl.split('?')[0],
      query: Utils.parseUrlQuery(navigateUrl),
      route: {
        path: navigateUrl.split('?')[0],
        url: navigateUrl,
      },
    };
  } else if (!route) {
    return router;
  }
  const options = Utils.extend(navigateOptions, { route });

  ('url content name el component template').split(' ').forEach((pageLoadProp) => {
    if (route.route[pageLoadProp]) {
      router.back({ [pageLoadProp]: route.route[pageLoadProp] }, options);
    }
  });
  // Async
  function asyncLoad(loadParams, loadOptions) {
    router.allowPageChange = false;
    router.back(loadParams, Utils.extend(options, loadOptions), true);
  }
  function asyncRelease() {
    router.allowPageChange = true;
  }
  if (route.route.async) {
    router.allowPageChange = false;

    route.route.async(asyncLoad, asyncRelease);
  }
  // Retur Router
  return router;
}
export { afterBackward, backward, back, navigateBack };
