import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import F7Icon from './icon';
import __vueComponentTransformJSXProps from '../runtime-helpers/vue-component-transform-jsx-props.js';
import __vueComponentDispatchEvent from '../runtime-helpers/vue-component-dispatch-event.js';
import __vueComponentProps from '../runtime-helpers/vue-component-props.js';
export default {
  props: Object.assign({
    id: [String, Number],
    toggle: {
      type: Boolean,
      default: undefined
    },
    itemToggle: Boolean,
    selectable: Boolean,
    selected: Boolean,
    opened: Boolean,
    label: String,
    loadChildren: Boolean,
    link: {
      type: [Boolean, String],
      default: undefined
    }
  }, Mixins.colorProps, Mixins.linkActionsProps, Mixins.linkRouterProps, Mixins.linkIconProps),
  name: 'f7-treeview-item',

  render() {
    const _h = this.$createElement;
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
      link
    } = props;
    const slots = self.$slots;
    const hasChildren = slots.default && slots.default.length || slots.children && slots.children.length || slots['children-start'] && slots['children-start'].length;
    const needToggle = typeof toggle === 'undefined' ? hasChildren : toggle;
    let iconEl;

    if (icon || iconMaterial || iconIon || iconFa || iconF7 || iconMd || iconIos || iconAurora) {
      iconEl = _h(F7Icon, {
        attrs: {
          material: iconMaterial,
          f7: iconF7,
          fa: iconFa,
          ion: iconIon,
          icon: icon,
          md: iconMd,
          ios: iconIos,
          aurora: iconAurora,
          color: iconColor,
          size: iconSize
        }
      });
    }

    const TreeviewRootTag = link || link === '' ? 'a' : 'div';
    return _h('div', {
      ref: 'el',
      style: style,
      class: self.classes,
      attrs: {
        id: id
      }
    }, [_h(TreeviewRootTag, __vueComponentTransformJSXProps(Object.assign({
      ref: 'rootEl',
      class: self.itemRootClasses
    }, self.itemRootAttrs)), [this.$slots['root-start'], needToggle && _h('div', {
      class: 'treeview-toggle'
    }), _h('div', {
      class: 'treeview-item-content'
    }, [this.$slots['content-start'], iconEl, this.$slots['media'], _h('div', {
      class: 'treeview-item-label'
    }, [this.$slots['label-start'], label, this.$slots['label']]), this.$slots['content'], this.$slots['content-end']]), this.$slots['root'], this.$slots['root-end']]), hasChildren && _h('div', {
      class: 'treeview-item-children'
    }, [this.$slots['children-start'], this.$slots['default'], this.$slots['children']])]);
  },

  computed: {
    itemRootAttrs() {
      const self = this;
      const props = self.props;
      const {
        link
      } = props;
      let href = link;
      if (link === true) href = '#';
      if (link === false) href = undefined;
      return Utils.extend({
        href
      }, Mixins.linkRouterAttrs(props), Mixins.linkActionsAttrs(props));
    },

    itemRootClasses() {
      const self = this;
      const props = self.props;
      const {
        selectable,
        selected,
        itemToggle
      } = props;
      return Utils.classNames('treeview-item-root', {
        'treeview-item-selectable': selectable,
        'treeview-item-selected': selected,
        'treeview-item-toggle': itemToggle
      }, Mixins.linkRouterClasses(props), Mixins.linkActionsClasses(props));
    },

    classes() {
      const self = this;
      const props = self.props;
      const {
        className,
        opened,
        loadChildren
      } = props;
      return Utils.classNames(className, 'treeview-item', {
        'treeview-item-opened': opened,
        'treeview-load-children': loadChildren
      }, Mixins.colorClasses(props));
    },

    props() {
      return __vueComponentProps(this);
    }

  },

  created() {
    Utils.bindMethods(this, ['onClick', 'onOpen', 'onClose', 'onLoadChildren']);
  },

  mounted() {
    const self = this;
    const {
      el,
      rootEl
    } = self.$refs;
    rootEl.addEventListener('click', self.onClick);
    el.addEventListener('treeview:open', self.onOpen);
    el.addEventListener('treeview:close', self.onClose);
    el.addEventListener('treeview:loadchildren', self.onLoadChildren);
  },

  beforeDestroy() {
    const self = this;
    const {
      el,
      rootEl
    } = self.$refs;
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

    dispatchEvent(events, ...args) {
      __vueComponentDispatchEvent(this, events, ...args);
    }

  }
};