'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _loginScreenClass = require('./login-screen-class');

var _loginScreenClass2 = _interopRequireDefault(_loginScreenClass);

var _modalMethods = require('../../utils/modal-methods');

var _modalMethods2 = _interopRequireDefault(_modalMethods);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

exports.default = {
  name: 'loginScreen',
  static: {
    LoginScreen: _loginScreenClass2.default
  },
  create: function create() {
    var app = this;
    app.loginScreen = (0, _modalMethods2.default)({
      app: app,
      constructor: _loginScreenClass2.default,
      defaultSelector: '.login-screen.modal-in'
    });
  },

  clicks: {
    '.login-screen-open': function openLoginScreen($clickedEl) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var app = this;
      app.loginScreen.open(data.loginScreen, data.animate);
    },
    '.login-screen-close': function closeLoginScreen($clickedEl) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var app = this;
      app.loginScreen.close(data.loginScreen, data.animate);
    }
  }
};