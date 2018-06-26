'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ssrWindow = require('ssr-window');

var _support = require('../../utils/support');

var _support2 = _interopRequireDefault(_support);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

exports.default = {
  name: 'support',
  proto: {
    support: _support2.default
  },
  static: {
    support: _support2.default
  },
  on: {
    init: function init() {
      var html = _ssrWindow.document.querySelector('html');
      if (!html) return;
      var classNames = [];
      if (_support2.default.positionSticky) {
        classNames.push('support-position-sticky');
      }
      // Add html classes
      classNames.forEach(function (className) {
        html.classList.add(className);
      });
    }
  }
};