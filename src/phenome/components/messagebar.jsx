/* eslint import/no-unresolved: ["off"] */
/* eslint import/extensions: ["off"] */
import Utils from '../utils/utils';
import Mixins from '../utils/mixins';

import F7Input from './input';
import F7Link from './link';

/* phenome-dts-imports
import { Messagebar as MessagebarNamespace } from 'framework7/components/messagebar/messagebar';
*/

/* phenome-dts-instance
f7Messagebar: MessagebarNamespace.Messagebar
*/

export default {
  name: 'f7-messagebar',
  props: {
    id: [String, Number],
    className: String, // phenome-react-line
    style: Object, // phenome-react-line
    sheetVisible: Boolean,
    attachmentsVisible: Boolean,
    top: Boolean,
    resizable: {
      type: Boolean,
      default: true,
    },
    bottomOffset: {
      type: Number,
      default: 0,
    },
    topOffset: {
      type: Number,
      default: 0,
    },
    maxHeight: Number,
    resizePage: {
      type: Boolean,
      default: true,
    },
    sendLink: String,
    value: [String, Number, Array],
    disabled: Boolean,
    readonly: Boolean,
    textareaId: [Number, String],
    name: String,
    placeholder: {
      type: String,
      default: 'Message',
    },
    init: {
      type: Boolean,
      default: true,
    },
    ...Mixins.colorProps,
  },
  componentDidCreate() {
    Utils.bindMethods(this, [
      'onChange',
      'onInput',
      'onFocus',
      'onBlur',
      'onClick',
      'onDeleteAttachment',
      'onClickAttachment',
      'onResizePage',
    ]);
  },
  render() {
    const self = this;

    const {
      placeholder,
      disabled,
      name,
      readonly,
      resizable,
      value,
      sendLink,
      id,
      style,
    } = self.props;

    const {
      default: slotsDefault,
      'before-inner': slotsBeforeInner,
      'after-inner': slotsAfterInner,
      'send-link': slotsSendLink,
      'inner-start': slotsInnerStart,
      'inner-end': slotsInnerEnd,
      'before-area': slotsBeforeArea,
      'after-area': slotsAfterArea,
    } = self.slots;

    const innerEndEls = [];

    let messagebarAttachmentsEl;
    let messagebarSheetEl;

    if (slotsDefault) {
      slotsDefault.forEach((child) => {
        if (typeof child === 'undefined') return;
        let tag;
        tag = child.tag; // phenome-vue-line
        tag = child.type && (child.type.displayName || child.type.name); // phenome-react-line

        if (tag && (tag.indexOf('messagebar-attachments') >= 0 || tag === 'F7MessagebarAttachments' || tag === 'f7-messagebar-attachments')) {
          messagebarAttachmentsEl = child;
        } else if (tag && (tag.indexOf('messagebar-sheet') >= 0 || tag === 'F7MessagebarSheet' || tag === 'f7-messagebar-sheet')) {
          messagebarSheetEl = child;
        } else {
          innerEndEls.push(child);
        }
      });
    }

    const valueProps = {};
    if ('value' in self.props) valueProps.value = value;

    return (
      <div ref="el" id={id} style={style} className={self.classes}>
        {slotsBeforeInner}
        <div className="toolbar-inner">
          {slotsInnerStart}
          <div className="messagebar-area">
            {slotsBeforeArea}
            {messagebarAttachmentsEl}
            <F7Input
              ref="area"
              type="textarea"
              wrap={false}
              placeholder={placeholder}
              disabled={disabled}
              name={name}
              readonly={readonly}
              resizable={resizable}
              onInput={self.onInput}
              onChange={self.onChange}
              onFocus={self.onFocus}
              onBlur={self.onBlur}
              {...valueProps}
            />
            {slotsAfterArea}
          </div>
          {((sendLink && sendLink.length > 0) || slotsSendLink) && (
            <F7Link onClick={self.onClick}>
              {slotsSendLink || sendLink}
            </F7Link>
          )}
          {slotsInnerEnd}
          {innerEndEls}
        </div>
        {slotsAfterInner}
        {messagebarSheetEl}
      </div>
    );
  },
  computed: {
    classes() {
      const self = this;
      const props = self.props;
      const {
        className,
        attachmentsVisible,
        sheetVisible,
      } = props;

      return Utils.classNames(
        className,
        'toolbar',
        'messagebar',
        {
          'messagebar-attachments-visible': attachmentsVisible,
          'messagebar-sheet-visible': sheetVisible,
        },
        Mixins.colorClasses(props),
      );
    },
  },
  watch: {
    'props.sheetVisible': function watchSheetVisible() {
      const self = this;
      if (!self.props.resizable || !self.f7Messagebar) return;
      self.updateSheetVisible = true;
    },
    'props.attachmentsVisible': function watchAttachmentsVisible() {
      const self = this;
      if (!self.props.resizable || !self.f7Messagebar) return;
      self.updateAttachmentsVisible = true;
    },
  },

  componentDidMount() {
    const self = this;

    const {
      init,
      top,
      resizePage,
      bottomOffset,
      topOffset,
      maxHeight,
    } = self.props;

    if (!init) return;

    const el = self.refs.el;
    if (!el) return;

    el.addEventListener('messagebar:attachmentdelete', self.onDeleteAttachment);
    el.addEventListener('messagebar:attachmentclick', self.onClickAttachment);
    el.addEventListener('messagebar:resizepage', self.onResizePage);

    const params = Utils.noUndefinedProps({
      el,
      top,
      resizePage,
      bottomOffset,
      topOffset,
      maxHeight,
    });

    self.$f7ready(() => {
      self.f7Messagebar = self.$f7.messagebar.create(params);
    });
  },
  componentDidUpdate() {
    const self = this;
    if (!self.f7Messagebar) return;
    const { sheetVisible, attachmentsVisible } = self.props;
    if (self.updateSheetVisible) {
      self.updateSheetVisible = false;
      self.f7Messagebar.sheetVisible = sheetVisible;
      self.f7Messagebar.resizePage();
    }
    if (self.updateAttachmentsVisible) {
      self.updateAttachmentsVisible = false;
      self.f7Messagebar.attachmentsVisible = attachmentsVisible;
      self.f7Messagebar.resizePage();
    }
  },
  componentWillUnmount() {
    const self = this;
    if (self.f7Messagebar && self.f7Messagebar.destroy) self.f7Messagebar.destroy();

    const el = self.refs.el;
    if (!el) return;

    el.removeEventListener('messagebar:attachmentdelete', self.onDeleteAttachment);
    el.removeEventListener('messagebar:attachmentclick', self.onClickAttachment);
    el.removeEventListener('messagebar:resizepage', self.onResizePage);
  },
  methods: {
    clear(...args) {
      if (!this.f7Messagebar) return undefined;
      return this.f7Messagebar.clear(...args);
    },
    getValue(...args) {
      if (!this.f7Messagebar) return undefined;
      return this.f7Messagebar.getValue(...args);
    },
    setValue(...args) {
      if (!this.f7Messagebar) return undefined;
      return this.f7Messagebar.setValue(...args);
    },
    setPlaceholder(...args) {
      if (!this.f7Messagebar) return undefined;
      return this.f7Messagebar.setPlaceholder(...args);
    },
    resize(...args) {
      if (!this.f7Messagebar) return undefined;
      return this.f7Messagebar.resizePage(...args);
    },
    focus(...args) {
      if (!this.f7Messagebar) return undefined;
      return this.f7Messagebar.focus(...args);
    },
    blur(...args) {
      if (!this.f7Messagebar) return undefined;
      return this.f7Messagebar.blur(...args);
    },
    attachmentsShow(...args) {
      if (!this.f7Messagebar) return undefined;
      return this.f7Messagebar.attachmentsShow(...args);
    },
    attachmentsHide(...args) {
      if (!this.f7Messagebar) return undefined;
      return this.f7Messagebar.attachmentsHide(...args);
    },
    attachmentsToggle(...args) {
      if (!this.f7Messagebar) return undefined;
      return this.f7Messagebar.attachmentsToggle(...args);
    },
    sheetShow(...args) {
      if (!this.f7Messagebar) return undefined;
      return this.f7Messagebar.sheetShow(...args);
    },
    sheetHide(...args) {
      if (!this.f7Messagebar) return undefined;
      return this.f7Messagebar.sheetHide(...args);
    },
    sheetToggle(...args) {
      if (!this.f7Messagebar) return undefined;
      return this.f7Messagebar.sheetToggle(...args);
    },
    onChange(event) {
      this.dispatchEvent('change', event);
    },
    onInput(event) {
      this.dispatchEvent('input', event);
    },
    onFocus(event) {
      this.dispatchEvent('focus', event);
    },
    onBlur(event) {
      this.dispatchEvent('blur', event);
    },
    onClick(event) {
      const self = this;
      let value;
      if (process.env.COMPILER === 'vue') {
        value = self.refs.area.$refs.inputEl.value;
      }
      if (process.env.COMPILER === 'react') {
        value = self.refs.area.refs.inputEl.value;
      }

      const clear = self.f7Messagebar
        ? () => { self.f7Messagebar.clear(); }
        : () => {};
      this.dispatchEvent('submit', value, clear);
      this.dispatchEvent('send', value, clear);
      this.dispatchEvent('click', event);
    },
    onDeleteAttachment(event) {
      this.dispatchEvent('messagebar:attachmentdelete messagebarAttachmentDelete', event);
    },
    onClickAttachment(event) {
      this.dispatchEvent('messagebar:attachmentclick messagebarAttachmentClick', event);
    },
    onResizePage(event) {
      this.dispatchEvent('messagebar:resizepage messagebarResizePage', event);
    },
  },
};
