import React from 'react';
import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __reactComponentSlots from '../runtime-helpers/react-component-slots.js';
import __reactComponentSetProps from '../runtime-helpers/react-component-set-props.js';
class F7Subnavbar extends React.Component {
  constructor(props, context) {
    super(props, context);
  }
  get classes() {
    return Utils.classNames(this.props.className, {
      subnavbar: true,
      sliding: this.props.sliding
    }, Mixins.colorClasses(this));
  }
  render() {
    const self = this;
    const {inner, title} = self.props;
    return React.createElement('div', { className: self.classes }, inner ? React.createElement('div', { className: 'subnavbar-inner' }, title && React.createElement('div', { className: 'title' }, title), this.slots['default']) : this.slots['default']);
  }
  get slots() {
    return __reactComponentSlots(this.props);
  }
}
__reactComponentSetProps(F7Subnavbar, {
  id: [
    String,
    Number
  ],
  sliding: Boolean,
  title: String,
  inner: {
    type: Boolean,
    default: true
  },
  ...Mixins.colorProps
});
export default F7Subnavbar;