import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __vueComponentProps from '../runtime-helpers/vue-component-props.js';
export default {
  name: 'f7-badge',
  props: Object.assign({
    id: [String, Number]
  }, Mixins.colorProps),

  render() {
    const _h = this.$createElement;
    const props = this.props;
    const {
      className,
      id,
      style
    } = props;
    const classes = Utils.classNames(className, 'badge', Mixins.colorClasses(props));
    return _h('span', {
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