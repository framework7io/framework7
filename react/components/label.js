import React from 'react';
import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __reactComponentSlots from '../runtime-helpers/react-component-slots.js';
import __reactComponentSetProps from '../runtime-helpers/react-component-set-props.js';
class F7Label extends React.Component {
  constructor(props, context) {
    super(props, context);
  }
  render() {
    const self = this;
    const {inline, id, style, className, floating} = self.props;
    if (inline) {
    }
    const classes = Utils.classNames(className, 'item-title', {
      'item-label': !floating,
      'item-floating-label': floating
    }, Mixins.colorClasses(self));
    return React.createElement('div', {
      id: id,
      style: style,
      className: classes
    }, this.slots['default']);
  }
  get slots() {
    return __reactComponentSlots(this);
  }
}
__reactComponentSetProps(F7Label, {
  floating: Boolean,
  inline: Boolean,
  ...Mixins.colorProps
});
export default F7Label;