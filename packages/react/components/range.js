function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

import React from 'react';
import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __reactComponentWatch from '../runtime-helpers/react-component-watch.js';
import __reactComponentDispatchEvent from '../runtime-helpers/react-component-dispatch-event.js';
import __reactComponentSlots from '../runtime-helpers/react-component-slots.js';
import __reactComponentSetProps from '../runtime-helpers/react-component-set-props.js';

var F7Range =
/*#__PURE__*/
function (_React$Component) {
  _inherits(F7Range, _React$Component);

  function F7Range(props, context) {
    var _this;

    _classCallCheck(this, F7Range);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(F7Range).call(this, props, context));
    _this.__reactRefs = {};
    return _this;
  }

  _createClass(F7Range, [{
    key: "setValue",
    value: function setValue(newValue) {
      var self = this;
      if (self.f7Range && self.f7Range.setValue) self.f7Range.setValue(newValue);
    }
  }, {
    key: "getValue",
    value: function getValue() {
      var self = this;

      if (self.f7Range && self.f7Range.getValue) {
        return self.f7Range.getValue();
      }

      return undefined;
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var self = this;
      var props = self.props;
      var _self$props = self.props,
          id = _self$props.id,
          disabled = _self$props.disabled,
          className = _self$props.className,
          style = _self$props.style,
          input = _self$props.input,
          inputId = _self$props.inputId,
          name = _self$props.name,
          vertical = _self$props.vertical,
          verticalReversed = _self$props.verticalReversed;
      var classes = Utils.classNames(className, 'range-slider', {
        'range-slider-horizontal': !vertical,
        'range-slider-vertical': vertical,
        'range-slider-vertical-reversed': vertical && verticalReversed,
        disabled: disabled
      }, Mixins.colorClasses(props));
      return React.createElement('div', {
        ref: function ref(__reactNode) {
          _this2.__reactRefs['el'] = __reactNode;
        },
        id: id,
        style: style,
        className: classes
      }, input && React.createElement('input', {
        type: 'range',
        name: name,
        id: inputId
      }), this.slots['default']);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var self = this;
      if (self.f7Range && self.f7Range.destroy) self.f7Range.destroy();
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var self = this;
      self.$f7ready(function (f7) {
        if (!self.props.init) return;
        var props = self.props;
        var value = props.value,
            min = props.min,
            max = props.max,
            step = props.step,
            label = props.label,
            dual = props.dual,
            draggableBar = props.draggableBar,
            vertical = props.vertical,
            verticalReversed = props.verticalReversed,
            formatLabel = props.formatLabel,
            scale = props.scale,
            scaleSteps = props.scaleSteps,
            scaleSubSteps = props.scaleSubSteps,
            formatScaleLabel = props.formatScaleLabel,
            limitKnobPosition = props.limitKnobPosition;
        self.f7Range = f7.range.create(Utils.noUndefinedProps({
          el: self.refs.el,
          value: value,
          min: min,
          max: max,
          step: step,
          label: label,
          dual: dual,
          draggableBar: draggableBar,
          vertical: vertical,
          verticalReversed: verticalReversed,
          formatLabel: formatLabel,
          scale: scale,
          scaleSteps: scaleSteps,
          scaleSubSteps: scaleSubSteps,
          formatScaleLabel: formatScaleLabel,
          limitKnobPosition: limitKnobPosition,
          on: {
            change: function change(range, val) {
              self.dispatchEvent('range:change rangeChange', val);
            },
            changed: function changed(range, val) {
              self.dispatchEvent('range:changed rangeChanged', val);
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
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      var _this3 = this;

      __reactComponentWatch(this, 'props.value', prevProps, prevState, function (newValue) {
        var self = _this3;
        if (!self.f7Range) return;
        self.f7Range.setValue(newValue);
      });
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

  return F7Range;
}(React.Component);

__reactComponentSetProps(F7Range, Object.assign({
  id: [String, Number],
  className: String,
  style: Object,
  init: {
    type: Boolean,
    default: true
  },
  value: {
    type: [Number, Array, String],
    default: 0
  },
  min: {
    type: [Number, String],
    default: 0
  },
  max: {
    type: [Number, String],
    default: 100
  },
  step: {
    type: [Number, String],
    default: 1
  },
  label: {
    type: Boolean,
    default: false
  },
  dual: {
    type: Boolean,
    default: false
  },
  vertical: {
    type: Boolean,
    default: false
  },
  verticalReversed: {
    type: Boolean,
    default: false
  },
  draggableBar: {
    type: Boolean,
    default: true
  },
  formatLabel: Function,
  scale: {
    type: Boolean,
    default: false
  },
  scaleSteps: {
    type: Number,
    default: 5
  },
  scaleSubSteps: {
    type: Number,
    default: 0
  },
  formatScaleLabel: Function,
  limitKnobPosition: {
    type: Boolean,
    default: undefined
  },
  name: String,
  input: Boolean,
  inputId: String,
  disabled: Boolean
}, Mixins.colorProps));

F7Range.displayName = 'f7-range';
export default F7Range;