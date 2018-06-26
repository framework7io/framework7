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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Stepper = function (_Framework7Class) {
  _inherits(Stepper, _Framework7Class);

  function Stepper(app, params) {
    var _ret, _ret2, _ret3;

    _classCallCheck(this, Stepper);

    var _this = _possibleConstructorReturn(this, (Stepper.__proto__ || Object.getPrototypeOf(Stepper)).call(this, params, [app]));

    var stepper = _this;

    var defaults = {
      el: null,
      inputEl: null,
      valueEl: null,
      value: 0,
      formatValue: null,
      step: 1,
      min: 0,
      max: 100,
      watchInput: true,
      autorepeat: false,
      autorepeatDynamic: false,
      wraps: false
    };

    // Extend defaults with modules params
    stepper.useModulesParams(defaults);

    stepper.params = _utils2.default.extend(defaults, params);
    if (stepper.params.value < stepper.params.min) {
      stepper.params.value = stepper.params.min;
    }
    if (stepper.params.value > stepper.params.max) {
      stepper.params.value = stepper.params.max;
    }

    var el = stepper.params.el;
    if (!el) return _ret = stepper, _possibleConstructorReturn(_this, _ret);

    var $el = (0, _dom2.default)(el);
    if ($el.length === 0) return _ret2 = stepper, _possibleConstructorReturn(_this, _ret2);

    var $inputEl = void 0;
    if (stepper.params.inputEl) {
      $inputEl = (0, _dom2.default)(stepper.params.inputEl);
    } else if ($el.find('.stepper-input-wrap').find('input, textarea').length) {
      $inputEl = $el.find('.stepper-input-wrap').find('input, textarea').eq(0);
    }

    if ($inputEl && $inputEl.length) {
      'step min max'.split(' ').forEach(function (paramName) {
        if (!params[paramName] && $inputEl.attr(paramName)) {
          stepper.params[paramName] = parseFloat($inputEl.attr(paramName));
        }
      });

      var inputValue = parseFloat($inputEl.val());
      if (typeof params.value === 'undefined' && !Number.isNaN(inputValue) && (inputValue || inputValue === 0)) {
        stepper.params.value = inputValue;
      }
    }

    var $valueEl = void 0;
    if (stepper.params.valueEl) {
      $valueEl = (0, _dom2.default)(stepper.params.valueEl);
    } else if ($el.find('.stepper-value').length) {
      $valueEl = $el.find('.stepper-value').eq(0);
    }

    var $buttonPlusEl = $el.find('.stepper-button-plus');
    var $buttonMinusEl = $el.find('.stepper-button-minus');

    var _stepper$params = stepper.params,
        step = _stepper$params.step,
        min = _stepper$params.min,
        max = _stepper$params.max,
        value = _stepper$params.value;


    _utils2.default.extend(stepper, {
      app: app,
      $el: $el,
      el: $el[0],
      $buttonPlusEl: $buttonPlusEl,
      buttonPlusEl: $buttonPlusEl[0],
      $buttonMinusEl: $buttonMinusEl,
      buttonMinusEl: $buttonMinusEl[0],
      $inputEl: $inputEl,
      inputEl: $inputEl ? $inputEl[0] : undefined,
      $valueEl: $valueEl,
      valueEl: $valueEl ? $valueEl[0] : undefined,
      step: step,
      min: min,
      max: max,
      value: value
    });

    $el[0].f7Stepper = stepper;

    // Handle Events
    var touchesStart = {};
    var isTouched = void 0;
    var isScrolling = void 0;
    var preventButtonClick = void 0;
    var intervalId = void 0;
    var timeoutId = void 0;
    var autorepeatAction = null;
    var autorepeatInAction = false;

    function dynamicRepeat(current, progressions, startsIn, progressionStep, repeatEvery, action) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(function () {
        if (current === 1) {
          preventButtonClick = true;
          autorepeatInAction = true;
        }
        clearInterval(intervalId);
        action();
        intervalId = setInterval(function () {
          action();
        }, repeatEvery);
        if (current < progressions) {
          dynamicRepeat(current + 1, progressions, startsIn, progressionStep, repeatEvery / 2, action);
        }
      }, current === 1 ? startsIn : progressionStep);
    }

    function onTouchStart(e) {
      if (isTouched) return;
      if ((0, _dom2.default)(e.target).closest($buttonPlusEl).length) {
        autorepeatAction = 'increment';
      } else if ((0, _dom2.default)(e.target).closest($buttonMinusEl).length) {
        autorepeatAction = 'decrement';
      }
      if (!autorepeatAction) return;

      touchesStart.x = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
      touchesStart.y = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
      isTouched = true;
      isScrolling = undefined;

      var progressions = stepper.params.autorepeatDynamic ? 4 : 1;
      dynamicRepeat(1, progressions, 500, 1000, 300, function () {
        stepper[autorepeatAction]();
      });
    }
    function onTouchMove(e) {
      if (!isTouched) return;
      var pageX = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
      var pageY = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;

      if (typeof isScrolling === 'undefined' && !autorepeatInAction) {
        isScrolling = !!(isScrolling || Math.abs(pageY - touchesStart.y) > Math.abs(pageX - touchesStart.x));
      }
      var distance = ((pageX - touchesStart.x) ** 2 + (pageY - touchesStart.y) ** 2) ** 0.5;

      if (isScrolling || distance > 20) {
        isTouched = false;
        clearTimeout(timeoutId);
        clearInterval(intervalId);
      }
    }
    function onTouchEnd() {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
      autorepeatAction = null;
      autorepeatInAction = false;
      isTouched = false;
    }

    function onMinusClick() {
      if (preventButtonClick) {
        preventButtonClick = false;
        return;
      }
      stepper.decrement();
    }
    function onPlusClick() {
      if (preventButtonClick) {
        preventButtonClick = false;
        return;
      }
      stepper.increment();
    }
    function onInput(e) {
      if (e.detail && e.detail.sentByF7Stepper) return;
      stepper.setValue(e.target.value, true);
    }
    stepper.attachEvents = function attachEvents() {
      $buttonMinusEl.on('click', onMinusClick);
      $buttonPlusEl.on('click', onPlusClick);
      if (stepper.params.watchInput && $inputEl && $inputEl.length) {
        $inputEl.on('input', onInput);
      }
      if (stepper.params.autorepeat) {
        app.on('touchstart:passive', onTouchStart);
        app.on('touchmove:active', onTouchMove);
        app.on('touchend:passive', onTouchEnd);
      }
    };
    stepper.detachEvents = function detachEvents() {
      $buttonMinusEl.off('click', onMinusClick);
      $buttonPlusEl.off('click', onPlusClick);
      if (stepper.params.watchInput && $inputEl && $inputEl.length) {
        $inputEl.off('input', onInput);
      }
    };

    // Install Modules
    stepper.useModules();

    // Init
    stepper.init();

    return _ret3 = stepper, _possibleConstructorReturn(_this, _ret3);
  }

  _createClass(Stepper, [{
    key: 'minus',
    value: function minus() {
      return this.decrement();
    }
  }, {
    key: 'plus',
    value: function plus() {
      return this.increment();
    }
  }, {
    key: 'decrement',
    value: function decrement() {
      var stepper = this;
      return stepper.setValue(stepper.value - stepper.step);
    }
  }, {
    key: 'increment',
    value: function increment() {
      var stepper = this;
      return stepper.setValue(stepper.value + stepper.step);
    }
  }, {
    key: 'setValue',
    value: function setValue(newValue, forceUpdate) {
      var stepper = this;
      var step = stepper.step,
          min = stepper.min,
          max = stepper.max;


      var oldValue = stepper.value;

      var value = Math.round(newValue / step) * step;
      if (!stepper.params.wraps) {
        value = Math.max(Math.min(value, max), min);
      } else {
        if (value > max) value = min;
        if (value < min) value = max;
      }
      if (Number.isNaN(value)) {
        value = oldValue;
      }
      stepper.value = value;

      var valueChanged = oldValue !== value;

      // Events
      if (!valueChanged && !forceUpdate) return stepper;
      stepper.$el.trigger('stepper:change', stepper, stepper.value);
      var formattedValue = stepper.formatValue(stepper.value);
      if (stepper.$inputEl && stepper.$inputEl.length) {
        stepper.$inputEl.val(formattedValue);
        stepper.$inputEl.trigger('input change', { sentByF7Stepper: true });
      }
      if (stepper.$valueEl && stepper.$valueEl.length) {
        stepper.$valueEl.html(formattedValue);
      }
      stepper.emit('local::change stepperChange', stepper, stepper.value);
      return stepper;
    }
  }, {
    key: 'getValue',
    value: function getValue() {
      return this.value;
    }
  }, {
    key: 'formatValue',
    value: function formatValue(value) {
      var stepper = this;
      if (!stepper.params.formatValue) return value;
      return stepper.params.formatValue.call(stepper, value);
    }
  }, {
    key: 'init',
    value: function init() {
      var stepper = this;
      stepper.attachEvents();
      if (stepper.$valueEl && stepper.$valueEl.length) {
        var formattedValue = stepper.formatValue(stepper.value);
        stepper.$valueEl.html(formattedValue);
      }
      return stepper;
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      var stepper = this;
      stepper.$el.trigger('stepper:beforedestroy', stepper);
      stepper.emit('local::beforeDestroy stepperBeforeDestroy', stepper);
      delete stepper.$el[0].f7Stepper;
      stepper.detachEvents();
      _utils2.default.deleteProps(stepper);
      stepper = null;
    }
  }]);

  return Stepper;
}(_class2.default);

exports.default = Stepper;