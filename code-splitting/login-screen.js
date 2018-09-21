
function framework7ComponentLoader(chunks) {
  var doc = document;
  var win = window;
  var $ = chunks.$;
  var Template7 = chunks.Template7;
  var Utils = chunks.Utils;
  var Device = chunks.Device;
  var Support = chunks.Support;
  var ConstructorMethods = chunks.ConstructorMethods;
  var ModalMethods = chunks.ModalMethods;
  var Framework7Class = chunks.Framework7Class;
  var Modal = chunks.Modal;

  var LoginScreen = (function (Modal$$1) {
    function LoginScreen(app, params) {
      var extendedParams = Utils.extend({
        on: {},
      }, params);

      // Extends with open/close Modal methods;
      Modal$$1.call(this, app, extendedParams);

      var loginScreen = this;

      loginScreen.params = extendedParams;

      // Find Element
      var $el;
      if (!loginScreen.params.el) {
        $el = $(loginScreen.params.content);
      } else {
        $el = $(loginScreen.params.el);
      }

      if ($el && $el.length > 0 && $el[0].f7Modal) {
        return $el[0].f7Modal;
      }

      if ($el.length === 0) {
        return loginScreen.destroy();
      }

      Utils.extend(loginScreen, {
        app: app,
        $el: $el,
        el: $el[0],
        type: 'loginScreen',
      });

      $el[0].f7Modal = loginScreen;

      return loginScreen;
    }

    if ( Modal$$1 ) LoginScreen.__proto__ = Modal$$1;
    LoginScreen.prototype = Object.create( Modal$$1 && Modal$$1.prototype );
    LoginScreen.prototype.constructor = LoginScreen;

    return LoginScreen;
  }(Modal));

  var loginScreen = {
    name: 'loginScreen',
    static: {
      LoginScreen: LoginScreen,
    },
    create: function create() {
      var app = this;
      app.loginScreen = ModalMethods({
        app: app,
        constructor: LoginScreen,
        defaultSelector: '.login-screen.modal-in',
      });
    },
    clicks: {
      '.login-screen-open': function openLoginScreen($clickedEl, data) {
        if ( data === void 0 ) data = {};

        var app = this;
        app.loginScreen.open(data.loginScreen, data.animate);
      },
      '.login-screen-close': function closeLoginScreen($clickedEl, data) {
        if ( data === void 0 ) data = {};

        var app = this;
        app.loginScreen.close(data.loginScreen, data.animate);
      },
    },
  };

  return loginScreen;
}
framework7ComponentLoader.componentName = 'loginScreen';

