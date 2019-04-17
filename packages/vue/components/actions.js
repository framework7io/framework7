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

  created() {
    Utils.bindMethods(this, ['onOpen', 'onOpened', 'onClose', 'onClosed']);
  },

  mounted() {
    const self = this;
    const el = self.$refs.el;
    if (!el) return;
    el.addEventListener('actions:open', self.onOpen);
    el.addEventListener('actions:opened', self.onOpened);
    el.addEventListener('actions:close', self.onClose);
    el.addEventListener('actions:closed', self.onClosed);
    const props = self.props;
    const {
      grid,
      target,
      convertToPopover,
      forceToPopover,
      opened,
      closeByBackdropClick,
      closeByOutsideClick,
      closeOnEscape,
      backdrop,
      backdropEl
    } = props;
    const actionsParams = {
      el: self.$refs.el,
      grid
    };
    if (target) actionsParams.targetEl = target;
    {
      if (typeof self.$options.propsData.convertToPopover !== 'undefined') actionsParams.convertToPopover = convertToPopover;
      if (typeof self.$options.propsData.forceToPopover !== 'undefined') actionsParams.forceToPopover = forceToPopover;
      if (typeof self.$options.propsData.backdrop !== 'undefined') actionsParams.backdrop = backdrop;
      if (typeof self.$options.propsData.backdropEl !== 'undefined') actionsParams.backdropEl = backdropEl;
      if (typeof self.$options.propsData.closeByBackdropClick !== 'undefined') actionsParams.closeByBackdropClick = closeByBackdropClick;
      if (typeof self.$options.propsData.closeByOutsideClick !== 'undefined') actionsParams.closeByOutsideClick = closeByOutsideClick;
      if (typeof self.$options.propsData.closeOnEscape !== 'undefined') actionsParams.closeOnEscape = closeOnEscape;
    }
    self.$f7ready(() => {
      self.f7Actions = self.$f7.actions.create(actionsParams);

      if (opened) {
        self.f7Actions.open(false);
      }
    });
  },

  beforeDestroy() {
    const self = this;
    if (self.f7Actions) self.f7Actions.destroy();
    const el = self.$refs.el;
    if (!el) return;
    el.removeEventListener('actions:open', self.onOpen);
    el.removeEventListener('actions:opened', self.onOpened);
    el.removeEventListener('actions:close', self.onClose);
    el.removeEventListener('actions:closed', self.onClosed);
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