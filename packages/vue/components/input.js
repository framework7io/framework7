import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import F7Toggle from './toggle';
import F7Range from './range';
import __vueComponentDispatchEvent from '../runtime-helpers/vue-component-dispatch-event.js';
import __vueComponentProps from '../runtime-helpers/vue-component-props.js';
export default {
  name: 'f7-input',
  props: Object.assign({
    type: String,
    name: String,
    value: [String, Number, Array],
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
    inputStyle: String,
    pattern: String,
    validate: [Boolean, String],
    tabindex: [String, Number],
    resizable: Boolean,
    clearButton: Boolean,
    noFormStoreData: Boolean,
    noStoreData: Boolean,
    ignoreStoreData: Boolean,
    errorMessage: String,
    errorMessageForce: Boolean,
    info: String,
    wrap: {
      type: Boolean,
      default: true
    }
  }, Mixins.colorProps),

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
      tabindex,
      resizable,
      clearButton,
      errorMessage,
      errorMessageForce,
      info,
      wrap,
      style,
      className,
      noStoreData,
      noFormStoreData,
      ignoreStoreData
    } = props;
    let inputEl;

    const createInput = (tag, children) => {
      const InputTag = tag;
      const needsValue = type !== 'file';
      const needsType = tag === 'input';
      const inputClassName = Utils.classNames(type === 'textarea' && resizable && 'resizable', !wrap && className, (noFormStoreData || noStoreData || ignoreStoreData) && 'no-store-data', errorMessage && errorMessageForce && 'input-invalid');
      let input;
      {
        input = _h(InputTag, {
          ref: 'inputEl',
          style: inputStyle,
          class: inputClassName,
          domProps: {
            value: needsValue ? value : undefined,
            checked,
            disabled,
            readonly,
            multiple,
            required
          },
          on: {
            focus: self.onFocusBound,
            blur: self.onBlurBound,
            input: self.onInputBound,
            change: self.onChangeBound
          },
          attrs: {
            name: name,
            type: needsType ? type : undefined,
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
            'data-validate': validate === true || validate === '' ? true : undefined,
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
          change: self.onChangeBound
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
          rangeChange: self.onChangeBound
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
    } else {
      inputEl = createInput('input');
    }

    if (wrap) {
      const wrapClasses = Utils.classNames(className, 'item-input-wrap', Mixins.colorClasses(props));
      return _h('div', {
        ref: 'wrapEl',
        class: wrapClasses,
        style: style,
        attrs: {
          id: id
        }
      }, [inputEl, errorMessage && errorMessageForce && _h('div', {
        class: 'item-input-error-message'
      }, [errorMessage]), clearButton && _h('span', {
        class: 'input-clear-button'
      }), (info || slotsInfo && slotsInfo.length) && _h('div', {
        class: 'item-input-info'
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
    }
  },

  created() {
    const self = this;
    self.onFocusBound = self.onFocus.bind(self);
    self.onBlurBound = self.onBlur.bind(self);
    self.onInputBound = self.onInput.bind(self);
    self.onChangeBound = self.onChange.bind(self);
    self.onTextareaResizeBound = self.onTextareaResize.bind(self);
    self.onInputNotEmptyBound = self.onInputNotEmpty.bind(self);
    self.onInputEmptyBound = self.onInputEmpty.bind(self);
    self.onInputClearBound = self.onInputClear.bind(self);
  },

  mounted() {
    const self = this;
    self.$f7ready(f7 => {
      const {
        validate,
        resizable,
        type,
        clearButton,
        value,
        defaultValue
      } = self.props;
      if (type === 'range' || type === 'toggle') return;
      const inputEl = self.$refs.inputEl;
      if (!inputEl) return;
      inputEl.addEventListener('input:notempty', self.onInputNotEmptyBound, false);

      if (type === 'textarea' && resizable) {
        inputEl.addEventListener('textarea:resze', self.onTextareaResizeBound, false);
      }

      if (clearButton) {
        inputEl.addEventListener('input:empty', self.onInputEmptyBound, false);
        inputEl.addEventListener('input:clear', self.onInputClearBound, false);
      }

      f7.input.checkEmptyState(inputEl);

      if ((validate || validate === '') && (typeof value !== 'undefined' && value !== null && value !== '' || typeof defaultValue !== 'undefined' && defaultValue !== null && defaultValue !== '')) {
        setTimeout(() => {
          f7.input.validate(inputEl);
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
      resizable
    } = self.props;
    const f7 = self.$f7;
    if (!f7) return;

    if (self.updateInputOnDidUpdate) {
      const inputEl = self.$refs.inputEl;
      if (!inputEl) return;
      self.updateInputOnDidUpdate = false;
      f7.input.checkEmptyState(inputEl);

      if (validate) {
        f7.input.validate(inputEl);
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
    inputEl.removeEventListener('input:notempty', self.onInputNotEmptyBound, false);

    if (type === 'textarea' && resizable) {
      inputEl.removeEventListener('textarea:resze', self.onTextareaResizeBound, false);
    }

    if (clearButton) {
      inputEl.removeEventListener('input:empty', self.onInputEmptyBound, false);
      inputEl.removeEventListener('input:clear', self.onInputClearBound, false);
    }
  },

  methods: {
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

    onInput(event) {
      this.dispatchEvent('input', event);
    },

    onFocus(event) {
      this.dispatchEvent('focus', event);
    },

    onBlur(event) {
      this.dispatchEvent('blur', event);
    },

    onChange(event) {
      this.dispatchEvent('change', event);
    },

    dispatchEvent(events, ...args) {
      __vueComponentDispatchEvent(this, events, ...args);
    }

  },
  computed: {
    props() {
      return __vueComponentProps(this);
    }

  }
};