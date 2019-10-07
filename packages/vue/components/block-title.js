import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __vueComponentProps from '../runtime-helpers/vue-component-props.js';
export default {
  name: 'f7-block-title',
  props: Object.assign({
    id: [String, Number],
    large: Boolean,
    medium: Boolean
  }, Mixins.colorProps),
  render: function render() {
    var _h = this.$createElement;
    var props = this.props;
    var className = props.className,
        id = props.id,
        style = props.style,
        large = props.large,
        medium = props.medium;
    var classes = Utils.classNames(className, 'block-title', {
      'block-title-large': large,
      'block-title-medium': medium
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