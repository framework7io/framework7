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

  render() {
    const _h = this.$createElement;
    const self = this;
    const props = self.props;
    const {
      id,
      disabled,
      className,
      style,
      input,
      inputId,
      name,
      vertical,
      verticalReversed
    } = self.props;
    const classes = Utils.classNames(className, 'range-slider', {
      'range-slider-horizontal': !vertical,
      'range-slider-vertical': vertical,
      'range-slider-vertical-reversed': vertical && verticalReversed,
      disabled
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
      const self = this;
      if (!self.f7Range) return;
      self.f7Range.setValue(newValue);
    }
  },

  mounted() {
    const self = this;
    self.$f7ready(f7 => {
      if (!self.props.init) return;
      const props = self.props;
      const {
        value,
        min,
        max,
        step,
        label,
        dual,
        draggableBar,
        vertical,
        verticalReversed,
        formatLabel,
        scale,
        scaleSteps,
        scaleSubSteps,
        formatScaleLabel,
        limitKnobPosition
      } = props;
      self.f7Range = f7.range.create(Utils.noUndefinedProps({
        el: self.$refs.el,
        value,
        min,
        max,
        step,
        label,
        dual,
        draggableBar,
        vertical,
        verticalReversed,
        formatLabel,
        scale,
        scaleSteps,
        scaleSubSteps,
        formatScaleLabel,
        limitKnobPosition,
        on: {
          change(range, val) {
            self.dispatchEvent('range:change rangeChange', val);
          },

          changed(range, val) {
            self.dispatchEvent('range:changed rangeChanged', val);
          }

        }
      }));
    });
  },

  beforeDestroy() {
    const self = this;
    if (self.f7Range && self.f7Range.destroy) self.f7Range.destroy();
  },

  methods: {
    setValue(newValue) {
      const self = this;
      if (self.f7Range && self.f7Range.setValue) self.f7Range.setValue(newValue);
    },

    getValue() {
      const self = this;

      if (self.f7Range && self.f7Range.getValue) {
        return self.f7Range.getValue();
      }

      return undefined;
    },

    dispatchEvent(events, ...args) {
      __vueComponentDispatchEvent(this, events, ...args);
    }

  },
  computed: {
    props() {
      return __vueComponentProps(this);
    }

  }
};