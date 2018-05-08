import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __vueComponentProps from '../runtime-helpers/vue-component-props.js';
export default {
  name: 'f7-views',
  props: {
    id: [
      String,
      Number
    ],
    tabs: Boolean,
    ...Mixins.colorProps
  },
  render() {
    const _h = this.$createElement;
    const self = this;
    const classes = Utils.classNames(self.props.className, 'views', { tabs: self.props.tabs }, Mixins.colorClasses(self));
    return _h('div', {
      style: self.props.style,
      class: classes,
      attrs: { id: self.props.id }
    }, [this.$slots['default']]);
  },
  computed: {
    props() {
      return __vueComponentProps(this);
    }
  }
};