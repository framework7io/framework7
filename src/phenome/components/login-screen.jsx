import Mixins from '../utils/mixins';
import Utils from '../utils/utils';

/* phenome-dts-imports
import { LoginScreen as LoginScreenNamespace } from 'framework7/components/login-screen/login-screen';
*/

/* phenome-dts-instance
f7LoginScreen: LoginScreenNamespace.LoginScreen
*/

export default {
  name: 'f7-login-screen',
  props: {
    id: [String, Number],
    className: String, // phenome-react-line
    style: Object, // phenome-react-line
    opened: Boolean,
    ...Mixins.colorProps,
  },
  render() {
    const self = this;
    const props = self.props;
    const {
      className,
      id,
      style,
    } = props;

    const classes = Utils.classNames(
      className,
      'login-screen',
      Mixins.colorClasses(props),
    );

    return (
      <div
        ref="el"
        id={id}
        style={style}
        className={classes}
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
  componentDidCreate() {
    Utils.bindMethods(this, [
      'onOpen',
      'onOpened',
      'onClose',
      'onClosed',
    ]);
  },
  componentDidMount() {
    const self = this;

    const el = self.refs.el;
    if (!el) return;
    el.addEventListener('loginscreen:open', self.onOpen);
    el.addEventListener('loginscreen:opened', self.onOpened);
    el.addEventListener('loginscreen:close', self.onClose);
    el.addEventListener('loginscreen:closed', self.onClosed);

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
    el.removeEventListener('loginscreen:open', self.onOpen);
    el.removeEventListener('loginscreen:opened', self.onOpened);
    el.removeEventListener('loginscreen:close', self.onClose);
    el.removeEventListener('loginscreen:closed', self.onClosed);
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
      const el = self.refs.el;
      if (!self.$f7 || !el) return undefined;
      return self.$f7.loginScreen.open(el, animate);
    },
    close(animate) {
      const self = this;
      const el = self.refs.el;
      if (!self.$f7 || !el) return undefined;
      return self.$f7.loginScreen.close(el, animate);
    },
  },
};
