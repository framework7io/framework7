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
    this.__reactRefs = {};

    (() => {
      Utils.bindMethods(this, ['onOpen', 'onOpened', 'onClose', 'onClosed']);
    })();
  }

  onOpen(instance) {
    this.dispatchEvent('popover:open popoverOpen', instance);
  }

  onOpened(instance) {
    this.dispatchEvent('popover:opened popoverOpened', instance);
  }

  onClose(instance) {
    this.dispatchEvent('popover:close popoverClose', instance);
  }

  onClosed(instance) {
    this.dispatchEvent('popover:closed popoverClosed', instance);
  }

  open(animate) {
    const self = this;
    if (!self.f7Popover) return undefined;
    return self.f7Popover.open(animate);
  }

  close(animate) {
    const self = this;
    if (!self.f7Popover) return undefined;
    return self.f7Popover.close(animate);
  }

  render() {
    const self = this;
    const props = self.props;
    const {
      className,
      id,
      style
    } = props;
    const classes = Utils.classNames(className, 'popover', Mixins.colorClasses(props));
    return React.createElement('div', {
      ref: __reactNode => {
        this.__reactRefs['el'] = __reactNode;
      },
      id: id,
      style: style,
      className: classes
    }, React.createElement('div', {
      className: 'popover-angle'
    }), React.createElement('div', {
      className: 'popover-inner'
    }, this.slots['default']));
  }

  componentWillUnmount() {
    const self = this;
    if (self.f7Popover) self.f7Popover.destroy();
  }

  componentDidMount() {
    const self = this;
    const el = self.refs.el;
    if (!el) return;
    const props = self.props;
    const {
      target,
      opened,
      backdrop,
      backdropEl,
      closeByBackdropClick,
      closeByOutsideClick,
      closeOnEscape
    } = props;
    const popoverParams = {
      el,
      on: {
        open: self.onOpen,
        opened: self.onOpened,
        close: self.onClose,
        closed: self.onClosed
      }
    };
    if (target) popoverParams.targetEl = target;
    {
      if ('closeByBackdropClick' in props) popoverParams.closeByBackdropClick = closeByBackdropClick;
      if ('closeByOutsideClick' in props) popoverParams.closeByOutsideClick = closeByOutsideClick;
      if ('closeOnEscape' in props) popoverParams.closeOnEscape = closeOnEscape;
      if ('backdrop' in props) popoverParams.backdrop = backdrop;
      if ('backdropEl' in props) popoverParams.backdropEl = backdropEl;
    }
    self.$f7ready(() => {
      self.f7Popover = self.$f7.popover.create(popoverParams);

      if (opened && target) {
        self.f7Popover.open(target, false);
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
      if (!self.f7Popover) return;

      if (opened) {
        self.f7Popover.open();
      } else {
        self.f7Popover.close();
      }
    });
  }

}

__reactComponentSetProps(F7Popover, Object.assign({
  id: [String, Number],
  className: String,
  style: Object,
  opened: Boolean,
  target: [String, Object],
  backdrop: Boolean,
  backdropEl: [String, Object, window.HTMLElement],
  closeByBackdropClick: Boolean,
  closeByOutsideClick: Boolean,
  closeOnEscape: Boolean
}, Mixins.colorProps));

F7Popover.displayName = 'f7-popover';
export default F7Popover;