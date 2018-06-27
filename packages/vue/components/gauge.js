import Utils from '../utils/utils';
import __vueComponentProps from '../runtime-helpers/vue-component-props.js';
export default {
  props: {
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
  },
  name: 'f7-gauge',

  render() {
    const _h = this.$createElement;
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
    {
      return _h('div', {
        style: style,
        class: classes,
        attrs: {
          id: id
        }
      }, [_h('svg', {
        class: 'gauge-svg',
        attrs: {
          width: `${size}px`,
          height: `${semiCircle ? size / 2 : size}px`,
          viewBox: `0 0 ${size} ${semiCircle ? size / 2 : size}`
        }
      }, [semiCircle && _h('path', {
        class: 'gauge-back-semi',
        attrs: {
          d: `M${size - borderWidth / 2},${size / 2} a1,1 0 0,0 -${size - borderWidth},0`,
          stroke: borderBgColor,
          'stroke-width': borderWidth,
          fill: bgColor || 'none'
        }
      }), semiCircle && _h('path', {
        class: 'gauge-front-semi',
        attrs: {
          d: `M${size - borderWidth / 2},${size / 2} a1,1 0 0,0 -${size - borderWidth},0`,
          stroke: borderColor,
          'stroke-width': borderWidth,
          'stroke-dasharray': length / 2,
          'stroke-dashoffset': length / 2 * (progress - 1),
          fill: borderBgColor ? 'none' : bgColor || 'none'
        }
      }), !semiCircle && borderBgColor && _h('circle', {
        class: 'gauge-back-circle',
        attrs: {
          stroke: borderBgColor,
          'stroke-width': borderWidth,
          fill: bgColor || 'none',
          cx: size / 2,
          cy: size / 2,
          r: radius
        }
      }), !semiCircle && _h('circle', {
        class: 'gauge-front-circle',
        attrs: {
          transform: `rotate(-90 ${size / 2} ${size / 2})`,
          stroke: borderColor,
          'stroke-width': borderWidth,
          'stroke-dasharray': length,
          'stroke-dashoffset': length * (1 - progress),
          fill: borderBgColor ? 'none' : bgColor || 'none',
          cx: size / 2,
          cy: size / 2,
          r: radius
        }
      }), valueText && _h('text', {
        class: 'gauge-value-text',
        attrs: {
          x: '50%',
          y: semiCircle ? '100%' : '50%',
          'font-weight': valueFontWeight,
          'font-size': valueFontSize,
          fill: valueTextColor,
          dy: semiCircle ? labelText ? -labelFontSize - 15 : -5 : 0,
          'text-anchor': 'middle',
          'dominant-baseline': !semiCircle && 'middle'
        }
      }, [valueText]), labelText && _h('text', {
        class: 'gauge-label-text',
        attrs: {
          x: '50%',
          y: semiCircle ? '100%' : '50%',
          'font-weight': labelFontWeight,
          'font-size': labelFontSize,
          fill: labelTextColor,
          dy: semiCircle ? -5 : valueText ? valueFontSize / 2 + 10 : 0,
          'text-anchor': 'middle',
          'dominant-baseline': !semiCircle && 'middle'
        }
      }, [labelText])])]);
    }
  },

  computed: {
    props() {
      return __vueComponentProps(this);
    }

  }
};