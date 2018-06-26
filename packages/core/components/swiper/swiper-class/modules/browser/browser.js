'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _browser = require('../../utils/browser');

var _browser2 = _interopRequireDefault(_browser);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

exports.default = {
  name: 'browser',
  proto: {
    browser: _browser2.default
  },
  static: {
    browser: _browser2.default
  }
};