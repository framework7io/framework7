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
  render: function render() {
    var _h = this.$createElement;
    var self = this;
    var props = self.props;
    var className = props.className,
        id = props.id,
        style = props.style,
        tabletFullscreen = props.tabletFullscreen,
        push = props.push;
    var classes = Utils.classNames(className, 'popup', {
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
      var self = this;
      if (!self.f7Popup) return;

      if (opened) {
        self.f7Popup.open();
      } else {
        self.f7Popup.close();
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
    var closeByBackdropClick = props.closeByBackdropClick,
        backdrop = props.backdrop,
        backdropEl = props.backdropEl,
        animate = props.animate,
        closeOnEscape = props.closeOnEscape,
        swipeToClose = props.swipeToClose,
        swipeHandler = props.swipeHandler;
    var popupParams = {
      el: el,
      on: {
        open: self.onOpen,
        opened: self.onOpened,
        close: self.onClose,
        closed: self.onClosed
      }
    };
    {
      var propsData = self.$options.propsData;
      if (typeof propsData.closeByBackdropClick !== 'undefined') popupParams.closeByBackdropClick = closeByBackdropClick;
      if (typeof propsData.closeOnEscape !== 'undefined') popupParams.closeOnEscape = closeOnEscape;
      if (typeof propsData.animate !== 'undefined') popupParams.animate = animate;
      if (typeof propsData.backdrop !== 'undefined') popupParams.backdrop = backdrop;
      if (typeof propsData.backdropEl !== 'undefined') popupParams.backdropEl = backdropEl;
      if (typeof propsData.swipeToClose !== 'undefined') popupParams.swipeToClose = swipeToClose;
      if (typeof propsData.swipeHandler !== 'undefined') popupParams.swipeHandler = swipeHandler;
    }
    self.$f7ready(function () {
      self.f7Popup = self.$f7.popup.create(popupParams);

      if (self.props.opened) {
        self.f7Popup.open(false);
      }
    });
  },
  beforeDestroy: function beforeDestroy() {
    var self = this;
    if (self.f7Popup) self.f7Popup.destroy();
  },
  methods: {
    onOpen: function onOpen(instance) {
      this.dispatchEvent('popup:open popupOpen', instance);
    },
    onOpened: function onOpened(instance) {
      this.dispatchEvent('popup:opened popupOpened', instance);
    },
    onClose: function onClose(instance) {
      this.dispatchEvent('popup:close popupClose', instance);
    },
    onClosed: function onClosed(instance) {
      this.dispatchEvent('popup:closed popupClosed', instance);
    },
    open: function open(animate) {
      var self = this;
      if (!self.f7Popup) return undefined;
      return self.f7Popup.open(animate);
    },
    close: function close(animate) {
      var self = this;
      if (!self.f7Popup) return undefined;
      return self.f7Popup.close(animate);
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