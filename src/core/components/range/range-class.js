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
      vertical: false,
      verticalReversed: false,
      formatLabel: null,
      scale: false,
      scaleSteps: 5,
      scaleSubSteps: 0,
      formatScaleLabel: null,
      limitKnobPosition: app.theme === 'ios',
    };

    // Extend defaults with modules params
    range.useModulesParams(defaults);

    range.params = Utils.extend(defaults, params);

    const el = range.params.el;
    if (!el) return range;

    const $el = $(el);
    if ($el.length === 0) return range;

    if ($el[0].f7Range) return $el[0].f7Range;

    const dataset = $el.dataset();

    ('step min max value scaleSteps scaleSubSteps').split(' ').forEach((paramName) => {
      if (typeof params[paramName] === 'undefined' && typeof dataset[paramName] !== 'undefined') {
        range.params[paramName] = parseFloat(dataset[paramName]);
      }
    });
    ('dual label vertical verticalReversed scale').split(' ').forEach((paramName) => {
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

    const {
      dual, step, label, min, max, value, vertical, verticalReversed, scale, scaleSteps, scaleSubSteps, limitKnobPosition,
    } = range.params;

    Utils.extend(range, {
      app,
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
      vertical,
      verticalReversed,
      scale,
      scaleSteps,
      scaleSubSteps,
      limitKnobPosition,
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

    // Vertical
    if (range.vertical) {
      $el.addClass('range-slider-vertical');
      if (range.verticalReversed) {
        $el.addClass('range-slider-vertical-reversed');
      }
    } else {
      $el.addClass('range-slider-horizontal');
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

    if (range.dual) {
      knobs.push($(knobHTML));
    }

    $el.append($barEl);
    knobs.forEach(($knobEl) => {
      $el.append($knobEl);
    });

    // Labels
    const labels = [];
    if (range.label) {
      labels.push(knobs[0].find('.range-knob-label'));
      if (range.dual) {
        labels.push(knobs[1].find('.range-knob-label'));
      }
    }

    // Scale
    let $scaleEl;
    if (range.scale && range.scaleSteps >= 1) {
      $scaleEl = $(`
        <div class="range-scale">
          ${range.renderScale()}
        </div>
      `);
      $el.append($scaleEl);
    }

    Utils.extend(range, {
      knobs,
      labels,
      $barEl,
      $barActiveEl,
      $scaleEl,
    });

    $el[0].f7Range = range;

    // Touch Events
    let isTouched;
    const touchesStart = {};
    let isScrolling;
    let rangeOffset;
    let rangeOffsetLeft;
    let rangeOffsetTop;
    let $touchedKnobEl;
    let dualValueIndex;
    let valueChangedByTouch;
    let targetTouchIdentifier;
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
      if (e.type === 'touchstart') {
        targetTouchIdentifier = e.targetTouches[0].identifier;
      }

      isTouched = true;
      isScrolling = undefined;
      rangeOffset = $el.offset();
      rangeOffsetLeft = rangeOffset.left;
      rangeOffsetTop = rangeOffset.top;

      let progress;
      if (range.vertical) {
        progress = (touchesStart.y - rangeOffsetTop) / range.rangeHeight;
        if (!range.verticalReversed) progress = 1 - progress;
      } else if (range.app.rtl) {
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
      let pageX;
      let pageY;
      if (e.type === 'touchmove') {
        for (let i = 0; i < e.targetTouches.length; i += 1) {
          if (e.targetTouches[i].identifier === targetTouchIdentifier) {
            pageX = e.targetTouches[i].pageX;
            pageY = e.targetTouches[i].pageY;
          }
        }
      } else {
        pageX = e.pageX;
        pageY = e.pageY;
      }
      if (typeof pageX === 'undefined' && typeof pageY === 'undefined') return;

      if (typeof isScrolling === 'undefined' && !range.vertical) {
        isScrolling = !!(isScrolling || Math.abs(pageY - touchesStart.y) > Math.abs(pageX - touchesStart.x));
      }
      if (isScrolling) {
        isTouched = false;
        return;
      }
      e.preventDefault();

      let progress;
      if (range.vertical) {
        progress = (pageY - rangeOffsetTop) / range.rangeHeight;
        if (!range.verticalReversed) progress = 1 - progress;
      } else if (range.app.rtl) {
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
    function handleTouchEnd(e) {
      if (e.type === 'touchend') {
        let touchEnded;
        for (let i = 0; i < e.changedTouches.length; i += 1) {
          if (e.changedTouches[i].identifier === targetTouchIdentifier) touchEnded = true;
        }
        if (!touchEnded) return;
      }
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
          range.$el.trigger('range:changed', range.value);
          range.emit('local::changed rangeChanged', range, range.value);
        }
      }
    }

    function handleResize() {
      range.calcSize();
      range.layout();
    }
    let parentModals;
    let parentPanel;
    let parentPage;
    range.attachEvents = function attachEvents() {
      const passive = Support.passiveListener ? { passive: true } : false;
      range.$el.on(app.touchEvents.start, handleTouchStart, passive);
      app.on('touchmove', handleTouchMove);
      app.on('touchend:passive', handleTouchEnd);
      app.on('tabShow', handleResize);
      app.on('resize', handleResize);
      parentModals = range.$el.parents('.sheet-modal, .actions-modal, .popup, .popover, .login-screen, .dialog, .toast');
      parentModals.on('modal:open', handleResize);
      parentPanel = range.$el.parents('.panel');
      parentPanel.on('panel:open panel:resize', handleResize);
      parentPage = range.$el.parents('.page').eq(0);
      parentPage.on('page:reinit', handleResize);
    };
    range.detachEvents = function detachEvents() {
      const passive = Support.passiveListener ? { passive: true } : false;
      range.$el.off(app.touchEvents.start, handleTouchStart, passive);
      app.off('touchmove', handleTouchMove);
      app.off('touchend:passive', handleTouchEnd);
      app.off('tabShow', handleResize);
      app.off('resize', handleResize);
      if (parentModals) {
        parentModals.off('modal:open', handleResize);
      }
      if (parentPanel) {
        parentPanel.off('panel:open panel:resize', handleResize);
      }
      if (parentPage) {
        parentPage.off('page:reinit', handleResize);
      }
      parentModals = null;
      parentPanel = null;
      parentPage = null;
    };

    // Install Modules
    range.useModules();

    // Init
    range.init();

    return range;
  }

  calcSize() {
    const range = this;
    if (range.vertical) {
      const height = range.$el.outerHeight();
      if (height === 0) return;
      range.rangeHeight = height;
      range.knobHeight = range.knobs[0].outerHeight();
    } else {
      const width = range.$el.outerWidth();
      if (width === 0) return;
      range.rangeWidth = width;
      range.knobWidth = range.knobs[0].outerWidth();
    }
  }

  layout() {
    const range = this;
    const {
      app,
      knobWidth,
      knobHeight,
      rangeWidth,
      rangeHeight,
      min,
      max,
      knobs,
      $barActiveEl,
      value,
      label,
      labels,
      vertical,
      verticalReversed,
      limitKnobPosition,
    } = range;
    const knobSize = vertical ? knobHeight : knobWidth;
    const rangeSize = vertical ? rangeHeight : rangeWidth;
    // eslint-disable-next-line
    const positionProperty = vertical
      ? (verticalReversed ? 'top' : 'bottom')
      : (app.rtl ? 'right' : 'left');
    if (range.dual) {
      const progress = [((value[0] - min) / (max - min)), ((value[1] - min) / (max - min))];
      $barActiveEl.css({
        [positionProperty]: `${progress[0] * 100}%`,
        [vertical ? 'height' : 'width']: `${(progress[1] - progress[0]) * 100}%`,
      });
      knobs.forEach(($knobEl, knobIndex) => {
        let startPos = rangeSize * progress[knobIndex];
        if (limitKnobPosition) {
          const realStartPos = (rangeSize * progress[knobIndex]) - (knobSize / 2);
          if (realStartPos < 0) startPos = knobSize / 2;
          if ((realStartPos + knobSize) > rangeSize) startPos = rangeSize - (knobSize / 2);
        }
        $knobEl.css(positionProperty, `${startPos}px`);
        if (label) labels[knobIndex].text(range.formatLabel(value[knobIndex], labels[knobIndex][0]));
      });
    } else {
      const progress = ((value - min) / (max - min));
      $barActiveEl.css(vertical ? 'height' : 'width', `${progress * 100}%`);

      let startPos = rangeSize * progress;
      if (limitKnobPosition) {
        const realStartPos = (rangeSize * progress) - (knobSize / 2);
        if (realStartPos < 0) startPos = knobSize / 2;
        if ((realStartPos + knobSize) > rangeSize) startPos = rangeSize - (knobSize / 2);
      }
      knobs[0].css(positionProperty, `${startPos}px`);
      if (label) labels[0].text(range.formatLabel(value, labels[0][0]));
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
    range.$el.trigger('range:change', range.value);
    if (range.$inputEl && !range.dual) {
      range.$inputEl.val(range.value);
      if (!byTouchMove) {
        range.$inputEl.trigger('input change');
      } else {
        range.$inputEl.trigger('input');
      }
    }
    if (!byTouchMove) {
      range.$el.trigger('range:changed', range.value);
      range.emit('local::changed rangeChanged', range, range.value);
    }
    range.emit('local::change rangeChange', range, range.value);
    return range;
  }

  getValue() {
    return this.value;
  }

  formatLabel(value, labelEl) {
    const range = this;
    if (range.params.formatLabel) return range.params.formatLabel.call(range, value, labelEl);
    return value;
  }

  formatScaleLabel(value) {
    const range = this;
    if (range.params.formatScaleLabel) return range.params.formatScaleLabel.call(range, value);
    return value;
  }

  renderScale() {
    const range = this;
    const { app, verticalReversed, vertical } = range;

    // eslint-disable-next-line
    const positionProperty = vertical
      ? (verticalReversed ? 'top' : 'bottom')
      : (app.rtl ? 'right' : 'left');

    let html = '';
    Array
      .from({ length: range.scaleSteps + 1 })
      .forEach((scaleEl, index) => {
        const scaleStepValue = (range.max - range.min) / range.scaleSteps;
        const scaleValue = range.min + scaleStepValue * index;
        const progress = ((scaleValue - range.min) / (range.max - range.min));
        html += `<div class="range-scale-step" style="${positionProperty}: ${progress * 100}%">${range.formatScaleLabel(scaleValue)}</div>`;

        if (range.scaleSubSteps && range.scaleSubSteps > 1 && index < range.scaleSteps) {
          Array
            .from({ length: range.scaleSubSteps - 1 })
            .forEach((subStepEl, subIndex) => {
              const subStep = scaleStepValue / range.scaleSubSteps;
              const scaleSubValue = scaleValue + subStep * (subIndex + 1);
              const subProgress = ((scaleSubValue - range.min) / (range.max - range.min));
              html += `<div class="range-scale-step range-scale-substep" style="${positionProperty}: ${subProgress * 100}%"></div>`;
            });
        }
      });

    return html;
  }

  updateScale() {
    const range = this;
    if (!range.scale || range.scaleSteps < 1) {
      if (range.$scaleEl) range.$scaleEl.remove();
      delete range.$scaleEl;
      return;
    }
    if (!range.$scaleEl) {
      range.$scaleEl = $('<div class="range-scale"></div>');
      range.$el.append(range.$scaleEl);
    }

    range.$scaleEl.html(range.renderScale());
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
    range.$el.trigger('range:beforedestroy');
    range.emit('local::beforeDestroy rangeBeforeDestroy', range);
    delete range.$el[0].f7Range;
    range.detachEvents();
    Utils.deleteProps(range);
    range = null;
  }
}

export default Range;
