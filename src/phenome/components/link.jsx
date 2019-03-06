/* eslint import/no-unresolved: ["off"] */
/* eslint import/extensions: ["off"] */
import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import F7Badge from './badge';
import F7Icon from './icon';

/* phenome-dts-imports
import { Tooltip as TooltipNamespace } from 'framework7/components/tooltip/tooltip';
import { SmartSelect as SmartSelectNamespace } from 'framework7/components/smart-select/smart-select';
*/

/* phenome-dts-instance
f7Tooltip: TooltipNamespace.Tooltip
f7SmartSelect: SmartSelectNamespace.SmartSelect
*/

export default {
  name: 'f7-link',
  props: {
    id: [String, Number],
    className: String, // phenome-react-line
    style: Object, // phenome-react-line
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

    // Smart Select
    smartSelect: Boolean,
    smartSelectParams: Object,

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
      iconMd,
      iconIos,
      iconAurora,
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
    if (icon || iconMaterial || iconIon || iconFa || iconF7 || iconMd || iconIos || iconAurora) {
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
          md={iconMd}
          ios={iconIos}
          aurora={iconAurora}
          color={iconColor}
          size={iconSize}
        >{iconBadgeEl}</F7Icon>
      );
    }
    if (
      iconOnly
      || (!text && defaultSlots && defaultSlots.length === 0)
      || (!text && !defaultSlots)
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
        {...self.attrs}
      >
        {iconEl}
        {textEl}
        {defaultSlots}
      </a>
    );
  },
  watch: {
    'props.tooltip': function watchTooltip(newText) {
      const self = this;
      if (!newText || !self.f7Tooltip) return;
      self.f7Tooltip.setText(newText);
    },
  },
  componentDidCreate() {
    Utils.bindMethods(this, ['onClick']);
  },
  componentDidMount() {
    const self = this;
    const el = self.refs.el;
    el.addEventListener('click', self.onClick);
    const { tabbarLabel, tabLink, tooltip, smartSelect, smartSelectParams, routeProps } = self.props;
    let isTabbarLabel = false;
    if (tabbarLabel
      || (
        (tabLink || tabLink === '')
        && self.$$(el).parents('.tabbar-labels').length
      )
    ) {
      isTabbarLabel = true;
    }
    self.setState({ isTabbarLabel });

    if (routeProps) el.f7RouteProps = routeProps;

    self.$f7ready((f7) => {
      if (smartSelect) {
        const ssParams = Utils.extend(
          { el },
          smartSelectParams || {},
        );
        self.f7SmartSelect = f7.smartSelect.create(ssParams);
      }
      if (tooltip) {
        self.f7Tooltip = f7.tooltip.create({
          targetEl: el,
          text: tooltip,
        });
      }
    });
  },
  componentDidUpdate() {
    const self = this;
    const el = self.refs.el;
    const { routeProps } = self.props;
    if (routeProps) {
      el.f7RouteProps = routeProps;
    }
  },
  componentWillUnmount() {
    const self = this;
    const el = self.refs.el;
    el.removeEventListener('click', self.onClick);
    delete el.f7RouteProps;
    if (self.f7SmartSelect && self.f7SmartSelect.destroy) {
      self.f7SmartSelect.destroy();
    }
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
        smartSelect,
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
          'smart-select': smartSelect,
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
