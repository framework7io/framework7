'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getTranslate = require('./getTranslate');

var _getTranslate2 = _interopRequireDefault(_getTranslate);

var _setTranslate = require('./setTranslate');

var _setTranslate2 = _interopRequireDefault(_setTranslate);

var _minTranslate = require('./minTranslate');

var _minTranslate2 = _interopRequireDefault(_minTranslate);

var _maxTranslate = require('./maxTranslate');

var _maxTranslate2 = _interopRequireDefault(_maxTranslate);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

exports.default = {
  getTranslate: _getTranslate2.default,
  setTranslate: _setTranslate2.default,
  minTranslate: _minTranslate2.default,
  maxTranslate: _maxTranslate2.default
};