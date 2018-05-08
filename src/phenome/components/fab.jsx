import Utils from '../utils/utils';
import Mixins from '../utils/mixins';

export default {
  name: 'f7-fab',
  props: {
    id: [String, Number],
    morphTo: String,
    href: [Boolean, String],
    position: {
      type: String,
      default: 'right-bottom',
    },
    ...Mixins.colorProps,
  },
  render() {
    const self = this;
    const { morphTo } = self.props;

    let href = self.props.href;
    if (href === true) href = '#';
    if (href === false) href = undefined; // no href attribute

    const linkChildren = [];
    const rootChildren = [];

    const { link: linkSlots, default: defaultSlots, root: rootSlots } = self.slots;

    if (defaultSlots) {
      for (let i = 0; i < defaultSlots.length; i += 1) {
        const child = defaultSlots[i];
        let isRoot;
        if (process.env.COMPILER === 'react') {
          const tag = child.type && child.type.name;
          if (tag === 'F7FabButtons') isRoot = true;
        }
        if (process.env.COMPILER === 'vue') {
          if (child.tag && child.tag.indexOf('fab-buttons') >= 0) isRoot = true;
        }
        if (isRoot) rootChildren.push(child);
        else linkChildren.push(child);
      }
    }
    let linkEl;
    if (linkChildren.length || linkSlots.length) {
      linkEl = (
        <a href={href} onClick={self.onClick.bind(self)} key="f7-fab-link">
          {linkChildren}
          {linkSlots}
        </a>
      );
    }

    return (
      <div
        id={self.props.id}
        style={self.props.style}
        className={self.classes}
        data-morph-to={morphTo}
      >
        {linkEl}
        {rootChildren}
        {rootSlots}
      </div>
    );
  },
  computed: {
    classes() {
      const self = this;
      return Utils.classNames(
        self.props.className,
        {
          fab: true,
          'fab-morph': self.morphTo,
          [`fab-${self.props.position}`]: true,
        },
        Mixins.colorClasses(self),
      );
    },
  },
  methods: {
    onClick(event) {
      const self = this;
      self.dispatchEvent('click', event);
    },
  },
};
