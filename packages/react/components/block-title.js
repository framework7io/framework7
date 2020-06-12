import React from 'react';
import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __reactComponentSlots from '../runtime-helpers/react-component-slots.js';
import __reactComponentSetProps from '../runtime-helpers/react-component-set-props.js';

class F7BlockTitle extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const props = this.props;
    const {
      className,
      id,
      style,
      large,
      medium
    } = props;
    const classes = Utils.classNames(className, 'block-title', {
      'block-title-large': large,
      'block-title-medium': medium
    }, Mixins.colorClasses(props));
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

__reactComponentSetProps(F7BlockTitle, Object.assign({
  id: [String, Number],
  className: String,
  style: Object,
  large: Boolean,
  medium: Boolean
}, Mixins.colorProps));

F7BlockTitle.displayName = 'f7-block-title';
export default F7BlockTitle;