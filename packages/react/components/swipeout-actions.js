import React from 'react';
import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __reactComponentSlots from '../runtime-helpers/react-component-slots.js';
import __reactComponentSetProps from '../runtime-helpers/react-component-set-props.js';

class F7SwipeoutActions extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const props = this.props;
    const {
      left,
      right,
      side,
      className,
      id,
      style
    } = props;
    let sideComputed = side;

    if (!sideComputed) {
      if (left) sideComputed = 'left';
      if (right) sideComputed = 'right';
    }

    const classes = Utils.classNames(className, `swipeout-actions-${sideComputed}`, Mixins.colorClasses(props));
    return React.createElement('div', {
      id: id,
      style: style,
      className: classes
    }, this.slots['default']);
  }

  get slots() {
    return __reactComponentSlots(this.props);
  }

}

__reactComponentSetProps(F7SwipeoutActions, Object.assign({
  id: [String, Number],
  className: String,
  style: Object,
  left: Boolean,
  right: Boolean,
  side: String
}, Mixins.colorProps));

F7SwipeoutActions.displayName = 'f7-swipeout-actions';
export default F7SwipeoutActions;