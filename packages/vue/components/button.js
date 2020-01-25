import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import F7Icon from './icon';
import __vueComponentTransformJSXProps from '../runtime-helpers/vue-component-transform-jsx-props.js';
import __vueComponentDispatchEvent from '../runtime-helpers/vue-component-dispatch-event.js';
import __vueComponentProps from '../runtime-helpers/vue-component-props.js';
export default {
  name: 'f7-button',
  props: Object.assign({
    id: [String, Number],
    text: String,
    tabLink: [Boolean, String],
    tabLinkActive: Boolean,
    type: String,
    href: {
      type: [String, Boolean],
      default: '#'
    },
    target: String,
    round: Boolean,
    roundMd: Boolean,
    roundIos: Boolean,
    roundAurora: Boolean,
    fill: Boolean,
    fillMd: Boolean,
    fillIos: Boolean,
    fillAurora: Boolean,
    large: Boolean,
    largeMd: Boolean,
    largeIos: Boolean,
    largeAurora: Boolean,
    small: Boolean,
    smallMd: Boolean,
    smallIos: Boolean,
    smallAurora: Boolean,
    raised: Boolean,
    raisedMd: Boolean,
    raisedIos: Boolean,
    raisedAurora: Boolean,
    outline: Boolean,
    outlineMd: Boolean,
    outlineIos: Boolean,
    outlineAurora: Boolean,
    active: Boolean,
    disabled: Boolean,
    tooltip: String
  }, Mixins.colorProps, {}, Mixins.linkIconProps, {}, Mixins.linkRouterProps, {}, Mixins.linkActionsProps),

  render() {
    const _h = this.$createElement;
    const self = this;
    let iconEl;
    let textEl;
    const props = self.props;
    const {
      text,
      icon,
      iconMaterial,
      iconF7,
      iconMd,
      iconIos,
      iconAurora,
      iconColor,
      iconSize,
      id,
      style,
      type
    } = props;

    if (text) {
      textEl = _h('span', [text]);
    }

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

    const ButtonTag = type === 'submit' || type === 'reset' || type === 'button' ? 'button' : 'a';
    return _h(ButtonTag, __vueComponentTransformJSXProps(Object.assign({
      ref: 'el',
      style: style,
      class: self.classes
    }, self.attrs, {
      attrs: {
        id: id
      }
    })), [iconEl, textEl, this.$slots['default']]);
  },

  computed: {
    attrs() {
      const self = this;
      const props = self.props;
      const {
        href,
        target,
        tabLink,
        type
      } = props;
      let hrefComputed = href;
      if (href === true) hrefComputed = '#';
      if (href === false) hrefComputed = undefined;
      return Utils.extend({
        href: hrefComputed,
        target,
        type,
        'data-tab': Utils.isStringProp(tabLink) && tabLink || undefined
      }, Mixins.linkRouterAttrs(props), Mixins.linkActionsAttrs(props));
    },

    classes() {
      const self = this;
      const props = self.props;
      const {
        tabLink,
        tabLinkActive,
        round,
        roundIos,
        roundAurora,
        roundMd,
        fill,
        fillIos,
        fillAurora,
        fillMd,
        large,
        largeIos,
        largeAurora,
        largeMd,
        small,
        smallIos,
        smallAurora,
        smallMd,
        raised,
        raisedIos,
        raisedAurora,
        raisedMd,
        active,
        outline,
        outlineIos,
        outlineAurora,
        outlineMd,
        disabled,
        className
      } = props;
      return Utils.classNames(className, 'button', {
        'tab-link': tabLink || tabLink === '',
        'tab-link-active': tabLinkActive,
        'button-round': round,
        'button-round-ios': roundIos,
        'button-round-aurora': roundAurora,
        'button-round-md': roundMd,
        'button-fill': fill,
        'button-fill-ios': fillIos,
        'button-fill-aurora': fillAurora,
        'button-fill-md': fillMd,
        'button-large': large,
        'button-large-ios': largeIos,
        'button-large-aurora': largeAurora,
        'button-large-md': largeMd,
        'button-small': small,
        'button-small-ios': smallIos,
        'button-small-aurora': smallAurora,
        'button-small-md': smallMd,
        'button-raised': raised,
        'button-raised-ios': raisedIos,
        'button-raised-aurora': raisedAurora,
        'button-raised-md': raisedMd,
        'button-active': active,
        'button-outline': outline,
        'button-outline-ios': outlineIos,
        'button-outline-aurora': outlineAurora,
        'button-outline-md': outlineMd,
        disabled
      }, Mixins.colorClasses(props), Mixins.linkRouterClasses(props), Mixins.linkActionsClasses(props));
    },

    props() {
      return __vueComponentProps(this);
    }

  },
  methods: {
    onClick(event) {
      this.dispatchEvent('click', event);
    },

    dispatchEvent(events, ...args) {
      __vueComponentDispatchEvent(this, events, ...args);
    }

  },
  watch: {
    'props.tooltip': function watchTooltip(newText) {
      const self = this;

      if (!newText && self.f7Tooltip) {
        self.f7Tooltip.destroy();
        self.f7Tooltip = null;
        delete self.f7Tooltip;
        return;
      }

      if (newText && !self.f7Tooltip && self.$f7) {
        self.f7Tooltip = self.$f7.tooltip.create({
          targetEl: self.$refs.el,
          text: newText
        });
        return;
      }

      if (!newText || !self.f7Tooltip) return;
      self.f7Tooltip.setText(newText);
    }
  },

  created() {
    Utils.bindMethods(this, ['onClick']);
  },

  mounted() {
    const self = this;
    const el = self.$refs.el;
    el.addEventListener('click', self.onClick);
    const {
      tooltip,
      routeProps
    } = self.props;

    if (routeProps) {
      el.f7RouteProps = routeProps;
    }

    if (!tooltip) return;
    self.$f7ready(f7 => {
      self.f7Tooltip = f7.tooltip.create({
        targetEl: el,
        text: tooltip
      });
    });
  },

  updated() {
    const self = this;
    const el = self.$refs.el;
    const {
      routeProps
    } = self.props;

    if (routeProps) {
      el.f7RouteProps = routeProps;
    }
  },

  beforeDestroy() {
    const self = this;
    const el = self.$refs.el;
    el.removeEventListener('click', self.onClick);
    delete el.f7RouteProps;

    if (self.f7Tooltip && self.f7Tooltip.destroy) {
      self.f7Tooltip.destroy();
      self.f7Tooltip = null;
      delete self.f7Tooltip;
    }
  }

};