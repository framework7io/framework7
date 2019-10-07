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
  render: function render() {
    var _h = this.$createElement;
    var self = this;
    var props = self.props;
    var className = props.className,
        id = props.id,
        style = props.style,
        grid = props.grid;
    var classes = Utils.classNames(className, 'actions-modal', {
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
      var self = this;
      if (!self.f7Actions) return;

      if (opened) {
        self.f7Actions.open();
      } else {
        self.f7Actions.close();
      }
    }
  },
  created: function created() {
    Utils.bindMethods(this, ['onOpen', 'onOpened', 'onClose', 'onClosed']);
  },
  mounted: function mounted() {
    var self = this;
    var el = self.$refs.el;
    if (!el) return;
    var props = self.props;
    var grid = props.grid,
        target = props.target,
        convertToPopover = props.convertToPopover,
        forceToPopover = props.forceToPopover,
        opened = props.opened,
        closeByBackdropClick = props.closeByBackdropClick,
        closeByOutsideClick = props.closeByOutsideClick,
        closeOnEscape = props.closeOnEscape,
        backdrop = props.backdrop,
        backdropEl = props.backdropEl;
    var actionsParams = {
      el: el,
      grid: grid,
      on: {
        open: self.onOpen,
        opened: self.onOpened,
        close: self.onClose,
        closed: self.onClosed
      }
    };
    if (target) actionsParams.targetEl = target;
    {
      var propsData = self.$options.propsData;
      if (typeof propsData.convertToPopover !== 'undefined') actionsParams.convertToPopover = convertToPopover;
      if (typeof propsData.forceToPopover !== 'undefined') actionsParams.forceToPopover = forceToPopover;
      if (typeof propsData.backdrop !== 'undefined') actionsParams.backdrop = backdrop;
      if (typeof propsData.backdropEl !== 'undefined') actionsParams.backdropEl = backdropEl;
      if (typeof propsData.closeByBackdropClick !== 'undefined') actionsParams.closeByBackdropClick = closeByBackdropClick;
      if (typeof propsData.closeByOutsideClick !== 'undefined') actionsParams.closeByOutsideClick = closeByOutsideClick;
      if (typeof propsData.closeOnEscape !== 'undefined') actionsParams.closeOnEscape = closeOnEscape;
    }
    self.$f7ready(function () {
      self.f7Actions = self.$f7.actions.create(actionsParams);

      if (opened) {
        self.f7Actions.open(false);
      }
    });
  },
  beforeDestroy: function beforeDestroy() {
    var self = this;
    if (self.f7Actions) self.f7Actions.destroy();
    delete self.f7Actions;
  },
  methods: {
    onOpen: function onOpen(instance) {
      this.dispatchEvent('actions:open actionsOpen', instance);
    },
    onOpened: function onOpened(instance) {
      this.dispatchEvent('actions:opened actionsOpened', instance);
    },
    onClose: function onClose(instance) {
      this.dispatchEvent('actions:close actionsClose', instance);
    },
    onClosed: function onClosed(instance) {
      this.dispatchEvent('actions:closed actionsClosed', instance);
    },
    open: function open(animate) {
      var self = this;
      if (!self.f7Actions) return undefined;
      return self.f7Actions.open(animate);
    },
    close: function close(animate) {
      var self = this;
      if (!self.f7Actions) return undefined;
      return self.f7Actions.close(animate);
    },
    dispatchEvent: function dispatchEvent(events) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      __vueComponentDispatchEvent.apply(void 0, [this, events].concat(args));
    }
  },
  computed: {
    props: function props() {
      return __vueComponentProps(this);
    }
  }
};