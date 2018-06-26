'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (event) {
  var swiper = this;
  var data = swiper.touchEventsData;
  var params = swiper.params,
      touches = swiper.touches;

  if (swiper.animating && params.preventIntercationOnTransition) {
    return;
  }
  var e = event;
  if (e.originalEvent) e = e.originalEvent;
  data.isTouchEvent = e.type === 'touchstart';
  if (!data.isTouchEvent && 'which' in e && e.which === 3) return;
  if (data.isTouched && data.isMoved) return;
  if (params.noSwiping && (0, _dom2.default)(e.target).closest(params.noSwipingSelector ? params.noSwipingSelector : '.' + params.noSwipingClass)[0]) {
    swiper.allowClick = true;
    return;
  }
  if (params.swipeHandler) {
    if (!(0, _dom2.default)(e).closest(params.swipeHandler)[0]) return;
  }

  touches.currentX = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
  touches.currentY = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
  var startX = touches.currentX;
  var startY = touches.currentY;

  // Do NOT start if iOS edge swipe is detected. Otherwise iOS app (UIWebView) cannot swipe-to-go-back anymore

  if (_device2.default.ios && !_device2.default.cordova && params.iOSEdgeSwipeDetection && (startX <= params.iOSEdgeSwipeThreshold || startX >= _ssrWindow.window.screen.width - params.iOSEdgeSwipeThreshold)) {
    return;
  }

  _utils2.default.extend(data, {
    isTouched: true,
    isMoved: false,
    allowTouchCallbacks: true,
    isScrolling: undefined,
    startMoving: undefined
  });

  touches.startX = startX;
  touches.startY = startY;
  data.touchStartTime = _utils2.default.now();
  swiper.allowClick = true;
  swiper.updateSize();
  swiper.swipeDirection = undefined;
  if (params.threshold > 0) data.allowThresholdMove = false;
  if (e.type !== 'touchstart') {
    var preventDefault = true;
    if ((0, _dom2.default)(e.target).is(data.formElements)) preventDefault = false;
    if (_ssrWindow.document.activeElement && (0, _dom2.default)(_ssrWindow.document.activeElement).is(data.formElements) && _ssrWindow.document.activeElement !== e.target) {
      _ssrWindow.document.activeElement.blur();
    }
    if (preventDefault && swiper.allowTouchMove) {
      e.preventDefault();
    }
  }
  swiper.emit('touchStart', e);
};

var _ssrWindow = require('ssr-window');

var _dom = require('../../../utils/dom');

var _dom2 = _interopRequireDefault(_dom);

var _device = require('../../../utils/device');

var _device2 = _interopRequireDefault(_device);

var _utils = require('../../../utils/utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }