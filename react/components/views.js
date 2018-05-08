import React from 'react';
import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __reactComponentSlots from '../runtime-helpers/react-component-slots.js';
import __reactComponentSetProps from '../runtime-helpers/react-component-set-props.js';
class F7Views extends React.Component {
  constructor(props, context) {
    super(props, context);
  }
  render() {
    const self = this;
    const classes = Utils.classNames(self.props.className, 'views', { tabs: self.props.tabs }, Mixins.colorClasses(self));
    return React.createElement('div', {
      id: self.props.id,
      style: self.props.style,
      className: classes
    }, this.slots['default']);
  }
  get slots() {
    return __reactComponentSlots(this.props);
  }
}
__reactComponentSetProps(F7Views, {
  id: [
    String,
    Number
  ],
  tabs: Boolean,
  ...Mixins.colorProps
});
export default F7Views;