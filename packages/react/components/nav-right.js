import React from 'react';
import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __reactComponentSlots from '../runtime-helpers/react-component-slots.js';
import __reactComponentSetProps from '../runtime-helpers/react-component-set-props.js';

class F7NavRight extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const props = this.props;
    const {
      className,
      id,
      style,
      sliding
    } = props;
    const classes = Utils.classNames(className, 'right', {
      sliding
    }, Mixins.colorClasses(props));
    const children = [];
    const slots = this.slots;

    if (slots && Object.keys(slots).length) {
      Object.keys(slots).forEach(key => {
        children.push(...slots[key]);
      });
    }

    return React.createElement('div', {
      id: id,
      style: style,
      className: classes
    }, children);
  }

  get slots() {
    return __reactComponentSlots(this.props);
  }

}

__reactComponentSetProps(F7NavRight, Object.assign({
  id: [String, Number],
  className: String,
  style: Object,
  sliding: Boolean
}, Mixins.colorProps));

F7NavRight.displayName = 'f7-nav-right';
export default F7NavRight;