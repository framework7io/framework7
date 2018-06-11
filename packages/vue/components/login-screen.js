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

  mounted() {
    const self = this;
    const el = self.$refs.el;
    if (!el) return;
    self.onOpenBound = self.onOpen.bind(self);
    self.onOpenedBound = self.onOpened.bind(self);
    self.onCloseBound = self.onClose.bind(self);
    self.onClosedBound = self.onClosed.bind(self);
    el.addEventListener('loginscreen:open', self.onOpenBound);
    el.addEventListener('loginscreen:opened', self.onOpenedBound);
    el.addEventListener('loginscreen:close', self.onCloseBound);
    el.addEventListener('loginscreen:closed', self.onClosedBound);
    self.$f7ready(() => {
      self.f7LoginScreen = self.$f7.loginScreen.create({
        el
      });

      if (self.props.opened) {
        self.f7LoginScreen.open(false);
      }
    });
  },

  beforeDestroy() {
    const self = this;
    const el = self.$refs.el;
    if (self.f7LoginScreen) self.f7LoginScreen.destroy();
    if (!el) return;
    el.removeEventListener('loginscreen:open', self.onOpenBound);
    el.removeEventListener('loginscreen:opened', self.onOpenedBound);
    el.removeEventListener('loginscreen:close', self.onCloseBound);
    el.removeEventListener('loginscreen:closed', self.onClosedBound);
  },

  methods: {
    onOpen(event) {
      this.dispatchEvent('loginscreen:open loginScreenOpen', event);
    },

    onOpened(event) {
      this.dispatchEvent('loginscreen:opened loginScreenOpened', event);
    },

    onClose(event) {
      this.dispatchEvent('loginscreen:close loginScreenClose', event);
    },

    onClosed(event) {
      this.dispatchEvent('loginscreen:closed loginScreenClosed', event);
    },

    open(animate) {
      const self = this;
      const el = self.$refs.el;
      if (!self.$f7 || !el) return undefined;
      return self.$f7.loginScreen.open(el, animate);
    },

    close(animate) {
      const self = this;
      const el = self.$refs.el;
      if (!self.$f7 || !el) return undefined;
      return self.$f7.loginScreen.close(el, animate);
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