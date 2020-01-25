import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import F7Toggle from './toggle';
import F7Range from './range';
import F7TextEditor from './text-editor';
import __vueComponentTransformJSXProps from '../runtime-helpers/vue-component-transform-jsx-props.js';
import __vueComponentSetState from '../runtime-helpers/vue-component-set-state.js';
import __vueComponentDispatchEvent from '../runtime-helpers/vue-component-dispatch-event.js';
import __vueComponentProps from '../runtime-helpers/vue-component-props.js';
export default {
  name: 'f7-input',
  props: Object.assign({
    type: String,
    name: String,
    value: [String, Number, Array, Date, Object],
    defaultValue: [String, Number, Array],
    placeholder: String,
    id: [String, Number],
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
    tabindex: [String, Number],
    resizable: Boolean,
    clearButton: Boolean,
    noFormStoreData: Boolean,
    noStoreData: Boolean,
    ignoreStoreData: Boolean,
    errorMessage: String,
    errorMessageForce: Boolean,
    info: String,
    outline: Boolean,
    wrap: {
      type: Boolean,
      default: true
    },
    dropdown: {
      type: [String, Boolean],
      default: 'auto'
    },
    calendarParams: Object,
    colorPickerParams: Object,
    textEditorParams: Object
  }, Mixins.colorProps),

  data() {
    const props = __vueComponentProps(this);

    const state = (() => {
      return {
        inputFocused: false,
        inputInvalid: false
      };
    })();

    return {
      state
    };
  },

  render() {
    const _h = this.$createElement;
    const self = this;
    const props = self.props;
    const {
      type,
      name,
      value,
      defaultValue,
      placeholder,
      id,
      inputId,
      size,
      accept,
      autocomplete,
      autocorrect,
      autocapitalize,
      spellcheck,
      autofocus,
      autosave,
      checked,
      disabled,
      max,
      min,
      step,
      maxlength,
      minlength,
      multiple,
      readonly,
      required,
      inputStyle,
      pattern,
      validate,
      validateOnBlur,
      tabindex,
      resizable,
      clearButton,
      errorMessage,
      errorMessageForce,
      info,
      wrap,
      dropdown,
      style,
      className,
      noStoreData,
      noFormStoreData,
      ignoreStoreData,
      outline,
      textEditorParams
    } = props;
    const domValue = self.domValue();
    const inputHasValue = self.inputHasValue();
    let inputEl;

    const createInput = (InputTag, children) => {
      const needsValue = type !== 'file' && type !== 'datepicker' && type !== 'colorpicker';
      const needsType = InputTag === 'input';
      let inputType = type;

      if (inputType === 'datepicker' || inputType === 'colorpicker') {
        inputType = 'text';
      }

      const inputClassName = Utils.classNames(!wrap && className, {
        resizable: inputType === 'textarea' && resizable,
        'no-store-data': noFormStoreData || noStoreData || ignoreStoreData,
        'input-invalid': errorMessage && errorMessageForce || self.state.inputInvalid,
        'input-with-value': inputHasValue,
        'input-focused': self.state.inputFocused
      });
      let input;
      let inputValue;

      if (needsValue) {
        if (typeof value !== 'undefined') inputValue = value;else inputValue = domValue;
      }

      const valueProps = {};

      if (type !== 'datepicker' && type !== 'colorpicker') {
        if ('value' in props) valueProps.value = inputValue;
        if ('defaultValue' in props) valueProps.defaultValue = defaultValue;
      }

      {
        input = _h(InputTag, {
          ref: 'inputEl',
          style: inputStyle,
          class: inputClassName,
          domProps: Object.assign({
            checked,
            disabled,
            readOnly: readonly,
            multiple,
            required
          }, valueProps),
          on: {
            focus: self.onFocus,
            blur: self.onBlur,
            input: self.onInput,
            change: self.onChange
          },
          attrs: {
            name: name,
            type: needsType ? inputType : undefined,
            placeholder: placeholder,
            id: inputId,
            size: size,
            accept: accept,
            autocomplete: autocomplete,
            autocorrect: autocorrect,
            autocapitalize: autocapitalize,
            spellcheck: spellcheck,
            autofocus: autofocus,
            autoSave: autosave,
            max: max,
            maxlength: maxlength,
            min: min,
            minlength: minlength,
            step: step,
            pattern: pattern,
            validate: typeof validate === 'string' && validate.length ? validate : undefined,
            'data-validate': validate === true || validate === '' || validateOnBlur === true || validateOnBlur === '' ? true : undefined,
            'data-validate-on-blur': validateOnBlur === true || validateOnBlur === '' ? true : undefined,
            tabindex: tabindex,
            'data-error-message': errorMessageForce ? undefined : errorMessage
          }
        }, [children]);
      }
      return input;
    };

    const {
      default: slotsDefault,
      info: slotsInfo
    } = self.$slots;

    if (type === 'select' || type === 'textarea' || type === 'file') {
      if (type === 'select') {
        inputEl = createInput('select', slotsDefault);
      } else if (type === 'file') {
        inputEl = createInput('input');
      } else {
        inputEl = createInput('textarea');
      }
    } else if (slotsDefault && slotsDefault.length > 0 || !type) {
      inputEl = slotsDefault;
    } else if (type === 'toggle') {
      inputEl = _h(F7Toggle, {
        on: {
          change: self.onChange
        },
        attrs: {
          checked: checked,
          readonly: readonly,
          name: name,
          value: value,
          disabled: disabled,
          id: inputId
        }
      });
    } else if (type === 'range') {
      inputEl = _h(F7Range, {
        on: {
          rangeChange: self.onChange
        },
        attrs: {
          value: value,
          disabled: disabled,
          min: min,
          max: max,
          step: step,
          name: name,
          id: inputId,
          input: true
        }
      });
    } else if (type === 'texteditor') {
      inputEl = _h(F7TextEditor, __vueComponentTransformJSXProps(Object.assign({}, textEditorParams, {
        on: {
          textEditorFocus: self.onFocus,
          textEditorBlur: self.onBlur,
          textEditorInput: self.onInput,
          textEditorChange: self.onChange
        },
        attrs: {
          value: value,
          resizable: resizable,
          placeholder: placeholder
        }
      })));
    } else {
      inputEl = createInput('input');
    }

    if (wrap) {
      const wrapClasses = Utils.classNames(className, 'input', {
        'input-outline': outline,
        'input-dropdown': dropdown === 'auto' ? type === 'select' : dropdown
      }, Mixins.colorClasses(props));
      return _h('div', {
        class: wrapClasses,
        style: style,
        attrs: {
          id: id
        }
      }, [inputEl, errorMessage && errorMessageForce && _h('div', {
        class: 'input-error-message'
      }, [errorMessage]), clearButton && _h('span', {
        class: 'input-clear-button'
      }), (info || slotsInfo && slotsInfo.length) && _h('div', {
        class: 'input-info'
      }, [info, this.$slots['info']])]);
    }

    return inputEl;
  },

  watch: {
    'props.value': function watchValue() {
      const self = this;
      const {
        type
      } = self.props;
      if (type === 'range' || type === 'toggle') return;
      if (!self.$f7) return;
      self.updateInputOnDidUpdate = true;

      if (self.f7Calendar) {
        self.f7Calendar.setValue(self.props.value);
      }

      if (self.f7ColorPicker) {
        self.f7ColorPicker.setValue(self.props.value);
      }
    }
  },

  created() {
    Utils.bindMethods(this, 'onFocus onBlur onInput onChange onTextareaResize onInputNotEmpty onInputEmpty onInputClear'.split(' '));
  },

  mounted() {
    const self = this;
    self.$f7ready(f7 => {
      const {
        validate,
        validateOnBlur,
        resizable,
        type,
        clearButton,
        value,
        defaultValue,
        calendarParams,
        colorPickerParams
      } = self.props;
      if (type === 'range' || type === 'toggle') return;
      const inputEl = self.$refs.inputEl;
      if (!inputEl) return;
      inputEl.addEventListener('input:notempty', self.onInputNotEmpty, false);

      if (type === 'textarea' && resizable) {
        inputEl.addEventListener('textarea:resize', self.onTextareaResize, false);
      }

      if (clearButton) {
        inputEl.addEventListener('input:empty', self.onInputEmpty, false);
        inputEl.addEventListener('input:clear', self.onInputClear, false);
      }

      if (type === 'datepicker') {
        self.f7Calendar = f7.calendar.create(Object.assign({
          inputEl,
          value,
          on: {
            change(calendar, calendarValue) {
              self.dispatchEvent('calendar:change calendarChange', calendarValue);
            }

          }
        }, calendarParams || {}));
      }

      if (type === 'colorpicker') {
        self.f7ColorPicker = f7.colorPicker.create(Object.assign({
          inputEl,
          value,
          on: {
            change(colorPicker, colorPickerValue) {
              self.dispatchEvent('colorpicker:change colorPickerChange', colorPickerValue);
            }

          }
        }, colorPickerParams || {}));
      }

      f7.input.checkEmptyState(inputEl);

      if (!(validateOnBlur || validateOnBlur === '') && (validate || validate === '') && (typeof value !== 'undefined' && value !== null && value !== '' || typeof defaultValue !== 'undefined' && defaultValue !== null && defaultValue !== '')) {
        setTimeout(() => {
          self.validateInput(inputEl);
        }, 0);
      }

      if (resizable) {
        f7.input.resizeTextarea(inputEl);
      }
    });
  },

  updated() {
    const self = this;
    const {
      validate,
      validateOnBlur,
      resizable
    } = self.props;
    const f7 = self.$f7;
    if (!f7) return;

    if (self.updateInputOnDidUpdate) {
      const inputEl = self.$refs.inputEl;
      if (!inputEl) return;
      self.updateInputOnDidUpdate = false;
      f7.input.checkEmptyState(inputEl);

      if (validate && !validateOnBlur) {
        self.validateInput(inputEl);
      }

      if (resizable) {
        f7.input.resizeTextarea(inputEl);
      }
    }
  },

  beforeDestroy() {
    const self = this;
    const {
      type,
      resizable,
      clearButton
    } = self.props;
    if (type === 'range' || type === 'toggle') return;
    const inputEl = self.$refs.inputEl;
    if (!inputEl) return;
    inputEl.removeEventListener('input:notempty', self.onInputNotEmpty, false);

    if (type === 'textarea' && resizable) {
      inputEl.removeEventListener('textarea:resize', self.onTextareaResize, false);
    }

    if (clearButton) {
      inputEl.removeEventListener('input:empty', self.onInputEmpty, false);
      inputEl.removeEventListener('input:clear', self.onInputClear, false);
    }

    if (self.f7Calendar && self.f7Calendar.destroy) {
      self.f7Calendar.destroy();
    }

    if (self.f7ColorPicker && self.f7ColorPicker.destroy) {
      self.f7ColorPicker.destroy();
    }

    delete self.f7Calendar;
    delete self.f7ColorPicker;
  },

  methods: {
    domValue() {
      const self = this;
      const {
        inputEl
      } = self.$refs;
      if (!inputEl) return undefined;
      return inputEl.value;
    },

    inputHasValue() {
      const self = this;
      const {
        value,
        type
      } = self.props;

      if (type === 'datepicker' && Array.isArray(value) && value.length === 0) {
        return false;
      }

      const domValue = self.domValue();
      return typeof value === 'undefined' ? domValue || domValue === 0 : value || value === 0;
    },

    validateInput(inputEl) {
      const self = this;
      const f7 = self.$f7;
      if (!f7 || !inputEl) return;
      const validity = inputEl.validity;
      if (!validity) return;

      if (!validity.valid) {
        if (self.state.inputInvalid !== true) {
          self.setState({
            inputInvalid: true
          });
        }
      } else if (self.state.inputInvalid !== false) {
        self.setState({
          inputInvalid: false
        });
      }
    },

    onTextareaResize(event) {
      this.dispatchEvent('textarea:resize textareaResize', event);
    },

    onInputNotEmpty(event) {
      this.dispatchEvent('input:notempty inputNotEmpty', event);
    },

    onInputEmpty(event) {
      this.dispatchEvent('input:empty inputEmpty', event);
    },

    onInputClear(event) {
      this.dispatchEvent('input:clear inputClear', event);
    },

    onInput(...args) {
      const self = this;
      const {
        validate,
        validateOnBlur
      } = self.props;
      self.dispatchEvent('input', ...args);

      if (!(validateOnBlur || validateOnBlur === '') && (validate || validate === '') && self.$refs && self.$refs.inputEl) {
        self.validateInput(self.$refs.inputEl);
      }
    },

    onFocus(...args) {
      this.dispatchEvent('focus', ...args);
      this.setState({
        inputFocused: true
      });
    },

    onBlur(...args) {
      const self = this;
      const {
        validate,
        validateOnBlur
      } = self.props;
      self.dispatchEvent('blur', ...args);

      if ((validate || validate === '' || validateOnBlur || validateOnBlur === '') && self.$refs && self.$refs.inputEl) {
        self.validateInput(self.$refs.inputEl);
      }

      self.setState({
        inputFocused: false
      });
    },

    onChange(...args) {
      this.dispatchEvent('change', ...args);

      if (this.props.type === 'texteditor') {
        this.dispatchEvent('texteditor:change textEditorChange', args[1]);
      }
    },

    dispatchEvent(events, ...args) {
      __vueComponentDispatchEvent(this, events, ...args);
    },

    setState(updater, callback) {
      __vueComponentSetState(this, updater, callback);
    }

  },
  computed: {
    props() {
      return __vueComponentProps(this);
    }

  }
};