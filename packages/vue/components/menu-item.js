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

  render() {
    const _h = this.$createElement;
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
      iconF7,
      iconMd,
      iconIos,
      iconAurora
    } = props;
    const slots = self.$slots;
    let iconEl;
    let iconOnlyComputed;

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

    const isLink = link || href || href === '';
    const Tag = isLink ? 'a' : 'div';
    const isDropdown = dropdown || dropdown === '';
    const classes = Utils.classNames({
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

  created() {
    Utils.bindMethods(this, ['onClick', 'onOpened', 'onClosed']);
  },

  mounted() {
    const self = this;
    const el = self.$refs.el;
    if (!el) return;
    self.eventTargetEl = el;
    el.addEventListener('click', self.onClick);
    const {
      routeProps
    } = self.props;
    if (routeProps) el.f7RouteProps = routeProps;
    self.$f7ready(f7 => {
      f7.on('menuOpened', self.onOpened);
      f7.on('menuClosed', self.onClosed);
    });
  },

  updated() {
    const self = this;
    const el = self.$refs.el;
    if (!el) return;
    const {
      routeProps
    } = self.props;
    if (routeProps) el.f7RouteProps = routeProps;
  },

  beforeDestroy() {
    const self = this;
    const el = self.$refs.el;
    if (!el || !self.$f7) return;
    el.removeEventListener('click', self.onClick);
    self.$f7.off('menuOpened', self.onOpened);
    self.$f7.off('menuClosed', self.onOpened);
    self.eventTargetEl = null;
    delete el.f7RouteProps;
    delete self.eventTargetEl;
  },

  computed: {
    attrs() {
      const self = this;
      const props = self.props;
      const {
        href,
        link,
        target
      } = props;
      let hrefComputed = href;
      if (typeof hrefComputed === 'undefined' && link) hrefComputed = '#';
      return Utils.extend({
        href: hrefComputed,
        target
      }, Mixins.linkRouterAttrs(props), Mixins.linkActionsAttrs(props));
    },

    props() {
      return __vueComponentProps(this);
    }

  },
  methods: {
    onClick(e) {
      this.dispatchEvent('click', e);
    },

    onOpened(el) {
      if (this.eventTargetEl !== el) return;
      this.dispatchEvent('menuOpened menu:opened', el);
    },

    onClosed(el) {
      if (this.eventTargetEl !== el) return;
      this.dispatchEvent('menuClosed menu:closed', el);
    },

    dispatchEvent(events, ...args) {
      __vueComponentDispatchEvent(this, events, ...args);
    }

  }
};