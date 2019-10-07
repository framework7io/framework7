import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import f7 from '../utils/f7';
import RoutableModals from './routable-modals';
import __vueComponentProps from '../runtime-helpers/vue-component-props.js';
export default {
  name: 'f7-app',
  props: Object.assign({
    id: [String, Number],
    params: Object,
    routes: Array
  }, Mixins.colorProps),
  render: function render() {
    var _h = this.$createElement;
    var self = this;
    var props = self.props;
    var id = props.id,
        style = props.style,
        className = props.className;
    var classes = Utils.classNames(className, 'framework7-root', Mixins.colorClasses(props));
    return _h('div', {
      ref: 'el',
      style: style,
      class: classes,
      attrs: {
        id: id || 'framework7-root'
      }
    }, [this.$slots['default'], _h(RoutableModals)]);
  },
  mounted: function mounted() {
    var self = this;
    var _self$props = self.props,
        _self$props$params = _self$props.params,
        params = _self$props$params === void 0 ? {} : _self$props$params,
        routes = _self$props.routes;
    var el = self.$refs.el;
    var parentEl = el.parentNode;

    if (parentEl && parentEl !== document.body && parentEl.parentNode === document.body) {
      parentEl.style.height = '100%';
    }

    f7.init(el, params, routes);
  },
  computed: {
    props: function props() {
      return __vueComponentProps(this);
    }
  }
};