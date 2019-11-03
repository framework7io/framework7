import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __vueComponentProps from '../runtime-helpers/vue-component-props.js';
export default {
  name: 'f7-swipeout-actions',
  props: Object.assign({
    id: [String, Number],
    left: Boolean,
    right: Boolean,
    side: String
  }, Mixins.colorProps),

  render() {
    const _h = this.$createElement;
    const props = this.props;
    const {
      left,
      right,
      side,
      className,
      id,
      style
    } = props;
    let sideComputed = side;

    if (!sideComputed) {
      if (left) sideComputed = 'left';
      if (right) sideComputed = 'right';
    }

    const classes = Utils.classNames(className, `swipeout-actions-${sideComputed}`, Mixins.colorClasses(props));
    return _h('div', {
      style: style,
      class: classes,
      attrs: {
        id: id
      }
    }, [this.$slots['default']]);
  },

  computed: {
    props() {
      return __vueComponentProps(this);
    }

  }
};