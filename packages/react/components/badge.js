import React from 'react';
import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __reactComponentSlots from '../runtime-helpers/react-component-slots.js';
import __reactComponentSetProps from '../runtime-helpers/react-component-set-props.js';

class F7Badge extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const props = this.props;
    const {
      className,
      id,
      style
    } = props;
    const classes = Utils.classNames(className, 'badge', Mixins.colorClasses(props));
    return React.createElement('span', {
      id: id,
      style: style,
      className: classes
    }, this.slots['default']);
  }

  get slots() {
    return __reactComponentSlots(this.props);
  }

}

__reactComponentSetProps(F7Badge, Object.assign({
  id: [String, Number],
  className: String,
  style: Object
}, Mixins.colorProps));

F7Badge.displayName = 'f7-badge';
export default F7Badge;