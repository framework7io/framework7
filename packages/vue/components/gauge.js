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
  render: function render() {
    var _h = this.$createElement;
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
    return _h('div', {
      style: style,
      class: classes,
      attrs: {
        id: id
      }
    }, [_h('svg', {
      class: 'gauge-svg',
      attrs: {
        width: "".concat(size, "px"),
        height: "".concat(semiCircle ? size / 2 : size, "px"),
        viewBox: "0 0 ".concat(size, " ").concat(semiCircle ? size / 2 : size)
      }
    }, [semiCircle && _h('path', {
      class: 'gauge-back-semi',
      attrs: {
        d: "M".concat(size - borderWidth / 2, ",").concat(size / 2, " a1,1 0 0,0 -").concat(size - borderWidth, ",0"),
        stroke: borderBgColor,
        'stroke-width': borderWidth,
        fill: bgColor || 'none'
      }
    }), semiCircle && _h('path', {
      class: 'gauge-front-semi',
      attrs: {
        d: "M".concat(size - borderWidth / 2, ",").concat(size / 2, " a1,1 0 0,0 -").concat(size - borderWidth, ",0"),
        stroke: borderColor,
        'stroke-width': borderWidth,
        'stroke-dasharray': length / 2,
        'stroke-dashoffset': length / 2 * (1 + progress),
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
        transform: "rotate(-90 ".concat(size / 2, " ").concat(size / 2, ")"),
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
        'dominant-baseline': !semiCircle ? 'middle' : null
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
        'dominant-baseline': !semiCircle ? 'middle' : null
      }
    }, [labelText])])]);
  },
  computed: {
    props: function props() {
      return __vueComponentProps(this);
    }
  }
};