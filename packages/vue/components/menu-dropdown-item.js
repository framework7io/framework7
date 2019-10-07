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
  }, Mixins.colorProps, {}, Mixins.linkRouterProps, {}, Mixins.linkActionsProps),
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
        divider = props.divider,
        menuClose = props.menuClose;
    var isLink = link || href || href === '';
    var Tag = isLink ? 'a' : 'div';
    var classes = Utils.classNames({
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
  created: function created() {
    Utils.bindMethods(this, ['onClick']);
  },
  mounted: function mounted() {
    var self = this;
    var el = self.$refs.el;
    if (!el) return;
    el.addEventListener('click', self.onClick);
    var routeProps = self.props.routeProps;
    if (routeProps) el.f7RouteProps = routeProps;
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
    if (!el) return;
    el.removeEventListener('click', self.onClick);
    delete el.f7RouteProps;
  },
  computed: {
    attrs: function attrs() {
      var self = this;
      var props = self.props;
      var link = props.link,
          href = props.href,
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