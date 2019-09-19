import $ from 'dom7';
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
      updateValuesOnMousewheel: true,
      mousewheel: true,
      rotateEffect: false,
      momentumRatio: 7,
      freeMode: false,
      cols: [],
      // Common opener settings
      containerEl: null,
      openIn: 'auto', // or 'popover' or 'sheet'
      sheetPush: false,
      sheetSwipeToClose: undefined,
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
      url: 'select/',
      // Render functions
      renderToolbar: null,
      render: null,
    },
  },
};
