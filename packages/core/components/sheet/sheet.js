import $ from 'dom7';
import Utils from '../../utils/utils';
import Sheet from './sheet-class';
import ModalMethods from '../../utils/modal-methods';

export default {
  name: 'sheet',
  params: {
    sheet: {
      push: false,
      backdrop: undefined,
      backdropEl: undefined,
      closeByBackdropClick: true,
      closeByOutsideClick: false,
      closeOnEscape: false,
      swipeToClose: false,
      swipeToStep: false,
      swipeHandler: null,
    },
  },
  static: {
    Sheet,
  },
  create() {
    const app = this;
    app.sheet = Utils.extend(
      {},
      ModalMethods({
        app,
        constructor: Sheet,
        defaultSelector: '.sheet-modal.modal-in',
      }),
      {
        stepOpen(sheet) {
          const sheetInstance = app.sheet.get(sheet);
          if (sheetInstance && sheetInstance.stepOpen) return sheetInstance.stepOpen();
          return undefined;
        },
        stepClose(sheet) {
          const sheetInstance = app.sheet.get(sheet);
          if (sheetInstance && sheetInstance.stepClose) return sheetInstance.stepClose();
          return undefined;
        },
        stepToggle(sheet) {
          const sheetInstance = app.sheet.get(sheet);
          if (sheetInstance && sheetInstance.stepToggle) return sheetInstance.stepToggle();
          return undefined;
        },
      },
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
