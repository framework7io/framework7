import React from 'react';
import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import F7Icon from './icon';
import __reactComponentWatch from '../runtime-helpers/react-component-watch.js';
import __reactComponentDispatchEvent from '../runtime-helpers/react-component-dispatch-event.js';
import __reactComponentSlots from '../runtime-helpers/react-component-slots.js';
import __reactComponentSetProps from '../runtime-helpers/react-component-set-props.js';

class F7Button extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.__reactRefs = {};

    (() => {
      Utils.bindMethods(this, ['onClick']);
    })();
  }

  onClick(event) {
    this.dispatchEvent('click', event);
  }

  get attrs() {
    const self = this;
    const props = self.props;
    const {
      href,
      target,
      tabLink,
      type
    } = props;
    let hrefComputed = href;
    if (href === true) hrefComputed = '#';
    if (href === false) hrefComputed = undefined;
    return Utils.extend({
      href: hrefComputed,
      target,
      type,
      'data-tab': Utils.isStringProp(tabLink) && tabLink || undefined
    }, Mixins.linkRouterAttrs(props), Mixins.linkActionsAttrs(props));
  }

  get classes() {
    const self = this;
    const props = self.props;
    const {
      noFastclick,
      noFastClick,
      tabLink,
      tabLinkActive,
      round,
      roundIos,
      roundAurora,
      roundMd,
      fill,
      fillIos,
      fillAurora,
      fillMd,
      large,
      largeIos,
      largeAurora,
      largeMd,
      small,
      smallIos,
      smallAurora,
      smallMd,
      raised,
      raisedIos,
      raisedAurora,
      raisedMd,
      active,
      outline,
      outlineIos,
      outlineAurora,
      outlineMd,
      disabled,
      className
    } = props;
    return Utils.classNames(className, 'button', {
      'tab-link': tabLink || tabLink === '',
      'tab-link-active': tabLinkActive,
      'no-fastclick': noFastclick || noFastClick,
      'button-round': round,
      'button-round-ios': roundIos,
      'button-round-aurora': roundAurora,
      'button-round-md': roundMd,
      'button-fill': fill,
      'button-fill-ios': fillIos,
      'button-fill-aurora': fillAurora,
      'button-fill-md': fillMd,
      'button-large': large,
      'button-large-ios': largeIos,
      'button-large-aurora': largeAurora,
      'button-large-md': largeMd,
      'button-small': small,
      'button-small-ios': smallIos,
      'button-small-aurora': smallAurora,
      'button-small-md': smallMd,
      'button-raised': raised,
      'button-raised-ios': raisedIos,
      'button-raised-aurora': raisedAurora,
      'button-raised-md': raisedMd,
      'button-active': active,
      'button-outline': outline,
      'button-outline-ios': outlineIos,
      'button-outline-aurora': outlineAurora,
      'button-outline-md': outlineMd,
      disabled
    }, Mixins.colorClasses(props), Mixins.linkRouterClasses(props), Mixins.linkActionsClasses(props));
  }

  render() {
    const self = this;
    let iconEl;
    let textEl;
    const props = self.props;
    const {
      text,
      icon,
      iconMaterial,
      iconIon,
      iconFa,
      iconF7,
      iconMd,
      iconIos,
      iconAurora,
      iconColor,
      iconSize,
      id,
      style,
      type
    } = props;

    if (text) {
      textEl = React.createElement('span', null, text);
    }

    if (icon || iconMaterial || iconIon || iconFa || iconF7 || iconMd || iconIos || iconAurora) {
      iconEl = React.createElement(F7Icon, {
        material: iconMaterial,
        ion: iconIon,
        fa: iconFa,
        f7: iconF7,
        icon: icon,
        md: iconMd,
        ios: iconIos,
        aurora: iconAurora,
        color: iconColor,
        size: iconSize
      });
    }

    const ButtonTag = type === 'submit' || type === 'reset' || type === 'button' ? 'button' : 'a';
    return React.createElement(ButtonTag, Object.assign({
      ref: __reactNode => {
        this.__reactRefs['el'] = __reactNode;
      },
      id: id,
      style: style,
      className: self.classes
    }, self.attrs), iconEl, textEl, this.slots['default']);
  }

  componentWillUnmount() {
    const self = this;
    const el = self.refs.el;
    el.removeEventListener('click', self.onClick);
    delete el.f7RouteProps;

    if (self.f7Tooltip && self.f7Tooltip.destroy) {
      self.f7Tooltip.destroy();
      self.f7Tooltip = null;
      delete self.f7Tooltip;
    }
  }

  componentDidUpdate(prevProps, prevState) {
    __reactComponentWatch(this, 'props.tooltip', prevProps, prevState, newText => {
      const self = this;
      if (!newText || !self.f7Tooltip) return;
      self.f7Tooltip.setText(newText);
    });

    const self = this;
    const el = self.refs.el;
    const {
      routeProps
    } = self.props;

    if (routeProps) {
      el.f7RouteProps = routeProps;
    }
  }

  componentDidMount() {
    const self = this;
    const el = self.refs.el;
    el.addEventListener('click', self.onClick);
    const {
      tooltip,
      routeProps
    } = self.props;

    if (routeProps) {
      el.f7RouteProps = routeProps;
    }

    if (!tooltip) return;
    self.$f7ready(f7 => {
      self.f7Tooltip = f7.tooltip.create({
        targetEl: el,
        text: tooltip
      });
    });
  }

  get slots() {
    return __reactComponentSlots(this.props);
  }

  dispatchEvent(events, ...args) {
    return __reactComponentDispatchEvent(this, events, ...args);
  }

  get refs() {
    return this.__reactRefs;
  }

  set refs(refs) {}

}

__reactComponentSetProps(F7Button, Object.assign({
  id: [String, Number],
  className: String,
  style: Object,
  noFastclick: Boolean,
  noFastClick: Boolean,
  text: String,
  tabLink: [Boolean, String],
  tabLinkActive: Boolean,
  type: String,
  href: {
    type: [String, Boolean],
    default: '#'
  },
  target: String,
  round: Boolean,
  roundMd: Boolean,
  roundIos: Boolean,
  roundAurora: Boolean,
  fill: Boolean,
  fillMd: Boolean,
  fillIos: Boolean,
  fillAurora: Boolean,
  large: Boolean,
  largeMd: Boolean,
  largeIos: Boolean,
  largeAurora: Boolean,
  small: Boolean,
  smallMd: Boolean,
  smallIos: Boolean,
  smallAurora: Boolean,
  raised: Boolean,
  raisedMd: Boolean,
  raisedIos: Boolean,
  raisedAurora: Boolean,
  outline: Boolean,
  outlineMd: Boolean,
  outlineIos: Boolean,
  outlineAurora: Boolean,
  active: Boolean,
  disabled: Boolean,
  tooltip: String
}, Mixins.colorProps, Mixins.linkIconProps, Mixins.linkRouterProps, Mixins.linkActionsProps));

F7Button.displayName = 'f7-button';
export default F7Button;