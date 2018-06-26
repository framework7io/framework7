'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _routerClass = require('./router-class');

var _routerClass2 = _interopRequireDefault(_routerClass);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'router',
  static: {
    Router: _routerClass2.default
  },
  instance: {
    cache: {
      xhr: [],
      templates: [],
      components: []
    }
  },
  create: function create() {
    var instance = this;
    if (instance.app) {
      // View Router
      if (instance.params.router) {
        instance.router = new _routerClass2.default(instance.app, instance);
      }
    } else {
      // App Router
      instance.router = new _routerClass2.default(instance);
    }
  }
};