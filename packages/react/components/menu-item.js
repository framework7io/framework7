import React from 'react';
import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import F7Icon from './icon';
import __reactComponentDispatchEvent from '../runtime-helpers/react-component-dispatch-event.js';
import __reactComponentSlots from '../runtime-helpers/react-component-slots.js';
import __reactComponentSetProps from '../runtime-helpers/react-component-set-props.js';

class F7MenuItem extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.__reactRefs = {};

    (() => {
      Utils.bindMethods(this, ['onClick', 'onOpened', 'onClosed']);
    })();
  }

  onClick(e) {
    this.dispatchEvent('click', e);
  }

  onOpened(e) {
    this.dispatchEvent('menuOpened menu:opened', e);
  }

  onClosed(e) {
    this.dispatchEvent('menuClosed menu:closed', e);
  }

  get attrs() {
    const self = this;
    const props = self.props;
    const {
      href,
      link,
      target
    } = props;
    let hrefComputed = href;
    if (typeof hrefComputed === 'undefined' && link) hrefComputed = '#';
    return Utils.extend({
      href: hrefComputed,
      target
    }, Mixins.linkRouterAttrs(props), Mixins.linkActionsAttrs(props));
  }

  render() {
    const self = this;
    const props = self.props;
    const {
      id,
      className,
      style,
      link,
      href,
      text,
      dropdown,
      iconOnly,
      icon,
      iconColor,
      iconSize,
      iconMaterial,
      iconIon,
      iconFa,
      iconF7,
      iconMd,
      iconIos,
      iconAurora
    } = props;
    const slots = self.slots;
    let iconEl;
    let iconOnlyComputed;

    if (icon || iconMaterial || iconIon || iconFa || iconF7 || iconMd || iconIos || iconAurora) {
      iconEl = React.createElement(F7Icon, {
        material: iconMaterial,
        f7: iconF7,
        fa: iconFa,
        ion: iconIon,
        icon: icon,
        md: iconMd,
        ios: iconIos,
        aurora: iconAurora,
        color: iconColor,
        size: iconSize
      });
    }

    if (iconOnly || !text && slots.text && slots.text.length === 0 || !text && !slots.text) {
      iconOnlyComputed = true;
    } else {
      iconOnlyComputed = false;
    }

    const isLink = link || href || href === '';
    const Tag = isLink ? 'a' : 'div';
    const isDropdown = dropdown || dropdown === '';
    const classes = Utils.classNames({
      'menu-item': true,
      'menu-item-dropdown': isDropdown,
      'icon-only': iconOnlyComputed
    }, className, Mixins.colorClasses(props), Mixins.linkRouterClasses(props), Mixins.linkActionsClasses(props));
    return React.createElement(Tag, Object.assign({
      ref: __reactNode => {
        this.__reactRefs['el'] = __reactNode;
      },
      className: classes,
      id: id,
      style: style
    }, self.attrs), (text || slots.text && slots.text.length || iconEl) && React.createElement('div', {
      className: 'menu-item-content'
    }, text, iconEl, this.slots['text']), this.slots['default']);
  }

  componentWillUnmount() {
    const self = this;
    const el = self.refs.el;
    if (!el) return;
    el.removeEventListener('click', self.onClick);
    el.removeEventListener('menu:opened', self.onOpened);
    el.removeEventListener('menu:closed', self.onClosed);
    delete el.f7RouteProps;
  }

  componentDidUpdate() {
    const self = this;
    const el = self.refs.el;
    if (!el) return;
    const {
      routeProps
    } = self.props;
    if (routeProps) el.f7RouteProps = routeProps;
  }

  componentDidMount() {
    const self = this;
    const el = self.refs.el;
    if (!el) return;
    el.addEventListener('click', self.onClick);
    el.addEventListener('menu:opened', self.onOpened);
    el.addEventListener('menu:closed', self.onClosed);
    const {
      routeProps
    } = self.props;
    if (routeProps) el.f7RouteProps = routeProps;
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

__reactComponentSetProps(F7MenuItem, Object.assign({
  id: [String, Number],
  className: String,
  style: Object,
  text: String,
  iconOnly: Boolean,
  href: String,
  link: Boolean,
  target: String,
  dropdown: Boolean
}, Mixins.colorProps, Mixins.linkIconProps, Mixins.linkRouterProps, Mixins.linkActionsProps));

F7MenuItem.displayName = 'f7-menu-item';
export default F7MenuItem;