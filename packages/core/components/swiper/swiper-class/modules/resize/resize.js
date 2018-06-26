'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ssrWindow = require('ssr-window');

var _utils = require('../../utils/utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

exports.default = {
  name: 'resize',
  create: function create() {
    var swiper = this;
    _utils2.default.extend(swiper, {
      resize: {
        resizeHandler: function resizeHandler() {
          if (!swiper || swiper.destroyed || !swiper.initialized) return;
          swiper.emit('beforeResize');
          swiper.emit('resize');
        },
        orientationChangeHandler: function orientationChangeHandler() {
          if (!swiper || swiper.destroyed || !swiper.initialized) return;
          swiper.emit('orientationchange');
        }
      }
    });
  },

  on: {
    init: function init() {
      var swiper = this;
      // Emit resize
      _ssrWindow.window.addEventListener('resize', swiper.resize.resizeHandler);

      // Emit orientationchange
      _ssrWindow.window.addEventListener('orientationchange', swiper.resize.orientationChangeHandler);
    },
    destroy: function destroy() {
      var swiper = this;
      _ssrWindow.window.removeEventListener('resize', swiper.resize.resizeHandler);
      _ssrWindow.window.removeEventListener('orientationchange', swiper.resize.orientationChangeHandler);
    }
  }
};