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

var _template = require('template7');

var _template2 = _interopRequireDefault(_template);

var _ssrWindow = require('ssr-window');

var _utils = require('../../utils/utils');

var _utils2 = _interopRequireDefault(_utils);

var _device = require('../../utils/device');

var _device2 = _interopRequireDefault(_device);

var _class = require('../../utils/class');

var _class2 = _interopRequireDefault(_class);

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

var Framework7 = function (_Framework7Class) {
  _inherits(Framework7, _Framework7Class);

  function Framework7(params) {
    var _ret;

    _classCallCheck(this, Framework7);

    var _this = _possibleConstructorReturn(this, (Framework7.__proto__ || Object.getPrototypeOf(Framework7)).call(this, params));

    var passedParams = _utils2.default.extend({}, params);

    // App Instance
    var app = _this;

    // Default
    var defaults = {
      version: '1.0.0',
      id: 'io.framework7.testapp',
      root: 'body',
      theme: 'auto',
      language: _ssrWindow.window.navigator.language,
      routes: [],
      name: 'Framework7',
      initOnDeviceReady: true,
      init: true
    };

    // Extend defaults with modules params
    app.useModulesParams(defaults);

    // Extend defaults with passed params
    app.params = _utils2.default.extend(defaults, params);

    var $rootEl = (0, _dom2.default)(app.params.root);

    _utils2.default.extend(app, {
      // App Id
      id: app.params.id,
      // App Name
      name: app.params.name,
      // App version
      version: app.params.version,
      // Routes
      routes: app.params.routes,
      // Lang
      language: app.params.language,
      // Root
      root: $rootEl,
      // RTL
      rtl: $rootEl.css('direction') === 'rtl',
      // Theme
      theme: function getTheme() {
        if (app.params.theme === 'auto') {
          return _device2.default.ios ? 'ios' : 'md';
        }
        return app.params.theme;
      }(),
      // Initially passed parameters
      passedParams: passedParams
    });

    // Save Root
    if (app.root && app.root[0]) {
      app.root[0].f7 = app;
    }

    // Install Modules
    app.useModules();

    // Init
    if (app.params.init) {
      if (_device2.default.cordova && app.params.initOnDeviceReady) {
        (0, _dom2.default)(_ssrWindow.document).on('deviceready', function () {
          app.init();
        });
      } else {
        app.init();
      }
    }
    // Return app instance
    return _ret = app, _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Framework7, [{
    key: 'init',
    value: function init() {
      var app = this;
      if (app.initialized) return app;

      app.root.addClass('framework7-initializing');

      // RTL attr
      if (app.rtl) {
        (0, _dom2.default)('html').attr('dir', 'rtl');
      }

      // Root class
      app.root.addClass('framework7-root');

      // Theme class
      (0, _dom2.default)('html').removeClass('ios md').addClass(app.theme);

      // Data
      app.data = {};
      if (app.params.data && typeof app.params.data === 'function') {
        _utils2.default.extend(app.data, app.params.data.bind(app)());
      } else if (app.params.data) {
        _utils2.default.extend(app.data, app.params.data);
      }
      // Methods
      app.methods = {};
      if (app.params.methods) {
        Object.keys(app.params.methods).forEach(function (methodName) {
          if (typeof app.params.methods[methodName] === 'function') {
            app.methods[methodName] = app.params.methods[methodName].bind(app);
          } else {
            app.methods[methodName] = app.params.methods[methodName];
          }
        });
      }
      // Init class
      _utils2.default.nextFrame(function () {
        app.root.removeClass('framework7-initializing');
      });
      // Emit, init other modules
      app.initialized = true;
      app.emit('init');

      return app;
    }
    // eslint-disable-next-line

  }, {
    key: '$',
    get: function get() {
      return _dom2.default;
    }
    // eslint-disable-next-line

  }, {
    key: 't7',
    get: function get() {
      return _template2.default;
    }
  }], [{
    key: 'Dom7',
    get: function get() {
      return _dom2.default;
    }
  }, {
    key: '$',
    get: function get() {
      return _dom2.default;
    }
  }, {
    key: 'Template7',
    get: function get() {
      return _template2.default;
    }
  }, {
    key: 'Class',
    get: function get() {
      return _class2.default;
    }
  }]);

  return Framework7;
}(_class2.default);

exports.default = Framework7;