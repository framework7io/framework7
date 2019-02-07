import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __vueComponentProps from '../runtime-helpers/vue-component-props.js';
export default {
  name: 'f7-skeleton-text',
  props: Object.assign({
    id: [String, Number],
    width: [Number, String],
    height: [Number, String],
    tag: {
      type: String,
      default: 'span'
    }
  }, Mixins.colorProps),

  render() {
    const _h = this.$createElement;
    const props = this.props;
    const {
      className,
      id,
      style,
      width,
      height,
      tag
    } = props;
    const classes = Utils.classNames('skeleton-text', className, Mixins.colorClasses(props));
    let styleAttribute = style;

    if (width) {
      const widthValue = typeof width === 'number' ? `${width}px` : width;

      if (!styleAttribute) {
        styleAttribute = {
          width: widthValue
        };
      } else if (typeof styleAttribute === 'object') {
        styleAttribute = Object.assign({
          width: widthValue
        }, styleAttribute);
      } else if (typeof styleAttribute === 'string') {
        styleAttribute = `width: ${widthValue}; ${styleAttribute}`;
      }
    }

    if (height) {
      const heightValue = typeof height === 'number' ? `${height}px` : height;

      if (!styleAttribute) {
        styleAttribute = {
          height: heightValue
        };
      } else if (typeof styleAttribute === 'object') {
        styleAttribute = Object.assign({
          height: heightValue
        }, styleAttribute);
      } else if (typeof styleAttribute === 'string') {
        styleAttribute = `height: ${heightValue}; ${styleAttribute}`;
      }
    }

    const Tag = tag;
    return _h(Tag, {
      style: styleAttribute,
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