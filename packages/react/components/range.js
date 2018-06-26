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

var _reactComponentWatch = require('../runtime-helpers/react-component-watch.js');

var _reactComponentWatch2 = _interopRequireDefault(_reactComponentWatch);

var _reactComponentDispatchEvent = require('../runtime-helpers/react-component-dispatch-event.js');

var _reactComponentDispatchEvent2 = _interopRequireDefault(_reactComponentDispatchEvent);

var _reactComponentSlots = require('../runtime-helpers/react-component-slots.js');

var _reactComponentSlots2 = _interopRequireDefault(_reactComponentSlots);

var _reactComponentSetProps = require('../runtime-helpers/react-component-set-props.js');

var _reactComponentSetProps2 = _interopRequireDefault(_reactComponentSetProps);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var F7Range = function (_React$Component) {
  _inherits(F7Range, _React$Component);

  function F7Range(props, context) {
    _classCallCheck(this, F7Range);

    var _this = _possibleConstructorReturn(this, (F7Range.__proto__ || Object.getPrototypeOf(F7Range)).call(this, props, context));

    _this.__reactRefs = {};
    return _this;
  }

  _createClass(F7Range, [{
    key: 'setValue',
    value: function setValue(newValue) {
      var self = this;
      if (self.f7Range && self.f7Range.setValue) self.f7Range.setValue(newValue);
    }
  }, {
    key: 'getValue',
    value: function getValue() {
      var self = this;

      if (self.f7Range && self.f7Range.getValue) {
        return self.f7Range.getValue();
      }

      return undefined;
    }
  }, {
    key: 'render',
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
          name = _self$props.name;

      var classes = _utils2.default.classNames(className, 'range-slider', {
        disabled: disabled
      }, _mixins2.default.colorClasses(props));
      return _react2.default.createElement('div', {
        ref: function ref(__reactNode) {
          _this2.__reactRefs['el'] = __reactNode;
        },
        id: id,
        style: style,
        className: classes
      }, input && _react2.default.createElement('input', {
        type: 'range',
        name: name,
        id: inputId
      }), this.slots['default']);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var self = this;
      if (self.f7Range && self.f7Range.destroy) self.f7Range.destroy();
    }
  }, {
    key: 'componentDidMount',
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
            draggableBar = props.draggableBar;

        self.f7Range = f7.range.create(_utils2.default.noUndefinedProps({
          el: self.refs.el,
          value: value,
          min: min,
          max: max,
          step: step,
          label: label,
          dual: dual,
          draggableBar: draggableBar,
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
    key: 'dispatchEvent',
    value: function dispatchEvent(events) {
      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      return _reactComponentDispatchEvent2.default.apply(undefined, [this, events].concat(args));
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      var _this3 = this;

      (0, _reactComponentWatch2.default)(this, 'props.value', prevProps, prevState, function (newValue) {
        var self = _this3;
        if (!self.f7Range) return;
        self.f7Range.setValue(newValue);
      });
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

  return F7Range;
}(_react2.default.Component);

(0, _reactComponentSetProps2.default)(F7Range, Object.assign({
  id: [String, Number],
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
  name: String,
  inputId: String,
  input: Boolean,
  disabled: Boolean,
  draggableBar: {
    type: Boolean,
    default: true
  }
}, _mixins2.default.colorProps));

exports.default = F7Range;