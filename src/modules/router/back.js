import $ from 'dom7';
import Utils from '../../utils/utils';
import History from '../../utils/history';

function backward(el, backwardOptions) {
  const router = this;
  const view = router.view;

  const options = Utils.extend({
    animate: router.params.animatePages,
    pushState: true,
  }, backwardOptions);

  const dynamicNavbar = router.app.theme === 'ios' && router.params.iosDynamicNavbar;

  const $newPage = $(el);
  const $oldPage = router.$el.children('.page-current');

  let $navbarEl;
  let $newNavbarInner;
  let $oldNavbarInner;

  if (dynamicNavbar) {
    $navbarEl = router.$navbarEl;
    $newNavbarInner = $newPage.children('.navbar').children('.navbar-inner');
    if ($newNavbarInner.length > 0) {
      $newPage.children('.navbar').remove();
    }
    if ($newNavbarInner.length === 0 && $newPage[0].f7Page) {
      // Try from pageData
      $newNavbarInner = $newPage[0].f7Page.$navbarEl;
    }
    $oldNavbarInner = $navbarEl.find('.navbar-current');
  }

  router.allowPageChange = false;
  if ($newPage.length === 0 || $oldPage.length === 0) {
    router.allowPageChange = true;
    return router;
  }

  // New Page
  $newPage
    .addClass('page-previous')
    .removeClass('stacked');

  if (dynamicNavbar) {
    $newNavbarInner
      .addClass('navbar-previous')
      .removeClass('stacked');
  }


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
          let $navbarToRemove;
          if (dynamicNavbar) {
            $navbarToRemove = $oldNavbarInner.prevAll('.navbar-previous').eq(index);
          }
          if ($pageToRemove[0] !== $newPage[0] && $pageToRemove.index() > $newPage.index()) {
            if (router.initialPages.indexOf($pageToRemove[0]) >= 0) {
              $pageToRemove.addClass('stacked');
              if (dynamicNavbar) {
                $navbarToRemove.addClass('stacked');
              }
            } else {
              router.pageCallback('beforeRemove', $pageToRemove, $navbarToRemove, 'previous', undefined, options);
              router.remove($pageToRemove);
              if (dynamicNavbar) {
                router.remove($navbarToRemove);
              }
            }
          }
        });
      } else {
        const $pageToRemove = $oldPage.prev('.page-previous:not(.stacked)');
        let $navbarToRemove;
        if (dynamicNavbar) {
          $navbarToRemove = $oldNavbarInner.prev('.navbar-inner:not(.stacked)');
        }
        if (router.params.stackPages && router.initialPages.indexOf($pageToRemove[0]) >= 0) {
          $pageToRemove.addClass('stacked');
          $navbarToRemove.addClass('stacked');
        } else {
          router.pageCallback('beforeRemove', $pageToRemove, $navbarToRemove, 'previous', undefined, options);
          router.remove($pageToRemove);
          if (dynamicNavbar) {
            router.remove($navbarToRemove);
          }
        }
      }
    }
  }

  // Insert new page
  const needsAttachedCallback = $newPage.parents(document).length === 0;
  if ($newPage.next($oldPage).length === 0) {
    $newPage.insertBefore($oldPage);
  }
  if (dynamicNavbar) {
    $newNavbarInner.insertBefore($oldNavbarInner);
  }
  if (needsAttachedCallback) {
    router.pageCallback('attached', $newPage, $newNavbarInner, 'previous', 'current', options);
  }

  if (options.preload) {
    // Page init and before init events
    router.pageCallback('init', $newPage, $newNavbarInner, 'previous', 'current', options);
    if ($newPage.prevAll('.page-previous:not(.stacked)').length > 0) {
      $newPage.prevAll('.page-previous:not(.stacked)').each((index, pageToRemove) => {
        const $pageToRemove = $(pageToRemove);
        let $navbarToRemove;
        if (dynamicNavbar) {
          $navbarToRemove = $newNavbarInner.prevAll('.navbar-previous:not(.stacked)').eq(index);
        }
        if (router.params.stackPages && router.initialPages.indexOf(pageToRemove) >= 0) {
          $pageToRemove.addClass('stacked');
          if (dynamicNavbar) {
            $navbarToRemove.addClass('stacked');
          }
        } else {
          router.pageCallback('beforeRemove', $pageToRemove, $navbarToRemove, 'previous', undefined);
          router.remove($pageToRemove);
          if (dynamicNavbar) {
            router.remove($navbarToRemove);
          }
        }
      });
    }
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
  router.saveHistory();

  // Current Route
  router.currentRoute = options.route;
  router.currentPage = $newPage[0];

  // Page init and before init events
  router.pageCallback('init', $newPage, $newNavbarInner, 'previous', 'current');

  // Before animation callback
  router.pageCallback('beforeIn', $newPage, $newNavbarInner, 'previous', 'current');
  router.pageCallback('beforeOut', $oldPage, $oldNavbarInner, 'current', 'next');

  // Animation
  function afterAnimation() {
    // Set classes
    const pageClasses = 'page-previous page-current page-next page-next-to-current page-current-to-next page-previous-to-current page-current-to-previous';
    const navbarClasses = 'navbar-previous navbar-current navbar-next navbar-next-to-current navbar-current-to-next navbar-previous-to-current navbar-current-to-previous';
    $newPage.removeClass(pageClasses).addClass('page-current');
    $oldPage.removeClass(pageClasses).addClass('page-next');
    if (dynamicNavbar) {
      $newNavbarInner.removeClass(navbarClasses).addClass('navbar-current');
      $oldNavbarInner.removeClass(navbarClasses).addClass('navbar-next');
      $newNavbarInner.find('.sliding').transform('');
      $oldNavbarInner.find('.sliding').transform('');
    }

    // After animation event
    router.pageCallback('afterIn', $newPage, $newNavbarInner, 'previous', 'current');
    router.pageCallback('afterOut', $oldPage, $oldNavbarInner, 'current', 'next');

    // Remove Old Page
    if (router.params.stackPages && router.initialPages.indexOf($oldPage[0]) >= 0) {
      $oldPage.addClass('stacked');
      if (dynamicNavbar) {
        $oldNavbarInner.addClass('stacked');
      }
    } else {
      router.pageCallback('beforeRemove', $oldPage, $oldNavbarInner, 'next', undefined);
      router.remove($oldPage);
      if (dynamicNavbar) {
        router.remove($oldNavbarInner);
      }
    }

    router.allowPageChange = true;
    router.emit('routeChanged route:changed', router.currentRoute, router.previousRoute, router);

    // Preload previous page
    if (router.params.preloadPreviousPage) {
      router.back(router.history[router.history.length - 2], { preload: true });
    }
    if (router.params.pushState) {
      History.clearQueue();
    }
  }

  if (options.animate) {
    // Set pages before animation
    router.animatePages($oldPage, $newPage, 'previous', 'current');
    if (dynamicNavbar) {
      router.animateNavbars($oldNavbarInner, $newNavbarInner, 'previous', 'current');
    }

    $newPage.animationEnd(() => {
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
  const { url, content, el, name, template, templateUrl, component, componentUrl } = params;
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
  function proceed(pageEl, newOptions) {
    return router.backward(pageEl, Utils.extend(options, newOptions));
  }
  function release() {
    router.allowPageChange = true;
    return router;
  }

  // Proceed
  if (content) {
    router.backward(router.getPageEl(content), options);
  } else if (template || templateUrl) {
    // Parse template and send page element
    try {
      router.templateLoader(template, templateUrl, options, proceed, release);
    } catch (err) {
      router.allowPageChange = true;
      throw err;
    }
  } else if (el) {
    // Load page from specified HTMLElement or by page name in pages container
    router.backward(router.getPageEl(el), options);
  } else if (name) {
    // Load page by page name in pages container
    router.backward(router.$el.children(`.page[data-page="${name}"]`).eq(0), options);
  } else if (component || componentUrl) {
    // Load from component (F7/Vue/React/...)
    try {
      router.componentLoader(component, componentUrl, options, proceed, release);
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
        router.backward(router.getPageEl(pageContent), options);
      })
      .catch(() => {
        router.allowPageChange = true;
      });
  }
  return router;
}
function back(...args) {
  let navigateUrl;
  let navigateOptions;
  if (typeof args[0] === 'object') {
    navigateOptions = args[0] || {};
  } else {
    navigateUrl = args[0];
    navigateOptions = args[1] || {};
  }

  const router = this;
  const app = router.app;
  if (!router.view) {
    app.views.main.router.back(navigateUrl, navigateOptions);
    return router;
  }

  const $previousPage = router.$el.children('.page-current').prevAll('.page-previous').eq(0);
  if (!navigateOptions.force && $previousPage.length > 0) {
    if (router.params.pushState && $previousPage[0].f7Page && router.history[router.history.length - 2] !== $previousPage[0].f7Page.route.url) {
      router.back(router.history[router.history.length - 2], Utils.extend(navigateOptions, { force: true }));
      return router;
    }
    router.loadBack({ el: $previousPage }, Utils.extend(navigateOptions, {
      route: $previousPage[0].f7Page.route,
    }));
    return router;
  }
  // Find page to load
  if (navigateUrl === '#') {
    navigateUrl = undefined;
  }
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
  const options = {};
  if (route.route.options) {
    Utils.extend(options, route.route.options, navigateOptions, { route });
  } else {
    Utils.extend(options, navigateOptions, { route });
  }

  if (options.force && router.params.stackPages) {
    router.$el.children('.page-previous.stacked').each((index, pageEl) => {
      if (pageEl.f7Page && pageEl.f7Page.route && pageEl.f7Page.route.url === route.url) {
        router.loadBack({ el: pageEl }, options);
      }
    });
  }

  ('url content name el component componentUrl template templateUrl').split(' ').forEach((pageLoadProp) => {
    if (route.route[pageLoadProp]) {
      router.loadBack({ [pageLoadProp]: route.route[pageLoadProp] }, options);
    }
  });
  // Async
  function asyncProceed(proceedParams, proceedOptions) {
    router.allowPageChange = false;
    router.loadBack(proceedParams, Utils.extend(options, proceedOptions), true);
  }
  function asyncRelease() {
    router.allowPageChange = true;
  }
  if (route.route.async) {
    router.allowPageChange = false;

    route.route.async(asyncProceed, asyncRelease);
  }
  // Return Router
  return router;
}
export { backward, loadBack, back };
