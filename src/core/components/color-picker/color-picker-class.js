import $ from 'dom7';
import Utils from '../../utils/utils';
import Framework7Class from '../../utils/class';

import moduleAlphaSlider from './modules/alpha-slider';
import moduleCurrentColor from './modules/current-color';
import moduleHex from './modules/hex';
import moduleHsbSliders from './modules/hsb-sliders';
import moduleHueSlider from './modules/hue-slider';
import moduleBrightnessSlider from './modules/brightness-slider';
import modulePalette from './modules/palette';
import moduleInitialCurrentColors from './modules/initial-current-colors';
import moduleRgbBars from './modules/rgb-bars';
import moduleRgbSliders from './modules/rgb-sliders';
import moduleSbSpectrum from './modules/sb-spectrum';
import moduleHsSpectrum from './modules/hs-spectrum';
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

    let $targetEl;
    if (self.params.targetEl) {
      $targetEl = $(self.params.targetEl);
    }

    let view;
    if ($inputEl) {
      view = $inputEl.parents('.view').length && $inputEl.parents('.view')[0].f7View;
    }
    if (!view && $targetEl) {
      view = $targetEl.parents('.view').length && $targetEl.parents('.view')[0].f7View;
    }
    if (!view) view = app.views.main;

    Utils.extend(self, {
      app,
      $containerEl,
      containerEl: $containerEl && $containerEl[0],
      inline: $containerEl && $containerEl.length > 0,
      $inputEl,
      inputEl: $inputEl && $inputEl[0],
      $targetEl,
      targetEl: $targetEl && $targetEl[0],
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
        'brightness-slider': moduleBrightnessSlider,
        'palette': modulePalette, // eslint-disable-line
        'initial-current-colors': moduleInitialCurrentColors,
        'rgb-bars': moduleRgbBars,
        'rgb-sliders': moduleRgbSliders,
        'sb-spectrum': moduleSbSpectrum,
        'hs-spectrum': moduleHsSpectrum,
        'wheel': moduleWheel, // eslint-disable-line
      },
    });

    function onInputClick() {
      self.open();
    }
    function onInputFocus(e) {
      e.preventDefault();
    }
    function onTargetClick() {
      self.open();
    }
    function onHtmlClick(e) {
      if (self.params.openIn === 'page') return;
      const $clickTargetEl = $(e.target);
      if (!self.opened || self.closing) return;
      if ($clickTargetEl.closest('[class*="backdrop"]').length) return;
      if ($clickTargetEl.closest('.color-picker-popup, .color-picker-popover').length) return;
      if ($inputEl && $inputEl.length > 0) {
        if ($clickTargetEl[0] !== $inputEl[0] && $clickTargetEl.closest('.sheet-modal').length === 0) {
          self.close();
        }
      } else if ($(e.target).closest('.sheet-modal').length === 0) {
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
      attachTargetEvents() {
        self.$targetEl.on('click', onTargetClick);
      },
      detachTargetEvents() {
        self.$targetEl.off('click', onTargetClick);
      },
      attachHtmlEvents() {
        app.on('click', onHtmlClick);
      },
      detachHtmlEvents() {
        app.off('click', onHtmlClick);
      },
    });

    self.init();

    return self;
  }

  attachEvents() {
    const self = this;
    self.centerModules = self.centerModules.bind(self);
    if (self.params.centerModules) {
      self.app.on('resize', self.centerModules);
    }
  }

  detachEvents() {
    const self = this;
    if (self.params.centerModules) {
      self.app.off('resize', self.centerModules);
    }
  }

  centerModules() {
    const self = this;
    if (!self.opened || !self.$el || self.inline) return;
    const $pageContentEl = self.$el.find('.page-content');
    if (!$pageContentEl.length) return;
    const { scrollHeight, offsetHeight } = $pageContentEl[0];
    if (scrollHeight <= offsetHeight) {
      $pageContentEl.addClass('justify-content-center');
    } else {
      $pageContentEl.removeClass('justify-content-center');
    }
  }

  initInput() {
    const self = this;
    if (!self.$inputEl) return;
    if (self.params.inputReadOnly) self.$inputEl.prop('readOnly', true);
  }

  getModalType() {
    const self = this;
    const { app, modal, params } = self;
    const { openIn, openInPhone } = params;
    if (modal && modal.type) return modal.type;
    if (openIn !== 'auto') return openIn;
    if (self.inline) return null;
    if (app.device.ios) {
      return app.device.ipad ? 'popover' : openInPhone;
    }
    if (app.width >= 768 || (app.device.desktop && app.theme === 'aurora')) {
      return 'popover';
    }

    return openInPhone;
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

  setValue(value = {}, updateModules = true) {
    const self = this;
    if (typeof value === 'undefined') return;

    let {
      hex,
      rgb,
      hsl,
      hsb,
      alpha = 1,
      hue,
      rgba,
      hsla,
    } = (self.value || {});

    const needChangeEvent = self.value || (!self.value && !self.params.value);
    let valueChanged;
    Object.keys(value).forEach((k) => {
      if (!self.value || typeof self.value[k] === 'undefined') {
        valueChanged = true;
        return;
      }
      const v = value[k];
      if (Array.isArray(v)) {
        v.forEach((subV, subIndex) => {
          if (subV !== self.value[k][subIndex]) {
            valueChanged = true;
          }
        });
      } else if (v !== self.value[k]) {
        valueChanged = true;
      }
    });
    if (!valueChanged) return;

    if (value.rgb || value.rgba) {
      const [r, g, b, a = alpha] = (value.rgb || value.rgba);
      rgb = [r, g, b];
      hex = Utils.colorRgbToHex(...rgb);
      hsl = Utils.colorRgbToHsl(...rgb);
      hsb = Utils.colorHslToHsb(...hsl);
      hsl = self.normalizeHsValues(hsl);
      hsb = self.normalizeHsValues(hsb);
      hue = hsb[0];
      alpha = a;
      rgba = [rgb[0], rgb[1], rgb[2], a];
      hsla = [hsl[0], hsl[1], hsl[2], a];
    }

    if (value.hsl || value.hsla) {
      const [h, s, l, a = alpha] = (value.hsl || value.hsla);
      hsl = [h, s, l];
      rgb = Utils.colorHslToRgb(...hsl);
      hex = Utils.colorRgbToHex(...rgb);
      hsb = Utils.colorHslToHsb(...hsl);
      hsl = self.normalizeHsValues(hsl);
      hsb = self.normalizeHsValues(hsb);
      hue = hsb[0];
      alpha = a;
      rgba = [rgb[0], rgb[1], rgb[2], a];
      hsla = [hsl[0], hsl[1], hsl[2], a];
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
      rgba = [rgb[0], rgb[1], rgb[2], a];
      hsla = [hsl[0], hsl[1], hsl[2], a];
    }

    if (value.hex) {
      rgb = Utils.colorHexToRgb(value.hex);
      hex = Utils.colorRgbToHex(...rgb);
      hsl = Utils.colorRgbToHsl(...rgb);
      hsb = Utils.colorHslToHsb(...hsl);
      hsl = self.normalizeHsValues(hsl);
      hsb = self.normalizeHsValues(hsb);
      hue = hsb[0];
      rgba = [rgb[0], rgb[1], rgb[2], alpha];
      hsla = [hsl[0], hsl[1], hsl[2], alpha];
    }

    if (typeof value.alpha !== 'undefined') {
      alpha = value.alpha;
      if (typeof rgb !== 'undefined') {
        rgba = [rgb[0], rgb[1], rgb[2], alpha];
      }
      if (typeof hsl !== 'undefined') {
        hsla = [hsl[0], hsl[1], hsl[2], alpha];
      }
    }

    if (typeof value.hue !== 'undefined') {
      const [h, s, l] = hsl; // eslint-disable-line
      hsl = [value.hue, s, l];
      hsb = Utils.colorHslToHsb(...hsl);
      rgb = Utils.colorHslToRgb(...hsl);
      hex = Utils.colorRgbToHex(...rgb);
      hsl = self.normalizeHsValues(hsl);
      hsb = self.normalizeHsValues(hsb);
      hue = hsb[0];
      rgba = [rgb[0], rgb[1], rgb[2], alpha];
      hsla = [hsl[0], hsl[1], hsl[2], alpha];
    }
    self.value = {
      hex,
      alpha,
      hue,
      rgb,
      hsl,
      hsb,
      rgba,
      hsla,
    };
    if (!self.initialValue) self.initialValue = Utils.extend({}, self.value);
    self.updateValue(needChangeEvent);
    if (self.opened && updateModules) {
      self.updateModules();
    }
  }

  getValue() {
    const self = this;
    return self.value;
  }

  updateValue(fireEvents = true) {
    const self = this;
    const { $inputEl, value, $targetEl } = self;
    if ($targetEl && self.params.targetElSetBackgroundColor) {
      const { rgba } = value;
      $targetEl.css('background-color', `rgba(${rgba.join(', ')})`);
    }
    if (fireEvents) {
      self.emit('local::change colorPickerChange', self, value);
    }

    if ($inputEl && $inputEl.length) {
      const inputValue = self.formatValue(value);
      if ($inputEl && $inputEl.length) {
        $inputEl.val(inputValue);
        if (fireEvents) {
          $inputEl.trigger('change');
        }
      }
    }
  }

  updateModules() {
    const self = this;
    const { modules } = self;
    self.params.modules.forEach((m) => {
      if (typeof m === 'string' && modules[m] && modules[m].update) {
        modules[m].update(self);
      } else if (m && m.update) {
        m.update(self);
      }
    });
  }

  update() {
    const self = this;
    self.updateModules();
  }

  renderPicker() {
    const self = this;
    const { params, modules } = self;
    let html = '';

    params.modules.forEach((m) => {
      if (typeof m === 'string' && modules[m] && modules[m].render) {
        html += modules[m].render(self);
      } else if (m && m.render) {
        html += m.render(self);
      }
    });

    return html;
  }

  renderNavbar() {
    const self = this;
    if (self.params.renderNavbar) {
      return self.params.renderNavbar.call(self, self);
    }
    const { openIn, navbarTitleText, navbarBackLinkText, navbarCloseText } = self.params;
    return `
    <div class="navbar">
      <div class="navbar-inner sliding">
        ${openIn === 'page' ? `
        <div class="left">
          <a class="link back">
            <i class="icon icon-back"></i>
            <span class="if-not-md">${navbarBackLinkText}</span>
          </a>
        </div>
        ` : ''}
        <div class="title">${navbarTitleText}</div>
        ${openIn !== 'page' ? `
        <div class="right">
          <a class="link popup-close" data-popup=".color-picker-popup">${navbarCloseText}</a>
        </div>
        ` : ''}
      </div>
    </div>
  `.trim();
  }

  renderToolbar() {
    const self = this;
    if (self.params.renderToolbar) {
      return self.params.renderToolbar.call(self, self);
    }
    return `
    <div class="toolbar toolbar-top no-shadow">
      <div class="toolbar-inner">
        <div class="left"></div>
        <div class="right">
          <a class="link sheet-close popover-close" data-sheet=".color-picker-sheet-modal" data-popover=".color-picker-popover">${self.params.toolbarCloseText}</a>
        </div>
      </div>
    </div>
  `.trim();
  }

  renderInline() {
    const self = this;
    const { cssClass, groupedModules } = self.params;
    const inlineHtml = `
    <div class="color-picker color-picker-inline ${groupedModules ? 'color-picker-grouped-modules' : ''} ${cssClass || ''}">
      ${self.renderPicker()}
    </div>
  `.trim();

    return inlineHtml;
  }

  renderSheet() {
    const self = this;
    const { cssClass, toolbarSheet, groupedModules } = self.params;
    const sheetHtml = `
    <div class="sheet-modal color-picker color-picker-sheet-modal ${groupedModules ? 'color-picker-grouped-modules' : ''} ${cssClass || ''}">
      ${toolbarSheet ? self.renderToolbar() : ''}
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
    const { cssClass, toolbarPopover, groupedModules } = self.params;
    const popoverHtml = `
    <div class="popover color-picker-popover ${cssClass || ''}">
      <div class="popover-inner">
        <div class="color-picker ${groupedModules ? 'color-picker-grouped-modules' : ''}">
          ${toolbarPopover ? self.renderToolbar() : ''}
          <div class="page-content">
            ${self.renderPicker()}
          </div>
        </div>
      </div>
    </div>
  `.trim();

    return popoverHtml;
  }

  renderPopup() {
    const self = this;
    const { cssClass, navbarPopup, groupedModules } = self.params;
    const popupHtml = `
    <div class="popup color-picker-popup ${cssClass || ''}">
      <div class="page">
        ${navbarPopup ? self.renderNavbar() : ''}
        <div class="color-picker ${groupedModules ? 'color-picker-grouped-modules' : ''}">
          <div class="page-content">
            ${self.renderPicker()}
          </div>
        </div>
      </div>
    </div>
  `.trim();

    return popupHtml;
  }

  renderPage() {
    const self = this;
    const { cssClass, groupedModules } = self.params;
    const pageHtml = `
    <div class="page color-picker-page ${cssClass || ''}" data-name="color-picker-page">
      ${self.renderNavbar()}
      <div class="color-picker ${groupedModules ? 'color-picker-grouped-modules' : ''}">
        <div class="page-content">
          ${self.renderPicker()}
        </div>
      </div>
    </div>
  `.trim();
    return pageHtml;
  }

  // eslint-disable-next-line
  render() {
    const self = this;
    const { params } = self;
    if (params.render) return params.render.call(self);
    if (self.inline) return self.renderInline();
    if (params.openIn === 'page') {
      return self.renderPage();
    }

    const modalType = self.getModalType();
    if (modalType === 'popover') return self.renderPopover();
    if (modalType === 'sheet') return self.renderSheet();
    if (modalType === 'popup') return self.renderPopup();
  }

  onOpen() {
    const self = this;
    const { initialized, $el, app, $inputEl, inline, value, params, modules } = self;
    self.closing = false;
    self.opened = true;
    self.opening = true;

    // Init main events
    self.attachEvents();

    params.modules.forEach((m) => {
      if (typeof m === 'string' && modules[m] && modules[m].init) {
        modules[m].init(self);
      } else if (m && m.init) {
        m.init(self);
      }
    });

    const updateValue = !value && params.value;

    // Set value
    if (!initialized) {
      if (value) self.setValue(value);
      else if (params.value) {
        self.setValue(params.value, false);
      } else if (!params.value) {
        self.setValue({ hex: '#ff0000' }, false);
      }
    } else if (value) {
      self.initialValue = Utils.extend({}, value);
      self.setValue(value, false);
    }

    // Update input value
    if (updateValue) self.updateValue();
    self.updateModules();

    // Center modules
    if (params.centerModules) {
      self.centerModules();
    }

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
    const { app, params, modules } = self;
    self.opening = false;
    self.closing = true;

    // Detach events
    self.detachEvents();

    if (self.$inputEl && app.theme === 'md') {
      self.$inputEl.trigger('blur');
    }
    params.modules.forEach((m) => {
      if (typeof m === 'string' && modules[m] && modules[m].update) {
        modules[m].destroy(self);
      } else if (m && m.destroy) {
        m.destroy(self);
      }
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
    const { app, opened, inline, $inputEl, $targetEl, params } = self;
    if (opened) return;

    if (inline) {
      self.$el = $(self.render());
      self.$el[0].f7ColorPicker = self;
      self.$containerEl.append(self.$el);
      self.onOpen();
      self.onOpened();
      return;
    }

    const colorPickerContent = self.render();

    if (params.openIn === 'page') {
      self.view.router.navigate({
        url: self.url,
        route: {
          content: colorPickerContent,
          path: self.url,
          on: {
            pageBeforeIn(e, page) {
              self.$el = page.$el.find('.color-picker');
              self.$el[0].f7ColorPicker = self;
              self.onOpen();
            },
            pageAfterIn() {
              self.onOpened();
            },
            pageBeforeOut() {
              self.onClose();
            },
            pageAfterOut() {
              self.onClosed();
              if (self.$el && self.$el[0]) {
                self.$el[0].f7ColorPicker = null;
                delete self.$el[0].f7ColorPicker;
              }
            },
          },
        },
      });
    } else {
      const modalType = self.getModalType();
      let backdrop = params.backdrop;
      if (backdrop === null || typeof backdrop === 'undefined') {
        if (modalType === 'popover' && app.params.popover.backdrop !== false) backdrop = true;
        if (modalType === 'popup') backdrop = true;
      }
      const modalParams = {
        targetEl: ($targetEl || $inputEl),
        scrollToEl: params.scrollToInput ? ($targetEl || $inputEl) : undefined,
        content: colorPickerContent,
        backdrop,
        closeByBackdropClick: params.closeByBackdropClick,
        on: {
          open() {
            const modal = this;
            self.modal = modal;
            self.$el = modalType === 'popover' || modalType === 'popup' ? modal.$el.find('.color-picker') : modal.$el;
            self.$el[0].f7ColorPicker = self;
            self.onOpen();
          },
          opened() { self.onOpened(); },
          close() { self.onClose(); },
          closed() {
            self.onClosed();
            if (self.$el && self.$el[0]) {
              self.$el[0].f7ColorPicker = null;
              delete self.$el[0].f7ColorPicker;
            }
          },
        },
      };
      if (params.routableModals) {
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
    if (self.$targetEl) {
      self.attachTargetEvents();
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
    self.detachEvents();
    if (self.$inputEl) {
      self.detachInputEvents();
    }
    if (self.$targetEl) {
      self.detachTargetEvents();
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
