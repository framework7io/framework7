'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ssrWindow = require('ssr-window');

var _dom = require('../../utils/dom');

var _dom2 = _interopRequireDefault(_dom);

var _utils = require('../../utils/utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var Keyboard = {
  handle: function handle(event) {
    var swiper = this;
    var rtl = swiper.rtlTranslate;

    var e = event;
    if (e.originalEvent) e = e.originalEvent; // jquery fix
    var kc = e.keyCode || e.charCode;
    // Directions locks
    if (!swiper.allowSlideNext && (swiper.isHorizontal() && kc === 39 || swiper.isVertical() && kc === 40)) {
      return false;
    }
    if (!swiper.allowSlidePrev && (swiper.isHorizontal() && kc === 37 || swiper.isVertical() && kc === 38)) {
      return false;
    }
    if (e.shiftKey || e.altKey || e.ctrlKey || e.metaKey) {
      return undefined;
    }
    if (_ssrWindow.document.activeElement && _ssrWindow.document.activeElement.nodeName && (_ssrWindow.document.activeElement.nodeName.toLowerCase() === 'input' || _ssrWindow.document.activeElement.nodeName.toLowerCase() === 'textarea')) {
      return undefined;
    }
    if (swiper.params.keyboard.onlyInViewport && (kc === 37 || kc === 39 || kc === 38 || kc === 40)) {
      var inView = false;
      // Check that swiper should be inside of visible area of window
      if (swiper.$el.parents('.' + swiper.params.slideClass).length > 0 && swiper.$el.parents('.' + swiper.params.slideActiveClass).length === 0) {
        return undefined;
      }
      var windowWidth = _ssrWindow.window.innerWidth;
      var windowHeight = _ssrWindow.window.innerHeight;
      var swiperOffset = swiper.$el.offset();
      if (rtl) swiperOffset.left -= swiper.$el[0].scrollLeft;
      var swiperCoord = [[swiperOffset.left, swiperOffset.top], [swiperOffset.left + swiper.width, swiperOffset.top], [swiperOffset.left, swiperOffset.top + swiper.height], [swiperOffset.left + swiper.width, swiperOffset.top + swiper.height]];
      for (var i = 0; i < swiperCoord.length; i += 1) {
        var point = swiperCoord[i];
        if (point[0] >= 0 && point[0] <= windowWidth && point[1] >= 0 && point[1] <= windowHeight) {
          inView = true;
        }
      }
      if (!inView) return undefined;
    }
    if (swiper.isHorizontal()) {
      if (kc === 37 || kc === 39) {
        if (e.preventDefault) e.preventDefault();else e.returnValue = false;
      }
      if (kc === 39 && !rtl || kc === 37 && rtl) swiper.slideNext();
      if (kc === 37 && !rtl || kc === 39 && rtl) swiper.slidePrev();
    } else {
      if (kc === 38 || kc === 40) {
        if (e.preventDefault) e.preventDefault();else e.returnValue = false;
      }
      if (kc === 40) swiper.slideNext();
      if (kc === 38) swiper.slidePrev();
    }
    swiper.emit('keyPress', kc);
    return undefined;
  },
  enable: function enable() {
    var swiper = this;
    if (swiper.keyboard.enabled) return;
    (0, _dom2.default)(_ssrWindow.document).on('keydown', swiper.keyboard.handle);
    swiper.keyboard.enabled = true;
  },
  disable: function disable() {
    var swiper = this;
    if (!swiper.keyboard.enabled) return;
    (0, _dom2.default)(_ssrWindow.document).off('keydown', swiper.keyboard.handle);
    swiper.keyboard.enabled = false;
  }
};

exports.default = {
  name: 'keyboard',
  params: {
    keyboard: {
      enabled: false,
      onlyInViewport: true
    }
  },
  create: function create() {
    var swiper = this;
    _utils2.default.extend(swiper, {
      keyboard: {
        enabled: false,
        enable: Keyboard.enable.bind(swiper),
        disable: Keyboard.disable.bind(swiper),
        handle: Keyboard.handle.bind(swiper)
      }
    });
  },

  on: {
    init: function init() {
      var swiper = this;
      if (swiper.params.keyboard.enabled) {
        swiper.keyboard.enable();
      }
    },
    destroy: function destroy() {
      var swiper = this;
      if (swiper.keyboard.enabled) {
        swiper.keyboard.disable();
      }
    }
  }
};