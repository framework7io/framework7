'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dom = require('dom7');

var _dom2 = _interopRequireDefault(_dom);

var _ssrWindow = require('ssr-window');

var _utils = require('../../utils/utils');

var _utils2 = _interopRequireDefault(_utils);

var _device = require('../../utils/device');

var _device2 = _interopRequireDefault(_device);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var Input = {
  ignoreTypes: ['checkbox', 'button', 'submit', 'range', 'radio', 'image'],
  createTextareaResizableShadow: function createTextareaResizableShadow() {
    var $shadowEl = (0, _dom2.default)(_ssrWindow.document.createElement('textarea'));
    $shadowEl.addClass('textarea-resizable-shadow');
    $shadowEl.prop({
      disabled: true,
      readonly: true
    });
    Input.textareaResizableShadow = $shadowEl;
  },

  textareaResizableShadow: undefined,
  resizeTextarea: function resizeTextarea(textareaEl) {
    var app = this;
    var $textareaEl = (0, _dom2.default)(textareaEl);
    if (!Input.textareaResizableShadow) {
      Input.createTextareaResizableShadow();
    }
    var $shadowEl = Input.textareaResizableShadow;
    if (!$textareaEl.length) return;
    if (!$textareaEl.hasClass('resizable')) return;
    if (Input.textareaResizableShadow.parents().length === 0) {
      app.root.append($shadowEl);
    }

    var styles = _ssrWindow.window.getComputedStyle($textareaEl[0]);
    'padding margin width font-size font-family font-style font-weight line-height font-variant text-transform letter-spacing border box-sizing display'.split(' ').forEach(function (style) {
      var styleValue = styles[style];
      if ('font-size line-height letter-spacing width'.split(' ').indexOf(style) >= 0) {
        styleValue = styleValue.replace(',', '.');
      }
      $shadowEl.css(style, styleValue);
    });
    var currentHeight = $textareaEl[0].clientHeight;

    $shadowEl.val('');
    var initialHeight = $shadowEl[0].scrollHeight;

    $shadowEl.val($textareaEl.val());
    $shadowEl.css('height', 0);
    var scrollHeight = $shadowEl[0].scrollHeight;

    if (currentHeight !== scrollHeight) {
      if (scrollHeight > initialHeight) {
        $textareaEl.css('height', scrollHeight + 'px');
        $textareaEl.trigger('textarea:resize', { initialHeight: initialHeight, currentHeight: currentHeight, scrollHeight: scrollHeight });
      } else if (scrollHeight < currentHeight) {
        $textareaEl.css('height', '');
        $textareaEl.trigger('textarea:resize', { initialHeight: initialHeight, currentHeight: currentHeight, scrollHeight: scrollHeight });
      }
    }
  },
  validate: function validate(inputEl) {
    var $inputEl = (0, _dom2.default)(inputEl);
    if (!$inputEl.length) return;
    var $itemInputEl = $inputEl.parents('.item-input');
    var $inputWrapEl = $inputEl.parents('.input');
    var validity = $inputEl[0].validity;
    var validationMessage = $inputEl.dataset().errorMessage || $inputEl[0].validationMessage || '';
    if (!validity) return;
    if (!validity.valid) {
      var $errorEl = $inputEl.nextAll('.item-input-error-message, .input-error-message');
      if (validationMessage) {
        if ($errorEl.length === 0) {
          $errorEl = (0, _dom2.default)('<div class="' + ($inputWrapEl.length ? 'input-error-message' : 'item-input-error-message') + '"></div>');
          $errorEl.insertAfter($inputEl);
        }
        $errorEl.text(validationMessage);
      }
      if ($errorEl.length > 0) {
        $itemInputEl.addClass('item-input-with-error-message');
        $inputWrapEl.addClass('input-with-eror-message');
      }
      $itemInputEl.addClass('item-input-invalid');
      $inputWrapEl.addClass('input-invalid');
      $inputEl.addClass('input-invalid');
    } else {
      $itemInputEl.removeClass('item-input-invalid item-input-with-error-message');
      $inputWrapEl.removeClass('input-invalid input-with-error-message');
      $inputEl.removeClass('input-invalid');
    }
  },
  validateInputs: function validateInputs(el) {
    var app = this;
    (0, _dom2.default)(el).find('input, textarea, select').each(function (index, inputEl) {
      app.input.validate(inputEl);
    });
  },
  focus: function focus(inputEl) {
    var $inputEl = (0, _dom2.default)(inputEl);
    var type = $inputEl.attr('type');
    if (Input.ignoreTypes.indexOf(type) >= 0) return;
    $inputEl.parents('.item-input').addClass('item-input-focused');
    $inputEl.parents('.input').addClass('input-focused');
    $inputEl.addClass('input-focused');
  },
  blur: function blur(inputEl) {
    var $inputEl = (0, _dom2.default)(inputEl);
    $inputEl.parents('.item-input').removeClass('item-input-focused');
    $inputEl.parents('.input').removeClass('input-focused');
    $inputEl.removeClass('input-focused');
  },
  checkEmptyState: function checkEmptyState(inputEl) {
    var $inputEl = (0, _dom2.default)(inputEl);
    var value = $inputEl.val();
    var $itemInputEl = $inputEl.parents('.item-input');
    var $inputWrapEl = $inputEl.parents('.input');
    if (value && typeof value === 'string' && value.trim() !== '' || Array.isArray(value) && value.length > 0) {
      $itemInputEl.addClass('item-input-with-value');
      $inputWrapEl.addClass('input-with-value');
      $inputEl.addClass('input-with-value');
      $inputEl.trigger('input:notempty');
    } else {
      $itemInputEl.removeClass('item-input-with-value');
      $inputWrapEl.removeClass('input-with-value');
      $inputEl.removeClass('input-with-value');
      $inputEl.trigger('input:empty');
    }
  },
  scrollIntoView: function scrollIntoView(inputEl) {
    var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var centered = arguments[2];
    var force = arguments[3];

    var $inputEl = (0, _dom2.default)(inputEl);
    var $scrollableEl = $inputEl.parents('.page-content, .panel').eq(0);
    if (!$scrollableEl.length) {
      return false;
    }
    var contentHeight = $scrollableEl[0].offsetHeight;
    var contentScrollTop = $scrollableEl[0].scrollTop;
    var contentPaddingTop = parseInt($scrollableEl.css('padding-top'), 10);
    var contentPaddingBottom = parseInt($scrollableEl.css('padding-bottom'), 10);
    var contentOffsetTop = $scrollableEl.offset().top - contentScrollTop;

    var inputOffsetTop = $inputEl.offset().top - contentOffsetTop;
    var inputHeight = $inputEl[0].offsetHeight;

    var min = inputOffsetTop + contentScrollTop - contentPaddingTop;
    var max = inputOffsetTop + contentScrollTop - contentHeight + contentPaddingBottom + inputHeight;
    var centeredPosition = min + (max - min) / 2;

    if (contentScrollTop > min) {
      $scrollableEl.scrollTop(centered ? centeredPosition : min, duration);
      return true;
    }
    if (contentScrollTop < max) {
      $scrollableEl.scrollTop(centered ? centeredPosition : max, duration);
      return true;
    }
    if (force) {
      $scrollableEl.scrollTop(centered ? centeredPosition : max, duration);
    }
    return false;
  },
  init: function init() {
    var app = this;
    Input.createTextareaResizableShadow();
    function onFocus() {
      var inputEl = this;
      if (app.params.input.scrollIntoViewOnFocus) {
        if (_device2.default.android) {
          (0, _dom2.default)(_ssrWindow.window).once('resize', function () {
            if (_ssrWindow.document && _ssrWindow.document.activeElement === inputEl) {
              app.input.scrollIntoView(inputEl, app.params.input.scrollIntoViewDuration, app.params.input.scrollIntoViewCentered, app.params.input.scrollIntoViewAlways);
            }
          });
        } else {
          app.input.scrollIntoView(inputEl, app.params.input.scrollIntoViewDuration, app.params.input.scrollIntoViewCentered, app.params.input.scrollIntoViewAlways);
        }
      }
      app.input.focus(inputEl);
    }
    function onBlur() {
      var $inputEl = (0, _dom2.default)(this);
      var tag = $inputEl[0].nodeName.toLowerCase();
      app.input.blur($inputEl);
      if ($inputEl.dataset().validate || $inputEl.attr('validate') !== null) {
        app.input.validate($inputEl);
      }
      // Resize textarea
      if (tag === 'textarea' && $inputEl.hasClass('resizable')) {
        if (Input.textareaResizableShadow) Input.textareaResizableShadow.remove();
      }
    }
    function onChange() {
      var $inputEl = (0, _dom2.default)(this);
      var type = $inputEl.attr('type');
      var tag = $inputEl[0].nodeName.toLowerCase();
      if (Input.ignoreTypes.indexOf(type) >= 0) return;

      // Check Empty State
      app.input.checkEmptyState($inputEl);

      // Check validation
      if ($inputEl.dataset().validate || $inputEl.attr('validate') !== null) {
        app.input.validate($inputEl);
      }

      // Resize textarea
      if (tag === 'textarea' && $inputEl.hasClass('resizable')) {
        app.input.resizeTextarea($inputEl);
      }
    }
    function onInvalid(e) {
      var $inputEl = (0, _dom2.default)(this);
      if ($inputEl.dataset().validate || $inputEl.attr('validate') !== null) {
        e.preventDefault();
        app.input.validate($inputEl);
      }
    }
    function clearInput() {
      var $clicked = (0, _dom2.default)(this);
      var $inputEl = $clicked.siblings('input, textarea').eq(0);
      var previousValue = $inputEl.val();
      $inputEl.val('').trigger('change input').focus().trigger('input:clear', previousValue);
    }
    (0, _dom2.default)(_ssrWindow.document).on('click', '.input-clear-button', clearInput);
    (0, _dom2.default)(_ssrWindow.document).on('change input', 'input, textarea, select', onChange, true);
    (0, _dom2.default)(_ssrWindow.document).on('focus', 'input, textarea, select', onFocus, true);
    (0, _dom2.default)(_ssrWindow.document).on('blur', 'input, textarea, select', onBlur, true);
    (0, _dom2.default)(_ssrWindow.document).on('invalid', 'input, textarea, select', onInvalid, true);
  }
};

