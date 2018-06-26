'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  var swiper = this;
  var classNames = swiper.classNames,
      params = swiper.params,
      rtl = swiper.rtl,
      $el = swiper.$el;

  var suffixes = [];

  suffixes.push(params.direction);

  if (params.freeMode) {
    suffixes.push('free-mode');
  }
  if (!_support2.default.flexbox) {
    suffixes.push('no-flexbox');
  }
  if (params.autoHeight) {
    suffixes.push('autoheight');
  }
  if (rtl) {
    suffixes.push('rtl');
  }
  if (params.slidesPerColumn > 1) {
    suffixes.push('multirow');
  }
  if (_device2.default.android) {
    suffixes.push('android');
  }
  if (_device2.default.ios) {
    suffixes.push('ios');
  }
  // WP8 Touch Events Fix
  if (_browser2.default.isIE && (_support2.default.pointerEvents || _support2.default.prefixedPointerEvents)) {
    suffixes.push('wp8-' + params.direction);
  }

  suffixes.forEach(function (suffix) {
    classNames.push(params.containerModifierClass + suffix);
  });

  $el.addClass(classNames.join(' '));
};

var _support = require('../../../utils/support');

var _support2 = _interopRequireDefault(_support);

var _device = require('../../../utils/device');

var _device2 = _interopRequireDefault(_device);

var _browser = require('../../../utils/browser');

var _browser2 = _interopRequireDefault(_browser);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}