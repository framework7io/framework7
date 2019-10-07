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
import __reactComponentDispatchEvent from '../runtime-helpers/react-component-dispatch-event.js';
import __reactComponentSlots from '../runtime-helpers/react-component-slots.js';
import __reactComponentSetProps from '../runtime-helpers/react-component-set-props.js';

var F7Message =
/*#__PURE__*/
function (_React$Component) {
  _inherits(F7Message, _React$Component);

  function F7Message(props, context) {
    var _this;

    _classCallCheck(this, F7Message);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(F7Message).call(this, props, context));
    _this.__reactRefs = {};

    (function () {
      Utils.bindMethods(_assertThisInitialized(_this), ['onClick', 'onNameClick', 'onTextClick', 'onAvatarClick', 'onHeaderClick', 'onFooterClick', 'onBubbleClick']);
    })();

    return _this;
  }

  _createClass(F7Message, [{
    key: "onClick",
    value: function onClick(event) {
      this.dispatchEvent('click', event);
    }
  }, {
    key: "onNameClick",
    value: function onNameClick(event) {
      this.dispatchEvent('click:name clickName', event);
    }
  }, {
    key: "onTextClick",
    value: function onTextClick(event) {
      this.dispatchEvent('click:text clickText', event);
    }
  }, {
    key: "onAvatarClick",
    value: function onAvatarClick(event) {
      this.dispatchEvent('click:avatar clickAvatar', event);
    }
  }, {
    key: "onHeaderClick",
    value: function onHeaderClick(event) {
      this.dispatchEvent('click:header clickHeader', event);
    }
  }, {
    key: "onFooterClick",
    value: function onFooterClick(event) {
      this.dispatchEvent('click:footer clickFooter', event);
    }
  }, {
    key: "onBubbleClick",
    value: function onBubbleClick(event) {
      this.dispatchEvent('click:bubble clickBubble', event);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var self = this;
      var props = self.props;
      var text = props.text,
          name = props.name,
          avatar = props.avatar,
          image = props.image,
          header = props.header,
          footer = props.footer,
          textHeader = props.textHeader,
          textFooter = props.textFooter,
          typing = props.typing,
          id = props.id,
          style = props.style;
      var _self$slots = self.slots,
          slotsStart = _self$slots.start,
          slotsEnd = _self$slots.end,
          slotsDefault = _self$slots.default,
          slotsContentStart = _self$slots['content-start'],
          slotsContentEnd = _self$slots['content-end'],
          slotsAvatar = _self$slots.avatar,
          slotsName = _self$slots.name,
          slotsHeader = _self$slots.header,
          slotsFooter = _self$slots.footer,
          slotsImage = _self$slots.image,
          slotsText = _self$slots.text,
          slotsTextHeader = _self$slots['text-header'],
          slotsTextFooter = _self$slots['text-footer'],
          slotsBubbleStart = _self$slots['bubble-start'],
          slotsBubbleEnd = _self$slots['bubble-end'];
      return React.createElement('div', {
        ref: function ref(__reactNode) {
          _this2.__reactRefs['el'] = __reactNode;
        },
        id: id,
        style: style,
        className: self.classes
      }, slotsStart, (avatar || slotsAvatar) && React.createElement('div', {
        ref: function ref(__reactNode) {
          _this2.__reactRefs['avatarEl'] = __reactNode;
        },
        className: 'message-avatar',
        style: {
          backgroundImage: avatar && "url(".concat(avatar, ")")
        }
      }, slotsAvatar), React.createElement('div', {
        className: 'message-content'
      }, slotsContentStart, (slotsName || name) && React.createElement('div', {
        ref: function ref(__reactNode) {
          _this2.__reactRefs['nameEl'] = __reactNode;
        },
        className: 'message-name'
      }, slotsName || name), (slotsHeader || header) && React.createElement('div', {
        ref: function ref(__reactNode) {
          _this2.__reactRefs['headerEl'] = __reactNode;
        },
        className: 'message-header'
      }, slotsHeader || header), React.createElement('div', {
        ref: function ref(__reactNode) {
          _this2.__reactRefs['bubbleEl'] = __reactNode;
        },
        className: 'message-bubble'
      }, slotsBubbleStart, (slotsImage || image) && React.createElement('div', {
        className: 'message-image'
      }, slotsImage || React.createElement('img', {
        src: image
      })), (slotsTextHeader || textHeader) && React.createElement('div', {
        className: 'message-text-header'
      }, slotsTextHeader || textHeader), (slotsText || text || typing) && React.createElement('div', {
        ref: function ref(__reactNode) {
          _this2.__reactRefs['textEl'] = __reactNode;
        },
        className: 'message-text'
      }, slotsText || text, typing && React.createElement('div', {
        className: 'message-typing-indicator'
      }, React.createElement('div', null), React.createElement('div', null), React.createElement('div', null))), (slotsTextFooter || textFooter) && React.createElement('div', {
        className: 'message-text-footer'
      }, slotsTextFooter || textFooter), slotsBubbleEnd, slotsDefault), (slotsFooter || footer) && React.createElement('div', {
        ref: function ref(__reactNode) {
          _this2.__reactRefs['footerEl'] = __reactNode;
        },
        className: 'message-footer'
      }, slotsFooter || footer), slotsContentEnd), slotsEnd);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var _this$refs = this.refs,
          el = _this$refs.el,
          nameEl = _this$refs.nameEl,
          textEl = _this$refs.textEl,
          avatarEl = _this$refs.avatarEl,
          headerEl = _this$refs.headerEl,
          footerEl = _this$refs.footerEl,
          bubbleEl = _this$refs.bubbleEl;
      el.removeEventListener('click', this.onClick);
      if (nameEl) nameEl.removeEventListener('click', this.onNameClick);
      if (textEl) textEl.removeEventListener('click', this.onTextClick);
      if (avatarEl) avatarEl.removeEventListener('click', this.onAvatarClick);
      if (headerEl) headerEl.removeEventListener('click', this.onHeaderClick);
      if (footerEl) footerEl.removeEventListener('click', this.onFooterClick);
      if (bubbleEl) bubbleEl.removeEventListener('click', this.onBubbleClick);
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$refs2 = this.refs,
          el = _this$refs2.el,
          nameEl = _this$refs2.nameEl,
          textEl = _this$refs2.textEl,
          avatarEl = _this$refs2.avatarEl,
          headerEl = _this$refs2.headerEl,
          footerEl = _this$refs2.footerEl,
          bubbleEl = _this$refs2.bubbleEl;
      el.addEventListener('click', this.onClick);
      if (nameEl) nameEl.addEventListener('click', this.onNameClick);
      if (textEl) textEl.addEventListener('click', this.onTextClick);
      if (avatarEl) avatarEl.addEventListener('click', this.onAvatarClick);
      if (headerEl) headerEl.addEventListener('click', this.onHeaderClick);
      if (footerEl) footerEl.addEventListener('click', this.onFooterClick);
      if (bubbleEl) bubbleEl.addEventListener('click', this.onBubbleClick);
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
      var type = props.type,
          typing = props.typing,
          first = props.first,
          last = props.last,
          tail = props.tail,
          sameName = props.sameName,
          sameHeader = props.sameHeader,
          sameFooter = props.sameFooter,
          sameAvatar = props.sameAvatar,
          className = props.className;
      return Utils.classNames(className, 'message', {
        'message-sent': type === 'sent',
        'message-received': type === 'received',
        'message-typing': typing,
        'message-first': first,
        'message-last': last,
        'message-tail': tail,
        'message-same-name': sameName,
        'message-same-header': sameHeader,
        'message-same-footer': sameFooter,
        'message-same-avatar': sameAvatar
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

  return F7Message;
}(React.Component);

__reactComponentSetProps(F7Message, Object.assign({
  id: [String, Number],
  className: String,
  style: Object,
  text: String,
  name: String,
  avatar: String,
  type: {
    type: String,
    default: 'sent'
  },
  image: String,
  header: String,
  footer: String,
  textHeader: String,
  textFooter: String,
  first: Boolean,
  last: Boolean,
  tail: Boolean,
  sameName: Boolean,
  sameHeader: Boolean,
  sameFooter: Boolean,
  sameAvatar: Boolean,
  typing: Boolean
}, Mixins.colorProps));

F7Message.displayName = 'f7-message';
export default F7Message;