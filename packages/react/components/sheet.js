import React from 'react';
import Mixins from '../utils/mixins';
import Utils from '../utils/utils';
import __reactComponentWatch from '../runtime-helpers/react-component-watch.js';
import __reactComponentDispatchEvent from '../runtime-helpers/react-component-dispatch-event.js';
import __reactComponentSlots from '../runtime-helpers/react-component-slots.js';
import __reactComponentSetProps from '../runtime-helpers/react-component-set-props.js';

class F7Sheet extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.__reactRefs = {};

    (() => {
      Utils.bindMethods(this, ['onOpen', 'onOpened', 'onClose', 'onClosed', 'onStepOpen', 'onStepClose', 'onStepProgress']);
    })();
  }

  onStepProgress(event) {
    this.dispatchEvent('sheet:stepprogress sheetStepProgress', event.detail);
  }

  onStepOpen(event) {
    this.dispatchEvent('sheet:stepopen sheetStepOpen', event);
  }

  onStepClose(event) {
    this.dispatchEvent('sheet:stepclose sheetStepClose', event);
  }

  onOpen(event) {
    this.dispatchEvent('sheet:open sheetOpen', event);
  }

  onOpened(event) {
    this.dispatchEvent('sheet:opened sheetOpened', event);
  }

  onClose(event) {
    this.dispatchEvent('sheet:close sheetClose', event);
  }

  onClosed(event) {
    this.dispatchEvent('sheet:closed sheetClosed', event);
  }

  open(animate) {
    const self = this;
    if (!self.$f7) return undefined;
    return self.$f7.sheet.open(self.refs.el, animate);
  }

  close(animate) {
    const self = this;
    if (!self.$f7) return undefined;
    return self.$f7.sheet.close(self.refs.el, animate);
  }

  render() {
    const self = this;
    const fixedList = [];
    const staticList = [];
    const props = self.props;
    const {
      id,
      style,
      className,
      top,
      bottom,
      position
    } = props;
    let fixedTags;
    fixedTags = 'navbar toolbar tabbar subnavbar searchbar messagebar fab list-index'.split(' ').map(tagName => `f7-${tagName}`);
    const slotsDefault = self.slots.default;

    if (slotsDefault && slotsDefault.length) {
      slotsDefault.forEach(child => {
        if (typeof child === 'undefined') return;
        let isFixedTag = false;
        {
          const tag = child.type && (child.type.displayName || child.type.name);

          if (!tag) {
            staticList.push(child);
            return;
          }

          if (fixedTags.indexOf(tag) >= 0) {
            isFixedTag = true;
          }
        }
        if (isFixedTag) fixedList.push(child);else staticList.push(child);
      });
    }

    const innerEl = React.createElement('div', {
      className: 'sheet-modal-inner'
    }, staticList);
    let positionComputed = 'bottom';
    if (position) positionComputed = position;else if (top) positionComputed = 'top';else if (bottom) positionComputed = 'bottom';
    const classes = Utils.classNames(className, 'sheet-modal', `sheet-modal-${positionComputed}`, Mixins.colorClasses(props));
    return React.createElement('div', {
      ref: __reactNode => {
        this.__reactRefs['el'] = __reactNode;
      },
      id: id,
      style: style,
      className: classes
    }, fixedList, innerEl);
  }

  componentWillUnmount() {
    const self = this;
    if (self.f7Sheet) self.f7Sheet.destroy();
    const el = self.refs.el;
    if (!el) return;
    el.removeEventListener('sheet:open', self.onOpen);
    el.removeEventListener('sheet:opened', self.onOpened);
    el.removeEventListener('sheet:close', self.onClose);
    el.removeEventListener('sheet:closed', self.onClosed);
    el.removeEventListener('sheet:stepopen', self.onStepOpen);
    el.removeEventListener('sheet:stepclose', self.onStepClose);
    el.removeEventListener('sheet:stepprogress', self.onStepProgress);
  }

  componentDidMount() {
    const self = this;
    const el = self.refs.el;
    if (!el) return;
    el.addEventListener('sheet:open', self.onOpen);
    el.addEventListener('sheet:opened', self.onOpened);
    el.addEventListener('sheet:close', self.onClose);
    el.addEventListener('sheet:closed', self.onClosed);
    el.addEventListener('sheet:stepopen', self.onStepOpen);
    el.addEventListener('sheet:stepclose', self.onStepClose);
    el.addEventListener('sheet:stepprogress', self.onStepProgress);
    const props = self.props;
    const {
      opened,
      backdrop,
      backdropEl,
      closeByBackdropClick,
      closeByOutsideClick,
      closeOnEscape,
      swipeToClose,
      swipeToStep,
      swipeHandler
    } = props;
    const sheetParams = {
      el: self.refs.el
    };
    {
      if ('backdrop' in props && typeof backdrop !== 'undefined') sheetParams.backdrop = backdrop;
      if ('backdropEl' in props) sheetParams.backdropEl = backdropEl;
      if ('closeByBackdropClick' in props) sheetParams.closeByBackdropClick = closeByBackdropClick;
      if ('closeByOutsideClick' in props) sheetParams.closeByOutsideClick = closeByOutsideClick;
      if ('closeOnEscape' in props) sheetParams.closeOnEscape = closeOnEscape;
      if ('swipeToClose' in props) sheetParams.swipeToClose = swipeToClose;
      if ('swipeToStep' in props) sheetParams.swipeToStep = swipeToStep;
      if ('swipeHandler' in props) sheetParams.swipeHandler = swipeHandler;
    }
    self.$f7ready(() => {
      self.f7Sheet = self.$f7.sheet.create(sheetParams);

      if (opened) {
        self.f7Sheet.open(false);
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
      if (!self.f7Sheet) return;

      if (opened) {
        self.f7Sheet.open();
      } else {
        self.f7Sheet.close();
      }
    });
  }

}

__reactComponentSetProps(F7Sheet, Object.assign({
  id: [String, Number],
  className: String,
  style: Object,
  opened: Boolean,
  top: Boolean,
  bottom: Boolean,
  position: String,
  backdrop: Boolean,
  backdropEl: [String, Object, window.HTMLElement],
  closeByBackdropClick: Boolean,
  closeByOutsideClick: Boolean,
  closeOnEscape: Boolean,
  swipeToClose: Boolean,
  swipeToStep: Boolean,
  swipeHandler: [String, Object, window.HTMLElement]
}, Mixins.colorProps));

F7Sheet.displayName = 'f7-sheet';
export default F7Sheet;