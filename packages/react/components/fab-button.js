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
  render() {
    const props = this.props;
    const {className, id, style, fabClose, label} = props;
    const classes = Utils.classNames(className, {
      'fab-close': fabClose,
      'fab-label-button': label
    }, Mixins.colorClasses(props));
    let labelEl;
    if (label) {
      labelEl = React.createElement('span', { className: 'fab-label' }, label);
    }
    return React.createElement('a', {
      id: id,
      style: style,
      className: classes,
      onClick: this.onClick.bind(this)
    }, this.slots['default'], labelEl);
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
  label: String,
  ...Mixins.colorProps
});
export default F7FabButton;