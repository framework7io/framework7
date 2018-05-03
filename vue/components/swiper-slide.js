import Utils from '../utils/utils';
import __vueComponentProps from '../runtime-helpers/vue-component-props.js';
let __vueComponentPropsKeys;
function __vueComponentGetPropKeys(props) {
  __vueComponentPropsKeys = Object.keys(props);
  return props;
}
export default {
  name: 'f7-swiper-slide',
  render() {
    var _h = this.$createElement;
    const classes = Utils.classNames(this.props.className, 'swiper-slide');
    return _h('div', {
      style: this.props.style,
      class: classes,
      attrs: { id: this.props.id }
    }, [this.props.zoom ? _h('div', { class: 'swiper-zoom-container' }, [this.$slots['default']]) : this.$slots['default']]);
  },
  props: __vueComponentGetPropKeys({ zoom: Boolean }),
  computed: {
    props() {
      return __vueComponentProps(this, __vueComponentPropsKeys);
    }
  }
};