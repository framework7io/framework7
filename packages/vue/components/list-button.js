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
    tooltip: String,
    tooltipTrigger: String
  }, Mixins.colorProps, {}, Mixins.linkRouterProps, {}, Mixins.linkActionsProps),

  render() {
    const _h = this.$createElement;
    const self = this;
    const props = this.props;
    const {
      className,
      id,
      style,
      title,
      text
    } = props;
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
    attrs() {
      const self = this;
      const props = self.props;
      const {
        link,
        href,
        target,
        tabLink
      } = props;
      return Utils.extend({
        href: typeof link === 'boolean' && typeof href === 'boolean' ? '#' : link || href,
        target,
        'data-tab': Utils.isStringProp(tabLink) && tabLink
      }, Mixins.linkRouterAttrs(props), Mixins.linkActionsAttrs(props));
    },

    classes() {
      const self = this;
      const props = self.props;
      const {
        tabLink,
        tabLinkActive
      } = props;
      return Utils.classNames({
        'list-button': true,
        'tab-link': tabLink || tabLink === '',
        'tab-link-active': tabLinkActive
      }, Mixins.colorClasses(props), Mixins.linkRouterClasses(props), Mixins.linkActionsClasses(props));
    },

    props() {
      return __vueComponentProps(this);
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
    const linkEl = self.$refs.linkEl;
    const {
      routeProps,
      tooltip,
      tooltipTrigger
    } = self.props;

    if (routeProps) {
      linkEl.f7RouteProps = routeProps;
    }

    linkEl.addEventListener('click', self.onClick);
    self.$f7ready(f7 => {
      if (tooltip) {
        self.f7Tooltip = f7.tooltip.create({
          targetEl: linkEl,
          text: tooltip,
          trigger: tooltipTrigger
        });
      }
    });
  },

  updated() {
    const self = this;
    const linkEl = self.$refs.linkEl;
    const {
      routeProps
    } = self.props;

    if (routeProps) {
      linkEl.f7RouteProps = routeProps;
    }
  },

  beforeDestroy() {
    const self = this;
    const linkEl = self.$refs.linkEl;
    linkEl.removeEventListener('click', this.onClick);
    delete linkEl.f7RouteProps;

    if (self.f7Tooltip && self.f7Tooltip.destroy) {
      self.f7Tooltip.destroy();
      self.f7Tooltip = null;
      delete self.f7Tooltip;
    }
  },

  methods: {
    onClick(event) {
      this.dispatchEvent('click', event);
    },

    dispatchEvent(events, ...args) {
      __vueComponentDispatchEvent(this, events, ...args);
    }

  }
};