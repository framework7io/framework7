import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __vueComponentDispatchEvent from '../runtime-helpers/vue-component-dispatch-event.js';
import __vueComponentProps from '../runtime-helpers/vue-component-props.js';
export default {
  name: 'f7-accordion-item',
  props: Object.assign({
    id: [String, Number],
    opened: Boolean
  }, Mixins.colorProps),

  mounted() {
    const self = this;
    const el = self.$el;
    if (!el) return;
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
    if (!el) return;
    el.removeEventListener('accordion:open', self.onOpenBound);
    el.removeEventListener('accordion:opened', self.onOpenedBound);
    el.removeEventListener('accordion:close', self.onCloseBound);
    el.removeEventListener('accordion:closed', self.onClosedBound);
  },

  render() {
    const _h = this.$createElement;
    const props = this.props;
    const {
      className,
      id,
      style,
      opened
    } = props;
    const classes = Utils.classNames(className, 'accordion-item', {
      'accordion-item-opened': opened
    }, Mixins.colorClasses(props));
    return _h('div', {
      style: style,
      class: classes,
      attrs: {
        id: id
      }
    }, [this.$slots['default']]);
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

  },
  computed: {
    props() {
      return __vueComponentProps(this);
    }

  }
};