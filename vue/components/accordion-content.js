import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __vueComponentProps from '../runtime-helpers/vue-component-props.js';
export default {
  props: {
    id: [
      String,
      Number
    ],
    ...Mixins.colorProps
  },
  name: 'f7-accordion-content',
  render() {
    const _h = this.$createElement;
    const classes = Utils.classNames(this.props.className, { 'accordion-item-content': true }, Mixins.colorClasses(this));
    return _h('div', {
      style: this.props.style,
      class: classes,
      attrs: { id: this.props.id }
    }, [this.$slots['default']]);
  },
  computed: {
    props() {
      return __vueComponentProps(this);
    }
  }
};