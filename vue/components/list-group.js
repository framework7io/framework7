import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __vueComponentProps from '../runtime-helpers/vue-component-props.js';
export default {
  name: 'f7-list-group',
  props: {
    id: [
      String,
      Number
    ],
    mediaList: Boolean,
    sortable: Boolean,
    ...Mixins.colorProps
  },
  render() {
    const _h = this.$createElement;
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
      return __vueComponentProps(this);
    }
  }
};