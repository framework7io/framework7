import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __vueComponentProps from '../runtime-helpers/vue-component-props.js';
let __vueComponentPropsKeys;
function __vueComponentGetPropKeys(props) {
  __vueComponentPropsKeys = Object.keys(props);
  return props;
}
export default {
  name: 'f7-label',
  props: __vueComponentGetPropKeys({
    floating: Boolean,
    inline: Boolean,
    ...Mixins.colorProps
  }),
  render() {
    var _h = this.$createElement;
    const self = this;
    const {inline, id, style, className, floating} = self.props;
    const classes = Utils.classNames(className, 'item-title', {
      'item-label-inline': inline,
      'item-label': !floating,
      'item-floating-label': floating
    }, Mixins.colorClasses(self));
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