function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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
  render: function render() {
    var _h = this.$createElement;
    var props = this.props;
    var className = props.className,
        id = props.id,
        style = props.style,
        width = props.width,
        height = props.height,
        tag = props.tag;
    var classes = Utils.classNames('skeleton-text', className, Mixins.colorClasses(props));
    var styleAttribute = style;

    if (width) {
      var widthValue = typeof width === 'number' ? "".concat(width, "px") : width;

      if (!styleAttribute) {
        styleAttribute = {
          width: widthValue
        };
      } else if (_typeof(styleAttribute) === 'object') {
        styleAttribute = Object.assign({
          width: widthValue
        }, styleAttribute);
      } else if (typeof styleAttribute === 'string') {
        styleAttribute = "width: ".concat(widthValue, "; ").concat(styleAttribute);
      }
    }

    if (height) {
      var heightValue = typeof height === 'number' ? "".concat(height, "px") : height;

      if (!styleAttribute) {
        styleAttribute = {
          height: heightValue
        };
      } else if (_typeof(styleAttribute) === 'object') {
        styleAttribute = Object.assign({
          height: heightValue
        }, styleAttribute);
      } else if (typeof styleAttribute === 'string') {
        styleAttribute = "height: ".concat(heightValue, "; ").concat(styleAttribute);
      }
    }

    var Tag = tag;
    return _h(Tag, {
      style: styleAttribute,
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