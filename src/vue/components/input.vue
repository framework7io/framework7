<script>
import { computed, ref, onMounted, onBeforeUnmount, h, watch, onUpdated } from 'vue';
import { classNames, extend, noUndefinedProps } from '../shared/utils.js';
import { colorClasses, colorProps } from '../shared/mixins.js';
import { f7ready, f7 } from '../shared/f7.js';

import f7Toggle from './toggle.js';
import f7Range from './range.js';
import f7TextEditor from './text-editor.js';

export default {
  name: 'f7-input',
  props: {
    type: String,
    name: String,
    value: {
      type: [String, Number, Array, Date, Object],
      default: undefined,
    },
    inputmode: String,
    placeholder: String,
    inputId: [String, Number],
    size: [String, Number],
    accept: [String, Number],
    autocomplete: [String],
    autocorrect: [String],
    autocapitalize: [String],
    spellcheck: [String],
    autofocus: Boolean,
    autosave: String,
    checked: Boolean,
    disabled: Boolean,
    max: [String, Number],
    min: [String, Number],
    step: [String, Number],
    maxlength: [String, Number],
    minlength: [String, Number],
    multiple: Boolean,
    readonly: Boolean,
    required: Boolean,
    inputStyle: [String, Object],
    pattern: String,
    validate: [Boolean, String],
    validateOnBlur: Boolean,
    onValidate: Function,
    tabindex: [String, Number],
    resizable: Boolean,
    clearButton: Boolean,

    // Form
    noFormStoreData: Boolean,
    noStoreData: Boolean,
    ignoreStoreData: Boolean,

    // Error, Info
    errorMessage: String,
    errorMessageForce: Boolean,
    info: String,

    // Outline
    outline: Boolean,

    // Components
    wrap: {
      type: Boolean,
      default: true,
    },
    dropdown: {
      type: [String, Boolean],
      default: 'auto',
    },

    // Datepicker
    calendarParams: Object,
    // Colorpicker
    colorPickerParams: Object,
    // Text editor
    textEditorParams: Object,
    ...colorProps,
  },
  emits: [
    'input',
    'focus',
    'blur',
    'change',
    'textarea:resize',
    'input:notempty',
    'input:empty',
    'input:clear',
    'texteditor:change',
    'calendar:change',
    'colorpicker:change',
    'update:value',
  ],
  setup(props, { emit, slots }) {
    let f7Calendar = null;
    let f7ColorPicker = null;
    const inputInvalid = ref(false);
    const inputFocused = ref(false);
    const elRef = ref(null);
    const inputElRef = ref(null);

    let updateInputOnDidUpdate = false;

    const getDomValue = () => {
      if (!inputElRef.value) return undefined;
      return inputElRef.value.value;
    };

    const domValue = ref(getDomValue());

    const inputHasValue = computed(() => {
      if (props.type === 'datepicker' && Array.isArray(props.value) && props.value.length === 0) {
        return false;
      }
      return typeof props.value === 'undefined'
        ? domValue.value || domValue.value === 0
        : props.value || props.value === 0;
    });

    const validateInput = () => {
      if (!f7 || !inputElRef.value) return;
      const validity = inputElRef.value.validity;
      if (!validity) return;
      if (!validity.valid) {
        if (props.onValidate) props.onValidate(false);
        if (inputInvalid.value !== true) {
          inputInvalid.value = true;
        }
      } else {
        if (props.onValidate) props.onValidate(true);
        if (inputInvalid.value !== false) {
          inputInvalid.value = false;
        }
      }
    };
    const onTextareaResize = (event) => {
      emit('textarea:resize', event);
    };
    const onInputNotEmpty = (event) => {
      emit('input:notempty', event);
    };
    const onInputEmpty = (event) => {
      emit('input:empty', event);
    };
    const onInputClear = (event) => {
      emit('input:clear', event);
    };
    const onInput = (...args) => {
      emit('input', ...args);
      if (inputElRef.value) {
        domValue.value = inputElRef.value.value;
      }
      if (
        !(props.validateOnBlur || props.validateOnBlur === '') &&
        (props.validate || props.validate === '') &&
        inputElRef.value
      ) {
        validateInput();
      }
      if (
        inputElRef.value &&
        props.type !== 'texteditor' &&
        props.type !== 'colorpicker' &&
        props.type !== 'datepicker'
      ) {
        emit('update:value', inputElRef.value.value);
      }
    };
    const onFocus = (...args) => {
      emit('focus', ...args);
      inputFocused.value = true;
    };
    const onBlur = (...args) => {
      emit('blur', ...args);
      if (
        (props.validate ||
          props.validate === '' ||
          props.validateOnBlur ||
          props.validateOnBlur === '') &&
        inputElRef.value
      ) {
        validateInput();
      }
      inputFocused.value = false;
    };
    const onChange = (...args) => {
      emit('change', ...args);
      if (props.type === 'texteditor') {
        emit('texteditor:change', args[1]);
        emit('update:value', args[1]);
      }
    };

    onMounted(() => {
      const {
        type,
        resizable,
        clearButton,
        value,
        calendarParams,
        colorPickerParams,
        validate,
        validateOnBlur,
      } = props;
      f7ready(() => {
        if (type === 'range' || type === 'toggle') return;

        if (!inputElRef.value) return;

        inputElRef.value.addEventListener('input:notempty', onInputNotEmpty, false);
        if (type === 'textarea' && resizable) {
          inputElRef.value.addEventListener('textarea:resize', onTextareaResize, false);
        }
        if (clearButton) {
          inputElRef.value.addEventListener('input:empty', onInputEmpty, false);
          inputElRef.value.addEventListener('input:clear', onInputClear, false);
        }

        if (type === 'datepicker') {
          f7Calendar = f7.calendar.create({
            inputEl: inputElRef.value,
            value,
            on: {
              change(calendar, calendarValue) {
                emit('calendar:change', calendarValue);
                emit('update:value', calendarValue);
              },
            },
            ...(calendarParams || {}),
          });
        }
        if (type === 'colorpicker') {
          f7ColorPicker = f7.colorPicker.create({
            inputEl: inputElRef.value,
            value,
            on: {
              change(colorPicker, colorPickerValue) {
                emit('colorpicker:change', colorPickerValue);
                emit('update:value', colorPickerValue);
              },
            },
            ...(colorPickerParams || {}),
          });
        }

        f7.input.checkEmptyState(inputElRef.value);

        if (
          !(validateOnBlur || validateOnBlur === '') &&
          (validate || validate === '') &&
          typeof value !== 'undefined' &&
          value !== null &&
          value !== ''
        ) {
          setTimeout(() => {
            validateInput();
          }, 0);
        }
        if (resizable) {
          f7.input.resizeTextarea(inputElRef.value);
        }
      });
    });

    onBeforeUnmount(() => {
      if (props.type === 'range' || props.type === 'toggle') return;

      if (!inputElRef.value) return;

      inputElRef.value.removeEventListener('input:notempty', onInputNotEmpty, false);
      if (props.type === 'textarea' && props.resizable) {
        inputElRef.value.removeEventListener('textarea:resize', onTextareaResize, false);
      }
      if (props.clearButton) {
        inputElRef.value.removeEventListener('input:empty', onInputEmpty, false);
        inputElRef.value.removeEventListener('input:clear', onInputClear, false);
      }

      if (f7Calendar && f7Calendar.destroy) {
        f7Calendar.destroy();
        f7Calendar = null;
      }
      if (f7ColorPicker && f7ColorPicker.destroy) {
        f7ColorPicker.destroy();
        f7ColorPicker = null;
      }
    });

    onUpdated(() => {
      if (!f7) return;
      if (updateInputOnDidUpdate) {
        if (!inputElRef.value) return;
        updateInputOnDidUpdate = false;
        f7.input.checkEmptyState(inputElRef.value);
        if (props.validate && !props.validateOnBlur) {
          validateInput();
        }
        if (props.resizable) {
          f7.input.resizeTextarea(inputElRef.value);
        }
      }
    });

    watch(
      () => props.colorPickerParams,
      (newValue) => {
        if (!f7 || !f7ColorPicker) return;
        extend(f7ColorPicker.params, newValue || {});
      },
    );

    watch(
      () => props.calendarParams,
      (newValue) => {
        if (!f7 || !f7Calendar) return;
        extend(f7Calendar.params, newValue || {});
      },
    );

    watch(
      () => props.value,
      (newValue) => {
        if (props.type === 'range' || props.type === 'toggle' || !f7) return;
        updateInputOnDidUpdate = true;
        if (f7Calendar) {
          f7Calendar.setValue(newValue);
        }
        if (f7ColorPicker) {
          f7ColorPicker.setValue(newValue);
        }
      },
    );

    const createInput = (InputTag, children) => {
      const needsValue =
        props.type !== 'file' && props.type !== 'datepicker' && props.type !== 'colorpicker';
      const needsType = InputTag === 'input';
      let inputType = props.type;
      if (inputType === 'datepicker' || inputType === 'colorpicker') {
        inputType = 'text';
      }
      const inputClassName = classNames({
        resizable: inputType === 'textarea' && props.resizable,
        'no-store-data': props.noFormStoreData || props.noStoreData || props.ignoreStoreData,
        'input-invalid': (props.errorMessage && props.errorMessageForce) || inputInvalid.value,
        'input-with-value': inputHasValue.value,
        'input-focused': inputFocused.value,
      });
      let inputValue;
      if (needsValue) {
        if (typeof props.value !== 'undefined') inputValue = props.value;
        else inputValue = domValue.value;
      }
      const valueProps = {};
      if (props.type !== 'datepicker' && props.type !== 'colorpicker') {
        if ('value' in props) valueProps.value = inputValue;
      }
      const inputProps = noUndefinedProps({
        name: props.name,
        type: needsType ? inputType : undefined,
        placeholder: props.placeholder,
        inputmode: props.inputmode,
        id: props.inputId,
        size: props.size,
        accept: props.accept,
        autocomplete: props.autocomplete,
        autoCorrect: props.autocorrect,
        autocapitalize: props.autocapitalize,
        spellcheck: props.spellcheck,
        autofocus: props.autofocus,
        autoSave: props.autosave,
        checked: props.checked,
        disabled: props.disabled,
        max: props.max,
        maxlength: props.maxlength,
        min: props.min,
        minlength: props.minlength,
        step: props.step,
        multiple: props.multiple,
        readonly: props.readonly,
        required: props.required,
        pattern: props.pattern,
        validate:
          typeof props.validate === 'string' && props.validate.length ? props.validate : undefined,
        tabindex: props.tabindex,
      });
      return h(
        InputTag,
        {
          ref: inputElRef,
          style: props.inputStyle,
          ...inputProps,
          'data-validate':
            props.validate === true ||
            props.validate === '' ||
            props.validateOnBlur === true ||
            props.validateOnBlur === ''
              ? true
              : undefined,
          'data-validate-on-blur':
            props.validateOnBlur === true || props.validateOnBlur === '' ? true : undefined,
          'data-error-message': props.errorMessageForce ? undefined : props.errorMessage,
          class: inputClassName,
          onFocus,
          onBlur,
          onInput,
          onChange,
          ...valueProps,
        },
        [children],
      );
    };

    const wrapClasses = computed(() =>
      classNames(
        'input',
        {
          'input-outline': props.outline,
          'input-dropdown': props.dropdown === 'auto' ? props.type === 'select' : props.dropdown,
          'input-invalid': (props.errorMessage && props.errorMessageForce) || inputInvalid.value,
        },
        colorClasses(props),
      ),
    );

    return () => {
      let inputEl;
      if (props.type === 'select' || props.type === 'textarea' || props.type === 'file') {
        if (props.type === 'select') {
          inputEl = createInput('select', slots.default && slots.default());
        } else if (props.type === 'file') {
          inputEl = createInput('input');
        } else {
          inputEl = createInput('textarea');
        }
      } else if (slots.default || !props.type) {
        inputEl = slots.default();
      } else if (props.type === 'toggle') {
        inputEl = h(f7Toggle, {
          checked: props.checked,
          readonly: props.readonly,
          name: props.name,
          value: props.value,
          disabled: props.disabled,
          id: props.inputId,
          onChange,
        });
      } else if (props.type === 'range') {
        inputEl = h(f7Range, {
          value: props.value,
          disabled: props.disabled,
          min: props.min,
          max: props.max,
          step: props.step,
          name: props.name,
          id: props.inputId,
          input: true,
          onRangeChange: onChange,
        });
      } else if (props.type === 'texteditor') {
        inputEl = h(f7TextEditor, {
          value: props.value,
          resizable: props.resizable,
          placeholder: props.placeholder,
          onTextEditorFocus: onFocus,
          onTextEditorBlur: onBlur,
          onTextEditorInput: onInput,
          onTextEditorChange: onChange,
          ...(props.textEditorParams || {}),
        });
      } else {
        inputEl = createInput('input');
      }
      if (!props.wrap) return inputEl;

      return h('div', { class: wrapClasses.value, ref: elRef }, [
        inputEl,
        (props.errorMessage || slots['error-message']) &&
          props.errorMessageForce &&
          h('div', { class: 'input-error-message' }, [
            props.errorMessage,
            slots['error-message'] && slots['error-message'](),
          ]),
        props.clearButton && h('span', { class: 'input-clear-button' }),
        (props.info || slots.info) &&
          h('div', { class: 'input-info' }, [props.info, slots.info && slots.info()]),
      ]);
    };
  },
};
</script>
