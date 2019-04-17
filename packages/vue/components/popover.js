import Mixins from '../utils/mixins';
import Utils from '../utils/utils';
import __vueComponentDispatchEvent from '../runtime-helpers/vue-component-dispatch-event.js';
import __vueComponentProps from '../runtime-helpers/vue-component-props.js';
export default {
  name: 'f7-popover',
  props: Object.assign({
    id: [String, Number],
    opened: Boolean,
    target: [String, Object],
    backdrop: Boolean,
    backdropEl: [String, Object, window.HTMLElement],
    closeByBackdropClick: Boolean,
    closeByOutsideClick: Boolean,
    closeOnEscape: Boolean
  }, Mixins.colorProps),

  render() {
    const _h = this.$createElement;
    const self = this;
    const props = self.props;
    const {
      className,
      id,
      style
    } = props;
    const classes = Utils.classNames(className, 'popover', Mixins.colorClasses(props));
    return _h('div', {
      ref: 'el',
      style: style,
      class: classes,
      attrs: {
        id: id
      }
    }, [_h('div', {
      class: 'popover-angle'
    }), _h('div', {
      class: 'popover-inner'
    }, [this.$slots['default']])]);
  },

  watch: {
    'props.opened': function watchOpened(opened) {
      const self = this;
      if (!self.f7Popover) return;

      if (opened) {
        self.f7Popover.open();
      } else {
        self.f7Popover.close();
      }
    }
  },

  created() {
    Utils.bindMethods(this, ['onOpen', 'onOpened', 'onClose', 'onClosed']);
  },

  mounted() {
    const self = this;
    const el = self.$refs.el;
    if (!el) return;
    el.addEventListener('popover:open', self.onOpen);
    el.addEventListener('popover:opened', self.onOpened);
    el.addEventListener('popover:close', self.onClose);
    el.addEventListener('popover:closed', self.onClosed);
    const props = self.props;
    const {
      target,
      opened,
      backdrop,
      backdropEl,
      closeByBackdropClick,
      closeByOutsideClick,
      closeOnEscape
    } = props;
    const popoverParams = {
      el
    };
    if (target) popoverParams.targetEl = target;
    {
      if (typeof self.$options.propsData.closeByBackdropClick !== 'undefined') popoverParams.closeByBackdropClick = closeByBackdropClick;
      if (typeof self.$options.propsData.closeByOutsideClick !== 'undefined') popoverParams.closeByOutsideClick = closeByOutsideClick;
      if (typeof self.$options.propsData.closeOnEscape !== 'undefined') popoverParams.closeOnEscape = closeOnEscape;
      if (typeof self.$options.propsData.backdrop !== 'undefined') popoverParams.backdrop = backdrop;
      if (typeof self.$options.propsData.backdropEl !== 'undefined') popoverParams.backdropEl = backdropEl;
    }
    self.$f7ready(() => {
      self.f7Popover = self.$f7.popover.create(popoverParams);

      if (opened && target) {
        self.f7Popover.open(target, false);
      }
    });
  },

  beforeDestroy() {
    const self = this;
    if (self.f7Popover) self.f7Popover.destroy();
    const el = self.$refs.el;
    if (!el) return;
    el.removeEventListener('popover:open', self.onOpen);
    el.removeEventListener('popover:opened', self.onOpened);
    el.removeEventListener('popover:close', self.onClose);
    el.removeEventListener('popover:closed', self.onClosed);
  },

  methods: {
    onOpen(event) {
      this.dispatchEvent('popover:open popoverOpen', event);
    },

    onOpened(event) {
      this.dispatchEvent('popover:opened popoverOpened', event);
    },

    onClose(event) {
      this.dispatchEvent('popover:close popoverClose', event);
    },

    onClosed(event) {
      this.dispatchEvent('popover:closed popoverClosed', event);
    },

    open(target, animate) {
      const self = this;
      if (!self.$f7) return undefined;
      return self.$f7.popover.open(self.$refs.el, target, animate);
    },

    close(animate) {
      const self = this;
      if (!self.$f7) return undefined;
      return self.$f7.sheet.close(self.$refs.el, animate);
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