import { extend, nextTick } from '../../shared/utils.js';
import History from '../../shared/history.js';
import asyncComponent from './async-component.js';

function modalLoad(modalType, route, loadOptions = {}, direction) {
  const router = this;
  const app = router.app;
  const isPanel = modalType === 'panel';
  const modalOrPanel = isPanel ? 'panel' : 'modal';

  const options = extend(
    {
      animate: router.params.animate,
      browserHistory: true,
      history: true,
      on: {},
      once: {},
    },
    loadOptions,
  );

  const modalParams = extend({}, route.route[modalType]);
  const modalRoute = route.route;

  const routeCallback = (modal, name) => {
    const { on, once } = options;
    let callback;
    if (name === 'open') {
      callback = on.modalOpen || once.modalOpen || on.panelOpen || once.panelOpen;
    }
    if (name === 'close') {
      callback = on.modalClose || once.modalClose || on.panelClose || once.panelClose;
    }
    if (name === 'closed') {
      callback = on.modalClosed || once.modalClosed || on.panelClosed || once.panelClosed;
    }
    if (callback) callback(modal);
  };

  function onModalLoaded() {
    // Create Modal
    const modal = app[modalType].create(modalParams);
    modalRoute.modalInstance = modal;

    const hasEl = modal.el;

    function closeOnSwipeBack() {
      modal.close();
    }
    modal.on(`${modalOrPanel}Open`, () => {
      if (!hasEl) {
        // Remove theme elements
        router.removeThemeElements(modal.el);

        // Emit events
        modal.$el.trigger(
          `${modalType.toLowerCase()}:init ${modalType.toLowerCase()}:mounted`,
          route,
          modal,
        );
        router.emit(
          `${!isPanel ? 'modalInit' : ''} ${modalType}Init ${modalType}Mounted`,
          modal.el,
          route,
          modal,
        );
      }
      router.once('swipeBackMove', closeOnSwipeBack);
      routeCallback(modal, 'open');
    });
    modal.on(`${modalOrPanel}Close`, () => {
      router.off('swipeBackMove', closeOnSwipeBack);
      if (!modal.closeByRouter) {
        router.back();
      }
      routeCallback(modal, 'close');
    });

    modal.on(`${modalOrPanel}Closed`, () => {
      modal.$el.trigger(`${modalType.toLowerCase()}:beforeremove`, route, modal);
      modal.emit(
        `${!isPanel ? 'modalBeforeRemove ' : ''}${modalType}BeforeRemove`,
        modal.el,
        route,
        modal,
      );
      const modalComponent = modal.el.f7Component;
      routeCallback(modal, 'closed');
      if (modalComponent) {
        modalComponent.destroy();
      }
      nextTick(() => {
        if (
          modalComponent ||
          modalParams.component ||
          modalParams.asyncComponent ||
          modalParams.async
        ) {
          router.removeModal(modal.el);
        }
        modal.destroy();
        delete modal.route;
        delete modalRoute.modalInstance;
      });
    });

    if (options.route) {
      // Update Browser History
      if (router.params.browserHistory && options.browserHistory) {
        History.push(
          router.view.id,
          {
            url: options.route.url,
            modal: modalType,
          },
          (router.params.browserHistoryRoot || '') +
            router.params.browserHistorySeparator +
            options.route.url,
        );
      }

      // Set Route
      if (options.route !== router.currentRoute) {
        modal.route = extend(options.route, { modal });
        router.currentRoute = modal.route;
      }

      // Update Router History
      if (options.history && !options.reloadCurrent) {
        router.history.push(options.route.url);
        router.saveHistory();
      }
    }

    if (hasEl) {
      // Remove theme elements
      router.removeThemeElements(modal.el);

      // Emit events
      modal.$el.trigger(
        `${modalType.toLowerCase()}:init ${modalType.toLowerCase()}:mounted`,
        route,
        modal,
      );
      router.emit(
        `${modalOrPanel}Init ${modalType}Init ${modalType}Mounted`,
        modal.el,
        route,
        modal,
      );
    }

    // Open
    modal.open(options.animate === false || options.animate === true ? options.animate : undefined);
  }

  // Load Modal Content
  function loadModal(loadModalParams, loadModalOptions) {
    // Load Modal Props
    const { url, content, component, componentUrl } = loadModalParams;

    // Component/Template Callbacks
    function resolve(contentEl) {
      if (contentEl) {
        if (typeof contentEl === 'string') {
          modalParams.content = contentEl;
        } else if (contentEl.f7Component) {
          contentEl.f7Component.mount((componentEl) => {
            modalParams.el = componentEl;
            app.$el.append(componentEl);
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

    if (content) {
      resolve(content);
    } else if (component || componentUrl) {
      // Load from component (F7/Vue/React/...)
      try {
        router.modalComponentLoader({
          rootEl: app.el,
          component,
          componentUrl,
          options: loadModalOptions,
          resolve,
          reject,
        });
      } catch (err) {
        router.allowPageChange = true;
        throw err;
      }
    } else if (url) {
      // Load using XHR
      if (router.xhrAbortController) {
        router.xhrAbortController.abort();
        router.xhrAbortController = false;
      }
      router
        .xhrRequest(url, loadModalOptions)
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

  let foundLoadProp;
  'url content component el componentUrl template'.split(' ').forEach((modalLoadProp) => {
    if (modalParams[modalLoadProp] && !foundLoadProp) {
      foundLoadProp = true;
      loadModal({ [modalLoadProp]: modalParams[modalLoadProp] }, options);
    }
  });
  if (!foundLoadProp && modalType === 'actions') {
    onModalLoaded();
  }

  // Async
  function asyncResolve(resolveParams, resolveOptions) {
    loadModal(resolveParams, extend(options, resolveOptions));
  }
  function asyncReject() {
    router.allowPageChange = true;
  }
  if (modalParams.async) {
    modalParams.async.call(router, {
      router,
      to: options.route,
      from: router.currentRoute,
      resolve: asyncResolve,
      reject: asyncReject,
      direction,
      app,
    });
  }
  if (modalParams.asyncComponent) {
    asyncComponent(router, modalParams.asyncComponent, asyncResolve, asyncReject);
  }
  return router;
}
function modalRemove(modal) {
  extend(modal, { closeByRouter: true });
  modal.close();
}

export { modalLoad, modalRemove };
