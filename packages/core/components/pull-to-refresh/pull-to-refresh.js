'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dom = require('dom7');

var _dom2 = _interopRequireDefault(_dom);

var _utils = require('../../utils/utils');

var _utils2 = _interopRequireDefault(_utils);

var _pullToRefreshClass = require('./pull-to-refresh-class');

var _pullToRefreshClass2 = _interopRequireDefault(_pullToRefreshClass);

var _constructorMethods = require('../../utils/constructor-methods');

var _constructorMethods2 = _interopRequireDefault(_constructorMethods);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'pullToRefresh',
  create: function create() {
    var app = this;
    app.ptr = _utils2.default.extend((0, _constructorMethods2.default)({
      defaultSelector: '.ptr-content',
      constructor: _pullToRefreshClass2.default,
      app: app,
      domProp: 'f7PullToRefresh'
    }), {
      done: function done(el) {
        var ptr = app.ptr.get(el);
        if (ptr) return ptr.done();
        return undefined;
      },
      refresh: function refresh(el) {
        var ptr = app.ptr.get(el);
        if (ptr) return ptr.refresh();
        return undefined;
      }
    });
  },

  static: {
    PullToRefresh: _pullToRefreshClass2.default
  },
  on: {
    tabMounted: function tabMounted(tabEl) {
      var app = this;
      var $tabEl = (0, _dom2.default)(tabEl);
      $tabEl.find('.ptr-content').each(function (index, el) {
        app.ptr.create(el);
      });
    },
    tabBeforeRemove: function tabBeforeRemove(tabEl) {
      var $tabEl = (0, _dom2.default)(tabEl);
      var app = this;
      $tabEl.find('.ptr-content').each(function (index, el) {
        app.ptr.destroy(el);
      });
    },
    pageInit: function pageInit(page) {
      var app = this;
      page.$el.find('.ptr-content').each(function (index, el) {
        app.ptr.create(el);
      });
    },
    pageBeforeRemove: function pageBeforeRemove(page) {
      var app = this;
      page.$el.find('.ptr-content').each(function (index, el) {
        app.ptr.destroy(el);
      });
    }
  }
};