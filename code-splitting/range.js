
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

  var Range = (function (Framework7Class$$1) {
    function Range(app, params) {
      Framework7Class$$1.call(this, params, [app]);

      var range = this;
      var defaults = {
        el: null,
        inputEl: null,
        dual: false,
        step: 1,
        label: false,
        min: 0,
        max: 100,
        value: 0,
        draggableBar: true,
      };

      // Extend defaults with modules params
      range.useModulesParams(defaults);

      range.params = Utils.extend(defaults, params);

      var el = range.params.el;
      if (!el) { return range; }

      var $el = $(el);
      if ($el.length === 0) { return range; }

      if ($el[0].f7Range) { return $el[0].f7Range; }

      var dataset = $el.dataset();

      ('step min max value').split(' ').forEach(function (paramName) {
        if (typeof params[paramName] === 'undefined' && typeof dataset[paramName] !== 'undefined') {
          range.params[paramName] = parseFloat(dataset[paramName]);
        }
      });
      ('dual label').split(' ').forEach(function (paramName) {
        if (typeof params[paramName] === 'undefined' && typeof dataset[paramName] !== 'undefined') {
          range.params[paramName] = dataset[paramName];
        }
      });

      if (!range.params.value) {
        if (typeof dataset.value !== 'undefined') { range.params.value = dataset.value; }
        if (typeof dataset.valueLeft !== 'undefined' && typeof dataset.valueRight !== 'undefined') {
          range.params.value = [parseFloat(dataset.valueLeft), parseFloat(dataset.valueRight)];
        }
      }

      var $inputEl;
      if (!range.params.dual) {
        if (range.params.inputEl) {
          $inputEl = $(range.params.inputEl);
        } else if ($el.find('input[type="range"]').length) {
          $inputEl = $el.find('input[type="range"]').eq(0);
        }
      }

      var ref = range.params;
      var dual = ref.dual;
      var step = ref.step;
      var label = ref.label;
      var min = ref.min;
      var max = ref.max;
      var value = ref.value;
      Utils.extend(range, {
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
        previousValue: value,
      });

      if ($inputEl) {
        ('step min max').split(' ').forEach(function (paramName) {
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
      var $barEl = $('<div class="range-bar"></div>');
      var $barActiveEl = $('<div class="range-bar-active"></div>');
      $barEl.append($barActiveEl);

      // Create Knobs
      var knobHTML = "\n      <div class=\"range-knob-wrap\">\n        <div class=\"range-knob\"></div>\n        " + (range.label ? '<div class="range-knob-label"></div>' : '') + "\n      </div>\n    ";
      var knobs = [$(knobHTML)];
      var labels = [];

      if (range.dual) {
        knobs.push($(knobHTML));
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

      Utils.extend(range, {
        app: app,
        knobs: knobs,
        labels: labels,
        $barEl: $barEl,
        $barActiveEl: $barActiveEl,
      });

      $el[0].f7Range = range;

      // Touch Events
      var isTouched;
      var touchesStart = {};
      var isScrolling;
      var rangeOffsetLeft;
      var $touchedKnobEl;
      var dualValueIndex;
      var valueChangedByTouch;
      function onTouchChange() {
        valueChangedByTouch = true;
      }
      function handleTouchStart(e) {
        if (isTouched) { return; }
        if (!range.params.draggableBar) {
          if ($(e.target).closest('.range-knob').length === 0) {
            return;
          }
        }
        valueChangedByTouch = false;
        touchesStart.x = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
        touchesStart.y = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;

        isTouched = true;
        isScrolling = undefined;
        rangeOffsetLeft = $el.offset().left;

        var progress;
        if (range.app.rtl) {
          progress = ((rangeOffsetLeft + range.rangeWidth) - touchesStart.x) / range.rangeWidth;
        } else {
          progress = (touchesStart.x - rangeOffsetLeft) / range.rangeWidth;
        }

        var newValue = (progress * (range.max - range.min)) + range.min;
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
          newValue = (progress * (range.max - range.min)) + range.min;
        }
        Utils.nextTick(function () {
          if (isTouched) { $touchedKnobEl.addClass('range-knob-active-state'); }
        }, 70);
        range.on('change', onTouchChange);
        range.setValue(newValue, true);
      }
      function handleTouchMove(e) {
        if (!isTouched) { return; }
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

        var progress;
        if (range.app.rtl) {
          progress = ((rangeOffsetLeft + range.rangeWidth) - pageX) / range.rangeWidth;
        } else {
          progress = (pageX - rangeOffsetLeft) / range.rangeWidth;
        }

        var newValue = (progress * (range.max - range.min)) + range.min;
        if (range.dual) {
          var leftValue;
          var rightValue;
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
          if (isScrolling) { $touchedKnobEl.removeClass('range-knob-active-state'); }
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
          if (
            (
              range.dual
              && (
                range.previousValue[0] !== range.value[0]
                || range.previousValue[1] !== range.value[1]
              )
            )
            || (
              !range.dual
              && range.previousValue !== range.value
            )
          ) {
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
        var passive = Support.passiveListener ? { passive: true } : false;
        range.$el.on(app.touchEvents.start, handleTouchStart, passive);
        app.on('touchmove', handleTouchMove);
        app.on('touchend:passive', handleTouchEnd);
        app.on('tabShow', handleResize);
        app.on('resize', handleResize);
        range.$el
          .parents('.sheet-modal, .actions-modal, .popup, .popover, .login-screen, .dialog, .toast')
          .on('modal:open', handleResize);
        range.$el
          .parents('.panel')
          .on('panel:open', handleResize);
      };
      range.detachEvents = function detachEvents() {
        var passive = Support.passiveListener ? { passive: true } : false;
        range.$el.off(app.touchEvents.start, handleTouchStart, passive);
        app.off('touchmove', handleTouchMove);
        app.off('touchend:passive', handleTouchEnd);
        app.off('tabShow', handleResize);
        app.off('resize', handleResize);
        range.$el
          .parents('.sheet-modal, .actions-modal, .popup, .popover, .login-screen, .dialog, .toast')
          .off('modal:open', handleResize);
        range.$el
          .parents('.panel')
          .off('panel:open', handleResize);
      };

      // Install Modules
      range.useModules();

      // Init
      range.init();

      return range;
    }

    if ( Framework7Class$$1 ) Range.__proto__ = Framework7Class$$1;
    Range.prototype = Object.create( Framework7Class$$1 && Framework7Class$$1.prototype );
    Range.prototype.constructor = Range;

    Range.prototype.calcSize = function calcSize () {
      var range = this;
      var width = range.$el.outerWidth();
      if (width === 0) { return; }
      range.rangeWidth = width;
      range.knobWidth = range.knobs[0].outerWidth();
    };

    Range.prototype.layout = function layout () {
      var obj;

      var range = this;
      var app = range.app;
      var knobWidth = range.knobWidth;
      var rangeWidth = range.rangeWidth;
      var min = range.min;
      var max = range.max;
      var knobs = range.knobs;
      var $barActiveEl = range.$barActiveEl;
      var value = range.value;
      var label = range.label;
      var labels = range.labels;
      var positionProperty = app.rtl ? 'right' : 'left';
      if (range.dual) {
        var progress = [((value[0] - min) / (max - min)), ((value[1] - min) / (max - min))];
        $barActiveEl.css(( obj = {}, obj[positionProperty] = ((progress[0] * 100) + "%"), obj.width = (((progress[1] - progress[0]) * 100) + "%"), obj ));
        knobs.forEach(function ($knobEl, knobIndex) {
          var leftPos = rangeWidth * progress[knobIndex];
          var realLeft = (rangeWidth * progress[knobIndex]) - (knobWidth / 2);
          if (realLeft < 0) { leftPos = knobWidth / 2; }
          if ((realLeft + knobWidth) > rangeWidth) { leftPos = rangeWidth - (knobWidth / 2); }
          $knobEl.css(positionProperty, (leftPos + "px"));
          if (label) { labels[knobIndex].text(value[knobIndex]); }
        });
      } else {
        var progress$1 = ((value - min) / (max - min));
        $barActiveEl.css('width', ((progress$1 * 100) + "%"));

        var leftPos = rangeWidth * progress$1;
        var realLeft = (rangeWidth * progress$1) - (knobWidth / 2);
        if (realLeft < 0) { leftPos = knobWidth / 2; }
        if ((realLeft + knobWidth) > rangeWidth) { leftPos = rangeWidth - (knobWidth / 2); }
        knobs[0].css(positionProperty, (leftPos + "px"));
        if (label) { labels[0].text(value); }
      }
      if ((range.dual && value.indexOf(min) >= 0) || (!range.dual && value === min)) {
        range.$el.addClass('range-slider-min');
      } else {
        range.$el.removeClass('range-slider-min');
      }
      if ((range.dual && value.indexOf(max) >= 0) || (!range.dual && value === max)) {
        range.$el.addClass('range-slider-max');
      } else {
        range.$el.removeClass('range-slider-max');
      }
    };

    Range.prototype.setValue = function setValue (newValue, byTouchMove) {
      var range = this;
      var step = range.step;
      var min = range.min;
      var max = range.max;
      var valueChanged;
      var oldValue;
      if (range.dual) {
        oldValue = [range.value[0], range.value[1]];
        var newValues = newValue;
        if (!Array.isArray(newValues)) { newValues = [newValue, newValue]; }
        if (newValue[0] > newValue[1]) {
          newValues = [newValues[0], newValues[0]];
        }
        newValues = newValues.map(function (value) { return Math.max(Math.min(Math.round(value / step) * step, max), min); });
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
      if (!valueChanged) { return range; }
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
    };

    Range.prototype.getValue = function getValue () {
      return this.value;
    };

    Range.prototype.init = function init () {
      var range = this;
      range.calcSize();
      range.layout();
      range.attachEvents();
      return range;
    };

    Range.prototype.destroy = function destroy () {
      var range = this;
      range.$el.trigger('range:beforedestroy', range);
      range.emit('local::beforeDestroy rangeBeforeDestroy', range);
      delete range.$el[0].f7Range;
      range.detachEvents();
      Utils.deleteProps(range);
      range = null;
    };

    return Range;
  }(Framework7Class));

  var range = {
    name: 'range',
    create: function create() {
      var app = this;
      app.range = Utils.extend(
        ConstructorMethods({
          defaultSelector: '.range-slider',
          constructor: Range,
          app: app,
          domProp: 'f7Range',
        }),
        {
          getValue: function getValue(el) {
            if ( el === void 0 ) el = '.range-slider';

            var range = app.range.get(el);
            if (range) { return range.getValue(); }
            return undefined;
          },
          setValue: function setValue(el, value) {
            if ( el === void 0 ) el = '.range-slider';

            var range = app.range.get(el);
            if (range) { return range.setValue(value); }
            return undefined;
          },
        }
      );
    },
    static: {
      Range: Range,
    },
    on: {
      tabMounted: function tabMounted(tabEl) {
        var app = this;
        $(tabEl).find('.range-slider-init').each(function (index, rangeEl) { return new Range(app, {
          el: rangeEl,
        }); });
      },
      tabBeforeRemove: function tabBeforeRemove(tabEl) {
        $(tabEl).find('.range-slider-init').each(function (index, rangeEl) {
          if (rangeEl.f7Range) { rangeEl.f7Range.destroy(); }
        });
      },
      pageInit: function pageInit(page) {
        var app = this;
        page.$el.find('.range-slider-init').each(function (index, rangeEl) { return new Range(app, {
          el: rangeEl,
        }); });
      },
      pageBeforeRemove: function pageBeforeRemove(page) {
        page.$el.find('.range-slider-init').each(function (index, rangeEl) {
          if (rangeEl.f7Range) { rangeEl.f7Range.destroy(); }
        });
      },
    },
    vnode: {
      'range-slider-init': {
        insert: function insert(vnode) {
          var rangeEl = vnode.elm;
          var app = this;
          app.range.create({ el: rangeEl });
        },
        destroy: function destroy(vnode) {
          var rangeEl = vnode.elm;
          if (rangeEl.f7Range) { rangeEl.f7Range.destroy(); }
        },
      },
    },
  };

  return range;
}
framework7ComponentLoader.componentName = 'range';

