'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dom = require('dom7');

var _dom2 = _interopRequireDefault(_dom);

var _utils = require('../../utils/utils');

var _utils2 = _interopRequireDefault(_utils);

var _messagebarClass = require('./messagebar-class');

var _messagebarClass2 = _interopRequireDefault(_messagebarClass);

var _constructorMethods = require('../../utils/constructor-methods');

var _constructorMethods2 = _interopRequireDefault(_constructorMethods);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

exports.default = {
  name: 'messagebar',
  static: {
    Messagebar: _messagebarClass2.default
  },
  create: function create() {
    var app = this;
    app.messagebar = (0, _constructorMethods2.default)({
      defaultSelector: '.messagebar',
      constructor: _messagebarClass2.default,
      app: app,
      domProp: 'f7Messagebar',
      addMethods: 'clear getValue setValue setPlaceholder resizePage focus blur attachmentsCreate attachmentsShow attachmentsHide attachmentsToggle renderAttachments sheetCreate sheetShow sheetHide sheetToggle'.split(' ')
    });
  },

  on: {
    tabBeforeRemove: function tabBeforeRemove(tabEl) {
      var app = this;
      (0, _dom2.default)(tabEl).find('.messagebar-init').each(function (index, messagebarEl) {
        app.messagebar.destroy(messagebarEl);
      });
    },
    tabMounted: function tabMounted(tabEl) {
      var app = this;
      (0, _dom2.default)(tabEl).find('.messagebar-init').each(function (index, messagebarEl) {
        app.messagebar.create(_utils2.default.extend({ el: messagebarEl }, (0, _dom2.default)(messagebarEl).dataset()));
      });
    },
    pageBeforeRemove: function pageBeforeRemove(page) {
      var app = this;
      page.$el.find('.messagebar-init').each(function (index, messagebarEl) {
        app.messagebar.destroy(messagebarEl);
      });
    },
    pageInit: function pageInit(page) {
      var app = this;
      page.$el.find('.messagebar-init').each(function (index, messagebarEl) {
        app.messagebar.create(_utils2.default.extend({ el: messagebarEl }, (0, _dom2.default)(messagebarEl).dataset()));
      });
    }
  }
};