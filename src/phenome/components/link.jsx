/* eslint import/no-unresolved: ["off"] */
/* eslint import/extensions: ["off"] */
import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import F7Badge from './badge';
import F7Icon from './icon';

export default {
  name: 'f7-link',
  props: {
    id: [String, Number],
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
      default: '#',
    },
    target: String,
    tooltip: String,
    ...Mixins.colorProps,
    ...Mixins.linkIconProps,
    ...Mixins.linkRouterProps,
    ...Mixins.linkActionsProps,
  },
  state(props) {
    return {
      isTabbarLabel: props.tabbarLabel,
    };
  },
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
      style,
    } = props;

    const defaultSlots = self.slots.default;

    let iconEl;
    let textEl;
    let badgeEl;
    let iconBadgeEl;

    if (text) {
      if (badge) badgeEl = (<F7Badge color={badgeColor}>{badge}</F7Badge>);
      textEl = (
        <span className={self.state.isTabbarLabel ? 'tabbar-label' : ''}>
          {text}
          {badgeEl}
        </span>
      );
    }
    const mdThemeIcon = iconIfMd || iconMd;
    const iosThemeIcon = iconIfIos || iconIos;
    if (icon || iconMaterial || iconIon || iconFa || iconF7 || mdThemeIcon || iosThemeIcon) {
      if (iconBadge) {
        iconBadgeEl = <F7Badge color={badgeColor}>{iconBadge}</F7Badge>;
      }
      iconEl = (
        <F7Icon
          material={iconMaterial}
          f7={iconF7}
          fa={iconFa}
          ion={iconIon}
          icon={icon}
          md={mdThemeIcon}
          ios={iosThemeIcon}
          color={iconColor}
          size={iconSize}
        >{iconBadgeEl}</F7Icon>
      );
    }
    if (
      iconOnly ||
      (!text && defaultSlots && defaultSlots.length === 0) ||
      (!text && !defaultSlots)
    ) {
      self.iconOnlyComputed = true;
    } else {
      self.iconOnlyComputed = false;
    }

    return (
      <a
        ref="el"
        id={id}
        style={style}
        className={self.classes}
        onClick={self.onClick.bind(self)}
        {...self.attrs}
      >
        {iconEl}
        {textEl}
        {defaultSlots}
      </a>
    );
  },
  componentDidMount() {
    const self = this;
    const el = self.refs.el;
    const { tabbarLabel, tabLink, tooltip } = self.props;
    let isTabbarLabel = false;
    if (tabbarLabel ||
      (
        (tabLink || tabLink === '') &&
        self.$$(el).parents('.tabbar-labels').length
      )
    ) {
      isTabbarLabel = true;
    }
    self.setState({ isTabbarLabel });
    if (!tooltip) return;
    self.$f7ready((f7) => {
      self.f7Tooltip = f7.tooltip.create({
        el: self.refs.el,
        text: tooltip,
      });
    });
  },
  componentWillUnmount() {
    const self = this;
    if (self.f7Tooltip && self.f7Tooltip.destroy) {
      self.f7Tooltip.destroy();
      self.f7Tooltip = null;
      delete self.f7Tooltip;
    }
  },
  computed: {
    attrs() {
      const self = this;
      const props = self.props;
      const { href, target, tabLink } = props;
      let hrefComputed = href;
      if (href === true) hrefComputed = '#';
      if (href === false) hrefComputed = undefined; // no href attribute
      return Utils.extend(
        {
          href: hrefComputed,
          target,
          'data-tab': (Utils.isStringProp(tabLink) && tabLink) || undefined,
        },
        Mixins.linkRouterAttrs(props),
        Mixins.linkActionsAttrs(props),
      );
    },
    classes() {
      const self = this;
      const props = self.props;
      const {
        noFastclick,
        noFastClick,
        tabLink,
        tabLinkActive,
        noLinkClass,
        className,
      } = props;

      return Utils.classNames(
        className,
        {
          link: !(noLinkClass || self.state.isTabbarLabel),
          'icon-only': self.iconOnlyComputed,
          'tab-link': tabLink || tabLink === '',
          'tab-link-active': tabLinkActive,
          'no-fastclick': noFastclick || noFastClick,
        },
        Mixins.colorClasses(props),
        Mixins.linkRouterClasses(props),
        Mixins.linkActionsClasses(props),
      );
    },
  },
  methods: {
    onClick(event) {
      this.dispatchEvent('click', event);
    },
  },
};
