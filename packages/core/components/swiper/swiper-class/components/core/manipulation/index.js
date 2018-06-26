'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _appendSlide = require('./appendSlide');

var _appendSlide2 = _interopRequireDefault(_appendSlide);

var _prependSlide = require('./prependSlide');

var _prependSlide2 = _interopRequireDefault(_prependSlide);

var _addSlide = require('./addSlide');

var _addSlide2 = _interopRequireDefault(_addSlide);

var _removeSlide = require('./removeSlide');

var _removeSlide2 = _interopRequireDefault(_removeSlide);

var _removeAllSlides = require('./removeAllSlides');

var _removeAllSlides2 = _interopRequireDefault(_removeAllSlides);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  appendSlide: _appendSlide2.default,
  prependSlide: _prependSlide2.default,
  addSlide: _addSlide2.default,
  removeSlide: _removeSlide2.default,
  removeAllSlides: _removeAllSlides2.default
};