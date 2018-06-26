'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  var swiper = this;
  var params = swiper.params,
      $wrapperEl = swiper.$wrapperEl;

  var slidesPerView = params.slidesPerView === 'auto' ? swiper.slidesPerViewDynamic() : params.slidesPerView;
  var slideToIndex = swiper.clickedIndex;
  var realIndex = void 0;
  if (params.loop) {
    if (swiper.animating) return;
    realIndex = parseInt((0, _dom2.default)(swiper.clickedSlide).attr('data-swiper-slide-index'), 10);
    if (params.centeredSlides) {
      if (slideToIndex < swiper.loopedSlides - slidesPerView / 2 || slideToIndex > swiper.slides.length - swiper.loopedSlides + slidesPerView / 2) {
        swiper.loopFix();
        slideToIndex = $wrapperEl.children('.' + params.slideClass + '[data-swiper-slide-index="' + realIndex + '"]:not(.' + params.slideDuplicateClass + ')').eq(0).index();

        _utils2.default.nextTick(function () {
          swiper.slideTo(slideToIndex);
        });
      } else {
        swiper.slideTo(slideToIndex);
      }
    } else if (slideToIndex > swiper.slides.length - slidesPerView) {
      swiper.loopFix();
      slideToIndex = $wrapperEl.children('.' + params.slideClass + '[data-swiper-slide-index="' + realIndex + '"]:not(.' + params.slideDuplicateClass + ')').eq(0).index();

      _utils2.default.nextTick(function () {
        swiper.slideTo(slideToIndex);
      });
    } else {
      swiper.slideTo(slideToIndex);
    }
  } else {
    swiper.slideTo(slideToIndex);
  }
};

var _dom = require('../../../utils/dom');

var _dom2 = _interopRequireDefault(_dom);

var _utils = require('../../../utils/utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}