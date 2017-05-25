import Utils from '../../utils/utils';
import Dialog from './dialog-class';

export default {
  name: 'dialog',
  create() {
    const app = this;
    Utils.extend(app, {
      dialog: {
        create(params) {
          return new Dialog(app, params);
        },
        open() {},
        close() {},

        // Shortcuts
        alert(text, title, callbackOk) {
          return new Dialog(app, {
            text: text || '',
            title: typeof title === 'undefined' ? app.params.modals.dialogTitle : title,
            buttons: [{
              text: app.params.modals.dialogButtonOk,
              bold: true,
              onClick: callbackOk,
            }],
          }).open();
        },
        prompt() {},
        confirm() {},
        login() {},
        password() {},
        preloader() {},
        indicator() {},
        progress() {},
      },
    });
  },
  static: {
    Dialog,
  },
};
