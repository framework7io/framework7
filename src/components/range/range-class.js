import $ from 'dom7';
import Utils from '../../utils/utils';
import Framework7Class from '../../utils/class';

class Range extends Framework7Class {
  constructor(app, params) {
    super(params);
    const range = this;
    const defaults = {
      dual: false,
      step: 1,
    };
    range.params = Utils.extend(defaults, params);

    const el = range.params.el;
    if (!el) return range;

    const $el = $(el);
    if ($el.length === 0) return range;

    let $inputEl;
    if (!range.params.dual) {
      if (range.params.inputEl) {
        $inputEl = $(range.params.inputEl);
      } else if ($el.find('input[type="range"]').length) {
        $inputEl = $el.find('input[type="range"]').eq(0);
      }
    }

    Utils.extend(range, range.params, {
      $el,
      el: $el[0],
      $inputEl,
      inputEl: $inputEl ? $inputEl[0] : undefined,
    });

    if ($inputEl) {
      ('step min max value').split(' ').forEach((paramName) => {
        if (!params[paramName] && $inputEl.attr(paramName)) {
          range[paramName] = parseFloat($inputEl.attr(paramName));
        }
      });
    }

    // Check for layout
    const $barEl = $('<div class="range-bar"></div>');
    const $barActiveEl = $('<div class="range-bar-active"></div>');
    $barEl.append($barActiveEl);

    const knobs = [$('<div class="range-knob"></div>')];
    if (range.dual) {
      knobs.push($('<div class="range-knob"></div>'));
    }

    $el.append($barEl);
    knobs.forEach(($knobEl) => {
      $el.append($knobEl);
    });

    Utils.extend(range, {
      knobs,
      $barEl,
      $barActiveEl,
    });

    range.$el[0].f7Range = range;

    // Touch Events
    let isTouched;
    let isMoved;
    const touchesStart = {};
    let isScrolling;
    let rangeOffsetLeft;
    function handleTouchStart(e) {
      if (isTouched) return;
      touchesStart.x = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
      touchesStart.y = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;

      isMoved = false;
      isTouched = true;
      isScrolling = undefined;
      rangeOffsetLeft = range.$el.offset().left;

      const progress = (touchesStart.x - rangeOffsetLeft) / range.rangeWidth;
      if (!range.dual) {
        range.knobs[0].addClass('range-knob-active');
        const newValue = (progress * (range.max - range.min)) + range.min;
        range.setValue(newValue);
      }
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

      isMoved = true;

      const progress = (pageX - rangeOffsetLeft) / range.rangeWidth;
      if (!range.dual) {
        const newValue = (progress * (range.max - range.min)) + range.min;
        range.setValue(newValue);
      }
    }
    function handleTouchEnd() {
      if (!isTouched || !isMoved) {
        isTouched = false;
        isMoved = false;
        return;
      }
      isTouched = false;
      isMoved = false;
      if (!range.dual) {
        range.knobs[0].removeClass('range-knob-active');
      }
    }

    range.handleResize = function handleResize() {
      range.layout();
    };
    range.attachEvents = function attachEvents() {
      range.$el.on(app.touchEvents.start, handleTouchStart, { passive: false });
      $(document).on(app.touchEvents.move, handleTouchMove, { passive: false });
      $(document).on(app.touchEvents.end, handleTouchEnd, { passive: false });
      app.on('resize', range.handleResize);
    };
    range.detachEvents = function detachEvents() {
      range.$el.off(app.touchEvents.start, handleTouchStart, { passive: false });
      $(document).off(app.touchEvents.move, handleTouchMove, { passive: false });
      $(document).off(app.touchEvents.end, handleTouchEnd, { passive: false });
      app.off('resize', range.handleResize);
    };

    // Init
    range.init();

    return range;
  }
  layout() {
    const range = this;
    range.rangeWidth = range.$el.outerWidth();
    range.knobWidth = range.knobs[0].outerWidth();
    const { knobWidth, rangeWidth, min, max, knobs, $barActiveEl, value } = range;
    if (range.dual) {
      const progress = [((value[0] - min) / (max - min)), ((value[1] - min) / (max - min))];
      $barActiveEl.css({
        left: `${progress[0] * 100}%`,
        width: `${(progress[1] - progress[0]) * 100}%`,
      });
      knobs.forEach(($knobEl, knobIndex) => {
        $knobEl
          .css('left', `${progress[knobIndex] * 100}%`)
          .transform(`translateX(-${progress[knobIndex] * 100}%)`);
      });
    } else {
      const progress = ((value - min) / (max - min));
      $barActiveEl.css('width', `${progress * 100}%`);

      let left = rangeWidth * progress;
      const realLeft = (rangeWidth * progress) - (knobWidth / 2);
      if (realLeft < 0) left = knobWidth / 2;
      if ((realLeft + knobWidth) > rangeWidth) left = rangeWidth - (knobWidth / 2);
      knobs[0]
        .css('left', `${Math.min(left)}px`);
    }
  }
  setValue(newValue) {
    const range = this;
    const { step, min, max } = range;
    if (range.dual) {
      if (newValue[0] > newValue[1]) return range;
      const newValues = newValue.map((value) => {
        return Math.max(Math.min(Math.round(value / step) * step, max), min);
      });
      if (newValues[0] === range.value[0] && newValues[1] === range.value[1]) {
        return range;
      }
      newValues.forEach((value, valueIndex) => {
        range.value[valueIndex] = value;
      });
      range.layout();
    } else {
      const value = Math.max(Math.min(Math.round(newValue / step) * step, max), min);
      range.value = value;
      range.layout();
    }
    // Events
    range.$el.trigger('change rangeChange range:change', range, range.value);
    if (range.$inputEl && !range.dual) {
      range.$inputEl.val(range.value).trigger('input change');
    }
    range.emit('change rangeChange range:change', range.value);
    return range;
  }
  getValue() {
    return this.value;
  }
  init() {
    const range = this;
    range.layout();
    range.attachEvents();
    return range;
  }
  destroy() {
    const range = this;
    range.detachEvents();
  }
}

export default Range;
