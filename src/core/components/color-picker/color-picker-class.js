import $ from 'dom7';
import Utils from '../../utils/utils';
import Framework7Class from '../../utils/class';

class ColorPicker extends Framework7Class {
  constructor(app, params = {}) {
    super(params, [app]);
    const self = this;

    self.params = Utils.extend({}, app.params.colorPicker, params);

    let $containerEl;
    if (self.params.containerEl) {
      $containerEl = $(self.params.containerEl);
      if ($containerEl.length === 0) return self;
    }

    let $inputEl;
    if (self.params.inputEl) {
      $inputEl = $(self.params.inputEl);
    }

    let view;
    if ($inputEl) {
      view = $inputEl.parents('.view').length && $inputEl.parents('.view')[0].f7View;
    }
    if (!view) view = app.views.main;

    const isHorizontal = self.params.direction === 'horizontal';

    let inverter = 1;
    if (isHorizontal) {
      inverter = app.rtl ? -1 : 1;
    }

    Utils.extend(self, {
      app,
      $containerEl,
      containerEl: $containerEl && $containerEl[0],
      inline: $containerEl && $containerEl.length > 0,
      $inputEl,
      inputEl: $inputEl && $inputEl[0],
      initialized: false,
      opened: false,
      url: self.params.url,
      isHorizontal,
      inverter,
      view,
      animating: false,
    });

    function onInputClick() {
      self.open();
    }
    function onInputFocus(e) {
      e.preventDefault();
    }
    function onHtmlClick(e) {
      const $targetEl = $(e.target);
      if (self.isPopover()) return;
      if (!self.opened || self.closing) return;
      if ($targetEl.closest('[class*="backdrop"]').length) return;
      if ($inputEl && $inputEl.length > 0) {
        if ($targetEl[0] !== $inputEl[0] && $targetEl.closest('.sheet-modal, .calendar-modal').length === 0) {
          self.close();
        }
      } else if ($(e.target).closest('.sheet-modal, .calendar-modal').length === 0) {
        self.close();
      }
    }

    // Events
    Utils.extend(self, {
      attachInputEvents() {
        self.$inputEl.on('click', onInputClick);
        if (self.params.inputReadOnly) {
          self.$inputEl.on('focus mousedown', onInputFocus);
        }
      },
      detachInputEvents() {
        self.$inputEl.off('click', onInputClick);
        if (self.params.inputReadOnly) {
          self.$inputEl.off('focus mousedown', onInputFocus);
        }
      },
      attachHtmlEvents() {
        app.on('click', onHtmlClick);
      },
      detachHtmlEvents() {
        app.off('click', onHtmlClick);
      },
    });
    self.attachColorPickerEvents = function attachColorPickerEvents() {
      let allowItemClick = true;
      let isTouched;
      let isMoved;
      let touchStartX;
      let touchStartY;
      let touchCurrentX;
      let touchCurrentY;
      let touchStartTime;
      let touchEndTime;
      let currentTranslate;
      let wrapperWidth;
      let wrapperHeight;
      let percentage;
      let touchesDiff;
      let isScrolling;

      const { $el, $wrapperEl } = self;

      function handleTouchStart(e) {
        if (isMoved || isTouched) return;
        isTouched = true;
        touchStartX = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
        touchCurrentX = touchStartX;
        touchStartY = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
        touchCurrentY = touchStartY;
        touchStartTime = (new self.DateHandleClass()).getTime();
        percentage = 0;
        allowItemClick = true;
        isScrolling = undefined;
        currentTranslate = self.monthsTranslate;
      }
      function handleTouchMove(e) {
        if (!isTouched) return;
        const { isHorizontal: isH } = self;

        touchCurrentX = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
        touchCurrentY = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
        if (typeof isScrolling === 'undefined') {
          isScrolling = !!(isScrolling || Math.abs(touchCurrentY - touchStartY) > Math.abs(touchCurrentX - touchStartX));
        }
        if (isH && isScrolling) {
          isTouched = false;
          return;
        }
        e.preventDefault();
        if (self.animating) {
          isTouched = false;
          return;
        }
        allowItemClick = false;
        if (!isMoved) {
          // First move
          isMoved = true;
          wrapperWidth = $wrapperEl[0].offsetWidth;
          wrapperHeight = $wrapperEl[0].offsetHeight;
          $wrapperEl.transition(0);
        }

        touchesDiff = isH ? touchCurrentX - touchStartX : touchCurrentY - touchStartY;
        percentage = touchesDiff / (isH ? wrapperWidth : wrapperHeight);
        currentTranslate = ((self.monthsTranslate * self.inverter) + percentage) * 100;

        // Transform wrapper
        $wrapperEl.transform(`translate3d(${isH ? currentTranslate : 0}%, ${isH ? 0 : currentTranslate}%, 0)`);
      }
      function handleTouchEnd() {
        if (!isTouched || !isMoved) {
          isTouched = false;
          isMoved = false;
          return;
        }
        isTouched = false;
        isMoved = false;

        touchEndTime = new self.DateHandleClass().getTime();
        if (touchEndTime - touchStartTime < 300) {
          if (Math.abs(touchesDiff) < 10) {
            self.resetMonth();
          } else if (touchesDiff >= 10) {
            if (app.rtl) self.nextMonth();
            else self.prevMonth();
          } else if (app.rtl) self.prevMonth();
          else self.nextMonth();
        } else if (percentage <= -0.5) {
          if (app.rtl) self.prevMonth();
          else self.nextMonth();
        } else if (percentage >= 0.5) {
          if (app.rtl) self.nextMonth();
          else self.prevMonth();
        } else {
          self.resetMonth();
        }

        // Allow click
        setTimeout(() => {
          allowItemClick = true;
        }, 100);
      }

      function handleDayClick(e) {
        if (!allowItemClick) return;
        let $dayEl = $(e.target).parents('.calendar-day');
        if ($dayEl.length === 0 && $(e.target).hasClass('calendar-day')) {
          $dayEl = $(e.target);
        }
        if ($dayEl.length === 0) return;
        if ($dayEl.hasClass('calendar-day-disabled')) return;
        if (!self.params.rangePicker) {
          if ($dayEl.hasClass('calendar-day-next')) self.nextMonth();
          if ($dayEl.hasClass('calendar-day-prev')) self.prevMonth();
        }
        const dateYear = parseInt($dayEl.attr('data-year'), 10);
        const dateMonth = parseInt($dayEl.attr('data-month'), 10);
        const dateDay = parseInt($dayEl.attr('data-day'), 10);
        self.emit(
          'local::dayClick calendarDayClick',
          self,
          $dayEl[0],
          dateYear,
          dateMonth,
          dateDay
        );
        if (!$dayEl.hasClass('calendar-day-selected') || self.params.multiple || self.params.rangePicker) {
          self.addValue(new self.DateHandleClass(dateYear, dateMonth, dateDay, 0, 0, 0));
        }
        if (self.params.closeOnSelect) {
          if (
            (self.params.rangePicker && self.value.length === 2)
            || !self.params.rangePicker
          ) {
            self.close();
          }
        }
      }

      function onNextMonthClick() {
        self.nextMonth();
      }

      function onPrevMonthClick() {
        self.prevMonth();
      }

      function onNextYearClick() {
        self.nextYear();
      }

      function onPrevYearClick() {
        self.prevYear();
      }

      const passiveListener = app.touchEvents.start === 'touchstart' && app.support.passiveListener ? { passive: true, capture: false } : false;
      // Selectors clicks
      $el.find('.calendar-prev-month-button').on('click', onPrevMonthClick);
      $el.find('.calendar-next-month-button').on('click', onNextMonthClick);
      $el.find('.calendar-prev-year-button').on('click', onPrevYearClick);
      $el.find('.calendar-next-year-button').on('click', onNextYearClick);
      // Day clicks
      $wrapperEl.on('click', handleDayClick);
      // Touch events
      if (process.env.TARGET !== 'desktop') {
        if (self.params.touchMove) {
          $wrapperEl.on(app.touchEvents.start, handleTouchStart, passiveListener);
          app.on('touchmove:active', handleTouchMove);
          app.on('touchend:passive', handleTouchEnd);
        }
      }

      self.detachColorPickerEvents = function detachColorPickerEvents() {
        $el.find('.calendar-prev-month-button').off('click', onPrevMonthClick);
        $el.find('.calendar-next-month-button').off('click', onNextMonthClick);
        $el.find('.calendar-prev-year-button').off('click', onPrevYearClick);
        $el.find('.calendar-next-year-button').off('click', onNextYearClick);
        $wrapperEl.off('click', handleDayClick);
        if (process.env.TARGET !== 'desktop') {
          if (self.params.touchMove) {
            $wrapperEl.off(app.touchEvents.start, handleTouchStart, passiveListener);
            app.off('touchmove:active', handleTouchMove);
            app.off('touchend:passive', handleTouchEnd);
          }
        }
      };
    };

    self.init();

    return self;
  }

