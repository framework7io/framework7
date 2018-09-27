/* eslint import/no-unresolved: ["off"] */
/* eslint import/extensions: ["off"] */
import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import F7Icon from './icon';

/* phenome-dts-imports
import { Tooltip as TooltipNamespace } from 'framework7/components/tooltip/tooltip';
*/

/* phenome-dts-instance
f7Tooltip: TooltipNamespace.Tooltip
*/

export default {
  name: 'f7-button',
  props: {
    id: [String, Number],
    className: String, // phenome-react-line
    style: Object, // phenome-react-line
    noFastclick: Boolean,
    noFastClick: Boolean,
    text: String,
    tabLink: [Boolean, String],
    tabLinkActive: Boolean,
    href: {
      type: [String, Boolean],
      default: '#',
    },
    target: String,
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
    disabled: Boolean,
    tooltip: String,
    ...Mixins.colorProps,
    ...Mixins.linkIconProps,
    ...Mixins.linkRouterProps,
    ...Mixins.linkActionsProps,
  },
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
      iconIfMd,
      iconIfIos,
      iconMd,
      iconIos,
      iconColor,
      iconSize,
      id,
      style,
    } = props;

    if (text) {
      textEl = (<span>{text}</span>);
    }
    const mdThemeIcon = iconIfMd || iconMd;
    const iosThemeIcon = iconIfIos || iconIos;
    if (icon || iconMaterial || iconIon || iconFa || iconF7 || mdThemeIcon || iosThemeIcon) {
      iconEl = (
        <F7Icon
          material={iconMaterial}
          ion={iconIon}
          fa={iconFa}
          f7={iconF7}
          icon={icon}
          md={mdThemeIcon}
          ios={iosThemeIcon}
          color={iconColor}
          size={iconSize}
        />
      );
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
        <slot />
      </a>
    );
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
        round,
        roundIos,
        roundMd,
        fill,
        fillIos,
        fillMd,
        big,
        bigIos,
        bigMd,
        small,
        smallIos,
        smallMd,
        raised,
        active,
        outline,
        disabled,
        className,
      } = props;

      return Utils.classNames(
        className,
        'button',
        {
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

          disabled,
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
  watch: {
    'props.tooltip': function watchTooltip(newText) {
      const self = this;
      if (!newText || !self.f7Tooltip) return;
      self.f7Tooltip.setText(newText);
    },
  },
  componentDidMount() {
    const self = this;
    const { tooltip } = self.props;
    if (!tooltip) return;
    self.$f7ready((f7) => {
      self.f7Tooltip = f7.tooltip.create({
        targetEl: self.refs.el,
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
};
