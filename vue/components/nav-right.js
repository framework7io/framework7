import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __vueComponentProps from '../runtime-helpers/vue-component-props.js';
export default {
  name: 'f7-nav-right',
  props: {
    id: [
      String,
      Number
    ],
    sliding: Boolean,
    ...Mixins.colorProps
  },
  render() {
    const _h = this.$createElement;
    return _h('div', {
      style: this.props.style,
      class: this.classes,
      attrs: { id: this.props.id }
    }, [this.$slots['default']]);
  },
  computed: {
    classes() {
      return Utils.classNames(this.props.className, {
        right: true,
        sliding: this.props.slidng
      }, Mixins.colorClasses(this));
    },
    props() {
      return __vueComponentProps(this);
    }
  }
};