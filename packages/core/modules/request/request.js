'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _request = require('../../utils/request');

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'request',
  proto: {
    request: _request2.default
  },
  static: {
    request: _request2.default
  }
}; /* eslint no-param-reassign: "off" */