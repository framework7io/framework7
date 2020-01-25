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
    swipeHandler: [String, Object, window.HTMLElement],
    push: Boolean
  }, Mixins.colorProps),

  render() {
    const _h = this.$createElement;
    const self = this;
    const props = self.props;
    const {
      className,
      id,
      style,
      tabletFullscreen,
      push
    } = props;
    const classes = Utils.classNames(className, 'popup', {
      'popup-tablet-fullscreen': tabletFullscreen,
      'popup-push': push
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
      el,
      on: {
        open: self.onOpen,
        opened: self.onOpened,
        close: self.onClose,
        closed: self.onClosed
      }
    };
    {
      const propsData = self.$options.propsData;
      if (typeof propsData.closeByBackdropClick !== 'undefined') popupParams.closeByBackdropClick = closeByBackdropClick;
      if (typeof propsData.closeOnEscape !== 'undefined') popupParams.closeOnEscape = closeOnEscape;
      if (typeof propsData.animate !== 'undefined') popupParams.animate = animate;
      if (typeof propsData.backdrop !== 'undefined') popupParams.backdrop = backdrop;
      if (typeof propsData.backdropEl !== 'undefined') popupParams.backdropEl = backdropEl;
      if (typeof propsData.swipeToClose !== 'undefined') popupParams.swipeToClose = swipeToClose;
      if (typeof propsData.swipeHandler !== 'undefined') popupParams.swipeHandler = swipeHandler;
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
  },

  methods: {
    onOpen(instance) {
      this.dispatchEvent('popup:open popupOpen', instance);
    },

    onOpened(instance) {
      this.dispatchEvent('popup:opened popupOpened', instance);
    },

    onClose(instance) {
      this.dispatchEvent('popup:close popupClose', instance);
    },

    onClosed(instance) {
      this.dispatchEvent('popup:closed popupClosed', instance);
    },

    open(animate) {
      const self = this;
      if (!self.f7Popup) return undefined;
      return self.f7Popup.open(animate);
    },

    close(animate) {
      const self = this;
      if (!self.f7Popup) return undefined;
      return self.f7Popup.close(animate);
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