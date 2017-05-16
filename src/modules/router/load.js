import $ from 'dom7';
import Utils from '../../utils/utils';
import History from '../../utils/history';

function forward(el, forwardOptions = {}) {
  const router = this;
  const app = router.app;
  const view = router.view;

  const options = Utils.extend({
    animate: router.params.animatePages,
    pushState: true,
    history: true,
    on: {},
  }, forwardOptions);

  const $pagesEl = router.$pagesEl;
  const $newPage = $(el);
  let $oldPage;

  router.allowPageChange = false;
  if ($newPage.length === 0) {
    router.allowPageChange = true;
    return router;
  }

  // Pages In View
  const $pagesInView = $pagesEl
    .children('.page:not(.stacked)')
    .filter((index, pageInView) => pageInView !== $newPage[0]);

  // Exit when reload previous and only 1 page in view
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
  $newPage.addClass(`page-${newPagePosition}`);
  $newPage.removeClass('stacked');

  // Find Old Page
  if (options.reloadCurrent) {
    $oldPage = $pagesInView.eq($pagesInView.length - 1);
  } else if (options.reloadPrevious) {
    $oldPage = $pagesInView.eq($pagesInView.length - 2);
  } else {
    if ($pagesInView.length > 1) {
      let i = 0;
      for (i = 0; i < $pagesInView.length - 1; i += 1) {
        if (router.params.stackPages) {
          $pagesInView.eq(i).addClass('stacked');
        } else {
          // Page remove event
          router.pageCallback('beforeRemove', $pagesInView[i], 'previous', options);
          // --- TODO ---
          router.remove($pagesInView[i]);
        }
      }
    }
    $oldPage = $pagesEl
      .children('.page:not(.stacked)')
      .filter((index, page) => page !== $newPage[0]);
  }

  // Push State
  if (router.params.pushState && options.pushState && !options.reloadPrevious) {
    const pushStateRoot = router.params.pushStateRoot || '';

    History[options.reloadCurrent ? 'replace' : 'push'](
      { url: options.route.url,
        viewIndex: view.index,
      }, pushStateRoot + router.params.pushStateSeparator + options.route.url);
  }

  // Update router history
  const url = options.route.url;
  router.url = options.route.url;
  if (options.history) {
    if (options.reloadCurrent && router.history.length > 0) {
      router.history[router.history.length - (options.reloadPrevious ? 2 : 1)] = url;
    } else {
      router.history.push(url);
    }
  }
  router.saveHistory();

  // Insert new page
  const needsAttachedCallback = $newPage.parents(document).length === 0;
  if (options.reloadPrevious) {
    $newPage.insertBefore($oldPage);
  } else if ($oldPage.next('.page')[0] !== $newPage[0]) {
    $pagesEl.append($newPage[0]);
  }
  if (needsAttachedCallback) {
    router.pageCallback('attached', $newPage, newPagePosition, options);
  }

  // Remove old page
  if (options.reloadCurrent && $oldPage.length > 0) {
    if (router.params.stackPages && router.initialPages.indexOf($oldPage[0]) >= 0) {
      $oldPage.addClass('stacked');
    } else {
      // Page remove event
      router.pageCallback('beforeRemove', $oldPage, 'previous', options);
      // --- TODO ---
      router.remove($oldPage);
    }
  }

  // Current Route
  router.currentRoute = options.route;
  router.currentPage = $newPage[0];
  router.url = router.currentRoute.url;
  router.emit('routeChange route:change', router.currentRoute, router);

  // Page init and before init events
  router.pageCallback('init', $newPage, newPagePosition, options);

  if (options.reloadCurrent) {
    router.allowPageChange = true;
    return router;
  }

  // Before animation event
  router.pageCallback('beforeIn', $newPage, 'next', options);
  router.pageCallback('beforeStack', $oldPage, 'current', options);

  // Animation
  function afterAnimation() {
    const pageClasses = 'page-previous page-current page-next page-next-in page-out page-previous-in page-stack';
    $newPage.removeClass(pageClasses).addClass('page-current');
    $oldPage.removeClass(pageClasses).addClass('page-previous');
    // After animation event
    router.allowPageChange = true;
    router.pageCallback('afterIn', $newPage, 'next', options);
    router.pageCallback('afterStack', $oldPage, 'current', options);

    if (!(view.params.swipeBackPage || router.params.preloadPreviousPage)) {
      if (router.params.stackPages) {
        $oldPage.addClass('stacked');
      } else if (!(url.indexOf('#') === 0 && $newPage.attr('data-page').indexOf('smart-select-') === 0)) {
        // Remove event
        router.pageCallback('beforeRemove', $oldPage, 'previous', options);
        router.remove($oldPage);
      }
    }
    router.emit('routeChanged route:changed', router.currentRoute, router);

    if (router.params.pushState) {
      History.clearQueue();
    }
  }

  if (options.animate) {
    if (app.theme === 'md' && router.params.materialPageLoadDelay) {
      setTimeout(() => {
        router.animatePages($oldPage, $newPage, 'next', 'current');
      }, router.params.materialPageLoadDelay);
    } else {
      router.animatePages($oldPage, $newPage, 'next', 'current');
    }
    $newPage.animationEnd(() => {
      afterAnimation();
    });
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

  // Component Callbacks
  function componentProceed(pageEl, newOptions) {
    return router.forward(pageEl, Utils.extend(options, newOptions));
  }
  function componentRelease() {
    router.allowPageChange = true;
    return router;
  }

  // Proceed
  if (content) {
    router.forward(router.getPageEl(content), options);
  } else if (template || templateId) {
    // Parse template and send page element
  } else if (el) {
    // Load page from specified HTMLElement or by page name in pages container
    router.forward(router.getPageEl(el), options);
  } else if (name) {
    // Load page by page name in pages container
    router.forward(router.$pagesEl.find(`.page[data-page="${name}"]`).eq(0), options);
  } else if (component) {
    // Load from component (F7/Vue/React/...)
    try {
      router.componentLoader(component, options, componentProceed, componentRelease);
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
  let navigateUrl = url;
  if (navigateUrl[0] !== '/' && navigateUrl.indexOf('#') !== 0) {
    navigateUrl = ((router.path || '/') + navigateUrl).replace('//', '/');
  }
  const route = router.findMatchingRoute(navigateUrl);
  if (!route) {
    return router;
    // if (navigateUrl.indexOf('#') === 0) {
    //   // Load by name
    //   route = {
    //     url: navigateUrl,
    //     path: navigateUrl,
    //     route: {
    //       path: navigateUrl,
    //       name: navigateUrl.replace('#', ''),
    //     },
    //   };
    // } else {
    //   // Load by URL
    //   route = {
    //     url: navigateUrl,
    //     path: navigateUrl.split('?')[0],
    //     query: Utils.parseUrlQuery(navigateUrl),
    //     route: {
    //       path: navigateUrl.split('?')[0],
    //       url: navigateUrl,
    //     },
    //   };
    // }
  }
  const options = Utils.extend(navigateOptions, { route });

  ('url content name el component template').split(' ').forEach((pageLoadProp) => {
    if (route.route[pageLoadProp]) {
      router.load({ [pageLoadProp]: route.route[pageLoadProp] }, options);
    }
  });
  // Async
  function asyncLoad(loadParams, loadOptions) {
    router.allowPageChange = false;
    router.load(loadParams, Utils.extend(options, loadOptions), true);
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
export { forward, load, navigate };