  initInput() {
    const self = this;
    if (!self.$inputEl) return;
    if (self.params.inputReadOnly) self.$inputEl.prop('readOnly', true);
  }

  isPopover() {
    const self = this;
    const { app, modal, params } = self;
    if (params.openIn === 'sheet') return false;
    if (modal && modal.type !== 'popover') return false;

    if (!self.inline && self.inputEl) {
      if (params.openIn === 'popover') return true;
      if (app.device.ios) {
        return !!app.device.ipad;
      }
      if (app.width >= 768) {
        return true;
      }
      if (app.device.desktop && app.theme === 'aurora') {
        return true;
      }
    }
    return false;
  }

  formatValue() {
    const self = this;
    const { value } = self;
    if (self.params.formatValue) {
      return self.params.formatValue.call(self, value);
    }
    return value
      .map(v => self.formatDate(v))
      .join(self.params.rangePicker ? ' - ' : ', ');
  }

  setValue(values) {
    const self = this;
    self.value = values;
    self.updateValue();
  }

  getValue() {
    const self = this;
    return self.value;
  }

  updateValue(onlyHeader) {
    const self = this;
    const {
      $el,
      $wrapperEl,
      $inputEl,
      value,
      params,
    } = self;
    let i;
    if ($el && $el.length > 0) {
      $wrapperEl.find('.calendar-day-selected').removeClass('calendar-day-selected');
      let valueDate;
      if (params.rangePicker && value.length === 2) {
        for (i = new self.DateHandleClass(value[0]).getTime(); i <= new self.DateHandleClass(value[1]).getTime(); i += 24 * 60 * 60 * 1000) {
          valueDate = new self.DateHandleClass(i);
          $wrapperEl.find(`.calendar-day[data-date="${valueDate.getFullYear()}-${valueDate.getMonth()}-${valueDate.getDate()}"]`).addClass('calendar-day-selected');
        }
      } else {
        for (i = 0; i < self.value.length; i += 1) {
          valueDate = new self.DateHandleClass(value[i]);
          $wrapperEl.find(`.calendar-day[data-date="${valueDate.getFullYear()}-${valueDate.getMonth()}-${valueDate.getDate()}"]`).addClass('calendar-day-selected');
        }
      }
    }
    if (!onlyHeader) {
      self.emit('local::change calendarChange', self, value);
    }


    if (($inputEl && $inputEl.length) || params.header) {
      const inputValue = self.formatValue(value);
      if (params.header && $el && $el.length) {
        $el.find('.calendar-selected-date').text(inputValue);
      }
      if ($inputEl && $inputEl.length && !onlyHeader) {
        $inputEl.val(inputValue);
        $inputEl.trigger('change');
      }
    }
  }

