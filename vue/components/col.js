import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __vueComponentProps from '../runtime-helpers/vue-component-props.js';
let __vueComponentPropsKeys;
function __vueComponentGetPropKeys(props) {
  __vueComponentPropsKeys = Object.keys(props);
  return props;
}
const ColProps = Utils.extend({
  tag: {
    type: String,
    default: 'div'
  },
  width: {
    type: [
      Number,
      String
    ],
    default: 'auto'
  },
  tabletWidth: {
    type: [
      Number,
      String
    ]
  },
  desktopWidth: {
    type: [
      Number,
      String
    ]
  }
}, Mixins.colorProps);
export default {
  name: 'f7-col',
  props: __vueComponentGetPropKeys(ColProps),
  render() {
    var _h = this.$createElement;
    const self = this;
    const ColTag = self.props.tag;
    return _h(ColTag, {
      style: this.props.style,
      class: self.classes,
      attrs: { id: this.props.id }
    }, [this.$slots['default']]);
  },
  computed: {
    classes() {
      const self = this;
      return Utils.classNames(self.props.className, {
        col: self.props.width === 'auto',
        [`col-${ self.props.width }`]: self.props.width !== 'auto',
        [`tablet-${ self.props.tabletWidth }`]: self.props.tabletWidth,
        [`desktop-${ self.props.desktopWidth }`]: self.props.desktopWidth
      }, Mixins.colorClasses(self));
    },
    props() {
      return __vueComponentProps(this, __vueComponentPropsKeys);
    }
  }
};