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
import __reactComponentSetProps from '../runtime-helpers/react-component-set-props.js';

var F7Gauge =
/*#__PURE__*/
function (_React$Component) {
  _inherits(F7Gauge, _React$Component);

  function F7Gauge(props, context) {
    _classCallCheck(this, F7Gauge);

    return _possibleConstructorReturn(this, _getPrototypeOf(F7Gauge).call(this, props, context));
  }

  _createClass(F7Gauge, [{
    key: "render",
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
      var classes = Utils.classNames(className, 'gauge');
      var semiCircle = type === 'semicircle';
      var radius = size / 2 - borderWidth / 2;
      var length = 2 * Math.PI * radius;
      var progress = Math.max(Math.min(value, 1), 0);
      return React.createElement('div', {
        id: id,
        style: style,
        className: classes
      }, React.createElement('svg', {
        className: 'gauge-svg',
        width: "".concat(size, "px"),
        height: "".concat(semiCircle ? size / 2 : size, "px"),
        viewBox: "0 0 ".concat(size, " ").concat(semiCircle ? size / 2 : size)
      }, semiCircle && React.createElement('path', {
        className: 'gauge-back-semi',
        d: "M".concat(size - borderWidth / 2, ",").concat(size / 2, " a1,1 0 0,0 -").concat(size - borderWidth, ",0"),
        stroke: borderBgColor,
        strokeWidth: borderWidth,
        fill: bgColor || 'none'
      }), semiCircle && React.createElement('path', {
        className: 'gauge-front-semi',
        d: "M".concat(size - borderWidth / 2, ",").concat(size / 2, " a1,1 0 0,0 -").concat(size - borderWidth, ",0"),
        stroke: borderColor,
        strokeWidth: borderWidth,
        strokeDasharray: length / 2,
        strokeDashoffset: length / 2 * (1 + progress),
        fill: borderBgColor ? 'none' : bgColor || 'none'
      }), !semiCircle && borderBgColor && React.createElement('circle', {
        className: 'gauge-back-circle',
        stroke: borderBgColor,
        strokeWidth: borderWidth,
        fill: bgColor || 'none',
        cx: size / 2,
        cy: size / 2,
        r: radius
      }), !semiCircle && React.createElement('circle', {
        className: 'gauge-front-circle',
        transform: "rotate(-90 ".concat(size / 2, " ").concat(size / 2, ")"),
        stroke: borderColor,
        strokeWidth: borderWidth,
        strokeDasharray: length,
        strokeDashoffset: length * (1 - progress),
        fill: borderBgColor ? 'none' : bgColor || 'none',
        cx: size / 2,
        cy: size / 2,
        r: radius
      }), valueText && React.createElement('text', {
        className: 'gauge-value-text',
        x: '50%',
        y: semiCircle ? '100%' : '50%',
        fontWeight: valueFontWeight,
        fontSize: valueFontSize,
        fill: valueTextColor,
        dy: semiCircle ? labelText ? -labelFontSize - 15 : -5 : 0,
        textAnchor: 'middle',
        dominantBaseline: !semiCircle ? 'middle' : null
      }, valueText), labelText && React.createElement('text', {
        className: 'gauge-label-text',
        x: '50%',
        y: semiCircle ? '100%' : '50%',
        fontWeight: labelFontWeight,
        fontSize: labelFontSize,
        fill: labelTextColor,
        dy: semiCircle ? -5 : valueText ? valueFontSize / 2 + 10 : 0,
        textAnchor: 'middle',
        dominantBaseline: !semiCircle ? 'middle' : null
      }, labelText)));
    }
  }]);

  return F7Gauge;
}(React.Component);

__reactComponentSetProps(F7Gauge, {
  id: [String, Number],
  className: String,
  style: Object,
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

F7Gauge.displayName = 'f7-gauge';
export default F7Gauge;