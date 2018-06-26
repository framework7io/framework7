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

var F7Gauge = function (_React$Component) {
  _inherits(F7Gauge, _React$Component);

  function F7Gauge(props, context) {
    _classCallCheck(this, F7Gauge);

    return _possibleConstructorReturn(this, (F7Gauge.__proto__ || Object.getPrototypeOf(F7Gauge)).call(this, props, context));
  }

  _createClass(F7Gauge, [{
    key: 'render',
    value: function render() {
      var props = this.props;
      var className = props.className,
          id = props.id,
          style = props.style,
          type = props.type,
          value = props.value,
          size = props.size,
          bgColor = props.bgColor,
          borderBgColor = props.borderBgColor,
          borderColor = props.borderColor,
          borderWidth = props.borderWidth,
          valueText = props.valueText,
          valueTextColor = props.valueTextColor,
          valueFontSize = props.valueFontSize,
          valueFontWeight = props.valueFontWeight,
          labelText = props.labelText,
          labelTextColor = props.labelTextColor,
          labelFontSize = props.labelFontSize,
          labelFontWeight = props.labelFontWeight;

      var classes = _utils2.default.classNames(className, 'gauge');
      var semiCircle = type === 'semicircle';
      var radius = size / 2 - borderWidth / 2;
      var length = 2 * Math.PI * radius;
      var progress = Math.max(Math.min(value, 1), 0);
      {
        return _react2.default.createElement('div', {
          id: id,
          style: style,
          className: classes
        }, _react2.default.createElement('svg', {
          className: 'gauge-svg',
          width: size + 'px',
          height: (semiCircle ? size / 2 : size) + 'px',
          viewBox: '0 0 ' + size + ' ' + (semiCircle ? size / 2 : size)
        }, semiCircle && _react2.default.createElement('path', {
          className: 'gauge-back-semi',
          d: 'M' + (size - borderWidth / 2) + ',' + size / 2 + ' a1,1 0 0,0 -' + (size - borderWidth) + ',0',
          stroke: borderBgColor,
          strokeWidth: borderWidth,
          fill: bgColor || 'none'
        }), semiCircle && _react2.default.createElement('path', {
          className: 'gauge-front-semi',
          d: 'M' + (size - borderWidth / 2) + ',' + size / 2 + ' a1,1 0 0,0 -' + (size - borderWidth) + ',0',
          stroke: borderColor,
          strokeWidth: borderWidth,
          strokeDasharray: length / 2,
          strokeDashoffset: length / 2 * (progress - 1),
          fill: borderBgColor ? 'none' : bgColor || 'none'
        }), !semiCircle && borderBgColor && _react2.default.createElement('circle', {
          className: 'gauge-back-circle',
          stroke: borderBgColor,
          strokeWidth: borderWidth,
          fill: bgColor || 'none',
          cx: size / 2,
          cy: size / 2,
          r: radius
        }), !semiCircle && _react2.default.createElement('circle', {
          className: 'gauge-front-circle',
          transform: 'rotate(-90 ' + size / 2 + ' ' + size / 2 + ')',
          stroke: borderColor,
          strokeWidth: borderWidth,
          strokeDasharray: length,
          strokeDashoffset: length * (1 - progress),
          fill: borderBgColor ? 'none' : bgColor || 'none',
          cx: size / 2,
          cy: size / 2,
          r: radius
        }), valueText && _react2.default.createElement('text', {
          className: 'gauge-value-text',
          x: '50%',
          y: semiCircle ? '100%' : '50%',
          fontWeight: valueFontWeight,
          fontSize: valueFontSize,
          fill: valueTextColor,
          dy: semiCircle ? labelText ? -labelFontSize - 15 : -5 : 0,
          textAnchor: 'middle',
          dominantBaseline: !semiCircle && 'middle'
        }, valueText), labelText && _react2.default.createElement('text', {
          className: 'gauge-label-text',
          x: '50%',
          y: semiCircle ? '100%' : '50%',
          fontWeight: labelFontWeight,
          fontSize: labelFontSize,
          fill: labelTextColor,
          dy: semiCircle ? -5 : valueText ? valueFontSize / 2 + 10 : 0,
          textAnchor: 'middle',
          dominantBaseline: !semiCircle && 'middle'
        }, labelText)));
      }
    }
  }]);

  return F7Gauge;
}(_react2.default.Component);

(0, _reactComponentSetProps2.default)(F7Gauge, {
  id: [String, Number],
  type: {
    type: String,
    default: 'circle'
  },
  value: {
    type: [Number, String],
    default: 0
  },
  size: {
    type: [Number, String],
    default: 200
  },
  bgColor: {
    type: String,
    default: 'transparent'
  },
  borderBgColor: {
    type: String,
    default: '#eeeeee'
  },
  borderColor: {
    type: String,
    default: '#000000'
  },
  borderWidth: {
    type: [Number, String],
    default: 10
  },
  valueText: [Number, String],
  valueTextColor: {
    type: String,
    default: '#000000'
  },
  valueFontSize: {
    type: [Number, String],
    default: 31
  },
  valueFontWeight: {
    type: [Number, String],
    default: 500
  },
  labelText: String,
  labelTextColor: {
    type: String,
    default: '#888888'
  },
  labelFontSize: {
    type: [Number, String],
    default: 14
  },
  labelFontWeight: {
    type: [Number, String],
    default: 400
  }
});

exports.default = F7Gauge;