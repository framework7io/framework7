'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utils = require('../utils/utils');

var _utils2 = _interopRequireDefault(_utils);

var _mixins = require('../utils/mixins');

var _mixins2 = _interopRequireDefault(_mixins);

var _toggle = require('./toggle');

var _toggle2 = _interopRequireDefault(_toggle);

var _range = require('./range');

var _range2 = _interopRequireDefault(_range);

var _reactComponentWatch = require('../runtime-helpers/react-component-watch.js');

var _reactComponentWatch2 = _interopRequireDefault(_reactComponentWatch);

var _reactComponentDispatchEvent = require('../runtime-helpers/react-component-dispatch-event.js');

var _reactComponentDispatchEvent2 = _interopRequireDefault(_reactComponentDispatchEvent);

var _reactComponentSlots = require('../runtime-helpers/react-component-slots.js');

var _reactComponentSlots2 = _interopRequireDefault(_reactComponentSlots);

var _reactComponentSetProps = require('../runtime-helpers/react-component-set-props.js');

var _reactComponentSetProps2 = _interopRequireDefault(_reactComponentSetProps);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var F7Input = function (_React$Component) {
  _inherits(F7Input, _React$Component);

  function F7Input(props, context) {
    _classCallCheck(this, F7Input);

    var _this = _possibleConstructorReturn(this, (F7Input.__proto__ || Object.getPrototypeOf(F7Input)).call(this, props, context));

    _this.__reactRefs = {};

    (function () {
      var self = _this;
      self.onFocusBound = self.onFocus.bind(self);
      self.onBlurBound = self.onBlur.bind(self);
      self.onInputBound = self.onInput.bind(self);
      self.onChangeBound = self.onChange.bind(self);
      self.onTextareaResizeBound = self.onTextareaResize.bind(self);
      self.onInputNotEmptyBound = self.onInputNotEmpty.bind(self);
      self.onInputEmptyBound = self.onInputEmpty.bind(self);
      self.onInputClearBound = self.onInputClear.bind(self);
    })();
    return _this;
  }

  _createClass(F7Input, [{
    key: 'onTextareaResize',
    value: function onTextareaResize(event) {
      this.dispatchEvent('textarea:resize textareaResize', event);
    }
  }, {
    key: 'onInputNotEmpty',
    value: function onInputNotEmpty(event) {
      this.dispatchEvent('input:notempty inputNotEmpty', event);
    }
  }, {
    key: 'onInputEmpty',
    value: function onInputEmpty(event) {
      this.dispatchEvent('input:empty inputEmpty', event);
    }
  }, {
    key: 'onInputClear',
    value: function onInputClear(event) {
      this.dispatchEvent('input:clear inputClear', event);
    }
  }, {
    key: 'onInput',
    value: function onInput(event) {
      this.dispatchEvent('input', event);
    }
  }, {
    key: 'onFocus',
    value: function onFocus(event) {
      this.dispatchEvent('focus', event);
    }
  }, {
    key: 'onBlur',
    value: function onBlur(event) {
      this.dispatchEvent('blur', event);
    }
  }, {
    key: 'onChange',
    value: function onChange(event) {
      this.dispatchEvent('change', event);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

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
          tabindex = props.tabindex,
          resizable = props.resizable,
          clearButton = props.clearButton,
          errorMessage = props.errorMessage,
          errorMessageForce = props.errorMessageForce,
          info = props.info,
          wrap = props.wrap,
          style = props.style,
          className = props.className,
          noStoreData = props.noStoreData,
          noFormStoreData = props.noFormStoreData;

      var inputEl = void 0;

      var createInput = function createInput(tag, children) {
        var InputTag = tag;
        var needsValue = type !== 'file';
        var needsType = tag === 'input';
        var inputClassName = _utils2.default.classNames(type === 'textarea' && resizable && 'resizable', !wrap && className, (noFormStoreData || noStoreData) && 'no-store-data', errorMessage && errorMessageForce && 'input-invalid');
        var input = void 0;
        {
          input = _react2.default.createElement(InputTag, {
            ref: function ref(__reactNode) {
              _this2.__reactRefs['inputEl'] = __reactNode;
            },
            style: inputStyle,
            name: name,
            type: needsType ? type : undefined,
            placeholder: placeholder,
            id: inputId,
            value: needsValue ? value : undefined,
            defaultValue: defaultValue,
            size: size,
            accept: accept,
            autoComplete: autocomplete,
            autoCorrect: autocorrect,
            autoCapitalize: autocapitalize,
            spellCheck: spellcheck,
            autoFocus: autofocus,
            autoSave: autosave,
            checked: checked,
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
            'data-validate': validate === true || validate === '' ? true : undefined,
            tabIndex: tabindex,
            'data-error-message': errorMessageForce ? undefined : errorMessage,
            className: inputClassName,
            onFocus: self.onFocusBound,
            onBlur: self.onBlurBound,
            onInput: self.onInputBound,
            onChange: self.onChangeBound
          }, children);
        }
        return input;
      };

      var _self$slots = self.slots,
          slotsDefault = _self$slots.default,
          slotsInfo = _self$slots.info;

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
        inputEl = _react2.default.createElement(_toggle2.default, {
          checked: checked,
          readOnly: readonly,
          name: name,
          value: value,
          disabled: disabled,
          id: inputId,
          onChange: self.onChangeBound
        });
      } else if (type === 'range') {
        inputEl = _react2.default.createElement(_range2.default, {
          value: value,
          disabled: disabled,
          min: min,
          max: max,
          step: step,
          name: name,
          id: inputId,
          input: true,
          onRangeChange: self.onChangeBound
        });
      } else {
        inputEl = createInput('input');
      }

      if (wrap) {
        var wrapClasses = _utils2.default.classNames(className, 'item-input-wrap', _mixins2.default.colorClasses(props));
        return _react2.default.createElement('div', {
          id: id,
          ref: function ref(__reactNode) {
            _this2.__reactRefs['wrapEl'] = __reactNode;
          },
          className: wrapClasses,
          style: style
        }, inputEl, errorMessage && errorMessageForce && _react2.default.createElement('div', {
          className: 'item-input-error-message'
        }, errorMessage), clearButton && _react2.default.createElement('span', {
          className: 'input-clear-button'
        }), (info || slotsInfo && slotsInfo.length) && _react2.default.createElement('div', {
          className: 'item-input-info'
        }, info, this.slots['info']));
      }

      return inputEl;
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var self = this;
      var _self$props = self.props,
          type = _self$props.type,
          resizable = _self$props.resizable,
          clearButton = _self$props.clearButton;

      if (type === 'range' || type === 'toggle') return;
      var inputEl = self.refs.inputEl;
      if (!inputEl) return;
      inputEl.removeEventListener('input:notempty', self.onInputNotEmptyBound, false);

      if (type === 'textarea' && resizable) {
        inputEl.removeEventListener('textarea:resze', self.onTextareaResizeBound, false);
      }

      if (clearButton) {
        inputEl.removeEventListener('input:empty', self.onInputEmptyBound, false);
        inputEl.removeEventListener('input:clear', self.onInputClearBound, false);
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      var _this3 = this;

      (0, _reactComponentWatch2.default)(this, 'props.value', prevProps, prevState, function () {
        var self = _this3;
        var type = self.props.type;

        if (type === 'range' || type === 'toggle') return;
        if (!self.$f7) return;
        self.updateInputOnDidUpdate = true;
      });

      var self = this;
      var _self$props2 = self.props,
          validate = _self$props2.validate,
          resizable = _self$props2.resizable;

      var f7 = self.$f7;
      if (!f7) return;

      if (self.updateInputOnDidUpdate) {
        var inputEl = self.refs.inputEl;
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
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var self = this;
      self.$f7ready(function (f7) {
        var _self$props3 = self.props,
            validate = _self$props3.validate,
            resizable = _self$props3.resizable,
            type = _self$props3.type,
            clearButton = _self$props3.clearButton,
            value = _self$props3.value,
            defaultValue = _self$props3.defaultValue;

        if (type === 'range' || type === 'toggle') return;
        var inputEl = self.refs.inputEl;
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
          setTimeout(function () {
            f7.input.validate(inputEl);
          }, 0);
        }

        if (resizable) {
          f7.input.resizeTextarea(inputEl);
        }
      });
    }
  }, {
    key: 'dispatchEvent',
    value: function dispatchEvent(events) {
      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      return _reactComponentDispatchEvent2.default.apply(undefined, [this, events].concat(args));
    }
  }, {
    key: 'slots',
    get: function get() {
      return (0, _reactComponentSlots2.default)(this.props);
    }
  }, {
    key: 'refs',
    get: function get() {
      return this.__reactRefs;
    },
    set: function set(refs) {}
  }]);

  return F7Input;
}(_react2.default.Component);

(0, _reactComponentSetProps2.default)(F7Input, Object.assign({
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
  errorMessage: String,
  errorMessageForce: Boolean,
  info: String,
  wrap: {
    type: Boolean,
    default: true
  }
}, _mixins2.default.colorProps));

exports.default = F7Input;