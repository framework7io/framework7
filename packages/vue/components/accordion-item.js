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
  created: function created() {
    Utils.bindMethods(this, 'onBeforeOpen onOpen onOpened onBeforeClose onClose onClosed'.split(' '));
  },
  mounted: function mounted() {
    var self = this;
    var el = self.$refs.el;
    if (!el) return;
    self.eventTargetEl = el;
    self.$f7ready(function (f7) {
      f7.on('accordionBeforeOpen', self.onBeforeOpen);
      f7.on('accordionOpen', self.onOpen);
      f7.on('accordionOpened', self.onOpened);
      f7.on('accordionBeforeClose', self.onBeforeClose);
      f7.on('accordionClose', self.onClose);
      f7.on('accordionClosed', self.onClosed);
    });
  },
  beforeDestroy: function beforeDestroy() {
    var self = this;
    var el = self.$refs.el;
    if (!el || !self.$f7) return;
    var f7 = self.$f7;
    f7.off('accordionBeforeOpen', self.onBeforeOpen);
    f7.off('accordionOpen', self.onOpen);
    f7.off('accordionOpened', self.onOpened);
    f7.off('accordionBeforeClose', self.onBeforeClose);
    f7.off('accordionClose', self.onClose);
    f7.off('accordionClosed', self.onClosed);
    delete this.eventTargetEl;
  },
  render: function render() {
    var _h = this.$createElement;
    var props = this.props;
    var className = props.className,
        id = props.id,
        style = props.style,
        opened = props.opened;
    var classes = Utils.classNames(className, 'accordion-item', {
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
    onBeforeOpen: function onBeforeOpen(el, prevent) {
      if (this.eventTargetEl !== el) return;
      this.dispatchEvent('accordionBeforeOpen accordion:beforeopen', prevent);
    },
    onOpen: function onOpen(el) {
      if (this.eventTargetEl !== el) return;
      this.dispatchEvent('accordionOpen accordion:open');
    },
    onOpened: function onOpened(el) {
      if (this.eventTargetEl !== el) return;
      this.dispatchEvent('accordionOpened accordion:opened');
    },
    onBeforeClose: function onBeforeClose(el, prevent) {
      if (this.eventTargetEl !== el) return;
      this.dispatchEvent('accordionBeforeClose accordion:beforeclose', prevent);
    },
    onClose: function onClose(el) {
      if (this.eventTargetEl !== el) return;
      this.dispatchEvent('accordionClose accordion:close');
    },
    onClosed: function onClosed(el) {
      if (this.eventTargetEl !== el) return;
      this.dispatchEvent('accordionClosed accordion:closed');
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