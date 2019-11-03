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

  render() {
    const _h = this.$createElement;
    const self = this;
    const props = self.props;
    const {
      id,
      className,
      style,
      contentHeight,
      position,
      left,
      center,
      right
    } = props;
    let positionComputed = position || 'left';
    if (left) positionComputed = 'left';
    if (center) positionComputed = 'center';
    if (right) positionComputed = 'right';
    const classes = Utils.classNames('menu-dropdown', `menu-dropdown-${positionComputed}`, Mixins.colorClasses(props), className);
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
    props() {
      return __vueComponentProps(this);
    }

  }
};