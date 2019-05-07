import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import F7Icon from './icon';

export default {
  props: {
    id: [String, Number],
    className: String, // phenome-react-line
    style: Object, // phenome-react-line
    toggle: {
      type: Boolean,
      default: undefined,
    },
    itemToggle: Boolean,
    selectable: Boolean,
    selected: Boolean,
    opened: Boolean,
    label: String,
    loadChildren: Boolean,
    link: {
      type: [Boolean, String],
      default: undefined,
    },
    ...Mixins.colorProps,
    ...Mixins.linkActionsProps,
    ...Mixins.linkRouterProps,
    ...Mixins.linkIconProps,
  },
  name: 'f7-treeview-item',
  render() {
    const self = this;
    const props = self.props;
    const {
      id,
      style,
      toggle,
      label,
      icon,
      iconMaterial,
      iconIon,
      iconFa,
      iconF7,
      iconMd,
      iconIos,
      iconAurora,
      iconSize,
      iconColor,
      link,
    } = props;

    const slots = self.slots;
    const hasChildren = (slots.default && slots.default.length)
      || (slots.children && slots.children.length)
      || (slots['children-start'] && slots['children-start'].length);
    const needToggle = typeof toggle === 'undefined' ? hasChildren : toggle;

    let iconEl;
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

    const TreeviewRootTag = link || link === '' ? 'a' : 'div';

    return (
      <div ref="el" id={id} style={style} className={self.classes}>
        <TreeviewRootTag ref="rootEl" className={self.itemRootClasses} {...self.itemRootAttrs}>
          <slot name="root-start" />
          {needToggle && (
            <div className="treeview-toggle"></div>
          )}
          <div className="treeview-item-content">
            <slot name="content-start" />
            {iconEl}
            <slot name="media" />
            <div className="treeview-item-label">
              <slot name="label-start" />
              {label}
              <slot name="label" />
            </div>
            <slot name="content" />
            <slot name="content-end" />
          </div>
          <slot name="root" />
          <slot name="root-end" />
        </TreeviewRootTag>
        {hasChildren && (
          <div className="treeview-item-children">
            <slot name="children-start" />
            <slot />
            <slot name="children" />
          </div>
        )}
      </div>
    );
  },
  computed: {
    itemRootAttrs() {
      const self = this;
      const props = self.props;
      const { link } = props;
      let href = link;
      if (link === true) href = '#';
      if (link === false) href = undefined; // no href attribute
      return Utils.extend(
        {
          href,
        },
        Mixins.linkRouterAttrs(props),
        Mixins.linkActionsAttrs(props),
      );
    },
    itemRootClasses() {
      const self = this;
      const props = self.props;
      const {
        selectable,
        selected,
        itemToggle,
      } = props;

      return Utils.classNames(
        'treeview-item-root',
        {
          'treeview-item-selectable': selectable,
          'treeview-item-selected': selected,
          'treeview-item-toggle': itemToggle,
        },
        Mixins.linkRouterClasses(props),
        Mixins.linkActionsClasses(props),
      );
    },
    classes() {
      const self = this;
      const props = self.props;
      const {
        className,
        opened,
        loadChildren,
      } = props;

      return Utils.classNames(
        className,
        'treeview-item',
        {
          'treeview-item-opened': opened,
          'treeview-load-children': loadChildren,
        },
        Mixins.colorClasses(props),
      );
    },
  },
  componentDidCreate() {
    Utils.bindMethods(this, ['onClick', 'onOpen', 'onClose', 'onLoadChildren']);
  },
  componentDidMount() {
    const self = this;
    const { el, rootEl } = self.refs;
    rootEl.addEventListener('click', self.onClick);
    el.addEventListener('treeview:open', self.onOpen);
    el.addEventListener('treeview:close', self.onClose);
    el.addEventListener('treeview:loadchildren', self.onLoadChildren);
  },
  componentWillUnmount() {
    const self = this;
    const { el, rootEl } = self.refs;
    rootEl.removeEventListener('click', self.onClick);
    el.removeEventListener('treeview:open', self.onOpen);
    el.removeEventListener('treeview:close', self.onClose);
    el.removeEventListener('treeview:loadchildren', self.onLoadChildren);
  },
  methods: {
    onClick(event) {
      this.dispatchEvent('click', event);
    },
    onOpen(event) {
      this.dispatchEvent('treeview:open treeviewOpen', event);
    },
    onClose(event) {
      this.dispatchEvent('treeview:close treeviewClose', event);
    },
    onLoadChildren(event) {
      this.dispatchEvent('treeview:loadchildren treeviewLoadChildren', event, event.detail);
    },
  },
};
