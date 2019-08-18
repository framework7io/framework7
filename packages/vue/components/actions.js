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
      el,
      grid,
      on: {
        open: self.onOpen,
        opened: self.onOpened,
        close: self.onClose,
        closed: self.onClosed
      }
    };
    if (target) actionsParams.targetEl = target;
    {
      const propsData = self.$options.propsData;
      if (typeof propsData.convertToPopover !== 'undefined') actionsParams.convertToPopover = convertToPopover;
      if (typeof propsData.forceToPopover !== 'undefined') actionsParams.forceToPopover = forceToPopover;
      if (typeof propsData.backdrop !== 'undefined') actionsParams.backdrop = backdrop;
      if (typeof propsData.backdropEl !== 'undefined') actionsParams.backdropEl = backdropEl;
      if (typeof propsData.closeByBackdropClick !== 'undefined') actionsParams.closeByBackdropClick = closeByBackdropClick;
      if (typeof propsData.closeByOutsideClick !== 'undefined') actionsParams.closeByOutsideClick = closeByOutsideClick;
      if (typeof propsData.closeOnEscape !== 'undefined') actionsParams.closeOnEscape = closeOnEscape;
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
    delete self.f7Actions;
  },

  methods: {
    onOpen(instance) {
      this.dispatchEvent('actions:open actionsOpen', instance);
    },

    onOpened(instance) {
      this.dispatchEvent('actions:opened actionsOpened', instance);
    },

    onClose(instance) {
      this.dispatchEvent('actions:close actionsClose', instance);
    },

    onClosed(instance) {
      this.dispatchEvent('actions:closed actionsClosed', instance);
    },

    open(animate) {
      const self = this;
      if (!self.f7Actions) return undefined;
      return self.f7Actions.open(animate);
    },

    close(animate) {
      const self = this;
      if (!self.f7Actions) return undefined;
      return self.f7Actions.close(animate);
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