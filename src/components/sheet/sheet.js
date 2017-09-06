import Utils from '../../utils/utils';
import Sheet from './sheet-class';
import ModalMethods from '../../utils/modal-methods';

export default {
  name: 'sheet',
  static: {
    Sheet,
  },
  create() {
    const app = this;
    app.sheet = Utils.extend({},
      ModalMethods({
        app,
        constructor: Sheet,
        defaultSelector: '.sheet.modal-in',
      })
    );
  },
  clicks: {
    '.sheet-open': function openSheet($clickedEl, data = {}) {
      const app = this;
      app.sheet.open(data.sheet, data.animate);
    },
    '.sheet-close': function closeSheet($clickedEl, data = {}) {
      const app = this;
      app.sheet.close(data.sheet, data.animate);
    },
    '.sheet-backdrop': function closeSheet() {
      const app = this;
      if (!app.params.modals.sheetCloseByBackdropClick) return;
      app.sheet.close();
    },
  },
};
