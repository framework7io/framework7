import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import f7Plugin from '../utils/plugin';
import __vueComponentProps from '../runtime-helpers/vue-component-props.js';
let __vueComponentPropsKeys;
function __vueComponentGetPropKeys(props) {
  __vueComponentPropsKeys = Object.keys(props);
  return props;
}
export default {
  name: 'f7-app',
  props: __vueComponentGetPropKeys({
    params: Object,
    routes: Array
  }),
  render() {
    var _h = this.$createElement;
    const self = this;
    const classes = Utils.classNames(self.props.className, { 'framework7-root': true }, Mixins.colorClasses(self));
    return _h('div', {
      ref: 'el',
      class: classes,
      attrs: { id: 'framework7-root' }
    }, [this.$slots['default']]);
  },
  mounted() {
    const self = this;
    const {params = {}, routes} = self.props;
    const el = self.$refs.el;
    const parentEl = el.parentNode;
    if (parentEl && parentEl !== document.body && parentEl.parentNode === document.body) {
      parentEl.style.height = '100%';
    }
    f7Plugin.init(el, params, routes);
  },
  computed: {
    props() {
      return __vueComponentProps(this, __vueComponentPropsKeys);
    }
  }
};