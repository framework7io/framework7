import Utils from '../../utils/utils';
import History from '../../utils/history';

function modalLoad(modalType, route, loadOptions = {}) {
  const router = this;
  const app = router.app;
  const options = Utils.extend({
    animate: router.params.animate,
    pushState: true,
    history: true,
    on: {},
  }, loadOptions);

  const modalParams = route.route[modalType];

  const { ignoreCache } = options;

  // Load Modal Props
  const { url, template, templateUrl, component, componentUrl } = modalParams;

  function onModalLoaded() {
    // Create Modal
    const modal = app[modalType].create(modalParams);

    function closeOnSwipeBack() {
      modal.close();
    }
    modal.on('modalOpen', () => {
      router.once('swipeBackMove', closeOnSwipeBack);
    });
    modal.on('modalClose', () => {
      router.off('swipeBackMove', closeOnSwipeBack);
      router.currentRoute = router.previousRoute;
      const inState = (History.state && History.state.modal) ||
                      (History.previousState && History.previousState.modal);
      if (router.params.pushState && (options.pushState || inState) && !modal.closeByHistory) {
        History.back();
      }
      if (options.history) {
        router.history.pop();
        router.saveHistory();
      }
    });

    modal.on('modalClosed', () => {
      modal.$el.trigger(`${modalType.toLowerCase()}:beforeremove`, route, modal);
      modal.emit(`${modalType}BeforeRemove`, modal.el, route, modal);
      if (modal.el.f7Component) {
        modal.el.f7Component.destroy();
      }
      Utils.nextTick(() => {
        modal.destroy();
      });
    });

    if (options.route) {
      // Set Route
      if (options.route !== router.currentRoute) {
        router.currentRoute = Utils.extend(options.route, { modal });
      }

      // Update Browser History
      if (router.params.pushState && options.pushState) {
        History.push(
          {
            url: options.route.url,
            viewIndex: router.view.index,
            modal: modalType,
          },
          (router.params.pushStateRoot || '') + router.params.pushStateSeparator + options.route.url);
      }

      // Update Router History
      if (options.history) {
        router.history.push(options.route.url);
        router.saveHistory();
      }
    }

    // Remove theme elements
    router.removeThemeElements(modal.el);
    // Emit events
    modal.$el.trigger(`${modalType.toLowerCase()}:init ${modalType.toLowerCase()}:mounted`, route, modal);
    router.emit(`${modalType}Init ${modalType}Mounted`, modal.el, route, modal);
    // Open
    modal.open();
  }

  // Component/Template Callbacks
  function resolve(contentEl) {
    if (contentEl) {
      if (typeof contentEl === 'string') {
        modalParams.content = contentEl;
      } else if (contentEl.f7Component) {
        contentEl.f7Component.mount((componentEl) => {
          modalParams.el = componentEl;
          app.root.append(componentEl);
        });
      } else {
        modalParams.el = contentEl;
      }
      onModalLoaded();
    }
  }
  function reject() {
    router.allowPageChange = true;
    return router;
  }

  if (template || templateUrl) {
    try {
      router.modalTemplateLoader(template, templateUrl, options, resolve, reject);
    } catch (err) {
      router.allowPageChange = true;
      throw err;
    }
  } else if (component || componentUrl) {
    // Load from component (F7/Vue/React/...)
    try {
      router.modalComponentLoader(app.root[0], component, componentUrl, options, resolve, reject);
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
      .then((modalContent) => {
        modalParams.content = modalContent;
        onModalLoaded();
      })
      .catch(() => {
        router.allowPageChange = true;
      });
  } else {
    onModalLoaded();
  }
}
function modalRemove() {
  const router = this;
  const route = router.currentRoute;
  const modal = route.modal;
  modal.closeByRouter = true;
  modal.close();
}

export { modalLoad, modalRemove };

