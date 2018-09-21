
function framework7ComponentLoader(chunks) {
  var doc = document;
  var win = window;
  var $ = chunks.$;
  var Template7 = chunks.Template7;
  var Utils = chunks.Utils;
  var Device = chunks.Device;
  var Support = chunks.Support;
  var ConstructorMethods = chunks.ConstructorMethods;
  var ModalMethods = chunks.ModalMethods;
  var Framework7Class = chunks.Framework7Class;
  var Modal = chunks.Modal;

  var Dialog = (function (Modal$$1) {
    function Dialog(app, params) {
      var extendedParams = Utils.extend({
        title: app.params.dialog.title,
        text: undefined,
        content: '',
        buttons: [],
        verticalButtons: false,
        onClick: undefined,
        cssClass: undefined,
        destroyOnClose: false,
        on: {},
      }, params);
      if (typeof extendedParams.closeByBackdropClick === 'undefined') {
        extendedParams.closeByBackdropClick = app.params.dialog.closeByBackdropClick;
      }

      // Extends with open/close Modal methods;
      Modal$$1.call(this, app, extendedParams);

      var dialog = this;

      var title = extendedParams.title;
      var text = extendedParams.text;
      var content = extendedParams.content;
      var buttons = extendedParams.buttons;
      var verticalButtons = extendedParams.verticalButtons;
      var cssClass = extendedParams.cssClass;

      dialog.params = extendedParams;

      // Find Element
      var $el;
      if (!dialog.params.el) {
        var dialogClasses = ['dialog'];
        if (buttons.length === 0) { dialogClasses.push('dialog-no-buttons'); }
        if (buttons.length > 0) { dialogClasses.push(("dialog-buttons-" + (buttons.length))); }
        if (verticalButtons) { dialogClasses.push('dialog-buttons-vertical'); }
        if (cssClass) { dialogClasses.push(cssClass); }

        var buttonsHTML = '';
        if (buttons.length > 0) {
          buttonsHTML = "\n          <div class=\"dialog-buttons\">\n            " + (buttons.map(function (button) { return ("\n              <span class=\"dialog-button" + (button.bold ? ' dialog-button-bold' : '') + (button.color ? (" color-" + (button.color)) : '') + (button.cssClass ? (" " + (button.cssClass)) : '') + "\">" + (button.text) + "</span>\n            "); }).join('')) + "\n          </div>\n        ";
        }

        var dialogHtml = "\n        <div class=\"" + (dialogClasses.join(' ')) + "\">\n          <div class=\"dialog-inner\">\n            " + (title ? ("<div class=\"dialog-title\">" + title + "</div>") : '') + "\n            " + (text ? ("<div class=\"dialog-text\">" + text + "</div>") : '') + "\n            " + content + "\n          </div>\n          " + buttonsHTML + "\n        </div>\n      ";
        $el = $(dialogHtml);
      } else {
        $el = $(dialog.params.el);
      }

      if ($el && $el.length > 0 && $el[0].f7Modal) {
        return $el[0].f7Modal;
      }

      if ($el.length === 0) {
        return dialog.destroy();
      }

      var $backdropEl = app.root.children('.dialog-backdrop');
      if ($backdropEl.length === 0) {
        $backdropEl = $('<div class="dialog-backdrop"></div>');
        app.root.append($backdropEl);
      }

      // Assign events
      function buttonOnClick(e) {
        var buttonEl = this;
        var index = $(buttonEl).index();
        var button = buttons[index];
        if (button.onClick) { button.onClick(dialog, e); }
        if (dialog.params.onClick) { dialog.params.onClick(dialog, index); }
        if (button.close !== false) { dialog.close(); }
      }
      var addKeyboardHander;
      function onKeyPress(e) {
        var keyCode = e.keyCode;
        buttons.forEach(function (button, index) {
          if (button.keyCodes && button.keyCodes.indexOf(keyCode) >= 0) {
            if (doc.activeElement) { doc.activeElement.blur(); }
            if (button.onClick) { button.onClick(dialog, e); }
            if (dialog.params.onClick) { dialog.params.onClick(dialog, index); }
            if (button.close !== false) { dialog.close(); }
          }
        });
      }
      if (buttons && buttons.length > 0) {
        dialog.on('open', function () {
          $el.find('.dialog-button').each(function (index, buttonEl) {
            var button = buttons[index];
            if (button.keyCodes) { addKeyboardHander = true; }
            $(buttonEl).on('click', buttonOnClick);
          });
          if (
            addKeyboardHander
            && !app.device.ios
            && !app.device.android
            && !app.device.cordova
          ) {
            $(doc).on('keydown', onKeyPress);
          }
        });
        dialog.on('close', function () {
          $el.find('.dialog-button').each(function (index, buttonEl) {
            $(buttonEl).off('click', buttonOnClick);
          });
          if (
            addKeyboardHander
            && !app.device.ios
            && !app.device.android
            && !app.device.cordova
          ) {
            $(doc).off('keydown', onKeyPress);
          }
          addKeyboardHander = false;
        });
      }
      Utils.extend(dialog, {
        app: app,
        $el: $el,
        el: $el[0],
        $backdropEl: $backdropEl,
        backdropEl: $backdropEl[0],
        type: 'dialog',
        setProgress: function setProgress(progress, duration) {
          app.progressbar.set($el.find('.progressbar'), progress, duration);
          return dialog;
        },
        setText: function setText(newText) {
          var $textEl = $el.find('.dialog-text');
          if ($textEl.length === 0) {
            $textEl = $('<div class="dialog-text"></div>');
            if (typeof title !== 'undefined') {
              $textEl.insertAfter($el.find('.dialog-title'));
            } else {
              $el.find('.dialog-inner').prepend($textEl);
            }
          }
          $textEl.html(newText);
          dialog.params.text = newText;
          return dialog;
        },
        setTitle: function setTitle(newTitle) {
          var $titleEl = $el.find('.dialog-title');
          if ($titleEl.length === 0) {
            $titleEl = $('<div class="dialog-title"></div>');
            $el.find('.dialog-inner').prepend($titleEl);
          }
          $titleEl.html(newTitle);
          dialog.params.title = newTitle;
          return dialog;
        },
      });

      function handleClick(e) {
        var target = e.target;
        var $target = $(target);
        if ($target.closest(dialog.el).length === 0) {
          if (
            dialog.params.closeByBackdropClick
            && dialog.backdropEl
            && dialog.backdropEl === target
          ) {
            dialog.close();
          }
        }
      }

      dialog.on('opened', function () {
        if (dialog.params.closeByBackdropClick) {
          app.on('click', handleClick);
        }
      });
      dialog.on('close', function () {
        if (dialog.params.closeByBackdropClick) {
          app.off('click', handleClick);
        }
      });

      $el[0].f7Modal = dialog;

      if (dialog.params.destroyOnClose) {
        dialog.once('closed', function () {
          setTimeout(function () {
            dialog.destroy();
          }, 0);
        });
      }

      return dialog;
    }

    if ( Modal$$1 ) Dialog.__proto__ = Modal$$1;
    Dialog.prototype = Object.create( Modal$$1 && Modal$$1.prototype );
    Dialog.prototype.constructor = Dialog;

    return Dialog;
  }(Modal));

  var dialog = {
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
      Dialog: Dialog,
    },
    create: function create() {
      var app = this;
      function defaultDialogTitle() {
        return app.params.dialog.title || app.name;
      }
      var destroyOnClose = app.params.dialog.destroyPredefinedDialogs;
      var keyboardActions = app.params.dialog.keyboardActions;
      app.dialog = Utils.extend(
        ModalMethods({
          app: app,
          constructor: Dialog,
          defaultSelector: '.dialog.modal-in',
        }),
        {
          // Shortcuts
          alert: function alert() {
            var assign;

            var args = [], len = arguments.length;
            while ( len-- ) args[ len ] = arguments[ len ];
            var text = args[0];
            var title = args[1];
            var callbackOk = args[2];
            if (args.length === 2 && typeof args[1] === 'function') {
              (assign = args, text = assign[0], callbackOk = assign[1], title = assign[2]);
            }
            return new Dialog(app, {
              title: typeof title === 'undefined' ? defaultDialogTitle() : title,
              text: text,
              buttons: [{
                text: app.params.dialog.buttonOk,
                bold: true,
                onClick: callbackOk,
                keyCodes: keyboardActions ? [13, 27] : null,
              }],
              destroyOnClose: destroyOnClose,
            }).open();
          },
          prompt: function prompt() {
            var assign;

            var args = [], len = arguments.length;
            while ( len-- ) args[ len ] = arguments[ len ];
            var text = args[0];
            var title = args[1];
            var callbackOk = args[2];
            var callbackCancel = args[3];
            if (typeof args[1] === 'function') {
              (assign = args, text = assign[0], callbackOk = assign[1], callbackCancel = assign[2], title = assign[3]);
            }
            return new Dialog(app, {
              title: typeof title === 'undefined' ? defaultDialogTitle() : title,
              text: text,
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
                } ],
              onClick: function onClick(dialog, index) {
                var inputValue = dialog.$el.find('.dialog-input').val();
                if (index === 0 && callbackCancel) { callbackCancel(inputValue); }
                if (index === 1 && callbackOk) { callbackOk(inputValue); }
              },
              destroyOnClose: destroyOnClose,
            }).open();
          },
          confirm: function confirm() {
            var assign;

            var args = [], len = arguments.length;
            while ( len-- ) args[ len ] = arguments[ len ];
            var text = args[0];
            var title = args[1];
            var callbackOk = args[2];
            var callbackCancel = args[3];
            if (typeof args[1] === 'function') {
              (assign = args, text = assign[0], callbackOk = assign[1], callbackCancel = assign[2], title = assign[3]);
            }
            return new Dialog(app, {
              title: typeof title === 'undefined' ? defaultDialogTitle() : title,
              text: text,
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
                } ],
              destroyOnClose: destroyOnClose,
            }).open();
          },
          login: function login() {
            var assign;

            var args = [], len = arguments.length;
            while ( len-- ) args[ len ] = arguments[ len ];
            var text = args[0];
            var title = args[1];
            var callbackOk = args[2];
            var callbackCancel = args[3];
            if (typeof args[1] === 'function') {
              (assign = args, text = assign[0], callbackOk = assign[1], callbackCancel = assign[2], title = assign[3]);
            }
            return new Dialog(app, {
              title: typeof title === 'undefined' ? defaultDialogTitle() : title,
              text: text,
              content: ("\n              <div class=\"dialog-input-field dialog-input-double item-input\">\n                <div class=\"item-input-wrap\">\n                  <input type=\"text\" name=\"dialog-username\" placeholder=\"" + (app.params.dialog.usernamePlaceholder) + "\" class=\"dialog-input\">\n                </div>\n              </div>\n              <div class=\"dialog-input-field dialog-input-double item-input\">\n                <div class=\"item-input-wrap\">\n                  <input type=\"password\" name=\"dialog-password\" placeholder=\"" + (app.params.dialog.passwordPlaceholder) + "\" class=\"dialog-input\">\n                </div>\n              </div>"),
              buttons: [
                {
                  text: app.params.dialog.buttonCancel,
                  keyCodes: keyboardActions ? [27] : null,
                },
                {
                  text: app.params.dialog.buttonOk,
                  bold: true,
                  keyCodes: keyboardActions ? [13] : null,
                } ],
              onClick: function onClick(dialog, index) {
                var username = dialog.$el.find('[name="dialog-username"]').val();
                var password = dialog.$el.find('[name="dialog-password"]').val();
                if (index === 0 && callbackCancel) { callbackCancel(username, password); }
                if (index === 1 && callbackOk) { callbackOk(username, password); }
              },
              destroyOnClose: destroyOnClose,
            }).open();
          },
          password: function password() {
            var assign;

            var args = [], len = arguments.length;
            while ( len-- ) args[ len ] = arguments[ len ];
            var text = args[0];
            var title = args[1];
            var callbackOk = args[2];
            var callbackCancel = args[3];
            if (typeof args[1] === 'function') {
              (assign = args, text = assign[0], callbackOk = assign[1], callbackCancel = assign[2], title = assign[3]);
            }
            return new Dialog(app, {
              title: typeof title === 'undefined' ? defaultDialogTitle() : title,
              text: text,
              content: ("\n              <div class=\"dialog-input-field item-input\">\n                <div class=\"item-input-wrap\">\n                  <input type=\"password\" name=\"dialog-password\" placeholder=\"" + (app.params.dialog.passwordPlaceholder) + "\" class=\"dialog-input\">\n                </div>\n              </div>"),
              buttons: [
                {
                  text: app.params.dialog.buttonCancel,
                  keyCodes: keyboardActions ? [27] : null,
                },
                {
                  text: app.params.dialog.buttonOk,
                  bold: true,
                  keyCodes: keyboardActions ? [13] : null,
                } ],
              onClick: function onClick(dialog, index) {
                var password = dialog.$el.find('[name="dialog-password"]').val();
                if (index === 0 && callbackCancel) { callbackCancel(password); }
                if (index === 1 && callbackOk) { callbackOk(password); }
              },
              destroyOnClose: destroyOnClose,
            }).open();
          },
          preloader: function preloader(title, color) {
            var preloaderInner = app.theme !== 'md' ? '' : Utils.mdPreloaderContent;
            return new Dialog(app, {
              title: typeof title === 'undefined' || title === null ? app.params.dialog.preloaderTitle : title,
              content: ("<div class=\"preloader" + (color ? (" color-" + color) : '') + "\">" + preloaderInner + "</div>"),
              cssClass: 'dialog-preloader',
              destroyOnClose: destroyOnClose,
            }).open();
          },
          progress: function progress() {
            var assign, assign$1, assign$2;

            var args = [], len = arguments.length;
            while ( len-- ) args[ len ] = arguments[ len ];
            var title = args[0];
            var progress = args[1];
            var color = args[2];
            if (args.length === 2) {
              if (typeof args[0] === 'number') {
                (assign = args, progress = assign[0], color = assign[1], title = assign[2]);
              } else if (typeof args[0] === 'string' && typeof args[1] === 'string') {
                (assign$1 = args, title = assign$1[0], color = assign$1[1], progress = assign$1[2]);
              }
            } else if (args.length === 1) {
              if (typeof args[0] === 'number') {
                (assign$2 = args, progress = assign$2[0], title = assign$2[1], color = assign$2[2]);
              }
            }
            var infinite = typeof progress === 'undefined';
            var dialog = new Dialog(app, {
              title: typeof title === 'undefined' ? app.params.dialog.progressTitle : title,
              cssClass: 'dialog-progress',
              content: ("\n              <div class=\"progressbar" + (infinite ? '-infinite' : '') + (color ? (" color-" + color) : '') + "\">\n                " + (!infinite ? '<span></span>' : '') + "\n              </div>\n            "),
              destroyOnClose: destroyOnClose,
            });
            if (!infinite) { dialog.setProgress(progress); }
            return dialog.open();
          },
        }
      );
    },
  };

  return dialog;
}
framework7ComponentLoader.componentName = 'dialog';

