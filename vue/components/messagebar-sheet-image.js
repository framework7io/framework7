import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __vueComponentDispatchEvent from '../runtime-helpers/vue-component-dispatch-event.js';
import __vueComponentProps from '../runtime-helpers/vue-component-props.js';
let __vueComponentPropsKeys;
function __vueComponentGetPropKeys(props) {
  __vueComponentPropsKeys = Object.keys(props);
  return props;
}
export default {
  name: 'f7-messagebar-sheet-image',
  props: __vueComponentGetPropKeys({
    image: String,
    checked: Boolean,
    ...Mixins.colorProps
  }),
  created() {
    this.onChangeBound = this.onChange.bind(this);
  },
  render() {
    var _h = this.$createElement;
    const self = this;
    const {image, checked, id, className, style} = self.props;
    const classes = Utils.classNames(className, 'messagebar-sheet-image', 'checkbox', Mixins.colorClasses(self));
    const styles = Utils.extend({ 'background-image': image && `url(${ image })` }, style || {});
    return _h('label', {
      class: classes,
      style: styles,
      attrs: { id: id }
    }, [
      _h('input', {
        on: { change: self.onChangeBound },
        attrs: {
          type: 'checkbox',
          checked: checked
        }
      }),
      _h('i', { class: 'icon icon-checkbox' }),
      this.$slots['default']
    ]);
  },
  methods: {
    onChange(e) {
      if (this.props.checked)
        this.dispatchEvent('checked', e);
      else
        this.dispatchEvent('unchecked', e);
      this.dispatchEvent('change', e);
    },
    dispatchEvent(events, ...args) {
      __vueComponentDispatchEvent(this, events, ...args);
    }
  },
  computed: {
    props() {
      return __vueComponentProps(this, __vueComponentPropsKeys);
    }
  }
};