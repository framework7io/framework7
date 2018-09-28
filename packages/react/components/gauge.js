import React from 'react';
import Utils from '../utils/utils';
import __reactComponentSetProps from '../runtime-helpers/react-component-set-props.js';

class F7Gauge extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const props = this.props;
    const {
      className,
      id,
      style,
      type,
      value,
      size,
      bgColor,
      borderBgColor,
      borderColor,
      borderWidth,
      valueText,
      valueTextColor,
      valueFontSize,
      valueFontWeight,
      labelText,
      labelTextColor,
      labelFontSize,
      labelFontWeight
    } = props;
    const classes = Utils.classNames(className, 'gauge');
    const semiCircle = type === 'semicircle';
    const radius = size / 2 - borderWidth / 2;
    const length = 2 * Math.PI * radius;
    const progress = Math.max(Math.min(value, 1), 0);
    return React.createElement('div', {
      id: id,
      style: style,
      className: classes
    }, React.createElement('svg', {
      className: 'gauge-svg',
      width: `${size}px`,
      height: `${semiCircle ? size / 2 : size}px`,
      viewBox: `0 0 ${size} ${semiCircle ? size / 2 : size}`
    }, semiCircle && React.createElement('path', {
      className: 'gauge-back-semi',
      d: `M${size - borderWidth / 2},${size / 2} a1,1 0 0,0 -${size - borderWidth},0`,
      stroke: borderBgColor,
      strokeWidth: borderWidth,
      fill: bgColor || 'none'
    }), semiCircle && React.createElement('path', {
      className: 'gauge-front-semi',
      d: `M${size - borderWidth / 2},${size / 2} a1,1 0 0,0 -${size - borderWidth},0`,
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
      transform: `rotate(-90 ${size / 2} ${size / 2})`,
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

}

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