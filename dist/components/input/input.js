import $ from 'dom7';
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
    ('padding margin width font-size font-family font-style font-weight line-height font-variant text-transform letter-spacing border box-sizing display').split(' ').forEach((style) => {
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
        $textareaEl.trigger('textarea:resize', initialHeight, currentHeight, scrollHeight);
      } else if (scrollHeight < currentHeight) {
        $textareaEl.css('height', '');
        $textareaEl.trigger('textarea:resize', initialHeight, currentHeight, initialHeight);
      }
    }
  },
  validate(inputEl) {
    const $inputEl = $(inputEl);
    if (!$inputEl.length) return;
    const $itemInputEl = $inputEl.parents('.item-input');
    const validity = $inputEl[0].validity;
    const validationMessage = $inputEl.dataset().errorMessage || $inputEl[0].validationMessage || '';
    if (!validity) return;
    if (!validity.valid) {
      let $errorEl = $inputEl.nextAll('.item-input-error-message');
      if (validationMessage) {
        if ($errorEl.length === 0) {
          $errorEl = $('<div class="item-input-error-message"></div>');
          $errorEl.insertAfter($inputEl);
        }
        $errorEl.text(validationMessage);
      }
      if ($errorEl.length > 0) {
        $itemInputEl.addClass('item-input-with-error-message');
      }
      $itemInputEl.addClass('item-input-invalid');
      $inputEl.addClass('input-invalid');
    } else {
      $itemInputEl.removeClass('item-input-invalid item-input-with-error-message');
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
    const $itemInputEl = $inputEl.parents('.item-input');
    $itemInputEl.addClass('item-input-focused');
    $inputEl.addClass('input-focused');
  },
  blur(inputEl) {
    $(inputEl).parents('.item-input').removeClass('item-input-focused');
    $(inputEl).removeClass('input-focused');
  },
  checkEmptyState(inputEl) {
    const $inputEl = $(inputEl);
    const value = $inputEl.val();
    const $itemInputEl = $inputEl.parents('.item-input');
    if ((value && (typeof value === 'string' && value.trim() !== '')) || (Array.isArray(value) && value.length > 0)) {
      $itemInputEl.addClass('item-input-with-value');
      $inputEl.addClass('input-with-value');
      $inputEl.trigger('input:notempty');
    } else {
      $itemInputEl.removeClass('item-input-with-value');
      $inputEl.removeClass('input-with-value');
      $inputEl.trigger('input:empty');
    }
  },
  scrollIntoView(inputEl, duration = 0, centered) {
    const $inputEl = $(inputEl);
    const $scrollableEl = $inputEl.parents('.page-content, .panel').eq(0);
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
    } else if (contentScrollTop < max) {
      $scrollableEl.scrollTop(centered ? centeredPosition : max, duration);
      return true;
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
              app.input.scrollIntoView(inputEl, app.params.input.scrollIntoViewCentered);
            }
          });
        } else {
          app.input.scrollIntoView(inputEl, app.params.input.scrollIntoViewCentered);
        }
      }
      app.input.focus(inputEl);
    }
    function onBlur() {
      const $inputEl = $(this);
      const tag = $inputEl[0].nodeName.toLowerCase();
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
      const $inputEl = $(this);
      const type = $inputEl.attr('type');
      const tag = $inputEl[0].nodeName.toLowerCase();
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
      const $inputEl = $(this);
      if ($inputEl.dataset().validate || $inputEl.attr('validate') !== null) {
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
        .trigger('change')
        .focus()
        .trigger('input:clear', previousValue);
    }
    $(document).on('click', '.input-clear-button', clearInput);
    $(document).on('change input', 'input, textarea, select', onChange, true);
    $(document).on('focus', 'input, textarea, select', onFocus, true);
    $(document).on('blur', 'input, textarea, select', onBlur, true);
    $(document).on('invalid', 'input, textarea, select', onInvalid, true);
  },
};

export default {
  name: 'input',
  params: {
    input: {
      scrollIntoViewOnFocus: Device.android,
      scrollIntoViewCentered: false,
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
        validateInputs: Input.validate.bind(app),
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
      $tabEl.find('.item-input').each((itemInputIndex, itemInputEl) => {
        const $itemInputEl = $(itemInputEl);
        $itemInputEl.find('input, select, textarea').each((inputIndex, inputEl) => {
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
      $pageEl.find('.item-input').each((itemInputIndex, itemInputEl) => {
        const $itemInputEl = $(itemInputEl);
        $itemInputEl.find('input, select, textarea').each((inputIndex, inputEl) => {
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
