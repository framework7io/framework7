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
    const {id, className, style, padding} = this.props;
    const classes = Utils.classNames(className, {
      'card-content': true,
      'card-content-padding': padding
    }, Mixins.colorClasses(this));
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
__reactComponentSetProps(F7CardContent, {
  id: [
    String,
    Number
  ],
  padding: {
    type: Boolean,
    default: true
  },
  ...Mixins.colorProps
});
export default F7CardContent;