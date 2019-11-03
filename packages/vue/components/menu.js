import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __vueComponentProps from '../runtime-helpers/vue-component-props.js';
export default {
  name: 'f7-menu',
  props: Object.assign({
    id: [String, Number]
  }, Mixins.colorProps),

  render() {
    const _h = this.$createElement;
    const self = this;
    const props = self.props;
    const {
      id,
      className,
      style
    } = props;
    return _h('div', {
      class: Utils.classNames('menu', Mixins.colorClasses(props), className),
      style: style,
      attrs: {
        id: id
      }
    }, [_h('div', {
      class: 'menu-inner'
    }, [this.$slots['default']])]);
  },

  computed: {
    props() {
      return __vueComponentProps(this);
    }

  }
};