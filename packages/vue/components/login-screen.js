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

  render() {
    const _h = this.$createElement;
    const self = this;
    const props = self.props;
    const {
      className,
      id,
      style
    } = props;
    const classes = Utils.classNames(className, 'login-screen', Mixins.colorClasses(props));
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
      if (!self.f7LoginScreen) return;

      if (opened) {
        self.f7LoginScreen.open();
      } else {
        self.f7LoginScreen.close();
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
    self.$f7ready(() => {
      self.f7LoginScreen = self.$f7.loginScreen.create({
        el,
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

  beforeDestroy() {
    const self = this;
    if (self.f7LoginScreen) self.f7LoginScreen.destroy();
  },

  methods: {
    onOpen(instance) {
      this.dispatchEvent('loginscreen:open loginScreenOpen', instance);
    },

    onOpened(instance) {
      this.dispatchEvent('loginscreen:opened loginScreenOpened', instance);
    },

    onClose(instance) {
      this.dispatchEvent('loginscreen:close loginScreenClose', instance);
    },

    onClosed(instance) {
      this.dispatchEvent('loginscreen:closed loginScreenClosed', instance);
    },

    open(animate) {
      const self = this;
      if (!self.f7LoginScreen) return undefined;
      return self.f7LoginScreen.open(animate);
    },

    close(animate) {
      const self = this;
      if (!self.f7LoginScreen) return undefined;
      return self.f7LoginScreen.close(animate);
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