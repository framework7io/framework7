import $ from 'dom7';
import Utils from '../../utils/utils';
import Dialog from './dialog-class';

export default {
  name: 'dialog',
  static: {
    Dialog,
  },
  create() {
    const app = this;
    Utils.extend(app, {
      dialog: {
        create(params) {
          return new Dialog(app, params);
        },
        open(dialogEl, animate) {
          return new Dialog(app, {
            el: $(dialogEl),
          }).open(animate);
        },
        close(dialogEl = '.dialog.modal-in', animate) {
          return new Dialog(app, {
            el: $(dialogEl),
          }).close(animate);
        },

        // Shortcuts
        alert(...args) {
          let [text, title, callbackOk] = args;
          if (args.length === 2 && typeof args[1] === 'function') {
            [text, callbackOk, title] = args;
          }
          return new Dialog(app, {
            title: typeof title === 'undefined' ? app.params.modals.dialogTitle : title,
            text,
            buttons: [{
              text: app.params.modals.dialogButtonOk,
              bold: true,
              onClick: callbackOk,
            }],
          }).open();
        },
        prompt(...args) {
          let [text, title, callbackOk, callbackCancel] = args;
          if (typeof args[1] === 'function') {
            [text, callbackOk, callbackCancel, title] = args;
          }
          return new Dialog(app, {
            title: typeof title === 'undefined' ? app.params.modals.dialogTitle : title,
            text,
            contentAfterText: '<div class="dialog-input-field"><input type="text" class="dialog-input"></div>',
            buttons: [
              {
                text: app.params.modals.dialogButtonCancel,
              },
              {
                text: app.params.modals.dialogButtonOk,
                bold: true,
              },
            ],
            onClick(dialog, index) {
              const inputValue = dialog.$el.find('.dialog-input').val();
              if (index === 0 && callbackCancel) callbackCancel(inputValue);
              if (index === 1 && callbackOk) callbackOk(inputValue);
            },
          }).open();
        },
        confirm(...args) {
          let [text, title, callbackOk, callbackCancel] = args;
          if (typeof args[1] === 'function') {
            [text, callbackOk, callbackCancel, title] = args;
          }
          return new Dialog(app, {
            title: typeof title === 'undefined' ? app.params.modals.dialogTitle : title,
            text,
            buttons: [
              {
                text: app.params.modals.dialogButtonCancel,
                onClick: callbackCancel,
              },
              {
                text: app.params.modals.dialogButtonOk,
                bold: true,
                onClick: callbackOk,
              },
            ],
          }).open();
        },
        login(...args) {
          let [text, title, callbackOk, callbackCancel] = args;
          if (typeof args[1] === 'function') {
            [text, callbackOk, callbackCancel, title] = args;
          }
          return new Dialog(app, {
            title: typeof title === 'undefined' ? app.params.modals.dialogTitle : title,
            text,
            contentAfterText: `
              <div class="dialog-input-field dialog-input-double">
                <input type="text" name="dialog-username" placeholder="${app.params.modals.dialogUsernamePlaceholder}" class="dialog-input">
              </div>
              <div class="dialog-input-field dialog-input-double">
                <input type="password" name="dialog-password" placeholder="${app.params.modals.dialogPasswordPlaceholder}" class="dialog-input">
              </div>`,
            buttons: [
              {
                text: app.params.modals.dialogButtonCancel,
              },
              {
                text: app.params.modals.dialogButtonOk,
                bold: true,
              },
            ],
            onClick(dialog, index) {
              const username = dialog.$el.find('[name="dialog-username"]').val();
              const password = dialog.$el.find('[name="dialog-password"]').val();
              if (index === 0 && callbackCancel) callbackCancel(username, password);
              if (index === 1 && callbackOk) callbackOk(username, password);
            },
          }).open();
        },
        password(...args) {
          let [text, title, callbackOk, callbackCancel] = args;
          if (typeof args[1] === 'function') {
            [text, callbackOk, callbackCancel, title] = args;
          }
          return new Dialog(app, {
            title: typeof title === 'undefined' ? app.params.modals.dialogTitle : title,
            text,
            contentAfterText: `
              <div class="dialog-input-field">
                <input type="password" name="dialog-password" placeholder="${app.params.modals.dialogPasswordPlaceholder}" class="dialog-input">
              </div>`,
            buttons: [
              {
                text: app.params.modals.dialogButtonCancel,
              },
              {
                text: app.params.modals.dialogButtonOk,
                bold: true,
              },
            ],
            onClick(dialog, index) {
              const password = dialog.$el.find('[name="dialog-password"]').val();
              if (index === 0 && callbackCancel) callbackCancel(password);
              if (index === 1 && callbackOk) callbackOk(password);
            },
          }).open();
        },
        preloader(title) {
          return new Dialog(app, {
            title: typeof title === 'undefined' ? app.params.modals.dialogTitle : title,
            text: '<div class="preloader"></div>',
            cssClass: 'dialog-preloader',
          }).open();
        },
        progress(...args) {},
      },
    });
  },
};
