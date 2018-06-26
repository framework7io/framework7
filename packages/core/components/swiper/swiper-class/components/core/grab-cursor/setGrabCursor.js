'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (moving) {
  var swiper = this;
  if (_support2.default.touch || !swiper.params.simulateTouch || swiper.params.watchOverflow && swiper.isLocked) return;
  var el = swiper.el;
  el.style.cursor = 'move';
  el.style.cursor = moving ? '-webkit-grabbing' : '-webkit-grab';
  el.style.cursor = moving ? '-moz-grabbin' : '-moz-grab';
  el.style.cursor = moving ? 'grabbing' : 'grab';
};

var _support = require('../../../utils/support');

var _support2 = _interopRequireDefault(_support);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}