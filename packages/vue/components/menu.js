import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __vueComponentProps from '../runtime-helpers/vue-component-props.js';
export default {
  name: 'f7-menu',
  props: Object.assign({
    id: [String, Number]
  }, Mixins.colorProps),
  render: function render() {
    var _h = this.$createElement;
    var self = this;
    var props = self.props;
    var id = props.id,
        className = props.className,
        style = props.style;
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
    props: function props() {
      return __vueComponentProps(this);
    }
  }
};