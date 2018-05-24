import React from 'react';
import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __reactComponentWatch from '../runtime-helpers/react-component-watch.js';
import __reactComponentDispatchEvent from '../runtime-helpers/react-component-dispatch-event.js';
import __reactComponentSlots from '../runtime-helpers/react-component-slots.js';
import __reactComponentSetProps from '../runtime-helpers/react-component-set-props.js';
class F7Range extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.__reactRefs = {};
  }
  setValue(newValue) {
    const self = this;
    if (self.f7Range && self.f7Range.setValue)
      self.f7Range.setValue(newValue);
  }
  getValue() {
    const self = this;
    if (self.f7Range && self.f7Range.getValue) {
      return self.f7Range.getValue();
    }
    return undefined;
  }
  render() {
    const self = this;
    const {id, disabled, className, style, input, inputId, name} = self.props;
    const classes = Utils.classNames(className, 'range-slider', { disabled }, Mixins.colorClasses(self));
    return React.createElement('div', {
      ref: __reactNode => {
        this.__reactRefs['el'] = __reactNode;
      },
      id: id,
      style: style,
      className: classes
    }, input && React.createElement('input', {
      type: 'range',
      name: name,
      id: inputId
    }), this.slots['default']);
  }
  componentWillUnmount() {
    const self = this;
    if (self.f7Range && self.f7Range.destroy)
      self.f7Range.destroy();
  }
  componentDidMount() {
    const self = this;
    self.$f7ready(f7 => {
      if (!self.props.init)
        return;
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
          }
        }
      });
    });
  }
  get slots() {
    return __reactComponentSlots(this.props);
  }
  dispatchEvent(events, ...args) {
    return __reactComponentDispatchEvent(this, events, ...args);
  }
  get refs() {
    return this.__reactRefs;
  }
  set refs(refs) {
  }
  componentDidUpdate(prevProps, prevState) {
    __reactComponentWatch(this, 'props.value', prevProps, prevState, newValue => {
      const self = this;
      if (!self.f7Range)
        return;
      self.f7Range.setValue(newValue);
    });
  }
}
__reactComponentSetProps(F7Range, {
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
});
export default F7Range;