import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __vueComponentProps from '../runtime-helpers/vue-component-props.js';
let __vueComponentPropsKeys;
function __vueComponentGetPropKeys(props) {
  __vueComponentPropsKeys = Object.keys(props);
  return props;
}
const TabsProps = Utils.extend({
  animated: Boolean,
  swipeable: Boolean,
  routable: Boolean
}, Mixins.colorProps);
export default {
  name: 'f7-tabs',
  props: __vueComponentGetPropKeys(TabsProps),
  render() {
    var _h = this.$createElement;
    const self = this;
    const {animated, swipeable, id, style} = self.props;
    if (animated || swipeable) {
      return _h('div', { class: self.classes }, [_h('div', { class: 'tabs' }, [this.$slots['default']])]);
    }
    return _h('div', {
      style: style,
      class: Utils.classNames('tabs', this.classes),
      attrs: { id: id }
    }, [this.$slots['default']]);
  },
  computed: {
    classes() {
      return Utils.classNames(this.props.className, {
        'tabs-animated-wrap': this.props.animated,
        'tabs-swipeable-wrap': this.props.swipeable,
        'tabs-routable': this.props.routable
      }, Mixins.colorClasses(this));
    },
    props() {
      return __vueComponentProps(this, __vueComponentPropsKeys);
    }
  }
};