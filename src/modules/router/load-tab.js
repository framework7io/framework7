import $ from 'dom7';
import Utils from '../../utils/utils';
import History from '../../utils/history';

function loadTab(tab, loadOptions = {}) {
  const router = this;
  const options = Utils.extend({
    animate: router.params.animatePages,
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
  const $tabEl = $(router.app.tabs.show(`#${tab.id}`, options.animate));

  // Load Tab Content
  const { url, content, el, template, templateUrl, component, componentUrl } = tab;

  // Component/Template Callbacks
  function resolve(contentEl) {
    if (contentEl) {
      $tabEl.html('');
      $tabEl.append(contentEl);
    }
  }
  function reject() {
    router.allowPageChange = true;
    return router;
  }

  if (content) {
    $tabEl.html(content);
  } else if (template || templateUrl) {
    try {
      router.tabTemplateLoader(template, templateUrl, options, resolve, reject);
    } catch (err) {
      router.allowPageChange = true;
      throw err;
    }
  } else if (el) {
    $tabEl.html('');
    $tabEl.append(el);
  } else if (component || componentUrl) {
    // Load from component (F7/Vue/React/...)
    try {
      router.tabComponentLoader($tabEl, component, componentUrl, options, resolve, reject);
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
        $tabEl.html(pageContent);
      })
      .catch(() => {
        router.allowPageChange = true;
      });
  }
}

export default loadTab;

