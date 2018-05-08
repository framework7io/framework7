import React from 'react';
import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __reactComponentSlots from '../runtime-helpers/react-component-slots.js';
import __reactComponentSetProps from '../runtime-helpers/react-component-set-props.js';
class F7CardFooter extends React.Component {
  constructor(props, context) {
    super(props, context);
  }
  render() {
    const classes = Utils.classNames(this.props.className, 'card-footer', Mixins.colorClasses(this));
    return React.createElement('div', {
      id: this.props.id,
      style: this.props.style,
      className: classes
    }, this.slots['default']);
  }
  get slots() {
    return __reactComponentSlots(this.props);
  }
}
__reactComponentSetProps(F7CardFooter, {
  id: [
    String,
    Number
  ],
  ...Mixins.colorProps
});
export default F7CardFooter;