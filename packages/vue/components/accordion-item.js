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

  created() {
    Utils.bindMethods(this, 'onBeforeOpen onOpen onOpened onBeforeClose onClose onClosed'.split(' '));
  },

  mounted() {
    const self = this;
    const el = self.$refs.el;
    if (!el) return;
    el.addEventListener('accordion:beforeopen', self.onBeforeOpen);
    el.addEventListener('accordion:open', self.onOpen);
    el.addEventListener('accordion:opened', self.onOpened);
    el.addEventListener('accordion:beforeclose', self.onBeforeClose);
    el.addEventListener('accordion:close', self.onClose);
    el.addEventListener('accordion:closed', self.onClosed);
  },

  beforeDestroy() {
    const self = this;
    const el = self.$refs.el;
    if (!el) return;
    el.removeEventListener('accordion:beforeopen', self.onBeforeOpen);
    el.removeEventListener('accordion:open', self.onOpen);
    el.removeEventListener('accordion:opened', self.onOpened);
    el.removeEventListener('accordion:beforeclose', self.onBeforeClose);
    el.removeEventListener('accordion:close', self.onClose);
    el.removeEventListener('accordion:closed', self.onClosed);
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
      ref: 'el',
      attrs: {
        id: id
      }
    }, [this.$slots['default']]);
  },

  methods: {
    onBeforeOpen(event) {
      this.dispatchEvent('accordionBeforeOpen accordion:beforeopen', event, event.detail.prevent);
    },

    onOpen(event) {
      this.dispatchEvent('accordionOpen accordion:open', event);
    },

    onOpened(event) {
      this.dispatchEvent('accordionOpened accordion:opened', event);
    },

    onBeforeClose(event) {
      this.dispatchEvent('accordionBeforeClose accordion:beforeclose', event, event.detail.prevent);
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