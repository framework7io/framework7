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
  }, Mixins.colorProps, {}, Mixins.linkActionsProps, {}, Mixins.linkRouterProps, {}, Mixins.linkIconProps),
  name: 'f7-treeview-item',
  render: function render() {
    var _h = this.$createElement;
    var self = this;
    var props = self.props;
    var id = props.id,
        style = props.style,
        toggle = props.toggle,
        label = props.label,
        icon = props.icon,
        iconMaterial = props.iconMaterial,
        iconF7 = props.iconF7,
        iconMd = props.iconMd,
        iconIos = props.iconIos,
        iconAurora = props.iconAurora,
        iconSize = props.iconSize,
        iconColor = props.iconColor,
        link = props.link;
    var slots = self.$slots;
    var hasChildren = slots.default && slots.default.length || slots.children && slots.children.length || slots['children-start'] && slots['children-start'].length;
    var needToggle = typeof toggle === 'undefined' ? hasChildren : toggle;
    var iconEl;

    if (icon || iconMaterial || iconF7 || iconMd || iconIos || iconAurora) {
      iconEl = _h(F7Icon, {
        attrs: {
          material: iconMaterial,
          f7: iconF7,
          icon: icon,
          md: iconMd,
          ios: iconIos,
          aurora: iconAurora,
          color: iconColor,
          size: iconSize
        }
      });
    }

    var TreeviewRootTag = link || link === '' ? 'a' : 'div';
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
    itemRootAttrs: function itemRootAttrs() {
      var self = this;
      var props = self.props;
      var link = props.link;
      var href = link;
      if (link === true) href = '#';
      if (link === false) href = undefined;
      return Utils.extend({
        href: href
      }, Mixins.linkRouterAttrs(props), Mixins.linkActionsAttrs(props));
    },
    itemRootClasses: function itemRootClasses() {
      var self = this;
      var props = self.props;
      var selectable = props.selectable,
          selected = props.selected,
          itemToggle = props.itemToggle;
      return Utils.classNames('treeview-item-root', {
        'treeview-item-selectable': selectable,
        'treeview-item-selected': selected,
        'treeview-item-toggle': itemToggle
      }, Mixins.linkRouterClasses(props), Mixins.linkActionsClasses(props));
    },
    classes: function classes() {
      var self = this;
      var props = self.props;
      var className = props.className,
          opened = props.opened,
          loadChildren = props.loadChildren;
      return Utils.classNames(className, 'treeview-item', {
        'treeview-item-opened': opened,
        'treeview-load-children': loadChildren
      }, Mixins.colorClasses(props));
    },
    props: function props() {
      return __vueComponentProps(this);
    }
  },
  created: function created() {
    Utils.bindMethods(this, ['onClick', 'onOpen', 'onClose', 'onLoadChildren']);
  },
  mounted: function mounted() {
    var self = this;
    var _self$$refs = self.$refs,
        el = _self$$refs.el,
        rootEl = _self$$refs.rootEl;
    rootEl.addEventListener('click', self.onClick);
    if (!el) return;
    self.eventTargetEl = el;
    self.$f7ready(function (f7) {
      f7.on('treeviewOpen', self.onOpen);
      f7.on('treeviewClose', self.onClose);
      f7.on('treeviewLoadChildren', self.onLoadChildren);
    });
  },
  beforeDestroy: function beforeDestroy() {
    var self = this;
    var _self$$refs2 = self.$refs,
        el = _self$$refs2.el,
        rootEl = _self$$refs2.rootEl;
    rootEl.removeEventListener('click', self.onClick);
    if (!el || self.$f7) return;
    self.$f7.off('treeviewOpen', self.onOpen);
    self.$f7.off('treeviewClose', self.onClose);
    self.$f7.off('treeviewLoadChildren', self.onLoadChildren);
    self.eventTargetEl = null;
    delete self.eventTargetEl;
  },
  methods: {
    onClick: function onClick(event) {
      this.dispatchEvent('click', event);
    },
    onOpen: function onOpen(el) {
      if (this.eventTargetEl !== el) return;
      this.dispatchEvent('treeview:open treeviewOpen', el);
    },
    onClose: function onClose(el) {
      if (this.eventTargetEl !== el) return;
      this.dispatchEvent('treeview:close treeviewClose', el);
    },
    onLoadChildren: function onLoadChildren(el, done) {
      if (this.eventTargetEl !== el) return;
      this.dispatchEvent('treeview:loadchildren treeviewLoadChildren', el, done);
    },
    dispatchEvent: function dispatchEvent(events) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      __vueComponentDispatchEvent.apply(void 0, [this, events].concat(args));
    }
  }
};