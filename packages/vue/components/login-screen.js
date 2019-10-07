import Mixins from '../utils/mixins';
import Utils from '../utils/utils';
import __vueComponentDispatchEvent from '../runtime-helpers/vue-component-dispatch-event.js';
import __vueComponentProps from '../runtime-helpers/vue-component-props.js';
export default {
  name: 'f7-login-screen',
  props: Object.assign({
    id: [String, Number],
    opened: Boolean
  }, Mixins.colorProps),
  render: function render() {
    var _h = this.$createElement;
    var self = this;
    var props = self.props;
    var className = props.className,
        id = props.id,
        style = props.style;
    var classes = Utils.classNames(className, 'login-screen', Mixins.colorClasses(props));
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
      if (!self.f7LoginScreen) return;

      if (opened) {
        self.f7LoginScreen.open();
      } else {
        self.f7LoginScreen.close();
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
    self.$f7ready(function () {
      self.f7LoginScreen = self.$f7.loginScreen.create({
        el: el,
        on: {
          open: self.onOpen,
          opened: self.onOpened,
          close: self.onClose,
          closed: self.onClosed
        }
      });

      if (self.props.opened) {
        self.f7LoginScreen.open(false);
      }
    });
  },
  beforeDestroy: function beforeDestroy() {
    var self = this;
    if (self.f7LoginScreen) self.f7LoginScreen.destroy();
  },
  methods: {
    onOpen: function onOpen(instance) {
      this.dispatchEvent('loginscreen:open loginScreenOpen', instance);
    },
    onOpened: function onOpened(instance) {
      this.dispatchEvent('loginscreen:opened loginScreenOpened', instance);
    },
    onClose: function onClose(instance) {
      this.dispatchEvent('loginscreen:close loginScreenClose', instance);
    },
    onClosed: function onClosed(instance) {
      this.dispatchEvent('loginscreen:closed loginScreenClosed', instance);
    },
    open: function open(animate) {
      var self = this;
      if (!self.f7LoginScreen) return undefined;
      return self.f7LoginScreen.open(animate);
    },
    close: function close(animate) {
      var self = this;
      if (!self.f7LoginScreen) return undefined;
      return self.f7LoginScreen.close(animate);
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