exports.default = {
  name: 'input',
  params: {
    input: {
      scrollIntoViewOnFocus: _device2.default.android,
      scrollIntoViewCentered: false,
      scrollIntoViewDuration: 0,
      scrollIntoViewAlways: false
    }
  },
  create: function create() {
    var app = this;
    _utils2.default.extend(app, {
      input: {
        scrollIntoView: Input.scrollIntoView.bind(app),
        focus: Input.focus.bind(app),
        blur: Input.blur.bind(app),
        validate: Input.validate.bind(app),
        validateInputs: Input.validateInputs.bind(app),
        checkEmptyState: Input.checkEmptyState.bind(app),
        resizeTextarea: Input.resizeTextarea.bind(app),
        init: Input.init.bind(app)
      }
    });
  },

  on: {
    init: function init() {
      var app = this;
      app.input.init();
    },
    tabMounted: function tabMounted(tabEl) {
      var app = this;
      var $tabEl = (0, _dom2.default)(tabEl);
      $tabEl.find('.item-input, .input').each(function (itemInputIndex, itemInputEl) {
        var $itemInputEl = (0, _dom2.default)(itemInputEl);
        $itemInputEl.find('input, select, textarea').each(function (inputIndex, inputEl) {
          var $inputEl = (0, _dom2.default)(inputEl);
          if (Input.ignoreTypes.indexOf($inputEl.attr('type')) >= 0) return;
          app.input.checkEmptyState($inputEl);
        });
      });
      $tabEl.find('textarea.resizable').each(function (textareaIndex, textareaEl) {
        app.input.resizeTextarea(textareaEl);
      });
    },
    pageInit: function pageInit(page) {
      var app = this;
      var $pageEl = page.$el;
      $pageEl.find('.item-input, .input').each(function (itemInputIndex, itemInputEl) {
        var $itemInputEl = (0, _dom2.default)(itemInputEl);
        $itemInputEl.find('input, select, textarea').each(function (inputIndex, inputEl) {
          var $inputEl = (0, _dom2.default)(inputEl);
          if (Input.ignoreTypes.indexOf($inputEl.attr('type')) >= 0) return;
          app.input.checkEmptyState($inputEl);
        });
      });
      $pageEl.find('textarea.resizable').each(function (textareaIndex, textareaEl) {
        app.input.resizeTextarea(textareaEl);
      });
    }
  }
};