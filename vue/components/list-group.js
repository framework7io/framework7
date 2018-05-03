import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __vueComponentProps from '../runtime-helpers/vue-component-props.js';
let __vueComponentPropsKeys;
function __vueComponentGetPropKeys(props) {
  __vueComponentPropsKeys = Object.keys(props);
  return props;
}
const ListGroupProps = Utils.extend({
  mediaList: Boolean,
  sortable: Boolean
}, Mixins.colorProps);
export default {
  name: 'f7-list-group',
  props: __vueComponentGetPropKeys(ListGroupProps),
  render() {
    var _h = this.$createElement;
    return _h('div', {
      style: this.props.style,
      class: this.classes,
      attrs: { id: this.props.id }
    }, [_h('ul', [this.$slots['default']])]);
  },
  computed: {
    classes() {
      const self = this;
      return Utils.classNames(this.props.className, 'list-group', Mixins.colorClasses(self));
    },
    props() {
      return __vueComponentProps(this, __vueComponentPropsKeys);
    }
  }
};