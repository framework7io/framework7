import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __vueComponentProps from '../runtime-helpers/vue-component-props.js';
let __vueComponentPropsKeys;
function __vueComponentGetPropKeys(props) {
  __vueComponentPropsKeys = Object.keys(props);
  return props;
}
const ViewsProps = Utils.extend({ tabs: Boolean }, Mixins.colorProps);
export default {
  name: 'f7-views',
  props: __vueComponentGetPropKeys(ViewsProps),
  render() {
    var _h = this.$createElement;
    const self = this;
    const classes = Utils.classNames(self.props.className, {
      views: true,
      tabs: self.props.tabs
    }, Mixins.colorClasses(self));
    return _h('div', {
      style: self.props.style,
      class: classes,
      attrs: { id: self.props.id }
    }, [this.$slots['default']]);
  },
  computed: {
    props() {
      return __vueComponentProps(this, __vueComponentPropsKeys);
    }
  }
};