import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __vueComponentDispatchEvent from '../runtime-helpers/vue-component-dispatch-event.js';
import __vueComponentProps from '../runtime-helpers/vue-component-props.js';
let __vueComponentPropsKeys;
function __vueComponentGetPropKeys(props) {
  __vueComponentPropsKeys = Object.keys(props);
  return props;
}
const AccordionItemProps = Utils.extend({ opened: Boolean }, Mixins.colorProps);
export default {
  name: 'f7-accordion-item',
  props: __vueComponentGetPropKeys(AccordionItemProps),
  mounted() {
    const self = this;
    const el = self.$el;
    if (!el)
      return;
    self.onOpenBound = self.onOpen.bind(self);
    self.onOpenedBound = self.onOpened.bind(self);
    self.onCloseBound = self.onClose.bind(self);
    self.onClosedBound = self.onClosed.bind(self);
    el.addEventListener('accordion:open', self.onOpenBound);
    el.addEventListener('accordion:opened', self.onOpenedBound);
    el.addEventListener('accordion:close', self.onCloseBound);
    el.addEventListener('accordion:closed', self.onClosedBound);
  },
  beforeDestroy() {
    const self = this;
    const el = self.$el;
    if (!el)
      return;
    el.removeEventListener('accordion:open', self.onOpenBound);
    el.removeEventListener('accordion:opened', self.onOpenedBound);
    el.removeEventListener('accordion:close', self.onCloseBound);
    el.removeEventListener('accordion:closed', self.onClosedBound);
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
        'accordion-item': true,
        'accordion-item-opened': self.props.opened
      }, Mixins.colorClasses(self));
    },
    props() {
      return __vueComponentProps(this, __vueComponentPropsKeys);
    }
  },
  methods: {
    onOpen(event) {
      this.dispatchEvent('accordionOpen accordion:open', event);
    },
    onOpened(event) {
      this.dispatchEvent('accordionOpened accordion:opened', event);
    },
    onClose(event) {
      this.dispatchEvent('accordionClose accordion:close', event);
    },
    onClosed(event) {
      this.dispatchEvent('accordionClosed accordion:closed', event);
    },
    dispatchEvent(events, ...args) {
      __vueComponentDispatchEvent(this, events, ...args);
    }
  }
};