import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __vueComponentDispatchEvent from '../runtime-helpers/vue-component-dispatch-event.js';
import __vueComponentProps from '../runtime-helpers/vue-component-props.js';
let __vueComponentPropsKeys;
function __vueComponentGetPropKeys(props) {
  __vueComponentPropsKeys = Object.keys(props);
  return props;
}
const BlockProps = Utils.extend({
  inset: Boolean,
  tabletInset: Boolean,
  strong: Boolean,
  tabs: Boolean,
  tab: Boolean,
  tabActive: Boolean,
  accordionList: Boolean,
  noHairlines: Boolean,
  noHairlinesMd: Boolean,
  noHairlinesIos: Boolean
}, Mixins.colorProps);
export default {
  name: 'f7-block',
  props: __vueComponentGetPropKeys(BlockProps),
  mounted() {
    const el = this.$el;
    if (!el)
      return;
    this.onTabShowBound = this.onTabShow.bind(this);
    this.onTabHideBound = this.onTabHide.bind(this);
    el.addEventListener('tab:show', this.onTabShowBound);
    el.addEventListener('tab:hide', this.onTabHideBound);
  },
  beforeDestroy() {
    const el = this.$el;
    if (!el)
      return;
    el.removeEventListener('tab:show', this.onTabShowBound);
    el.removeEventListener('tab:hide', this.onTabHideBound);
  },
  render() {
    var _h = this.$createElement;
    return _h('div', {
      style: this.props.style,
      class: this.classes,
      attrs: { id: this.props.id }
    }, [this.$slots['default']]);
  },
  computed: {
    classes() {
      const self = this;
      return Utils.classNames(self.props.className, {
        block: true,
        inset: self.props.inset,
        'block-strong': self.props.strong,
        'accordion-list': self.props.accordionList,
        'tablet-inset': self.props.tabletInset,
        tabs: self.props.tabs,
        tab: self.props.tab,
        'tab-active': self.props.tabActive,
        'no-hairlines': self.props.noHairlines,
        'no-hairlines-md': self.props.noHairlinesMd,
        'no-hairlines-ios': self.props.noHairlinesIos
      }, Mixins.colorClasses(self));
    },
    props() {
      return __vueComponentProps(this, __vueComponentPropsKeys);
    }
  },
  methods: {
    onTabShow(e) {
      this.dispatchEvent('tabShow tab:show', e);
    },
    onTabHide(e) {
      this.dispatchEvent('tabShow tab:hide', e);
    },
    dispatchEvent(events, ...args) {
      __vueComponentDispatchEvent(this, events, ...args);
    }
  }
};