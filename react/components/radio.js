import React from 'react';
import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __reactComponentDispatchEvent from '../runtime-helpers/react-component-dispatch-event.js';
import __reactComponentSlots from '../runtime-helpers/react-component-slots.js';
import __reactComponentSetProps from '../runtime-helpers/react-component-set-props.js';
const RadioProps = Utils.extend({
  checked: Boolean,
  name: [
    Number,
    String
  ],
  value: [
    Number,
    String,
    Boolean
  ],
  disabled: Boolean,
  readonly: Boolean
}, Mixins.colorProps);
class F7Radio extends React.Component {
  constructor(props, context) {
    super(props, context);
  }
  render() {
    const self = this;
    const {name, value, disabled, readonly, checked} = self;
    const inputEl = React.createElement('input', {
      type: 'radio',
      name: name,
      value: value,
      disabled: disabled,
      readOnly: readonly,
      checked: checked,
      onChange: self.onChange.bind(self)
    });
    const iconEl = React.createElement('i', { className: 'icon-radio' });
    return React.createElement('label', {
      id: self.props.id,
      style: self.props.style,
      className: self.classes
    }, inputEl, iconEl, this.slots['default']);
  }
  get classes() {
    const self = this;
    return Utils.classNames(self.props.className, {
      radio: true,
      disabled: self.disabled
    }, Mixins.colorClasses(self));
  }
  onChange(event) {
    this.dispatchEvent('change', event);
  }
  get slots() {
    return __reactComponentSlots(this);
  }
  dispatchEvent(events, ...args) {
    return __reactComponentDispatchEvent(this, events, ...args);
  }
}
__reactComponentSetProps(F7Radio, RadioProps);
export default F7Radio;