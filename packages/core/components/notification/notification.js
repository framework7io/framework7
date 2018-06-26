'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = require('../../utils/utils');

var _utils2 = _interopRequireDefault(_utils);

var _notificationClass = require('./notification-class');

var _notificationClass2 = _interopRequireDefault(_notificationClass);

var _modalMethods = require('../../utils/modal-methods');

var _modalMethods2 = _interopRequireDefault(_modalMethods);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

exports.default = {
  name: 'notification',
  static: {
    Notification: _notificationClass2.default
  },
  create: function create() {
    var app = this;
    app.notification = _utils2.default.extend({}, (0, _modalMethods2.default)({
      app: app,
      constructor: _notificationClass2.default,
      defaultSelector: '.notification.modal-in'
    }));
  },

  params: {
    notification: {
      icon: null,
      title: null,
      titleRightText: null,
      subtitle: null,
      text: null,
      closeButton: false,
      closeTimeout: null,
      closeOnClick: false,
      swipeToClose: true,
      cssClass: null,
      render: null
    }
  }
};