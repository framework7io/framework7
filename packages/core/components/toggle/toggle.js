'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dom = require('dom7');

var _dom2 = _interopRequireDefault(_dom);

var _constructorMethods = require('../../utils/constructor-methods');

var _constructorMethods2 = _interopRequireDefault(_constructorMethods);

var _toggleClass = require('./toggle-class');

var _toggleClass2 = _interopRequireDefault(_toggleClass);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'toggle',
  create: function create() {
    var app = this;
    app.toggle = (0, _constructorMethods2.default)({
      defaultSelector: '.toggle',
      constructor: _toggleClass2.default,
      app: app,
      domProp: 'f7Toggle'
    });
  },

  static: {
    Toggle: _toggleClass2.default
  },
  on: {
    tabMounted: function tabMounted(tabEl) {
      var app = this;
      (0, _dom2.default)(tabEl).find('.toggle-init').each(function (index, toggleEl) {
        return app.toggle.create({ el: toggleEl });
      });
    },
    tabBeforeRemove: function tabBeforeRemove(tabEl) {
      (0, _dom2.default)(tabEl).find('.toggle-init').each(function (index, toggleEl) {
        if (toggleEl.f7Toggle) toggleEl.f7Toggle.destroy();
      });
    },
    pageInit: function pageInit(page) {
      var app = this;
      page.$el.find('.toggle-init').each(function (index, toggleEl) {
        return app.toggle.create({ el: toggleEl });
      });
    },
    pageBeforeRemove: function pageBeforeRemove(page) {
      page.$el.find('.toggle-init').each(function (index, toggleEl) {
        if (toggleEl.f7Toggle) toggleEl.f7Toggle.destroy();
      });
    }
  }
};