  update() {
    const self = this;
    const { currentYear, currentMonth, $wrapperEl } = self;
    const currentDate = new self.DateHandleClass(currentYear, currentMonth);
    const prevMonthHtml = self.renderMonth(currentDate, 'prev');
    const currentMonthHtml = self.renderMonth(currentDate);
    const nextMonthHtml = self.renderMonth(currentDate, 'next');

    $wrapperEl
      .transition(0)
      .html(`${prevMonthHtml}${currentMonthHtml}${nextMonthHtml}`)
      .transform('translate3d(0,0,0)');
    self.$months = $wrapperEl.find('.calendar-month');
    self.monthsTranslate = 0;
    self.setMonthsTranslate();
    self.$months.each((index, monthEl) => {
      self.emit(
        'local::monthAdd calendarMonthAdd',
        monthEl
      );
    });
  }

  renderToolbar() {
    const self = this;
    if (self.params.renderToolbar) {
      return self.params.renderToolbar.call(self, self);
    }
    return `
    <div class="toolbar toolbar-top no-shadow">
      <div class="toolbar-inner">
        ${self.params.monthSelector ? self.renderMonthSelector() : ''}
        ${self.params.yearSelector ? self.renderYearSelector() : ''}
      </div>
    </div>
  `.trim();
  }
  // eslint-disable-next-line
  renderInline() {
    const self = this;
    const { cssClass, toolbar, header, footer, rangePicker, weekHeader } = self.params;
    const { value } = self;
    const date = value && value.length ? value[0] : new self.DateHandleClass().setHours(0, 0, 0);
    const inlineHtml = `
    <div class="calendar calendar-inline ${rangePicker ? 'calendar-range' : ''} ${cssClass || ''}">
      ${header ? self.renderHeader() : ''}
      ${toolbar ? self.renderToolbar() : ''}
      ${weekHeader ? self.renderWeekHeader() : ''}
      <div class="calendar-months">
        ${self.renderMonths(date)}
      </div>
      ${footer ? self.renderFooter() : ''}
    </div>
  `.trim();

    return inlineHtml;
  }

