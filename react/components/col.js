import React from 'react';
import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __reactComponentSlots from '../runtime-helpers/react-component-slots.js';
import __reactComponentSetProps from '../runtime-helpers/react-component-set-props.js';
class F7Col extends React.Component {
  constructor(props, context) {
    super(props, context);
  }
  get classes() {
    const self = this;
    return Utils.classNames(self.props.className, {
      col: self.props.width === 'auto',
      [`col-${ self.props.width }`]: self.props.width !== 'auto',
      [`tablet-${ self.props.tabletWidth }`]: self.props.tabletWidth,
      [`desktop-${ self.props.desktopWidth }`]: self.props.desktopWidth
    }, Mixins.colorClasses(self));
  }
  render() {
    const self = this;
    const ColTag = self.props.tag;
    return React.createElement(ColTag, {
      id: this.props.id,
      style: this.props.style,
      className: self.classes
    }, this.slots['default']);
  }
  get slots() {
    return __reactComponentSlots(this.props);
  }
}
__reactComponentSetProps(F7Col, {
  id: [
    String,
    Number
  ],
  tag: {
    type: String,
    default: 'div'
  },
  width: {
    type: [
      Number,
      String
    ],
    default: 'auto'
  },
  tabletWidth: {
    type: [
      Number,
      String
    ]
  },
  desktopWidth: {
    type: [
      Number,
      String
    ]
  },
  ...Mixins.colorProps
});
export default F7Col;