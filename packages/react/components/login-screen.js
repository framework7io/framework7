import React from 'react';
import Mixins from '../utils/mixins';
import Utils from '../utils/utils';
import __reactComponentWatch from '../runtime-helpers/react-component-watch.js';
import __reactComponentDispatchEvent from '../runtime-helpers/react-component-dispatch-event.js';
import __reactComponentSlots from '../runtime-helpers/react-component-slots.js';
import __reactComponentSetProps from '../runtime-helpers/react-component-set-props.js';

class F7LoginScreen extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.__reactRefs = {};

    (() => {
      Utils.bindMethods(this, ['onOpen', 'onOpened', 'onClose', 'onClosed']);
    })();
  }

  onOpen(instance) {
    this.dispatchEvent('loginscreen:open loginScreenOpen', instance);
  }

  onOpened(instance) {
    this.dispatchEvent('loginscreen:opened loginScreenOpened', instance);
  }

  onClose(instance) {
    this.dispatchEvent('loginscreen:close loginScreenClose', instance);
  }

  onClosed(instance) {
    this.dispatchEvent('loginscreen:closed loginScreenClosed', instance);
  }

  open(animate) {
    const self = this;
    if (!self.f7LoginScreen) return undefined;
    return self.f7LoginScreen.open(animate);
  }

  close(animate) {
    const self = this;
    if (!self.f7LoginScreen) return undefined;
    return self.f7LoginScreen.close(animate);
  }

  render() {
    const self = this;
    const props = self.props;
    const {
      className,
      id,
      style
    } = props;
    const classes = Utils.classNames(className, 'login-screen', Mixins.colorClasses(props));
    return React.createElement('div', {
      ref: __reactNode => {
        this.__reactRefs['el'] = __reactNode;
      },
      id: id,
      style: style,
      className: classes
    }, this.slots['default']);
  }

  componentWillUnmount() {
    const self = this;
    if (self.f7LoginScreen) self.f7LoginScreen.destroy();
  }

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
          closed: self.onClosed
        }
      });

      if (self.props.opened) {
        self.f7LoginScreen.open(false);
      }
    });
  }

  get slots() {
    return __reactComponentSlots(this.props);
  }

  dispatchEvent(events, ...args) {
    return __reactComponentDispatchEvent(this, events, ...args);
  }

  get refs() {
    return this.__reactRefs;
  }

  set refs(refs) {}

  componentDidUpdate(prevProps, prevState) {
    __reactComponentWatch(this, 'props.opened', prevProps, prevState, opened => {
      const self = this;
      if (!self.f7LoginScreen) return;

      if (opened) {
        self.f7LoginScreen.open();
      } else {
        self.f7LoginScreen.close();
      }
    });
  }

}

__reactComponentSetProps(F7LoginScreen, Object.assign({
  id: [String, Number],
  className: String,
  style: Object,
  opened: Boolean
}, Mixins.colorProps));

F7LoginScreen.displayName = 'f7-login-screen';
export default F7LoginScreen;