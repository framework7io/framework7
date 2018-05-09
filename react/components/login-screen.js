import React from 'react';
import Mixins from '../utils/mixins';
import Utils from '../utils/utils';
import __reactComponentWatch from '../runtime-helpers/react-component-watch.js';
import __reactComponentSlots from '../runtime-helpers/react-component-slots.js';
import __reactComponentSetProps from '../runtime-helpers/react-component-set-props.js';
class F7LoginScreen extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.__reactRefs = {};
  }
  onOpen(event) {
    this.$emit('loginscreen:open loginScreenOpen', event);
  }
  onOpened(event) {
    this.$emit('loginscreen:opened loginScreenOpened', event);
  }
  onClose(event) {
    this.$emit('loginscreen:close loginScreenClose', event);
  }
  onClosed(event) {
    this.$emit('loginscreen:closed loginScreenClosed', event);
  }
  open(animate) {
    const self = this;
    const el = self.refs.el;
    if (!self.$f7 || !el)
      return undefined;
    return self.$f7.loginScreen.open(el, animate);
  }
  close(animate) {
    const self = this;
    const el = self.refs.el;
    if (!self.$f7 || !el)
      return undefined;
    return self.$f7.loginScreen.close(el, animate);
  }
  get classes() {
    const self = this;
    return Utils.classNames(self.props.className, 'login-screen', Mixins.colorClasses(self));
  }
  render() {
    const self = this;
    return React.createElement('div', {
      ref: __reactNode => {
        this.__reactRefs['el'] = __reactNode;
      },
      id: self.props.id,
      style: self.props.style,
      className: self.classes
    }, this.slots['default']);
  }
  componentWillUnmount() {
    const self = this;
    const el = self.refs.el;
    if (self.f7LoginScreen)
      self.f7LoginScreen.destroy();
    if (!el)
      return;
    el.removeEventListener('loginscreen:open', self.onOpenBound);
    el.removeEventListener('loginscreen:opened', self.onOpenedBound);
    el.removeEventListener('loginscreen:close', self.onCloseBound);
    el.removeEventListener('loginscreen:closed', self.onClosedBound);
  }
  componentDidMount() {
    const self = this;
    const el = self.refs.el;
    if (!el)
      return;
    self.onOpenBound = self.onOpen.bind(self);
    self.onOpenedBound = self.onOpened.bind(self);
    self.onCloseBound = self.onClose.bind(self);
    self.onClosedBound = self.onClosed.bind(self);
    el.addEventListener('loginscreen:open', self.onOpenBound);
    el.addEventListener('loginscreen:opened', self.onOpenedBound);
    el.addEventListener('loginscreen:close', self.onCloseBound);
    el.addEventListener('loginscreen:closed', self.onClosedBound);
    self.$f7ready(() => {
      self.f7LoginScreen = self.$f7.loginScreen.create({ el });
      if (self.props.opened) {
        self.f7LoginScreen.open(false);
      }
    });
  }
  get slots() {
    return __reactComponentSlots(this.props);
  }
  get refs() {
    return this.__reactRefs;
  }
  set refs(refs) {
  }
  componentDidUpdate(prevProps, prevState) {
    __reactComponentWatch(this, 'props.opened', prevProps, prevState, opened => {
      const self = this;
      if (!self.f7LoginScreen)
        return;
      if (opened) {
        self.f7LoginScreen.open();
      } else {
        self.f7LoginScreen.close();
      }
    });
  }
}
__reactComponentSetProps(F7LoginScreen, {
  id: [
    String,
    Number
  ],
  opened: Boolean,
  ...Mixins.colorProps
});
export default F7LoginScreen;