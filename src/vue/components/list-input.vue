<script>
import { computed, h, ref, onMounted, onBeforeUnmount, watch, inject, onUpdated } from 'vue';
import { classNames, extend, noUndefinedProps } from '../shared/utils.js';
import { colorClasses, colorProps } from '../shared/mixins.js';
import { f7ready, f7 } from '../shared/f7.js';

import f7TextEditor from './text-editor.js';

export default {
  name: 'f7-list-input',
  props: {
    sortable: {
      type: Boolean,
      default: undefined,
    },
    media: String,
    dropdown: {
      type: [String, Boolean],
      default: 'auto',
    },
    wrap: {
      type: Boolean,
      default: true,
    },

    // Inputs
    input: {
      type: Boolean,
      default: true,
    },
    type: {
      type: String,
      default: 'text',
    },
    name: String,
    value: {
      type: [String, Number, Array, Date, Object],
      default: undefined,
    },
    inputmode: String,
    readonly: Boolean,
    required: Boolean,
    disabled: Boolean,
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
    max: [String, Number],
    min: [String, Number],
    step: [String, Number],
    maxlength: [String, Number],
    minlength: [String, Number],
    multiple: Boolean,
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

    // Label
    label: [String, Number],
    floatingLabel: Boolean,

    // Datepicker
    calendarParams: Object,
    // Colorpicker
    colorPickerParams: Object,
    // Text editor
    textEditorParams: Object,
    ...colorProps,
  },
  emits: [
    'textarea:resize',
    'input:notempty',
    'input:empty',
    'input:clear',
    'texteditor:change',
    'calendar:change',
    'colorpicker:change',
    'change',
    'focus',
    'blur',
    'input',
    'update:value',
  ],
  setup(props, { emit, slots }) {
    const inputInvalid = ref(false);
    const inputFocused = ref(false);

    const ListContext = inject('ListContext', {
      value: {
        listIsMedia: false,
        listIsSortable: false,
        listIsSortableOpposite: false,
        listIsSimple: false,
      },
    });

    let f7Calendar = null;
    let f7ColorPicker = null;
    const elRef = ref(null);
    const inputElRef = ref(null);
    const itemContentElRef = ref(null);
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
        validateInput(inputElRef.value);
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
        validateInput(inputElRef.value);
      }
      inputFocused.value = false;
    };
    const onChange = (...args) => {
      emit('change', ...args);
      if (props.type === 'texteditor') {
        emit('texteditor:change', args[0]);
        emit('update:value', args[0]);
      }
    };

    onMounted(() => {
      if (!elRef.value && !itemContentElRef.value) return;

      f7ready(() => {
        if (!inputElRef.value) return;

        inputElRef.value.addEventListener('input:notempty', onInputNotEmpty, false);
        inputElRef.value.addEventListener('textarea:resize', onTextareaResize, false);
        inputElRef.value.addEventListener('input:empty', onInputEmpty, false);
        inputElRef.value.addEventListener('input:clear', onInputClear, false);

        if (props.type === 'datepicker') {
          f7Calendar = f7.calendar.create({
            inputEl: inputElRef.value,
            value: props.value,
            on: {
              change(calendar, calendarValue) {
                emit('update:value', calendarValue);
                emit('calendar:change', calendarValue);
              },
            },
            ...(props.calendarParams || {}),
          });
        }
        if (props.type === 'colorpicker') {
          f7ColorPicker = f7.colorPicker.create({
            inputEl: inputElRef.value,
            value: props.value,
            on: {
              change(colorPicker, colorPickerValue) {
                emit('update:value', colorPickerValue);
                emit('colorpicker:change', colorPickerValue);
              },
            },
            ...(props.colorPickerParams || {}),
          });
        }
        if (
          !(props.validateOnBlur || props.validateOnBlur === '') &&
          (props.validate || props.validate === '') &&
          typeof props.value !== 'undefined' &&
          props.value !== null &&
          props.value !== ''
        ) {
          setTimeout(() => {
            validateInput();
          }, 0);
        }
        if (props.type === 'textarea' && props.resizable) {
          f7.input.resizeTextarea(inputElRef.value);
        }
      });
    });

    onBeforeUnmount(() => {
      if (inputElRef.value) {
        inputElRef.value.removeEventListener('input:notempty', onInputNotEmpty, false);
        inputElRef.value.removeEventListener('textarea:resize', onTextareaResize, false);
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
        if (props.validate && !props.validateOnBlur) {
          validateInput();
        }
        if (props.type === 'textarea' && props.resizable) {
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
        if (!f7) return;
        updateInputOnDidUpdate = true;
        if (f7Calendar) {
          f7Calendar.setValue(newValue);
        }
        if (f7ColorPicker) {
          f7ColorPicker.setValue(newValue);
        }
      },
    );

    const isSortableComputed = computed(() =>
      props.sortable === true || props.sortable === false
        ? props.sortable
        : ListContext.value.listIsSortable || false,
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
        autocorrect: props.autocorrect,
        autocapitalize: props.autocapitalize,
        spellcheck: props.spellcheck,
        autofocus: props.autofocus,
        autosave: props.autosave,
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

    return () => {
      let inputEl;
      if (props.input) {
        if (props.type === 'select' || props.type === 'textarea' || props.type === 'file') {
          if (props.type === 'select') {
            inputEl = createInput('select', slots.default && slots.default());
          } else if (props.type === 'file') {
            inputEl = createInput('input');
          } else {
            inputEl = createInput('textarea');
          }
        } else if (props.type === 'texteditor') {
          inputEl = h(f7TextEditor, {
            value: props.value,
            resizable: props.resizable,
            placeholder: props.placeholder,
            onTexteditorFocus: onFocus,
            onTexteditorBlur: onBlur,
            onTexteditorInput: onInput,
            onTexteditorChange: onChange,
            ...(props.textEditorParams || {}),
          });
        } else {
          inputEl = createInput('input');
        }
      }
      const hasErrorMessage = !!props.errorMessage || slots['error-message'];
      const ItemContent = h(
        'div',
        {
          ref: itemContentElRef,
          class: classNames(
            'item-content item-input',
            !props.wrap && { disabled: props.disabled },
            !props.wrap && colorClasses(props),
            {
              'item-input-outline': props.outline,
              'item-input-focused': inputFocused.value,
              'item-input-with-info': !!props.info || slots.info,
              'item-input-with-value': inputHasValue.value,
              'item-input-with-error-message':
                (hasErrorMessage && props.errorMessageForce) || inputInvalid.value,
              'item-input-invalid':
                (hasErrorMessage && props.errorMessageForce) || inputInvalid.value,
            },
          ),
        },
        [
          slots['content-start'] && slots['content-start'](),
          (props.media || slots.media) &&
            h('div', { class: 'item-media' }, [
              props.media && h('img', { src: props.media }),
              slots.media && slots.media(),
            ]),
          h('div', { class: 'item-inner' }, [
            slots['inner-start'] && slots['inner-start'](),
            (props.label || slots.label) &&
              h(
                'div',
                {
                  class: classNames('item-title item-label', {
                    'item-floating-label': props.floatingLabel,
                  }),
                },
                [props.label, slots.label && slots.label()],
              ),
            h(
              'div',
              {
                class: classNames('item-input-wrap', {
                  'input-dropdown':
                    props.dropdown === 'auto' ? props.type === 'select' : props.dropdown,
                }),
              },
              [
                inputEl,
                slots.input && slots.input(),
                hasErrorMessage &&
                  props.errorMessageForce &&
                  h('div', { class: 'item-input-error-message' }, [
                    props.errorMessage,
                    slots['error-message'] && slots['error-message'](),
                  ]),
                props.clearButton && h('span', { class: 'input-clear-button' }),
                (props.info || slots.info) &&
                  h('div', { class: 'item-input-info' }, [props.info, slots.info && slots.info()]),
              ],
            ),
            slots.inner && slots.inner(),
            slots['inner-end'] && slots['inner-end'](),
          ]),
          slots.content && slots.content(),
          slots['content-end'] && slots['content-end'](),
        ],
      );
      if (!props.wrap) return ItemContent;

      return h(
        'li',
        { ref: elRef, class: classNames({ disabled: props.disabled }, colorClasses(props)) },
        [
          slots['root-start'] && slots['root-start'](),
          ItemContent,
          isSortableComputed.value && h('div', { class: 'sortable-handler' }),
          slots.root && slots.root(),
          slots['root-end'] && slots['root-end'](),
        ],
      );
    };
  },
};
</script>
