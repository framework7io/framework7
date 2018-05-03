import React from 'react';
import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __reactComponentSlots from '../runtime-helpers/react-component-slots.js';
import __reactComponentSetProps from '../runtime-helpers/react-component-set-props.js';
const CardContentProps = Utils.extend({
  padding: {
    type: Boolean,
    default: true
  }
}, Mixins.colorProps);
class F7CardContent extends React.Component {
  constructor(props, context) {
    super(props, context);
  }
  render() {
    return React.createElement('div', {
      id: this.props.id,
      style: this.props.style,
      className: this.classes
    }, this.slots['default']);
  }
  get classes() {
    const self = this;
    return Utils.classNames(self.props.className, {
      'card-content': true,
      'card-content-padding': self.props.padding
    }, Mixins.colorClasses(self));
  }
  get slots() {
    return __reactComponentSlots(this);
  }
}
__reactComponentSetProps(F7CardContent, CardContentProps);
export default F7CardContent;