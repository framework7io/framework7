import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __vueComponentProps from '../runtime-helpers/vue-component-props.js';
export default {
  name: 'f7-nav-right',
  props: Object.assign({
    id: [String, Number],
    sliding: Boolean
  }, Mixins.colorProps),

  render() {
    const _h = this.$createElement;
    const props = this.props;
    const {
      className,
      id,
      style,
      sliding
    } = props;
    const classes = Utils.classNames(className, 'right', {
      sliding
    }, Mixins.colorClasses(props));
    const children = [];
    const slots = this.$slots;

    if (slots && Object.keys(slots).length) {
      Object.keys(slots).forEach(key => {
        children.push(...slots[key]);
      });
    }

    return _h('div', {
      style: style,
      class: classes,
      attrs: {
        id: id
      }
    }, [children]);
  },

  computed: {
    props() {
      return __vueComponentProps(this);
    }

  }
};