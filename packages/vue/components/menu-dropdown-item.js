import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __vueComponentTransformJSXProps from '../runtime-helpers/vue-component-transform-jsx-props.js';
import __vueComponentDispatchEvent from '../runtime-helpers/vue-component-dispatch-event.js';
import __vueComponentProps from '../runtime-helpers/vue-component-props.js';
export default {
  name: 'f7-menu-dropdown-item',
  props: Object.assign({
    id: [String, Number],
    text: String,
    link: Boolean,
    href: String,
    target: String,
    divider: Boolean
  }, Mixins.colorProps, Mixins.linkRouterProps, Mixins.linkActionsProps),

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
      divider,
      menuClose
    } = props;
    const isLink = link || href || href === '';
    const Tag = isLink ? 'a' : 'div';
    const classes = Utils.classNames({
      'menu-dropdown-link': isLink && !divider,
      'menu-dropdown-item': !isLink && !divider,
      'menu-dropdown-divider': divider
    }, className, Mixins.colorClasses(props), Mixins.linkRouterClasses(props), Mixins.linkActionsClasses(props), {
      'menu-close': typeof menuClose === 'undefined'
    });
    return _h(Tag, __vueComponentTransformJSXProps(Object.assign({
      ref: 'el',
      class: classes,
      style: style
    }, self.attrs, {
      attrs: {
        id: id
      }
    })), [text, this.$slots['default']]);
  },

  created() {
    Utils.bindMethods(this, ['onClick']);
  },

  mounted() {
    const self = this;
    const el = self.$refs.el;
    if (!el) return;
    el.addEventListener('click', self.onClick);
    const {
      routeProps
    } = self.props;
    if (routeProps) el.f7RouteProps = routeProps;
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
    if (!el) return;
    el.removeEventListener('click', self.onClick);
    delete el.f7RouteProps;
  },

  computed: {
    attrs() {
      const self = this;
      const props = self.props;
      const {
        link,
        href,
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
    onClick(event) {
      this.dispatchEvent('click', event);
    },

    dispatchEvent(events, ...args) {
      __vueComponentDispatchEvent(this, events, ...args);
    }

  }
};