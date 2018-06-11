import Mixins from '../utils/mixins';
import Utils from '../utils/utils';
import __vueComponentProps from '../runtime-helpers/vue-component-props.js';
export default {
  name: 'f7-actions-group',
  props: Object.assign({
    id: [String, Number]
  }, Mixins.colorProps),

  render() {
    const _h = this.$createElement;
    const self = this;
    const props = self.props;
    const {
      className,
      id,
      style
    } = props;
    const classes = Utils.classNames(className, 'actions-group', ...Mixins.colorClasses(props));
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