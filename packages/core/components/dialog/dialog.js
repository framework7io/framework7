'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = require('../../utils/utils');

var _utils2 = _interopRequireDefault(_utils);

var _dialogClass = require('./dialog-class');

var _dialogClass2 = _interopRequireDefault(_dialogClass);

var _modalMethods = require('../../utils/modal-methods');

var _modalMethods2 = _interopRequireDefault(_modalMethods);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

exports.default = {
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
      keyboardActions: true
    }
  },
  static: {
    Dialog: _dialogClass2.default
  },
  create: function create() {
    var app = this;
    var defaultDialogTitle = app.params.dialog.title || app.name;
    var destroyOnClose = app.params.dialog.destroyPredefinedDialogs;
    var keyboardActions = app.params.dialog.keyboardActions;
    app.dialog = _utils2.default.extend((0, _modalMethods2.default)({
      app: app,
      constructor: _dialogClass2.default,
      defaultSelector: '.dialog.modal-in'
    }), {
      // Shortcuts
      alert: function alert() {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        var text = args[0],
            title = args[1],
            callbackOk = args[2];

        if (args.length === 2 && typeof args[1] === 'function') {
          text = args[0];
          callbackOk = args[1];
          title = args[2];
        }
        return new _dialogClass2.default(app, {
          title: typeof title === 'undefined' ? defaultDialogTitle : title,
          text: text,
          buttons: [{
            text: app.params.dialog.buttonOk,
            bold: true,
            onClick: callbackOk,
            keyCodes: keyboardActions ? [13, 27] : null
          }],
          destroyOnClose: destroyOnClose
        }).open();
      },
      prompt: function prompt() {
        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }

        var text = args[0],
            title = args[1],
            callbackOk = args[2],
            callbackCancel = args[3];

        if (typeof args[1] === 'function') {
          text = args[0];
          callbackOk = args[1];
          callbackCancel = args[2];
          title = args[3];
        }
        return new _dialogClass2.default(app, {
          title: typeof title === 'undefined' ? defaultDialogTitle : title,
          text: text,
          content: '<div class="dialog-input-field item-input"><div class="item-input-wrap"><input type="text" class="dialog-input"></div></div>',
          buttons: [{
            text: app.params.dialog.buttonCancel,
            keyCodes: keyboardActions ? [27] : null
          }, {
            text: app.params.dialog.buttonOk,
            bold: true,
            keyCodes: keyboardActions ? [13] : null
          }],
          onClick: function onClick(dialog, index) {
            var inputValue = dialog.$el.find('.dialog-input').val();
            if (index === 0 && callbackCancel) callbackCancel(inputValue);
            if (index === 1 && callbackOk) callbackOk(inputValue);
          },

          destroyOnClose: destroyOnClose
        }).open();
      },
      confirm: function confirm() {
        for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
          args[_key3] = arguments[_key3];
        }

        var text = args[0],
            title = args[1],
            callbackOk = args[2],
            callbackCancel = args[3];

        if (typeof args[1] === 'function') {
          text = args[0];
          callbackOk = args[1];
          callbackCancel = args[2];
          title = args[3];
        }
        return new _dialogClass2.default(app, {
          title: typeof title === 'undefined' ? defaultDialogTitle : title,
          text: text,
          buttons: [{
            text: app.params.dialog.buttonCancel,
            onClick: callbackCancel,
            keyCodes: keyboardActions ? [27] : null
          }, {
            text: app.params.dialog.buttonOk,
            bold: true,
            onClick: callbackOk,
            keyCodes: keyboardActions ? [13] : null
          }],
          destroyOnClose: destroyOnClose
        }).open();
      },
      login: function login() {
        for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
          args[_key4] = arguments[_key4];
        }

        var text = args[0],
            title = args[1],
            callbackOk = args[2],
            callbackCancel = args[3];

        if (typeof args[1] === 'function') {
          text = args[0];
          callbackOk = args[1];
          callbackCancel = args[2];
          title = args[3];
        }
        return new _dialogClass2.default(app, {
          title: typeof title === 'undefined' ? defaultDialogTitle : title,
          text: text,
          content: '\n              <div class="dialog-input-field dialog-input-double item-input">\n                <div class="item-input-wrap">\n                  <input type="text" name="dialog-username" placeholder="' + app.params.dialog.usernamePlaceholder + '" class="dialog-input">\n                </div>\n              </div>\n              <div class="dialog-input-field dialog-input-double item-input">\n                <div class="item-input-wrap">\n                  <input type="password" name="dialog-password" placeholder="' + app.params.dialog.passwordPlaceholder + '" class="dialog-input">\n                </div>\n              </div>',
          buttons: [{
            text: app.params.dialog.buttonCancel,
            keyCodes: keyboardActions ? [27] : null
          }, {
            text: app.params.dialog.buttonOk,
            bold: true,
            keyCodes: keyboardActions ? [13] : null
          }],
          onClick: function onClick(dialog, index) {
            var username = dialog.$el.find('[name="dialog-username"]').val();
            var password = dialog.$el.find('[name="dialog-password"]').val();
            if (index === 0 && callbackCancel) callbackCancel(username, password);
            if (index === 1 && callbackOk) callbackOk(username, password);
          },

          destroyOnClose: destroyOnClose
        }).open();
      },
      password: function password() {
        for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
          args[_key5] = arguments[_key5];
        }

        var text = args[0],
            title = args[1],
            callbackOk = args[2],
            callbackCancel = args[3];

        if (typeof args[1] === 'function') {
          text = args[0];
          callbackOk = args[1];
          callbackCancel = args[2];
          title = args[3];
        }
        return new _dialogClass2.default(app, {
          title: typeof title === 'undefined' ? defaultDialogTitle : title,
          text: text,
          content: '\n              <div class="dialog-input-field item-input">\n                <div class="item-input-wrap">\n                  <input type="password" name="dialog-password" placeholder="' + app.params.dialog.passwordPlaceholder + '" class="dialog-input">\n                </div>\n              </div>',
          buttons: [{
            text: app.params.dialog.buttonCancel,
            keyCodes: keyboardActions ? [27] : null
          }, {
            text: app.params.dialog.buttonOk,
            bold: true,
            keyCodes: keyboardActions ? [13] : null
          }],
          onClick: function onClick(dialog, index) {
            var password = dialog.$el.find('[name="dialog-password"]').val();
            if (index === 0 && callbackCancel) callbackCancel(password);
            if (index === 1 && callbackOk) callbackOk(password);
          },

          destroyOnClose: destroyOnClose
        }).open();
      },
      preloader: function preloader(title, color) {
        var preloaderInner = app.theme !== 'md' ? '' : _utils2.default.mdPreloaderContent;
        return new _dialogClass2.default(app, {
          title: typeof title === 'undefined' || title === null ? app.params.dialog.preloaderTitle : title,
          content: '<div class="preloader' + (color ? ' color-' + color : '') + '">' + preloaderInner + '</div>',
          cssClass: 'dialog-preloader',
          destroyOnClose: destroyOnClose
        }).open();
      },
      progress: function progress() {
        for (var _len6 = arguments.length, args = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
          args[_key6] = arguments[_key6];
        }

        var title = args[0],
            progress = args[1],
            color = args[2];

        if (args.length === 2) {
          if (typeof args[0] === 'number') {
            progress = args[0];
            color = args[1];
            title = args[2];
          } else if (typeof args[0] === 'string' && typeof args[1] === 'string') {
            title = args[0];
            color = args[1];
            progress = args[2];
          }
        } else if (args.length === 1) {
          if (typeof args[0] === 'number') {
            progress = args[0];
            title = args[1];
            color = args[2];
          }
        }
        var infinite = typeof progress === 'undefined';
        var dialog = new _dialogClass2.default(app, {
          title: typeof title === 'undefined' ? app.params.dialog.progressTitle : title,
          cssClass: 'dialog-progress',
          content: '\n              <div class="progressbar' + (infinite ? '-infinite' : '') + (color ? ' color-' + color : '') + '">\n                ' + (!infinite ? '<span></span>' : '') + '\n              </div>\n            ',
          destroyOnClose: destroyOnClose
        });
        if (!infinite) dialog.setProgress(progress);
        return dialog.open();
      }
    });
  }
};