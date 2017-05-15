import $ from 'dom7';
import Utils from '../../utils/utils';
import History from '../../utils/history';

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
  let backIndex;
  if (options.force) {
    if ($oldPage.prev('.page-previous:not(.stacked)').length > 0) {
      if (router.history.indexOf(options.route.url) >= 0) {
        backIndex = router.history.length - router.history.indexOf(options.route.url) - 1;
        router.history = router.history.slice(0, router.history.indexOf(options.route.url) + 2);
        view.history = router.history;
      } else {
        if (router.history[[router.history.length - 2]]) {
          router.history[router.history.length - 2] = options.route.url;
        } else {
          router.history.unshift(router.url);
        }
      }

      if (backIndex && router.params.stackPages) {
        $oldPage.prevAll('.page-previous').each((index, pageToRemove) => {
          const $pageToRemove = $(pageToRemove);
          if ($pageToRemove[0] !== $newPage[0] && $pageToRemove.index() > $newPage.index()) {
            if (router.initialPages.indexOf($pageToRemove[0]) >= 0) {
              $pageToRemove.addClass('stacked');
            } else {
              router.pageRemoveCallback($pageToRemove, 'previous');
              router.remove($pageToRemove);
            }
          }
        });
      } else {
        const $pageToRemove = $oldPage.prev('.page-previous:not(.stacked)');
        if (router.params.stackPages && router.initialPages.indexOf($pageToRemove[0]) >= 0) {
          $pageToRemove.addClass('stacked');
        } else {
          router.pageRemoveCallback($pageToRemove, 'previous');
          router.remove($pageToRemove);
        }
      }
    }
  }

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
    if (backIndex) History.go(-backIndex);
    else History.back();
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
    if (router.params.pushState) {
      History.clearQueue();
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
function navigateBack(...args) {
  let navigateUrl;
  let navigateOptions;
  if (typeof args[0] === 'object') {
    navigateOptions = args[0] || {};
  } else {
    navigateUrl = args[0];
    navigateOptions = args[1] || {};
  }
  const router = this;
  const view = router.view;
  const $previousPage = view.$pagesEl.find('.page-current').prevAll('.page-previous').eq(0);
  if (!navigateOptions.force && $previousPage.length > 0) {
    router.back({ el: $previousPage }, Utils.extend(navigateOptions, {
      route: $previousPage[0].f7Page.route,
    }));
    return router;
  }
  // Find page to load
  if (navigateUrl && navigateUrl[0] !== '/' && navigateUrl.indexOf('#') !== 0) {
    navigateUrl = ((router.path || '/') + navigateUrl).replace('//', '/');
  }
  if (!navigateUrl && router.history.length > 1) {
    navigateUrl = router.history[router.history.length - 2];
  }
  let route = router.findMatchingRoute(navigateUrl);
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
  const options = Utils.extend(navigateOptions, { route });

  if (options.force && router.params.stackPages) {
    router.$pagesEl.find('.page-previous.stacked').each((index, pageEl) => {
      if (pageEl.f7Page && pageEl.f7Page.route && pageEl.f7Page.route.url === route.url) {
        router.back({ el: pageEl }, options);
      }
    });
  }

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
  // Return Router
  return router;
}
export { backward, back, navigateBack };
