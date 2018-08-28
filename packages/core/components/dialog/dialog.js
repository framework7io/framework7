import Utils from '../../utils/utils';
import Dialog from './dialog-class';
import ModalMethods from '../../utils/modal-methods';

export default {
  name: 'dialog',
  params: {
    dialog: {
      title: undefined,
      buttonOk: 'OK',
      buttonCancel: 'Cancel',
      usernamePlaceholder: 'Username',
      passwordPlaceholder: 'Password',
      preloaderTitle: 'Loading... ',
      progressTitle: 'Loading... ',
      closeByBackdropClick: false,
      destroyPredefinedDialogs: true,
      keyboardActions: true,
    },
  },
  static: {
    Dialog,
  },
  create() {
    const app = this;
    function defaultDialogTitle() {
      return app.params.dialog.title || app.name;
    }
    const destroyOnClose = app.params.dialog.destroyPredefinedDialogs;
    const keyboardActions = app.params.dialog.keyboardActions;
    app.dialog = Utils.extend(
      ModalMethods({
        app,
        constructor: Dialog,
        defaultSelector: '.dialog.modal-in',
      }),
      {
        // Shortcuts
        alert(...args) {
          let [text, title, callbackOk] = args;
          if (args.length === 2 && typeof args[1] === 'function') {
            [text, callbackOk, title] = args;
          }
          return new Dialog(app, {
            title: typeof title === 'undefined' ? defaultDialogTitle() : title,
            text,
            buttons: [{
              text: app.params.dialog.buttonOk,
              bold: true,
              onClick: callbackOk,
              keyCodes: keyboardActions ? [13, 27] : null,
            }],
            destroyOnClose,
          }).open();
        },
        prompt(...args) {
          let [text, title, callbackOk, callbackCancel] = args;
          if (typeof args[1] === 'function') {
            [text, callbackOk, callbackCancel, title] = args;
          }
          return new Dialog(app, {
            title: typeof title === 'undefined' ? defaultDialogTitle() : title,
            text,
            content: '<div class="dialog-input-field item-input"><div class="item-input-wrap"><input type="text" class="dialog-input"></div></div>',
            buttons: [
              {
                text: app.params.dialog.buttonCancel,
                keyCodes: keyboardActions ? [27] : null,
              },
              {
                text: app.params.dialog.buttonOk,
                bold: true,
                keyCodes: keyboardActions ? [13] : null,
              },
            ],
            onClick(dialog, index) {
              const inputValue = dialog.$el.find('.dialog-input').val();
              if (index === 0 && callbackCancel) callbackCancel(inputValue);
              if (index === 1 && callbackOk) callbackOk(inputValue);
            },
            destroyOnClose,
          }).open();
        },
        confirm(...args) {
          let [text, title, callbackOk, callbackCancel] = args;
          if (typeof args[1] === 'function') {
            [text, callbackOk, callbackCancel, title] = args;
          }
          return new Dialog(app, {
            title: typeof title === 'undefined' ? defaultDialogTitle() : title,
            text,
            buttons: [
              {
                text: app.params.dialog.buttonCancel,
                onClick: callbackCancel,
                keyCodes: keyboardActions ? [27] : null,
              },
              {
                text: app.params.dialog.buttonOk,
                bold: true,
                onClick: callbackOk,
                keyCodes: keyboardActions ? [13] : null,
              },
            ],
            destroyOnClose,
          }).open();
        },
        login(...args) {
          let [text, title, callbackOk, callbackCancel] = args;
          if (typeof args[1] === 'function') {
            [text, callbackOk, callbackCancel, title] = args;
          }
          return new Dialog(app, {
            title: typeof title === 'undefined' ? defaultDialogTitle() : title,
            text,
            content: `
              <div class="dialog-input-field dialog-input-double item-input">
                <div class="item-input-wrap">
                  <input type="text" name="dialog-username" placeholder="${app.params.dialog.usernamePlaceholder}" class="dialog-input">
                </div>
              </div>
              <div class="dialog-input-field dialog-input-double item-input">
                <div class="item-input-wrap">
                  <input type="password" name="dialog-password" placeholder="${app.params.dialog.passwordPlaceholder}" class="dialog-input">
                </div>
              </div>`,
            buttons: [
              {
                text: app.params.dialog.buttonCancel,
                keyCodes: keyboardActions ? [27] : null,
              },
              {
                text: app.params.dialog.buttonOk,
                bold: true,
                keyCodes: keyboardActions ? [13] : null,
              },
            ],
            onClick(dialog, index) {
              const username = dialog.$el.find('[name="dialog-username"]').val();
              const password = dialog.$el.find('[name="dialog-password"]').val();
              if (index === 0 && callbackCancel) callbackCancel(username, password);
              if (index === 1 && callbackOk) callbackOk(username, password);
            },
            destroyOnClose,
          }).open();
        },
        password(...args) {
          let [text, title, callbackOk, callbackCancel] = args;
          if (typeof args[1] === 'function') {
            [text, callbackOk, callbackCancel, title] = args;
          }
          return new Dialog(app, {
            title: typeof title === 'undefined' ? defaultDialogTitle() : title,
            text,
            content: `
              <div class="dialog-input-field item-input">
                <div class="item-input-wrap">
                  <input type="password" name="dialog-password" placeholder="${app.params.dialog.passwordPlaceholder}" class="dialog-input">
                </div>
              </div>`,
            buttons: [
              {
                text: app.params.dialog.buttonCancel,
                keyCodes: keyboardActions ? [27] : null,
              },
              {
                text: app.params.dialog.buttonOk,
                bold: true,
                keyCodes: keyboardActions ? [13] : null,
              },
            ],
            onClick(dialog, index) {
              const password = dialog.$el.find('[name="dialog-password"]').val();
              if (index === 0 && callbackCancel) callbackCancel(password);
              if (index === 1 && callbackOk) callbackOk(password);
            },
            destroyOnClose,
          }).open();
        },
        preloader(title, color) {
          const preloaderInner = app.theme !== 'md' ? '' : Utils.mdPreloaderContent;
          return new Dialog(app, {
            title: typeof title === 'undefined' || title === null ? app.params.dialog.preloaderTitle : title,
            content: `<div class="preloader${color ? ` color-${color}` : ''}">${preloaderInner}</div>`,
            cssClass: 'dialog-preloader',
            destroyOnClose,
          }).open();
        },
        progress(...args) {
          let [title, progress, color] = args;
          if (args.length === 2) {
            if (typeof args[0] === 'number') {
              [progress, color, title] = args;
            } else if (typeof args[0] === 'string' && typeof args[1] === 'string') {
              [title, color, progress] = args;
            }
          } else if (args.length === 1) {
            if (typeof args[0] === 'number') {
              [progress, title, color] = args;
            }
          }
          const infinite = typeof progress === 'undefined';
          const dialog = new Dialog(app, {
            title: typeof title === 'undefined' ? app.params.dialog.progressTitle : title,
            cssClass: 'dialog-progress',
            content: `
              <div class="progressbar${infinite ? '-infinite' : ''}${color ? ` color-${color}` : ''}">
                ${!infinite ? '<span></span>' : ''}
              </div>
            `,
            destroyOnClose,
          });
          if (!infinite) dialog.setProgress(progress);
          return dialog.open();
        },
      }
    );
  },
};
