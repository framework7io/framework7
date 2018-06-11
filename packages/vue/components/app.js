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

  data() {
    const props = __vueComponentProps(this);

    const state = (() => {
      return {
        modals: []
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
      id,
      style,
      className
    } = props;
    const classes = Utils.classNames(className, 'framework7-root', Mixins.colorClasses(props));
    return _h('div', {
      ref: 'el',
      style: style,
      class: classes,
      attrs: {
        id: id || 'framework7-root'
      }
    }, [this.$slots['default'], _h(RoutableModals)]);
  },

  mounted() {
    const self = this;
    const {
      params = {},
      routes
    } = self.props;
    const el = self.$refs.el;
    const parentEl = el.parentNode;

    if (parentEl && parentEl !== document.body && parentEl.parentNode === document.body) {
      parentEl.style.height = '100%';
    }

    f7.init(el, params, routes);
  },

  computed: {
    props() {
      return __vueComponentProps(this);
    }

  }
};