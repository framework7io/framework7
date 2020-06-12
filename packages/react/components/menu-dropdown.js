import React from 'react';
import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __reactComponentSlots from '../runtime-helpers/react-component-slots.js';
import __reactComponentSetProps from '../runtime-helpers/react-component-set-props.js';

class F7MenuDropdown extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const self = this;
    const props = self.props;
    const {
      id,
      className,
      style,
      contentHeight,
      position,
      left,
      center,
      right
    } = props;
    let positionComputed = position || 'left';
    if (left) positionComputed = 'left';
    if (center) positionComputed = 'center';
    if (right) positionComputed = 'right';
    const classes = Utils.classNames('menu-dropdown', `menu-dropdown-${positionComputed}`, Mixins.colorClasses(props), className);
    return React.createElement('div', {
      className: classes,
      id: id,
      style: style
    }, React.createElement('div', {
      className: 'menu-dropdown-content',
      style: {
        height: contentHeight
      }
    }, this.slots['default']));
  }

  get slots() {
    return __reactComponentSlots(this.props);
  }

}

__reactComponentSetProps(F7MenuDropdown, Object.assign({
  id: [String, Number],
  className: String,
  style: Object,
  contentHeight: String,
  position: String,
  left: Boolean,
  center: Boolean,
  right: Boolean
}, Mixins.colorProps));

F7MenuDropdown.displayName = 'f7-menu-dropdown';
export default F7MenuDropdown;