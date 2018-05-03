import React from 'react';
import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __reactComponentDispatchEvent from '../runtime-helpers/react-component-dispatch-event.js';
import __reactComponentSlots from '../runtime-helpers/react-component-slots.js';
import __reactComponentSetProps from '../runtime-helpers/react-component-set-props.js';
const SwipeoutButtonProps = Utils.extend({
  text: String,
  confirmText: String,
  overswipe: Boolean,
  close: Boolean,
  delete: Boolean,
  href: String
}, Mixins.colorProps);
class F7SwipeoutButton extends React.Component {
  constructor(props, context) {
    super(props, context);
  }
  render() {
    this.onClick = this.onClick.bind(this);
    return React.createElement('a', {
      href: this.props.href || '#',
      id: this.props.id,
      style: this.props.style,
      'data-confirm': this.props.confirmText || undefined,
      className: this.classes,
      onClick: this.onClick
    }, this.slots['default'], !this.slots.default && this.props.text);
  }
  get classes() {
    return Utils.classNames(this.props.className, {
      'swipeout-overswipe': this.props.overswipe,
      'swipeout-delete': this.props.delete,
      'swipeout-close': this.props.close
    }, Mixins.colorClasses(this));
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
__reactComponentSetProps(F7SwipeoutButton, SwipeoutButtonProps);
export default F7SwipeoutButton;