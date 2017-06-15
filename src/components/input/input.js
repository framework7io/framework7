import $ from 'dom7';
import Utils from '../../utils/utils';

const Input = {
  ignoreTypes: ['checkbox', 'button', 'submit', 'range', 'radio', 'image'],
  validate(inputEl) {
    const $inputEl = $(inputEl);
    if (!$inputEl.length) return;
    const $itemInputEl = $inputEl.parents('.item-input');
    const validity = $inputEl[0].validity;
    const validationMessage = $inputEl.dataset().errotMessage || $inputEl[0].validationMessage;
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
      $itemInputEl.addClass('item-input-invalid-state');
      $inputEl.addClass('input-invalid-state');
    } else {
      $itemInputEl.removeClass('item-input-invalid-state item-input-with-error-message');
      $inputEl.removeClass('input-invalid-state');
    }
  },
  validateInputs(el) {
    $(el).find('input, textarea, select').each((index, inputEl) => {
      Input.valudate(inputEl);
    });
  },
  focus(inputEl) {
    const $inputEl = $(inputEl);
    const type = $inputEl.attr('type');
    if (Input.ignoreTypes.indexOf(type) >= 0) return;
    const $itemInputEl = $inputEl.parents('.item-input');
    $itemInputEl.addClass('item-input-focused-state');
  },
  blur(inputEl) {
    $(inputEl).parents('.item-input').removeClass('item-input-focused-state');
  },
  checkEmptyState(inputEl) {
    const $inputEl = $(inputEl);
    const value = $inputEl.val();
    const $itemInputEl = $inputEl.parents('.item-input');
    if ((value && (typeof value === 'string' && value.trim() !== '')) || (Array.isArray(value) && value.length > 0)) {
      $itemInputEl.addClass('item-input-not-empty');
    } else {
      $itemInputEl.removeClass('item-input-not-empty');
    }
  },
  init() {
    function onFocus() {
      Input.focus(this);
    }
    function onBlur() {
      Input.blur(this);
    }
    function onChange() {
      const $inputEl = $(this);
      const type = $inputEl.attr('type');
      if (Input.ignoreTypes.indexOf(type) >= 0) return;

      // Check Empty State
      Input.checkEmptyState($inputEl);

      // Check validation
      if ($inputEl.dataset().validate || $inputEl.attr('validate') !== null) {
        Input.validate($inputEl);
      }
    }
    $(document).on('change input', 'input, textarea, select', onChange, true);
    $(document).on('focus', 'input, textarea, select', onFocus, true);
    $(document).on('blur', 'input, textarea, select', onBlur, true);
  },
};

export default {
  name: 'input',
  create() {
    const app = this;
    Utils.extend(app, {
      input: {
        focus: Input.focus,
        blur: Input.blur,
        validate: Input.validate,
        validateInputs: Input.validate,
        checkEmptyState: Input.checkEmptyState,
      },
    });
  },
  on: {
    init() {
      Input.init();
    },
    pageInit(page) {
      const $pageEl = page.$el;
      $pageEl.find('.item-input').each((itemInputIndex, itemInputEl) => {
        const $itemInputEl = $(itemInputEl);
        $itemInputEl.find('input, select, textarea').each((inputIndex, inputEl) => {
          const $inputEl = $(inputEl);
          if (Input.ignoreTypes.indexOf($inputEl.attr('type')) >= 0) return;
          Input.checkEmptyState($inputEl);
        });
      });
    },
  },
};
