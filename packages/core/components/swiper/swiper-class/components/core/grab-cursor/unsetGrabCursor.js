'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  var swiper = this;
  if (_support2.default.touch || swiper.params.watchOverflow && swiper.isLocked) return;
  swiper.el.style.cursor = '';
};

var _support = require('../../../utils/support');

var _support2 = _interopRequireDefault(_support);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}