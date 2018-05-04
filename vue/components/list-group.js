import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __vueComponentProps from '../runtime-helpers/vue-component-props.js';
let __vueComponentPropsKeys;
function __vueComponentGetPropKeys(props) {
  __vueComponentPropsKeys = Object.keys(props);
  return props;
}
export default {
  name: 'f7-list-group',
  props: __vueComponentGetPropKeys({
    mediaList: Boolean,
    sortable: Boolean,
    ...Mixins.colorProps
  }),
  render() {
    var _h = this.$createElement;
    const self = this;
    const {className, id, style, mediaList, sortable} = self.props;
    const classes = Utils.classNames(className, 'list-group', {
      'media-list': mediaList,
      sortable
    }, Mixins.colorClasses(self));
    return _h('div', {
      style: style,
      class: classes,
      attrs: { id: id }
    }, [_h('ul', [this.$slots['default']])]);
  },
  computed: {
    props() {
      return __vueComponentProps(this, __vueComponentPropsKeys);
    }
  }
};