import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __vueComponentProps from '../runtime-helpers/vue-component-props.js';
let __vueComponentPropsKeys;
function __vueComponentGetPropKeys(props) {
  __vueComponentPropsKeys = Object.keys(props);
  return props;
}
export default {
  name: 'f7-card-content',
  props: __vueComponentGetPropKeys({
    padding: {
      type: Boolean,
      default: true
    },
    ...Mixins.colorProps
  }),
  render() {
    var _h = this.$createElement;
    const {id, className, style, padding} = this.props;
    const classes = Utils.classNames(className, {
      'card-content': true,
      'card-content-padding': padding
    }, Mixins.colorClasses(this));
    return _h('div', {
      style: style,
      class: classes,
      attrs: { id: id }
    }, [this.$slots['default']]);
  },
  computed: {
    props() {
      return __vueComponentProps(this, __vueComponentPropsKeys);
    }
  }
};