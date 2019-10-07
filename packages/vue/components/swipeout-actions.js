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
  render: function render() {
    var _h = this.$createElement;
    var props = this.props;
    var left = props.left,
        right = props.right,
        side = props.side,
        className = props.className,
        id = props.id,
        style = props.style;
    var sideComputed = side;

    if (!sideComputed) {
      if (left) sideComputed = 'left';
      if (right) sideComputed = 'right';
    }

    var classes = Utils.classNames(className, "swipeout-actions-".concat(sideComputed), Mixins.colorClasses(props));
    return _h('div', {
      style: style,
      class: classes,
      attrs: {
        id: id
      }
    }, [this.$slots['default']]);
  },
  computed: {
    props: function props() {
      return __vueComponentProps(this);
    }
  }
};