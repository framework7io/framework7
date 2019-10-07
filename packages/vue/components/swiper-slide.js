import Utils from '../utils/utils';
import __vueComponentProps from '../runtime-helpers/vue-component-props.js';
export default {
  name: 'f7-swiper-slide',
  props: {
    id: [String, Number],
    zoom: Boolean
  },
  render: function render() {
    var _h = this.$createElement;
    var props = this.props;
    var className = props.className,
        id = props.id,
        style = props.style,
        zoom = props.zoom;
    var classes = Utils.classNames(className, 'swiper-slide');
    return _h('div', {
      style: style,
      class: classes,
      attrs: {
        id: id
      }
    }, [zoom ? _h('div', {
      class: 'swiper-zoom-container'
    }, [this.$slots['default']]) : this.$slots['default']]);
  },
  computed: {
    props: function props() {
      return __vueComponentProps(this);
    }
  }
};