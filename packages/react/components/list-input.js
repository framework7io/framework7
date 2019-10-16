function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

import React from 'react';
import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import F7TextEditor from './text-editor';
import __reactComponentWatch from '../runtime-helpers/react-component-watch.js';
import __reactComponentDispatchEvent from '../runtime-helpers/react-component-dispatch-event.js';
import __reactComponentSlots from '../runtime-helpers/react-component-slots.js';
import __reactComponentSetProps from '../runtime-helpers/react-component-set-props.js';

var F7ListInput =
/*#__PURE__*/
function (_React$Component) {
  _inherits(F7ListInput, _React$Component);

  function F7ListInput(props, context) {
    var _this;

    _classCallCheck(this, F7ListInput);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(F7ListInput).call(this, props, context));
    _this.__reactRefs = {};

    _this.state = function () {
      return {
        isSortable: props.sortable,
        inputFocused: false,
        inputInvalid: false
      };
    }();

    (function () {
      Utils.bindMethods(_assertThisInitialized(_this), 'onChange onInput onFocus onBlur onTextareaResize onInputNotEmpty onInputEmpty onInputClear'.split(' '));
    })();

    return _this;
  }

  _createClass(F7ListInput, [{
    key: "domValue",
    value: function domValue() {
      var self = this;
      var inputEl = self.refs.inputEl;
      if (!inputEl) return undefined;
      return inputEl.value;
    }
  }, {
    key: "inputHasValue",
    value: function inputHasValue() {
      var self = this;
      var _self$props = self.props,
          value = _self$props.value,
          type = _self$props.type;

      if (type === 'datepicker' && Array.isArray(value) && value.length === 0) {
        return false;
      }

      var domValue = self.domValue();
      return typeof value === 'undefined' ? domValue || domValue === 0 : value || value === 0;
    }
  }, {
    key: "validateInput",
    value: function validateInput(inputEl) {
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
    }
  }, {
    key: "onTextareaResize",
    value: function onTextareaResize(event) {
      this.dispatchEvent('textarea:resize textareaResize', event);
    }
  }, {
    key: "onInputNotEmpty",
    value: function onInputNotEmpty(event) {
      this.dispatchEvent('input:notempty inputNotEmpty', event);
    }
  }, {
    key: "onInputEmpty",
    value: function onInputEmpty(event) {
      this.dispatchEvent('input:empty inputEmpty', event);
    }
  }, {
    key: "onInputClear",
    value: function onInputClear(event) {
      this.dispatchEvent('input:clear inputClear', event);
    }
  }, {
    key: "onInput",
    value: function onInput() {
      var self = this;
      var _self$props2 = self.props,
          validate = _self$props2.validate,
          validateOnBlur = _self$props2.validateOnBlur;

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      self.dispatchEvent.apply(self, ['input'].concat(args));

      if (!(validateOnBlur || validateOnBlur === '') && (validate || validate === '') && self.refs && self.refs.inputEl) {
        self.validateInput(self.refs.inputEl);
      }
    }
  }, {
    key: "onFocus",
    value: function onFocus() {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      this.dispatchEvent.apply(this, ['focus'].concat(args));
      this.setState({
        inputFocused: true
      });
    }
  }, {
    key: "onBlur",
    value: function onBlur() {
      var self = this;
      var _self$props3 = self.props,
          validate = _self$props3.validate,
          validateOnBlur = _self$props3.validateOnBlur;

      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      self.dispatchEvent.apply(self, ['blur'].concat(args));

      if ((validate || validate === '' || validateOnBlur || validateOnBlur === '') && self.refs && self.refs.inputEl) {
        self.validateInput(self.refs.inputEl);
      }

      self.setState({
        inputFocused: false
      });
    }
  }, {
    key: "onChange",
    value: function onChange() {
      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }

      this.dispatchEvent.apply(this, ['change'].concat(args));

      if (this.props.type === 'texteditor') {
        this.dispatchEvent('texteditor:change textEditorChange', args[0]);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

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
          input = React.createElement(InputTag, Object.assign({
            ref: function ref(__reactNode) {
              _this2.__reactRefs['inputEl'] = __reactNode;
            },
            style: inputStyle,
            name: name,
            type: needsType ? inputType : undefined,
            placeholder: placeholder,
            id: inputId,
            size: size,
            accept: accept,
            autoComplete: autocomplete,
            autoCorrect: autocorrect,
            autoCapitalize: autocapitalize,
            spellCheck: spellcheck,
            autoFocus: autofocus,
            autoSave: autosave,
            disabled: disabled,
            max: max,
            maxLength: maxlength,
            min: min,
            minLength: minlength,
            step: step,
            multiple: multiple,
            readOnly: readonly,
            required: required,
            pattern: pattern,
            validate: typeof validate === 'string' && validate.length ? validate : undefined,
            'data-validate': validate === true || validate === '' || validateOnBlur === true || validateOnBlur === '' ? true : undefined,
            'data-validate-on-blur': validateOnBlur === true || validateOnBlur === '' ? true : undefined,
            tabIndex: tabindex,
            'data-error-message': errorMessageForce ? undefined : errorMessage,
            className: inputClassName,
            onFocus: self.onFocus,
            onBlur: self.onBlur,
            onInput: self.onInput,
            onChange: self.onChange
          }, valueProps), children);
        }
        return input;
      };

      var inputEl;

      if (renderInput) {
        if (type === 'select' || type === 'textarea' || type === 'file') {
          if (type === 'select') {
            inputEl = createInput('select', self.slots.default);
          } else if (type === 'file') {
            inputEl = createInput('input');
          } else {
            inputEl = createInput('textarea');
          }
        } else if (type === 'texteditor') {
          inputEl = React.createElement(F7TextEditor, Object.assign({
            value: value,
            resizable: resizable,
            placeholder: placeholder,
            onTextEditorFocus: self.onFocus,
            onTextEditorBlur: self.onBlur,
            onTextEditorInput: self.onInput,
            onTextEditorChange: self.onChange
          }, textEditorParams));
        } else {
          inputEl = createInput('input');
        }
      }

      var hasErrorMessage = !!errorMessage || self.slots['error-message'] && self.slots['error-message'].length;
      var ItemContent = React.createElement('div', {
        ref: function ref(__reactNode) {
          _this2.__reactRefs['itemContentEl'] = __reactNode;
        },
        className: Utils.classNames('item-content item-input', !wrap && className, !wrap && {
          disabled: disabled
        }, !wrap && Mixins.colorClasses(props), {
          'inline-label': inlineLabel,
          'item-input-outline': outline,
          'item-input-focused': inputFocused,
          'item-input-with-info': !!info || self.slots.info && self.slots.info.length,
          'item-input-with-value': inputHasValue,
          'item-input-with-error-message': hasErrorMessage && errorMessageForce || inputInvalid,
          'item-input-invalid': hasErrorMessage && errorMessageForce || inputInvalid
        })
      }, this.slots['content-start'], (media || self.slots.media) && React.createElement('div', {
        className: 'item-media'
      }, media && React.createElement('img', {
        src: media
      }), this.slots['media']), React.createElement('div', {
        className: 'item-inner'
      }, this.slots['inner-start'], (label || self.slots.label) && React.createElement('div', {
        className: Utils.classNames('item-title item-label', {
          'item-floating-label': floatingLabel
        })
      }, label, this.slots['label']), React.createElement('div', {
        className: Utils.classNames('item-input-wrap', {
          'input-dropdown': dropdown === 'auto' ? type === 'select' : dropdown
        })
      }, inputEl, this.slots['input'], hasErrorMessage && errorMessageForce && React.createElement('div', {
        className: 'item-input-error-message'
      }, errorMessage, this.slots['error-message']), clearButton && React.createElement('span', {
        className: 'input-clear-button'
      }), (info || self.slots.info) && React.createElement('div', {
        className: 'item-input-info'
      }, info, this.slots['info'])), this.slots['inner'], this.slots['inner-end']), this.slots['content'], this.slots['content-end']);

      if (!wrap) {
        return ItemContent;
      }

      return React.createElement('li', {
        ref: function ref(__reactNode) {
          _this2.__reactRefs['el'] = __reactNode;
        },
        id: id,
        style: style,
        className: Utils.classNames(className, {
          disabled: disabled
        }, Mixins.colorClasses(props))
      }, this.slots['root-start'], ItemContent, isSortable && React.createElement('div', {
        className: 'sortable-handler'
      }), this.slots['root'], this.slots['root-end']);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var self = this;
      var inputEl = self.refs.inputEl;
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
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      var _this3 = this;

      __reactComponentWatch(this, 'props.value', prevProps, prevState, function () {
        var self = _this3;
        if (!self.$f7) return;
        self.updateInputOnDidUpdate = true;

        if (self.f7Calendar) {
          self.f7Calendar.setValue(self.props.value);
        }

        if (self.f7ColorPicker) {
          self.f7ColorPicker.setValue(self.props.value);
        }
      });

      var self = this;
      var $listEl = self.$listEl;
      if (!$listEl || $listEl && $listEl.length === 0) return;
      var isSortable = $listEl.hasClass('sortable');

      if (isSortable !== self.state.isSortable) {
        self.setState({
          isSortable: isSortable
        });
      }

      var _self$props4 = self.props,
          validate = _self$props4.validate,
          validateOnBlur = _self$props4.validateOnBlur,
          resizable = _self$props4.resizable,
          type = _self$props4.type;
      var f7 = self.$f7;
      if (!f7) return;

      if (self.updateInputOnDidUpdate) {
        var inputEl = self.refs.inputEl;
        if (!inputEl) return;
        self.updateInputOnDidUpdate = false;

        if (validate && !validateOnBlur) {
          self.validateInput(inputEl);
        }

        if (type === 'textarea' && resizable) {
          f7.input.resizeTextarea(inputEl);
        }
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var self = this;
      var el = self.refs.el;
      var itemContentEl = self.refs.itemContentEl;
      if (!el && !itemContentEl) return;
      self.$f7ready(function (f7) {
        var _self$props5 = self.props,
            validate = _self$props5.validate,
            validateOnBlur = _self$props5.validateOnBlur,
            resizable = _self$props5.resizable,
            value = _self$props5.value,
            defaultValue = _self$props5.defaultValue,
            type = _self$props5.type,
            calendarParams = _self$props5.calendarParams,
            colorPickerParams = _self$props5.colorPickerParams;
        var inputEl = self.refs.inputEl;
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
    }
  }, {
    key: "dispatchEvent",
    value: function dispatchEvent(events) {
      for (var _len5 = arguments.length, args = new Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
        args[_key5 - 1] = arguments[_key5];
      }

      return __reactComponentDispatchEvent.apply(void 0, [this, events].concat(args));
    }
  }, {
    key: "slots",
    get: function get() {
      return __reactComponentSlots(this.props);
    }
  }, {
    key: "refs",
    get: function get() {
      return this.__reactRefs;
    },
    set: function set(refs) {}
  }]);

  return F7ListInput;
}(React.Component);

__reactComponentSetProps(F7ListInput, Object.assign({
  id: [String, Number],
  style: Object,
  className: String,
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
  inputStyle: Object,
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
}, Mixins.colorProps));

F7ListInput.displayName = 'f7-list-input';
export default F7ListInput;