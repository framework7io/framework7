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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Range = function (_Framework7Class) {
  _inherits(Range, _Framework7Class);

  function Range(app, params) {
    var _ret, _ret2, _ret3;

    _classCallCheck(this, Range);

    var _this = _possibleConstructorReturn(this, (Range.__proto__ || Object.getPrototypeOf(Range)).call(this, params, [app]));

    var range = _this;
    var defaults = {
      el: null,
      inputEl: null,
      dual: false,
      step: 1,
      label: false,
      min: 0,
      max: 100,
      value: 0,
      draggableBar: true
    };

    // Extend defaults with modules params
    range.useModulesParams(defaults);

    range.params = _utils2.default.extend(defaults, params);

    var el = range.params.el;
    if (!el) return _ret = range, _possibleConstructorReturn(_this, _ret);

    var $el = (0, _dom2.default)(el);
    if ($el.length === 0) return _ret2 = range, _possibleConstructorReturn(_this, _ret2);

    var dataset = $el.dataset();

    'step min max value'.split(' ').forEach(function (paramName) {
      if (typeof params[paramName] === 'undefined' && typeof dataset[paramName] !== 'undefined') {
        range.params[paramName] = parseFloat(dataset[paramName]);
      }
    });
    'dual label'.split(' ').forEach(function (paramName) {
      if (typeof params[paramName] === 'undefined' && typeof dataset[paramName] !== 'undefined') {
        range.params[paramName] = dataset[paramName];
      }
    });

    if (!range.params.value) {
      if (typeof dataset.value !== 'undefined') range.params.value = dataset.value;
      if (typeof dataset.valueLeft !== 'undefined' && typeof dataset.valueRight !== 'undefined') {
        range.params.value = [parseFloat(dataset.valueLeft), parseFloat(dataset.valueRight)];
      }
    }

    var $inputEl = void 0;
    if (!range.params.dual) {
      if (range.params.inputEl) {
        $inputEl = (0, _dom2.default)(range.params.inputEl);
      } else if ($el.find('input[type="range"]').length) {
        $inputEl = $el.find('input[type="range"]').eq(0);
      }
    }

    var _range$params = range.params,
        dual = _range$params.dual,
        step = _range$params.step,
        label = _range$params.label,
        min = _range$params.min,
        max = _range$params.max,
        value = _range$params.value;

    _utils2.default.extend(range, {
      $el: $el,
      el: $el[0],
      $inputEl: $inputEl,
      inputEl: $inputEl ? $inputEl[0] : undefined,
      dual: dual,
      step: step,
      label: label,
      min: min,
      max: max,
      value: value,
      previousValue: value
    });

    if ($inputEl) {
      'step min max'.split(' ').forEach(function (paramName) {
        if (!params[paramName] && $inputEl.attr(paramName)) {
          range.params[paramName] = parseFloat($inputEl.attr(paramName));
          range[paramName] = parseFloat($inputEl.attr(paramName));
        }
      });
      if (typeof $inputEl.val() !== 'undefined') {
        range.params.value = parseFloat($inputEl.val());
        range.value = parseFloat($inputEl.val());
      }
    }

    // Dual
    if (range.dual) {
      $el.addClass('range-slider-dual');
    }
    if (range.label) {
      $el.addClass('range-slider-label');
    }

    // Check for layout
    var $barEl = (0, _dom2.default)('<div class="range-bar"></div>');
    var $barActiveEl = (0, _dom2.default)('<div class="range-bar-active"></div>');
    $barEl.append($barActiveEl);

    // Create Knobs
    var knobHTML = '\n      <div class="range-knob-wrap">\n        <div class="range-knob"></div>\n        ' + (range.label ? '<div class="range-knob-label"></div>' : '') + '\n      </div>\n    ';
    var knobs = [(0, _dom2.default)(knobHTML)];
    var labels = [];

    if (range.dual) {
      knobs.push((0, _dom2.default)(knobHTML));
    }

    $el.append($barEl);
    knobs.forEach(function ($knobEl) {
      $el.append($knobEl);
    });

    // Labels
    if (range.label) {
      labels.push(knobs[0].find('.range-knob-label'));
      if (range.dual) {
        labels.push(knobs[1].find('.range-knob-label'));
      }
    }

    _utils2.default.extend(range, {
      app: app,
      knobs: knobs,
      labels: labels,
      $barEl: $barEl,
      $barActiveEl: $barActiveEl
    });

    $el[0].f7Range = range;

    // Touch Events
    var isTouched = void 0;
    var touchesStart = {};
    var isScrolling = void 0;
    var rangeOffsetLeft = void 0;
    var $touchedKnobEl = void 0;
    var dualValueIndex = void 0;
    var valueChangedByTouch = void 0;
    function onTouchChange() {
      valueChangedByTouch = true;
    }
    function handleTouchStart(e) {
      if (isTouched) return;
      if (!range.params.draggableBar) {
        if ((0, _dom2.default)(e.target).closest('.range-knob').length === 0) {
          return;
        }
      }
      valueChangedByTouch = false;
      touchesStart.x = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
      touchesStart.y = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;

      isTouched = true;
      isScrolling = undefined;
      rangeOffsetLeft = $el.offset().left;

      var progress = void 0;
      if (range.app.rtl) {
        progress = (rangeOffsetLeft + range.rangeWidth - touchesStart.x) / range.rangeWidth;
      } else {
        progress = (touchesStart.x - rangeOffsetLeft) / range.rangeWidth;
      }

      var newValue = progress * (range.max - range.min) + range.min;
      if (range.dual) {
        if (Math.abs(range.value[0] - newValue) < Math.abs(range.value[1] - newValue)) {
          dualValueIndex = 0;
          $touchedKnobEl = range.knobs[0];
          newValue = [newValue, range.value[1]];
        } else {
          dualValueIndex = 1;
          $touchedKnobEl = range.knobs[1];
          newValue = [range.value[0], newValue];
        }
      } else {
        $touchedKnobEl = range.knobs[0];
        newValue = progress * (range.max - range.min) + range.min;
      }
      _utils2.default.nextTick(function () {
        if (isTouched) $touchedKnobEl.addClass('range-knob-active-state');
      }, 70);
      range.on('change', onTouchChange);
      range.setValue(newValue, true);
    }
    function handleTouchMove(e) {
      if (!isTouched) return;
      var pageX = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
      var pageY = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;

      if (typeof isScrolling === 'undefined') {
        isScrolling = !!(isScrolling || Math.abs(pageY - touchesStart.y) > Math.abs(pageX - touchesStart.x));
      }
      if (isScrolling) {
        isTouched = false;
        return;
      }
      e.preventDefault();

      var progress = void 0;
      if (range.app.rtl) {
        progress = (rangeOffsetLeft + range.rangeWidth - pageX) / range.rangeWidth;
      } else {
        progress = (pageX - rangeOffsetLeft) / range.rangeWidth;
      }

      var newValue = progress * (range.max - range.min) + range.min;
      if (range.dual) {
        var leftValue = void 0;
        var rightValue = void 0;
        if (dualValueIndex === 0) {
          leftValue = newValue;
          rightValue = range.value[1];
          if (leftValue > rightValue) {
            rightValue = leftValue;
          }
        } else {
          leftValue = range.value[0];
          rightValue = newValue;
          if (rightValue < leftValue) {
            leftValue = rightValue;
          }
        }
        newValue = [leftValue, rightValue];
      }
      range.setValue(newValue, true);
    }
    function handleTouchEnd() {
      if (!isTouched) {
        if (isScrolling) $touchedKnobEl.removeClass('range-knob-active-state');
        isTouched = false;
        return;
      }
      range.off('change', onTouchChange);
      isTouched = false;
      $touchedKnobEl.removeClass('range-knob-active-state');
      if (valueChangedByTouch && range.$inputEl && !range.dual) {
        range.$inputEl.trigger('change');
      }
      valueChangedByTouch = false;
      if (typeof range.previousValue !== 'undefined') {
        if (range.dual && (range.previousValue[0] !== range.value[0] || range.previousValue[1] !== range.value[1]) || !range.dual && range.previousValue !== range.value) {
          range.$el.trigger('range:changed', range, range.value);
          range.emit('local::changed rangeChanged', range, range.value);
        }
      }
    }

    function handleResize() {
      range.calcSize();
      range.layout();
    }
    range.attachEvents = function attachEvents() {
      var passive = _support2.default.passiveListener ? { passive: true } : false;
      range.$el.on(app.touchEvents.start, handleTouchStart, passive);
      app.on('touchmove', handleTouchMove);
      app.on('touchend:passive', handleTouchEnd);
      app.on('tabShow', handleResize);
      app.on('resize', handleResize);
      range.$el.parents('.sheet-modal, .actions-modal, .popup, .popover, .login-screen, .dialog, .toast').on('modal:open', handleResize);
      range.$el.parents('.panel').on('panel:open', handleResize);
    };
    range.detachEvents = function detachEvents() {
      var passive = _support2.default.passiveListener ? { passive: true } : false;
      range.$el.off(app.touchEvents.start, handleTouchStart, passive);
      app.off('touchmove', handleTouchMove);
      app.off('touchend:passive', handleTouchEnd);
      app.off('tabShow', handleResize);
      app.off('resize', handleResize);
      range.$el.parents('.sheet-modal, .actions-modal, .popup, .popover, .login-screen, .dialog, .toast').off('modal:open', handleResize);
      range.$el.parents('.panel').off('panel:open', handleResize);
    };

    // Install Modules
    range.useModules();

    // Init
    range.init();

    return _ret3 = range, _possibleConstructorReturn(_this, _ret3);
  }

  _createClass(Range, [{
    key: 'calcSize',
    value: function calcSize() {
      var range = this;
      var width = range.$el.outerWidth();
      if (width === 0) return;
      range.rangeWidth = width;
      range.knobWidth = range.knobs[0].outerWidth();
    }
  }, {
    key: 'layout',
    value: function layout() {
      var range = this;
      var app = range.app,
          knobWidth = range.knobWidth,
          rangeWidth = range.rangeWidth,
          min = range.min,
          max = range.max,
          knobs = range.knobs,
          $barActiveEl = range.$barActiveEl,
          value = range.value,
          label = range.label,
          labels = range.labels;

      var positionProperty = app.rtl ? 'right' : 'left';
      if (range.dual) {
        var _$barActiveEl$css;

        var progress = [(value[0] - min) / (max - min), (value[1] - min) / (max - min)];
        $barActiveEl.css((_$barActiveEl$css = {}, _defineProperty(_$barActiveEl$css, positionProperty, progress[0] * 100 + '%'), _defineProperty(_$barActiveEl$css, 'width', (progress[1] - progress[0]) * 100 + '%'), _$barActiveEl$css));
        knobs.forEach(function ($knobEl, knobIndex) {
          var leftPos = rangeWidth * progress[knobIndex];
          var realLeft = rangeWidth * progress[knobIndex] - knobWidth / 2;
          if (realLeft < 0) leftPos = knobWidth / 2;
          if (realLeft + knobWidth > rangeWidth) leftPos = rangeWidth - knobWidth / 2;
          $knobEl.css(positionProperty, leftPos + 'px');
          if (label) labels[knobIndex].text(value[knobIndex]);
        });
      } else {
        var _progress = (value - min) / (max - min);
        $barActiveEl.css('width', _progress * 100 + '%');

        var leftPos = rangeWidth * _progress;
        var realLeft = rangeWidth * _progress - knobWidth / 2;
        if (realLeft < 0) leftPos = knobWidth / 2;
        if (realLeft + knobWidth > rangeWidth) leftPos = rangeWidth - knobWidth / 2;
        knobs[0].css(positionProperty, leftPos + 'px');
        if (label) labels[0].text(value);
      }
      if (range.dual && value.indexOf(min) >= 0 || !range.dual && value === min) {
        range.$el.addClass('range-slider-min');
      } else {
        range.$el.removeClass('range-slider-min');
      }
      if (range.dual && value.indexOf(max) >= 0 || !range.dual && value === max) {
        range.$el.addClass('range-slider-max');
      } else {
        range.$el.removeClass('range-slider-max');
      }
    }
  }, {
    key: 'setValue',
    value: function setValue(newValue, byTouchMove) {
      var range = this;
      var step = range.step,
          min = range.min,
          max = range.max;

      var valueChanged = void 0;
      var oldValue = void 0;
      if (range.dual) {
        oldValue = [range.value[0], range.value[1]];
        var newValues = newValue;
        if (!Array.isArray(newValues)) newValues = [newValue, newValue];
        if (newValue[0] > newValue[1]) {
          newValues = [newValues[0], newValues[0]];
        }
        newValues = newValues.map(function (value) {
          return Math.max(Math.min(Math.round(value / step) * step, max), min);
        });
        if (newValues[0] === range.value[0] && newValues[1] === range.value[1]) {
          return range;
        }
        newValues.forEach(function (value, valueIndex) {
          range.value[valueIndex] = value;
        });
        valueChanged = oldValue[0] !== newValues[0] || oldValue[1] !== newValues[1];
        range.layout();
      } else {
        oldValue = range.value;
        var value = Math.max(Math.min(Math.round(newValue / step) * step, max), min);
        range.value = value;
        range.layout();
        valueChanged = oldValue !== value;
      }

      if (valueChanged) {
        range.previousValue = oldValue;
      }
      // Events
      if (!valueChanged) return range;
      range.$el.trigger('range:change', range, range.value);
      if (range.$inputEl && !range.dual) {
        range.$inputEl.val(range.value);
        if (!byTouchMove) {
          range.$inputEl.trigger('input change');
        } else {
          range.$inputEl.trigger('input');
        }
      }
      if (!byTouchMove) {
        range.$el.trigger('range:changed', range, range.value);
        range.emit('local::changed rangeChanged', range, range.value);
      }
      range.emit('local::change rangeChange', range, range.value);
      return range;
    }
  }, {
    key: 'getValue',
    value: function getValue() {
      return this.value;
    }
  }, {
    key: 'init',
    value: function init() {
      var range = this;
      range.calcSize();
      range.layout();
      range.attachEvents();
      return range;
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      var range = this;
      range.$el.trigger('range:beforedestroy', range);
      range.emit('local::beforeDestroy rangeBeforeDestroy', range);
      delete range.$el[0].f7Range;
      range.detachEvents();
      _utils2.default.deleteProps(range);
      range = null;
    }
  }]);

  return Range;
}(_class2.default);

exports.default = Range;