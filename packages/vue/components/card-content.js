import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __vueComponentProps from '../runtime-helpers/vue-component-props.js';
export default {
  name: 'f7-card-content',
  props: Object.assign({
    id: [String, Number],
    padding: {
      type: Boolean,
      default: true
    }
  }, Mixins.colorProps),

  render() {
    const _h = this.$createElement;
    const props = this.props;
    const {
      id,
      className,
      style,
      padding
    } = props;
    const classes = Utils.classNames(className, 'card-content', {
      'card-content-padding': padding
    }, Mixins.colorClasses(props));
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