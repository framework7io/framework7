import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __vueComponentProps from '../runtime-helpers/vue-component-props.js';
let __vueComponentPropsKeys;
function __vueComponentGetPropKeys(props) {
  __vueComponentPropsKeys = Object.keys(props);
  return props;
}
const RowProps = Utils.extend({
  noGap: Boolean,
  tag: {
    type: String,
    default: 'div'
  }
}, Mixins.colorProps);
export default {
  name: 'f7-row',
  props: __vueComponentGetPropKeys(RowProps),
  render() {
    var _h = this.$createElement;
    const self = this;
    const RowTag = self.props.tag;
    return _h(RowTag, {
      style: this.props.style,
      class: self.classes,
      attrs: { id: this.props.id }
    }, [this.$slots['default']]);
  },
  computed: {
    classes() {
      const self = this;
      return Utils.classNames(self.props.className, {
        row: true,
        'no-gap': self.props.noGap
      }, Mixins.colorClasses(self));
    },
    props() {
      return __vueComponentProps(this, __vueComponentPropsKeys);
    }
  }
};