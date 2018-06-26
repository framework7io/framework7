'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dom = require('dom7');

var _dom2 = _interopRequireDefault(_dom);

var _ssrWindow = require('ssr-window');

var _utils = require('../../utils/utils');

var _utils2 = _interopRequireDefault(_utils);

var _class = require('../../utils/class');

var _class2 = _interopRequireDefault(_class);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var openedModals = [];
var dialogsQueue = [];
function clearDialogsQueue() {
  if (dialogsQueue.length === 0) return;
  var dialog = dialogsQueue.shift();
  dialog.open();
}

var Modal = function (_Framework7Class) {
  _inherits(Modal, _Framework7Class);

  function Modal(app, params) {
    var _ret;

    _classCallCheck(this, Modal);

    var _this = _possibleConstructorReturn(this, (Modal.__proto__ || Object.getPrototypeOf(Modal)).call(this, params, [app]));

    var modal = _this;

    var defaults = {};

    // Extend defaults with modules params
    modal.useModulesParams(defaults);

    modal.params = _utils2.default.extend(defaults, params);
    modal.opened = false;

    // Install Modules
    modal.useModules();

    return _ret = _this, _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Modal, [{
    key: 'onOpen',
    value: function onOpen() {
      var modal = this;
      modal.opened = true;
      openedModals.push(modal);
      (0, _dom2.default)('html').addClass('with-modal-' + modal.type.toLowerCase());
      modal.$el.trigger('modal:open ' + modal.type.toLowerCase() + ':open', modal);
      modal.emit('local::open modalOpen ' + modal.type + 'Open', modal);
    }
  }, {
    key: 'onOpened',
    value: function onOpened() {
      var modal = this;
      modal.$el.trigger('modal:opened ' + modal.type.toLowerCase() + ':opened', modal);
      modal.emit('local::opened modalOpened ' + modal.type + 'Opened', modal);
    }
  }, {
    key: 'onClose',
    value: function onClose() {
      var modal = this;
      modal.opened = false;
      if (!modal.type || !modal.$el) return;
      openedModals.splice(openedModals.indexOf(modal), 1);
      (0, _dom2.default)('html').removeClass('with-modal-' + modal.type.toLowerCase());
      modal.$el.trigger('modal:close ' + modal.type.toLowerCase() + ':close', modal);
      modal.emit('local::close modalClose ' + modal.type + 'Close', modal);
    }
  }, {
    key: 'onClosed',
    value: function onClosed() {
      var modal = this;
      if (!modal.type || !modal.$el) return;
      modal.$el.removeClass('modal-out');
      modal.$el.hide();
      modal.$el.trigger('modal:closed ' + modal.type.toLowerCase() + ':closed', modal);
      modal.emit('local::closed modalClosed ' + modal.type + 'Closed', modal);
    }
  }, {
    key: 'open',
    value: function open(animateModal) {
      var modal = this;
      var app = modal.app;
      var $el = modal.$el;
      var $backdropEl = modal.$backdropEl;
      var type = modal.type;
      var animate = true;
      if (typeof animateModal !== 'undefined') animate = animateModal;else if (typeof modal.params.animate !== 'undefined') {
        animate = modal.params.animate;
      }

      if (!$el || $el.hasClass('modal-in')) {
        return modal;
      }

      if (type === 'dialog' && app.params.modal.queueDialogs) {
        var pushToQueue = void 0;
        if ((0, _dom2.default)('.dialog.modal-in').length > 0) {
          pushToQueue = true;
        } else if (openedModals.length > 0) {
          openedModals.forEach(function (openedModal) {
            if (openedModal.type === 'dialog') pushToQueue = true;
          });
        }
        if (pushToQueue) {
          dialogsQueue.push(modal);
          return modal;
        }
      }

      var $modalParentEl = $el.parent();
      var wasInDom = $el.parents(_ssrWindow.document).length > 0;
      if (app.params.modal.moveToRoot && !$modalParentEl.is(app.root)) {
        app.root.append($el);
        modal.once(type + 'Closed', function () {
          if (wasInDom) {
            $modalParentEl.append($el);
          } else {
            $el.remove();
          }
        });
      }
      // Show Modal
      $el.show();

      // Set Dialog offset
      if (type === 'dialog') {
        $el.css({
          marginTop: -Math.round($el.outerHeight() / 2) + 'px'
        });
      }

      // Emit open
      /* eslint no-underscore-dangle: ["error", { "allow": ["_clientLeft"] }] */
      modal._clientLeft = $el[0].clientLeft;

      // Backdrop
      if ($backdropEl) {
        $backdropEl[animate ? 'removeClass' : 'addClass']('not-animated');
        $backdropEl.addClass('backdrop-in');
      }
      // Modal
      function transitionEnd() {
        if ($el.hasClass('modal-out')) {
          modal.onClosed();
        } else if ($el.hasClass('modal-in')) {
          modal.onOpened();
        }
      }
      if (animate) {
        $el.animationEnd(function () {
          transitionEnd();
        });
        $el.transitionEnd(function () {
          transitionEnd();
        });
        $el.removeClass('modal-out not-animated').addClass('modal-in');
        modal.onOpen();
      } else {
        $el.removeClass('modal-out').addClass('modal-in not-animated');
        modal.onOpen();
        modal.onOpened();
      }

      return modal;
    }
  }, {
    key: 'close',
    value: function close(animateModal) {
      var modal = this;
      var $el = modal.$el;
      var $backdropEl = modal.$backdropEl;

      var animate = true;
      if (typeof animateModal !== 'undefined') animate = animateModal;else if (typeof modal.params.animate !== 'undefined') {
        animate = modal.params.animate;
      }

      if (!$el || !$el.hasClass('modal-in')) {
        return modal;
      }

      // backdrop
      if ($backdropEl) {
        $backdropEl[animate ? 'removeClass' : 'addClass']('not-animated');
        $backdropEl.removeClass('backdrop-in');
      }

      // Modal
      $el[animate ? 'removeClass' : 'addClass']('not-animated');
      function transitionEnd() {
        if ($el.hasClass('modal-out')) {
          modal.onClosed();
        } else if ($el.hasClass('modal-in')) {
          modal.onOpened();
        }
      }
      if (animate) {
        $el.animationEnd(function () {
          transitionEnd();
        });
        $el.transitionEnd(function () {
          transitionEnd();
        });
        $el.removeClass('modal-in').addClass('modal-out');
        // Emit close
        modal.onClose();
      } else {
        $el.addClass('not-animated').removeClass('modal-in').addClass('modal-out');
        // Emit close
        modal.onClose();
        modal.onClosed();
      }

      if (modal.type === 'dialog') {
        clearDialogsQueue();
      }

      return modal;
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      var modal = this;
      if (modal.destroyed) return;
      modal.emit('local::beforeDestroy modalBeforeDestroy ' + modal.type + 'BeforeDestroy', modal);
      if (modal.$el) {
        modal.$el.trigger('modal:beforedestroy ' + modal.type.toLowerCase() + ':beforedestroy', modal);
        if (modal.$el.length && modal.$el[0].f7Modal) {
          delete modal.$el[0].f7Modal;
        }
      }
      _utils2.default.deleteProps(modal);
      modal.destroyed = true;
    }
  }]);

  return Modal;
}(_class2.default);

exports.default = Modal;