import $ from 'dom7';
import Utils from '../../utils/utils';
import Framework7Class from '../../utils/class';
import Support from '../../utils/support';

class Range extends Framework7Class {
  constructor(app, params) {
    super(params, [app]);
    const range = this;
    const defaults = {
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

    const el = range.params.el;
    if (!el) return range;

    const $el = $(el);
    if ($el.length === 0) return range;

    const dataset = $el.dataset();

    ('step min max value').split(' ').forEach((paramName) => {
      if (typeof params[paramName] === 'undefined' && typeof dataset[paramName] !== 'undefined') {
        range.params[paramName] = parseFloat(dataset[paramName]);
      }
    });
    ('dual label').split(' ').forEach((paramName) => {
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

    let $inputEl;
    if (!range.params.dual) {
      if (range.params.inputEl) {
        $inputEl = $(range.params.inputEl);
      } else if ($el.find('input[type="range"]').length) {
        $inputEl = $el.find('input[type="range"]').eq(0);
      }
    }

    const { dual, step, label, min, max, value } = range.params;
    Utils.extend(range, {
      $el,
      el: $el[0],
      $inputEl,
      inputEl: $inputEl ? $inputEl[0] : undefined,
      dual,
      step,
      label,
      min,
      max,
      value,
      previousValue: value,
    });

    if ($inputEl) {
      ('step min max').split(' ').forEach((paramName) => {
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
    const $barEl = $('<div class="range-bar"></div>');
    const $barActiveEl = $('<div class="range-bar-active"></div>');
    $barEl.append($barActiveEl);

    // Create Knobs
    const knobHTML = `
      <div class="range-knob-wrap">
        <div class="range-knob"></div>
        ${range.label ? '<div class="range-knob-label"></div>' : ''}
      </div>
    `;
    const knobs = [$(knobHTML)];
    const labels = [];

    if (range.dual) {
      knobs.push($(knobHTML));
    }

    $el.append($barEl);
    knobs.forEach(($knobEl) => {
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
      app,
      knobs,
      labels,
      $barEl,
      $barActiveEl,
    });

    $el[0].f7Range = range;

    // Touch Events
    let isTouched;
    const touchesStart = {};
    let isScrolling;
    let rangeOffsetLeft;
    let $touchedKnobEl;
    let dualValueIndex;
    let valueChangedByTouch;
    function onTouchChange() {
      valueChangedByTouch = true;
    }
    function handleTouchStart(e) {
      if (isTouched) return;
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

      let progress;
      if (range.app.rtl) {
        progress = ((rangeOffsetLeft + range.rangeWidth) - touchesStart.x) / range.rangeWidth;
      } else {
        progress = (touchesStart.x - rangeOffsetLeft) / range.rangeWidth;
      }

      let newValue = (progress * (range.max - range.min)) + range.min;
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
      Utils.nextTick(() => {
        if (isTouched) $touchedKnobEl.addClass('range-knob-active-state');
      }, 70);
      range.on('change', onTouchChange);
      range.setValue(newValue, true);
    }
    function handleTouchMove(e) {
      if (!isTouched) return;
      const pageX = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
      const pageY = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;

      if (typeof isScrolling === 'undefined') {
        isScrolling = !!(isScrolling || Math.abs(pageY - touchesStart.y) > Math.abs(pageX - touchesStart.x));
      }
      if (isScrolling) {
        isTouched = false;
        return;
      }
      e.preventDefault();

      let progress;
      if (range.app.rtl) {
        progress = ((rangeOffsetLeft + range.rangeWidth) - pageX) / range.rangeWidth;
      } else {
        progress = (pageX - rangeOffsetLeft) / range.rangeWidth;
      }

      let newValue = (progress * (range.max - range.min)) + range.min;
      if (range.dual) {
        let leftValue;
        let rightValue;
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
        if (
          (
            range.dual &&
            (
              range.previousValue[0] !== range.value[0] ||
              range.previousValue[1] !== range.value[1]
            )
          ) ||
          (
            !range.dual &&
            range.previousValue !== range.value
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
      const passive = Support.passiveListener ? { passive: true } : false;
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
      const passive = Support.passiveListener ? { passive: true } : false;
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
  calcSize() {
    const range = this;
    const width = range.$el.outerWidth();
    if (width === 0) return;
    range.rangeWidth = width;
    range.knobWidth = range.knobs[0].outerWidth();
  }
  layout() {
    const range = this;
    const {
      app,
      knobWidth,
      rangeWidth,
      min,
      max,
      knobs,
      $barActiveEl,
      value,
      label,
      labels,
    } = range;
    const positionProperty = app.rtl ? 'right' : 'left';
    if (range.dual) {
      const progress = [((value[0] - min) / (max - min)), ((value[1] - min) / (max - min))];
      $barActiveEl.css({
        [positionProperty]: `${progress[0] * 100}%`,
        width: `${(progress[1] - progress[0]) * 100}%`,
      });
      knobs.forEach(($knobEl, knobIndex) => {
        let leftPos = rangeWidth * progress[knobIndex];
        const realLeft = (rangeWidth * progress[knobIndex]) - (knobWidth / 2);
        if (realLeft < 0) leftPos = knobWidth / 2;
        if ((realLeft + knobWidth) > rangeWidth) leftPos = rangeWidth - (knobWidth / 2);
        $knobEl.css(positionProperty, `${leftPos}px`);
        if (label) labels[knobIndex].text(value[knobIndex]);
      });
    } else {
      const progress = ((value - min) / (max - min));
      $barActiveEl.css('width', `${progress * 100}%`);

      let leftPos = rangeWidth * progress;
      const realLeft = (rangeWidth * progress) - (knobWidth / 2);
      if (realLeft < 0) leftPos = knobWidth / 2;
      if ((realLeft + knobWidth) > rangeWidth) leftPos = rangeWidth - (knobWidth / 2);
      knobs[0].css(positionProperty, `${leftPos}px`);
      if (label) labels[0].text(value);
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
  }
  setValue(newValue, byTouchMove) {
    const range = this;
    const { step, min, max } = range;
    let valueChanged;
    let oldValue;
    if (range.dual) {
      oldValue = [range.value[0], range.value[1]];
      let newValues = newValue;
      if (!Array.isArray(newValues)) newValues = [newValue, newValue];
      if (newValue[0] > newValue[1]) {
        newValues = [newValues[0], newValues[0]];
      }
      newValues = newValues.map(value => Math.max(Math.min(Math.round(value / step) * step, max), min));
      if (newValues[0] === range.value[0] && newValues[1] === range.value[1]) {
        return range;
      }
      newValues.forEach((value, valueIndex) => {
        range.value[valueIndex] = value;
      });
      valueChanged = oldValue[0] !== newValues[0] || oldValue[1] !== newValues[1];
      range.layout();
    } else {
      oldValue = range.value;
      const value = Math.max(Math.min(Math.round(newValue / step) * step, max), min);
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
  getValue() {
    return this.value;
  }
  init() {
    const range = this;
    range.calcSize();
    range.layout();
    range.attachEvents();
    return range;
  }
  destroy() {
    let range = this;
    range.$el.trigger('range:beforedestroy', range);
    range.emit('local::beforeDestroy rangeBeforeDestroy', range);
    delete range.$el[0].f7Range;
    range.detachEvents();
    Utils.deleteProps(range);
    range = null;
  }
}

export default Range;
