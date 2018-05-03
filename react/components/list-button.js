import React from 'react';
import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __reactComponentDispatchEvent from '../runtime-helpers/react-component-dispatch-event.js';
import __reactComponentSlots from '../runtime-helpers/react-component-slots.js';
import __reactComponentSetProps from '../runtime-helpers/react-component-set-props.js';
const ListButtonProps = Utils.extend({
  noFastclick: Boolean,
  noFastClick: Boolean,
  title: [
    String,
    Number
  ],
  text: [
    String,
    Number
  ],
  tabLink: [
    Boolean,
    String
  ],
  tabLinkActive: Boolean,
  link: [
    Boolean,
    String
  ],
  href: [
    Boolean,
    String
  ],
  target: String
}, Mixins.colorProps, Mixins.linkRouterProps, Mixins.linkActionsProps);
class F7ListButton extends React.Component {
  constructor(props, context) {
    super(props, context);
  }
  render() {
    const self = this;
    return React.createElement('li', {
      id: self.props.id,
      style: self.props.style,
      className: self.props.className
    }, React.createElement('a', {
      className: self.classes,
      ...self.attrs,
      onClick: self.onClick.bind(self)
    }, this.slots['default'], !this.slots.default && (self.props.title || self.props.text)));
  }
  get attrs() {
    const self = this;
    const {link, href, target, tabLink} = self.props;
    return Utils.extend({
      href: typeof link === 'boolean' && typeof href === 'boolean' ? '#' : link || href,
      target,
      'data-tab': Utils.isStringProp(tabLink) && tabLink
    }, Mixins.linkRouterAttrs(self), Mixins.linkActionsAttrs(self));
  }
  get classes() {
    const self = this;
    const {noFastclick, noFastClick, tabLink, tabLinkActive} = self.props;
    return Utils.classNames({
      'item-link': true,
      'list-button': true,
      'tab-link': tabLink || tabLink === '',
      'tab-link-active': tabLinkActive,
      'no-fastclick': noFastclick || noFastClick
    }, Mixins.colorClasses(self), Mixins.linkRouterClasses(self), Mixins.linkActionsClasses(self));
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
__reactComponentSetProps(F7ListButton, ListButtonProps);
export default F7ListButton;