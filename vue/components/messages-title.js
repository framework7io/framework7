import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __vueComponentProps from '../runtime-helpers/vue-component-props.js';
let __vueComponentPropsKeys;
function __vueComponentGetPropKeys(props) {
  __vueComponentPropsKeys = Object.keys(props);
  return props;
}
export default {
  name: 'f7-messages-title',
  props: __vueComponentGetPropKeys(Mixins.colorProps),
  render() {
    var _h = this.$createElement;
    const classes = Utils.classNames(this.props.className, 'messages-title', Mixins.colorClasses(this));
    return _h('div', {
      style: this.props.style,
      class: classes,
      attrs: { id: this.props.id }
    }, [this.$slots['default']]);
  },
  computed: {
    props() {
      return __vueComponentProps(this, __vueComponentPropsKeys);
    }
  }
};