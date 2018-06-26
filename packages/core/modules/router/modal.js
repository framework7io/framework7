'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.modalRemove = exports.modalLoad = undefined;

var _utils = require('../../utils/utils');

var _utils2 = _interopRequireDefault(_utils);

var _history = require('../../utils/history');

var _history2 = _interopRequireDefault(_history);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function modalLoad(modalType, route) {
  var loadOptions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var router = this;
  var app = router.app;

  var options = _utils2.default.extend({
    animate: router.params.animate,
    pushState: true,
    history: true,
    on: {}
  }, loadOptions);

  var modalParams = _utils2.default.extend({}, route.route[modalType]);
  var modalRoute = route.route;

  function onModalLoaded() {
    // Create Modal
    var modal = app[modalType].create(modalParams);
    modalRoute.modalInstance = modal;

    var hasEl = modal.el;

    function closeOnSwipeBack() {
      modal.close();
    }
    modal.on('modalOpen', function () {
      if (!hasEl) {
        // Remove theme elements
        router.removeThemeElements(modal.el);

        // Emit events
        modal.$el.trigger(modalType.toLowerCase() + ':init ' + modalType.toLowerCase() + ':mounted', route, modal);
        router.emit('modalInit ' + modalType + 'Init ' + modalType + 'Mounted', modal.el, route, modal);
      }
      router.once('swipeBackMove', closeOnSwipeBack);
    });
    modal.on('modalClose', function () {
      router.off('swipeBackMove', closeOnSwipeBack);
      if (!modal.closeByRouter) {
        router.back();
      }
    });

    modal.on('modalClosed', function () {
      modal.$el.trigger(modalType.toLowerCase() + ':beforeremove', route, modal);
      modal.emit('modalBeforeRemove ' + modalType + 'BeforeRemove', modal.el, route, modal);
      var modalComponent = modal.el.f7Component;
      if (modalComponent) {
        modalComponent.$destroy();
      }
      _utils2.default.nextTick(function () {
        if (modalComponent || modalParams.component) {
          router.removeModal(modal.el);
        }
        modal.destroy();
        delete modalRoute.modalInstance;
      });
    });

    if (options.route) {
      // Update Browser History
      if (router.params.pushState && options.pushState) {
        _history2.default.push(router.view.id, {
          url: options.route.url,
          modal: modalType
        }, (router.params.pushStateRoot || '') + router.params.pushStateSeparator + options.route.url);
      }

      // Set Route
      if (options.route !== router.currentRoute) {
        router.currentRoute = _utils2.default.extend(options.route, { modal: modal });
      }

      // Update Router History
      if (options.history) {
        router.history.push(options.route.url);
        router.saveHistory();
      }
    }

    if (hasEl) {
      // Remove theme elements
      router.removeThemeElements(modal.el);

      // Emit events
      modal.$el.trigger(modalType.toLowerCase() + ':init ' + modalType.toLowerCase() + ':mounted', route, modal);
      router.emit('modalInit ' + modalType + 'Init ' + modalType + 'Mounted', modal.el, route, modal);
    }

    // Open
    modal.open();
  }

  // Load Modal Content
  function loadModal(loadModalParams, loadModalOptions) {
    // Load Modal Props
    var url = loadModalParams.url,
        content = loadModalParams.content,
        template = loadModalParams.template,
        templateUrl = loadModalParams.templateUrl,
        component = loadModalParams.component,
        componentUrl = loadModalParams.componentUrl;

    // Component/Template Callbacks

    function resolve(contentEl) {
      if (contentEl) {
        if (typeof contentEl === 'string') {
          modalParams.content = contentEl;
        } else if (contentEl.f7Component) {
          contentEl.f7Component.$mount(function (componentEl) {
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

    if (content) {
      resolve(content);
    } else if (template || templateUrl) {
      try {
        router.modalTemplateLoader(template, templateUrl, loadModalOptions, resolve, reject);
      } catch (err) {
        router.allowPageChange = true;
        throw err;
      }
    } else if (component || componentUrl) {
      // Load from component (F7/Vue/React/...)
      try {
        router.modalComponentLoader(app.root[0], component, componentUrl, loadModalOptions, resolve, reject);
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
      router.xhrRequest(url, loadModalOptions).then(function (modalContent) {
        modalParams.content = modalContent;
        onModalLoaded();
      }).catch(function () {
        router.allowPageChange = true;
      });
    } else {
      onModalLoaded();
    }
  }

  var foundLoadProp = void 0;
  'url content component el componentUrl template templateUrl'.split(' ').forEach(function (modalLoadProp) {
    if (modalParams[modalLoadProp] && !foundLoadProp) {
      foundLoadProp = true;
      loadModal(_defineProperty({}, modalLoadProp, modalParams[modalLoadProp]), options);
    }
  });
  if (!foundLoadProp && modalType === 'actions') {
    onModalLoaded();
  }

  // Async
  function asyncResolve(resolveParams, resolveOptions) {
    loadModal(resolveParams, _utils2.default.extend(options, resolveOptions));
  }
  function asyncReject() {
    router.allowPageChange = true;
  }
  if (modalParams.async) {
    modalParams.async.call(router, options.route, router.currentRoute, asyncResolve, asyncReject);
  }
  return router;
}
function modalRemove(modal) {
  _utils2.default.extend(modal, { closeByRouter: true });
  modal.close();
}

exports.modalLoad = modalLoad;
exports.modalRemove = modalRemove;