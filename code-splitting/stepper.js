
function framework7ComponentLoader(chunks) {
  var doc = document;
  var win = window;
  var $ = chunks.$;
  var Template7 = chunks.Template7;
  var Utils = chunks.Utils;
  var Device = chunks.Device;
  var Support = chunks.Support;
  var ConstructorMethods = chunks.ConstructorMethods;
  var ModalMethods = chunks.ModalMethods;
  var Framework7Class = chunks.Framework7Class;
  var Modal = chunks.Modal;

  var Stepper = (function (Framework7Class$$1) {
    function Stepper(app, params) {
      Framework7Class$$1.call(this, params, [app]);
      var stepper = this;

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
        wraps: false,
        manualInputMode: false,
        decimalPoint: 4,
        buttonsEndInputMode: true,
      };

      // Extend defaults with modules params
      stepper.useModulesParams(defaults);

      stepper.params = Utils.extend(defaults, params);
      if (stepper.params.value < stepper.params.min) {
        stepper.params.value = stepper.params.min;
      }
      if (stepper.params.value > stepper.params.max) {
        stepper.params.value = stepper.params.max;
      }

      var el = stepper.params.el;
      if (!el) { return stepper; }

      var $el = $(el);
      if ($el.length === 0) { return stepper; }

      if ($el[0].f7Stepper) { return $el[0].f7Stepper; }

      var $inputEl;
      if (stepper.params.inputEl) {
        $inputEl = $(stepper.params.inputEl);
      } else if ($el.find('.stepper-input-wrap').find('input, textarea').length) {
        $inputEl = $el.find('.stepper-input-wrap').find('input, textarea').eq(0);
      }

      if ($inputEl && $inputEl.length) {
        ('step min max').split(' ').forEach(function (paramName) {
          if (!params[paramName] && $inputEl.attr(paramName)) {
            stepper.params[paramName] = parseFloat($inputEl.attr(paramName));
          }
        });

        var decimalPoint$1 = parseInt(stepper.params.decimalPoint, 10);
        if (Number.isNaN(decimalPoint$1)) {
          stepper.params.decimalPoint = 0;
        } else {
          stepper.params.decimalPoint = decimalPoint$1;
        }

        var inputValue = parseFloat($inputEl.val());
        if (typeof params.value === 'undefined' && !Number.isNaN(inputValue) && (inputValue || inputValue === 0)) {
          stepper.params.value = inputValue;
        }
      }

      var $valueEl;
      if (stepper.params.valueEl) {
        $valueEl = $(stepper.params.valueEl);
      } else if ($el.find('.stepper-value').length) {
        $valueEl = $el.find('.stepper-value').eq(0);
      }

      var $buttonPlusEl = $el.find('.stepper-button-plus');
      var $buttonMinusEl = $el.find('.stepper-button-minus');

      var ref = stepper.params;
      var step = ref.step;
      var min = ref.min;
      var max = ref.max;
      var value = ref.value;
      var decimalPoint = ref.decimalPoint;

      Utils.extend(stepper, {
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
        value: value,
        decimalPoint: decimalPoint,
        typeModeChanged: false,
      });

      $el[0].f7Stepper = stepper;

      // Handle Events
      var touchesStart = {};
      var isTouched;
      var isScrolling;
      var preventButtonClick;
      var intervalId;
      var timeoutId;
      var autorepeatAction = null;
      var autorepeatInAction = false;
      var manualInput = false;

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
        if (isTouched) { return; }
        if (manualInput) { return; }
        if ($(e.target).closest($buttonPlusEl).length) {
          autorepeatAction = 'increment';
        } else if ($(e.target).closest($buttonMinusEl).length) {
          autorepeatAction = 'decrement';
        }
        if (!autorepeatAction) { return; }

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
        if (!isTouched) { return; }
        if (manualInput) { return; }
        var pageX = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
        var pageY = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;

        if (typeof isScrolling === 'undefined' && !autorepeatInAction) {
          isScrolling = !!(isScrolling || Math.abs(pageY - touchesStart.y) > Math.abs(pageX - touchesStart.x));
        }
        var distance = Math.pow( ((Math.pow( (pageX - touchesStart.x), 2 )) + (Math.pow( (pageY - touchesStart.y), 2 ))), 0.5 );

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
        if (manualInput) {
          if (stepper.params.buttonsEndInputMode) {
            manualInput = false;
            stepper.endTypeMode(true);
          }
          return;
        }
        if (preventButtonClick) {
          preventButtonClick = false;
          return;
        }
        stepper.decrement(true);
      }
      function onPlusClick() {
        if (manualInput) {
          if (stepper.params.buttonsEndInputMode) {
            manualInput = false;
            stepper.endTypeMode(true);
          }
          return;
        }
        if (preventButtonClick) {
          preventButtonClick = false;
          return;
        }
        stepper.increment(true);
      }
      function onInputClick(e) {
        if (!e.target.readOnly && stepper.params.manualInputMode) {
          manualInput = true;
          if (typeof e.target.selectionStart === 'number') {
            e.target.selectionStart = e.target.value.length;
            e.target.selectionEnd = e.target.value.length;
          }
        }
      }
      function onInputKey(e) {
        if (e.keyCode === 13 || e.which === 13) {
          e.preventDefault();
          manualInput = false;
          stepper.endTypeMode();
        }
      }
      function onInputBlur() {
        manualInput = false;
        stepper.endTypeMode(true);
      }
      function onInput(e) {
        if (manualInput) {
          stepper.typeValue(e.target.value);
          return;
        }
        if (e.detail && e.detail.sentByF7Stepper) { return; }
        stepper.setValue(e.target.value, true);
      }
      stepper.attachEvents = function attachEvents() {
        $buttonMinusEl.on('click', onMinusClick);
        $buttonPlusEl.on('click', onPlusClick);
        if (stepper.params.watchInput && $inputEl && $inputEl.length) {
          $inputEl.on('input', onInput);
          $inputEl.on('click', onInputClick);
          $inputEl.on('blur', onInputBlur);
          $inputEl.on('keyup', onInputKey);
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
          $inputEl.off('click', onInputClick);
          $inputEl.off('blur', onInputBlur);
          $inputEl.off('keyup', onInputKey);
        }
      };

      // Install Modules
      stepper.useModules();

      // Init
      stepper.init();

      return stepper;
    }

    if ( Framework7Class$$1 ) Stepper.__proto__ = Framework7Class$$1;
    Stepper.prototype = Object.create( Framework7Class$$1 && Framework7Class$$1.prototype );
    Stepper.prototype.constructor = Stepper;

    Stepper.prototype.minus = function minus () {
      return this.decrement();
    };

    Stepper.prototype.plus = function plus () {
      return this.increment();
    };

    Stepper.prototype.decrement = function decrement () {
      var stepper = this;
      return stepper.setValue(stepper.value - stepper.step, false, true);
    };

    Stepper.prototype.increment = function increment () {
      var stepper = this;
      return stepper.setValue(stepper.value + stepper.step, false, true);
    };

    Stepper.prototype.setValue = function setValue (newValue, forceUpdate, withWraps) {
      var stepper = this;
      var step = stepper.step;
      var min = stepper.min;
      var max = stepper.max;

      var oldValue = stepper.value;

      var value = Math.round(newValue / step) * step;
      if (stepper.params.wraps && withWraps) {
        if (value > max) { value = min; }
        if (value < min) { value = max; }
      } else {
        value = Math.max(Math.min(value, max), min);
      }

      if (Number.isNaN(value)) {
        value = oldValue;
      }
      stepper.value = value;

      var valueChanged = oldValue !== value;

      // Events
      if (!valueChanged && !forceUpdate) { return stepper; }

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
    };

    Stepper.prototype.endTypeMode = function endTypeMode (noBlur) {
      var stepper = this;
      var min = stepper.min;
      var max = stepper.max;
      var value = parseFloat(stepper.value);

      if (Number.isNaN(value)) { value = 0; }

      value = Math.max(Math.min(value, max), min);

      stepper.value = value;
      if (!stepper.typeModeChanged) {
        if (stepper.$inputEl && stepper.$inputEl.length && !noBlur) {
          stepper.$inputEl.blur();
        }
        return stepper;
      }
      stepper.typeModeChanged = false;

      stepper.$el.trigger('stepper:change', stepper, stepper.value);
      var formattedValue = stepper.formatValue(stepper.value);
      if (stepper.$inputEl && stepper.$inputEl.length) {
        stepper.$inputEl.val(formattedValue);
        stepper.$inputEl.trigger('input change', { sentByF7Stepper: true });
        if (!noBlur) { stepper.$inputEl.blur(); }
      }
      if (stepper.$valueEl && stepper.$valueEl.length) {
        stepper.$valueEl.html(formattedValue);
      }
      stepper.emit('local::change stepperChange', stepper, stepper.value);
      return stepper;
    };

    Stepper.prototype.typeValue = function typeValue (value) {
      var stepper = this;
      stepper.typeModeChanged = true;
      var inputTxt = String(value);
      if (inputTxt.lastIndexOf('.') + 1 === inputTxt.length || inputTxt.lastIndexOf(',') + 1 === inputTxt.length) {
        if (inputTxt.lastIndexOf('.') !== inputTxt.indexOf('.') || inputTxt.lastIndexOf(',') !== inputTxt.indexOf(',')) {
          inputTxt = inputTxt.slice(0, -1);
          stepper.value = inputTxt;
          stepper.$inputEl.val(stepper.value);
          return stepper;
        }
      } else {
        var newValue = parseFloat(inputTxt.replace(',', '.'));
        if (newValue === 0) {
          stepper.value = inputTxt.replace(',', '.');
          stepper.$inputEl.val(stepper.value);
          return stepper;
        }
        if (Number.isNaN(newValue)) {
          stepper.value = 0;
          stepper.$inputEl.val(stepper.value);
          return stepper;
        }
        var powVal = Math.pow( 10, stepper.params.decimalPoint );
        newValue = (Math.round((newValue) * powVal)).toFixed(stepper.params.decimalPoint + 1) / powVal;
        stepper.value = parseFloat(String(newValue).replace(',', '.'));
        stepper.$inputEl.val(stepper.value);
        return stepper;
      }
      stepper.value = inputTxt;
      stepper.$inputEl.val(inputTxt);
      return stepper;
    };

    Stepper.prototype.getValue = function getValue () {
      return this.value;
    };

    Stepper.prototype.formatValue = function formatValue (value) {
      var stepper = this;
      if (!stepper.params.formatValue) { return value; }
      return stepper.params.formatValue.call(stepper, value);
    };

    Stepper.prototype.init = function init () {
      var stepper = this;
      stepper.attachEvents();
      if (stepper.$valueEl && stepper.$valueEl.length) {
        var formattedValue = stepper.formatValue(stepper.value);
        stepper.$valueEl.html(formattedValue);
      }
      return stepper;
    };

    Stepper.prototype.destroy = function destroy () {
      var stepper = this;
      stepper.$el.trigger('stepper:beforedestroy', stepper);
      stepper.emit('local::beforeDestroy stepperBeforeDestroy', stepper);
      delete stepper.$el[0].f7Stepper;
      stepper.detachEvents();
      Utils.deleteProps(stepper);
      stepper = null;
    };

    return Stepper;
  }(Framework7Class));

  var stepper = {
    name: 'stepper',
    create: function create() {
      var app = this;
      app.stepper = Utils.extend(
        ConstructorMethods({
          defaultSelector: '.stepper',
          constructor: Stepper,
          app: app,
          domProp: 'f7Stepper',
        }),
        {
          getValue: function getValue(el) {
            if ( el === void 0 ) el = '.stepper';

            var stepper = app.stepper.get(el);
            if (stepper) { return stepper.getValue(); }
            return undefined;
          },
          setValue: function setValue(el, value) {
            if ( el === void 0 ) el = '.stepper';

            var stepper = app.stepper.get(el);
            if (stepper) { return stepper.setValue(value); }
            return undefined;
          },
        }
      );
    },
    static: {
      Stepper: Stepper,
    },
    on: {
      tabMounted: function tabMounted(tabEl) {
        var app = this;
        $(tabEl).find('.stepper-init').each(function (index, stepperEl) {
          var dataset = $(stepperEl).dataset();
          app.stepper.create(Utils.extend({ el: stepperEl }, dataset || {}));
        });
      },
      tabBeforeRemove: function tabBeforeRemove(tabEl) {
        $(tabEl).find('.stepper-init').each(function (index, stepperEl) {
          if (stepperEl.f7Stepper) { stepperEl.f7Stepper.destroy(); }
        });
      },
      pageInit: function pageInit(page) {
        var app = this;
        page.$el.find('.stepper-init').each(function (index, stepperEl) {
          var dataset = $(stepperEl).dataset();
          app.stepper.create(Utils.extend({ el: stepperEl }, dataset || {}));
        });
      },
      pageBeforeRemove: function pageBeforeRemove(page) {
        page.$el.find('.stepper-init').each(function (index, stepperEl) {
          if (stepperEl.f7Stepper) { stepperEl.f7Stepper.destroy(); }
        });
      },
    },
    vnode: {
      'stepper-init': {
        insert: function insert(vnode) {
          var app = this;
          var stepperEl = vnode.elm;
          var dataset = $(stepperEl).dataset();
          app.stepper.create(Utils.extend({ el: stepperEl }, dataset || {}));
        },
        destroy: function destroy(vnode) {
          var stepperEl = vnode.elm;
          if (stepperEl.f7Stepper) { stepperEl.f7Stepper.destroy(); }
        },
      },
    },
  };

  return stepper;
}
framework7ComponentLoader.componentName = 'stepper';

