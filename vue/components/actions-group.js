import Mixins from '../utils/mixins';
import Utils from '../utils/utils';
import __vueComponentProps from '../runtime-helpers/vue-component-props.js';
export default {
  name: 'f7-actions-group',
  props: {
    id: [
      String,
      Number
    ],
    ...Mixins.colorProps
  },
  render() {
    const _h = this.$createElement;
    const self = this;
    const classes = Utils.classNames(self.props.className, { 'actions-group': true });
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