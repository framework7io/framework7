import React from 'react';
import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __reactComponentDispatchEvent from '../runtime-helpers/react-component-dispatch-event.js';
import __reactComponentSlots from '../runtime-helpers/react-component-slots.js';
import __reactComponentSetProps from '../runtime-helpers/react-component-set-props.js';
class F7FabButton extends React.Component {
  constructor(props, context) {
    super(props, context);
  }
  onClick(event) {
    this.dispatchEvent('click', event);
  }
  get classes() {
    const self = this;
    return Utils.classNames(self.props.className, { 'fab-close': self.fabClose }, Mixins.colorClasses(self));
  }
  render() {
    return React.createElement('a', {
      id: this.props.id,
      style: this.props.style,
      className: this.classes,
      onClick: this.onClick.bind(this)
    }, this.slots['default']);
  }
  get slots() {
    return __reactComponentSlots(this.props);
  }
  dispatchEvent(events, ...args) {
    return __reactComponentDispatchEvent(this, events, ...args);
  }
}
__reactComponentSetProps(F7FabButton, {
  id: [
    String,
    Number
  ],
  fabClose: Boolean,
  ...Mixins.colorProps
});
export default F7FabButton;