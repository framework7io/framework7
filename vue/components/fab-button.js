import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __vueComponentDispatchEvent from '../runtime-helpers/vue-component-dispatch-event.js';
import __vueComponentProps from '../runtime-helpers/vue-component-props.js';
let __vueComponentPropsKeys;
function __vueComponentGetPropKeys(props) {
  __vueComponentPropsKeys = Object.keys(props);
  return props;
}
const FabButtonProps = Utils.extend({ fabClose: Boolean }, Mixins.colorProps);
export default {
  name: 'f7-fab-button',
  props: __vueComponentGetPropKeys(FabButtonProps),
  render() {
    var _h = this.$createElement;
    return _h('a', {
      style: this.props.style,
      class: this.classes,
      on: { click: this.onClick.bind(this) },
      attrs: { id: this.props.id }
    }, [this.$slots['default']]);
  },
  computed: {
    classes() {
      const self = this;
      return Utils.classNames(self.props.className, { 'fab-close': self.fabClose }, Mixins.colorClasses(self));
    },
    props() {
      return __vueComponentProps(this, __vueComponentPropsKeys);
    }
  },
  methods: {
    onClick(event) {
      this.dispatchEvent('click', event);
    },
    dispatchEvent(events, ...args) {
      __vueComponentDispatchEvent(this, events, ...args);
    }
  }
};