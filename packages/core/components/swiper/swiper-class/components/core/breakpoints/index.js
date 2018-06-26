'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _setBreakpoint = require('./setBreakpoint');

var _setBreakpoint2 = _interopRequireDefault(_setBreakpoint);

var _getBreakpoint = require('./getBreakpoint');

var _getBreakpoint2 = _interopRequireDefault(_getBreakpoint);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = { setBreakpoint: _setBreakpoint2.default, getBreakpoint: _getBreakpoint2.default };