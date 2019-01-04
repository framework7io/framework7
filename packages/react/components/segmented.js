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
    const props = self.props;
    const {
      className,
      raised,
      round,
      id,
      style,
      tag
    } = props;
    const classNames = Utils.classNames(className, {
      segmented: true,
      'segmented-raised': raised,
      'segmented-round': round
    }, Mixins.colorClasses(props));
    const SegmentedTag = tag;
    return React.createElement(SegmentedTag, {
      id: id,
      style: style,
      className: classNames
    }, this.slots['default']);
  }

  get slots() {
    return __reactComponentSlots(this.props);
  }

}

__reactComponentSetProps(F7Segmented, Object.assign({
  id: [String, Number],
  className: String,
  style: Object,
  raised: Boolean,
  round: Boolean,
  tag: {
    type: String,
    default: 'div'
  }
}, Mixins.colorProps));

F7Segmented.displayName = 'f7-segmented';
export default F7Segmented;