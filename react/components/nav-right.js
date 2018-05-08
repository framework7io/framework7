import React from 'react';
import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __reactComponentSlots from '../runtime-helpers/react-component-slots.js';
import __reactComponentSetProps from '../runtime-helpers/react-component-set-props.js';
class F7NavRight extends React.Component {
  constructor(props, context) {
    super(props, context);
  }
  get classes() {
    return Utils.classNames(this.props.className, {
      right: true,
      sliding: this.props.slidng
    }, Mixins.colorClasses(this));
  }
  render() {
    return React.createElement('div', {
      id: this.props.id,
      style: this.props.style,
      className: this.classes
    }, this.slots['default']);
  }
  get slots() {
    return __reactComponentSlots(this.props);
  }
}
__reactComponentSetProps(F7NavRight, {
  id: [
    String,
    Number
  ],
  sliding: Boolean,
  ...Mixins.colorProps
});
export default F7NavRight;