import Mixins from '../utils/mixins';
import Utils from '../utils/utils';
import __vueComponentDispatchEvent from '../runtime-helpers/vue-component-dispatch-event.js';
import __vueComponentProps from '../runtime-helpers/vue-component-props.js';
export default {
  name: 'f7-popup',
  props: Object.assign({
    id: [String, Number],
    tabletFullscreen: Boolean,
    opened: Boolean,
    animate: Boolean,
    backdrop: Boolean,
    backdropEl: [String, Object, window.HTMLElement],
    closeByBackdropClick: Boolean,
    closeOnEscape: Boolean,
    swipeToClose: {
      type: [Boolean, String],
      default: false
    },
    swipeHandler: [String, Object, window.HTMLElement]
  }, Mixins.colorProps),

  render() {
    const _h = this.$createElement;
    const self = this;
    const props = self.props;
    const {
      className,
      id,
      style,
      tabletFullscreen
    } = props;
    const classes = Utils.classNames(className, 'popup', {
      'popup-tablet-fullscreen': tabletFullscreen
    }, Mixins.colorClasses(props));
    return _h('div', {
      ref: 'el',
      style: style,
      class: classes,
      attrs: {
        id: id
      }
    }, [this.$slots['default']]);
  },

  watch: {
    'props.opened': function watchOpened(opened) {
      const self = this;
      if (!self.f7Popup) return;

      if (opened) {
        self.f7Popup.open();
      } else {
        self.f7Popup.close();
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
    el.addEventListener('popup:open', self.onOpen);
    el.addEventListener('popup:opened', self.onOpened);
    el.addEventListener('popup:close', self.onClose);
    el.addEventListener('popup:closed', self.onClosed);
    const props = self.props;
    const {
      closeByBackdropClick,
      backdrop,
      backdropEl,
      animate,
      closeOnEscape,
      swipeToClose,
      swipeHandler
    } = props;
    const popupParams = {
      el
    };
    {
      if (typeof self.$options.propsData.closeByBackdropClick !== 'undefined') popupParams.closeByBackdropClick = closeByBackdropClick;
      if (typeof self.$options.propsData.closeOnEscape !== 'undefined') popupParams.closeOnEscape = closeOnEscape;
      if (typeof self.$options.propsData.animate !== 'undefined') popupParams.animate = animate;
      if (typeof self.$options.propsData.backdrop !== 'undefined') popupParams.backdrop = backdrop;
      if (typeof self.$options.propsData.backdropEl !== 'undefined') popupParams.backdropEl = backdropEl;
      if (typeof self.$options.propsData.swipeToClose !== 'undefined') popupParams.swipeToClose = swipeToClose;
      if (typeof self.$options.propsData.swipeHandler !== 'undefined') popupParams.swipeHandler = swipeHandler;
    }
    self.$f7ready(() => {
      self.f7Popup = self.$f7.popup.create(popupParams);

      if (self.props.opened) {
        self.f7Popup.open(false);
      }
    });
  },

  beforeDestroy() {
    const self = this;
    if (self.f7Popup) self.f7Popup.destroy();
    const el = self.$refs.el;
    if (!el) return;
    el.removeEventListener('popup:open', self.onOpen);
    el.removeEventListener('popup:opened', self.onOpened);
    el.removeEventListener('popup:close', self.onClose);
    el.removeEventListener('popup:closed', self.onClosed);
  },

  methods: {
    onOpen(event) {
      this.dispatchEvent('popup:open popupOpen', event);
    },

    onOpened(event) {
      this.dispatchEvent('popup:opened popupOpened', event);
    },

    onClose(event) {
      this.dispatchEvent('popup:close popupClose', event);
    },

    onClosed(event) {
      this.dispatchEvent('popup:closed popupClosed', event);
    },

    open(animate) {
      const self = this;
      if (!self.$f7) return undefined;
      return self.$f7.popup.open(self.$refs.el, animate);
    },

    close(animate) {
      const self = this;
      if (!self.$f7) return undefined;
      return self.$f7.popup.close(self.$refs.el, animate);
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