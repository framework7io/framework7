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
    self.$f7ready(() => {
      self.f7LoginScreen = self.$f7.loginScreen.create({
        el,
        on: {
          open: self.onOpen,
          opened: self.onOpened,
          close: self.onClose,
          closed: self.onClosed,
        },
      });
      if (self.props.opened) {
        self.f7LoginScreen.open(false);
      }
    });
  },
  componentWillUnmount() {
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
  },
};
