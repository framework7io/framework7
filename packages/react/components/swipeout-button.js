import React from 'react';
import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __reactComponentDispatchEvent from '../runtime-helpers/react-component-dispatch-event.js';
import __reactComponentSlots from '../runtime-helpers/react-component-slots.js';
import __reactComponentSetProps from '../runtime-helpers/react-component-set-props.js';

class F7SwipeoutButton extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  onClick(event) {
    this.dispatchEvent('click', event);
  }

  render() {
    const props = this.props;
    const {
      className,
      id,
      style,
      overswipe,
      delete: deleteProp,
      close,
      href,
      confirmText,
      text
    } = props;
    const classes = Utils.classNames(className, {
      'swipeout-overswipe': overswipe,
      'swipeout-delete': deleteProp,
      'swipeout-close': close
    }, Mixins.colorClasses(props));
    return React.createElement('a', {
      href: href || '#',
      id: id,
      style: style,
      'data-confirm': confirmText || undefined,
      className: classes,
      onClick: this.onClick.bind(this)
    }, this.slots['default'], !this.slots.default && text);
  }

  get slots() {
    return __reactComponentSlots(this.props);
  }

  dispatchEvent(events, ...args) {
    return __reactComponentDispatchEvent(this, events, ...args);
  }

}

__reactComponentSetProps(F7SwipeoutButton, Object.assign({
  id: [String, Number],
  className: String,
  style: Object,
  text: String,
  confirmText: String,
  overswipe: Boolean,
  close: Boolean,
  delete: Boolean,
  href: String
}, Mixins.colorProps));

F7SwipeoutButton.displayName = 'f7-swipeout-button';
export default F7SwipeoutButton;