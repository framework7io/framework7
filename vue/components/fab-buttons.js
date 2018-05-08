import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __vueComponentProps from '../runtime-helpers/vue-component-props.js';
export default {
  name: 'f7-fab-buttons',
  props: {
    id: [
      String,
      Number
    ],
    position: {
      type: String,
      default: 'top'
    },
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
      const self = this;
      return Utils.classNames(self.props.className, {
        'fab-buttons': true,
        [`fab-buttons-${ self.props.position }`]: true
      }, Mixins.colorClasses(self));
    },
    props() {
      return __vueComponentProps(this);
    }
  }
};