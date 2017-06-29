import $ from 'dom7';
import Utils from '../../utils/utils';
import Sheet from './sheet-class';

export default {
  name: 'sheet',
  static: {
    Sheet,
  },
  create() {
    const app = this;
    Utils.extend(app, {
      sheet: {
        create(params) {
          return new Sheet(app, params);
        },
        open(sheetEl, animate) {
          const $sheetEl = $(sheetEl);
          let sheet = $sheetEl[0].f7Modal;
          if (!sheet) sheet = new Sheet(app, { el: $sheetEl });
          return sheet.open(animate);
        },
        close(sheetEl = '.sheet-modal.modal-in', animate) {
          const $sheetEl = $(sheetEl);
          if ($sheetEl.length === 0) return undefined;
          let sheet = $sheetEl[0].f7Modal;
          if (!sheet) sheet = new Sheet(app, { el: $sheetEl });
          return sheet.close(animate);
        },
        get(sheetEl = '.sheet-modal.modal-in') {
          const $sheetEl = $(sheetEl);
          if ($sheetEl.length === 0) return undefined;
          return $sheetEl[0].f7Modal;
        },
      },
    });
  },
  clicks: {
    '.sheet-open': function openPopup($clickedEl, data = {}) {
      const app = this;
      app.sheet.open(data.sheet, data.animate);
    },
    '.sheet-close': function closePopup($clickedEl, data = {}) {
      const app = this;
      app.sheet.close(data.sheet, data.animate);
    },
    '.sheet-backdrop': function closePopup() {
      const app = this;
      if (!app.params.modals.sheetCloseByBackdropClick) return;
      app.sheet.close();
    },
  },
};
