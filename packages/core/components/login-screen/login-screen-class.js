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

var _dom = require('dom7');

var _dom2 = _interopRequireDefault(_dom);

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
  }return call && ((typeof call === 'undefined' ? 'undefined' : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var LoginScreen = function (_Modal) {
  _inherits(LoginScreen, _Modal);

  function LoginScreen(app, params) {
    var _ret3;

    _classCallCheck(this, LoginScreen);

    var extendedParams = _utils2.default.extend({
      on: {}
    }, params);

    // Extends with open/close Modal methods;

    var _this = _possibleConstructorReturn(this, (LoginScreen.__proto__ || Object.getPrototypeOf(LoginScreen)).call(this, app, extendedParams));

    var loginScreen = _this;

    loginScreen.params = extendedParams;

    // Find Element
    var $el = void 0;
    if (!loginScreen.params.el) {
      $el = (0, _dom2.default)(loginScreen.params.content);
    } else {
      $el = (0, _dom2.default)(loginScreen.params.el);
    }

    if ($el && $el.length > 0 && $el[0].f7Modal) {
      var _ret;

      return _ret = $el[0].f7Modal, _possibleConstructorReturn(_this, _ret);
    }

    if ($el.length === 0) {
      var _ret2;

      return _ret2 = loginScreen.destroy(), _possibleConstructorReturn(_this, _ret2);
    }

    _utils2.default.extend(loginScreen, {
      app: app,
      $el: $el,
      el: $el[0],
      type: 'loginScreen'
    });

    $el[0].f7Modal = loginScreen;

    return _ret3 = loginScreen, _possibleConstructorReturn(_this, _ret3);
  }

  return LoginScreen;
}(_modalClass2.default);

exports.default = LoginScreen;