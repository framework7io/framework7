import React from 'react';
import Mixins from '../utils/mixins';
import Utils from '../utils/utils';
import __reactComponentWatch from '../runtime-helpers/react-component-watch.js';
import __reactComponentDispatchEvent from '../runtime-helpers/react-component-dispatch-event.js';
import __reactComponentSlots from '../runtime-helpers/react-component-slots.js';
import __reactComponentSetProps from '../runtime-helpers/react-component-set-props.js';

class F7Popup extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.__reactRefs = {};

    (() => {
      Utils.bindMethods(this, ['onOpen', 'onOpened', 'onClose', 'onClosed']);
    })();
  }

  onOpen(instance) {
    this.dispatchEvent('popup:open popupOpen', instance);
  }

  onOpened(instance) {
    this.dispatchEvent('popup:opened popupOpened', instance);
  }

  onClose(instance) {
    this.dispatchEvent('popup:close popupClose', instance);
  }

  onClosed(instance) {
    this.dispatchEvent('popup:closed popupClosed', instance);
  }

  open(animate) {
    const self = this;
    if (!self.f7Popup) return undefined;
    return self.f7Popup.open(animate);
  }

  close(animate) {
    const self = this;
    if (!self.f7Popup) return undefined;
    return self.f7Popup.close(animate);
  }

  render() {
    const self = this;
    const props = self.props;
    const {
      className,
      id,
      style,
      tabletFullscreen,
      push
    } = props;
    const classes = Utils.classNames(className, 'popup', {
      'popup-tablet-fullscreen': tabletFullscreen,
      'popup-push': push
    }, Mixins.colorClasses(props));
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
    if (self.f7Popup) self.f7Popup.destroy();
  }

  componentDidMount() {
    const self = this;
    const el = self.refs.el;
    if (!el) return;
    const props = self.props;
    const {
      closeByBackdropClick,
      backdrop,
      backdropEl,
      animate,
      closeOnEscape,
      swipeToClose,
      swipeHandler
    } = props;
    const popupParams = {
      el,
      on: {
        open: self.onOpen,
        opened: self.onOpened,
        close: self.onClose,
        closed: self.onClosed
      }
    };
    {
      if ('closeByBackdropClick' in props) popupParams.closeByBackdropClick = closeByBackdropClick;
      if ('closeOnEscape' in props) popupParams.closeOnEscape = closeOnEscape;
      if ('animate' in props) popupParams.animate = animate;
      if ('backdrop' in props) popupParams.backdrop = backdrop;
      if ('backdropEl' in props) popupParams.backdropEl = backdropEl;
      if ('swipeToClose' in props) popupParams.swipeToClose = swipeToClose;
      if ('swipeHandler' in props) popupParams.swipeHandler = swipeHandler;
    }
    self.$f7ready(() => {
      self.f7Popup = self.$f7.popup.create(popupParams);

      if (self.props.opened) {
        self.f7Popup.open(false);
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
      if (!self.f7Popup) return;

      if (opened) {
        self.f7Popup.open();
      } else {
        self.f7Popup.close();
      }
    });
  }

}

__reactComponentSetProps(F7Popup, Object.assign({
  id: [String, Number],
  className: String,
  style: Object,
  tabletFullscreen: Boolean,
  opened: Boolean,
  animate: Boolean,
  backdrop: Boolean,
  backdropEl: [String, Object, window.HTMLElement],
  closeByBackdropClick: Boolean,
  closeOnEscape: Boolean,
  swipeToClose: {
    type: [Boolean, String],
    default: false
  },
  swipeHandler: [String, Object, window.HTMLElement],
  push: Boolean
}, Mixins.colorProps));

F7Popup.displayName = 'f7-popup';
export default F7Popup;