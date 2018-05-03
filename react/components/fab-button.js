import React from 'react';
import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __reactComponentDispatchEvent from '../runtime-helpers/react-component-dispatch-event.js';
import __reactComponentSlots from '../runtime-helpers/react-component-slots.js';
import __reactComponentSetProps from '../runtime-helpers/react-component-set-props.js';
const FabButtonProps = Utils.extend({ fabClose: Boolean }, Mixins.colorProps);
class F7FabButton extends React.Component {
  constructor(props, context) {
    super(props, context);
  }
  render() {
    return React.createElement('a', {
      id: this.props.id,
      style: this.props.style,
      className: this.classes,
      onClick: this.onClick.bind(this)
    }, this.slots['default']);
  }
  get classes() {
    const self = this;
    return Utils.classNames(self.props.className, { 'fab-close': self.fabClose }, Mixins.colorClasses(self));
  }
  onClick(event) {
    this.dispatchEvent('click', event);
  }
  get slots() {
    return __reactComponentSlots(this);
  }
  dispatchEvent(events, ...args) {
    return __reactComponentDispatchEvent(this, events, ...args);
  }
}
__reactComponentSetProps(F7FabButton, FabButtonProps);
export default F7FabButton;