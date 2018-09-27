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
    noFastclick: Boolean,
    noFastClick: Boolean,
    text: String,
    tabLink: [Boolean, String],
    tabLinkActive: Boolean,
    href: {
      type: [String, Boolean],
      default: '#'
    },
    target: String,
    round: Boolean,
    roundMd: Boolean,
    roundIos: Boolean,
    fill: Boolean,
    fillMd: Boolean,
    fillIos: Boolean,
    big: Boolean,
    bigMd: Boolean,
    bigIos: Boolean,
    small: Boolean,
    smallMd: Boolean,
    smallIos: Boolean,
    raised: Boolean,
    outline: Boolean,
    active: Boolean,
    disabled: Boolean,
    tooltip: String
  }, Mixins.colorProps, Mixins.linkIconProps, Mixins.linkRouterProps, Mixins.linkActionsProps),

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
      iconIon,
      iconFa,
      iconF7,
      iconIfMd,
      iconIfIos,
      iconMd,
      iconIos,
      iconColor,
      iconSize,
      id,
      style
    } = props;

    if (text) {
      textEl = _h('span', [text]);
    }

    const mdThemeIcon = iconIfMd || iconMd;
    const iosThemeIcon = iconIfIos || iconIos;

    if (icon || iconMaterial || iconIon || iconFa || iconF7 || mdThemeIcon || iosThemeIcon) {
      iconEl = _h(F7Icon, {
        attrs: {
          material: iconMaterial,
          ion: iconIon,
          fa: iconFa,
          f7: iconF7,
          icon: icon,
          md: mdThemeIcon,
          ios: iosThemeIcon,
          color: iconColor,
          size: iconSize
        }
      });
    }

    return _h('a', __vueComponentTransformJSXProps(Object.assign({
      ref: 'el',
      style: style,
      class: self.classes
    }, self.attrs, {
      on: {
        click: self.onClick.bind(self)
      },
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
        tabLink
      } = props;
      let hrefComputed = href;
      if (href === true) hrefComputed = '#';
      if (href === false) hrefComputed = undefined;
      return Utils.extend({
        href: hrefComputed,
        target,
        'data-tab': Utils.isStringProp(tabLink) && tabLink || undefined
      }, Mixins.linkRouterAttrs(props), Mixins.linkActionsAttrs(props));
    },

    classes() {
      const self = this;
      const props = self.props;
      const {
        noFastclick,
        noFastClick,
        tabLink,
        tabLinkActive,
        round,
        roundIos,
        roundMd,
        fill,
        fillIos,
        fillMd,
        big,
        bigIos,
        bigMd,
        small,
        smallIos,
        smallMd,
        raised,
        active,
        outline,
        disabled,
        className
      } = props;
      return Utils.classNames(className, 'button', {
        'tab-link': tabLink || tabLink === '',
        'tab-link-active': tabLinkActive,
        'no-fastclick': noFastclick || noFastClick,
        'button-round': round,
        'button-round-ios': roundIos,
        'button-round-md': roundMd,
        'button-fill': fill,
        'button-fill-ios': fillIos,
        'button-fill-md': fillMd,
        'button-big': big,
        'button-big-ios': bigIos,
        'button-big-md': bigMd,
        'button-small': small,
        'button-small-ios': smallIos,
        'button-small-md': smallMd,
        'button-raised': raised,
        'button-active': active,
        'button-outline': outline,
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
      if (!newText || !self.f7Tooltip) return;
      self.f7Tooltip.setText(newText);
    }
  },

  mounted() {
    const self = this;
    const {
      tooltip
    } = self.props;
    if (!tooltip) return;
    self.$f7ready(f7 => {
      self.f7Tooltip = f7.tooltip.create({
        targetEl: self.$refs.el,
        text: tooltip
      });
    });
  },

  beforeDestroy() {
    const self = this;

    if (self.f7Tooltip && self.f7Tooltip.destroy) {
      self.f7Tooltip.destroy();
      self.f7Tooltip = null;
      delete self.f7Tooltip;
    }
  }

};