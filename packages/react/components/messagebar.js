function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

import React from 'react';
import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import F7Input from './input';
import F7Link from './link';
import __reactComponentWatch from '../runtime-helpers/react-component-watch.js';
import __reactComponentDispatchEvent from '../runtime-helpers/react-component-dispatch-event.js';
import __reactComponentSlots from '../runtime-helpers/react-component-slots.js';
import __reactComponentSetProps from '../runtime-helpers/react-component-set-props.js';

var F7Messagebar =
/*#__PURE__*/
function (_React$Component) {
  _inherits(F7Messagebar, _React$Component);

  function F7Messagebar(props, context) {
    var _this;

    _classCallCheck(this, F7Messagebar);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(F7Messagebar).call(this, props, context));
    _this.__reactRefs = {};

    (function () {
      Utils.bindMethods(_assertThisInitialized(_this), ['onChange', 'onInput', 'onFocus', 'onBlur', 'onClick', 'onAttachmentDelete', 'onAttachmentClick,', 'onResizePage']);
    })();

    return _this;
  }

  _createClass(F7Messagebar, [{
    key: "clear",
    value: function clear() {
      var _this$f7Messagebar;

      if (!this.f7Messagebar) return undefined;
      return (_this$f7Messagebar = this.f7Messagebar).clear.apply(_this$f7Messagebar, arguments);
    }
  }, {
    key: "getValue",
    value: function getValue() {
      var _this$f7Messagebar2;

      if (!this.f7Messagebar) return undefined;
      return (_this$f7Messagebar2 = this.f7Messagebar).getValue.apply(_this$f7Messagebar2, arguments);
    }
  }, {
    key: "setValue",
    value: function setValue() {
      var _this$f7Messagebar3;

      if (!this.f7Messagebar) return undefined;
      return (_this$f7Messagebar3 = this.f7Messagebar).setValue.apply(_this$f7Messagebar3, arguments);
    }
  }, {
    key: "setPlaceholder",
    value: function setPlaceholder() {
      var _this$f7Messagebar4;

      if (!this.f7Messagebar) return undefined;
      return (_this$f7Messagebar4 = this.f7Messagebar).setPlaceholder.apply(_this$f7Messagebar4, arguments);
    }
  }, {
    key: "resize",
    value: function resize() {
      var _this$f7Messagebar5;

      if (!this.f7Messagebar) return undefined;
      return (_this$f7Messagebar5 = this.f7Messagebar).resizePage.apply(_this$f7Messagebar5, arguments);
    }
  }, {
    key: "focus",
    value: function focus() {
      var _this$f7Messagebar6;

      if (!this.f7Messagebar) return undefined;
      return (_this$f7Messagebar6 = this.f7Messagebar).focus.apply(_this$f7Messagebar6, arguments);
    }
  }, {
    key: "blur",
    value: function blur() {
      var _this$f7Messagebar7;

      if (!this.f7Messagebar) return undefined;
      return (_this$f7Messagebar7 = this.f7Messagebar).blur.apply(_this$f7Messagebar7, arguments);
    }
  }, {
    key: "attachmentsShow",
    value: function attachmentsShow() {
      var _this$f7Messagebar8;

      if (!this.f7Messagebar) return undefined;
      return (_this$f7Messagebar8 = this.f7Messagebar).attachmentsShow.apply(_this$f7Messagebar8, arguments);
    }
  }, {
    key: "attachmentsHide",
    value: function attachmentsHide() {
      var _this$f7Messagebar9;

      if (!this.f7Messagebar) return undefined;
      return (_this$f7Messagebar9 = this.f7Messagebar).attachmentsHide.apply(_this$f7Messagebar9, arguments);
    }
  }, {
    key: "attachmentsToggle",
    value: function attachmentsToggle() {
      var _this$f7Messagebar10;

      if (!this.f7Messagebar) return undefined;
      return (_this$f7Messagebar10 = this.f7Messagebar).attachmentsToggle.apply(_this$f7Messagebar10, arguments);
    }
  }, {
    key: "sheetShow",
    value: function sheetShow() {
      var _this$f7Messagebar11;

      if (!this.f7Messagebar) return undefined;
      return (_this$f7Messagebar11 = this.f7Messagebar).sheetShow.apply(_this$f7Messagebar11, arguments);
    }
  }, {
    key: "sheetHide",
    value: function sheetHide() {
      var _this$f7Messagebar12;

      if (!this.f7Messagebar) return undefined;
      return (_this$f7Messagebar12 = this.f7Messagebar).sheetHide.apply(_this$f7Messagebar12, arguments);
    }
  }, {
    key: "sheetToggle",
    value: function sheetToggle() {
      var _this$f7Messagebar13;

      if (!this.f7Messagebar) return undefined;
      return (_this$f7Messagebar13 = this.f7Messagebar).sheetToggle.apply(_this$f7Messagebar13, arguments);
    }
  }, {
    key: "onChange",
    value: function onChange(event) {
      this.dispatchEvent('change', event);
    }
  }, {
    key: "onInput",
    value: function onInput(event) {
      this.dispatchEvent('input', event);
    }
  }, {
    key: "onFocus",
    value: function onFocus(event) {
      this.dispatchEvent('focus', event);
    }
  }, {
    key: "onBlur",
    value: function onBlur(event) {
      this.dispatchEvent('blur', event);
    }
  }, {
    key: "onClick",
    value: function onClick(event) {
      var self = this;
      var value;
      {
        value = self.refs.area.refs.inputEl.value;
      }
      var clear = self.f7Messagebar ? function () {
        self.f7Messagebar.clear();
      } : function () {};
      this.dispatchEvent('submit', value, clear);
      this.dispatchEvent('send', value, clear);
      this.dispatchEvent('click', event);
    }
  }, {
    key: "onAttachmentDelete",
    value: function onAttachmentDelete(instance, attachmentEl, attachmentElIndex) {
      this.dispatchEvent('messagebar:attachmentdelete messagebarAttachmentDelete', instance, attachmentEl, attachmentElIndex);
    }
  }, {
    key: "onAttachmentClick",
    value: function onAttachmentClick(instance, attachmentEl, attachmentElIndex) {
      this.dispatchEvent('messagebar:attachmentclick messagebarAttachmentClick', instance, attachmentEl, attachmentElIndex);
    }
  }, {
    key: "onResizePage",
    value: function onResizePage(instance) {
      this.dispatchEvent('messagebar:resizepage messagebarResizePage', instance);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

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
      var _self$slots = self.slots,
          slotsDefault = _self$slots.default,
          slotsBeforeInner = _self$slots['before-inner'],
          slotsAfterInner = _self$slots['after-inner'],
          slotsSendLink = _self$slots['send-link'],
          slotsInnerStart = _self$slots['inner-start'],
          slotsInnerEnd = _self$slots['inner-end'],
          slotsBeforeArea = _self$slots['before-area'],
          slotsAfterArea = _self$slots['after-area'];
      var innerEndEls = [];
      var messagebarAttachmentsEl;
      var messagebarSheetEl;

      if (slotsDefault) {
        slotsDefault.forEach(function (child) {
          if (typeof child === 'undefined') return;
          var tag;
          tag = child.type && (child.type.displayName || child.type.name);

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
      return React.createElement('div', {
        ref: function ref(__reactNode) {
          _this2.__reactRefs['el'] = __reactNode;
        },
        id: id,
        style: style,
        className: self.classes
      }, slotsBeforeInner, React.createElement('div', {
        className: 'toolbar-inner'
      }, slotsInnerStart, React.createElement('div', {
        className: 'messagebar-area'
      }, slotsBeforeArea, messagebarAttachmentsEl, React.createElement(F7Input, Object.assign({
        ref: function ref(__reactNode) {
          _this2.__reactRefs['area'] = __reactNode;
        },
        type: 'textarea',
        wrap: false,
        placeholder: placeholder,
        disabled: disabled,
        name: name,
        readonly: readonly,
        resizable: resizable,
        onInput: self.onInput,
        onChange: self.onChange,
        onFocus: self.onFocus,
        onBlur: self.onBlur
      }, valueProps)), slotsAfterArea), (sendLink && sendLink.length > 0 || slotsSendLink) && React.createElement(F7Link, {
        onClick: self.onClick
      }, slotsSendLink || sendLink), slotsInnerEnd, innerEndEls), slotsAfterInner, messagebarSheetEl);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var self = this;
      if (self.f7Messagebar && self.f7Messagebar.destroy) self.f7Messagebar.destroy();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      var _this3 = this;

      __reactComponentWatch(this, 'props.sheetVisible', prevProps, prevState, function () {
        var self = _this3;
        if (!self.props.resizable || !self.f7Messagebar) return;
        self.updateSheetVisible = true;
      });

      __reactComponentWatch(this, 'props.attachmentsVisible', prevProps, prevState, function () {
        var self = _this3;
        if (!self.props.resizable || !self.f7Messagebar) return;
        self.updateAttachmentsVisible = true;
      });

      var self = this;
      if (!self.f7Messagebar) return;
      var _self$props2 = self.props,
          sheetVisible = _self$props2.sheetVisible,
          attachmentsVisible = _self$props2.attachmentsVisible;

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
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var self = this;
      var _self$props3 = self.props,
          init = _self$props3.init,
          top = _self$props3.top,
          resizePage = _self$props3.resizePage,
          bottomOffset = _self$props3.bottomOffset,
          topOffset = _self$props3.topOffset,
          maxHeight = _self$props3.maxHeight;
      if (!init) return;
      var el = self.refs.el;
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
    }
  }, {
    key: "dispatchEvent",
    value: function dispatchEvent(events) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      return __reactComponentDispatchEvent.apply(void 0, [this, events].concat(args));
    }
  }, {
    key: "classes",
    get: function get() {
      var self = this;
      var props = self.props;
      var className = props.className,
          attachmentsVisible = props.attachmentsVisible,
          sheetVisible = props.sheetVisible;
      return Utils.classNames(className, 'toolbar', 'messagebar', {
        'messagebar-attachments-visible': attachmentsVisible,
        'messagebar-sheet-visible': sheetVisible
      }, Mixins.colorClasses(props));
    }
  }, {
    key: "slots",
    get: function get() {
      return __reactComponentSlots(this.props);
    }
  }, {
    key: "refs",
    get: function get() {
      return this.__reactRefs;
    },
    set: function set(refs) {}
  }]);

  return F7Messagebar;
}(React.Component);

__reactComponentSetProps(F7Messagebar, Object.assign({
  id: [String, Number],
  className: String,
  style: Object,
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
}, Mixins.colorProps));

F7Messagebar.displayName = 'f7-messagebar';
export default F7Messagebar;