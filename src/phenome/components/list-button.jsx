import Utils from '../utils/utils';
import Mixins from '../utils/mixins';

export default {
  name: 'f7-list-button',
  props: {
    id: [String, Number],
    className: String, // phenome-react-line
    style: Object, // phenome-react-line
    noFastclick: Boolean,
    noFastClick: Boolean,
    title: [String, Number],
    text: [String, Number],
    tabLink: [Boolean, String],
    tabLinkActive: Boolean,
    link: [Boolean, String],
    href: [Boolean, String],
    target: String,
    ...Mixins.colorProps,
    ...Mixins.linkRouterProps,
    ...Mixins.linkActionsProps,
  },
  render() {
    const self = this;
    const props = this.props;

    const {
      className,
      id,
      style,
      title,
      text,
    } = props;

    return (
      <li id={id} style={style} className={className}>
        <a className={self.classes} {...self.attrs} ref="linkEl">
          <slot>{title || text}</slot>
        </a>
      </li>
    );
  },
  computed: {
    attrs() {
      const self = this;
      const props = self.props;
      const {
        link,
        href,
        target,
        tabLink,
      } = props;

      return Utils.extend(
        {
          href: ((typeof link === 'boolean' && typeof href === 'boolean') ? '#' : (link || href)),
          target,
          'data-tab': Utils.isStringProp(tabLink) && tabLink,
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
      } = props;

      return Utils.classNames(
        {
          'list-button': true,
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
  componentDidCreate() {
    Utils.bindMethods(this, ['onClick'])
  },
  componentDidMount() {
    const self = this;
    const linkEl = self.refs.linkEl;
    const { routeProps } = self.props;
    if (routeProps) {
      linkEl.f7RouteProps = routeProps;
    }
    linkEl.addEventListener('click', self.onClick);
  },
  componentDidUpdate() {
    const self = this;
    const linkEl = self.refs.linkEl;
    const { routeProps } = self.props;
    if (routeProps) {
      linkEl.f7RouteProps = routeProps;
    }
  },
  componentWillUnmount() {
    const self = this;
    const linkEl = self.refs.linkEl;
    linkEl.removeEventListener('click', this.onClick);
    delete linkEl.f7RouteProps;
  },
  methods: {
    onClick(event) {
      this.dispatchEvent('click', event);
    },
  },
};
