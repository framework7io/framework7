import React from 'react';
import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __reactComponentDispatchEvent from '../runtime-helpers/react-component-dispatch-event.js';
import __reactComponentSlots from '../runtime-helpers/react-component-slots.js';
import __reactComponentSetProps from '../runtime-helpers/react-component-set-props.js';

class F7ListButton extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  onClick(event) {
    this.dispatchEvent('click', event);
  }

  get attrs() {
    const self = this;
    const props = self.props;
    const {
      link,
      href,
      target,
      tabLink
    } = props;
    return Utils.extend({
      href: typeof link === 'boolean' && typeof href === 'boolean' ? '#' : link || href,
      target,
      'data-tab': Utils.isStringProp(tabLink) && tabLink
    }, Mixins.linkRouterAttrs(props), Mixins.linkActionsAttrs(props));
  }

  get classes() {
    const self = this;
    const props = self.props;
    const {
      noFastclick,
      noFastClick,
      tabLink,
      tabLinkActive
    } = props;
    return Utils.classNames({
      'item-link': true,
      'list-button': true,
      'tab-link': tabLink || tabLink === '',
      'tab-link-active': tabLinkActive,
      'no-fastclick': noFastclick || noFastClick
    }, Mixins.colorClasses(props), Mixins.linkRouterClasses(props), Mixins.linkActionsClasses(props));
  }

  render() {
    const self = this;
    const props = this.props;
    const {
      className,
      id,
      style,
      title,
      text
    } = props;
    return React.createElement('li', {
      id: id,
      style: style,
      className: className
    }, React.createElement('a', Object.assign({
      className: self.classes
    }, self.attrs, {
      onClick: self.onClick.bind(self)
    }), this.slots['default'], !this.slots.default && (title || text)));
  }

  get slots() {
    return __reactComponentSlots(this.props);
  }

  dispatchEvent(events, ...args) {
    return __reactComponentDispatchEvent(this, events, ...args);
  }

}

__reactComponentSetProps(F7ListButton, Object.assign({
  id: [String, Number],
  className: String,
  style: Object,
  noFastclick: Boolean,
  noFastClick: Boolean,
  title: [String, Number],
  text: [String, Number],
  tabLink: [Boolean, String],
  tabLinkActive: Boolean,
  link: [Boolean, String],
  href: [Boolean, String],
  target: String
}, Mixins.colorProps, Mixins.linkRouterProps, Mixins.linkActionsProps));

F7ListButton.displayName = 'f7-list-button';
export default F7ListButton;