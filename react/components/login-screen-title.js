import React from 'react';
import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __reactComponentSlots from '../runtime-helpers/react-component-slots.js';
import __reactComponentSetProps from '../runtime-helpers/react-component-set-props.js';
class F7LoginScreenTitle extends React.Component {
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
    return Utils.classNames('login-screen-title', self.props.className, Mixins.colorClasses(self));
  }
  get slots() {
    return __reactComponentSlots(this);
  }
}
__reactComponentSetProps(F7LoginScreenTitle, Mixins.colorProps);
export default F7LoginScreenTitle;