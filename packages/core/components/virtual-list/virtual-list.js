'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _virtualListClass = require('./virtual-list-class');

var _virtualListClass2 = _interopRequireDefault(_virtualListClass);

var _constructorMethods = require('../../utils/constructor-methods');

var _constructorMethods2 = _interopRequireDefault(_constructorMethods);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

exports.default = {
  name: 'virtualList',
  static: {
    VirtualList: _virtualListClass2.default
  },
  create: function create() {
    var app = this;
    app.virtualList = (0, _constructorMethods2.default)({
      defaultSelector: '.virtual-list',
      constructor: _virtualListClass2.default,
      app: app,
      domProp: 'f7VirtualList'
    });
  }
};