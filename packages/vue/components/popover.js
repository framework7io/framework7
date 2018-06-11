import Mixins from '../utils/mixins';
import Utils from '../utils/utils';
import __vueComponentDispatchEvent from '../runtime-helpers/vue-component-dispatch-event.js';
import __vueComponentProps from '../runtime-helpers/vue-component-props.js';
export default {
  name: 'f7-popover',
  props: Object.assign({
    id: [String, Number],
    opened: Boolean,
    target: [String, Object]
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

  mounted() {
    const self = this;
    const el = self.$refs.el;
    if (!el) return;
    self.onOpenBound = self.onOpen.bind(self);
    self.onOpenedBound = self.onOpened.bind(self);
    self.onCloseBound = self.onClose.bind(self);
    self.onClosedBound = self.onClosed.bind(self);
    el.addEventListener('popover:open', self.onOpenBound);
    el.addEventListener('popover:opened', self.onOpenedBound);
    el.addEventListener('popover:close', self.onCloseBound);
    el.addEventListener('popover:closed', self.onClosedBound);
    const {
      target,
      opened
    } = self.props;
    self.$f7ready(() => {
      const popoverParams = {
        el
      };
      if (target) popoverParams.targetEl = target;
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
    el.removeEventListener('popover:open', self.onOpenBound);
    el.removeEventListener('popover:opened', self.onOpenedBound);
    el.removeEventListener('popover:close', self.onCloseBound);
    el.removeEventListener('popover:closed', self.onClosedBound);
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