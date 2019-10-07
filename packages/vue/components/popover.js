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
  render: function render() {
    var _h = this.$createElement;
    var self = this;
    var props = self.props;
    var className = props.className,
        id = props.id,
        style = props.style;
    var classes = Utils.classNames(className, 'popover', Mixins.colorClasses(props));
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
      var self = this;
      if (!self.f7Popover) return;

      if (opened) {
        self.f7Popover.open();
      } else {
        self.f7Popover.close();
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
    var target = props.target,
        opened = props.opened,
        backdrop = props.backdrop,
        backdropEl = props.backdropEl,
        closeByBackdropClick = props.closeByBackdropClick,
        closeByOutsideClick = props.closeByOutsideClick,
        closeOnEscape = props.closeOnEscape;
    var popoverParams = {
      el: el,
      on: {
        open: self.onOpen,
        opened: self.onOpened,
        close: self.onClose,
        closed: self.onClosed
      }
    };
    if (target) popoverParams.targetEl = target;
    {
      var propsData = self.$options.propsData;
      if (typeof propsData.closeByBackdropClick !== 'undefined') popoverParams.closeByBackdropClick = closeByBackdropClick;
      if (typeof propsData.closeByOutsideClick !== 'undefined') popoverParams.closeByOutsideClick = closeByOutsideClick;
      if (typeof propsData.closeOnEscape !== 'undefined') popoverParams.closeOnEscape = closeOnEscape;
      if (typeof propsData.backdrop !== 'undefined') popoverParams.backdrop = backdrop;
      if (typeof propsData.backdropEl !== 'undefined') popoverParams.backdropEl = backdropEl;
    }
    self.$f7ready(function () {
      self.f7Popover = self.$f7.popover.create(popoverParams);

      if (opened && target) {
        self.f7Popover.open(target, false);
      }
    });
  },
  beforeDestroy: function beforeDestroy() {
    var self = this;
    if (self.f7Popover) self.f7Popover.destroy();
  },
  methods: {
    onOpen: function onOpen(instance) {
      this.dispatchEvent('popover:open popoverOpen', instance);
    },
    onOpened: function onOpened(instance) {
      this.dispatchEvent('popover:opened popoverOpened', instance);
    },
    onClose: function onClose(instance) {
      this.dispatchEvent('popover:close popoverClose', instance);
    },
    onClosed: function onClosed(instance) {
      this.dispatchEvent('popover:closed popoverClosed', instance);
    },
    open: function open(animate) {
      var self = this;
      if (!self.f7Popover) return undefined;
      return self.f7Popover.open(animate);
    },
    close: function close(animate) {
      var self = this;
      if (!self.f7Popover) return undefined;
      return self.f7Popover.close(animate);
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