import React from 'react';
import Mixins from '../utils/mixins';
import Utils from '../utils/utils';
import __reactComponentDispatchEvent from '../runtime-helpers/react-component-dispatch-event.js';
import __reactComponentSlots from '../runtime-helpers/react-component-slots.js';
import __reactComponentSetProps from '../runtime-helpers/react-component-set-props.js';
class F7ActionsLabel extends React.Component {
  constructor(props, context) {
    super(props, context);
  }
  render() {
    const self = this;
    const classes = Utils.classNames(self.props.className, {
      'actions-label': true,
      'actions-button-bold': self.props.bold
    }, Mixins.colorClasses(self));
    return React.createElement('div', {
      id: self.props.id,
      style: self.props.style,
      className: classes,
      onClick: self.onClick.bind(self)
    }, this.slots['default']);
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
__reactComponentSetProps(F7ActionsLabel, {
  bold: Boolean,
  ...Mixins.colorProps
});
export default F7ActionsLabel;