'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dom = require('dom7');

var _dom2 = _interopRequireDefault(_dom);

var _utils = require('../../utils/utils');

var _utils2 = _interopRequireDefault(_utils);

var _class = require('../../utils/class');

var _class2 = _interopRequireDefault(_class);

var _support = require('../../utils/support');

var _support2 = _interopRequireDefault(_support);

var _device = require('../../utils/device');

var _device2 = _interopRequireDefault(_device);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PullToRefresh = function (_Framework7Class) {
  _inherits(PullToRefresh, _Framework7Class);

  function PullToRefresh(app, el) {
    var _ret, _ret2;

    _classCallCheck(this, PullToRefresh);

    var _this = _possibleConstructorReturn(this, (PullToRefresh.__proto__ || Object.getPrototypeOf(PullToRefresh)).call(this, {}, [app]));

    var ptr = _this;
    var $el = (0, _dom2.default)(el);
    var $preloaderEl = $el.find('.ptr-preloader');

    ptr.$el = $el;
    ptr.el = $el[0];
    ptr.app = app;

    // Extend defaults with modules params
    ptr.useModulesParams({});

    var isMaterial = app.theme === 'md';

    // Done
    ptr.done = function done() {
      var $transitionTarget = isMaterial ? $preloaderEl : $el;
      $transitionTarget.transitionEnd(function () {
        $el.removeClass('ptr-transitioning ptr-pull-up ptr-pull-down');
        $el.trigger('ptr:done');
        ptr.emit('local::done ptrDone', $el[0]);
      });
      $el.removeClass('ptr-refreshing').addClass('ptr-transitioning');
      return ptr;
    };

    ptr.refresh = function refresh() {
      if ($el.hasClass('ptr-refreshing')) return ptr;
      $el.addClass('ptr-transitioning ptr-refreshing');
      $el.trigger('ptr:refresh', ptr.done);
      ptr.emit('local::refresh ptrRefresh', $el[0], ptr.done);
      return ptr;
    };

    // Events handling
    var touchId = void 0;
    var isTouched = void 0;
    var isMoved = void 0;
    var touchesStart = {};
    var isScrolling = void 0;
    var touchesDiff = void 0;
    var refresh = false;
    var useTranslate = false;
    var startTranslate = 0;
    var translate = void 0;
    var scrollTop = void 0;
    var wasScrolled = void 0;
    var triggerDistance = void 0;
    var dynamicTriggerDistance = void 0;
    var pullStarted = void 0;
    var hasNavbar = false;
    var $pageEl = $el.parents('.page');

    if ($pageEl.find('.navbar').length > 0 || $pageEl.parents('.view').children('.navbar').length > 0) hasNavbar = true;
    if ($pageEl.hasClass('no-navbar')) hasNavbar = false;
    if (!hasNavbar) $el.addClass('ptr-no-navbar');

    // Define trigger distance
    if ($el.attr('data-ptr-distance')) {
      dynamicTriggerDistance = true;
    } else {
      triggerDistance = isMaterial ? 66 : 44;
    }

    function handleTouchStart(e) {
      if (isTouched) {
        if (_device2.default.os === 'android') {
          if ('targetTouches' in e && e.targetTouches.length > 1) return;
        } else return;
      }

      if ($el.hasClass('ptr-refreshing')) {
        return;
      }
      if ((0, _dom2.default)(e.target).closest('.sortable-handler').length) return;

      isMoved = false;
      pullStarted = false;
      isTouched = true;
      isScrolling = undefined;
      wasScrolled = undefined;
      if (e.type === 'touchstart') touchId = e.targetTouches[0].identifier;
      touchesStart.x = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
      touchesStart.y = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
    }

    function handleTouchMove(e) {
      if (!isTouched) return;
      var pageX = void 0;
      var pageY = void 0;
      var touch = void 0;
      if (e.type === 'touchmove') {
        if (touchId && e.touches) {
          for (var i = 0; i < e.touches.length; i += 1) {
            if (e.touches[i].identifier === touchId) {
              touch = e.touches[i];
            }
          }
        }
        if (!touch) touch = e.targetTouches[0];
        pageX = touch.pageX;
        pageY = touch.pageY;
      } else {
        pageX = e.pageX;
        pageY = e.pageY;
      }
      if (!pageX || !pageY) return;

      if (typeof isScrolling === 'undefined') {
        isScrolling = !!(isScrolling || Math.abs(pageY - touchesStart.y) > Math.abs(pageX - touchesStart.x));
      }
      if (!isScrolling) {
        isTouched = false;
        return;
      }

      scrollTop = $el[0].scrollTop;
      if (typeof wasScrolled === 'undefined' && scrollTop !== 0) wasScrolled = true;

      if (!isMoved) {
        $el.removeClass('ptr-transitioning');
        if (scrollTop > $el[0].offsetHeight) {
          isTouched = false;
          return;
        }
        if (dynamicTriggerDistance) {
          triggerDistance = $el.attr('data-ptr-distance');
          if (triggerDistance.indexOf('%') >= 0) triggerDistance = $el[0].offsetHeight * parseInt(triggerDistance, 10) / 100;
        }
        startTranslate = $el.hasClass('ptr-refreshing') ? triggerDistance : 0;
        if ($el[0].scrollHeight === $el[0].offsetHeight || _device2.default.os !== 'ios' || isMaterial) {
          useTranslate = true;
        } else {
          useTranslate = false;
        }
      }
      isMoved = true;
      touchesDiff = pageY - touchesStart.y;

      if (touchesDiff > 0 && scrollTop <= 0 || scrollTop < 0) {
        // iOS 8 fix
        if (_device2.default.os === 'ios' && parseInt(_device2.default.osVersion.split('.')[0], 10) > 7 && scrollTop === 0 && !wasScrolled) useTranslate = true;

        if (useTranslate) {
          e.preventDefault();
          translate = touchesDiff ** 0.85 + startTranslate;
          if (isMaterial) {
            $preloaderEl.transform('translate3d(0,' + translate + 'px,0)').find('.ptr-arrow').transform('rotate(' + (180 * (touchesDiff / 66) + 100) + 'deg)');
          } else {
            $el.transform('translate3d(0,' + translate + 'px,0)');
          }
        }
        if (useTranslate && touchesDiff ** 0.85 > triggerDistance || !useTranslate && touchesDiff >= triggerDistance * 2) {
          refresh = true;
          $el.addClass('ptr-pull-up').removeClass('ptr-pull-down');
        } else {
          refresh = false;
          $el.removeClass('ptr-pull-up').addClass('ptr-pull-down');
        }
        if (!pullStarted) {
          $el.trigger('ptr:pullstart');
          ptr.emit('local::pullStart ptrPullStart', $el[0]);
          pullStarted = true;
        }
        $el.trigger('ptr:pullmove', {
          event: e,
          scrollTop: scrollTop,
          translate: translate,
          touchesDiff: touchesDiff
        });
        ptr.emit('local::pullMove ptrPullMove', $el[0], {
          event: e,
          scrollTop: scrollTop,
          translate: translate,
          touchesDiff: touchesDiff
        });
      } else {
        pullStarted = false;
        $el.removeClass('ptr-pull-up ptr-pull-down');
        refresh = false;
      }
    }
    function handleTouchEnd(e) {
      if (e.type === 'touchend' && e.changedTouches && e.changedTouches.length > 0 && touchId) {
        if (e.changedTouches[0].identifier !== touchId) {
          isTouched = false;
          isScrolling = false;
          isMoved = false;
          touchId = null;
          return;
        }
      }
      if (!isTouched || !isMoved) {
        isTouched = false;
        isMoved = false;
        return;
      }
      if (translate) {
        $el.addClass('ptr-transitioning');
        translate = 0;
      }
      if (isMaterial) {
        $preloaderEl.transform('').find('.ptr-arrow').transform('');
      } else {
        $el.transform('');
      }

      if (refresh) {
        $el.addClass('ptr-refreshing');
        $el.trigger('ptr:refresh', ptr.done);
        ptr.emit('local::refresh ptrRefresh', $el[0], ptr.done);
      } else {
        $el.removeClass('ptr-pull-down');
      }
      isTouched = false;
      isMoved = false;
      if (pullStarted) {
        $el.trigger('ptr:pullend');
        ptr.emit('local::pullEnd ptrPullEnd', $el[0]);
      }
    }

    if (!$pageEl.length || !$el.length) return _ret = ptr, _possibleConstructorReturn(_this, _ret);

    $el[0].f7PullToRefresh = ptr;

    // Events
    ptr.attachEvents = function attachEvents() {
      var passive = _support2.default.passiveListener ? { passive: true } : false;
      $el.on(app.touchEvents.start, handleTouchStart, passive);
      app.on('touchmove', handleTouchMove);
      app.on('touchend:passive', handleTouchEnd);
    };
    ptr.detachEvents = function detachEvents() {
      var passive = _support2.default.passiveListener ? { passive: true } : false;
      $el.off(app.touchEvents.start, handleTouchStart, passive);
      app.off('touchmove', handleTouchMove);
      app.off('touchend:passive', handleTouchEnd);
    };

    // Install Modules
    ptr.useModules();

    // Init
    ptr.init();

    return _ret2 = ptr, _possibleConstructorReturn(_this, _ret2);
  }

  _createClass(PullToRefresh, [{
    key: 'init',
    value: function init() {
      var ptr = this;
      ptr.attachEvents();
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      var ptr = this;
      ptr.emit('local::beforeDestroy ptrBeforeDestroy', ptr);
      ptr.$el.trigger('ptr:beforedestroy', ptr);
      delete ptr.el.f7PullToRefresh;
      ptr.detachEvents();
      _utils2.default.deleteProps(ptr);
      ptr = null;
    }
  }]);

  return PullToRefresh;
}(_class2.default);

exports.default = PullToRefresh;