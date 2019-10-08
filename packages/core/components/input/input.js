import $ from 'dom7';
import { window, document } from 'ssr-window';
import Utils from '../../utils/utils';
import Device from '../../utils/device';

const Input = {
  ignoreTypes: ['checkbox', 'button', 'submit', 'range', 'radio', 'image'],
  createTextareaResizableShadow() {
    const $shadowEl = $(document.createElement('textarea'));
    $shadowEl.addClass('textarea-resizable-shadow');
    $shadowEl.prop({
      disabled: true,
      readonly: true,
    });
    Input.textareaResizableShadow = $shadowEl;
  },
  textareaResizableShadow: undefined,
  resizeTextarea(textareaEl) {
    const app = this;
    const $textareaEl = $(textareaEl);
    if (!Input.textareaResizableShadow) {
      Input.createTextareaResizableShadow();
    }
    const $shadowEl = Input.textareaResizableShadow;
    if (!$textareaEl.length) return;
    if (!$textareaEl.hasClass('resizable')) return;
    if (Input.textareaResizableShadow.parents().length === 0) {
      app.root.append($shadowEl);
    }

    const styles = window.getComputedStyle($textareaEl[0]);
    ('padding-top padding-bottom padding-left padding-right margin-left margin-right margin-top margin-bottom width font-size font-family font-style font-weight line-height font-variant text-transform letter-spacing border box-sizing display').split(' ').forEach((style) => {
      let styleValue = styles[style];
      if (('font-size line-height letter-spacing width').split(' ').indexOf(style) >= 0) {
        styleValue = styleValue.replace(',', '.');
      }
      $shadowEl.css(style, styleValue);
    });
    const currentHeight = $textareaEl[0].clientHeight;

    $shadowEl.val('');
    const initialHeight = $shadowEl[0].scrollHeight;

    $shadowEl.val($textareaEl.val());
    $shadowEl.css('height', 0);
    const scrollHeight = $shadowEl[0].scrollHeight;

    if (currentHeight !== scrollHeight) {
      if (scrollHeight > initialHeight) {
        $textareaEl.css('height', `${scrollHeight}px`);
      } else if (scrollHeight < currentHeight) {
        $textareaEl.css('height', '');
      }
      if (scrollHeight > initialHeight || scrollHeight < currentHeight) {
        $textareaEl.trigger('textarea:resize', { initialHeight, currentHeight, scrollHeight });
        app.emit('textareaResize', { initialHeight, currentHeight, scrollHeight });
      }
    }
  },
  validate(inputEl) {
    const $inputEl = $(inputEl);
    if (!$inputEl.length) return;
    const $itemInputEl = $inputEl.parents('.item-input');
    const $inputWrapEl = $inputEl.parents('.input');
    const validity = $inputEl[0].validity;
    const validationMessage = $inputEl.dataset().errorMessage || $inputEl[0].validationMessage || '';
    if (!validity) return;
    if (!validity.valid) {
      let $errorEl = $inputEl.nextAll('.item-input-error-message, .input-error-message');
      if (validationMessage) {
        if ($errorEl.length === 0) {
          $errorEl = $(`<div class="${$inputWrapEl.length ? 'input-error-message' : 'item-input-error-message'}"></div>`);
          $errorEl.insertAfter($inputEl);
        }
        $errorEl.text(validationMessage);
      }
      if ($errorEl.length > 0) {
        $itemInputEl.addClass('item-input-with-error-message');
        $inputWrapEl.addClass('input-with-error-message');
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
  validateInputs(el) {
    const app = this;
    $(el).find('input, textarea, select').each((index, inputEl) => {
      app.input.validate(inputEl);
    });
  },
  focus(inputEl) {
    const $inputEl = $(inputEl);
    const type = $inputEl.attr('type');
    if (Input.ignoreTypes.indexOf(type) >= 0) return;
    $inputEl.parents('.item-input').addClass('item-input-focused');
    $inputEl.parents('.input').addClass('input-focused');
    $inputEl.addClass('input-focused');
  },
  blur(inputEl) {
    const $inputEl = $(inputEl);
    $inputEl.parents('.item-input').removeClass('item-input-focused');
    $inputEl.parents('.input').removeClass('input-focused');
    $inputEl.removeClass('input-focused');
  },
  checkEmptyState(inputEl) {
    const app = this;
    let $inputEl = $(inputEl);
    if (!$inputEl.is('input, select, textarea, .item-input [contenteditable]')) {
      $inputEl = $inputEl.find('input, select, textarea, .item-input [contenteditable]').eq(0);
    }
    if (!$inputEl.length) return;
    const isContentEditable = $inputEl[0].hasAttribute('contenteditable');
    let value;
    if (isContentEditable) {
      if ($inputEl.find('.text-editor-placeholder').length) value = '';
      else value = $inputEl.html();
    } else {
      value = $inputEl.val();
    }
    const $itemInputEl = $inputEl.parents('.item-input');
    const $inputWrapEl = $inputEl.parents('.input');
    if ((value && (typeof value === 'string' && value.trim() !== '')) || (Array.isArray(value) && value.length > 0)) {
      $itemInputEl.addClass('item-input-with-value');
      $inputWrapEl.addClass('input-with-value');
      $inputEl.addClass('input-with-value');
      $inputEl.trigger('input:notempty');
      app.emit('inputNotEmpty', $inputEl[0]);
    } else {
      $itemInputEl.removeClass('item-input-with-value');
      $inputWrapEl.removeClass('input-with-value');
      $inputEl.removeClass('input-with-value');
      $inputEl.trigger('input:empty');
      app.emit('inputEmpty', $inputEl[0]);
    }
  },
  scrollIntoView(inputEl, duration = 0, centered, force) {
    const $inputEl = $(inputEl);
    const $scrollableEl = $inputEl.parents('.page-content, .panel, .card-expandable .card-content').eq(0);
    if (!$scrollableEl.length) {
      return false;
    }
    const contentHeight = $scrollableEl[0].offsetHeight;
    const contentScrollTop = $scrollableEl[0].scrollTop;
    const contentPaddingTop = parseInt($scrollableEl.css('padding-top'), 10);
    const contentPaddingBottom = parseInt($scrollableEl.css('padding-bottom'), 10);
    const contentOffsetTop = $scrollableEl.offset().top - contentScrollTop;

    const inputOffsetTop = $inputEl.offset().top - contentOffsetTop;
    const inputHeight = $inputEl[0].offsetHeight;

    const min = (inputOffsetTop + contentScrollTop) - contentPaddingTop;
    const max = ((inputOffsetTop + contentScrollTop) - contentHeight) + contentPaddingBottom + inputHeight;
    const centeredPosition = min + ((max - min) / 2);

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
  init() {
    const app = this;
    Input.createTextareaResizableShadow();
    function onFocus() {
      const inputEl = this;
      if (app.params.input.scrollIntoViewOnFocus) {
        if (Device.android) {
          $(window).once('resize', () => {
            if (document && document.activeElement === inputEl) {
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
      const $inputEl = $(this);
      const tag = $inputEl[0].nodeName.toLowerCase();
      app.input.blur($inputEl);
      if ($inputEl.dataset().validate || $inputEl.attr('validate') !== null || $inputEl.attr('data-validate-on-blur') !== null) {
        app.input.validate($inputEl);
      }
      // Resize textarea
      if (tag === 'textarea' && $inputEl.hasClass('resizable')) {
        if (Input.textareaResizableShadow) Input.textareaResizableShadow.remove();
      }
    }
    function onChange() {
      const $inputEl = $(this);
      const type = $inputEl.attr('type');
      const tag = $inputEl[0].nodeName.toLowerCase();
      const isContentEditable = $inputEl[0].hasAttribute('contenteditable');
      if (Input.ignoreTypes.indexOf(type) >= 0) return;

      // Check Empty State
      app.input.checkEmptyState($inputEl);
      if (isContentEditable) return;

      // Check validation
      if ($inputEl.attr('data-validate-on-blur') === null && ($inputEl.dataset().validate || $inputEl.attr('validate') !== null)) {
        app.input.validate($inputEl);
      }

      // Resize textarea
      if (tag === 'textarea' && $inputEl.hasClass('resizable')) {
        app.input.resizeTextarea($inputEl);
      }
    }
    function onInvalid(e) {
      const $inputEl = $(this);
      if ($inputEl.attr('data-validate-on-blur') === null && ($inputEl.dataset().validate || $inputEl.attr('validate') !== null)) {
        e.preventDefault();
        app.input.validate($inputEl);
      }
    }
    function clearInput() {
      const $clicked = $(this);
      const $inputEl = $clicked.siblings('input, textarea').eq(0);
      const previousValue = $inputEl.val();
      $inputEl
        .val('')
        .trigger('input change')
        .focus()
        .trigger('input:clear', previousValue);
      app.emit('inputClear', previousValue);
    }
    $(document).on('click', '.input-clear-button', clearInput);
    $(document).on('change input', 'input, textarea, select, .item-input [contenteditable]', onChange, true);
    $(document).on('focus', 'input, textarea, select, .item-input [contenteditable]', onFocus, true);
    $(document).on('blur', 'input, textarea, select, .item-input [contenteditable]', onBlur, true);
    $(document).on('invalid', 'input, textarea, select', onInvalid, true);
  },
};

export default {
  name: 'input',
  params: {
    input: {
      scrollIntoViewOnFocus: Device.android,
      scrollIntoViewCentered: false,
      scrollIntoViewDuration: 0,
      scrollIntoViewAlways: false,
    },
  },
  create() {
    const app = this;
    Utils.extend(app, {
      input: {
        scrollIntoView: Input.scrollIntoView.bind(app),
        focus: Input.focus.bind(app),
        blur: Input.blur.bind(app),
        validate: Input.validate.bind(app),
        validateInputs: Input.validateInputs.bind(app),
        checkEmptyState: Input.checkEmptyState.bind(app),
        resizeTextarea: Input.resizeTextarea.bind(app),
        init: Input.init.bind(app),
      },
    });
  },
  on: {
    init() {
      const app = this;
      app.input.init();
    },
    tabMounted(tabEl) {
      const app = this;
      const $tabEl = $(tabEl);
      $tabEl.find('.item-input, .input').each((itemInputIndex, itemInputEl) => {
        const $itemInputEl = $(itemInputEl);
        $itemInputEl.find('input, select, textarea, [contenteditable]').each((inputIndex, inputEl) => {
          const $inputEl = $(inputEl);
          if (Input.ignoreTypes.indexOf($inputEl.attr('type')) >= 0) return;
          app.input.checkEmptyState($inputEl);
        });
      });
      $tabEl.find('textarea.resizable').each((textareaIndex, textareaEl) => {
        app.input.resizeTextarea(textareaEl);
      });
    },
    pageInit(page) {
      const app = this;
      const $pageEl = page.$el;
      $pageEl.find('.item-input, .input').each((itemInputIndex, itemInputEl) => {
        const $itemInputEl = $(itemInputEl);
        $itemInputEl.find('input, select, textarea, [contenteditable]').each((inputIndex, inputEl) => {
          const $inputEl = $(inputEl);
          if (Input.ignoreTypes.indexOf($inputEl.attr('type')) >= 0) return;
          app.input.checkEmptyState($inputEl);
        });
      });
      $pageEl.find('textarea.resizable').each((textareaIndex, textareaEl) => {
        app.input.resizeTextarea(textareaEl);
      });
    },
  },
};
