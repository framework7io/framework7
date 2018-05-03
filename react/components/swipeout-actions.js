import React from 'react';
import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __reactComponentSlots from '../runtime-helpers/react-component-slots.js';
import __reactComponentSetProps from '../runtime-helpers/react-component-set-props.js';
const SwipeoutActionsProps = Utils.extend({
  left: Boolean,
  right: Boolean,
  side: String
}, Mixins.colorProps);
class F7SwipeoutActions extends React.Component {
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
  get slots() {
    return __reactComponentSlots(this);
  }
}
__reactComponentSetProps(F7SwipeoutActions, SwipeoutActionsProps);
export default F7SwipeoutActions;