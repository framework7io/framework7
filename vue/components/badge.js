import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __vueComponentProps from '../runtime-helpers/vue-component-props.js';
let __vueComponentPropsKeys;
function __vueComponentGetPropKeys(props) {
  __vueComponentPropsKeys = Object.keys(props);
  return props;
}
export default {
  name: 'f7-badge',
  props: __vueComponentGetPropKeys(Mixins.colorProps),
  render() {
    var _h = this.$createElement;
    return _h('span', {
      style: this.props.style,
      class: this.classes,
      attrs: { id: this.props.id }
    }, [this.$slots['default']]);
  },
  computed: {
    classes() {
      const self = this;
      return Utils.classNames(self.props.className, { badge: true }, Mixins.colorClasses(self));
    },
    props() {
      return __vueComponentProps(this, __vueComponentPropsKeys);
    }
  }
};