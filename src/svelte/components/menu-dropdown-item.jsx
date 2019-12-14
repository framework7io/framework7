/* eslint import/no-unresolved: ["off"] */
/* eslint import/extensions: ["off"] */
import Utils from '../utils/utils';
import Mixins from '../utils/mixins';

export default {
  name: 'f7-menu-dropdown-item',
  props: {
    id: [String, Number],
    className: String, // phenome-react-line
    style: Object, // phenome-react-line
    text: String,
    link: Boolean,
    href: String,
    target: String,
    divider: Boolean,
    ...Mixins.colorProps,
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
      divider,
      menuClose,
    } = props;

    const isLink = link || href || href === '';
    const Tag = isLink ? 'a' : 'div';

    const classes = Utils.classNames(
      {
        'menu-dropdown-link': isLink && !divider,
        'menu-dropdown-item': !isLink && !divider,
        'menu-dropdown-divider': divider,
      },
      className,
      Mixins.colorClasses(props),
      Mixins.linkRouterClasses(props),
      Mixins.linkActionsClasses(props),
      {
        'menu-close': typeof menuClose === 'undefined',
      }
    );

    return (
      <Tag ref="el" className={classes} id={id} style={style} {...self.attrs}>
        {text}
        <slot />
      </Tag>
    );
  },
  componentDidCreate() {
    Utils.bindMethods(this, ['onClick']);
  },
  componentDidMount() {
    const self = this;
    const el = self.refs.el;
    if (!el) return;
    el.addEventListener('click', self.onClick);
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
    delete el.f7RouteProps;
  },
  computed: {
    attrs() {
      const self = this;
      const props = self.props;
      const { link, href, target } = props;
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
    onClick(event) {
      this.dispatchEvent('click', event);
    },
  },
};
