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
    smartSelect: Boolean,
    smartSelectParams: Object
  }, Mixins.colorProps, {}, Mixins.linkIconProps, {}, Mixins.linkRouterProps, {}, Mixins.linkActionsProps),
  data: function data() {
    var props = __vueComponentProps(this);

    var state = function () {
      return {
        isTabbarLabel: props.tabbarLabel
      };
    }();

    return {
      state: state
    };
  },
  render: function render() {
    var _h = this.$createElement;
    var self = this;
    var props = self.props;
    var text = props.text,
        badge = props.badge,
        badgeColor = props.badgeColor,
        iconOnly = props.iconOnly,
        iconBadge = props.iconBadge,
        icon = props.icon,
        iconColor = props.iconColor,
        iconSize = props.iconSize,
        iconMaterial = props.iconMaterial,
        iconF7 = props.iconF7,
        iconMd = props.iconMd,
        iconIos = props.iconIos,
        iconAurora = props.iconAurora,
        id = props.id,
        style = props.style;
    var defaultSlots = self.$slots.default;
    var iconEl;
    var textEl;
    var badgeEl;
    var iconBadgeEl;

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
      var self = this;

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
  created: function created() {
    Utils.bindMethods(this, ['onClick']);
  },
  mounted: function mounted() {
    var self = this;
    var el = self.$refs.el;
    el.addEventListener('click', self.onClick);
    var _self$props = self.props,
        tabbarLabel = _self$props.tabbarLabel,
        tabLink = _self$props.tabLink,
        tooltip = _self$props.tooltip,
        smartSelect = _self$props.smartSelect,
        smartSelectParams = _self$props.smartSelectParams,
        routeProps = _self$props.routeProps;
    var isTabbarLabel = false;

    if (tabbarLabel || (tabLink || tabLink === '') && self.$$(el).parents('.tabbar-labels').length) {
      isTabbarLabel = true;
    }

    self.setState({
      isTabbarLabel: isTabbarLabel
    });
    if (routeProps) el.f7RouteProps = routeProps;
    self.$f7ready(function (f7) {
      if (smartSelect) {
        var ssParams = Utils.extend({
          el: el
        }, smartSelectParams || {});
        self.f7SmartSelect = f7.smartSelect.create(ssParams);
      }

      if (tooltip) {
        self.f7Tooltip = f7.tooltip.create({
          targetEl: el,
          text: tooltip
        });
      }
    });
  },
  updated: function updated() {
    var self = this;
    var el = self.$refs.el;
    var routeProps = self.props.routeProps;

    if (routeProps) {
      el.f7RouteProps = routeProps;
    }
  },
  beforeDestroy: function beforeDestroy() {
    var self = this;
    var el = self.$refs.el;
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
    attrs: function attrs() {
      var self = this;
      var props = self.props;
      var href = props.href,
          target = props.target,
          tabLink = props.tabLink;
      var hrefComputed = href;
      if (href === true) hrefComputed = '#';
      if (href === false) hrefComputed = undefined;
      return Utils.extend({
        href: hrefComputed,
        target: target,
        'data-tab': Utils.isStringProp(tabLink) && tabLink || undefined
      }, Mixins.linkRouterAttrs(props), Mixins.linkActionsAttrs(props));
    },
    classes: function classes() {
      var self = this;
      var props = self.props;
      var tabLink = props.tabLink,
          tabLinkActive = props.tabLinkActive,
          noLinkClass = props.noLinkClass,
          smartSelect = props.smartSelect,
          className = props.className;
      return Utils.classNames(className, {
        link: !(noLinkClass || self.state.isTabbarLabel),
        'icon-only': self.iconOnlyComputed,
        'tab-link': tabLink || tabLink === '',
        'tab-link-active': tabLinkActive,
        'smart-select': smartSelect
      }, Mixins.colorClasses(props), Mixins.linkRouterClasses(props), Mixins.linkActionsClasses(props));
    },
    props: function props() {
      return __vueComponentProps(this);
    }
  },
  methods: {
    onClick: function onClick(event) {
      this.dispatchEvent('click', event);
    },
    dispatchEvent: function dispatchEvent(events) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      __vueComponentDispatchEvent.apply(void 0, [this, events].concat(args));
    },
    setState: function setState(updater, callback) {
      __vueComponentSetState(this, updater, callback);
    }
  }
};