import React from 'react';
import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import F7Input from './input';
import F7Link from './link';
import __reactComponentWatch from '../runtime-helpers/react-component-watch.js';
import __reactComponentDispatchEvent from '../runtime-helpers/react-component-dispatch-event.js';
import __reactComponentSlots from '../runtime-helpers/react-component-slots.js';
import __reactComponentSetProps from '../runtime-helpers/react-component-set-props.js';
class F7Messagebar extends React.Component {
  constructor(props, context) {
    super(props, context);
    (() => {
      this.onChangeBound = this.onChange.bind(this);
      this.onInputBound = this.onInput.bind(this);
      this.onFocusBound = this.onFocus.bind(this);
      this.onBlurBound = this.onBlur.bind(this);
      this.onClickBound = this.onClick.bind(this);
      this.onDeleteAttachmentBound = this.onDeleteAttachment.bind(this);
      this.onClickAttachmentBound = this.onClickAttachment.bind(this);
      this.onResizePageBound = this.onResizePage.bind(this);
    })();
  }
  clear(...args) {
    if (!this.f7Messagebar)
      return undefined;
    return this.f7Messagebar.clear(...args);
  }
  getValue(...args) {
    if (!this.f7Messagebar)
      return undefined;
    return this.f7Messagebar.getValue(...args);
  }
  setValue(...args) {
    if (!this.f7Messagebar)
      return undefined;
    return this.f7Messagebar.setValue(...args);
  }
  setPlaceholder(...args) {
    if (!this.f7Messagebar)
      return undefined;
    return this.f7Messagebar.setPlaceholder(...args);
  }
  resizePage(...args) {
    if (!this.f7Messagebar)
      return undefined;
    return this.f7Messagebar.resizePage(...args);
  }
  focus(...args) {
    if (!this.f7Messagebar)
      return undefined;
    return this.f7Messagebar.focus(...args);
  }
  blur(...args) {
    if (!this.f7Messagebar)
      return undefined;
    return this.f7Messagebar.blur(...args);
  }
  attachmentsShow(...args) {
    if (!this.f7Messagebar)
      return undefined;
    return this.f7Messagebar.attachmentsShow(...args);
  }
  attachmentsHide(...args) {
    if (!this.f7Messagebar)
      return undefined;
    return this.f7Messagebar.attachmentsHide(...args);
  }
  attachmentsToggle(...args) {
    if (!this.f7Messagebar)
      return undefined;
    return this.f7Messagebar.attachmentsToggle(...args);
  }
  sheetShow(...args) {
    if (!this.f7Messagebar)
      return undefined;
    return this.f7Messagebar.sheetShow(...args);
  }
  sheetHide(...args) {
    if (!this.f7Messagebar)
      return undefined;
    return this.f7Messagebar.sheetHide(...args);
  }
  sheetToggle(...args) {
    if (!this.f7Messagebar)
      return undefined;
    return this.f7Messagebar.sheetToggle(...args);
  }
  onChange(event) {
    this.dispatchEvent('change', event);
  }
  onInput(event) {
    this.dispatchEvent('input', event);
  }
  onFocus(event) {
    this.dispatchEvent('focus', event);
  }
  onBlur(event) {
    this.dispatchEvent('blur', event);
  }
  onClick(event) {
    const self = this;
    const value = self.refs.area.refs.inputEl.value;
    const clear = self.f7Messagebar ? self.f7Messagebar.clear : () => {
    };
    this.dispatchEvent('submit', value, clear);
    this.dispatchEvent('send', value, clear);
    this.dispatchEvent('click', event);
  }
  onDeleteAttachment(e) {
    this.dispatchEvent('messagebar:attachmentdelete messagebarAttachmentDelete', e);
  }
  onClickAttachment(e) {
    this.dispatchEvent('messagebar:attachmentclick messagebarAttachmentClick', e);
  }
  onResizePage(e) {
    this.dispatchEvent('messagebar:resizepage messagebarResizePage', e);
  }
  componentWillUnmount() {
    const self = this;
    if (self.f7Messagebar && self.f7Messagebar.destroy)
      self.f7Messagebar.destroy();
    const el = self.refs.el;
    if (!el)
      return;
    el.removeEventListener('messagebar:attachmentdelete', self.onDeleteAttachmentBound);
    el.removeEventListener('messagebar:attachmentclick', self.onClickAttachmentBound);
    el.removeEventListener('messagebar:resizepage', self.onResizePageBound);
  }
  componentDidUpdate() {
    const self = this;
    if (!self.f7Messagebar)
      return;
    if (self.updateSheetVisible) {
      self.updateSheetVisible = false;
      self.f7Messagebar.sheetVisible = self.props.sheetVisible;
      self.f7Messagebar.resizePage();
    }
    if (self.updateAttachmentsVisible) {
      self.updateAttachmentsVisible = false;
      self.f7Messagebar.attachmentsVisible = self.props.attachmentsVisible;
      self.f7Messagebar.resizePage();
    }
  }
  componentDidMount() {
    const self = this;
    const {init, top, resizePage, bottomOffset, topOffset, maxHeight} = self.props;
    if (!init)
      return;
    const el = self.refs.el;
    if (!el)
      return;
    el.addEventListener('messagebar:attachmentdelete', self.onDeleteAttachmentBound);
    el.addEventListener('messagebar:attachmentclick', self.onClickAttachmentBound);
    el.addEventListener('messagebar:resizepage', self.onResizePageBound);
    self.$f7ready(() => {
      self.f7Messagebar = self.$f7.messagebar.create({
        el,
        top,
        resizePage,
        bottomOffset,
        topOffset,
        maxHeight
      });
    });
  }
  get classes() {
    const self = this;
    const {className, attachmentsVisible, sheetVisible} = self.props;
    return Utils.classNames(className, 'toolbar', 'messagebar', {
      'messagebar-attachments-visible': attachmentsVisible,
      'messagebar-sheet-visible': sheetVisible
    }, Mixins.colorClasses(self));
  }
  render() {
    const self = this;
    const {placeholder, disabled, name, readonly, resizable, value, sendLink, id, style} = self.props;
    const {
      default: slotsDefault,
      'before-inner': slotsBeforeInner,
      'after-inner': slotsAfterInner,
      'send-link': slotsSendLink,
      'inner-start': slotsInnerStart,
      'inner-end': slotsInnerEnd,
      'before-area': slotsBeforeArea,
      'after-area': slotsAfterArea
    } = self.slots;
    const innerEndEls = [];
    let messagebarAttachmentsEl;
    let messagebarSheetEl;
    if (slotsDefault) {
      slotsDefault.forEach(child => {
        let tag;
        tag = child.type && child.type.name;
        if (tag && (tag.indexOf('messagebar-attachments') >= 0 || tag === 'F7MessagebarAttachments')) {
          messagebarAttachmentsEl = child;
        } else if (tag && (tag.indexOf('messagebar-sheet') >= 0 || tag === 'F7MessagebarSheet')) {
          messagebarSheetEl = child;
        } else {
          innerEndEls.push(child);
        }
      });
    }
    return React.createElement('div', {
      ref: 'el',
      id: id,
      style: style,
      className: self.classes
    }, slotsBeforeInner, React.createElement('div', { className: 'toolbar-inner' }, slotsInnerStart, React.createElement('div', { className: 'messagebar-area' }, slotsBeforeArea, messagebarAttachmentsEl, React.createElement(F7Input, {
      ref: 'area',
      type: 'textarea',
      wrap: false,
      placeholder: placeholder,
      disabled: disabled,
      name: name,
      readonly: readonly,
      resizable: resizable,
      value: value,
      onInput: self.onInputBound,
      onChange: self.onChangeBound,
      onFocus: self.onFocusBound,
      onBlur: self.onBlurBound
    }), slotsAfterArea), (sendLink && sendLink.length > 0 || slotsSendLink) && React.createElement(F7Link, { onClick: self.onClickBound }, slotsSendLink || sendLink), slotsInnerEnd, innerEndEls), slotsAfterInner, messagebarSheetEl);
  }
  get slots() {
    return __reactComponentSlots(this.props);
  }
  dispatchEvent(events, ...args) {
    return __reactComponentDispatchEvent(this, events, ...args);
  }
  componentDidUpdate(prevProps, prevState) {
    __reactComponentWatch(this, 'props.sheetVisible', prevProps, prevState, () => {
      const self = this;
      if (!self.props.resizable || !self.f7Messagebar)
        return;
      self.updateSheetVisible = true;
    });
    __reactComponentWatch(this, 'props.attachmentsVisible', prevProps, prevState, () => {
      const self = this;
      if (!self.props.resizable || !self.f7Messagebar)
        return;
      self.updateAttachmentsVisible = true;
    });
  }
}
__reactComponentSetProps(F7Messagebar, {
  id: [
    String,
    Number
  ],
  sheetVisible: Boolean,
  attachmentsVisible: Boolean,
  top: Boolean,
  resizable: {
    type: Boolean,
    default: true
  },
  bottomOffset: {
    type: Number,
    default: 0
  },
  topOffset: {
    type: Number,
    default: 0
  },
  maxHeight: Number,
  sendLink: String,
  value: [
    String,
    Number,
    Array
  ],
  disabled: Boolean,
  readonly: Boolean,
  name: String,
  placeholder: {
    type: String,
    default: 'Message'
  },
  init: {
    type: Boolean,
    default: true
  },
  ...Mixins.colorProps
});
export default F7Messagebar;