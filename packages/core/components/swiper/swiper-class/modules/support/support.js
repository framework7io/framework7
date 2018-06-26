'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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
  }
};