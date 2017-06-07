import Utils from '../../utils/utils';
import History from '../../utils/history';

function loadTab(tabRoute, loadOptions = {}) {
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
        {
          url: options.route.url,
          viewIndex: router.view.index,
        },
        (router.params.pushStateRoot || '') + router.params.pushStateSeparator + options.route.url);
    }

    // Update Router History
    if (options.history) {
      router.history[router.history.length - 1] = options.route.url;
      router.saveHistory();
    }
  }

  // Show Tab
  const { $newTabEl, $oldTabEl } = router.app.tab.show(`#${tabRoute.id}`, options.animate);

  // Load Tab Content
  const { url, content, el, template, templateUrl, component, componentUrl } = tabRoute;

  function onTabLoaded() {
    $newTabEl.trigger('tabInit tab:init tabAttached tab:attached', tabRoute);
    router.emit('tabInit tab:init tabAttached tab:attached', $newTabEl, tabRoute);
    if ($oldTabEl) {
      $oldTabEl.trigger('tabBeforeRemove tab:beforeremove', tabRoute);
      router.emit('tabBeforeRemove tab:beforeremove', $oldTabEl, $newTabEl, tabRoute);
      router.removeTab($oldTabEl, $newTabEl, tabRoute);
    }
  }

  // Component/Template Callbacks
  function resolve(contentEl) {
    if (contentEl) {
      if (typeof contentEl === 'string') {
        $newTabEl.html(contentEl);
      } else {
        $newTabEl.html('');
        $newTabEl.append(contentEl);
      }
      onTabLoaded();
    }
  }
  function reject() {
    router.allowPageChange = true;
    return router;
  }

  if (content) {
    $newTabEl.html(content);
    onTabLoaded();
  } else if (template || templateUrl) {
    try {
      router.tabTemplateLoader(template, templateUrl, options, resolve, reject);
    } catch (err) {
      router.allowPageChange = true;
      throw err;
    }
  } else if (el) {
    $newTabEl.html('');
    $newTabEl.append(el);
    onTabLoaded();
  } else if (component || componentUrl) {
    // Load from component (F7/Vue/React/...)
    try {
      router.tabComponentLoader($newTabEl, component, componentUrl, options, resolve, reject);
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
        $newTabEl.html(tabContent);
        onTabLoaded();
      })
      .catch(() => {
        router.allowPageChange = true;
      });
  }
}
function removeTab($oldTabEl, $newTabEl, tabRoute) {
  const router = this;
  $oldTabEl.html('');
}

export { loadTab, removeTab };

