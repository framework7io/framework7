import React from 'react';
import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __reactComponentSlots from '../runtime-helpers/react-component-slots.js';
import __reactComponentSetProps from '../runtime-helpers/react-component-set-props.js';

class F7BlockHeader extends React.Component {
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
    const classes = Utils.classNames(className, 'block-header', Mixins.colorClasses(props));
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

__reactComponentSetProps(F7BlockHeader, Object.assign({
  id: [String, Number],
  className: String,
  style: Object
}, Mixins.colorProps));

F7BlockHeader.displayName = 'f7-block-header';
export default F7BlockHeader;