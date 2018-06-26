'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _updateSize = require('./updateSize');

var _updateSize2 = _interopRequireDefault(_updateSize);

var _updateSlides = require('./updateSlides');

var _updateSlides2 = _interopRequireDefault(_updateSlides);

var _updateAutoHeight = require('./updateAutoHeight');

var _updateAutoHeight2 = _interopRequireDefault(_updateAutoHeight);

var _updateSlidesOffset = require('./updateSlidesOffset');

var _updateSlidesOffset2 = _interopRequireDefault(_updateSlidesOffset);

var _updateSlidesProgress = require('./updateSlidesProgress');

var _updateSlidesProgress2 = _interopRequireDefault(_updateSlidesProgress);

var _updateProgress = require('./updateProgress');

var _updateProgress2 = _interopRequireDefault(_updateProgress);

var _updateSlidesClasses = require('./updateSlidesClasses');

var _updateSlidesClasses2 = _interopRequireDefault(_updateSlidesClasses);

var _updateActiveIndex = require('./updateActiveIndex');

var _updateActiveIndex2 = _interopRequireDefault(_updateActiveIndex);

var _updateClickedSlide = require('./updateClickedSlide');

var _updateClickedSlide2 = _interopRequireDefault(_updateClickedSlide);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

exports.default = {
  updateSize: _updateSize2.default,
  updateSlides: _updateSlides2.default,
  updateAutoHeight: _updateAutoHeight2.default,
  updateSlidesOffset: _updateSlidesOffset2.default,
  updateSlidesProgress: _updateSlidesProgress2.default,
  updateProgress: _updateProgress2.default,
  updateSlidesClasses: _updateSlidesClasses2.default,
  updateActiveIndex: _updateActiveIndex2.default,
  updateClickedSlide: _updateClickedSlide2.default
};