'use strict';

var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dom = require('dom7');

var _dom2 = _interopRequireDefault(_dom);

var _ssrWindow = require('ssr-window');

var _utils = require('../../utils/utils');

var _utils2 = _interopRequireDefault(_utils);

var _modalClass = require('../modal/modal-class');

var _modalClass2 = _interopRequireDefault(_modalClass);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && ((typeof call === 'undefined' ? 'undefined' : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var Dialog = function (_Modal) {
  _inherits(Dialog, _Modal);

  function Dialog(app, params) {
    var _ret3;

    _classCallCheck(this, Dialog);

    var extendedParams = _utils2.default.extend({
      title: app.params.dialog.title,
      text: undefined,
      content: '',
      buttons: [],
      verticalButtons: false,
      onClick: undefined,
      cssClass: undefined,
      destroyOnClose: false,
      on: {}
    }, params);
    if (typeof extendedParams.closeByBackdropClick === 'undefined') {
      extendedParams.closeByBackdropClick = app.params.dialog.closeByBackdropClick;
    }

    // Extends with open/close Modal methods;

    var _this = _possibleConstructorReturn(this, (Dialog.__proto__ || Object.getPrototypeOf(Dialog)).call(this, app, extendedParams));

    var dialog = _this;

    var title = extendedParams.title,
        text = extendedParams.text,
        content = extendedParams.content,
        buttons = extendedParams.buttons,
        verticalButtons = extendedParams.verticalButtons,
        cssClass = extendedParams.cssClass;

    dialog.params = extendedParams;

    // Find Element
    var $el = void 0;
    if (!dialog.params.el) {
      var dialogClasses = ['dialog'];
      if (buttons.length === 0) dialogClasses.push('dialog-no-buttons');
      if (buttons.length > 0) dialogClasses.push('dialog-buttons-' + buttons.length);
      if (verticalButtons) dialogClasses.push('dialog-buttons-vertical');
      if (cssClass) dialogClasses.push(cssClass);

      var buttonsHTML = '';
      if (buttons.length > 0) {
        buttonsHTML = '\n          <div class="dialog-buttons">\n            ' + buttons.map(function (button) {
          return '\n              <span class="dialog-button' + (button.bold ? ' dialog-button-bold' : '') + (button.color ? ' color-' + button.color : '') + (button.cssClass ? ' ' + button.cssClass : '') + '">' + button.text + '</span>\n            ';
        }).join('') + '\n          </div>\n        ';
      }

      var dialogHtml = '\n        <div class="' + dialogClasses.join(' ') + '">\n          <div class="dialog-inner">\n            ' + (title ? '<div class="dialog-title">' + title + '</div>' : '') + '\n            ' + (text ? '<div class="dialog-text">' + text + '</div>' : '') + '\n            ' + content + '\n          </div>\n          ' + buttonsHTML + '\n        </div>\n      ';
      $el = (0, _dom2.default)(dialogHtml);
    } else {
      $el = (0, _dom2.default)(dialog.params.el);
    }

    if ($el && $el.length > 0 && $el[0].f7Modal) {
      var _ret;

      return _ret = $el[0].f7Modal, _possibleConstructorReturn(_this, _ret);
    }

    if ($el.length === 0) {
      var _ret2;

      return _ret2 = dialog.destroy(), _possibleConstructorReturn(_this, _ret2);
    }

    var $backdropEl = app.root.children('.dialog-backdrop');
    if ($backdropEl.length === 0) {
      $backdropEl = (0, _dom2.default)('<div class="dialog-backdrop"></div>');
      app.root.append($backdropEl);
    }

    // Assign events
    function buttonOnClick(e) {
      var buttonEl = this;
      var index = (0, _dom2.default)(buttonEl).index();
      var button = buttons[index];
      if (button.onClick) button.onClick(dialog, e);
      if (dialog.params.onClick) dialog.params.onClick(dialog, index);
      if (button.close !== false) dialog.close();
    }
    var addKeyboardHander = void 0;
    function onKeyPress(e) {
      var keyCode = e.keyCode;
      buttons.forEach(function (button, index) {
        if (button.keyCodes && button.keyCodes.indexOf(keyCode) >= 0) {
          if (_ssrWindow.document.activeElement) _ssrWindow.document.activeElement.blur();
          if (button.onClick) button.onClick(dialog, e);
          if (dialog.params.onClick) dialog.params.onClick(dialog, index);
          if (button.close !== false) dialog.close();
        }
      });
    }
    if (buttons && buttons.length > 0) {
      dialog.on('open', function () {
        $el.find('.dialog-button').each(function (index, buttonEl) {
          var button = buttons[index];
          if (button.keyCodes) addKeyboardHander = true;
          (0, _dom2.default)(buttonEl).on('click', buttonOnClick);
        });
        if (addKeyboardHander && !app.device.ios && !app.device.android && !app.device.cordova) {
          (0, _dom2.default)(_ssrWindow.document).on('keydown', onKeyPress);
        }
      });
      dialog.on('close', function () {
        $el.find('.dialog-button').each(function (index, buttonEl) {
          (0, _dom2.default)(buttonEl).off('click', buttonOnClick);
        });
        if (addKeyboardHander && !app.device.ios && !app.device.android && !app.device.cordova) {
          (0, _dom2.default)(_ssrWindow.document).off('keydown', onKeyPress);
        }
        addKeyboardHander = false;
      });
    }
    _utils2.default.extend(dialog, {
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
          $textEl = (0, _dom2.default)('<div class="dialog-text"></div>');
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
          $titleEl = (0, _dom2.default)('<div class="dialog-title"></div>');
          $el.find('.dialog-inner').prepend($titleEl);
        }
        $titleEl.html(newTitle);
        dialog.params.title = newTitle;
        return dialog;
      }
    });

    function handleClick(e) {
      var target = e.target;
      var $target = (0, _dom2.default)(target);
      if ($target.closest(dialog.el).length === 0) {
        if (dialog.params.closeByBackdropClick && dialog.backdropEl && dialog.backdropEl === target) {
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

    return _ret3 = dialog, _possibleConstructorReturn(_this, _ret3);
  }

  return Dialog;
}(_modalClass2.default);

exports.default = Dialog;