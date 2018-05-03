import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __vueComponentProps from '../runtime-helpers/vue-component-props.js';
let __vueComponentPropsKeys;
function __vueComponentGetPropKeys(props) {
  __vueComponentPropsKeys = Object.keys(props);
  return props;
}
const SubnavbarProps = Utils.extend({
  sliding: Boolean,
  title: String,
  inner: {
    type: Boolean,
    default: true
  }
}, Mixins.colorProps);
export default {
  name: 'f7-subnavbar',
  props: __vueComponentGetPropKeys(SubnavbarProps),
  render() {
    var _h = this.$createElement;
    const self = this;
    const {inner, title} = self.props;
    return _h('div', { class: self.classes }, [inner ? _h('div', { class: 'subnavbar-inner' }, [
        title && _h('div', { class: 'title' }, [title]),
        this.$slots['default']
      ]) : this.$slots['default']]);
  },
  computed: {
    classes() {
      return Utils.classNames(this.props.className, {
        subnavbar: true,
        sliding: this.props.sliding
      }, Mixins.colorClasses(this));
    },
    props() {
      return __vueComponentProps(this, __vueComponentPropsKeys);
    }
  }
};