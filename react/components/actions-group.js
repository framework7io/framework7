import React from 'react';
import Mixins from '../utils/mixins';
import Utils from '../utils/utils';
import __reactComponentSlots from '../runtime-helpers/react-component-slots.js';
import __reactComponentSetProps from '../runtime-helpers/react-component-set-props.js';
class F7ActionsGroup extends React.Component {
  constructor(props, context) {
    super(props, context);
  }
  render() {
    const self = this;
    const classes = Utils.classNames(self.props.className, { 'actions-group': true });
    return React.createElement('div', {
      id: self.props.id,
      style: self.props.style,
      className: classes
    }, this.slots['default']);
  }
  get slots() {
    return __reactComponentSlots(this);
  }
}
__reactComponentSetProps(F7ActionsGroup, Mixins.colorProps);
export default F7ActionsGroup;