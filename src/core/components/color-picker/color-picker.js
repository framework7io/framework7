import $ from 'dom7';
import ConstructorMethods from '../../utils/constructor-methods';
import ColorPicker from './color-picker-class';

export default {
  name: 'colorPicker',
  static: {
    ColorPicker,
  },
  create() {
    const app = this;
    app.colorPicker = ConstructorMethods({
      defaultSelector: '.color-picker',
      constructor: ColorPicker,
      app,
      domProp: 'f7ColorPicker',
    });
    app.colorPicker.close = function close(el = '.color-picker') {
      const $el = $(el);
      if ($el.length === 0) return;
      const colorPicker = $el[0].f7ColorPicker;
      if (!colorPicker || (colorPicker && !colorPicker.opened)) return;
      colorPicker.close();
    };
  },
  params: {
    colorPicker: {
      // Color picker settings
      closeOnSelect: false,
      value: null, // hex string or rgba array
      modules: [
        'prev-current-colors',
        'current-color',
        'wheel',
        'hsb-sliders',
        'rgb-sliders',
        'alpha-slider',
        'hex',
        'rgb-bars',
        'palette',
      ],
      palette: [
        '#f00',
        '#0f0',
        '#00f',
      ],
      // Common opener settings
      containerEl: null,
      openIn: 'auto', // or 'popover' or 'sheet' or 'popup'
      formatValue: null,
      inputEl: null,
      inputReadOnly: true,
      closeByOutsideClick: true,
      scrollToInput: true,
      toolbar: true,
      toolbarCloseText: 'Done',
      cssClass: null,
      routableModals: true,
      view: null,
      url: 'color/',
      backdrop: null,
      closeByBackdropClick: true,
      // Render functions
      renderToolbar: null,
      renderInline: null,
      renderPopover: null,
      renderSheet: null,
      renderPopup: null,
      render: null,
    },
  },
};
