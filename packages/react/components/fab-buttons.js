import React from 'react';
import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __reactComponentSlots from '../runtime-helpers/react-component-slots.js';
import __reactComponentSetProps from '../runtime-helpers/react-component-set-props.js';

class F7FabButtons extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const props = this.props;
    const {
      className,
      id,
      style,
      position
    } = props;
    const classes = Utils.classNames(className, 'fab-buttons', `fab-buttons-${position}`, Mixins.colorClasses(props));
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

__reactComponentSetProps(F7FabButtons, Object.assign({
  id: [String, Number],
  className: String,
  style: Object,
  position: {
    type: String,
    default: 'top'
  }
}, Mixins.colorProps));

F7FabButtons.displayName = 'f7-fab-buttons';
export default F7FabButtons;