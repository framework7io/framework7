import Mixins from '../utils/mixins';
import Utils from '../utils/utils';
import __vueComponentDispatchEvent from '../runtime-helpers/vue-component-dispatch-event.js';
import __vueComponentProps from '../runtime-helpers/vue-component-props.js';
export default {
  name: 'f7-actions',
  props: Object.assign({
    id: [String, Number],
    opened: Boolean,
    grid: Boolean,
    convertToPopover: Boolean,
    forceToPopover: Boolean,
    target: [String, Object]
  }, Mixins.colorProps),

  render() {
    const _h = this.$createElement;
    const self = this;
    const props = self.props;
    const {
      className,
      id,
      style,
      grid
    } = props;
    const classes = Utils.classNames(className, 'actions-modal', {
      'actions-grid': grid
    }, Mixins.colorClasses(props));
    return _h('div', {
      style: style,
      ref: 'el',
      class: classes,
      attrs: {
        id: id
      }
    }, [this.$slots['default']]);
  },

  watch: {
    'props.opened': function watchOpened(opened) {
      const self = this;
      if (!self.f7Actions) return;

      if (opened) {
        self.f7Actions.open();
      } else {
        self.f7Actions.close();
      }
    }
  },

  mounted() {
    const self = this;
    const el = self.$refs.el;
    if (!el) return;
    const props = self.props;
    const {
      grid,
      target,
      convertToPopover,
      forceToPopover,
      opened
    } = props;
    self.onOpenBound = self.onOpen.bind(self);
    self.onOpenedBound = self.onOpened.bind(self);
    self.onCloseBound = self.onClose.bind(self);
    self.onClosedBound = self.onClosed.bind(self);
    el.addEventListener('actions:open', self.onOpenBound);
    el.addEventListener('actions:opened', self.onOpenedBound);
    el.addEventListener('actions:close', self.onCloseBound);
    el.addEventListener('actions:closed', self.onClosedBound);
    self.$f7ready(() => {
      const actionsParams = {
        el: self.$refs.el,
        grid
      };
      if (target) actionsParams.targetEl = target;
      if (typeof self.$options.propsData.convertToPopover !== 'undefined') actionsParams.convertToPopover = convertToPopover;
      if (typeof self.$options.propsData.forceToPopover !== 'undefined') actionsParams.forceToPopover = forceToPopover;
      self.f7Actions = self.$f7.actions.create(actionsParams);

      if (opened) {
        self.f7Actions.open(false);
      }
    });
  },

  beforeDestroy() {
    const self = this;
    if (self.f7Actions) self.f7Actions.destroy();
    const el = self.$el;
    if (!el) return;
    el.removeEventListener('actions:open', self.onOpenBound);
    el.removeEventListener('actions:opened', self.onOpenedBound);
    el.removeEventListener('actions:close', self.onCloseBound);
    el.removeEventListener('actions:closed', self.onClosedBound);
  },

  methods: {
    onOpen(event) {
      this.dispatchEvent('actions:open actionsOpen', event);
    },

    onOpened(event) {
      this.dispatchEvent('actions:opened actionsOpened', event);
    },

    onClose(event) {
      this.dispatchEvent('actions:close actionsClose', event);
    },

    onClosed(event) {
      this.dispatchEvent('actions:closed actionsClosed', event);
    },

    open(animate) {
      const self = this;
      if (!self.$f7) return undefined;
      return self.$f7.actions.open(self.$refs.el, animate);
    },

    close(animate) {
      const self = this;
      if (!self.$f7) return undefined;
      return self.$f7.actions.close(self.$refs.el, animate);
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