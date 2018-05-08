import Utils from '../utils/utils';
import Mixins from '../utils/mixins';

const RangeProps = Utils.extend({
  init: {
    type: Boolean,
    default: true,
  },
  value: {
    type: [Number, Array, String],
    default: 0,
  },
  min: {
    type: [Number, String],
    default: 0,
  },
  max: {
    type: [Number, String],
    default: 100,
  },
  step: {
    type: [Number, String],
    default: 1,
  },
  label: {
    type: Boolean,
    default: false,
  },
  dual: {
    type: Boolean,
    default: false,
  },
  disabled: Boolean,
  draggableBar: {
    type: Boolean,
    default: true,
  },
}, Mixins.colorProps);

export default {
  name: 'f7-range',
  props: RangeProps,
  render() {
    const self = this;

    const classes = Utils.classNames(
      self.props.className,
      'range-slider',
      {
        disabled: self.props.disabled,
      },
      Mixins.colorClasses(self),
    );

    return (
      <div
        ref="el"
        id={self.props.id}
        style={self.props.style}
        className={classes}
      />
    );
  },
  watch: {
    'props.value': function watchValue(newValue) {
      const self = this;
      if (!self.f7Range) return;
      self.f7Range.setValue(newValue);
    },
  },
  componentWillUnmount() {
    const self = this;
    if (self.f7Range && self.f7Range.destroy) self.f7Range.destroy();
  },
  componentDidMount() {
    const self = this;
    self.$f7ready((f7) => {
      if (!self.props.init) return;
      self.f7Range = f7.range.create({
        el: self.refs.el,
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
          },
        },
      });
    });
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
  },
};
