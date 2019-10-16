import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import F7TextEditor from './text-editor';
import __vueComponentTransformJSXProps from '../runtime-helpers/vue-component-transform-jsx-props.js';
import __vueComponentSetState from '../runtime-helpers/vue-component-set-state.js';
import __vueComponentDispatchEvent from '../runtime-helpers/vue-component-dispatch-event.js';
import __vueComponentProps from '../runtime-helpers/vue-component-props.js';
export default {
  name: 'f7-list-input',
  props: Object.assign({
    id: [String, Number],
    sortable: {
      type: Boolean,
      default: undefined
    },
    media: String,
    dropdown: {
      type: [String, Boolean],
      default: 'auto'
    },
    wrap: {
      type: Boolean,
      default: true
    },
    input: {
      type: Boolean,
      default: true
    },
    type: {
      type: String,
      default: 'text'
    },
    name: String,
    value: [String, Number, Array, Date, Object],
    defaultValue: [String, Number, Array],
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
    label: [String, Number],
    inlineLabel: Boolean,
    floatingLabel: Boolean,
    calendarParams: Object,
    colorPickerParams: Object,
    textEditorParams: Object
  }, Mixins.colorProps),
  data: function data() {
    var props = __vueComponentProps(this);

    var state = function () {
      return {
        isSortable: props.sortable,
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
    var _self$state = self.state,
        inputFocused = _self$state.inputFocused,
        inputInvalid = _self$state.inputInvalid;
    var props = self.props;
    var id = props.id,
        style = props.style,
        className = props.className,
        sortable = props.sortable,
        media = props.media,
        dropdown = props.dropdown,
        renderInput = props.input,
        wrap = props.wrap,
        type = props.type,
        name = props.name,
        value = props.value,
        defaultValue = props.defaultValue,
        readonly = props.readonly,
        required = props.required,
        disabled = props.disabled,
        placeholder = props.placeholder,
        inputId = props.inputId,
        size = props.size,
        accept = props.accept,
        autocomplete = props.autocomplete,
        autocorrect = props.autocorrect,
        autocapitalize = props.autocapitalize,
        spellcheck = props.spellcheck,
        autofocus = props.autofocus,
        autosave = props.autosave,
        max = props.max,
        min = props.min,
        step = props.step,
        maxlength = props.maxlength,
        minlength = props.minlength,
        multiple = props.multiple,
        inputStyle = props.inputStyle,
        pattern = props.pattern,
        validate = props.validate,
        validateOnBlur = props.validateOnBlur,
        tabindex = props.tabindex,
        resizable = props.resizable,
        clearButton = props.clearButton,
        noFormStoreData = props.noFormStoreData,
        noStoreData = props.noStoreData,
        ignoreStoreData = props.ignoreStoreData,
        errorMessage = props.errorMessage,
        errorMessageForce = props.errorMessageForce,
        info = props.info,
        outline = props.outline,
        label = props.label,
        inlineLabel = props.inlineLabel,
        floatingLabel = props.floatingLabel,
        textEditorParams = props.textEditorParams;
    var domValue = self.domValue();
    var inputHasValue = self.inputHasValue();
    var isSortable = sortable || self.state.isSortable;

    var createInput = function createInput(InputTag, children) {
      var needsValue = type !== 'file' && type !== 'datepicker' && type !== 'colorpicker';
      var needsType = InputTag === 'input';
      var inputType = type;

      if (inputType === 'datepicker' || inputType === 'colorpicker') {
        inputType = 'text';
      }

      var inputClassName = Utils.classNames({
        resizable: inputType === 'textarea' && resizable,
        'no-store-data': noFormStoreData || noStoreData || ignoreStoreData,
        'input-invalid': errorMessage && errorMessageForce || inputInvalid,
        'input-with-value': inputHasValue,
        'input-focused': inputFocused
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

    var inputEl;

    if (renderInput) {
      if (type === 'select' || type === 'textarea' || type === 'file') {
        if (type === 'select') {
          inputEl = createInput('select', self.$slots.default);
        } else if (type === 'file') {
          inputEl = createInput('input');
        } else {
          inputEl = createInput('textarea');
        }
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
    }

    var hasErrorMessage = !!errorMessage || self.$slots['error-message'] && self.$slots['error-message'].length;

    var ItemContent = _h('div', {
      ref: 'itemContentEl',
      class: Utils.classNames('item-content item-input', !wrap && className, !wrap && {
        disabled: disabled
      }, !wrap && Mixins.colorClasses(props), {
        'inline-label': inlineLabel,
        'item-input-outline': outline,
        'item-input-focused': inputFocused,
        'item-input-with-info': !!info || self.$slots.info && self.$slots.info.length,
        'item-input-with-value': inputHasValue,
        'item-input-with-error-message': hasErrorMessage && errorMessageForce || inputInvalid,
        'item-input-invalid': hasErrorMessage && errorMessageForce || inputInvalid
      })
    }, [this.$slots['content-start'], (media || self.$slots.media) && _h('div', {
      class: 'item-media'
    }, [media && _h('img', {
      attrs: {
        src: media
      }
    }), this.$slots['media']]), _h('div', {
      class: 'item-inner'
    }, [this.$slots['inner-start'], (label || self.$slots.label) && _h('div', {
      class: Utils.classNames('item-title item-label', {
        'item-floating-label': floatingLabel
      })
    }, [label, this.$slots['label']]), _h('div', {
      class: Utils.classNames('item-input-wrap', {
        'input-dropdown': dropdown === 'auto' ? type === 'select' : dropdown
      })
    }, [inputEl, this.$slots['input'], hasErrorMessage && errorMessageForce && _h('div', {
      class: 'item-input-error-message'
    }, [errorMessage, this.$slots['error-message']]), clearButton && _h('span', {
      class: 'input-clear-button'
    }), (info || self.$slots.info) && _h('div', {
      class: 'item-input-info'
    }, [info, this.$slots['info']])]), this.$slots['inner'], this.$slots['inner-end']]), this.$slots['content'], this.$slots['content-end']]);

    if (!wrap) {
      return ItemContent;
    }

    return _h('li', {
      ref: 'el',
      style: style,
      class: Utils.classNames(className, {
        disabled: disabled
      }, Mixins.colorClasses(props)),
      attrs: {
        id: id
      }
    }, [this.$slots['root-start'], ItemContent, isSortable && _h('div', {
      class: 'sortable-handler'
    }), this.$slots['root'], this.$slots['root-end']]);
  },
  watch: {
    'props.value': function watchValue() {
      var self = this;
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
    Utils.bindMethods(this, 'onChange onInput onFocus onBlur onTextareaResize onInputNotEmpty onInputEmpty onInputClear'.split(' '));
  },
  mounted: function mounted() {
    var self = this;
    var el = self.$refs.el;
    var itemContentEl = self.$refs.itemContentEl;
    if (!el && !itemContentEl) return;
    self.$f7ready(function (f7) {
      var _self$props = self.props,
          validate = _self$props.validate,
          validateOnBlur = _self$props.validateOnBlur,
          resizable = _self$props.resizable,
          value = _self$props.value,
          defaultValue = _self$props.defaultValue,
          type = _self$props.type,
          calendarParams = _self$props.calendarParams,
          colorPickerParams = _self$props.colorPickerParams;
      var inputEl = self.$refs.inputEl;
      if (!inputEl) return;
      inputEl.addEventListener('input:notempty', self.onInputNotEmpty, false);
      inputEl.addEventListener('textarea:resize', self.onTextareaResize, false);
      inputEl.addEventListener('input:empty', self.onInputEmpty, false);
      inputEl.addEventListener('input:clear', self.onInputClear, false);

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

      if (!(validateOnBlur || validateOnBlur === '') && (validate || validate === '') && (typeof value !== 'undefined' && value !== null && value !== '' || typeof defaultValue !== 'undefined' && defaultValue !== null && defaultValue !== '')) {
        setTimeout(function () {
          self.validateInput(inputEl);
        }, 0);
      }

      if (type === 'textarea' && resizable) {
        f7.input.resizeTextarea(inputEl);
      }
    });
    self.$listEl = self.$$(el || itemContentEl).parents('.list, .list-group').eq(0);

    if (self.$listEl.length) {
      self.setState({
        isSortable: self.$listEl.hasClass('sortable')
      });
    }
  },
  updated: function updated() {
    var self = this;
    var $listEl = self.$listEl;
    if (!$listEl || $listEl && $listEl.length === 0) return;
    var isSortable = $listEl.hasClass('sortable');

    if (isSortable !== self.state.isSortable) {
      self.setState({
        isSortable: isSortable
      });
    }

    var _self$props2 = self.props,
        validate = _self$props2.validate,
        validateOnBlur = _self$props2.validateOnBlur,
        resizable = _self$props2.resizable,
        type = _self$props2.type;
    var f7 = self.$f7;
    if (!f7) return;

    if (self.updateInputOnDidUpdate) {
      var inputEl = self.$refs.inputEl;
      if (!inputEl) return;
      self.updateInputOnDidUpdate = false;

      if (validate && !validateOnBlur) {
        self.validateInput(inputEl);
      }

      if (type === 'textarea' && resizable) {
        f7.input.resizeTextarea(inputEl);
      }
    }
  },
  beforeDestroy: function beforeDestroy() {
    var self = this;
    var inputEl = self.$refs.inputEl;
    if (!inputEl) return;
    inputEl.removeEventListener('input:notempty', self.onInputNotEmpty, false);
    inputEl.removeEventListener('textarea:resize', self.onTextareaResize, false);
    inputEl.removeEventListener('input:empty', self.onInputEmpty, false);
    inputEl.removeEventListener('input:clear', self.onInputClear, false);

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
      var _self$props3 = self.props,
          value = _self$props3.value,
          type = _self$props3.type;

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
      var _self$props4 = self.props,
          validate = _self$props4.validate,
          validateOnBlur = _self$props4.validateOnBlur;

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
      var _self$props5 = self.props,
          validate = _self$props5.validate,
          validateOnBlur = _self$props5.validateOnBlur;

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
        this.dispatchEvent('texteditor:change textEditorChange', args[0]);
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