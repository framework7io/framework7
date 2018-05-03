import Mixins from '../utils/mixins';
import Utils from '../utils/utils';

export default {
  name: 'f7-login-screen',
  props: {
    opened: Boolean,
    ...Mixins.colorProps,
  },
  render() {
    const self = this;
    return (
      <div
        ref="el"
        id={self.props.id}
        style={self.props.style}
        className={self.classes}
      >
        <slot />
      </div>
    );
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
    },
  },
  computed: {
    classes() {
      const self = this;
      return Utils.classNames(
        self.props.className,
        'login-screen',
        Mixins.colorClasses(self),
      );
    },
  },
  componentDidMount() {
    const self = this;

    const el = self.refs.el;
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
        el,
      });
      if (self.props.opened) {
        self.f7LoginScreen.open(false);
      }
    });
  },
  componentWillUnmount() {
    const self = this;
    const el = self.refs.el;
    if (self.f7LoginScreen) self.f7LoginScreen.destroy();
    if (!el) return;
    el.removeEventListener('loginscreen:open', self.onOpenBound);
    el.removeEventListener('loginscreen:opened', self.onOpenedBound);
    el.removeEventListener('loginscreen:close', self.onCloseBound);
    el.removeEventListener('loginscreen:closed', self.onClosedBound);
  },
  methods: {
    onOpen(event) {
      this.$emit('loginscreen:open loginScreenOpen', event);
    },
    onOpened(event) {
      this.$emit('loginscreen:opened loginScreenOpened', event);
    },
    onClose(event) {
      this.$emit('loginscreen:close loginScreenClose', event);
    },
    onClosed(event) {
      this.$emit('loginscreen:closed loginScreenClosed', event);
    },
    open(animate) {
      const self = this;
      if (!self.$f7) return undefined;
      return self.$f7.loginScreen.open(self.$el, animate);
    },
    close(animate) {
      const self = this;
      if (!self.$f7) return undefined;
      return self.$f7.loginScreen.close(self.$el, animate);
    },
  },
};
