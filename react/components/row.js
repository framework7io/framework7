import React from 'react';
import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __reactComponentSlots from '../runtime-helpers/react-component-slots.js';
import __reactComponentSetProps from '../runtime-helpers/react-component-set-props.js';
const RowProps = Utils.extend({
  noGap: Boolean,
  tag: {
    type: String,
    default: 'div'
  }
}, Mixins.colorProps);
class F7Row extends React.Component {
  constructor(props, context) {
    super(props, context);
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
  get classes() {
    const self = this;
    return Utils.classNames(self.props.className, {
      row: true,
      'no-gap': self.props.noGap
    }, Mixins.colorClasses(self));
  }
  get slots() {
    return __reactComponentSlots(this);
  }
}
__reactComponentSetProps(F7Row, RowProps);
export default F7Row;