  renderSheet() {
    const self = this;
    const { cssClass, toolbar, header, footer, rangePicker, weekHeader } = self.params;
    const { value } = self;
    const date = value && value.length ? value[0] : new self.DateHandleClass().setHours(0, 0, 0);
    const sheetHtml = `
    <div class="sheet-modal calendar calendar-sheet ${rangePicker ? 'calendar-range' : ''} ${cssClass || ''}">
      ${header ? self.renderHeader() : ''}
      ${toolbar ? self.renderToolbar() : ''}
      ${weekHeader ? self.renderWeekHeader() : ''}
      <div class="sheet-modal-inner calendar-months">
        ${self.renderMonths(date)}
      </div>
      ${footer ? self.renderFooter() : ''}
    </div>
  `.trim();

    return sheetHtml;
  }

  renderPopover() {
    const self = this;
    const { cssClass, toolbar, header, footer, rangePicker, weekHeader } = self.params;
    const { value } = self;
    const date = value && value.length ? value[0] : new self.DateHandleClass().setHours(0, 0, 0);
    const popoverHtml = `
    <div class="popover calendar-popover">
      <div class="popover-inner">
        <div class="calendar ${rangePicker ? 'calendar-range' : ''} ${cssClass || ''}">
        ${header ? self.renderHeader() : ''}
        ${toolbar ? self.renderToolbar() : ''}
        ${weekHeader ? self.renderWeekHeader() : ''}
        <div class="calendar-months">
          ${self.renderMonths(date)}
        </div>
        ${footer ? self.renderFooter() : ''}
        </div>
      </div>
    </div>
  `.trim();

    return popoverHtml;
  }

  render() {
    const self = this;
    const { params } = self;
    if (params.render) return params.render.call(self);
    if (!self.inline) {
      let modalType = params.openIn;
      if (modalType === 'auto') modalType = self.isPopover() ? 'popover' : 'sheet';

      if (modalType === 'popover') return self.renderPopover();
      if (modalType === 'sheet') return self.renderSheet();
      return self.renderCustomModal();
    }
    return self.renderInline();
  }

  onOpen() {
    const self = this;
    const { initialized, $el, app, $inputEl, inline, value, params } = self;
    self.closing = false;
    self.opened = true;
    self.opening = true;

    // Init main events
    self.attachColorPickerEvents();

    const updateValue = !value && params.value;

    // Set value
    if (!initialized) {
      if (value) self.setValue(value, 0);
      else if (params.value) {
        self.setValue(self.normalizeValues(params.value), 0);
      }
    } else if (value) {
      self.setValue(value, 0);
    }

    // Update current month and year
    self.updateCurrentMonthYear();

    // Set initial translate
    self.monthsTranslate = 0;
    self.setMonthsTranslate();

    // Update input value
    if (updateValue) self.updateValue();
    else if (params.header && value) {
      self.updateValue(true);
    }

    // Extra focus
    if (!inline && $inputEl && $inputEl.length && app.theme === 'md') {
      $inputEl.trigger('focus');
    }

    self.initialized = true;

    self.$months.each((index, monthEl) => {
      self.emit('local::monthAdd calendarMonthAdd', monthEl);
    });

    // Trigger events
    if ($el) {
      $el.trigger('calendar:open', self);
    }
    if ($inputEl) {
      $inputEl.trigger('calendar:open', self);
    }
    self.emit('local::open calendarOpen', self);
  }

  onOpened() {
    const self = this;
    self.opening = false;
    if (self.$el) {
      self.$el.trigger('calendar:opened', self);
    }
    if (self.$inputEl) {
      self.$inputEl.trigger('calendar:opened', self);
    }
    self.emit('local::opened calendarOpened', self);
  }

