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
  render: function render() {
    var _h = this.$createElement;
    var self = this;
    var iconEl;
    var textEl;
    var props = self.props;
    var text = props.text,
        icon = props.icon,
        iconMaterial = props.iconMaterial,
        iconF7 = props.iconF7,
        iconMd = props.iconMd,
        iconIos = props.iconIos,
        iconAurora = props.iconAurora,
        iconColor = props.iconColor,
        iconSize = props.iconSize,
        id = props.id,
        style = props.style,
        type = props.type;

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

    var ButtonTag = type === 'submit' || type === 'reset' || type === 'button' ? 'button' : 'a';
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
    attrs: function attrs() {
      var self = this;
      var props = self.props;
      var href = props.href,
          target = props.target,
          tabLink = props.tabLink,
          type = props.type;
      var hrefComputed = href;
      if (href === true) hrefComputed = '#';
      if (href === false) hrefComputed = undefined;
      return Utils.extend({
        href: hrefComputed,
        target: target,
        type: type,
        'data-tab': Utils.isStringProp(tabLink) && tabLink || undefined
      }, Mixins.linkRouterAttrs(props), Mixins.linkActionsAttrs(props));
    },
    classes: function classes() {
      var self = this;
      var props = self.props;
      var tabLink = props.tabLink,
          tabLinkActive = props.tabLinkActive,
          round = props.round,
          roundIos = props.roundIos,
          roundAurora = props.roundAurora,
          roundMd = props.roundMd,
          fill = props.fill,
          fillIos = props.fillIos,
          fillAurora = props.fillAurora,
          fillMd = props.fillMd,
          large = props.large,
          largeIos = props.largeIos,
          largeAurora = props.largeAurora,
          largeMd = props.largeMd,
          small = props.small,
          smallIos = props.smallIos,
          smallAurora = props.smallAurora,
          smallMd = props.smallMd,
          raised = props.raised,
          raisedIos = props.raisedIos,
          raisedAurora = props.raisedAurora,
          raisedMd = props.raisedMd,
          active = props.active,
          outline = props.outline,
          outlineIos = props.outlineIos,
          outlineAurora = props.outlineAurora,
          outlineMd = props.outlineMd,
          disabled = props.disabled,
          className = props.className;
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
        disabled: disabled
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
    }
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
        tooltip = _self$props.tooltip,
        routeProps = _self$props.routeProps;

    if (routeProps) {
      el.f7RouteProps = routeProps;
    }

    if (!tooltip) return;
    self.$f7ready(function (f7) {
      self.f7Tooltip = f7.tooltip.create({
        targetEl: el,
        text: tooltip
      });
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

    if (self.f7Tooltip && self.f7Tooltip.destroy) {
      self.f7Tooltip.destroy();
      self.f7Tooltip = null;
      delete self.f7Tooltip;
    }
  }
};