import $ from 'dom7';
import Utils from '../../utils/utils';
import History from '../../utils/history';

function tabLoad(tabRoute, loadOptions = {}) {
  const router = this;
  const options = Utils.extend({
    animate: router.params.animate,
    pushState: true,
    history: true,
    on: {},
  }, loadOptions);

  const { ignoreCache } = options;
  if (options.route) {
    // Set Route
    if (options.route !== router.currentRoute) {
      router.currentRoute = options.route;
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
      router.history[router.history.length - 1] = options.route.url;
      router.saveHistory();
    }
  }

  // Show Tab
  const $currentPageEl = $(router.currentPageEl);
  let tabEl;
  if ($currentPageEl.length && $currentPageEl.find(`#${tabRoute.id}`).length) {
    tabEl = $currentPageEl.find(`#${tabRoute.id}`).eq(0);
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

  // Load Tab Content
  const { url, content, el, template, templateUrl, component, componentUrl } = tabRoute;

  function onTabLoaded() {
    // Remove theme elements
    router.removeThemeElements($newTabEl);

    $newTabEl.trigger('tab:init tab:mounted', tabRoute);
    router.emit('tabInit tabMounted', $newTabEl[0], tabRoute);

    if ($oldTabEl && router.params.unloadTabContent) {
      if (animated) {
        onTabsChanged(() => {
          router.tabRemove($oldTabEl, $newTabEl, tabRoute);
        });
      } else {
        router.tabRemove($oldTabEl, $newTabEl, tabRoute);
      }
    }
  }
  if (!router.params.unloadTabContent) {
    if ($newTabEl[0].f7RouterTabLoaded) return;
  }

  const { on = {}, once = {} } = tabRoute;
  if (options.on) {
    Utils.extend(on, options.on);
  }
  if (options.once) {
    Utils.extend(once, options.once);
  }

  // Component/Template Callbacks
  function resolve(contentEl) {
    if (!contentEl) return;
    if (typeof contentEl === 'string') {
      $newTabEl.html(contentEl);
    } else {
      $newTabEl.html('');
      if (contentEl.f7Component) {
        contentEl.f7Component.mount((componentEl) => {
          $newTabEl.append(componentEl);
        });
      } else {
        $newTabEl.append(contentEl);
      }
    }
    if (!router.params.unloadTabContent) {
      $newTabEl[0].f7RouterTabLoaded = true;
    }
    onTabLoaded();
  }
  function reject() {
    router.allowPageChange = true;
    return router;
  }

  if (content) {
    resolve(content);
  } else if (template || templateUrl) {
    try {
      router.tabTemplateLoader(template, templateUrl, options, resolve, reject);
    } catch (err) {
      router.allowPageChange = true;
      throw err;
    }
  } else if (el) {
    resolve(el);
  } else if (component || componentUrl) {
    // Load from component (F7/Vue/React/...)
    try {
      router.tabComponentLoader($newTabEl[0], component, componentUrl, options, resolve, reject);
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
      .then((tabContent) => {
        resolve(tabContent);
      })
      .catch(() => {
        router.allowPageChange = true;
      });
  }
}
function tabRemove($oldTabEl, $newTabEl, tabRoute) {
  const router = this;
  $oldTabEl.trigger('tab:beforeremove', tabRoute);
  router.emit('tabBeforeRemove', $oldTabEl[0], $newTabEl[0], tabRoute);
  $oldTabEl.children().each((index, tabChild) => {
    if (tabChild.f7Component) {
      tabChild.f7Component.destroy();
    }
  });
  router.removeTabContent($oldTabEl[0], tabRoute);
}

export { tabLoad, tabRemove };

