'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  var swiper = this;
  var $wrapperEl = swiper.$wrapperEl,
      params = swiper.params,
      slides = swiper.slides;

  $wrapperEl.children('.' + params.slideClass + '.' + params.slideDuplicateClass).remove();
  slides.removeAttr('data-swiper-slide-index');
};