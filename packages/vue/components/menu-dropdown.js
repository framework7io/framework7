import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __vueComponentProps from '../runtime-helpers/vue-component-props.js';
export default {
  name: 'f7-menu-dropdown',
  props: Object.assign({
    id: [String, Number],
    contentHeight: String,
    position: String,
    left: Boolean,
    center: Boolean,
    right: Boolean
  }, Mixins.colorProps),
  render: function render() {
    var _h = this.$createElement;
    var self = this;
    var props = self.props;
    var id = props.id,
        className = props.className,
        style = props.style,
        contentHeight = props.contentHeight,
        position = props.position,
        left = props.left,
        center = props.center,
        right = props.right;
    var positionComputed = position || 'left';
    if (left) positionComputed = 'left';
    if (center) positionComputed = 'center';
    if (right) positionComputed = 'right';
    var classes = Utils.classNames('menu-dropdown', "menu-dropdown-".concat(positionComputed), Mixins.colorClasses(props), className);
    return _h('div', {
      class: classes,
      style: style,
      attrs: {
        id: id
      }
    }, [_h('div', {
      class: 'menu-dropdown-content',
      style: {
        height: contentHeight
      }
    }, [this.$slots['default']])]);
  },
  computed: {
    props: function props() {
      return __vueComponentProps(this);
    }
  }
};