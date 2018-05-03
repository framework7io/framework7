import React from 'react';
import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __reactComponentSlots from '../runtime-helpers/react-component-slots.js';
import __reactComponentSetProps from '../runtime-helpers/react-component-set-props.js';
const NavRightProps = Utils.extend({ sliding: Boolean }, Mixins.colorProps);
class F7NavRight extends React.Component {
  constructor(props, context) {
    super(props, context);
  }
  render() {
    return React.createElement('div', {
      id: this.props.id,
      style: this.props.style,
      className: this.classes
    }, this.slots['default']);
  }
  get classes() {
    return Utils.classNames(this.props.className, {
      right: true,
      sliding: this.props.slidng
    }, Mixins.colorClasses(this));
  }
  get slots() {
    return __reactComponentSlots(this);
  }
}
__reactComponentSetProps(F7NavRight, NavRightProps);
export default F7NavRight;