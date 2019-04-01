import $ from 'dom7';
import Utils from '../../utils/utils';
import Framework7Class from '../../utils/class';

import moduleAlphaSlider from './modules/alpha-slider';
import moduleCurrentColor from './modules/current-color';
import moduleHex from './modules/hex';
import moduleHsbSliders from './modules/hsb-sliders';
import moduleHueSlider from './modules/hue-slider';
import modulePalette from './modules/palette';
import modulePrevCurrentColors from './modules/prev-current-colors';
import moduleRgbBars from './modules/rgb-bars';
import moduleRgbSliders from './modules/rgb-sliders';
import moduleSbSpectrum from './modules/sb-spectrum';
import moduleWheel from './modules/wheel';

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
      view,
      modules: {
        'alpha-slider': moduleAlphaSlider,
        'current-color': moduleCurrentColor,
        'hex': moduleHex, // eslint-disable-line
        'hsb-sliders': moduleHsbSliders,
        'hue-slider': moduleHueSlider,
        'palette': modulePalette, // eslint-disable-line
        'prev-current-colors': modulePrevCurrentColors,
        'rgb-bars': moduleRgbBars,
        'rgb-sliders': moduleRgbSliders,
        'sb-spectrum': moduleSbSpectrum,
        'wheel': moduleWheel, // eslint-disable-line
      },
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


      // function handleDayClick(e) {
      //   if (!allowItemClick) return;
      //   let $dayEl = $(e.target).parents('.calendar-day');
      //   if ($dayEl.length === 0 && $(e.target).hasClass('calendar-day')) {
      //     $dayEl = $(e.target);
      //   }
      //   if ($dayEl.length === 0) return;
      //   if ($dayEl.hasClass('calendar-day-disabled')) return;
      //   if (!self.params.rangePicker) {
      //     if ($dayEl.hasClass('calendar-day-next')) self.nextMonth();
      //     if ($dayEl.hasClass('calendar-day-prev')) self.prevMonth();
      //   }
      //   const dateYear = parseInt($dayEl.attr('data-year'), 10);
      //   const dateMonth = parseInt($dayEl.attr('data-month'), 10);
      //   const dateDay = parseInt($dayEl.attr('data-day'), 10);
      //   self.emit(
      //     'local::dayClick colorPickerDayClick',
      //     self,
      //     $dayEl[0],
      //     dateYear,
      //     dateMonth,
      //     dateDay
      //   );
      //   if (!$dayEl.hasClass('calendar-day-selected') || self.params.multiple || self.params.rangePicker) {
      //     self.addValue(new self.DateHandleClass(dateYear, dateMonth, dateDay, 0, 0, 0));
      //   }
      //   if (self.params.closeOnSelect) {
      //     if (
      //       (self.params.rangePicker && self.value.length === 2)
      //       || !self.params.rangePicker
      //     ) {
      //       self.close();
      //     }
      //   }
      // }



      // const passiveListener = app.touchEvents.start === 'touchstart' && app.support.passiveListener ? { passive: true, capture: false } : false;
      // // Selectors clicks

      // // Touch events
      // if (process.env.TARGET !== 'desktop') {
      //   self.$el.on(app.touchEvents.start, handleTouchStart, passiveListener);
      //   app.on('touchmove:active', handleTouchMove);
      //   app.on('touchend:passive', handleTouchEnd);
      // }

      // self.detachColorPickerEvents = function detachColorPickerEvents() {
      //   self.$el.off(app.touchEvents.start, handleTouchStart, passiveListener);
      //   app.off('touchmove:active', handleTouchMove);
      //   app.off('touchend:passive', handleTouchEnd);
      // };
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
    return value.hex;
  }

  // eslint-disable-next-line
  normalizeHsValues(arr) {
    return [
      Math.floor(arr[0] * 10) / 10,
      Math.floor(arr[1] * 1000) / 1000,
      Math.floor(arr[2] * 1000) / 1000,
    ];
  }

  setValue(value) {
    const self = this;
    console.log('set value start', value);
    if (typeof value === 'undefined') return;

    let {
      hex,
      rgb,
      hsl,
      hsb,
      alpha = 1,
      hue,
    } = (self.value || {});


    if (value.rgb) {
      const [r, g, b, a = alpha] = value.rgb;
      rgb = [r, g, b];
      hex = Utils.colorRgbToHex(...rgb);
      hsl = Utils.colorRgbToHsl(...rgb);
      hsb = Utils.colorHslToHsb(...hsl);
      hsl = self.normalizeHsValues(hsl);
      hsb = self.normalizeHsValues(hsb);
      hue = hsb[0];
      alpha = a;
    }

    if (value.hsl) {
      const [h, s, l, a = alpha] = value.hsl;
      hsl = [h, s, l];
      rgb = Utils.colorHslToRgb(...hsl);
      hex = Utils.colorRgbToHex(...rgb);
      hsb = Utils.colorHslToHsb(...hsl);
      hsl = self.normalizeHsValues(hsl);
      hsb = self.normalizeHsValues(hsb);
      hue = hsb[0];
      alpha = a;
    }

    if (value.hsb) {
      const [h, s, b, a = alpha] = value.hsb;
      hsb = [h, s, b];
      hsl = Utils.colorHsbToHsl(...hsb);
      rgb = Utils.colorHslToRgb(...hsl);
      hex = Utils.colorRgbToHex(...rgb);
      hsl = self.normalizeHsValues(hsl);
      hsb = self.normalizeHsValues(hsb);
      hue = hsb[0];
      alpha = a;
    }

    if (value.hex) {
      rgb = Utils.colorHexToRgb(value.hex);
      hex = Utils.colorRgbToHex(...rgb);
      hsl = Utils.colorRgbToHsl(...rgb);
      hsb = Utils.colorHslToHsb(...hsl);
      hsl = self.normalizeHsValues(hsl);
      hsb = self.normalizeHsValues(hsb);
      hue = hsb[0];
    }

    if (typeof value.alpha !== 'undefined') {
      if (alpha === value.alpha) return;
      alpha = value.alpha;
    }

    if (typeof value.hue !== 'undefined') {
      const [h, s, l] = self.value.hsl;
      if (h === value.hue) return;
      hsl = [value.hue, s, l];
      hsb = Utils.colorHslToHsb(...hsl);
      rgb = Utils.colorHslToRgb(...hsl);
      hex = Utils.colorRgbToHex(...rgb);
      hsl = self.normalizeHsValues(hsl);
      hsb = self.normalizeHsValues(hsb);
      hue = hsb[0];
    }

    self.value = {
      hex,
      alpha,
      hue,
      rgb,
      hsl,
      hsb,
    };
    self.updateValue();
    self.updateModules();
  }

  getValue() {
    const self = this;
    return self.value;
  }

  updateValue() {
    const self = this;
  }

  updateModules() {
    const self = this;
    self.params.modules.forEach((m) => {
      if (self.modules[m] && self.modules[m].update) {
        self.modules[m].update(self);
      }
    });
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
        'local::monthAdd colorPickerMonthAdd',
        monthEl
      );
    });
  }

  renderPicker() {
    const self = this;
    const { params, modules } = self;
    let html = '';

    params.modules.forEach((m) => {
      if (modules[m] && modules[m].render) html += modules[m].render(self);
    });

    return html;
  }

  renderToolbar() {
    const self = this;
    if (self.params.renderToolbar) {
      return self.params.renderToolbar.call(self, self);
    }
    return `
    <div class="toolbar toolbar-top no-shadow">
      <div class="toolbar-inner">
      </div>
    </div>
  `.trim();
  }
  // eslint-disable-next-line
  renderInline() {
    const self = this;
    const { cssClass, toolbar, type } = self.params;
    const inlineHtml = `
    <div class="color-picker color-picker-inline color-picker-type-${type} ${cssClass || ''}">
      ${toolbar ? self.renderToolbar() : ''}
      <div class="calendar-months">
        ${self.renderPicker()}
      </div>
    </div>
  `.trim();

    return inlineHtml;
  }

  renderSheet() {
    const self = this;
    const { cssClass, toolbar, type } = self.params;
    const sheetHtml = `
    <div class="sheet-modal color-picker color-picker-sheet color-picker-type-${type} ${cssClass || ''}">
      ${toolbar ? self.renderToolbar() : ''}
      <div class="sheet-modal-inner">
        <div class="page-content">
          ${self.renderPicker()}
        </div>
      </div>
    </div>
  `.trim();

    return sheetHtml;
  }

  renderPopover() {
    const self = this;
    const { cssClass, toolbar, type } = self.params;
    const popoverHtml = `
    <div class="popover color-picker-popover">
      <div class="popover-inner">
        <div class="color-picker color-picker-type-${type} ${cssClass || ''}">
        ${toolbar ? self.renderToolbar() : ''}
        <div class="calendar-months">
          ${self.renderPicker()}
        </div>
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
      if (modalType === 'popup') return self.renderPopup();
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

    params.modules.forEach((m) => {
      if (self.modules[m] && self.modules[m].init) {
        self.modules[m].init(self);
      }
    });

    const updateValue = !value && params.value;

    // Set value
    if (!initialized) {
      if (value) self.setValue(value);
      else if (params.value) {
        self.setValue(params.value);
      } else if (!params.value) {
        self.setValue({ hex: '#ff0000' });
      }
    } else if (value) {
      self.setValue();
    }

    // Update input value
    if (updateValue) self.updateValue();
    self.updateModules();

    // Extra focus
    if (!inline && $inputEl && $inputEl.length && app.theme === 'md') {
      $inputEl.trigger('focus');
    }

    self.initialized = true;

    // Trigger events
    if ($el) {
      $el.trigger('colorpicker:open', self);
    }
    if ($inputEl) {
      $inputEl.trigger('colorpicker:open', self);
    }
    self.emit('local::open colorPickerOpen', self);
  }

  onOpened() {
    const self = this;
    self.opening = false;
    if (self.$el) {
      self.$el.trigger('colorpicker:opened', self);
    }
    if (self.$inputEl) {
      self.$inputEl.trigger('colorpicker:opened', self);
    }
    self.emit('local::opened colorPickerOpened', self);
  }

  onClose() {
    const self = this;
    const { app, params } = self;
    self.opening = false;
    self.closing = true;

    if (self.$inputEl && app.theme === 'md') {
      self.$inputEl.trigger('blur');
    }
    if (self.detachColorPickerEvents) {
      self.detachColorPickerEvents();
    }
    params.modules.forEach((m) => {
      if (self.modules[m] && self.modules[m].destroy) self.modules[m].destroy(self);
    });

    if (self.$el) {
      self.$el.trigger('colorpicker:close', self);
    }
    if (self.$inputEl) {
      self.$inputEl.trigger('colorpicker:close', self);
    }
    self.emit('local::close colorPickerClose', self);
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
      self.$el.trigger('colorpicker:closed', self);
    }
    if (self.$inputEl) {
      self.$inputEl.trigger('colorpicker:closed', self);
    }
    self.emit('local::closed colorPickerClosed', self);
  }

  open() {
    const self = this;
    const { app, opened, inline, $inputEl, params } = self;
    if (opened) return;

    if (inline) {
      self.$el = $(self.render());
      self.$el[0].f7ColorPicker = self;
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
          self.$el = modalType === 'popover' || modalType === 'popup' ? modal.$el.find('.color-picker') : modal.$el;
          // self.$wrapperEl = self.$el.find('.calendar-months-wrapper');
          // self.$months = self.$wrapperEl.find('.calendar-month');
          self.$el[0].f7ColorPicker = self;
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
      self.emit('local::init colorPickerInit', self);
      return;
    }

    if (!self.initialized && self.params.value) {
      self.setValue(self.params.value);
    }

    // Attach input Events
    if (self.$inputEl) {
      self.attachInputEvents();
    }
    if (self.params.closeByOutsideClick) {
      self.attachHtmlEvents();
    }
    self.emit('local::init colorPickerInit', self);
  }

  destroy() {
    const self = this;
    if (self.destroyed) return;
    const { $el } = self;
    self.emit('local::beforeDestroy colorPickerBeforeDestroy', self);
    if ($el) $el.trigger('colorpicker:beforedestroy', self);

    self.close();

    // Detach Events
    if (self.$inputEl) {
      self.detachInputEvents();
    }
    if (self.params.closeByOutsideClick) {
      self.detachHtmlEvents();
    }

    if ($el && $el.length) delete self.$el[0].f7ColorPicker;
    Utils.deleteProps(self);
    self.destroyed = true;
  }
}

export default ColorPicker;
