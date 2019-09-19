import React from 'react';
import Mixins from '../utils/mixins';
import Utils from '../utils/utils';
import __reactComponentWatch from '../runtime-helpers/react-component-watch.js';
import __reactComponentDispatchEvent from '../runtime-helpers/react-component-dispatch-event.js';
import __reactComponentSlots from '../runtime-helpers/react-component-slots.js';
import __reactComponentSetProps from '../runtime-helpers/react-component-set-props.js';

class F7Actions extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.__reactRefs = {};

    (() => {
      Utils.bindMethods(this, ['onOpen', 'onOpened', 'onClose', 'onClosed']);
    })();
  }

  onOpen(instance) {
    this.dispatchEvent('actions:open actionsOpen', instance);
  }

  onOpened(instance) {
    this.dispatchEvent('actions:opened actionsOpened', instance);
  }

  onClose(instance) {
    this.dispatchEvent('actions:close actionsClose', instance);
  }

  onClosed(instance) {
    this.dispatchEvent('actions:closed actionsClosed', instance);
  }

  open(animate) {
    const self = this;
    if (!self.f7Actions) return undefined;
    return self.f7Actions.open(animate);
  }

  close(animate) {
    const self = this;
    if (!self.f7Actions) return undefined;
    return self.f7Actions.close(animate);
  }

  render() {
    const self = this;
    const props = self.props;
    const {
      className,
      id,
      style,
      grid
    } = props;
    const classes = Utils.classNames(className, 'actions-modal', {
      'actions-grid': grid
    }, Mixins.colorClasses(props));
    return React.createElement('div', {
      id: id,
      style: style,
      ref: __reactNode => {
        this.__reactRefs['el'] = __reactNode;
      },
      className: classes
    }, this.slots['default']);
  }

  componentWillUnmount() {
    const self = this;
    if (self.f7Actions) self.f7Actions.destroy();
    delete self.f7Actions;
  }

  componentDidMount() {
    const self = this;
    const el = self.refs.el;
    if (!el) return;
    const props = self.props;
    const {
      grid,
      target,
      convertToPopover,
      forceToPopover,
      opened,
      closeByBackdropClick,
      closeByOutsideClick,
      closeOnEscape,
      backdrop,
      backdropEl
    } = props;
    const actionsParams = {
      el,
      grid,
      on: {
        open: self.onOpen,
        opened: self.onOpened,
        close: self.onClose,
        closed: self.onClosed
      }
    };
    if (target) actionsParams.targetEl = target;
    {
      if ('convertToPopover' in props) actionsParams.convertToPopover = convertToPopover;
      if ('forceToPopover' in props) actionsParams.forceToPopover = forceToPopover;
      if ('backdrop' in props) actionsParams.backdrop = backdrop;
      if ('backdropEl' in props) actionsParams.backdropEl = backdropEl;
      if ('closeByBackdropClick' in props) actionsParams.closeByBackdropClick = closeByBackdropClick;
      if ('closeByOutsideClick' in props) actionsParams.closeByOutsideClick = closeByOutsideClick;
      if ('closeOnEscape' in props) actionsParams.closeOnEscape = closeOnEscape;
    }
    self.$f7ready(() => {
      self.f7Actions = self.$f7.actions.create(actionsParams);

      if (opened) {
        self.f7Actions.open(false);
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
      if (!self.f7Actions) return;

      if (opened) {
        self.f7Actions.open();
      } else {
        self.f7Actions.close();
      }
    });
  }

}

__reactComponentSetProps(F7Actions, Object.assign({
  id: [String, Number],
  className: String,
  style: Object,
  opened: Boolean,
  grid: Boolean,
  convertToPopover: Boolean,
  forceToPopover: Boolean,
  target: [String, Object],
  backdrop: Boolean,
  backdropEl: [String, Object, window.HTMLElement],
  closeByBackdropClick: Boolean,
  closeByOutsideClick: Boolean,
  closeOnEscape: Boolean
}, Mixins.colorProps));

F7Actions.displayName = 'f7-actions';
export default F7Actions;