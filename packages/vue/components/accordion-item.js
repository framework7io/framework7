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
    self.eventTargetEl = el;
    self.$f7ready(f7 => {
      f7.on('accordionBeforeOpen', self.onBeforeOpen);
      f7.on('accordionOpen', self.onOpen);
      f7.on('accordionOpened', self.onOpened);
      f7.on('accordionBeforeClose', self.onBeforeClose);
      f7.on('accordionClose', self.onClose);
      f7.on('accordionClosed', self.onClosed);
    });
  },

  beforeDestroy() {
    const self = this;
    const el = self.$refs.el;
    if (!el || !self.$f7) return;
    const f7 = self.$f7;
    f7.off('accordionBeforeOpen', self.onBeforeOpen);
    f7.off('accordionOpen', self.onOpen);
    f7.off('accordionOpened', self.onOpened);
    f7.off('accordionBeforeClose', self.onBeforeClose);
    f7.off('accordionClose', self.onClose);
    f7.off('accordionClosed', self.onClosed);
    delete this.eventTargetEl;
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
    onBeforeOpen(el, prevent) {
      if (this.eventTargetEl !== el) return;
      this.dispatchEvent('accordionBeforeOpen accordion:beforeopen', prevent);
    },

    onOpen(el) {
      if (this.eventTargetEl !== el) return;
      this.dispatchEvent('accordionOpen accordion:open');
    },

    onOpened(el) {
      if (this.eventTargetEl !== el) return;
      this.dispatchEvent('accordionOpened accordion:opened');
    },

    onBeforeClose(el, prevent) {
      if (this.eventTargetEl !== el) return;
      this.dispatchEvent('accordionBeforeClose accordion:beforeclose', prevent);
    },

    onClose(el) {
      if (this.eventTargetEl !== el) return;
      this.dispatchEvent('accordionClose accordion:close');
    },

    onClosed(el) {
      if (this.eventTargetEl !== el) return;
      this.dispatchEvent('accordionClosed accordion:closed');
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