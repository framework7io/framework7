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
  render: function render() {
    var _h = this.$createElement;
    var props = this.props;
    var id = props.id,
        className = props.className,
        style = props.style,
        padding = props.padding;
    var classes = Utils.classNames(className, 'card-content', {
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
    props: function props() {
      return __vueComponentProps(this);
    }
  }
};