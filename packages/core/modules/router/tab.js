import $ from 'dom7';
import Utils from '../../utils/utils';
import History from '../../utils/history';

function tabLoad(tabRoute, loadOptions = {}) {
  const router = this;
  const options = Utils.extend({
    animate: router.params.animate,
    pushState: true,
    history: true,
    parentPageEl: null,
    preload: false,
    on: {},
  }, loadOptions);

  let currentRoute;
  let previousRoute;
  if (options.route) {
    // Set Route
    if (!options.preload && options.route !== router.currentRoute) {
      previousRoute = router.previousRoute;
      router.currentRoute = options.route;
    }
    if (options.preload) {
      currentRoute = options.route;
      previousRoute = router.currentRoute;
    } else {
      currentRoute = router.currentRoute;
      if (!previousRoute) previousRoute = router.previousRoute;
    }

    // Update Browser History
    if (router.params.pushState && options.pushState && !options.reloadPrevious) {
      History.replace(
        router.view.id,
        {
          url: options.route.url,
        },
        (router.params.pushStateRoot || '') + router.params.pushStateSeparator + options.route.url
      );
    }

    // Update Router History
    if (options.history) {
      router.history[Math.max(router.history.length - 1, 0)] = options.route.url;
      router.saveHistory();
    }
  }

  // Show Tab
  const $parentPageEl = $(options.parentPageEl || router.currentPageEl);
  let tabEl;
  if ($parentPageEl.length && $parentPageEl.find(`#${tabRoute.id}`).length) {
    tabEl = $parentPageEl.find(`#${tabRoute.id}`).eq(0);
  } else if (router.view.selector) {
    tabEl = `${router.view.selector} #${tabRoute.id}`;
  } else {
    tabEl = `#${tabRoute.id}`;
  }
  const tabShowResult = router.app.tab.show({
    tabEl,
    animate: options.animate,
    tabRoute: options.route,
  });

  const { $newTabEl, $oldTabEl, animated, onTabsChanged } = tabShowResult;

  if ($newTabEl && $newTabEl.parents('.page').length > 0 && options.route) {
    const tabParentPageData = $newTabEl.parents('.page')[0].f7Page;
    if (tabParentPageData && options.route) {
      tabParentPageData.route = options.route;
    }
  }

  // Tab Content Loaded
  function onTabLoaded(contentEl) {
    // Remove theme elements
    router.removeThemeElements($newTabEl);

    let tabEventTarget = $newTabEl;
    if (typeof contentEl !== 'string') tabEventTarget = $(contentEl);

    tabEventTarget.trigger('tab:init tab:mounted', tabRoute);
    router.emit('tabInit tabMounted', $newTabEl[0], tabRoute);

    if ($oldTabEl && $oldTabEl.length) {
      if (animated) {
        onTabsChanged(() => {
          router.emit('routeChanged', router.currentRoute, router.previousRoute, router);
          if (router.params.unloadTabContent) {
            router.tabRemove($oldTabEl, $newTabEl, tabRoute);
          }
        });
      } else {
        router.emit('routeChanged', router.currentRoute, router.previousRoute, router);
        if (router.params.unloadTabContent) {
          router.tabRemove($oldTabEl, $newTabEl, tabRoute);
        }
      }
    }
  }

  if ($newTabEl[0].f7RouterTabLoaded) {
    if (!$oldTabEl || !$oldTabEl.length) return router;
    if (animated) {
      onTabsChanged(() => {
        router.emit('routeChanged', router.currentRoute, router.previousRoute, router);
      });
    } else {
      router.emit('routeChanged', router.currentRoute, router.previousRoute, router);
    }
    return router;
  }

  // Load Tab Content
  function loadTab(loadTabParams, loadTabOptions) {
    // Load Tab Props
    const { url, content, el, template, templateUrl, component, componentUrl } = loadTabParams;
    // Component/Template Callbacks
    function resolve(contentEl) {
      router.allowPageChange = true;
      if (!contentEl) return;
      if (typeof contentEl === 'string') {
        $newTabEl.html(contentEl);
      } else {
        $newTabEl.html('');
        if (contentEl.f7Component) {
          contentEl.f7Component.$mount((componentEl) => {
            $newTabEl.append(componentEl);
          });
        } else {
          $newTabEl.append(contentEl);
        }
      }
      $newTabEl[0].f7RouterTabLoaded = true;
      onTabLoaded(contentEl);
    }
    function reject() {
      router.allowPageChange = true;
      return router;
    }

    if (content) {
      resolve(content);
    } else if (template || templateUrl) {
      try {
        router.tabTemplateLoader(template, templateUrl, loadTabOptions, resolve, reject);
      } catch (err) {
        router.allowPageChange = true;
        throw err;
      }
    } else if (el) {
      resolve(el);
    } else if (component || componentUrl) {
      // Load from component (F7/Vue/React/...)
      try {
        router.tabComponentLoader($newTabEl[0], component, componentUrl, loadTabOptions, resolve, reject);
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
      router.xhrRequest(url, loadTabOptions)
        .then((tabContent) => {
          resolve(tabContent);
        })
        .catch(() => {
          router.allowPageChange = true;
        });
    }
  }

  let hasContentLoadProp;
  ('url content component el componentUrl template templateUrl').split(' ').forEach((tabLoadProp) => {
    if (tabRoute[tabLoadProp]) {
      hasContentLoadProp = true;
      loadTab({ [tabLoadProp]: tabRoute[tabLoadProp] }, options);
    }
  });

  // Async
  function asyncResolve(resolveParams, resolveOptions) {
    loadTab(resolveParams, Utils.extend(options, resolveOptions));
  }
  function asyncReject() {
    router.allowPageChange = true;
  }
  if (tabRoute.async) {
    tabRoute.async.call(router, currentRoute, previousRoute, asyncResolve, asyncReject);
  } else if (!hasContentLoadProp) {
    router.allowPageChange = true;
  }

  return router;
}
function tabRemove($oldTabEl, $newTabEl, tabRoute) {
  const router = this;

  let hasTabComponentChild;
  if ($oldTabEl[0]) {
    $oldTabEl[0].f7RouterTabLoaded = false;
    delete $oldTabEl[0].f7RouterTabLoaded;
  }
  $oldTabEl.children().each((index, tabChild) => {
    if (tabChild.f7Component) {
      hasTabComponentChild = true;
      $(tabChild).trigger('tab:beforeremove', tabRoute);
      tabChild.f7Component.$destroy();
    }
  });
  if (!hasTabComponentChild) {
    $oldTabEl.trigger('tab:beforeremove', tabRoute);
  }
  router.emit('tabBeforeRemove', $oldTabEl[0], $newTabEl[0], tabRoute);
  router.removeTabContent($oldTabEl[0], tabRoute);
}

export { tabLoad, tabRemove };
