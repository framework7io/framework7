'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (colEl, updateItems) {
  var picker = this;
  var app = picker.app;
  var $colEl = (0, _dom2.default)(colEl);
  var colIndex = $colEl.index();
  var col = picker.cols[colIndex];
  if (col.divider) return;

  col.$el = $colEl;
  col.el = $colEl[0];
  col.$itemsEl = col.$el.find('.picker-items');
  col.items = col.$itemsEl.find('.picker-item');

  var itemHeight = void 0;
  var itemsHeight = void 0;
  var minTranslate = void 0;
  var maxTranslate = void 0;
  var animationFrameId = void 0;

  function updateDuringScroll() {
    animationFrameId = _utils2.default.requestAnimationFrame(function () {
      col.updateItems(undefined, undefined, 0);
      updateDuringScroll();
    });
  }

  col.replaceValues = function replaceColValues(values, displayValues) {
    col.detachEvents();
    col.values = values;
    col.displayValues = displayValues;
    col.$itemsEl.html(picker.renderColumn(col, true));
    col.items = col.$itemsEl.find('.picker-item');
    col.calcSize();
    col.setValue(col.values[0], 0, true);
    col.attachEvents();
  };
  col.calcSize = function calcColSize() {
    if (picker.params.rotateEffect) {
      col.$el.removeClass('picker-column-absolute');
      if (!col.width) col.$el.css({ width: '' });
    }
    var colWidth = 0;
    var colHeight = col.$el[0].offsetHeight;
    itemHeight = col.items[0].offsetHeight;
    itemsHeight = itemHeight * col.items.length;
    minTranslate = colHeight / 2 - itemsHeight + itemHeight / 2;
    maxTranslate = colHeight / 2 - itemHeight / 2;
    if (col.width) {
      colWidth = col.width;
      if (parseInt(colWidth, 10) === colWidth) colWidth += 'px';
      col.$el.css({ width: colWidth });
    }
    if (picker.params.rotateEffect) {
      if (!col.width) {
        col.items.each(function (index, itemEl) {
          var item = (0, _dom2.default)(itemEl).children('span');
          colWidth = Math.max(colWidth, item[0].offsetWidth);
        });
        col.$el.css({ width: colWidth + 2 + 'px' });
      }
      col.$el.addClass('picker-column-absolute');
    }
  };

  col.setValue = function setColValue(newValue) {
    var transition = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    var valueCallbacks = arguments[2];

    var newActiveIndex = col.$itemsEl.find('.picker-item[data-picker-value="' + newValue + '"]').index();
    if (typeof newActiveIndex === 'undefined' || newActiveIndex === -1) {
      return;
    }
    var newTranslate = -newActiveIndex * itemHeight + maxTranslate;
    // Update wrapper
    col.$itemsEl.transition(transition);
    col.$itemsEl.transform('translate3d(0,' + newTranslate + 'px,0)');

    // Watch items
    if (picker.params.updateValuesOnMomentum && col.activeIndex && col.activeIndex !== newActiveIndex) {
      _utils2.default.cancelAnimationFrame(animationFrameId);
      col.$itemsEl.transitionEnd(function () {
        _utils2.default.cancelAnimationFrame(animationFrameId);
      });
      updateDuringScroll();
    }

    // Update items
    col.updateItems(newActiveIndex, newTranslate, transition, valueCallbacks);
  };

  col.updateItems = function updateColItems(activeIndex, translate, transition, valueCallbacks) {
    if (typeof translate === 'undefined') {
      // eslint-disable-next-line
      translate = _utils2.default.getTranslate(col.$itemsEl[0], 'y');
    }
    // eslint-disable-next-line
    if (typeof activeIndex === 'undefined') activeIndex = -Math.round((translate - maxTranslate) / itemHeight);
    // eslint-disable-next-line
    if (activeIndex < 0) activeIndex = 0;
    // eslint-disable-next-line
    if (activeIndex >= col.items.length) activeIndex = col.items.length - 1;
    var previousActiveIndex = col.activeIndex;
    col.activeIndex = activeIndex;
    col.$itemsEl.find('.picker-item-selected').removeClass('picker-item-selected');

    col.items.transition(transition);

    var selectedItem = col.items.eq(activeIndex).addClass('picker-item-selected').transform('');

    // Set 3D rotate effect
    if (picker.params.rotateEffect) {
      col.items.each(function (index, itemEl) {
        var $itemEl = (0, _dom2.default)(itemEl);
        var itemOffsetTop = $itemEl.index() * itemHeight;
        var translateOffset = maxTranslate - translate;
        var itemOffset = itemOffsetTop - translateOffset;
        var percentage = itemOffset / itemHeight;
        var itemsFit = Math.ceil(col.height / itemHeight / 2) + 1;

        var angle = -18 * percentage;
        if (angle > 180) angle = 180;
        if (angle < -180) angle = -180;
        if (Math.abs(percentage) > itemsFit) {
          $itemEl.addClass('picker-item-far');
        } else {
          $itemEl.removeClass('picker-item-far');
        }
        $itemEl.transform('translate3d(0, ' + (-translate + maxTranslate) + 'px, ' + (picker.needsOriginFix ? -110 : 0) + 'px) rotateX(' + angle + 'deg)');
      });
    }

    if (valueCallbacks || typeof valueCallbacks === 'undefined') {
      // Update values
      col.value = selectedItem.attr('data-picker-value');
      col.displayValue = col.displayValues ? col.displayValues[activeIndex] : col.value;
      // On change callback
      if (previousActiveIndex !== activeIndex) {
        if (col.onChange) {
          col.onChange(picker, col.value, col.displayValue);
        }
        picker.updateValue();
      }
    }
  };

  var allowItemClick = true;
  var isTouched = void 0;
  var isMoved = void 0;
  var touchStartY = void 0;
  var touchCurrentY = void 0;
  var touchStartTime = void 0;
  var touchEndTime = void 0;
  var startTranslate = void 0;
  var returnTo = void 0;
  var currentTranslate = void 0;
  var prevTranslate = void 0;
  var velocityTranslate = void 0;
  function handleTouchStart(e) {
    if (isMoved || isTouched) return;
    e.preventDefault();
    isTouched = true;
    touchStartY = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
    touchCurrentY = touchStartY;
    touchStartTime = new Date().getTime();

    allowItemClick = true;
    startTranslate = _utils2.default.getTranslate(col.$itemsEl[0], 'y');
    currentTranslate = startTranslate;
  }
  function handleTouchMove(e) {
    if (!isTouched) return;
    e.preventDefault();
    allowItemClick = false;
    touchCurrentY = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
    if (!isMoved) {
      // First move
      _utils2.default.cancelAnimationFrame(animationFrameId);
      isMoved = true;
      startTranslate = _utils2.default.getTranslate(col.$itemsEl[0], 'y');
      currentTranslate = startTranslate;
      col.$itemsEl.transition(0);
    }

    var diff = touchCurrentY - touchStartY;
    currentTranslate = startTranslate + diff;
    returnTo = undefined;

    // Normalize translate
    if (currentTranslate < minTranslate) {
      currentTranslate = minTranslate - Math.pow(minTranslate - currentTranslate, 0.8);
      returnTo = 'min';
    }
    if (currentTranslate > maxTranslate) {
      currentTranslate = maxTranslate + Math.pow(currentTranslate - maxTranslate, 0.8);
      returnTo = 'max';
    }
    // Transform wrapper
    col.$itemsEl.transform('translate3d(0,' + currentTranslate + 'px,0)');

    // Update items
    col.updateItems(undefined, currentTranslate, 0, picker.params.updateValuesOnTouchmove);

    // Calc velocity
    velocityTranslate = currentTranslate - prevTranslate || currentTranslate;
    prevTranslate = currentTranslate;
  }
  function handleTouchEnd() {
    if (!isTouched || !isMoved) {
      isTouched = false;
      isMoved = false;
      return;
    }
    isTouched = false;
    isMoved = false;
    col.$itemsEl.transition('');
    if (returnTo) {
      if (returnTo === 'min') {
        col.$itemsEl.transform('translate3d(0,' + minTranslate + 'px,0)');
      } else col.$itemsEl.transform('translate3d(0,' + maxTranslate + 'px,0)');
    }
    touchEndTime = new Date().getTime();
    var newTranslate = void 0;
    if (touchEndTime - touchStartTime > 300) {
      newTranslate = currentTranslate;
    } else {
      newTranslate = currentTranslate + velocityTranslate * picker.params.momentumRatio;
    }

    newTranslate = Math.max(Math.min(newTranslate, maxTranslate), minTranslate);

    // Active Index
    var activeIndex = -Math.floor((newTranslate - maxTranslate) / itemHeight);

    // Normalize translate
    if (!picker.params.freeMode) newTranslate = -activeIndex * itemHeight + maxTranslate;

    // Transform wrapper
    col.$itemsEl.transform('translate3d(0,' + parseInt(newTranslate, 10) + 'px,0)');

    // Update items
    col.updateItems(activeIndex, newTranslate, '', true);

    // Watch items
    if (picker.params.updateValuesOnMomentum) {
      updateDuringScroll();
      col.$itemsEl.transitionEnd(function () {
        _utils2.default.cancelAnimationFrame(animationFrameId);
      });
    }

    // Allow click
    setTimeout(function () {
      allowItemClick = true;
    }, 100);
  }

  function handleClick() {
    if (!allowItemClick) return;
    _utils2.default.cancelAnimationFrame(animationFrameId);
    var value = (0, _dom2.default)(this).attr('data-picker-value');
    col.setValue(value);
  }

  var activeListener = app.support.passiveListener ? { passive: false, capture: false } : false;
  col.attachEvents = function attachColEvents() {
    col.$el.on(app.touchEvents.start, handleTouchStart, activeListener);
    app.on('touchmove:active', handleTouchMove);
    app.on('touchend:passive', handleTouchEnd);
    col.items.on('click', handleClick);
  };
  col.detachEvents = function detachColEvents() {
    col.$el.off(app.touchEvents.start, handleTouchStart, activeListener);
    app.off('touchmove:active', handleTouchMove);
    app.off('touchend:passive', handleTouchEnd);
    col.items.off('click', handleClick);
  };

  col.init = function initCol() {
    col.calcSize();
    col.$itemsEl.transform('translate3d(0,' + maxTranslate + 'px,0)').transition(0);
    if (colIndex === 0) col.$el.addClass('picker-column-first');
    if (colIndex === picker.cols.length - 1) col.$el.addClass('picker-column-last');
    // Update items on init
    if (updateItems) col.updateItems(0, maxTranslate, 0);

    col.attachEvents();
  };

  col.destroy = function destroyCol() {
    col.detachEvents();
  };

  col.init();
};

var _dom = require('dom7');

var _dom2 = _interopRequireDefault(_dom);

var _utils = require('../../utils/utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}