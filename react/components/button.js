import React from 'react';
import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import F7Icon from './icon';
import __reactComponentDispatchEvent from '../runtime-helpers/react-component-dispatch-event.js';
import __reactComponentSlots from '../runtime-helpers/react-component-slots.js';
import __reactComponentSetProps from '../runtime-helpers/react-component-set-props.js';
const ButtonProps = Utils.extend({
  noFastclick: Boolean,
  noFastClick: Boolean,
  text: String,
  tabLink: [
    Boolean,
    String
  ],
  tabLinkActive: Boolean,
  href: {
    type: [
      String,
      Boolean
    ],
    default: '#'
  },
  round: Boolean,
  roundMd: Boolean,
  roundIos: Boolean,
  fill: Boolean,
  fillMd: Boolean,
  fillIos: Boolean,
  big: Boolean,
  bigMd: Boolean,
  bigIos: Boolean,
  small: Boolean,
  smallMd: Boolean,
  smallIos: Boolean,
  raised: Boolean,
  outline: Boolean,
  active: Boolean,
  disabled: Boolean
}, Mixins.colorProps, Mixins.linkIconProps, Mixins.linkRouterProps, Mixins.linkActionsProps);
class F7Button extends React.Component {
  constructor(props, context) {
    super(props, context);
  }
  render() {
    const self = this;
    let iconEl;
    let textEl;
    const {text, icon, iconMaterial, iconIon, iconFa, iconF7, iconIfMd, iconIfIos, iconColor, iconSize} = self.props;
    if (text) {
      textEl = React.createElement('span', null, text);
    }
    if (icon || iconMaterial || iconIon || iconFa || iconF7 || iconIfMd || iconIfIos) {
      iconEl = React.createElement(F7Icon, {
        material: iconMaterial,
        ion: iconIon,
        fa: iconFa,
        f7: iconF7,
        icon: icon,
        ifMd: iconIfMd,
        ifIos: iconIfIos,
        color: iconColor,
        size: iconSize
      });
    }
    return React.createElement('a', {
      id: self.props.id,
      style: self.props.style,
      className: self.classes,
      onClick: self.onClick.bind(self),
      ...self.attrs
    }, iconEl, textEl, this.slots['default']);
  }
  get attrs() {
    const self = this;
    const {href, target, tabLink} = self.props;
    let hrefComputed = href;
    if (href === true)
      hrefComputed = '#';
    if (href === false)
      hrefComputed = undefined;
    return Utils.extend({
      href: hrefComputed,
      target,
      'data-tab': Utils.isStringProp(tabLink) && tabLink || undefined
    }, Mixins.linkRouterAttrs(self), Mixins.linkActionsAttrs(self));
  }
  get classes() {
    const self = this;
    const {noFastclick, noFastClick, tabLink, tabLinkActive, round, roundIos, roundMd, fill, fillIos, fillMd, big, bigIos, bigMd, small, smallIos, smallMd, raised, active, outline, disabled} = self.props;
    return Utils.classNames(self.props.className, {
      button: true,
      'tab-link': tabLink || tabLink === '',
      'tab-link-active': tabLinkActive,
      'no-fastclick': noFastclick || noFastClick,
      'button-round': round,
      'button-round-ios': roundIos,
      'button-round-md': roundMd,
      'button-fill': fill,
      'button-fill-ios': fillIos,
      'button-fill-md': fillMd,
      'button-big': big,
      'button-big-ios': bigIos,
      'button-big-md': bigMd,
      'button-small': small,
      'button-small-ios': smallIos,
      'button-small-md': smallMd,
      'button-raised': raised,
      'button-active': active,
      'button-outline': outline,
      disabled
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
__reactComponentSetProps(F7Button, ButtonProps);
export default F7Button;