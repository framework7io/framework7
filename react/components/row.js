import React from 'react';
import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __reactComponentSlots from '../runtime-helpers/react-component-slots.js';
import __reactComponentSetProps from '../runtime-helpers/react-component-set-props.js';
class F7Row extends React.Component {
  constructor(props, context) {
    super(props, context);
  }
  get classes() {
    const self = this;
    return Utils.classNames(self.props.className, {
      row: true,
      'no-gap': self.props.noGap
    }, Mixins.colorClasses(self));
  }
  render() {
    const self = this;
    const RowTag = self.props.tag;
    return React.createElement(RowTag, {
      id: this.props.id,
      style: this.props.style,
      className: self.classes
    }, this.slots['default']);
  }
  get slots() {
    return __reactComponentSlots(this.props);
  }
}
__reactComponentSetProps(F7Row, {
  id: [
    String,
    Number
  ],
  noGap: Boolean,
  tag: {
    type: String,
    default: 'div'
  },
  ...Mixins.colorProps
});
export default F7Row;