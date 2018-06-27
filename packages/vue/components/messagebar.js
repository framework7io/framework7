import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import F7Input from './input';
import F7Link from './link';
import __vueComponentDispatchEvent from '../runtime-helpers/vue-component-dispatch-event.js';
import __vueComponentProps from '../runtime-helpers/vue-component-props.js';
export default {
  name: 'f7-messagebar',
  props: Object.assign({
    id: [String, Number],
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
    resizePage: Boolean,
    sendLink: String,
    value: [String, Number, Array],
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
    }
  }, Mixins.colorProps),

  created() {
    this.onChangeBound = this.onChange.bind(this);
    this.onInputBound = this.onInput.bind(this);
    this.onFocusBound = this.onFocus.bind(this);
    this.onBlurBound = this.onBlur.bind(this);
    this.onClickBound = this.onClick.bind(this);
    this.onDeleteAttachmentBound = this.onDeleteAttachment.bind(this);
    this.onClickAttachmentBound = this.onClickAttachment.bind(this);
    this.onResizePageBound = this.onResizePage.bind(this);
  },

  render() {
    const _h = this.$createElement;
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
      style
    } = self.props;
    const {
      default: slotsDefault,
      'before-inner': slotsBeforeInner,
      'after-inner': slotsAfterInner,
      'send-link': slotsSendLink,
      'inner-start': slotsInnerStart,
      'inner-end': slotsInnerEnd,
      'before-area': slotsBeforeArea,
      'after-area': slotsAfterArea
    } = self.$slots;
    const innerEndEls = [];
    let messagebarAttachmentsEl;
    let messagebarSheetEl;

    if (slotsDefault) {
      slotsDefault.forEach(child => {
        if (typeof child === 'undefined') return;
        let tag;
        tag = child.tag;

        if (tag && (tag.indexOf('messagebar-attachments') >= 0 || tag === 'F7MessagebarAttachments' || tag === 'f7-messagebar-attachments')) {
          messagebarAttachmentsEl = child;
        } else if (tag && (tag.indexOf('messagebar-sheet') >= 0 || tag === 'F7MessagebarSheet' || tag === 'f7-messagebar-sheet')) {
          messagebarSheetEl = child;
        } else {
          innerEndEls.push(child);
        }
      });
    }

    return _h('div', {
      ref: 'el',
      style: style,
      class: self.classes,
      attrs: {
        id: id
      }
    }, [slotsBeforeInner, _h('div', {
      class: 'toolbar-inner'
    }, [slotsInnerStart, _h('div', {
      class: 'messagebar-area'
    }, [slotsBeforeArea, messagebarAttachmentsEl, _h(F7Input, {
      ref: 'area',
      on: {
        input: self.onInputBound,
        change: self.onChangeBound,
        focus: self.onFocusBound,
        blur: self.onBlurBound
      },
      attrs: {
        type: 'textarea',
        wrap: false,
        placeholder: placeholder,
        disabled: disabled,
        name: name,
        readonly: readonly,
        resizable: resizable,
        value: value
      }
    }), slotsAfterArea]), (sendLink && sendLink.length > 0 || slotsSendLink) && _h(F7Link, {
      on: {
        click: self.onClickBound
      }
    }, [slotsSendLink || sendLink]), slotsInnerEnd, innerEndEls]), slotsAfterInner, messagebarSheetEl]);
  },

  computed: {
    classes() {
      const self = this;
      const props = self.props;
      const {
        className,
        attachmentsVisible,
        sheetVisible
      } = props;
      return Utils.classNames(className, 'toolbar', 'messagebar', {
        'messagebar-attachments-visible': attachmentsVisible,
        'messagebar-sheet-visible': sheetVisible
      }, Mixins.colorClasses(props));
    },

    props() {
      return __vueComponentProps(this);
    }

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
    }
  },

  mounted() {
    const self = this;
    const {
      init,
      top,
      resizePage,
      bottomOffset,
      topOffset,
      maxHeight
    } = self.props;
    if (!init) return;
    const el = self.$refs.el;
    if (!el) return;
    el.addEventListener('messagebar:attachmentdelete', self.onDeleteAttachmentBound);
    el.addEventListener('messagebar:attachmentclick', self.onClickAttachmentBound);
    el.addEventListener('messagebar:resizepage', self.onResizePageBound);
    const params = Utils.noUndefinedProps({
      el,
      top,
      resizePage,
      bottomOffset,
      topOffset,
      maxHeight
    });
    self.$f7ready(() => {
      self.f7Messagebar = self.$f7.messagebar.create(params);
    });
  },

  updated() {
    const self = this;
    if (!self.f7Messagebar) return;
    const {
      sheetVisible,
      attachmentsVisible
    } = self.props;

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

  beforeDestroy() {
    const self = this;
    if (self.f7Messagebar && self.f7Messagebar.destroy) self.f7Messagebar.destroy();
    const el = self.$refs.el;
    if (!el) return;
    el.removeEventListener('messagebar:attachmentdelete', self.onDeleteAttachmentBound);
    el.removeEventListener('messagebar:attachmentclick', self.onClickAttachmentBound);
    el.removeEventListener('messagebar:resizepage', self.onResizePageBound);
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
      const value = self.$refs.area.refs.inputEl.value;
      const clear = self.f7Messagebar ? () => {
        self.f7Messagebar.clear();
      } : () => {};
      this.dispatchEvent('submit', value, clear);
      this.dispatchEvent('send', value, clear);
      this.dispatchEvent('click', event);
    },

    onDeleteAttachment(e) {
      this.dispatchEvent('messagebar:attachmentdelete messagebarAttachmentDelete', e);
    },

    onClickAttachment(e) {
      this.dispatchEvent('messagebar:attachmentclick messagebarAttachmentClick', e);
    },

    onResizePage(e) {
      this.dispatchEvent('messagebar:resizepage messagebarResizePage', e);
    },

    dispatchEvent(events, ...args) {
      __vueComponentDispatchEvent(this, events, ...args);
    }

  }
};