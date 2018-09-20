import React from 'react';
import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __reactComponentSlots from '../runtime-helpers/react-component-slots.js';
import __reactComponentSetProps from '../runtime-helpers/react-component-set-props.js';

class F7CardContent extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const props = this.props;
    const {
      id,
      className,
      style,
      padding
    } = props;
    const classes = Utils.classNames(className, 'card-content', {
      'card-content-padding': padding
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

__reactComponentSetProps(F7CardContent, Object.assign({
  id: [String, Number],
  className: String,
  style: Object,
  padding: {
    type: Boolean,
    default: true
  }
}, Mixins.colorProps));

F7CardContent.displayName = 'f7-card-content';
export default F7CardContent;