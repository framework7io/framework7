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

var _utils = require('../../utils/utils');

var _utils2 = _interopRequireDefault(_utils);

var _router = require('../../modules/router/router');

var _router2 = _interopRequireDefault(_router);

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

var View = function (_Framework7Class) {
  _inherits(View, _Framework7Class);

  function View(appInstance, el) {
    var _ret;

    var viewParams = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    _classCallCheck(this, View);

    var _this = _possibleConstructorReturn(this, (View.__proto__ || Object.getPrototypeOf(View)).call(this, viewParams, [appInstance]));

    var app = appInstance;
    var $el = (0, _dom2.default)(el);
    var view = _this;

    var defaults = {
      routes: [],
      routesAdd: []
    };

    // Default View params
    view.params = _utils2.default.extend(defaults, app.params.view, viewParams);

    // Routes
    if (view.params.routes.length > 0) {
      view.routes = view.params.routes;
    } else {
      view.routes = [].concat(app.routes, view.params.routesAdd);
    }

    // Selector
    var selector = void 0;
    if (typeof el === 'string') selector = el;else {
      // Supposed to be HTMLElement or Dom7
      selector = ($el.attr('id') ? '#' + $el.attr('id') : '') + ($el.attr('class') ? '.' + $el.attr('class').replace(/ /g, '.').replace('.active', '') : '');
    }

    // DynamicNavbar
    var $navbarEl = void 0;
    if (app.theme === 'ios' && view.params.iosDynamicNavbar && view.params.iosSeparateDynamicNavbar) {
      $navbarEl = $el.children('.navbar').eq(0);
      if ($navbarEl.length === 0) {
        $navbarEl = (0, _dom2.default)('<div class="navbar"></div>');
      }
    }

    // View Props
    _utils2.default.extend(false, view, {
      app: app,
      $el: $el,
      el: $el[0],
      name: view.params.name,
      main: view.params.main || $el.hasClass('view-main'),
      $navbarEl: $navbarEl,
      navbarEl: $navbarEl ? $navbarEl[0] : undefined,
      selector: selector,
      history: [],
      scrollHistory: {}
    });

    // Save in DOM
    $el[0].f7View = view;

    // Install Modules
    view.useModules();

    // Add to app
    app.views.push(view);
    if (view.main) {
      app.views.main = view;
    }
    if (view.name) {
      app.views[view.name] = view;
    }

    // Index
    view.index = app.views.indexOf(view);

    // View ID
    var viewId = void 0;
    if (view.name) {
      viewId = 'view_' + view.name;
    } else if (view.main) {
      viewId = 'view_main';
    } else {
      viewId = 'view_' + view.index;
    }
    view.id = viewId;

    // Init View
    if (app.initialized) {
      view.init();
    } else {
      app.on('init', function () {
        view.init();
      });
    }

    return _ret = view, _possibleConstructorReturn(_this, _ret);
  }

  _createClass(View, [{
    key: 'destroy',
    value: function destroy() {
      var view = this;
      var app = view.app;

      view.$el.trigger('view:beforedestroy', view);
      view.emit('local::beforeDestroy viewBeforeDestroy', view);

      if (view.main) {
        app.views.main = null;
        delete app.views.main;
      } else if (view.name) {
        app.views[view.name] = null;
        delete app.views[view.name];
      }
      view.$el[0].f7View = null;
      delete view.$el[0].f7View;

      app.views.splice(app.views.indexOf(view), 1);

      // Destroy Router
      if (view.params.router && view.router) {
        view.router.destroy();
      }

      view.emit('local::destroy viewDestroy', view);

      // Delete props & methods
      Object.keys(view).forEach(function (viewProp) {
        view[viewProp] = null;
        delete view[viewProp];
      });

      view = null;
    }
  }, {
    key: 'init',
    value: function init() {
      var view = this;
      if (view.params.router) {
        view.router.init();
      }
    }
  }]);

  return View;
}(_class2.default);

// Use Router


View.use(_router2.default);

exports.default = View;