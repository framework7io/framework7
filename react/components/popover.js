import React from 'react';
import Mixins from '../utils/mixins';
import Utils from '../utils/utils';
import __reactComponentWatch from '../runtime-helpers/react-component-watch.js';
import __reactComponentDispatchEvent from '../runtime-helpers/react-component-dispatch-event.js';
import __reactComponentSlots from '../runtime-helpers/react-component-slots.js';
import __reactComponentSetProps from '../runtime-helpers/react-component-set-props.js';
class F7Popover extends React.Component {
  constructor(props, context) {
    super(props, context);
  }
  onOpen(event) {
    this.dispatchEvent('popover:open popoverOpen', event);
  }
  onOpened(event) {
    this.dispatchEvent('popover:opened popoverOpened', event);
  }
  onClose(event) {
    this.dispatchEvent('popover:close popoverClose', event);
  }
  onClosed(event) {
    this.dispatchEvent('popover:closed popoverClosed', event);
  }
  open(target, animate) {
    const self = this;
    if (!self.$f7)
      return undefined;
    return self.$f7.popover.open(self.refs.el, target, animate);
  }
  close(animate) {
    const self = this;
    if (!self.$f7)
      return undefined;
    return self.$f7.sheet.close(self.refs.el, animate);
  }
  componentWillUnmount() {
    const self = this;
    if (self.f7Popover)
      self.f7Popover.destroy();
    const el = self.refs.el;
    if (!el)
      return;
    el.removeEventListener('popover:open', self.onOpenBound);
    el.removeEventListener('popover:opened', self.onOpenedBound);
    el.removeEventListener('popover:close', self.onCloseBound);
    el.removeEventListener('popover:closed', self.onClosedBound);
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
    el.addEventListener('popover:open', self.onOpenBound);
    el.addEventListener('popover:opened', self.onOpenedBound);
    el.addEventListener('popover:close', self.onCloseBound);
    el.addEventListener('popover:closed', self.onClosedBound);
    self.$f7ready(() => {
      const popoverParams = { el };
      if (self.props.target)
        popoverParams.targetEl = self.props.target;
      self.f7Popover = self.$f7.popover.create(popoverParams);
      if (self.props.opened && self.props.target) {
        self.f7Popover.open(self.props.target, false);
      }
    });
  }
  get classes() {
    const self = this;
    return Utils.classNames(self.props.className, 'popover', Mixins.colorClasses(self));
  }
  render() {
    const self = this;
    return React.createElement('div', {
      ref: 'el',
      id: self.props.id,
      style: self.props.style,
      className: self.classes
    }, React.createElement('div', { className: 'popover-angle' }), React.createElement('div', { className: 'popover-inner' }, this.slots['default']));
  }
  get slots() {
    return __reactComponentSlots(this.props);
  }
  dispatchEvent(events, ...args) {
    return __reactComponentDispatchEvent(this, events, ...args);
  }
  componentDidUpdate(prevProps, prevState) {
    __reactComponentWatch(this, 'props.opened', prevProps, prevState, opened => {
      const self = this;
      if (!self.f7Popover)
        return;
      if (opened) {
        self.f7Popover.open();
      } else {
        self.f7Popover.close();
      }
    });
  }
}
__reactComponentSetProps(F7Popover, {
  id: [
    String,
    Number
  ],
  opened: Boolean,
  target: [
    String,
    Object
  ],
  ...Mixins.colorProps
});
export default F7Popover;