import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __vueComponentDispatchEvent from '../runtime-helpers/vue-component-dispatch-event.js';
import __vueComponentProps from '../runtime-helpers/vue-component-props.js';
export default {
  name: 'f7-range',
  props: {
    id: [
      String,
      Number
    ],
    init: {
      type: Boolean,
      default: true
    },
    value: {
      type: [
        Number,
        Array,
        String
      ],
      default: 0
    },
    min: {
      type: [
        Number,
        String
      ],
      default: 0
    },
    max: {
      type: [
        Number,
        String
      ],
      default: 100
    },
    step: {
      type: [
        Number,
        String
      ],
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
    },
    ...Mixins.colorProps
  },
  render() {
    const _h = this.$createElement;
    const self = this;
    const {id, disabled, className, style, input, inputId, name} = self.props;
    const classes = Utils.classNames(className, 'range-slider', { disabled }, Mixins.colorClasses(self));
    return _h('div', {
      ref: 'el',
      style: style,
      class: classes,
      attrs: { id: id }
    }, [
      input && _h('input', {
        attrs: {
          type: 'range',
          name: name,
          id: inputId
        }
      }),
      this.$slots['default']
    ]);
  },
  watch: {
    'props.value': function watchValue(newValue) {
      const self = this;
      if (!self.f7Range)
        return;
      self.f7Range.setValue(newValue);
    }
  },
  mounted() {
    const self = this;
    self.$f7ready(f7 => {
      if (!self.props.init)
        return;
      self.f7Range = f7.range.create({
        el: self.$refs.el,
        value: self.props.value,
        min: self.props.min,
        max: self.props.max,
        step: self.props.step,
        label: self.props.label,
        dual: self.props.dual,
        draggableBar: self.props.draggableBar,
        on: {
          change(range, value) {
            self.dispatchEvent('range:change rangeChange', value);
          },
          changed(range, value) {
            self.dispatchEvent('range:changed rangeChanged', value);
          }
        }
      });
    });
  },
  beforeDestroy() {
    const self = this;
    if (self.f7Range && self.f7Range.destroy)
      self.f7Range.destroy();
  },
  methods: {
    setValue(newValue) {
      const self = this;
      if (self.f7Range && self.f7Range.setValue)
        self.f7Range.setValue(newValue);
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