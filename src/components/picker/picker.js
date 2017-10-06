import ConstructorMethods from '../../utils/constructor-methods';
import Picker from './picker-class';

export default {
  name: 'picker',
  static: {
    Picker,
  },
  create() {
    const app = this;
    app.picker = ConstructorMethods({
      defaultSelector: '.picker',
      constructor: Picker,
      app,
      domProp: 'f7Picker',
    });
    app.picker.close = function close(el = '.picker') {
      const $el = $(el);
      if ($el.length === 0) return;
      const picker = $el[0].f7Picker;
      if (!picker || (picker && !picker.opened)) return;
      picker.close();
    };
  },
  params: {
    picker: {
      // Picker settings
      updateValuesOnMomentum: false,
      updateValuesOnTouchmove: true,
      rotateEffect: false,
      momentumRatio: 7,
      freeMode: false,
      containerEl: null,
      formatValue: null,
      cols: [],
      // Common opener settings
      inputEl: null,
      inputReadOnly: true,
      closeByOutsideClick: true,
      scrollToInput: true,
      convertToPopover: true,
      onlyInPopover: false,
      toolbar: true,
      toolbarCloseText: 'Done',
      cssClass: null,
      routableModals: true,
      view: null,
      url: 'select',
      // Render functions
      renderColumn: null,
      renderToolbar: null,
      renderInline: null,
      renderPopover: null,
      renderSheet: null,
      render: null,
    },
  },
  instance: {
    picker(params) {
      return new Picker(this, params);
    },
  },
};
