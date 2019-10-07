import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import F7Input from './input';
import F7Link from './link';
import __vueComponentTransformJSXProps from '../runtime-helpers/vue-component-transform-jsx-props.js';
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
    resizePage: {
      type: Boolean,
      default: true
    },
    sendLink: String,
    value: [String, Number, Array],
    disabled: Boolean,
    readonly: Boolean,
    textareaId: [Number, String],
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
  created: function created() {
    Utils.bindMethods(this, ['onChange', 'onInput', 'onFocus', 'onBlur', 'onClick', 'onAttachmentDelete', 'onAttachmentClick,', 'onResizePage']);
  },
  render: function render() {
    var _h = this.$createElement;
    var self = this;
    var _self$props = self.props,
        placeholder = _self$props.placeholder,
        disabled = _self$props.disabled,
        name = _self$props.name,
        readonly = _self$props.readonly,
        resizable = _self$props.resizable,
        value = _self$props.value,
        sendLink = _self$props.sendLink,
        id = _self$props.id,
        style = _self$props.style;
    var _self$$slots = self.$slots,
        slotsDefault = _self$$slots.default,
        slotsBeforeInner = _self$$slots['before-inner'],
        slotsAfterInner = _self$$slots['after-inner'],
        slotsSendLink = _self$$slots['send-link'],
        slotsInnerStart = _self$$slots['inner-start'],
        slotsInnerEnd = _self$$slots['inner-end'],
        slotsBeforeArea = _self$$slots['before-area'],
        slotsAfterArea = _self$$slots['after-area'];
    var innerEndEls = [];
    var messagebarAttachmentsEl;
    var messagebarSheetEl;

    if (slotsDefault) {
      slotsDefault.forEach(function (child) {
        if (typeof child === 'undefined') return;
        var tag;
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

    var valueProps = {};
    if ('value' in self.props) valueProps.value = value;
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
    }, [slotsBeforeArea, messagebarAttachmentsEl, _h(F7Input, __vueComponentTransformJSXProps(Object.assign({
      ref: 'area'
    }, valueProps, {
      on: {
        input: self.onInput,
        change: self.onChange,
        focus: self.onFocus,
        blur: self.onBlur
      },
      attrs: {
        type: 'textarea',
        wrap: false,
        placeholder: placeholder,
        disabled: disabled,
        name: name,
        readonly: readonly,
        resizable: resizable
      }
    }))), slotsAfterArea]), (sendLink && sendLink.length > 0 || slotsSendLink) && _h(F7Link, {
      on: {
        click: self.onClick
      }
    }, [slotsSendLink || sendLink]), slotsInnerEnd, innerEndEls]), slotsAfterInner, messagebarSheetEl]);
  },
  computed: {
    classes: function classes() {
      var self = this;
      var props = self.props;
      var className = props.className,
          attachmentsVisible = props.attachmentsVisible,
          sheetVisible = props.sheetVisible;
      return Utils.classNames(className, 'toolbar', 'messagebar', {
        'messagebar-attachments-visible': attachmentsVisible,
        'messagebar-sheet-visible': sheetVisible
      }, Mixins.colorClasses(props));
    },
    props: function props() {
      return __vueComponentProps(this);
    }
  },
  watch: {
    'props.sheetVisible': function watchSheetVisible() {
      var self = this;
      if (!self.props.resizable || !self.f7Messagebar) return;
      self.updateSheetVisible = true;
    },
    'props.attachmentsVisible': function watchAttachmentsVisible() {
      var self = this;
      if (!self.props.resizable || !self.f7Messagebar) return;
      self.updateAttachmentsVisible = true;
    }
  },
  mounted: function mounted() {
    var self = this;
    var _self$props2 = self.props,
        init = _self$props2.init,
        top = _self$props2.top,
        resizePage = _self$props2.resizePage,
        bottomOffset = _self$props2.bottomOffset,
        topOffset = _self$props2.topOffset,
        maxHeight = _self$props2.maxHeight;
    if (!init) return;
    var el = self.$refs.el;
    if (!el) return;
    var params = Utils.noUndefinedProps({
      el: el,
      top: top,
      resizePage: resizePage,
      bottomOffset: bottomOffset,
      topOffset: topOffset,
      maxHeight: maxHeight,
      on: {
        attachmentDelete: self.onAttachmentDelete,
        attachmentClick: self.onAttachmentClick,
        resizePage: self.onResizePage
      }
    });
    self.$f7ready(function () {
      self.f7Messagebar = self.$f7.messagebar.create(params);
    });
  },
  updated: function updated() {
    var self = this;
    if (!self.f7Messagebar) return;
    var _self$props3 = self.props,
        sheetVisible = _self$props3.sheetVisible,
        attachmentsVisible = _self$props3.attachmentsVisible;

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
  beforeDestroy: function beforeDestroy() {
    var self = this;
    if (self.f7Messagebar && self.f7Messagebar.destroy) self.f7Messagebar.destroy();
  },
  methods: {
    clear: function clear() {
      var _this$f7Messagebar;

      if (!this.f7Messagebar) return undefined;
      return (_this$f7Messagebar = this.f7Messagebar).clear.apply(_this$f7Messagebar, arguments);
    },
    getValue: function getValue() {
      var _this$f7Messagebar2;

      if (!this.f7Messagebar) return undefined;
      return (_this$f7Messagebar2 = this.f7Messagebar).getValue.apply(_this$f7Messagebar2, arguments);
    },
    setValue: function setValue() {
      var _this$f7Messagebar3;

      if (!this.f7Messagebar) return undefined;
      return (_this$f7Messagebar3 = this.f7Messagebar).setValue.apply(_this$f7Messagebar3, arguments);
    },
    setPlaceholder: function setPlaceholder() {
      var _this$f7Messagebar4;

      if (!this.f7Messagebar) return undefined;
      return (_this$f7Messagebar4 = this.f7Messagebar).setPlaceholder.apply(_this$f7Messagebar4, arguments);
    },
    resize: function resize() {
      var _this$f7Messagebar5;

      if (!this.f7Messagebar) return undefined;
      return (_this$f7Messagebar5 = this.f7Messagebar).resizePage.apply(_this$f7Messagebar5, arguments);
    },
    focus: function focus() {
      var _this$f7Messagebar6;

      if (!this.f7Messagebar) return undefined;
      return (_this$f7Messagebar6 = this.f7Messagebar).focus.apply(_this$f7Messagebar6, arguments);
    },
    blur: function blur() {
      var _this$f7Messagebar7;

      if (!this.f7Messagebar) return undefined;
      return (_this$f7Messagebar7 = this.f7Messagebar).blur.apply(_this$f7Messagebar7, arguments);
    },
    attachmentsShow: function attachmentsShow() {
      var _this$f7Messagebar8;

      if (!this.f7Messagebar) return undefined;
      return (_this$f7Messagebar8 = this.f7Messagebar).attachmentsShow.apply(_this$f7Messagebar8, arguments);
    },
    attachmentsHide: function attachmentsHide() {
      var _this$f7Messagebar9;

      if (!this.f7Messagebar) return undefined;
      return (_this$f7Messagebar9 = this.f7Messagebar).attachmentsHide.apply(_this$f7Messagebar9, arguments);
    },
    attachmentsToggle: function attachmentsToggle() {
      var _this$f7Messagebar10;

      if (!this.f7Messagebar) return undefined;
      return (_this$f7Messagebar10 = this.f7Messagebar).attachmentsToggle.apply(_this$f7Messagebar10, arguments);
    },
    sheetShow: function sheetShow() {
      var _this$f7Messagebar11;

      if (!this.f7Messagebar) return undefined;
      return (_this$f7Messagebar11 = this.f7Messagebar).sheetShow.apply(_this$f7Messagebar11, arguments);
    },
    sheetHide: function sheetHide() {
      var _this$f7Messagebar12;

      if (!this.f7Messagebar) return undefined;
      return (_this$f7Messagebar12 = this.f7Messagebar).sheetHide.apply(_this$f7Messagebar12, arguments);
    },
    sheetToggle: function sheetToggle() {
      var _this$f7Messagebar13;

      if (!this.f7Messagebar) return undefined;
      return (_this$f7Messagebar13 = this.f7Messagebar).sheetToggle.apply(_this$f7Messagebar13, arguments);
    },
    onChange: function onChange(event) {
      this.dispatchEvent('change', event);
    },
    onInput: function onInput(event) {
      this.dispatchEvent('input', event);
    },
    onFocus: function onFocus(event) {
      this.dispatchEvent('focus', event);
    },
    onBlur: function onBlur(event) {
      this.dispatchEvent('blur', event);
    },
    onClick: function onClick(event) {
      var self = this;
      var value;
      {
        value = self.$refs.area.$refs.inputEl.value;
      }
      var clear = self.f7Messagebar ? function () {
        self.f7Messagebar.clear();
      } : function () {};
      this.dispatchEvent('submit', value, clear);
      this.dispatchEvent('send', value, clear);
      this.dispatchEvent('click', event);
    },
    onAttachmentDelete: function onAttachmentDelete(instance, attachmentEl, attachmentElIndex) {
      this.dispatchEvent('messagebar:attachmentdelete messagebarAttachmentDelete', instance, attachmentEl, attachmentElIndex);
    },
    onAttachmentClick: function onAttachmentClick(instance, attachmentEl, attachmentElIndex) {
      this.dispatchEvent('messagebar:attachmentclick messagebarAttachmentClick', instance, attachmentEl, attachmentElIndex);
    },
    onResizePage: function onResizePage(instance) {
      this.dispatchEvent('messagebar:resizepage messagebarResizePage', instance);
    },
    dispatchEvent: function dispatchEvent(events) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      __vueComponentDispatchEvent.apply(void 0, [this, events].concat(args));
    }
  }
};