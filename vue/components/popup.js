import Mixins from '../utils/mixins';
import Utils from '../utils/utils';
import __vueComponentDispatchEvent from '../runtime-helpers/vue-component-dispatch-event.js';
import __vueComponentProps from '../runtime-helpers/vue-component-props.js';
let __vueComponentPropsKeys;
function __vueComponentGetPropKeys(props) {
  __vueComponentPropsKeys = Object.keys(props);
  return props;
}
export default {
  name: 'f7-popup',
  props: __vueComponentGetPropKeys({
    'tablet-fullscreen': Boolean,
    opened: Boolean,
    ...Mixins.colorProps
  }),
  render() {
    var _h = this.$createElement;
    const self = this;
    return _h('div', {
      ref: 'el',
      style: self.props.style,
      class: self.classes,
      attrs: { id: self.props.id }
    }, [this.$slots['default']]);
  },
  watch: {
    'props.opened': function watchOpened(opened) {
      const self = this;
      if (!self.f7Popup)
        return;
      if (opened) {
        self.f7Popup.open();
      } else {
        self.f7Popup.close();
      }
    }
  },
  computed: {
    classes() {
      const self = this;
      return Utils.classNames(self.props.className, 'popup', { 'popup-tablet-fullscreen': self.props.tabletFullscreen }, Mixins.colorClasses(self));
    },
    props() {
      return __vueComponentProps(this, __vueComponentPropsKeys);
    }
  },
  mounted() {
    const self = this;
    const el = self.$refs.el;
    if (!el)
      return;
    self.onOpenBound = self.onOpen.bind(self);
    self.onOpenedBound = self.onOpened.bind(self);
    self.onCloseBound = self.onClose.bind(self);
    self.onClosedBound = self.onClosed.bind(self);
    el.addEventListener('popup:open', self.onOpenBound);
    el.addEventListener('popup:opened', self.onOpenedBound);
    el.addEventListener('popup:close', self.onCloseBound);
    el.addEventListener('popup:closed', self.onClosedBound);
    self.$f7ready(() => {
      self.f7Popup = self.$f7.popup.create({ el });
      if (self.props.opened) {
        self.f7Popup.open(false);
      }
    });
  },
  beforeDestroy() {
    const self = this;
    if (self.f7Popup)
      self.f7Popup.destroy();
    const el = self.$refs.el;
    if (!el)
      return;
    el.removeEventListener('popup:open', self.onOpenBound);
    el.removeEventListener('popup:opened', self.onOpenedBound);
    el.removeEventListener('popup:close', self.onCloseBound);
    el.removeEventListener('popup:closed', self.onClosedBound);
  },
  methods: {
    onOpen(event) {
      this.dispatchEvent('popup:open', event);
    },
    onOpened(event) {
      this.dispatchEvent('popup:opened', event);
    },
    onClose(event) {
      this.dispatchEvent('popup:close', event);
    },
    onClosed(event) {
      this.dispatchEvent('popup:closed', event);
    },
    open(animate) {
      const self = this;
      if (!self.$f7)
        return undefined;
      return self.$f7.popup.open(self.$refs.el, animate);
    },
    close(animate) {
      const self = this;
      if (!self.$f7)
        return undefined;
      return self.$f7.popup.close(self.$refs.el, animate);
    },
    dispatchEvent(events, ...args) {
      __vueComponentDispatchEvent(this, events, ...args);
    }
  }
};