'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utils = require('../utils/utils');

var _utils2 = _interopRequireDefault(_utils);

var _mixins = require('../utils/mixins');

var _mixins2 = _interopRequireDefault(_mixins);

var _reactComponentDispatchEvent = require('../runtime-helpers/react-component-dispatch-event.js');

var _reactComponentDispatchEvent2 = _interopRequireDefault(_reactComponentDispatchEvent);

var _reactComponentSetProps = require('../runtime-helpers/react-component-set-props.js');

var _reactComponentSetProps2 = _interopRequireDefault(_reactComponentSetProps);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var F7Stepper = function (_React$Component) {
  _inherits(F7Stepper, _React$Component);

  function F7Stepper(props, context) {
    _classCallCheck(this, F7Stepper);

    var _this = _possibleConstructorReturn(this, (F7Stepper.__proto__ || Object.getPrototypeOf(F7Stepper)).call(this, props, context));

    _this.__reactRefs = {};

    (function () {
      _this.onInputBound = _this.onInput.bind(_this);
      _this.onMinusClickBound = _this.onMinusClick.bind(_this);
      _this.onPlusClickBound = _this.onPlusClick.bind(_this);
    })();
    return _this;
  }

  _createClass(F7Stepper, [{
    key: 'increment',
    value: function increment() {
      if (!this.f7Stepper) return;
      this.f7Stepper.increment();
    }
  }, {
    key: 'decrement',
    value: function decrement() {
      if (!this.f7Stepper) return;
      this.f7Stepper.decrement();
    }
  }, {
    key: 'setValue',
    value: function setValue(newValue) {
      var self = this;
      if (self.f7Stepper && self.f7Stepper.setValue) self.f7Stepper.setValue(newValue);
    }
  }, {
    key: 'getValue',
    value: function getValue() {
      var self = this;

      if (self.f7Stepper && self.f7Stepper.getValue) {
        return self.f7Stepper.getValue();
      }

      return undefined;
    }
  }, {
    key: 'onInput',
    value: function onInput(e) {
      this.dispatchEvent('input', e, this.f7Stepper);
    }
  }, {
    key: 'onMinusClick',
    value: function onMinusClick(e) {
      this.dispatchEvent('stepper:minusclick stepperMinusClick', e, this.f7Stepper);
    }
  }, {
    key: 'onPlusClick',
    value: function onPlusClick(e) {
      this.dispatchEvent('stepper:plusclick stepperPlusClick', e, this.f7Stepper);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var self = this;
      var props = self.props;
      var input = props.input,
          buttonsOnly = props.buttonsOnly,
          inputType = props.inputType,
          value = props.value,
          inputReadonly = props.inputReadonly,
          min = props.min,
          max = props.max,
          step = props.step,
          id = props.id,
          style = props.style;

      var inputWrapEl = void 0;
      var valueEl = void 0;

      if (input && !buttonsOnly) {
        var inputEl = void 0;
        {
          inputEl = _react2.default.createElement('input', {
            type: inputType,
            min: inputType === 'number' ? min : undefined,
            max: inputType === 'number' ? max : undefined,
            step: inputType === 'number' ? step : undefined,
            value: value,
            readOnly: inputReadonly,
            onInput: self.onInput.bind(self)
          });
        }
        inputWrapEl = _react2.default.createElement('div', {
          className: 'stepper-input-wrap'
        }, inputEl);
      }

      if (!input && !buttonsOnly) {
        valueEl = _react2.default.createElement('div', {
          className: 'stepper-value'
        }, value);
      }

      return _react2.default.createElement('div', {
        ref: function ref(__reactNode) {
          _this2.__reactRefs['el'] = __reactNode;
        },
        id: id,
        style: style,
        className: self.classes
      }, _react2.default.createElement('div', {
        className: 'stepper-button-minus',
        onClick: self.onMinusClickBound
      }), inputWrapEl, valueEl, _react2.default.createElement('div', {
        className: 'stepper-button-plus',
        onClick: self.onPlusClickBound
      }));
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (!this.props.init) return;

      if (this.f7Stepper && this.f7Stepper.destroy) {
        this.f7Stepper.destroy();
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var self = this;
      if (!self.props.init) return;
      self.$f7ready(function (f7) {
        var _self$props = self.props,
            min = _self$props.min,
            max = _self$props.max,
            value = _self$props.value,
            step = _self$props.step,
            formatValue = _self$props.formatValue,
            autorepeat = _self$props.autorepeat,
            autorepeatDynamic = _self$props.autorepeatDynamic,
            wraps = _self$props.wraps;

        var el = self.refs.el;
        if (!el) return;
        self.f7Stepper = f7.stepper.create(_utils2.default.noUndefinedProps({
          el: el,
          min: min,
          max: max,
          value: value,
          step: step,
          formatValue: formatValue,
          autorepeat: autorepeat,
          autorepeatDynamic: autorepeatDynamic,
          wraps: wraps,
          on: {
            change: function change(stepper, newValue) {
              self.dispatchEvent('stepper:change stepperChange', newValue);
            }
          }
        }));
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
    key: 'classes',
    get: function get() {
      var self = this;
      var props = self.props;
      var round = props.round,
          roundIos = props.roundIos,
          roundMd = props.roundMd,
          fill = props.fill,
          fillIos = props.fillIos,
          fillMd = props.fillMd,
          big = props.big,
          bigIos = props.bigIos,
          bigMd = props.bigMd,
          small = props.small,
          smallIos = props.smallIos,
          smallMd = props.smallMd,
          raised = props.raised,
          disabled = props.disabled;

      return _utils2.default.classNames(self.props.className, 'stepper', {
        disabled: disabled,
        'stepper-round': round,
        'stepper-round-ios': roundIos,
        'stepper-round-md': roundMd,
        'stepper-fill': fill,
        'stepper-fill-ios': fillIos,
        'stepper-fill-md': fillMd,
        'stepper-big': big,
        'stepper-big-ios': bigIos,
        'stepper-big-md': bigMd,
        'stepper-small': small,
        'stepper-small-ios': smallIos,
        'stepper-small-md': smallMd,
        'stepper-raised': raised
      }, _mixins2.default.colorClasses(props));
    }
  }, {
    key: 'refs',
    get: function get() {
      return this.__reactRefs;
    },
    set: function set(refs) {}
  }]);

  return F7Stepper;
}(_react2.default.Component);

(0, _reactComponentSetProps2.default)(F7Stepper, Object.assign({
  id: [String, Number],
  init: {
    type: Boolean,
    default: true
  },
  value: {
    type: Number,
    default: 0
  },
  min: {
    type: Number,
    default: 0
  },
  max: {
    type: Number,
    default: 100
  },
  step: {
    type: Number,
    default: 1
  },
  formatValue: Function,
  input: {
    type: Boolean,
    default: true
  },
  inputType: {
    type: String,
    default: 'text'
  },
  inputReadonly: {
    type: Boolean,
    default: true
  },
  autorepeat: {
    type: Boolean,
    default: false
  },
  autorepeatDynamic: {
    type: Boolean,
    default: false
  },
  wraps: {
    type: Boolean,
    default: false
  },
  disabled: Boolean,
  buttonsOnly: Boolean,
  round: Boolean,
  roundMd: Boolean,
  roundIos: Boolean,
  fill: Boolean,
  fillMd: Boolean,
  fillIos: Boolean,
  big: Boolean,
  bigMd: Boolean,
  bigIos: Boolean,
  small: Boolean,
  smallMd: Boolean,
  smallIos: Boolean,
  raised: Boolean
}, _mixins2.default.colorProps));

exports.default = F7Stepper;