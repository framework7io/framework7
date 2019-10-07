import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import F7Icon from './icon';
import __vueComponentTransformJSXProps from '../runtime-helpers/vue-component-transform-jsx-props.js';
import __vueComponentDispatchEvent from '../runtime-helpers/vue-component-dispatch-event.js';
import __vueComponentProps from '../runtime-helpers/vue-component-props.js';
export default {
  name: 'f7-menu-item',
  props: Object.assign({
    id: [String, Number],
    text: String,
    iconOnly: Boolean,
    href: String,
    link: Boolean,
    target: String,
    dropdown: Boolean
  }, Mixins.colorProps, {}, Mixins.linkIconProps, {}, Mixins.linkRouterProps, {}, Mixins.linkActionsProps),
  render: function render() {
    var _h = this.$createElement;
    var self = this;
    var props = self.props;
    var id = props.id,
        className = props.className,
        style = props.style,
        link = props.link,
        href = props.href,
        text = props.text,
        dropdown = props.dropdown,
        iconOnly = props.iconOnly,
        icon = props.icon,
        iconColor = props.iconColor,
        iconSize = props.iconSize,
        iconMaterial = props.iconMaterial,
        iconF7 = props.iconF7,
        iconMd = props.iconMd,
        iconIos = props.iconIos,
        iconAurora = props.iconAurora;
    var slots = self.$slots;
    var iconEl;
    var iconOnlyComputed;

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

    if (iconOnly || !text && slots.text && slots.text.length === 0 || !text && !slots.text) {
      iconOnlyComputed = true;
    } else {
      iconOnlyComputed = false;
    }

    var isLink = link || href || href === '';
    var Tag = isLink ? 'a' : 'div';
    var isDropdown = dropdown || dropdown === '';
    var classes = Utils.classNames({
      'menu-item': true,
      'menu-item-dropdown': isDropdown,
      'icon-only': iconOnlyComputed
    }, className, Mixins.colorClasses(props), Mixins.linkRouterClasses(props), Mixins.linkActionsClasses(props));
    return _h(Tag, __vueComponentTransformJSXProps(Object.assign({
      ref: 'el',
      class: classes,
      style: style
    }, self.attrs, {
      attrs: {
        id: id
      }
    })), [(text || slots.text && slots.text.length || iconEl) && _h('div', {
      class: 'menu-item-content'
    }, [text, iconEl, this.$slots['text']]), this.$slots['default']]);
  },
  created: function created() {
    Utils.bindMethods(this, ['onClick', 'onOpened', 'onClosed']);
  },
  mounted: function mounted() {
    var self = this;
    var el = self.$refs.el;
    if (!el) return;
    self.eventTargetEl = el;
    el.addEventListener('click', self.onClick);
    var routeProps = self.props.routeProps;
    if (routeProps) el.f7RouteProps = routeProps;
    self.$f7ready(function (f7) {
      f7.on('menuOpened', self.onOpened);
      f7.on('menuClosed', self.onClosed);
    });
  },
  updated: function updated() {
    var self = this;
    var el = self.$refs.el;
    if (!el) return;
    var routeProps = self.props.routeProps;
    if (routeProps) el.f7RouteProps = routeProps;
  },
  beforeDestroy: function beforeDestroy() {
    var self = this;
    var el = self.$refs.el;
    if (!el || !self.$f7) return;
    el.removeEventListener('click', self.onClick);
    self.$f7.off('menuOpened', self.onOpened);
    self.$f7.off('menuClosed', self.onOpened);
    self.eventTargetEl = null;
    delete el.f7RouteProps;
    delete self.eventTargetEl;
  },
  computed: {
    attrs: function attrs() {
      var self = this;
      var props = self.props;
      var href = props.href,
          link = props.link,
          target = props.target;
      var hrefComputed = href;
      if (typeof hrefComputed === 'undefined' && link) hrefComputed = '#';
      return Utils.extend({
        href: hrefComputed,
        target: target
      }, Mixins.linkRouterAttrs(props), Mixins.linkActionsAttrs(props));
    },
    props: function props() {
      return __vueComponentProps(this);
    }
  },
  methods: {
    onClick: function onClick(e) {
      this.dispatchEvent('click', e);
    },
    onOpened: function onOpened(el) {
      if (this.eventTargetEl !== el) return;
      this.dispatchEvent('menuOpened menu:opened', el);
    },
    onClosed: function onClosed(el) {
      if (this.eventTargetEl !== el) return;
      this.dispatchEvent('menuClosed menu:closed', el);
    },
    dispatchEvent: function dispatchEvent(events) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      __vueComponentDispatchEvent.apply(void 0, [this, events].concat(args));
    }
  }
};