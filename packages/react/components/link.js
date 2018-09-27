import React from 'react';
import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import F7Badge from './badge';
import F7Icon from './icon';
import __reactComponentWatch from '../runtime-helpers/react-component-watch.js';
import __reactComponentDispatchEvent from '../runtime-helpers/react-component-dispatch-event.js';
import __reactComponentSlots from '../runtime-helpers/react-component-slots.js';
import __reactComponentSetProps from '../runtime-helpers/react-component-set-props.js';

class F7Link extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.__reactRefs = {};

    this.state = (() => {
      return {
        isTabbarLabel: props.tabbarLabel
      };
    })();
  }

  onClick(event) {
    const self = this;

    if (self.props.smartSelect && self.f7SmartSelect) {
      self.f7SmartSelect.open();
    }

    this.dispatchEvent('click', event);
  }

  get attrs() {
    const self = this;
    const props = self.props;
    const {
      href,
      target,
      tabLink
    } = props;
    let hrefComputed = href;
    if (href === true) hrefComputed = '#';
    if (href === false) hrefComputed = undefined;
    return Utils.extend({
      href: hrefComputed,
      target,
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
      noLinkClass,
      smartSelect,
      className
    } = props;
    return Utils.classNames(className, {
      link: !(noLinkClass || self.state.isTabbarLabel),
      'icon-only': self.iconOnlyComputed,
      'tab-link': tabLink || tabLink === '',
      'tab-link-active': tabLinkActive,
      'no-fastclick': noFastclick || noFastClick,
      'smart-select': smartSelect
    }, Mixins.colorClasses(props), Mixins.linkRouterClasses(props), Mixins.linkActionsClasses(props));
  }

  render() {
    const self = this;
    const props = self.props;
    const {
      text,
      badge,
      badgeColor,
      iconOnly,
      iconBadge,
      icon,
      iconColor,
      iconSize,
      iconMaterial,
      iconIon,
      iconFa,
      iconF7,
      iconIfMd,
      iconIfIos,
      iconMd,
      iconIos,
      id,
      style
    } = props;
    const defaultSlots = self.slots.default;
    let iconEl;
    let textEl;
    let badgeEl;
    let iconBadgeEl;

    if (text) {
      if (badge) badgeEl = React.createElement(F7Badge, {
        color: badgeColor
      }, badge);
      textEl = React.createElement('span', {
        className: self.state.isTabbarLabel ? 'tabbar-label' : ''
      }, text, badgeEl);
    }

    const mdThemeIcon = iconIfMd || iconMd;
    const iosThemeIcon = iconIfIos || iconIos;

    if (icon || iconMaterial || iconIon || iconFa || iconF7 || mdThemeIcon || iosThemeIcon) {
      if (iconBadge) {
        iconBadgeEl = React.createElement(F7Badge, {
          color: badgeColor
        }, iconBadge);
      }

      iconEl = React.createElement(F7Icon, {
        material: iconMaterial,
        f7: iconF7,
        fa: iconFa,
        ion: iconIon,
        icon: icon,
        md: mdThemeIcon,
        ios: iosThemeIcon,
        color: iconColor,
        size: iconSize
      }, iconBadgeEl);
    }

    if (iconOnly || !text && defaultSlots && defaultSlots.length === 0 || !text && !defaultSlots) {
      self.iconOnlyComputed = true;
    } else {
      self.iconOnlyComputed = false;
    }

    return React.createElement('a', Object.assign({
      ref: __reactNode => {
        this.__reactRefs['el'] = __reactNode;
      },
      id: id,
      style: style,
      className: self.classes,
      onClick: self.onClick.bind(self)
    }, self.attrs), iconEl, textEl, defaultSlots);
  }

  componentWillUnmount() {
    const self = this;

    if (self.f7SmartSelect && self.f7SmartSelect.destroy) {
      self.f7SmartSelect.destroy();
    }

    if (self.f7Tooltip && self.f7Tooltip.destroy) {
      self.f7Tooltip.destroy();
      self.f7Tooltip = null;
      delete self.f7Tooltip;
    }
  }

  componentDidMount() {
    const self = this;
    const el = self.refs.el;
    const {
      tabbarLabel,
      tabLink,
      tooltip,
      smartSelect,
      smartSelectParams
    } = self.props;
    let isTabbarLabel = false;

    if (tabbarLabel || (tabLink || tabLink === '') && self.$$(el).parents('.tabbar-labels').length) {
      isTabbarLabel = true;
    }

    self.setState({
      isTabbarLabel
    });
    self.$f7ready(f7 => {
      if (smartSelect) {
        const ssParams = Utils.extend({
          el
        }, smartSelectParams || {});
        self.f7SmartSelect = f7.smartSelect.create(ssParams);
      }

      if (tooltip) {
        self.f7Tooltip = f7.tooltip.create({
          targetEl: el,
          text: tooltip
        });
      }
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

  componentDidUpdate(prevProps, prevState) {
    __reactComponentWatch(this, 'props.tooltip', prevProps, prevState, newText => {
      const self = this;
      if (!newText || !self.f7Tooltip) return;
      self.f7Tooltip.setText(newText);
    });
  }

}

__reactComponentSetProps(F7Link, Object.assign({
  id: [String, Number],
  className: String,
  style: Object,
  noLinkClass: Boolean,
  noFastClick: Boolean,
  noFastclick: Boolean,
  text: String,
  tabLink: [Boolean, String],
  tabLinkActive: Boolean,
  tabbarLabel: Boolean,
  iconOnly: Boolean,
  badge: [String, Number],
  badgeColor: [String],
  iconBadge: [String, Number],
  href: {
    type: [String, Boolean],
    default: '#'
  },
  target: String,
  tooltip: String,
  smartSelect: Boolean,
  smartSelectParams: Object
}, Mixins.colorProps, Mixins.linkIconProps, Mixins.linkRouterProps, Mixins.linkActionsProps));

F7Link.displayName = 'f7-link';
export default F7Link;