'use strict';

var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _dom = require('dom7');

var _dom2 = _interopRequireDefault(_dom);

var _ssrWindow = require('ssr-window');

var _utils = require('../../utils/utils');

var _utils2 = _interopRequireDefault(_utils);

var _modalClass = require('../modal/modal-class');

var _modalClass2 = _interopRequireDefault(_modalClass);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var Toast = function (_Modal) {
  _inherits(Toast, _Modal);

  function Toast(app, params) {
    var _ret3;

    _classCallCheck(this, Toast);

    var extendedParams = _utils2.default.extend({
      on: {}
    }, app.params.toast, params);

    // Extends with open/close Modal methods;

    var _this = _possibleConstructorReturn(this, (Toast.__proto__ || Object.getPrototypeOf(Toast)).call(this, app, extendedParams));

    var toast = _this;

    toast.app = app;

    toast.params = extendedParams;

    var _toast$params = toast.params,
        closeButton = _toast$params.closeButton,
        closeTimeout = _toast$params.closeTimeout;

    var $el = void 0;
    if (!toast.params.el) {
      // Find Element
      var toastHtml = toast.render();

      $el = (0, _dom2.default)(toastHtml);
    } else {
      $el = (0, _dom2.default)(toast.params.el);
    }

    if ($el && $el.length > 0 && $el[0].f7Modal) {
      var _ret;

      return _ret = $el[0].f7Modal, _possibleConstructorReturn(_this, _ret);
    }

    if ($el.length === 0) {
      var _ret2;

      return _ret2 = toast.destroy(), _possibleConstructorReturn(_this, _ret2);
    }

    _utils2.default.extend(toast, {
      $el: $el,
      el: $el[0],
      type: 'toast'
    });

    $el[0].f7Modal = toast;

    if (closeButton) {
      $el.find('.toast-button').on('click', function () {
        toast.emit('local::closeButtonClick toastCloseButtonClick', toast);
        toast.close();
      });

      toast.on('beforeDestroy', function () {
        $el.find('.toast-button').off('click');
      });
    }

    var timeoutId = void 0;
    toast.on('open', function () {
      (0, _dom2.default)('.toast.modal-in').each(function (index, openedEl) {
        var toastInstance = app.toast.get(openedEl);
        if (openedEl !== toast.el && toastInstance) {
          toastInstance.close();
        }
      });
      if (closeTimeout) {
        timeoutId = _utils2.default.nextTick(function () {
          toast.close();
        }, closeTimeout);
      }
    });
    toast.on('close', function () {
      _ssrWindow.window.clearTimeout(timeoutId);
    });

    if (toast.params.destroyOnClose) {
      toast.once('closed', function () {
        setTimeout(function () {
          toast.destroy();
        }, 0);
      });
    }

    return _ret3 = toast, _possibleConstructorReturn(_this, _ret3);
  }

  _createClass(Toast, [{
    key: 'render',
    value: function render() {
      var toast = this;
      var app = toast.app;
      if (toast.params.render) return toast.params.render.call(toast, toast);
      var _toast$params2 = toast.params,
          position = _toast$params2.position,
          cssClass = _toast$params2.cssClass,
          icon = _toast$params2.icon,
          text = _toast$params2.text,
          closeButton = _toast$params2.closeButton,
          closeButtonColor = _toast$params2.closeButtonColor,
          closeButtonText = _toast$params2.closeButtonText;

      return ('\n      <div class="toast toast-' + position + ' ' + (cssClass || '') + ' ' + (icon ? 'toast-with-icon' : '') + '">\n        <div class="toast-content">\n          ' + (icon ? '<div class="toast-icon">' + icon + '</div>' : '') + '\n          <div class="toast-text">' + text + '</div>\n          ' + (closeButton && !icon ? ('\n          <a class="toast-button ' + (app.theme === 'md' ? 'button' : 'link') + ' ' + (closeButtonColor ? 'color-' + closeButtonColor : '') + '">' + closeButtonText + '</a>\n          ').trim() : '') + '\n        </div>\n      </div>\n    ').trim();
    }
  }]);

  return Toast;
}(_modalClass2.default);

exports.default = Toast;