  onClose() {
    const self = this;
    const app = self.app;
    self.opening = false;
    self.closing = true;

    if (self.$inputEl && app.theme === 'md') {
      self.$inputEl.trigger('blur');
    }
    if (self.detachColorPickerEvents) {
      self.detachColorPickerEvents();
    }

    if (self.$el) {
      self.$el.trigger('calendar:close', self);
    }
    if (self.$inputEl) {
      self.$inputEl.trigger('calendar:close', self);
    }
    self.emit('local::close calendarClose', self);
  }

  onClosed() {
    const self = this;
    self.opened = false;
    self.closing = false;

    if (!self.inline) {
      Utils.nextTick(() => {
        if (self.modal && self.modal.el && self.modal.destroy) {
          if (!self.params.routableModals) {
            self.modal.destroy();
          }
        }
        delete self.modal;
      });
    }
    if (self.$el) {
      self.$el.trigger('calendar:closed', self);
    }
    if (self.$inputEl) {
      self.$inputEl.trigger('calendar:closed', self);
    }
    self.emit('local::closed calendarClosed', self);
  }

  open() {
    const self = this;
    const { app, opened, inline, $inputEl, params } = self;
    if (opened) return;

    if (inline) {
      self.$el = $(self.render());
      self.$el[0].f7Calendar = self;
      self.$wrapperEl = self.$el.find('.calendar-months-wrapper');
      self.$months = self.$wrapperEl.find('.calendar-month');
      self.$containerEl.append(self.$el);
      self.onOpen();
      self.onOpened();
      return;
    }
    let modalType = params.openIn;
    if (modalType === 'auto') {
      modalType = self.isPopover() ? 'popover' : 'sheet';
    }
    const modalContent = self.render();

    const modalParams = {
      targetEl: $inputEl,
      scrollToEl: self.params.scrollToInput ? $inputEl : undefined,
      content: modalContent,
      backdrop: self.params.backdrop === true || (modalType === 'popover' && app.params.popover.backdrop !== false && self.params.backdrop !== false),
      closeByBackdropClick: self.params.closeByBackdropClick,
      on: {
        open() {
          const modal = this;
          self.modal = modal;
          self.$el = modalType === 'popover' ? modal.$el.find('.calendar') : modal.$el;
          self.$wrapperEl = self.$el.find('.calendar-months-wrapper');
          self.$months = self.$wrapperEl.find('.calendar-month');
          self.$el[0].f7Calendar = self;
          if (modalType === 'customModal') {
            $(self.$el).find('.calendar-close').once('click', () => {
              self.close();
            });
          }
          self.onOpen();
        },
        opened() { self.onOpened(); },
        close() { self.onClose(); },
        closed() { self.onClosed(); },
      },
    };
    if (self.params.routableModals) {
      self.view.router.navigate({
        url: self.url,
        route: {
          path: self.url,
          [modalType]: modalParams,
        },
      });
    } else {
      self.modal = app[modalType].create(modalParams);
      self.modal.open();
    }
  }

  close() {
    const self = this;
    const { opened, inline } = self;
    if (!opened) return;
    if (inline) {
      self.onClose();
      self.onClosed();
      return;
    }
    if (self.params.routableModals) {
      self.view.router.back();
    } else {
      self.modal.close();
    }
  }

  init() {
    const self = this;

    self.initInput();

    if (self.inline) {
      self.open();
      self.emit('local::init calendarInit', self);
      return;
    }

    if (!self.initialized && self.params.value) {
      self.setValue(self.normalizeValues(self.params.value));
    }

    // Attach input Events
    if (self.$inputEl) {
      self.attachInputEvents();
    }
    if (self.params.closeByOutsideClick) {
      self.attachHtmlEvents();
    }
    self.emit('local::init calendarInit', self);
  }

  destroy() {
    const self = this;
    if (self.destroyed) return;
    const { $el } = self;
    self.emit('local::beforeDestroy calendarBeforeDestroy', self);
    if ($el) $el.trigger('calendar:beforedestroy', self);

    self.close();

    // Detach Events
    if (self.$inputEl) {
      self.detachInputEvents();
    }
    if (self.params.closeByOutsideClick) {
      self.detachHtmlEvents();
    }

    if ($el && $el.length) delete self.$el[0].f7Calendar;
    Utils.deleteProps(self);
    self.destroyed = true;
  }
}

export default ColorPicker;
