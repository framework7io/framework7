'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ssrWindow = require('ssr-window');

var _device = require('../../../utils/device');

var _device2 = _interopRequireDefault(_device);

var _support = require('../../../utils/support');

var _support2 = _interopRequireDefault(_support);

var _onTouchStart = require('./onTouchStart');

var _onTouchStart2 = _interopRequireDefault(_onTouchStart);

var _onTouchMove = require('./onTouchMove');

var _onTouchMove2 = _interopRequireDefault(_onTouchMove);

var _onTouchEnd = require('./onTouchEnd');

var _onTouchEnd2 = _interopRequireDefault(_onTouchEnd);

var _onResize = require('./onResize');

var _onResize2 = _interopRequireDefault(_onResize);

var _onClick = require('./onClick');

var _onClick2 = _interopRequireDefault(_onClick);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function attachEvents() {
  var swiper = this;
  var params = swiper.params,
      touchEvents = swiper.touchEvents,
      el = swiper.el,
      wrapperEl = swiper.wrapperEl;


  if ("universal" !== 'desktop') {
    swiper.onTouchStart = _onTouchStart2.default.bind(swiper);
    swiper.onTouchMove = _onTouchMove2.default.bind(swiper);
    swiper.onTouchEnd = _onTouchEnd2.default.bind(swiper);
  }

  swiper.onClick = _onClick2.default.bind(swiper);

  var target = params.touchEventsTarget === 'container' ? el : wrapperEl;
  var capture = !!params.nested;

  // Touch Events
  if (process.env.TARGET !== 'desktop') {
    if (!_support2.default.touch && (_support2.default.pointerEvents || _support2.default.prefixedPointerEvents)) {
      target.addEventListener(touchEvents.start, swiper.onTouchStart, false);
      _ssrWindow.document.addEventListener(touchEvents.move, swiper.onTouchMove, capture);
      _ssrWindow.document.addEventListener(touchEvents.end, swiper.onTouchEnd, false);
    } else {
      if (_support2.default.touch) {
        var passiveListener = touchEvents.start === 'touchstart' && _support2.default.passiveListener && params.passiveListeners ? { passive: true, capture: false } : false;
        target.addEventListener(touchEvents.start, swiper.onTouchStart, passiveListener);
        target.addEventListener(touchEvents.move, swiper.onTouchMove, _support2.default.passiveListener ? { passive: false, capture: capture } : capture);
        target.addEventListener(touchEvents.end, swiper.onTouchEnd, passiveListener);
      }
      if (params.simulateTouch && !_device2.default.ios && !_device2.default.android || params.simulateTouch && !_support2.default.touch && _device2.default.ios) {
        target.addEventListener('mousedown', swiper.onTouchStart, false);
        _ssrWindow.document.addEventListener('mousemove', swiper.onTouchMove, capture);
        _ssrWindow.document.addEventListener('mouseup', swiper.onTouchEnd, false);
      }
    }
    // Prevent Links Clicks
    if (params.preventClicks || params.preventClicksPropagation) {
      target.addEventListener('click', swiper.onClick, true);
    }
  } else {
    target.addEventListener('click', swiper.onClick, false);
  }

  // Resize handler
  swiper.on(_device2.default.ios || _device2.default.android ? 'resize orientationchange observerUpdate' : 'resize observerUpdate', _onResize2.default, true);
}

function detachEvents() {
  var swiper = this;

  var params = swiper.params,
      touchEvents = swiper.touchEvents,
      el = swiper.el,
      wrapperEl = swiper.wrapperEl;


  var target = params.touchEventsTarget === 'container' ? el : wrapperEl;
  var capture = !!params.nested;

  // Touch Events
  if (process.env.TARGET !== 'desktop') {
    if (!_support2.default.touch && (_support2.default.pointerEvents || _support2.default.prefixedPointerEvents)) {
      target.removeEventListener(touchEvents.start, swiper.onTouchStart, false);
      _ssrWindow.document.removeEventListener(touchEvents.move, swiper.onTouchMove, capture);
      _ssrWindow.document.removeEventListener(touchEvents.end, swiper.onTouchEnd, false);
    } else {
      if (_support2.default.touch) {
        var passiveListener = touchEvents.start === 'onTouchStart' && _support2.default.passiveListener && params.passiveListeners ? { passive: true, capture: false } : false;
        target.removeEventListener(touchEvents.start, swiper.onTouchStart, passiveListener);
        target.removeEventListener(touchEvents.move, swiper.onTouchMove, capture);
        target.removeEventListener(touchEvents.end, swiper.onTouchEnd, passiveListener);
      }
      if (params.simulateTouch && !_device2.default.ios && !_device2.default.android || params.simulateTouch && !_support2.default.touch && _device2.default.ios) {
        target.removeEventListener('mousedown', swiper.onTouchStart, false);
        _ssrWindow.document.removeEventListener('mousemove', swiper.onTouchMove, capture);
        _ssrWindow.document.removeEventListener('mouseup', swiper.onTouchEnd, false);
      }
    }
    // Prevent Links Clicks
    if (params.preventClicks || params.preventClicksPropagation) {
      target.removeEventListener('click', swiper.onClick, true);
    }
  } else {
    target.removeEventListener('click', swiper.onClick, true);
  }

  // Resize handler
  swiper.off(_device2.default.ios || _device2.default.android ? 'resize orientationchange observerUpdate' : 'resize observerUpdate', _onResize2.default);
}

exports.default = {
  attachEvents: attachEvents,
  detachEvents: detachEvents
};