import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __vueComponentTransformJSXProps from '../runtime-helpers/vue-component-transform-jsx-props.js';
import __vueComponentDispatchEvent from '../runtime-helpers/vue-component-dispatch-event.js';
import __vueComponentProps from '../runtime-helpers/vue-component-props.js';
export default {
  name: 'f7-list-button',
  props: Object.assign({
    id: [String, Number],
    title: [String, Number],
    text: [String, Number],
    tabLink: [Boolean, String],
    tabLinkActive: Boolean,
    link: [Boolean, String],
    href: [Boolean, String],
    target: String,
    tooltip: String
  }, Mixins.colorProps, {}, Mixins.linkRouterProps, {}, Mixins.linkActionsProps),
  render: function render() {
    var _h = this.$createElement;
    var self = this;
    var props = this.props;
    var className = props.className,
        id = props.id,
        style = props.style,
        title = props.title,
        text = props.text;
    return _h('li', {
      style: style,
      class: className,
      attrs: {
        id: id
      }
    }, [_h('a', __vueComponentTransformJSXProps(Object.assign({
      class: self.classes
    }, self.attrs, {
      ref: 'linkEl'
    })), [this.$slots['default'] || [title || text]])]);
  },
  computed: {
    attrs: function attrs() {
      var self = this;
      var props = self.props;
      var link = props.link,
          href = props.href,
          target = props.target,
          tabLink = props.tabLink;
      return Utils.extend({
        href: typeof link === 'boolean' && typeof href === 'boolean' ? '#' : link || href,
        target: target,
        'data-tab': Utils.isStringProp(tabLink) && tabLink
      }, Mixins.linkRouterAttrs(props), Mixins.linkActionsAttrs(props));
    },
    classes: function classes() {
      var self = this;
      var props = self.props;
      var tabLink = props.tabLink,
          tabLinkActive = props.tabLinkActive;
      return Utils.classNames({
        'list-button': true,
        'tab-link': tabLink || tabLink === '',
        'tab-link-active': tabLinkActive
      }, Mixins.colorClasses(props), Mixins.linkRouterClasses(props), Mixins.linkActionsClasses(props));
    },
    props: function props() {
      return __vueComponentProps(this);
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
    var linkEl = self.$refs.linkEl;
    var _self$props = self.props,
        routeProps = _self$props.routeProps,
        tooltip = _self$props.tooltip;

    if (routeProps) {
      linkEl.f7RouteProps = routeProps;
    }

    linkEl.addEventListener('click', self.onClick);
    self.$f7ready(function (f7) {
      if (tooltip) {
        self.f7Tooltip = f7.tooltip.create({
          targetEl: linkEl,
          text: tooltip
        });
      }
    });
  },
  updated: function updated() {
    var self = this;
    var linkEl = self.$refs.linkEl;
    var routeProps = self.props.routeProps;

    if (routeProps) {
      linkEl.f7RouteProps = routeProps;
    }
  },
  beforeDestroy: function beforeDestroy() {
    var self = this;
    var linkEl = self.$refs.linkEl;
    linkEl.removeEventListener('click', this.onClick);
    delete linkEl.f7RouteProps;

    if (self.f7Tooltip && self.f7Tooltip.destroy) {
      self.f7Tooltip.destroy();
      self.f7Tooltip = null;
      delete self.f7Tooltip;
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
  }
};