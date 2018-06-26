'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  var translate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this && this.translate || 0;

  var swiper = this;
  var params = swiper.params;

  var slides = swiper.slides,
      rtl = swiper.rtlTranslate;

  if (slides.length === 0) return;
  if (typeof slides[0].swiperSlideOffset === 'undefined') swiper.updateSlidesOffset();

  var offsetCenter = -translate;
  if (rtl) offsetCenter = translate;

  // Visible Slides
  slides.removeClass(params.slideVisibleClass);

  for (var i = 0; i < slides.length; i += 1) {
    var slide = slides[i];
    var slideProgress = (offsetCenter + (params.centeredSlides ? swiper.minTranslate() : 0) - slide.swiperSlideOffset) / (slide.swiperSlideSize + params.spaceBetween);
    if (params.watchSlidesVisibility) {
      var slideBefore = -(offsetCenter - slide.swiperSlideOffset);
      var slideAfter = slideBefore + swiper.slidesSizesGrid[i];
      var isVisible = slideBefore >= 0 && slideBefore < swiper.size || slideAfter > 0 && slideAfter <= swiper.size || slideBefore <= 0 && slideAfter >= swiper.size;
      if (isVisible) {
        slides.eq(i).addClass(params.slideVisibleClass);
      }
    }
    slide.progress = rtl ? -slideProgress : slideProgress;
  }
};