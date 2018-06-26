'use strict';

var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _dom = require('dom7');

var _dom2 = _interopRequireDefault(_dom);

var _utils = require('../../utils/utils');

var _utils2 = _interopRequireDefault(_utils);

var _class = require('../../utils/class');

var _class2 = _interopRequireDefault(_class);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var Messages = function (_Framework7Class) {
  _inherits(Messages, _Framework7Class);

  function Messages(app) {
    var _ret, _ret2;

    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Messages);

    var _this = _possibleConstructorReturn(this, (Messages.__proto__ || Object.getPrototypeOf(Messages)).call(this, params, [app]));

    var m = _this;

    var defaults = {
      autoLayout: true,
      messages: [],
      newMessagesFirst: false,
      scrollMessages: true,
      scrollMessagesOnEdge: true,
      firstMessageRule: undefined,
      lastMessageRule: undefined,
      tailMessageRule: undefined,
      sameNameMessageRule: undefined,
      sameHeaderMessageRule: undefined,
      sameFooterMessageRule: undefined,
      sameAvatarMessageRule: undefined,
      customClassMessageRule: undefined,
      renderMessage: undefined
    };

    // Extend defaults with modules params
    m.useModulesParams(defaults);

    m.params = _utils2.default.extend(defaults, params);

    var $el = (0, _dom2.default)(params.el).eq(0);
    if ($el.length === 0) return _ret = m, _possibleConstructorReturn(_this, _ret);

    $el[0].f7Messages = m;

    var $pageContentEl = $el.closest('.page-content').eq(0);

    _utils2.default.extend(m, {
      messages: m.params.messages,
      $el: $el,
      el: $el[0],
      $pageContentEl: $pageContentEl,
      pageContentEl: $pageContentEl[0]

    });
    // Install Modules
    m.useModules();

    // Init
    m.init();

    return _ret2 = m, _possibleConstructorReturn(_this, _ret2);
  }
  // eslint-disable-next-line


  _createClass(Messages, [{
    key: 'getMessageData',
    value: function getMessageData(messageEl) {
      var $messageEl = (0, _dom2.default)(messageEl);
      var data = {
        name: $messageEl.find('.message-name').html(),
        header: $messageEl.find('.message-header').html(),
        textHeader: $messageEl.find('.message-text-header').html(),
        textFooter: $messageEl.find('.message-text-footer').html(),
        footer: $messageEl.find('.message-footer').html(),
        isTitle: $messageEl.hasClass('messages-title'),
        type: $messageEl.hasClass('message-sent') ? 'sent' : 'received',
        text: $messageEl.find('.message-text').html(),
        image: $messageEl.find('.message-image').html(),
        imageSrc: $messageEl.find('.message-image img').attr('src'),
        typing: $messageEl.hasClass('message-typing')
      };
      if (data.isTitle) {
        data.text = $messageEl.html();
      }
      if (data.text && data.textHeader) {
        data.text = data.text.replace('<div class="message-text-header">' + data.textHeader + '</div>', '');
      }
      if (data.text && data.textFooter) {
        data.text = data.text.replace('<div class="message-text-footer">' + data.textFooter + '</div>', '');
      }
      var avatar = $messageEl.find('.message-avatar').css('background-image');
      if (avatar === 'none' || avatar === '') avatar = undefined;
      if (avatar && typeof avatar === 'string') {
        avatar = avatar.replace('url(', '').replace(')', '').replace(/"/g, '').replace(/'/g, '');
      } else {
        avatar = undefined;
      }
      data.avatar = avatar;

      return data;
    }
  }, {
    key: 'getMessagesData',
    value: function getMessagesData() {
      var m = this;
      var data = [];
      m.$el.find('.message, .messages-title').each(function (index, messageEl) {
        data.push(m.getMessageData(messageEl));
      });
      return data;
    }
  }, {
    key: 'renderMessage',
    value: function renderMessage(messageToRender) {
      var m = this;
      var message = _utils2.default.extend({
        type: 'sent'
      }, messageToRender);
      if (m.params.renderMessage) {
        return m.params.renderMessage.call(m, message);
      }
      if (message.isTitle) {
        return '<div class="messages-title">' + message.text + '</div>';
      }
      return '\n      <div class="message message-' + message.type + ' ' + (message.isTyping ? 'message-typing' : '') + '">\n        ' + (message.avatar ? '\n        <div class="message-avatar" style="background-image:url(' + message.avatar + ')"></div>\n        ' : '') + '\n        <div class="message-content">\n          ' + (message.name ? '<div class="message-name">' + message.name + '</div>' : '') + '\n          ' + (message.header ? '<div class="message-header">' + message.header + '</div>' : '') + '\n          <div class="message-bubble">\n            ' + (message.textHeader ? '<div class="message-text-header">' + message.textHeader + '</div>' : '') + '\n            ' + (message.image ? '<div class="message-image">' + message.image + '</div>' : '') + '\n            ' + (message.imageSrc && !message.image ? '<div class="message-image"><img src="' + message.imageSrc + '"></div>' : '') + '\n            ' + (message.text || message.isTyping ? '<div class="message-text">' + (message.text || '') + (message.isTyping ? '<div class="message-typing-indicator"><div></div><div></div><div></div></div>' : '') + '</div>' : '') + '\n            ' + (message.textFooter ? '<div class="message-text-footer">' + message.textFooter + '</div>' : '') + '\n          </div>\n          ' + (message.footer ? '<div class="message-footer">' + message.footer + '</div>' : '') + '\n        </div>\n      </div>\n    ';
    }
  }, {
    key: 'renderMessages',
    value: function renderMessages() {
      var messagesToRender = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.messages;
      var method = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.params.newMessagesFirst ? 'prepend' : 'append';

      var m = this;
      var html = messagesToRender.map(function (message) {
        return m.renderMessage(message);
      }).join('');
      m.$el[method](html);
    }
  }, {
    key: 'isFirstMessage',
    value: function isFirstMessage() {
      var _m$params;

      var m = this;
      if (m.params.firstMessageRule) return (_m$params = m.params).firstMessageRule.apply(_m$params, arguments);
      return false;
    }
  }, {
    key: 'isLastMessage',
    value: function isLastMessage() {
      var _m$params2;

      var m = this;
      if (m.params.lastMessageRule) return (_m$params2 = m.params).lastMessageRule.apply(_m$params2, arguments);
      return false;
    }
  }, {
    key: 'isTailMessage',
    value: function isTailMessage() {
      var _m$params3;

      var m = this;
      if (m.params.tailMessageRule) return (_m$params3 = m.params).tailMessageRule.apply(_m$params3, arguments);
      return false;
    }
  }, {
    key: 'isSameNameMessage',
    value: function isSameNameMessage() {
      var _m$params4;

      var m = this;
      if (m.params.sameNameMessageRule) return (_m$params4 = m.params).sameNameMessageRule.apply(_m$params4, arguments);
      return false;
    }
  }, {
    key: 'isSameHeaderMessage',
    value: function isSameHeaderMessage() {
      var _m$params5;

      var m = this;
      if (m.params.sameHeaderMessageRule) return (_m$params5 = m.params).sameHeaderMessageRule.apply(_m$params5, arguments);
      return false;
    }
  }, {
    key: 'isSameFooterMessage',
    value: function isSameFooterMessage() {
      var _m$params6;

      var m = this;
      if (m.params.sameFooterMessageRule) return (_m$params6 = m.params).sameFooterMessageRule.apply(_m$params6, arguments);
      return false;
    }
  }, {
    key: 'isSameAvatarMessage',
    value: function isSameAvatarMessage() {
      var _m$params7;

      var m = this;
      if (m.params.sameAvatarMessageRule) return (_m$params7 = m.params).sameAvatarMessageRule.apply(_m$params7, arguments);
      return false;
    }
  }, {
    key: 'isCustomClassMessage',
    value: function isCustomClassMessage() {
      var _m$params8;

      var m = this;
      if (m.params.customClassMessageRule) return (_m$params8 = m.params).customClassMessageRule.apply(_m$params8, arguments);
      return undefined;
    }
  }, {
    key: 'layout',
    value: function layout() {
      var m = this;
      m.$el.find('.message, .messages-title').each(function (index, messageEl) {
        var $messageEl = (0, _dom2.default)(messageEl);
        if (!m.messages) {
          m.messages = m.getMessagesData();
        }
        var classes = [];
        var message = m.messages[index];
        var previousMessage = m.messages[index - 1];
        var nextMessage = m.messages[index + 1];
        if (m.isFirstMessage(message, previousMessage, nextMessage)) {
          classes.push('message-first');
        }
        if (m.isLastMessage(message, previousMessage, nextMessage)) {
          classes.push('message-last');
        }
        if (m.isTailMessage(message, previousMessage, nextMessage)) {
          classes.push('message-tail');
        }
        if (m.isSameNameMessage(message, previousMessage, nextMessage)) {
          classes.push('message-same-name');
        }
        if (m.isSameHeaderMessage(message, previousMessage, nextMessage)) {
          classes.push('message-same-header');
        }
        if (m.isSameFooterMessage(message, previousMessage, nextMessage)) {
          classes.push('message-same-footer');
        }
        if (m.isSameAvatarMessage(message, previousMessage, nextMessage)) {
          classes.push('message-same-avatar');
        }
        var customMessageClasses = m.isCustomClassMessage(message, previousMessage, nextMessage);
        if (customMessageClasses && customMessageClasses.length) {
          if (typeof customMessageClasses === 'string') {
            customMessageClasses = customMessageClasses.split(' ');
          }
          customMessageClasses.forEach(function (customClass) {
            classes.push(customClass);
          });
        }
        $messageEl.removeClass('message-first message-last message-tail message-same-name message-same-header message-same-footer message-same-avatar');
        classes.forEach(function (className) {
          $messageEl.addClass(className);
        });
      });
    }
  }, {
    key: 'clear',
    value: function clear() {
      var m = this;
      m.messages = [];
      m.$el.html('');
    }
  }, {
    key: 'removeMessage',
    value: function removeMessage(messageToRemove) {
      var layout = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      var m = this;
      // Index or El
      var index = void 0;
      var $el = void 0;
      if (typeof messageToRemove === 'number') {
        index = messageToRemove;
        $el = m.$el.find('.message, .messages-title').eq(index);
      } else if (m.messages && m.messages.indexOf(messageToRemove) >= 0) {
        index = m.messages.indexOf(messageToRemove);
        $el = m.$el.children().eq(index);
      } else {
        $el = (0, _dom2.default)(messageToRemove);
        index = $el.index();
      }
      if ($el.length === 0) {
        return m;
      }
      $el.remove();
      m.messages.splice(index, 1);
      if (m.params.autoLayout && layout) m.layout();
      return m;
    }
  }, {
    key: 'removeMessages',
    value: function removeMessages(messagesToRemove) {
      var layout = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      var m = this;
      if (Array.isArray(messagesToRemove)) {
        var messagesToRemoveEls = [];
        messagesToRemove.forEach(function (messageToRemoveIndex) {
          messagesToRemoveEls.push(m.$el.find('.message, .messages-title').eq(messageToRemoveIndex));
        });
        messagesToRemoveEls.forEach(function (messageToRemove) {
          m.removeMessage(messageToRemove, false);
        });
      } else {
        (0, _dom2.default)(messagesToRemove).each(function (index, messageToRemove) {
          m.removeMessage(messageToRemove, false);
        });
      }
      if (m.params.autoLayout && layout) m.layout();
      return m;
    }
  }, {
    key: 'addMessage',
    value: function addMessage() {
      var m = this;
      var messageToAdd = void 0;
      var animate = void 0;
      var method = void 0;

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      if (typeof args[1] === 'boolean') {
        messageToAdd = args[0];
        animate = args[1];
        method = args[2];
      } else {
        messageToAdd = args[0];
        method = args[1];
        animate = args[2];
      }
      if (typeof animate === 'undefined') {
        animate = true;
      }
      if (typeof method === 'undefined') {
        method = m.params.newMessagesFirst ? 'prepend' : 'append';
      }

      return m.addMessages([messageToAdd], animate, method);
    }
  }, {
    key: 'addMessages',
    value: function addMessages() {
      var m = this;
      var messagesToAdd = void 0;
      var animate = void 0;
      var method = void 0;

      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      if (typeof args[1] === 'boolean') {
        messagesToAdd = args[0];
        animate = args[1];
        method = args[2];
      } else {
        messagesToAdd = args[0];
        method = args[1];
        animate = args[2];
      }
      if (typeof animate === 'undefined') {
        animate = true;
      }
      if (typeof method === 'undefined') {
        method = m.params.newMessagesFirst ? 'prepend' : 'append';
      }

      // Define scroll positions before new messages added
      var scrollHeightBefore = m.pageContentEl.scrollHeight;
      var heightBefore = m.pageContentEl.offsetHeight;
      var scrollBefore = m.pageContentEl.scrollTop;

      // Add message to DOM and data
      var messagesHTML = '';
      var typingMessage = m.messages.filter(function (el) {
        return el.isTyping;
      })[0];
      messagesToAdd.forEach(function (messageToAdd) {
        if (typingMessage) {
          if (method === 'append') {
            m.messages.splice(m.messages.indexOf(typingMessage), 0, messageToAdd);
          } else {
            m.messages.splice(m.messages.indexOf(typingMessage) + 1, 0, messageToAdd);
          }
        } else {
          m.messages[method === 'append' ? 'push' : 'unshift'](messageToAdd);
        }
        messagesHTML += m.renderMessage(messageToAdd);
      });
      var $messagesEls = (0, _dom2.default)(messagesHTML);
      if (animate) {
        if (method === 'append' && !m.params.newMessagesFirst) {
          $messagesEls.addClass('message-appear-from-bottom');
        }
        if (method === 'prepend' && m.params.newMessagesFirst) {
          $messagesEls.addClass('message-appear-from-top');
        }
      }
      if (typingMessage) {
        if (method === 'append') {
          $messagesEls.insertBefore(m.$el.find('.message-typing'));
        } else {
          $messagesEls.insertAfter(m.$el.find('.message-typing'));
        }
      } else {
        m.$el[method]($messagesEls);
      }

      // Layout
      if (m.params.autoLayout) m.layout();

      if (method === 'prepend' && !typingMessage) {
        m.pageContentEl.scrollTop = scrollBefore + (m.pageContentEl.scrollHeight - scrollHeightBefore);
      }

      if (m.params.scrollMessages && (method === 'append' && !m.params.newMessagesFirst || method === 'prepend' && m.params.newMessagesFirst && !typingMessage)) {
        if (m.params.scrollMessagesOnEdge) {
          var onEdge = false;
          if (m.params.newMessagesFirst && scrollBefore === 0) {
            onEdge = true;
          }
          if (!m.params.newMessagesFirst && scrollBefore - (scrollHeightBefore - heightBefore) >= -10) {
            onEdge = true;
          }
          if (onEdge) m.scroll(animate ? undefined : 0);
        } else {
          m.scroll(animate ? undefined : 0);
        }
      }

      return m;
    }
  }, {
    key: 'showTyping',
    value: function showTyping() {
      var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var m = this;
      var typingMessage = m.messages.filter(function (el) {
        return el.isTyping;
      })[0];
      if (typingMessage) {
        m.removeMessage(m.messages.indexOf(typingMessage));
      }
      m.addMessage(_utils2.default.extend({
        type: 'received',
        isTyping: true
      }, message));
      return m;
    }
  }, {
    key: 'hideTyping',
    value: function hideTyping() {
      var m = this;
      var typingMessageIndex = void 0;
      var typingFound = void 0;
      m.messages.forEach(function (message, index) {
        if (message.isTyping) typingMessageIndex = index;
      });
      if (typeof typingMessageIndex !== 'undefined') {
        if (m.$el.find('.message').eq(typingMessageIndex).hasClass('message-typing')) {
          typingFound = true;
          m.removeMessage(typingMessageIndex);
        }
      }
      if (!typingFound) {
        var $typingMessageEl = m.$el.find('.message-typing');
        if ($typingMessageEl.length) {
          m.removeMessage($typingMessageEl);
        }
      }
      return m;
    }
  }, {
    key: 'scroll',
    value: function scroll() {
      var duration = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 300;
      var scrollTop = arguments[1];

      var m = this;
      var currentScroll = m.pageContentEl.scrollTop;
      var newScrollTop = void 0;
      if (typeof scrollTop !== 'undefined') newScrollTop = scrollTop;else {
        newScrollTop = m.params.newMessagesFirst ? 0 : m.pageContentEl.scrollHeight - m.pageContentEl.offsetHeight;
        if (newScrollTop === currentScroll) return m;
      }
      m.$pageContentEl.scrollTop(newScrollTop, duration);
      return m;
    }
  }, {
    key: 'init',
    value: function init() {
      var m = this;
      if (!m.messages || m.messages.length === 0) {
        m.messages = m.getMessagesData();
      }
      if (m.params.messages && m.params.messages.length) {
        m.renderMessages();
      }
      if (m.params.autoLayout) m.layout();
      if (m.params.scrollMessages) m.scroll(0);
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      var m = this;
      m.emit('local::beforeDestroy messagesBeforeDestroy', m);
      m.$el.trigger('messages:beforedestroy', m);
      m.$el[0].f7Messages = null;
      delete m.$el[0].f7Messages;
      _utils2.default.deleteProps(m);
    }
  }]);

  return Messages;
}(_class2.default);

exports.default = Messages;