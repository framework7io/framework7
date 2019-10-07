function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

import React from 'react';
import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __reactComponentSlots from '../runtime-helpers/react-component-slots.js';
import __reactComponentSetProps from '../runtime-helpers/react-component-set-props.js';

var F7Messages =
/*#__PURE__*/
function (_React$Component) {
  _inherits(F7Messages, _React$Component);

  function F7Messages(props, context) {
    var _this;

    _classCallCheck(this, F7Messages);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(F7Messages).call(this, props, context));
    _this.__reactRefs = {};
    return _this;
  }

  _createClass(F7Messages, [{
    key: "renderMessages",
    value: function renderMessages(messagesToRender, method) {
      if (!this.f7Messages) return undefined;
      return this.f7Messages.renderMessages(messagesToRender, method);
    }
  }, {
    key: "layout",
    value: function layout() {
      if (!this.f7Messages) return undefined;
      return this.f7Messages.layout();
    }
  }, {
    key: "scroll",
    value: function scroll(duration, scrollTop) {
      if (!this.f7Messages) return undefined;
      return this.f7Messages.scroll(duration, scrollTop);
    }
  }, {
    key: "clear",
    value: function clear() {
      if (!this.f7Messages) return undefined;
      return this.f7Messages.clear();
    }
  }, {
    key: "removeMessage",
    value: function removeMessage(messageToRemove, layout) {
      if (!this.f7Messages) return undefined;
      return this.f7Messages.removeMessage(messageToRemove, layout);
    }
  }, {
    key: "removeMessages",
    value: function removeMessages(messagesToRemove, layout) {
      if (!this.f7Messages) return undefined;
      return this.f7Messages.removeMessages(messagesToRemove, layout);
    }
  }, {
    key: "addMessage",
    value: function addMessage() {
      var _this$f7Messages;

      if (!this.f7Messages) return undefined;
      return (_this$f7Messages = this.f7Messages).addMessage.apply(_this$f7Messages, arguments);
    }
  }, {
    key: "addMessages",
    value: function addMessages() {
      var _this$f7Messages2;

      if (!this.f7Messages) return undefined;
      return (_this$f7Messages2 = this.f7Messages).addMessages.apply(_this$f7Messages2, arguments);
    }
  }, {
    key: "showTyping",
    value: function showTyping(message) {
      if (!this.f7Messages) return undefined;
      return this.f7Messages.showTyping(message);
    }
  }, {
    key: "hideTyping",
    value: function hideTyping() {
      if (!this.f7Messages) return undefined;
      return this.f7Messages.hideTyping();
    }
  }, {
    key: "destroy",
    value: function destroy() {
      if (!this.f7Messages) return undefined;
      return this.f7Messages.destroy();
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var self = this;
      var props = self.props;
      var id = props.id,
          style = props.style,
          className = props.className;
      var classes = Utils.classNames(className, 'messages', Mixins.colorClasses(props));
      return React.createElement('div', {
        ref: function ref(__reactNode) {
          _this2.__reactRefs['el'] = __reactNode;
        },
        id: id,
        style: style,
        className: classes
      }, this.slots['default']);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.f7Messages && this.f7Messages.destroy) this.f7Messages.destroy();
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var self = this;
      var _self$props = self.props,
          init = _self$props.init,
          autoLayout = _self$props.autoLayout,
          messages = _self$props.messages,
          newMessagesFirst = _self$props.newMessagesFirst,
          scrollMessages = _self$props.scrollMessages,
          scrollMessagesOnEdge = _self$props.scrollMessagesOnEdge,
          firstMessageRule = _self$props.firstMessageRule,
          lastMessageRule = _self$props.lastMessageRule,
          tailMessageRule = _self$props.tailMessageRule,
          sameNameMessageRule = _self$props.sameNameMessageRule,
          sameHeaderMessageRule = _self$props.sameHeaderMessageRule,
          sameFooterMessageRule = _self$props.sameFooterMessageRule,
          sameAvatarMessageRule = _self$props.sameAvatarMessageRule,
          customClassMessageRule = _self$props.customClassMessageRule,
          renderMessage = _self$props.renderMessage;
      if (!init) return;
      self.$f7ready(function (f7) {
        self.f7Messages = f7.messages.create(Utils.noUndefinedProps({
          el: self.refs.el,
          autoLayout: autoLayout,
          messages: messages,
          newMessagesFirst: newMessagesFirst,
          scrollMessages: scrollMessages,
          scrollMessagesOnEdge: scrollMessagesOnEdge,
          firstMessageRule: firstMessageRule,
          lastMessageRule: lastMessageRule,
          tailMessageRule: tailMessageRule,
          sameNameMessageRule: sameNameMessageRule,
          sameHeaderMessageRule: sameHeaderMessageRule,
          sameFooterMessageRule: sameFooterMessageRule,
          sameAvatarMessageRule: sameAvatarMessageRule,
          customClassMessageRule: customClassMessageRule,
          renderMessage: renderMessage
        }));
      });
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      var self = this;
      var _self$props2 = self.props,
          init = _self$props2.init,
          autoLayout = _self$props2.autoLayout,
          scrollMessages = _self$props2.scrollMessages;
      if (!init) return;
      var el = self.refs.el;
      if (!el) return;
      var children = el.children;
      if (!children) return;

      for (var i = 0; i < children.length; i += 1) {
        if (!children[i].classList.contains('message-appeared')) {
          children[i].classList.add('message-appear-from-bottom');
        }
      }

      if (self.f7Messages && self.f7Messages.layout && autoLayout) {
        self.f7Messages.layout();
      }

      if (self.f7Messages && self.f7Messages.scroll && scrollMessages) {
        self.f7Messages.scroll();
      }
    }
  }, {
    key: "componentWillUpdate",
    value: function componentWillUpdate() {
      var self = this;
      if (!self.props.init) return;
      var el = self.refs.el;
      if (!el) return;
      var children = el.children;
      if (!children) return;

      for (var i = 0; i < children.length; i += 1) {
        children[i].classList.add('message-appeared');
      }
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

  return F7Messages;
}(React.Component);

__reactComponentSetProps(F7Messages, Object.assign({
  id: [String, Number],
  className: String,
  style: Object,
  autoLayout: {
    type: Boolean,
    default: false
  },
  messages: {
    type: Array,
    default: function _default() {
      return [];
    }
  },
  newMessagesFirst: {
    type: Boolean,
    default: false
  },
  scrollMessages: {
    type: Boolean,
    default: true
  },
  scrollMessagesOnEdge: {
    type: Boolean,
    default: true
  },
  firstMessageRule: Function,
  lastMessageRule: Function,
  tailMessageRule: Function,
  sameNameMessageRule: Function,
  sameHeaderMessageRule: Function,
  sameFooterMessageRule: Function,
  sameAvatarMessageRule: Function,
  customClassMessageRule: Function,
  renderMessage: Function,
  init: {
    type: Boolean,
    default: true
  }
}, Mixins.colorProps));

F7Messages.displayName = 'f7-messages';
export default F7Messages;