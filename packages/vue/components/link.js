import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import F7Badge from './badge';
import F7Icon from './icon';
import __vueComponentTransformJSXProps from '../runtime-helpers/vue-component-transform-jsx-props.js';
import __vueComponentSetState from '../runtime-helpers/vue-component-set-state.js';
import __vueComponentDispatchEvent from '../runtime-helpers/vue-component-dispatch-event.js';
import __vueComponentProps from '../runtime-helpers/vue-component-props.js';
export default {
  name: 'f7-link',
  props: Object.assign({
    id: [String, Number],
    noLinkClass: Boolean,
    text: String,
    tabLink: [Boolean, String],
    tabLinkActive: Boolean,
    tabbarLabel: Boolean,
    iconOnly: Boolean,
    badge: [String, Number],
    badgeColor: [String],
    iconBadge: [String, Number],
    href: {
      type: [String, Boolean],
      default: '#'
    },
    target: String,
    tooltip: String,
    tooltipTrigger: String,
    smartSelect: Boolean,
    smartSelectParams: Object
  }, Mixins.colorProps, {}, Mixins.linkIconProps, {}, Mixins.linkRouterProps, {}, Mixins.linkActionsProps),

  data() {
    const props = __vueComponentProps(this);

    const state = (() => {
      return {
        isTabbarLabel: props.tabbarLabel
      };
    })();

    return {
      state
    };
  },

  render() {
    const _h = this.$createElement;
    const self = this;
    const props = self.props;
    const {
      text,
      badge,
      badgeColor,
      iconOnly,
      iconBadge,
      icon,
      iconColor,
      iconSize,
      iconMaterial,
      iconF7,
      iconMd,
      iconIos,
      iconAurora,
      id,
      style
    } = props;
    const defaultSlots = self.$slots.default || [];
    Object.keys(self.$slots).forEach(key => {
      if (typeof self.$slots[key] === 'undefined' || key === 'default') return;
      self.$slots[key].forEach(child => defaultSlots.push(child));
    });
    let iconEl;
    let textEl;
    let badgeEl;
    let iconBadgeEl;

    if (text) {
      if (badge) badgeEl = _h(F7Badge, {
        attrs: {
          color: badgeColor
        }
      }, [badge]);
      textEl = _h('span', {
        class: self.state.isTabbarLabel ? 'tabbar-label' : ''
      }, [text, badgeEl]);
    }

    if (icon || iconMaterial || iconF7 || iconMd || iconIos || iconAurora) {
      if (iconBadge) {
        iconBadgeEl = _h(F7Badge, {
          attrs: {
            color: badgeColor
          }
        }, [iconBadge]);
      }

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
      }, [iconBadgeEl]);
    }

    if (iconOnly || !text && defaultSlots && defaultSlots.length === 0 || !text && !defaultSlots) {
      self.iconOnlyComputed = true;
    } else {
      self.iconOnlyComputed = false;
    }

    return _h('a', __vueComponentTransformJSXProps(Object.assign({
      ref: 'el',
      style: style,
      class: self.classes
    }, self.attrs, {
      attrs: {
        id: id
      }
    })), [iconEl, textEl, defaultSlots]);
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
          text: newText,
          trigger: self.props.tooltipTrigger
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
      tabbarLabel,
      tabLink,
      tooltip,
      tooltipTrigger,
      smartSelect,
      smartSelectParams,
      routeProps
    } = self.props;
    let isTabbarLabel = false;

    if (tabbarLabel || (tabLink || tabLink === '') && self.$$(el).parents('.tabbar-labels').length) {
      isTabbarLabel = true;
    }

    self.setState({
      isTabbarLabel
    });
    if (routeProps) el.f7RouteProps = routeProps;
    self.$f7ready(f7 => {
      if (smartSelect) {
        const ssParams = Utils.extend({
          el
        }, smartSelectParams || {});
        self.f7SmartSelect = f7.smartSelect.create(ssParams);
      }

      if (tooltip) {
        self.f7Tooltip = f7.tooltip.create({
          targetEl: el,
          text: tooltip,
          trigger: tooltipTrigger
        });
      }
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

    if (self.f7SmartSelect && self.f7SmartSelect.destroy) {
      self.f7SmartSelect.destroy();
    }

    if (self.f7Tooltip && self.f7Tooltip.destroy) {
      self.f7Tooltip.destroy();
      self.f7Tooltip = null;
      delete self.f7Tooltip;
    }
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
        tabLink,
        tabLinkActive,
        noLinkClass,
        smartSelect,
        className
      } = props;
      return Utils.classNames(className, {
        link: !(noLinkClass || self.state.isTabbarLabel),
        'icon-only': self.iconOnlyComputed,
        'tab-link': tabLink || tabLink === '',
        'tab-link-active': tabLinkActive,
        'smart-select': smartSelect
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
    },

    setState(updater, callback) {
      __vueComponentSetState(this, updater, callback);
    }

  }
};