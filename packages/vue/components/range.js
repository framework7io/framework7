import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __vueComponentDispatchEvent from '../runtime-helpers/vue-component-dispatch-event.js';
import __vueComponentProps from '../runtime-helpers/vue-component-props.js';
export default {
  name: 'f7-range',
  props: Object.assign({
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
  }, Mixins.colorProps),
  render: function render() {
    var _h = this.$createElement;
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
    return _h('div', {
      ref: 'el',
      style: style,
      class: classes,
      attrs: {
        id: id
      }
    }, [input && _h('input', {
      attrs: {
        type: 'range',
        name: name,
        id: inputId
      }
    }), this.$slots['default']]);
  },
  watch: {
    'props.value': function watchValue(newValue) {
      var self = this;
      if (!self.f7Range) return;
      self.f7Range.setValue(newValue);
    }
  },
  mounted: function mounted() {
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
        el: self.$refs.el,
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
  },
  beforeDestroy: function beforeDestroy() {
    var self = this;
    if (self.f7Range && self.f7Range.destroy) self.f7Range.destroy();
  },
  methods: {
    setValue: function setValue(newValue) {
      var self = this;
      if (self.f7Range && self.f7Range.setValue) self.f7Range.setValue(newValue);
    },
    getValue: function getValue() {
      var self = this;

      if (self.f7Range && self.f7Range.getValue) {
        return self.f7Range.getValue();
      }

      return undefined;
    },
    dispatchEvent: function dispatchEvent(events) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      __vueComponentDispatchEvent.apply(void 0, [this, events].concat(args));
    }
  },
  computed: {
    props: function props() {
      return __vueComponentProps(this);
    }
  }
};