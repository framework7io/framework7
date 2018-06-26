'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _componentsRouter = require('./components-router');

var _componentsRouter2 = _interopRequireDefault(_componentsRouter);

var _f = require('./f7');

var _f2 = _interopRequireDefault(_f);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

/* eslint no-underscore-dangle: "off" */
var Plugin = {
  name: 'phenomePlugin',
  install: function install() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var Framework7 = this;
    _f2.default.Framework7 = Framework7;

    var Extend = _react2.default.Component; // eslint-disable-line
    var compiler = 'react'; // eslint-disable-line
    var refs = 'refs'; // eslint-disable-line


    // Define protos
    Object.defineProperty(Extend.prototype, '$f7', {
      get: function get() {
        return _f2.default.instance;
      }
    });

    var $theme = {};
    var theme = params.theme;

    if (theme === 'md') $theme.md = true;
    if (theme === 'ios') $theme.ios = true;
    if (!theme || theme === 'auto') {
      $theme.ios = !!(Framework7.Device || Framework7.device).ios;
      $theme.md = !(Framework7.Device || Framework7.device).ios;
    }
    Object.defineProperty(Extend.prototype, '$theme', {
      get: function get() {
        return {
          ios: _f2.default.instance ? _f2.default.instance.theme === 'ios' : $theme.ios,
          md: _f2.default.instance ? _f2.default.instance.theme === 'md' : $theme.md
        };
      }
    });

    function f7ready(callback) {
      _f2.default.ready(callback);
    }
    Extend.prototype.Dom7 = Framework7.$;
    Extend.prototype.$$ = Framework7.$;
    Extend.prototype.$device = Framework7.device;
    Extend.prototype.$request = Framework7.request;
    Extend.prototype.$utils = Framework7.utils;
    Extend.prototype.$f7ready = f7ready;
    Extend.prototype.$f7Ready = f7ready;

    Object.defineProperty(Extend.prototype, '$f7route', {
      get: function get() {
        var self = this;
        if (self.props && self.props.f7route) return self.props.f7route;
        if (self.f7route) return self.f7route;
        if (self._f7route) return self._f7route;
        var route = void 0;
        var parent = self;
        while (parent && !route) {
          if (parent._f7route) route = parent._f7route;
          if (compiler === 'vue') {
            parent = parent.$parent;
          } else {
            parent = parent._reactInternalFiber._debugOwner.stateNode;
          }
        }
        return route;
      },
      set: function set(value) {
        var self = this;
        self._f7route = value;
      }
    });
    Object.defineProperty(Extend.prototype, '$f7router', {
      get: function get() {
        var self = this;
        if (self.props && self.props.f7router) return self.props.f7router;
        if (self.f7router) return self.f7router;
        if (self._f7router) return self._f7router;
        var router = void 0;
        var parent = self;
        while (parent && !router) {
          if (parent._f7router) router = parent._f7router;else if (parent.f7View) {
            router = parent.f7View.router;
          } else if (parent[refs] && parent[refs].el && parent[refs].el.f7View) {
            router = parent[refs].el.f7View.router;
          }
          if (compiler === 'vue') {
            parent = parent.$parent;
          } else {
            parent = parent._reactInternalFiber._debugOwner.stateNode;
          }
        }
        return router;
      },
      set: function set(value) {
        var self = this;
        self._f7router = value;
      }
    });

    // Extend F7 Router
    Framework7.Router.use(_componentsRouter2.default);
  }
};

exports.default = Plugin;