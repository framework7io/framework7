import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __vueComponentProps from '../runtime-helpers/vue-component-props.js';
export default {
  name: 'f7-appbar',
  props: Object.assign({
    id: [String, Number],
    noShadow: Boolean,
    noHairline: Boolean,
    inner: {
      type: Boolean,
      default: true
    },
    innerClass: String,
    innerClassName: String
  }, Mixins.colorProps),
  render: function render() {
    var _h = this.$createElement;
    var self = this;
    var props = self.props;
    var inner = props.inner,
        innerClass = props.innerClass,
        innerClassName = props.innerClassName,
        className = props.className,
        id = props.id,
        style = props.style,
        noShadow = props.noShadow,
        noHairline = props.noHairline;
    var innerEl;

    if (inner) {
      innerEl = _h('div', {
        ref: 'inner',
        class: Utils.classNames('appbar-inner', innerClass, innerClassName)
      }, [this.$slots['default']]);
    }

    var classes = Utils.classNames(className, 'appbar', {
      'no-shadow': noShadow,
      'no-hairline': noHairline
    }, Mixins.colorClasses(props));
    return _h('div', {
      ref: 'el',
      style: style,
      class: classes,
      attrs: {
        id: id
      }
    }, [this.$slots['before-inner'], innerEl || self.$slots.default, this.$slots['after-inner']]);
  },
  computed: {
    props: function props() {
      return __vueComponentProps(this);
    }
  }
};