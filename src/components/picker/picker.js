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
      cols: [],
      // Common opener settings
      inputEl: null,
      inputReadOnly: true,
      formatValue: null,
      closeByOutsideClick: true,
      scrollToInput: true,
      convertToPopover: true,
      onlyInPopover: false,
      toolbar: true,
      toolbarCloseText: 'Done',
      renderColumn: null,
      renderToolbar: null,
      renderInline: null,
      renderPopover: null,
      renderSheet: null,
      render: null,
      cssClass: null,
    },
  },
  instance: {
    picker(params) {
      return new Picker(this, params);
    },
  },
};
