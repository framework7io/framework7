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
import __reactComponentDispatchEvent from '../runtime-helpers/react-component-dispatch-event.js';
import __reactComponentSetProps from '../runtime-helpers/react-component-set-props.js';

var F7Stepper =
/*#__PURE__*/
function (_React$Component) {
  _inherits(F7Stepper, _React$Component);

  function F7Stepper(props, context) {
    var _this;

    _classCallCheck(this, F7Stepper);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(F7Stepper).call(this, props, context));
    _this.__reactRefs = {};

    (function () {
      Utils.bindMethods(_assertThisInitialized(_this), ['onInput', 'onMinusClick', 'onPlusClick']);
    })();

    return _this;
  }

  _createClass(F7Stepper, [{
    key: "increment",
    value: function increment() {
      if (!this.f7Stepper) return;
      this.f7Stepper.increment();
    }
  }, {
    key: "decrement",
    value: function decrement() {
      if (!this.f7Stepper) return;
      this.f7Stepper.decrement();
    }
  }, {
    key: "setValue",
    value: function setValue(newValue) {
      var self = this;
      if (self.f7Stepper && self.f7Stepper.setValue) self.f7Stepper.setValue(newValue);
    }
  }, {
    key: "getValue",
    value: function getValue() {
      var self = this;

      if (self.f7Stepper && self.f7Stepper.getValue) {
        return self.f7Stepper.getValue();
      }

      return undefined;
    }
  }, {
    key: "onInput",
    value: function onInput(event) {
      var stepper = this.f7Stepper;
      this.dispatchEvent('input', event, stepper);
    }
  }, {
    key: "onChange",
    value: function onChange(event) {
      var stepper = this.f7Stepper;
      this.dispatchEvent('change', event, stepper);
    }
  }, {
    key: "onMinusClick",
    value: function onMinusClick(event) {
      var stepper = this.f7Stepper;
      this.dispatchEvent('stepper:minusclick stepperMinusClick', event, stepper);
    }
  }, {
    key: "onPlusClick",
    value: function onPlusClick(event) {
      var stepper = this.f7Stepper;
      this.dispatchEvent('stepper:plusclick stepperPlusClick', event, stepper);
    }
  }, {
    key: "render",
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
          style = props.style,
          name = props.name,
          inputId = props.inputId;
      var inputWrapEl;
      var valueEl;

      if (input && !buttonsOnly) {
        var inputEl;
        {
          inputEl = React.createElement('input', {
            ref: function ref(__reactNode) {
              _this2.__reactRefs['inputEl'] = __reactNode;
            },
            name: name,
            id: inputId,
            type: inputType,
            min: inputType === 'number' ? min : undefined,
            max: inputType === 'number' ? max : undefined,
            step: inputType === 'number' ? step : undefined,
            onInput: self.onInput,
            onChange: self.onChange,
            value: value,
            readOnly: inputReadonly
          });
        }
        inputWrapEl = React.createElement('div', {
          className: 'stepper-input-wrap'
        }, inputEl);
      }

      if (!input && !buttonsOnly) {
        valueEl = React.createElement('div', {
          className: 'stepper-value'
        }, value);
      }

      return React.createElement('div', {
        ref: function ref(__reactNode) {
          _this2.__reactRefs['el'] = __reactNode;
        },
        id: id,
        style: style,
        className: self.classes
      }, React.createElement('div', {
        ref: function ref(__reactNode) {
          _this2.__reactRefs['minusEl'] = __reactNode;
        },
        className: 'stepper-button-minus'
      }), inputWrapEl, valueEl, React.createElement('div', {
        ref: function ref(__reactNode) {
          _this2.__reactRefs['plusEl'] = __reactNode;
        },
        className: 'stepper-button-plus'
      }));
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var self = this;
      var _self$refs = self.refs,
          minusEl = _self$refs.minusEl,
          plusEl = _self$refs.plusEl;

      if (minusEl) {
        minusEl.removeEventListener('click', self.onMinusClick);
      }

      if (plusEl) {
        plusEl.removeEventListener('click', self.onPlusClick);
      }

      if (!self.props.init) return;

      if (self.f7Stepper && self.f7Stepper.destroy) {
        self.f7Stepper.destroy();
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var self = this;
      var _self$refs2 = self.refs,
          minusEl = _self$refs2.minusEl,
          plusEl = _self$refs2.plusEl;

      if (minusEl) {
        minusEl.addEventListener('click', self.onMinusClick);
      }

      if (plusEl) {
        plusEl.addEventListener('click', self.onPlusClick);
      }

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
            wraps = _self$props.wraps,
            manualInputMode = _self$props.manualInputMode,
            decimalPoint = _self$props.decimalPoint,
            buttonsEndInputMode = _self$props.buttonsEndInputMode;
        var el = self.refs.el;
        if (!el) return;
        self.f7Stepper = f7.stepper.create(Utils.noUndefinedProps({
          el: el,
          min: min,
          max: max,
          value: value,
          step: step,
          formatValue: formatValue,
          autorepeat: autorepeat,
          autorepeatDynamic: autorepeatDynamic,
          wraps: wraps,
          manualInputMode: manualInputMode,
          decimalPoint: decimalPoint,
          buttonsEndInputMode: buttonsEndInputMode,
          on: {
            change: function change(stepper, newValue) {
              self.dispatchEvent('stepper:change stepperChange', newValue);
            }
          }
        }));
      });
    }
  }, {
    key: "dispatchEvent",
    value: function dispatchEvent(events) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      return __reactComponentDispatchEvent.apply(void 0, [this, events].concat(args));
    }
  }, {
    key: "classes",
    get: function get() {
      var self = this;
      var props = self.props;
      var round = props.round,
          roundIos = props.roundIos,
          roundMd = props.roundMd,
          roundAurora = props.roundAurora,
          fill = props.fill,
          fillIos = props.fillIos,
          fillMd = props.fillMd,
          fillAurora = props.fillAurora,
          large = props.large,
          largeIos = props.largeIos,
          largeMd = props.largeMd,
          largeAurora = props.largeAurora,
          small = props.small,
          smallIos = props.smallIos,
          smallMd = props.smallMd,
          smallAurora = props.smallAurora,
          raised = props.raised,
          raisedMd = props.raisedMd,
          raisedIos = props.raisedIos,
          raisedAurora = props.raisedAurora,
          disabled = props.disabled;
      return Utils.classNames(self.props.className, 'stepper', {
        disabled: disabled,
        'stepper-round': round,
        'stepper-round-ios': roundIos,
        'stepper-round-md': roundMd,
        'stepper-round-aurora': roundAurora,
        'stepper-fill': fill,
        'stepper-fill-ios': fillIos,
        'stepper-fill-md': fillMd,
        'stepper-fill-aurora': fillAurora,
        'stepper-large': large,
        'stepper-large-ios': largeIos,
        'stepper-large-md': largeMd,
        'stepper-large-aurora': largeAurora,
        'stepper-small': small,
        'stepper-small-ios': smallIos,
        'stepper-small-md': smallMd,
        'stepper-small-aurora': smallAurora,
        'stepper-raised': raised,
        'stepper-raised-ios': raisedIos,
        'stepper-raised-md': raisedMd,
        'stepper-raised-aurora': raisedAurora
      }, Mixins.colorClasses(props));
    }
  }, {
    key: "refs",
    get: function get() {
      return this.__reactRefs;
    },
    set: function set(refs) {}
  }]);

  return F7Stepper;
}(React.Component);

__reactComponentSetProps(F7Stepper, Object.assign({
  id: [String, Number],
  className: String,
  style: Object,
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
  name: String,
  inputId: String,
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
    default: false
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
  manualInputMode: {
    type: Boolean,
    default: false
  },
  decimalPoint: {
    type: Number,
    default: 4
  },
  buttonsEndInputMode: {
    type: Boolean,
    default: true
  },
  disabled: Boolean,
  buttonsOnly: Boolean,
  round: Boolean,
  roundMd: Boolean,
  roundIos: Boolean,
  roundAurora: Boolean,
  fill: Boolean,
  fillMd: Boolean,
  fillIos: Boolean,
  fillAurora: Boolean,
  large: Boolean,
  largeMd: Boolean,
  largeIos: Boolean,
  largeAurora: Boolean,
  small: Boolean,
  smallMd: Boolean,
  smallIos: Boolean,
  smallAurora: Boolean,
  raised: Boolean,
  raisedMd: Boolean,
  raisedIos: Boolean,
  raisedAurora: Boolean
}, Mixins.colorProps));

F7Stepper.displayName = 'f7-stepper';
export default F7Stepper;