'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slideTo = require('./slideTo');

var _slideTo2 = _interopRequireDefault(_slideTo);

var _slideToLoop = require('./slideToLoop');

var _slideToLoop2 = _interopRequireDefault(_slideToLoop);

var _slideNext = require('./slideNext');

var _slideNext2 = _interopRequireDefault(_slideNext);

var _slidePrev = require('./slidePrev');

var _slidePrev2 = _interopRequireDefault(_slidePrev);

var _slideReset = require('./slideReset');

var _slideReset2 = _interopRequireDefault(_slideReset);

var _slideToClosest = require('./slideToClosest');

var _slideToClosest2 = _interopRequireDefault(_slideToClosest);

var _slideToClickedSlide = require('./slideToClickedSlide');

var _slideToClickedSlide2 = _interopRequireDefault(_slideToClickedSlide);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  slideTo: _slideTo2.default,
  slideToLoop: _slideToLoop2.default,
  slideNext: _slideNext2.default,
  slidePrev: _slidePrev2.default,
  slideReset: _slideReset2.default,
  slideToClosest: _slideToClosest2.default,
  slideToClickedSlide: _slideToClickedSlide2.default
};