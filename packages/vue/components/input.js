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
  data: function data() {
    var props = __vueComponentProps(this);

    var state = function () {
      return {
        inputFocused: false,
        inputInvalid: false
      };
    }();

    return {
      state: state
    };
  },
  render: function render() {
    var _h = this.$createElement;
    var self = this;
    var props = self.props;
    var type = props.type,
        name = props.name,
        value = props.value,
        defaultValue = props.defaultValue,
        placeholder = props.placeholder,
        id = props.id,
        inputId = props.inputId,
        size = props.size,
        accept = props.accept,
        autocomplete = props.autocomplete,
        autocorrect = props.autocorrect,
        autocapitalize = props.autocapitalize,
        spellcheck = props.spellcheck,
        autofocus = props.autofocus,
        autosave = props.autosave,
        checked = props.checked,
        disabled = props.disabled,
        max = props.max,
        min = props.min,
        step = props.step,
        maxlength = props.maxlength,
        minlength = props.minlength,
        multiple = props.multiple,
        readonly = props.readonly,
        required = props.required,
        inputStyle = props.inputStyle,
        pattern = props.pattern,
        validate = props.validate,
        validateOnBlur = props.validateOnBlur,
        tabindex = props.tabindex,
        resizable = props.resizable,
        clearButton = props.clearButton,
        errorMessage = props.errorMessage,
        errorMessageForce = props.errorMessageForce,
        info = props.info,
        wrap = props.wrap,
        dropdown = props.dropdown,
        style = props.style,
        className = props.className,
        noStoreData = props.noStoreData,
        noFormStoreData = props.noFormStoreData,
        ignoreStoreData = props.ignoreStoreData,
        outline = props.outline,
        textEditorParams = props.textEditorParams;
    var domValue = self.domValue();
    var inputHasValue = self.inputHasValue();
    var inputEl;

    var createInput = function createInput(InputTag, children) {
      var needsValue = type !== 'file' && type !== 'datepicker' && type !== 'colorpicker';
      var needsType = InputTag === 'input';
      var inputType = type;

      if (inputType === 'datepicker' || inputType === 'colorpicker') {
        inputType = 'text';
      }

      var inputClassName = Utils.classNames(!wrap && className, {
        resizable: inputType === 'textarea' && resizable,
        'no-store-data': noFormStoreData || noStoreData || ignoreStoreData,
        'input-invalid': errorMessage && errorMessageForce || self.state.inputInvalid,
        'input-with-value': inputHasValue,
        'input-focused': self.state.inputFocused
      });
      var input;
      var inputValue;

      if (needsValue) {
        if (typeof value !== 'undefined') inputValue = value;else inputValue = domValue;
      }

      var valueProps = {};

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
            checked: checked,
            disabled: disabled,
            readOnly: readonly,
            multiple: multiple,
            required: required
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

    var _self$$slots = self.$slots,
        slotsDefault = _self$$slots.default,
        slotsInfo = _self$$slots.info;

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
      var wrapClasses = Utils.classNames(className, 'input', {
        'input-outline': outline,
        'input-dropdown': dropdown === 'auto' ? type === 'select' : dropdown
      }, Mixins.colorClasses(props));
      return _h('div', {
        ref: 'wrapEl',
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
      var self = this;
      var type = self.props.type;
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
  created: function created() {
    Utils.bindMethods(this, 'onFocus onBlur onInput onChange onTextareaResize onInputNotEmpty onInputEmpty onInputClear'.split(' '));
  },
  mounted: function mounted() {
    var self = this;
    self.$f7ready(function (f7) {
      var _self$props = self.props,
          validate = _self$props.validate,
          validateOnBlur = _self$props.validateOnBlur,
          resizable = _self$props.resizable,
          type = _self$props.type,
          clearButton = _self$props.clearButton,
          value = _self$props.value,
          defaultValue = _self$props.defaultValue,
          calendarParams = _self$props.calendarParams,
          colorPickerParams = _self$props.colorPickerParams;
      if (type === 'range' || type === 'toggle') return;
      var inputEl = self.$refs.inputEl;
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
          inputEl: inputEl,
          value: value,
          on: {
            change: function change(calendar, calendarValue) {
              self.dispatchEvent('calendar:change calendarChange', calendarValue);
            }
          }
        }, calendarParams || {}));
      }

      if (type === 'colorpicker') {
        self.f7ColorPicker = f7.colorPicker.create(Object.assign({
          inputEl: inputEl,
          value: value,
          on: {
            change: function change(colorPicker, colorPickerValue) {
              self.dispatchEvent('colorpicker:change colorPickerChange', colorPickerValue);
            }
          }
        }, colorPickerParams || {}));
      }

      f7.input.checkEmptyState(inputEl);

      if (!(validateOnBlur || validateOnBlur === '') && (validate || validate === '') && (typeof value !== 'undefined' && value !== null && value !== '' || typeof defaultValue !== 'undefined' && defaultValue !== null && defaultValue !== '')) {
        setTimeout(function () {
          self.validateInput(inputEl);
        }, 0);
      }

      if (resizable) {
        f7.input.resizeTextarea(inputEl);
      }
    });
  },
  updated: function updated() {
    var self = this;
    var _self$props2 = self.props,
        validate = _self$props2.validate,
        validateOnBlur = _self$props2.validateOnBlur,
        resizable = _self$props2.resizable;
    var f7 = self.$f7;
    if (!f7) return;

    if (self.updateInputOnDidUpdate) {
      var inputEl = self.$refs.inputEl;
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
  beforeDestroy: function beforeDestroy() {
    var self = this;
    var _self$props3 = self.props,
        type = _self$props3.type,
        resizable = _self$props3.resizable,
        clearButton = _self$props3.clearButton;
    if (type === 'range' || type === 'toggle') return;
    var inputEl = self.$refs.inputEl;
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
    domValue: function domValue() {
      var self = this;
      var inputEl = self.$refs.inputEl;
      if (!inputEl) return undefined;
      return inputEl.value;
    },
    inputHasValue: function inputHasValue() {
      var self = this;
      var _self$props4 = self.props,
          value = _self$props4.value,
          type = _self$props4.type;

      if (type === 'datepicker' && Array.isArray(value) && value.length === 0) {
        return false;
      }

      var domValue = self.domValue();
      return typeof value === 'undefined' ? domValue || domValue === 0 : value || value === 0;
    },
    validateInput: function validateInput(inputEl) {
      var self = this;
      var f7 = self.$f7;
      if (!f7 || !inputEl) return;
      var validity = inputEl.validity;
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
    onTextareaResize: function onTextareaResize(event) {
      this.dispatchEvent('textarea:resize textareaResize', event);
    },
    onInputNotEmpty: function onInputNotEmpty(event) {
      this.dispatchEvent('input:notempty inputNotEmpty', event);
    },
    onInputEmpty: function onInputEmpty(event) {
      this.dispatchEvent('input:empty inputEmpty', event);
    },
    onInputClear: function onInputClear(event) {
      this.dispatchEvent('input:clear inputClear', event);
    },
    onInput: function onInput() {
      var self = this;
      var _self$props5 = self.props,
          validate = _self$props5.validate,
          validateOnBlur = _self$props5.validateOnBlur;

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      self.dispatchEvent.apply(self, ['input'].concat(args));

      if (!(validateOnBlur || validateOnBlur === '') && (validate || validate === '') && self.$refs && self.$refs.inputEl) {
        self.validateInput(self.$refs.inputEl);
      }
    },
    onFocus: function onFocus() {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      this.dispatchEvent.apply(this, ['focus'].concat(args));
      this.setState({
        inputFocused: true
      });
    },
    onBlur: function onBlur() {
      var self = this;
      var _self$props6 = self.props,
          validate = _self$props6.validate,
          validateOnBlur = _self$props6.validateOnBlur;

      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      self.dispatchEvent.apply(self, ['blur'].concat(args));

      if ((validate || validate === '' || validateOnBlur || validateOnBlur === '') && self.$refs && self.$refs.inputEl) {
        self.validateInput(self.$refs.inputEl);
      }

      self.setState({
        inputFocused: false
      });
    },
    onChange: function onChange() {
      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }

      this.dispatchEvent.apply(this, ['change'].concat(args));

      if (this.props.type === 'texteditor') {
        this.dispatchEvent('texteditor:change textEditorChange', args[1]);
      }
    },
    dispatchEvent: function dispatchEvent(events) {
      for (var _len5 = arguments.length, args = new Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
        args[_key5 - 1] = arguments[_key5];
      }

      __vueComponentDispatchEvent.apply(void 0, [this, events].concat(args));
    },
    setState: function setState(updater, callback) {
      __vueComponentSetState(this, updater, callback);
    }
  },
  computed: {
    props: function props() {
      return __vueComponentProps(this);
    }
  }
};