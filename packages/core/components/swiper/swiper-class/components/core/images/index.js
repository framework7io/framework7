'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _loadImage = require('./loadImage');

var _loadImage2 = _interopRequireDefault(_loadImage);

var _preloadImages = require('./preloadImages');

var _preloadImages2 = _interopRequireDefault(_preloadImages);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

exports.default = {
  loadImage: _loadImage2.default,
  preloadImages: _preloadImages2.default
};