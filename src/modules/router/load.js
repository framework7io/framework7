import $ from 'dom7';
import Utils from '../../utils/utils';

function forward(el, forwardOptions = {}) {
  const router = this;
  const app = router.app;
  const view = router.view;
  router.allowPageChange = false;
  const options = Utils.extend({
    animate: true,
    pushState: true,
  }, forwardOptions);
  const $newPage = $(el);
  const $pagesEl = router.$pagesEl;
  let $oldPage;

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
          router.pageRemoveCallback($pagesInView[i], 'previous');
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
    const method = options.reloadCurrent ? 'replaceState' : 'pushState';

    // if (!isDynamicPage && !pageName) {
    window.history[method]({
      url: options.route.url,
      viewIndex: app.views.indexOf(view),
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
  if (options.reloadCurrent && router.history.length > 0) {
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

  // Insert new page
  if (options.reloadPrevious) {
    $newPage.insertBefore($oldPage);
  } else if ($oldPage.next('.page')[0] !== $newPage[0]) {
    $pagesEl.append($newPage[0]);
  }

  // Remove old page
  if (options.reloadCurrent && $oldPage.length > 0) {
    if (router.params.stackPages && view.initialPages.indexOf($oldPage[0]) >= 0) {
      $oldPage.addClass('stacked');
    } else {
      // Page remove event
      router.pageRemoveCallback($oldPage, 'previous');
      // --- TODO ---
      router.remove($oldPage);
    }
  }

  // Page init and before init events
  router.pageInitCallback($newPage, newPagePosition, options.route);
  // --- TODO ---

  if (options.reloadCurrent) {
    router.allowPageChange = true;
    return router;
  }

  // Before animation event
  router.pageBeforeInCallback($newPage, 'next', options.route, { from: 'next', to: 'current' });
  router.pageBeforeStackCallback($oldPage, 'current', options.route);
  // --- TODO ---

  // Animation
  function afterAnimation() {
    const pageClasses = 'page-previous page-current page-next page-next-in page-out page-previous-in page-stack';
    $newPage.removeClass(pageClasses).addClass('page-current');
    $oldPage.removeClass(pageClasses).addClass('page-previous');
    // After animation event
    router.pageAfterInCallback($newPage, 'next', options.route, { from: 'next', to: 'current' });
    router.pageAfterStackCallback($oldPage, 'previous', options.route);
    // --- TODO ---

    if (!(view.params.swipeBackPage || router.params.preloadPreviousPage)) {
      if (router.params.stackPages) {
        $oldPage.addClass('stacked');
      } else if (!(url.indexOf('#') === 0 && $newPage.attr('data-page').indexOf('smart-select-') === 0)) {
        // Remove event
        router.pageRemoveCallback($oldPage, 'previous');
        // --- TODO ---
        router.remove($oldPage);
      }
    }
    router.allowPageChange = true;
    router.emit('routeChanged route:changed', router.currentRoute, router);
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
      afterAnimation($oldPage, $newPage);
    });
  } else {
    afterAnimation($oldPage, $newPage);
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

  // Current Route
  router.currentRoute = options.route;
  router.url = router.currentRoute.url;
  router.emit('routeChange route:change', router.currentRoute, router);

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
    // Load from component (Vue/React/...)
    try {
      router.componentLoader(router, component, options, (pageEl, newOptions = {}) => {
        router.forward(pageEl, Utils.extend(options, newOptions));
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
      })
      .catch(() => {
        router.allowPageChange = true;
      });
  }
  return router;
}
export { forward, load };
