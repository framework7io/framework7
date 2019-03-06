/* eslint import/no-unresolved: ["off"] */
/* eslint import/extensions: ["off"] */
import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import F7Icon from './icon';

export default {
  name: 'f7-menu-item',
  props: {
    id: [String, Number],
    className: String, // phenome-react-line
    style: Object, // phenome-react-line
    text: String,
    iconOnly: Boolean,
    href: String,
    link: Boolean,
    target: String,
    dropdown: Boolean,
    ...Mixins.colorProps,
    ...Mixins.linkIconProps,
    ...Mixins.linkRouterProps,
    ...Mixins.linkActionsProps,
  },
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
      iconAurora,
    } = props;

    const slots = self.slots;

    let iconEl;
    let iconOnlyComputed;
    if (icon || iconMaterial || iconIon || iconFa || iconF7 || iconMd || iconIos || iconAurora) {
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
        />
      );
    }
    if (
      iconOnly
      || (!text && slots.text && slots.text.length === 0)
      || (!text && !slots.text)
    ) {
      iconOnlyComputed = true;
    } else {
      iconOnlyComputed = false;
    }

    const isLink = link || href || href === '';
    const Tag = isLink ? 'a' : 'div';

    const isDropdown = dropdown || dropdown === '';

    const classes = Utils.classNames(
      {
        'menu-item': true,
        'menu-item-dropdown': isDropdown,
        'icon-only': iconOnlyComputed,
      },
      className,
      Mixins.colorClasses(props),
      Mixins.linkRouterClasses(props),
      Mixins.linkActionsClasses(props),
    );

    return (
      <Tag ref="el" className={classes} id={id} style={style} {...self.attrs}>
        {(text || (slots.text && slots.text.length) || iconEl) && (
          <div className="menu-item-content">
            {text}
            {iconEl}
            <slot name="text" />
          </div>
        )}
        <slot />
      </Tag>
    );
  },
  componentDidCreate() {
    Utils.bindMethods(this, ['onClick', 'onOpened', 'onClosed']);
  },
  componentDidMount() {
    const self = this;
    const el = self.refs.el;
    if (!el) return;
    el.addEventListener('click', self.onClick);
    el.addEventListener('menu:opened', self.onOpened);
    el.addEventListener('menu:closed', self.onClosed);
    const { routeProps } = self.props;
    if (routeProps) el.f7RouteProps = routeProps;
  },
  componentDidUpdate() {
    const self = this;
    const el = self.refs.el;
    if (!el) return;
    const { routeProps } = self.props;
    if (routeProps) el.f7RouteProps = routeProps;
  },
  componentWillUnmount() {
    const self = this;
    const el = self.refs.el;
    if (!el) return;
    el.removeEventListener('click', self.onClick);
    el.removeEventListener('menu:opened', self.onOpened);
    el.removeEventListener('menu:closed', self.onClosed);
    delete el.f7RouteProps;
  },
  computed: {
    attrs() {
      const self = this;
      const props = self.props;
      const { href, link, target } = props;
      let hrefComputed = href;
      if (typeof hrefComputed === 'undefined' && link) hrefComputed = '#';
      return Utils.extend(
        {
          href: hrefComputed,
          target,
        },
        Mixins.linkRouterAttrs(props),
        Mixins.linkActionsAttrs(props),
      );
    },
  },
  methods: {
    onClick(e) {
      this.dispatchEvent('click', e);
    },
    onOpened(e) {
      this.dispatchEvent('menuOpened menu:opened', e);
    },
    onClosed(e) {
      this.dispatchEvent('menuClosed menu:closed', e);
    },
  },
};
