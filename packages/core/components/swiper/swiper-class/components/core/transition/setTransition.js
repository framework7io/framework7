'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (duration, byController) {
  var swiper = this;

  swiper.$wrapperEl.transition(duration);

  swiper.emit('setTransition', duration, byController);
};