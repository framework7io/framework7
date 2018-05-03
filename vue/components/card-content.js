import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __vueComponentProps from '../runtime-helpers/vue-component-props.js';
let __vueComponentPropsKeys;
function __vueComponentGetPropKeys(props) {
  __vueComponentPropsKeys = Object.keys(props);
  return props;
}
const CardContentProps = Utils.extend({
  padding: {
    type: Boolean,
    default: true
  }
}, Mixins.colorProps);
export default {
  name: 'f7-card-content',
  props: __vueComponentGetPropKeys(CardContentProps),
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
      const self = this;
      return Utils.classNames(self.props.className, {
        'card-content': true,
        'card-content-padding': self.props.padding
      }, Mixins.colorClasses(self));
    },
    props() {
      return __vueComponentProps(this, __vueComponentPropsKeys);
    }
  }
};