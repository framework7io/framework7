import $ from 'dom7';
import Utils from '../../utils/utils';
import Sheet from './sheet-class';
import ModalMethods from '../../utils/modal-methods';

export default {
  name: 'sheet',
  params: {
    sheet: {
      closeByBackdropClick: true,
      closeByOutsideClick: false,
    },
  },
  static: {
    Sheet,
  },
  create() {
    const app = this;
    if (!app.passedParams.sheet || app.passedParams.sheet.backdrop === undefined) {
      app.params.sheet.backdrop = app.theme !== 'ios';
    }
    app.sheet = Utils.extend(
      {},
      ModalMethods({
        app,
        constructor: Sheet,
        defaultSelector: '.sheet-modal.modal-in',
      })
    );
  },
  clicks: {
    '.sheet-open': function openSheet($clickedEl, data = {}) {
      const app = this;
      if ($('.sheet-modal.modal-in').length > 0 && data.sheet && $(data.sheet)[0] !== $('.sheet-modal.modal-in')[0]) {
        app.sheet.close('.sheet-modal.modal-in');
      }
      app.sheet.open(data.sheet, data.animate);
    },
    '.sheet-close': function closeSheet($clickedEl, data = {}) {
      const app = this;
      app.sheet.close(data.sheet, data.animate);
    },
  },
};
