import React from 'react';
import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __reactComponentSlots from '../runtime-helpers/react-component-slots.js';
import __reactComponentSetProps from '../runtime-helpers/react-component-set-props.js';
const SubnavbarProps = Utils.extend({
  sliding: Boolean,
  title: String,
  inner: {
    type: Boolean,
    default: true
  }
}, Mixins.colorProps);
class F7Subnavbar extends React.Component {
  constructor(props, context) {
    super(props, context);
  }
  render() {
    const self = this;
    const {inner, title} = self.props;
    return React.createElement('div', { className: self.classes }, inner ? React.createElement('div', { className: 'subnavbar-inner' }, title && React.createElement('div', { className: 'title' }, title), this.slots['default']) : this.slots['default']);
  }
  get classes() {
    return Utils.classNames(this.props.className, {
      subnavbar: true,
      sliding: this.props.sliding
    }, Mixins.colorClasses(this));
  }
  get slots() {
    return __reactComponentSlots(this);
  }
}
__reactComponentSetProps(F7Subnavbar, SubnavbarProps);
export default F7Subnavbar;