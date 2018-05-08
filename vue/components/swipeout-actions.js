import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __vueComponentProps from '../runtime-helpers/vue-component-props.js';
export default {
  name: 'f7-swipeout-actions',
  props: {
    id: [
      String,
      Number
    ],
    left: Boolean,
    right: Boolean,
    side: String,
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
      return Utils.classNames(this.props.className, { [`swipeout-actions-${ this.sideComputed }`]: true }, Mixins.colorClasses(this));
    },
    sideComputed() {
      const {left, right, side} = this;
      if (!side) {
        if (left)
          return 'left';
        if (right)
          return 'right';
        return 'right';
      }
      return side;
    },
    props() {
      return __vueComponentProps(this);
    }
  }
};