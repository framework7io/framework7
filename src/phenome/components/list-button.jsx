import Utils from '../utils/utils';
import Mixins from '../utils/mixins';

export default {
  name: 'f7-list-button',
  props: {
    id: [String, Number],
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
    return (
      <li id={self.props.id} style={self.props.style} className={self.props.className}>
        <a className={self.classes} {...self.attrs} onClick={self.onClick.bind(self)}>
          <slot>{self.props.title || self.props.text}</slot>
        </a>
      </li>
    );
  },
  computed: {
    attrs() {
      const self = this;
      // Link Props
      const {
        link,
        href,
        target,
        tabLink,
      } = self.props;

      return Utils.extend(
        {
          href: ((typeof link === 'boolean' && typeof href === 'boolean') ? '#' : (link || href)),
          target,
          'data-tab': Utils.isStringProp(tabLink) && tabLink,
        },
        Mixins.linkRouterAttrs(self),
        Mixins.linkActionsAttrs(self),
      );
    },
    classes() {
      const self = this;

      const {
        noFastclick,
        noFastClick,
        tabLink,
        tabLinkActive,
      } = self.props;

      return Utils.classNames(
        {
          'item-link': true,
          'list-button': true,
          'tab-link': tabLink || tabLink === '',
          'tab-link-active': tabLinkActive,
          'no-fastclick': noFastclick || noFastClick,
        },
        Mixins.colorClasses(self),
        Mixins.linkRouterClasses(self),
        Mixins.linkActionsClasses(self),
      );
    },
  },
  methods: {
    onClick(event) {
      this.dispatchEvent('click', event);
    },
  },
};
