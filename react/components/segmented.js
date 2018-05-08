import React from 'react';
import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __reactComponentSlots from '../runtime-helpers/react-component-slots.js';
import __reactComponentSetProps from '../runtime-helpers/react-component-set-props.js';
class F7Segmented extends React.Component {
  constructor(props, context) {
    super(props, context);
  }
  render() {
    const self = this;
    const classNames = Utils.classNames(self.props.className, {
      segmented: true,
      'segmented-raised': self.props.raised,
      'segmented-round': self.props.round
    }, Mixins.colorClasses(self));
    const SegmentedTag = self.props.tag;
    return React.createElement(SegmentedTag, {
      id: self.props.id,
      style: self.props.style,
      className: classNames
    }, this.slots['default']);
  }
  get slots() {
    return __reactComponentSlots(this.props);
  }
}
__reactComponentSetProps(F7Segmented, {
  id: [
    String,
    Number
  ],
  raised: Boolean,
  round: Boolean,
  tag: {
    type: String,
    default: 'div'
  },
  ...Mixins.colorProps
});
export default F7Segmented;