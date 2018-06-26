'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dom = require('dom7');

var _dom2 = _interopRequireDefault(_dom);

var _utils = require('../../utils/utils');

var _utils2 = _interopRequireDefault(_utils);

var _listIndexClass = require('./list-index-class');

var _listIndexClass2 = _interopRequireDefault(_listIndexClass);

var _constructorMethods = require('../../utils/constructor-methods');

var _constructorMethods2 = _interopRequireDefault(_constructorMethods);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

exports.default = {
  name: 'listIndex',
  static: {
    ListIndex: _listIndexClass2.default
  },
  create: function create() {
    var app = this;
    app.listIndex = (0, _constructorMethods2.default)({
      defaultSelector: '.list-index',
      constructor: _listIndexClass2.default,
      app: app,
      domProp: 'f7ListIndex'
    });
  },

  on: {
    tabMounted: function tabMounted(tabEl) {
      var app = this;
      (0, _dom2.default)(tabEl).find('.list-index-init').each(function (index, listIndexEl) {
        var params = _utils2.default.extend((0, _dom2.default)(listIndexEl).dataset(), { el: listIndexEl });
        app.listIndex.create(params);
      });
    },
    tabBeforeRemove: function tabBeforeRemove(tabEl) {
      (0, _dom2.default)(tabEl).find('.list-index-init').each(function (index, listIndexEl) {
        if (listIndexEl.f7ListIndex) listIndexEl.f7ListIndex.destroy();
      });
    },
    pageInit: function pageInit(page) {
      var app = this;
      page.$el.find('.list-index-init').each(function (index, listIndexEl) {
        var params = _utils2.default.extend((0, _dom2.default)(listIndexEl).dataset(), { el: listIndexEl });
        app.listIndex.create(params);
      });
    },
    pageBeforeRemove: function pageBeforeRemove(page) {
      page.$el.find('.list-index-init').each(function (index, listIndexEl) {
        if (listIndexEl.f7ListIndex) listIndexEl.f7ListIndex.destroy();
      });
    }
  }
};