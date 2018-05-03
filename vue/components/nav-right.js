import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __vueComponentProps from '../runtime-helpers/vue-component-props.js';
let __vueComponentPropsKeys;
function __vueComponentGetPropKeys(props) {
  __vueComponentPropsKeys = Object.keys(props);
  return props;
}
const NavRightProps = Utils.extend({ sliding: Boolean }, Mixins.colorProps);
export default {
  name: 'f7-nav-right',
  props: __vueComponentGetPropKeys(NavRightProps),
  render() {
    var _h = this.$createElement;
    return _h('div', {
      style: this.props.style,
      class: this.classes,
      attrs: { id: this.props.id }
    }, [this.$slots['default']]);
  },
  computed: {
    classes() {
      return Utils.classNames(this.props.className, {
        right: true,
        sliding: this.props.slidng
      }, Mixins.colorClasses(this));
    },
    props() {
      return __vueComponentProps(this, __vueComponentPropsKeys);
    }
  }
};