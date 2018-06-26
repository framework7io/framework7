'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  var swiper = this;
  var $el = swiper.$el,
      classNames = swiper.classNames;

  $el.removeClass(classNames.join(' '));
};