import React from 'react';
import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __reactComponentSlots from '../runtime-helpers/react-component-slots.js';
import __reactComponentSetProps from '../runtime-helpers/react-component-set-props.js';
class F7SwipeoutActions extends React.Component {
  constructor(props, context) {
    super(props, context);
  }
  get classes() {
    return Utils.classNames(this.props.className, { [`swipeout-actions-${ this.sideComputed }`]: true }, Mixins.colorClasses(this));
  }
  get sideComputed() {
    const {left, right, side} = this;
    if (!side) {
      if (left)
        return 'left';
      if (right)
        return 'right';
      return 'right';
    }
    return side;
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
__reactComponentSetProps(F7SwipeoutActions, {
  id: [
    String,
    Number
  ],
  left: Boolean,
  right: Boolean,
  side: String,
  ...Mixins.colorProps
});
export default F7SwipeoutActions;