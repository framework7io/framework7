import Utils from '../utils/utils';
import __vueComponentProps from '../runtime-helpers/vue-component-props.js';
export default {
  name: 'f7-swiper-slide',
  props: {
    id: [String, Number],
    zoom: Boolean
  },

  render() {
    const _h = this.$createElement;
    const props = this.props;
    const {
      className,
      id,
      style,
      zoom
    } = props;
    const classes = Utils.classNames(className, 'swiper-slide');
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
    props() {
      return __vueComponentProps(this);
    }

  }
};