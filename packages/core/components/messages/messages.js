'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dom = require('dom7');

var _dom2 = _interopRequireDefault(_dom);

var _messagesClass = require('./messages-class');

var _messagesClass2 = _interopRequireDefault(_messagesClass);

var _constructorMethods = require('../../utils/constructor-methods');

var _constructorMethods2 = _interopRequireDefault(_constructorMethods);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'messages',
  static: {
    Messages: _messagesClass2.default
  },
  create: function create() {
    var app = this;
    app.messages = (0, _constructorMethods2.default)({
      defaultSelector: '.messages',
      constructor: _messagesClass2.default,
      app: app,
      domProp: 'f7Messages',
      addMethods: 'renderMessages layout scroll clear removeMessage removeMessages addMessage addMessages'.split(' ')
    });
  },

  on: {
    tabBeforeRemove: function tabBeforeRemove(tabEl) {
      var app = this;
      (0, _dom2.default)(tabEl).find('.messages-init').each(function (index, messagesEl) {
        app.messages.destroy(messagesEl);
      });
    },
    tabMounted: function tabMounted(tabEl) {
      var app = this;
      (0, _dom2.default)(tabEl).find('.messages-init').each(function (index, messagesEl) {
        app.messages.create({ el: messagesEl });
      });
    },
    pageBeforeRemove: function pageBeforeRemove(page) {
      var app = this;
      page.$el.find('.messages-init').each(function (index, messagesEl) {
        app.messages.destroy(messagesEl);
      });
    },
    pageInit: function pageInit(page) {
      var app = this;
      page.$el.find('.messages-init').each(function (index, messagesEl) {
        app.messages.create({ el: messagesEl });
      });
    }
  },
  clicks: {}
};