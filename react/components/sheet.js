import React from 'react';
import Mixins from '../utils/mixins';
import Utils from '../utils/utils';
import __reactComponentWatch from '../runtime-helpers/react-component-watch.js';
import __reactComponentEl from '../runtime-helpers/react-component-el.js';
import __reactComponentDispatchEvent from '../runtime-helpers/react-component-dispatch-event.js';
import __reactComponentSlots from '../runtime-helpers/react-component-slots.js';
import __reactComponentSetProps from '../runtime-helpers/react-component-set-props.js';
const SheetProps = Utils.extend({
  opened: Boolean,
  backdrop: Boolean
}, Mixins.colorProps);
class F7Sheet extends React.Component {
  constructor(props, context) {
    super(props, context);
  }
  render() {
    const self = this;
    const fixedList = [];
    const staticList = [];
    let fixedTags;
    fixedTags = 'Navbar Toolbar Tabbar Subnavbar Searchbar Messagebar Fab ListIndex'.split(' ').map(tagName => `F7${ tagName }`);
    const slotsDefault = self.slots.default;
    if (slotsDefault && slotsDefault.length) {
      slotsDefault.forEach(child => {
        let isFixedTag = false;
        {
          const tag = child.type && child.type.name;
          if (!tag) {
            return;
          }
          if (fixedTags.indexOf(tag) >= 0) {
            isFixedTag = true;
          }
        }
        if (isFixedTag)
          fixedList.push(child);
        else
          staticList.push(child);
      });
    }
    const innerEl = React.createElement('div', { className: 'sheet-modal-inner' }, staticList);
    return React.createElement('div', {
      ref: 'el',
      id: self.props.id,
      style: self.props.style,
      className: self.classes
    }, fixedList, innerEl);
  }
  get classes() {
    const self = this;
    return Utils.classNames(self.props.className, 'sheet-modal', Mixins.colorClasses(self));
  }
  componentWillUnmount() {
    const self = this;
    if (self.f7Sheet)
      self.f7Sheet.destroy();
    const el = self.el;
    if (!el)
      return;
    el.removeEventListener('popup:open', self.onOpenBound);
    el.removeEventListener('popup:opened', self.onOpenedBound);
    el.removeEventListener('popup:close', self.onCloseBound);
    el.removeEventListener('popup:closed', self.onClosedBound);
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
    el.addEventListener('sheet:open', self.onOpenBound);
    el.addEventListener('sheet:opened', self.onOpenedBound);
    el.addEventListener('sheet:close', self.onCloseBound);
    el.addEventListener('sheet:closed', self.onClosedBound);
    self.$f7ready(() => {
      let backdrop;
      let useDefaultBackdrop;
      useDefaultBackdrop = typeof self.props.backdrop === 'undefined';
      if (useDefaultBackdrop) {
        const app = self.$f7;
        backdrop = app.params.sheet && app.params.sheet.backdrop !== undefined ? app.params.sheet.backdrop : self.$theme.md;
      }
      self.f7Sheet = self.$f7.sheet.create({
        el: self.refs.el,
        backdrop
      });
      if (self.props.opened) {
        self.f7Sheet.open(false);
      }
    });
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
    if (!self.$f7)
      return undefined;
    return self.$f7.sheet.open(self.refs.el, animate);
  }
  close(animate) {
    const self = this;
    if (!self.$f7)
      return undefined;
    return self.$f7.sheet.close(self.refs.el, animate);
  }
  get slots() {
    return __reactComponentSlots(this);
  }
  get el() {
    return __reactComponentEl(this);
  }
  dispatchEvent(events, ...args) {
    return __reactComponentDispatchEvent(this, events, ...args);
  }
  componentDidUpdate(prevProps, prevState) {
    __reactComponentWatch(this, 'props.opened', prevProps, prevState, opened => {
      const self = this;
      if (!self.f7Sheet)
        return;
      if (opened) {
        self.f7Sheet.open();
      } else {
        self.f7Sheet.close();
      }
    });
  }
}
__reactComponentSetProps(F7Sheet, SheetProps);
export default F7Sheet;