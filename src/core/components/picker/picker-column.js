import $ from '../../shared/dom7.js';

export default function pickerColumn(colEl, updateItems) {
  const picker = this;
  // const app = picker.app;
  const $colEl = $(colEl);
  const colIndex = $colEl.index();
  const col = picker.cols[colIndex];
  if (col.divider) return;

  col.$el = $colEl;
  col.el = $colEl[0];
  col.$itemsEl = col.$el.find('.picker-items');
  col.items = col.$itemsEl.find('.picker-item');

  let itemHeight;
  let colHeight;

  col.replaceValues = function replaceColValues(values, displayValues) {
    col.detachEvents();
    col.values = values;
    col.displayValues = displayValues;
    col.$itemsEl.html(picker.renderColumn(col, true));
    col.items = col.$itemsEl.find('.picker-item');
    col.calcSize();
    col.setValue(col.values[0], true);
    col.attachEvents();
  };
  col.calcSize = function calcColSize() {
    colHeight = col.$el[0].offsetHeight;
    itemHeight = col.items[0].offsetHeight;

    const hadPadding = col.el.style.getPropertyValue('--f7-picker-scroll-padding');
    col.el.style.setProperty('--f7-picker-scroll-padding', `${(colHeight - itemHeight) / 2}px`);
    if (!hadPadding) {
      col.$itemsEl[0].scrollTop = 0;
    }
  };

  col.setValue = function setColValue(newValue, valueCallbacks) {
    const newActiveIndex = col.$itemsEl
      .find(`.picker-item[data-picker-value="${newValue}"]`)
      .index();
    if (typeof newActiveIndex === 'undefined' || newActiveIndex === -1) {
      return;
    }
    const newScrollTop = newActiveIndex * itemHeight;
    col.$itemsEl[0].scrollTop = newScrollTop;

    // Update items
    col.updateItems(newActiveIndex, newScrollTop, valueCallbacks);
  };

  col.updateItems = function updateColItems(activeIndex, scrollTop, valueCallbacks) {
    if (typeof scrollTop === 'undefined') {
      // eslint-disable-next-line
      scrollTop = col.$itemsEl[0].scrollTop;
    }

    /* eslint-disable no-param-reassign */
    if (typeof activeIndex === 'undefined') {
      activeIndex = Math.round(scrollTop / itemHeight);
    }
    if (activeIndex < 0) activeIndex = 0;
    if (activeIndex >= col.items.length) activeIndex = col.items.length - 1;
    /* eslint-enable no-param-reassign */
    const previousActiveIndex = col.activeIndex;
    col.activeIndex = activeIndex;
    col.$itemsEl.find('.picker-item-selected').removeClass('picker-item-selected');

    const selectedItem = col.items.eq(activeIndex);
    selectedItem.addClass('picker-item-selected').children().transform('');
    // Set 3D rotate effect
    if (picker.params.rotateEffect) {
      col.items.each((itemEl) => {
        const $itemEl = $(itemEl);

        const itemOffset = itemEl.offsetTop - (colHeight - itemHeight) / 2 - scrollTop;
        const percentage = itemOffset / itemHeight;
        const itemsFit = Math.ceil(col.height / itemHeight / 2) + 1;

        let angle = -24 * percentage;
        if (angle > 180) angle = 180;
        if (angle < -180) angle = -180;
        if (Math.abs(percentage) > itemsFit) {
          $itemEl.addClass('picker-item-far');
        } else {
          $itemEl.removeClass('picker-item-far');
        }
        $itemEl
          .children('span')
          .transform(`translate3d(0, ${-percentage * itemHeight}px, -100px) rotateX(${angle}deg)`);
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

  function handleScroll() {
    col.updateItems();
  }

  function handleClick() {
    const value = $(this).attr('data-picker-value');
    col.setValue(value);
  }

  col.attachEvents = function attachColEvents() {
    col.$itemsEl.on('scroll', handleScroll);
    col.items.on('click', handleClick);
  };
  col.detachEvents = function detachColEvents() {
    col.items.off('click', handleClick);
  };

  col.init = function initCol() {
    col.calcSize();
    if (colIndex === 0) col.$el.addClass('picker-column-first');
    if (colIndex === picker.cols.length - 1) col.$el.addClass('picker-column-last');
    if (picker.params.freeMode) col.$el.addClass('picker-column-free-mode');
    // Update items on init
    if (updateItems) col.updateItems(0);

    col.attachEvents();
  };

  col.destroy = function destroyCol() {
    col.detachEvents();
  };

  col.init();
}
