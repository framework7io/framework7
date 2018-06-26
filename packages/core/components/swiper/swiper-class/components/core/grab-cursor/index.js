'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _setGrabCursor = require('./setGrabCursor');

var _setGrabCursor2 = _interopRequireDefault(_setGrabCursor);

var _unsetGrabCursor = require('./unsetGrabCursor');

var _unsetGrabCursor2 = _interopRequireDefault(_unsetGrabCursor);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

exports.default = {
  setGrabCursor: _setGrabCursor2.default,
  unsetGrabCursor: _unsetGrabCursor2.default
};