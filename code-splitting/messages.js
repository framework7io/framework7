
function framework7ComponentLoader(chunks) {
  var doc = document;
  var win = window;
  var $ = chunks.$;
  var Template7 = chunks.Template7;
  var Utils = chunks.Utils;
  var Device = chunks.Device;
  var Support = chunks.Support;
  var ConstructorMethods = chunks.ConstructorMethods;
  var ModalMethods = chunks.ModalMethods;
  var Framework7Class = chunks.Framework7Class;
  var Modal = chunks.Modal;

  var Messages = (function (Framework7Class$$1) {
    function Messages(app, params) {
      if ( params === void 0 ) params = {};

      Framework7Class$$1.call(this, params, [app]);

      var m = this;

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
        renderMessage: undefined,
      };

      // Extend defaults with modules params
      m.useModulesParams(defaults);

      m.params = Utils.extend(defaults, params);

      var $el = $(params.el).eq(0);
      if ($el.length === 0) { return m; }

      if ($el[0].f7Messages) { return $el[0].f7Messages; }

      $el[0].f7Messages = m;

      var $pageContentEl = $el.closest('.page-content').eq(0);

      Utils.extend(m, {
        messages: m.params.messages,
        $el: $el,
        el: $el[0],
        $pageContentEl: $pageContentEl,
        pageContentEl: $pageContentEl[0],

      });
      // Install Modules
      m.useModules();

      // Init
      m.init();

      return m;
    }

    if ( Framework7Class$$1 ) Messages.__proto__ = Framework7Class$$1;
    Messages.prototype = Object.create( Framework7Class$$1 && Framework7Class$$1.prototype );
    Messages.prototype.constructor = Messages;
    // eslint-disable-next-line
    Messages.prototype.getMessageData = function getMessageData (messageEl) {
      var $messageEl = $(messageEl);
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
        typing: $messageEl.hasClass('message-typing'),
      };
      if (data.isTitle) {
        data.text = $messageEl.html();
      }
      if (data.text && data.textHeader) {
        data.text = data.text.replace(("<div class=\"message-text-header\">" + (data.textHeader) + "</div>"), '');
      }
      if (data.text && data.textFooter) {
        data.text = data.text.replace(("<div class=\"message-text-footer\">" + (data.textFooter) + "</div>"), '');
      }
      var avatar = $messageEl.find('.message-avatar').css('background-image');
      if (avatar === 'none' || avatar === '') { avatar = undefined; }
      if (avatar && typeof avatar === 'string') {
        avatar = avatar.replace('url(', '').replace(')', '').replace(/"/g, '').replace(/'/g, '');
      } else {
        avatar = undefined;
      }
      data.avatar = avatar;

      return data;
    };

    Messages.prototype.getMessagesData = function getMessagesData () {
      var m = this;
      var data = [];
      m.$el.find('.message, .messages-title').each(function (index, messageEl) {
        data.push(m.getMessageData(messageEl));
      });
      return data;
    };

    Messages.prototype.renderMessage = function renderMessage (messageToRender) {
      var m = this;
      var message = Utils.extend({
        type: 'sent',
      }, messageToRender);
      if (m.params.renderMessage) {
        return m.params.renderMessage.call(m, message);
      }
      if (message.isTitle) {
        return ("<div class=\"messages-title\">" + (message.text) + "</div>");
      }
      return ("\n      <div class=\"message message-" + (message.type) + " " + (message.isTyping ? 'message-typing' : '') + "\">\n        " + (message.avatar ? ("\n        <div class=\"message-avatar\" style=\"background-image:url(" + (message.avatar) + ")\"></div>\n        ") : '') + "\n        <div class=\"message-content\">\n          " + (message.name ? ("<div class=\"message-name\">" + (message.name) + "</div>") : '') + "\n          " + (message.header ? ("<div class=\"message-header\">" + (message.header) + "</div>") : '') + "\n          <div class=\"message-bubble\">\n            " + (message.textHeader ? ("<div class=\"message-text-header\">" + (message.textHeader) + "</div>") : '') + "\n            " + (message.image ? ("<div class=\"message-image\">" + (message.image) + "</div>") : '') + "\n            " + (message.imageSrc && !message.image ? ("<div class=\"message-image\"><img src=\"" + (message.imageSrc) + "\"></div>") : '') + "\n            " + (message.text || message.isTyping ? ("<div class=\"message-text\">" + (message.text || '') + (message.isTyping ? '<div class="message-typing-indicator"><div></div><div></div><div></div></div>' : '') + "</div>") : '') + "\n            " + (message.textFooter ? ("<div class=\"message-text-footer\">" + (message.textFooter) + "</div>") : '') + "\n          </div>\n          " + (message.footer ? ("<div class=\"message-footer\">" + (message.footer) + "</div>") : '') + "\n        </div>\n      </div>\n    ");
    };

    Messages.prototype.renderMessages = function renderMessages (messagesToRender, method) {
      if ( messagesToRender === void 0 ) messagesToRender = this.messages;
      if ( method === void 0 ) method = this.params.newMessagesFirst ? 'prepend' : 'append';

      var m = this;
      var html = messagesToRender.map(function (message) { return m.renderMessage(message); }).join('');
      m.$el[method](html);
    };

    Messages.prototype.isFirstMessage = function isFirstMessage () {
      var ref;

      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];
      var m = this;
      if (m.params.firstMessageRule) { return (ref = m.params).firstMessageRule.apply(ref, args); }
      return false;
    };

    Messages.prototype.isLastMessage = function isLastMessage () {
      var ref;

      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];
      var m = this;
      if (m.params.lastMessageRule) { return (ref = m.params).lastMessageRule.apply(ref, args); }
      return false;
    };

    Messages.prototype.isTailMessage = function isTailMessage () {
      var ref;

      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];
      var m = this;
      if (m.params.tailMessageRule) { return (ref = m.params).tailMessageRule.apply(ref, args); }
      return false;
    };

    Messages.prototype.isSameNameMessage = function isSameNameMessage () {
      var ref;

      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];
      var m = this;
      if (m.params.sameNameMessageRule) { return (ref = m.params).sameNameMessageRule.apply(ref, args); }
      return false;
    };

    Messages.prototype.isSameHeaderMessage = function isSameHeaderMessage () {
      var ref;

      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];
      var m = this;
      if (m.params.sameHeaderMessageRule) { return (ref = m.params).sameHeaderMessageRule.apply(ref, args); }
      return false;
    };

    Messages.prototype.isSameFooterMessage = function isSameFooterMessage () {
      var ref;

      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];
      var m = this;
      if (m.params.sameFooterMessageRule) { return (ref = m.params).sameFooterMessageRule.apply(ref, args); }
      return false;
    };

    Messages.prototype.isSameAvatarMessage = function isSameAvatarMessage () {
      var ref;

      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];
      var m = this;
      if (m.params.sameAvatarMessageRule) { return (ref = m.params).sameAvatarMessageRule.apply(ref, args); }
      return false;
    };

    Messages.prototype.isCustomClassMessage = function isCustomClassMessage () {
      var ref;

      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];
      var m = this;
      if (m.params.customClassMessageRule) { return (ref = m.params).customClassMessageRule.apply(ref, args); }
      return undefined;
    };

    Messages.prototype.layout = function layout () {
      var m = this;
      m.$el.find('.message, .messages-title').each(function (index, messageEl) {
        var $messageEl = $(messageEl);
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
    };

    Messages.prototype.clear = function clear () {
      var m = this;
      m.messages = [];
      m.$el.html('');
    };

    Messages.prototype.removeMessage = function removeMessage (messageToRemove, layout) {
      if ( layout === void 0 ) layout = true;

      var m = this;
      // Index or El
      var index;
      var $el;
      if (typeof messageToRemove === 'number') {
        index = messageToRemove;
        $el = m.$el.find('.message, .messages-title').eq(index);
      } else if (m.messages && m.messages.indexOf(messageToRemove) >= 0) {
        index = m.messages.indexOf(messageToRemove);
        $el = m.$el.children().eq(index);
      } else {
        $el = $(messageToRemove);
        index = $el.index();
      }
      if ($el.length === 0) {
        return m;
      }
      $el.remove();
      m.messages.splice(index, 1);
      if (m.params.autoLayout && layout) { m.layout(); }
      return m;
    };

    Messages.prototype.removeMessages = function removeMessages (messagesToRemove, layout) {
      if ( layout === void 0 ) layout = true;

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
        $(messagesToRemove).each(function (index, messageToRemove) {
          m.removeMessage(messageToRemove, false);
        });
      }
      if (m.params.autoLayout && layout) { m.layout(); }
      return m;
    };

    Messages.prototype.addMessage = function addMessage () {
      var assign, assign$1;

      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];
      var m = this;
      var messageToAdd;
      var animate;
      var method;
      if (typeof args[1] === 'boolean') {
        (assign = args, messageToAdd = assign[0], animate = assign[1], method = assign[2]);
      } else {
        (assign$1 = args, messageToAdd = assign$1[0], method = assign$1[1], animate = assign$1[2]);
      }
      if (typeof animate === 'undefined') {
        animate = true;
      }
      if (typeof method === 'undefined') {
        method = m.params.newMessagesFirst ? 'prepend' : 'append';
      }

      return m.addMessages([messageToAdd], animate, method);
    };

    Messages.prototype.addMessages = function addMessages () {
      var assign, assign$1;

      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];
      var m = this;
      var messagesToAdd;
      var animate;
      var method;
      if (typeof args[1] === 'boolean') {
        (assign = args, messagesToAdd = assign[0], animate = assign[1], method = assign[2]);
      } else {
        (assign$1 = args, messagesToAdd = assign$1[0], method = assign$1[1], animate = assign$1[2]);
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
      var typingMessage = m.messages.filter(function (el) { return el.isTyping; })[0];
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
      var $messagesEls = $(messagesHTML);
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
      if (m.params.autoLayout) { m.layout(); }

      if (method === 'prepend' && !typingMessage) {
        m.pageContentEl.scrollTop = scrollBefore + (m.pageContentEl.scrollHeight - scrollHeightBefore);
      }

      if (m.params.scrollMessages && ((method === 'append' && !m.params.newMessagesFirst) || (method === 'prepend' && m.params.newMessagesFirst && !typingMessage))) {
        if (m.params.scrollMessagesOnEdge) {
          var onEdge = false;
          if (m.params.newMessagesFirst && scrollBefore === 0) {
            onEdge = true;
          }
          if (!m.params.newMessagesFirst && (scrollBefore - (scrollHeightBefore - heightBefore) >= -10)) {
            onEdge = true;
          }
          if (onEdge) { m.scroll(animate ? undefined : 0); }
        } else {
          m.scroll(animate ? undefined : 0);
        }
      }

      return m;
    };

    Messages.prototype.showTyping = function showTyping (message) {
      if ( message === void 0 ) message = {};

      var m = this;
      var typingMessage = m.messages.filter(function (el) { return el.isTyping; })[0];
      if (typingMessage) {
        m.removeMessage(m.messages.indexOf(typingMessage));
      }
      m.addMessage(Utils.extend({
        type: 'received',
        isTyping: true,
      }, message));
      return m;
    };

    Messages.prototype.hideTyping = function hideTyping () {
      var m = this;
      var typingMessageIndex;
      var typingFound;
      m.messages.forEach(function (message, index) {
        if (message.isTyping) { typingMessageIndex = index; }
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
    };

    Messages.prototype.scroll = function scroll (duration, scrollTop) {
      if ( duration === void 0 ) duration = 300;

      var m = this;
      var currentScroll = m.pageContentEl.scrollTop;
      var newScrollTop;
      if (typeof scrollTop !== 'undefined') { newScrollTop = scrollTop; }
      else {
        newScrollTop = m.params.newMessagesFirst ? 0 : m.pageContentEl.scrollHeight - m.pageContentEl.offsetHeight;
        if (newScrollTop === currentScroll) { return m; }
      }
      m.$pageContentEl.scrollTop(newScrollTop, duration);
      return m;
    };

    Messages.prototype.init = function init () {
      var m = this;
      if (!m.messages || m.messages.length === 0) {
        m.messages = m.getMessagesData();
      }
      if (m.params.messages && m.params.messages.length) {
        m.renderMessages();
      }
      if (m.params.autoLayout) { m.layout(); }
      if (m.params.scrollMessages) { m.scroll(0); }
    };

    Messages.prototype.destroy = function destroy () {
      var m = this;
      m.emit('local::beforeDestroy messagesBeforeDestroy', m);
      m.$el.trigger('messages:beforedestroy', m);
      if (m.$el[0]) {
        m.$el[0].f7Messages = null;
        delete m.$el[0].f7Messages;
      }
      Utils.deleteProps(m);
    };

    return Messages;
  }(Framework7Class));

  var messages = {
    name: 'messages',
    static: {
      Messages: Messages,
    },
    create: function create() {
      var app = this;
      app.messages = ConstructorMethods({
        defaultSelector: '.messages',
        constructor: Messages,
        app: app,
        domProp: 'f7Messages',
        addMethods: 'renderMessages layout scroll clear removeMessage removeMessages addMessage addMessages'.split(' '),
      });
    },
    on: {
      tabBeforeRemove: function tabBeforeRemove(tabEl) {
        var app = this;
        $(tabEl).find('.messages-init').each(function (index, messagesEl) {
          app.messages.destroy(messagesEl);
        });
      },
      tabMounted: function tabMounted(tabEl) {
        var app = this;
        $(tabEl).find('.messages-init').each(function (index, messagesEl) {
          app.messages.create({ el: messagesEl });
        });
      },
      pageBeforeRemove: function pageBeforeRemove(page) {
        var app = this;
        page.$el.find('.messages-init').each(function (index, messagesEl) {
          app.messages.destroy(messagesEl);
        });
      },
      pageInit: function pageInit(page) {
        var app = this;
        page.$el.find('.messages-init').each(function (index, messagesEl) {
          app.messages.create({ el: messagesEl });
        });
      },
    },
    vnode: {
      'messages-init': {
        insert: function insert(vnode) {
          var app = this;
          var messagesEl = vnode.elm;
          app.messages.create({ el: messagesEl });
        },
        destroy: function destroy(vnode) {
          var app = this;
          var messagesEl = vnode.elm;
          app.messages.destroy(messagesEl);
        },
      },
    },
  };

  return messages;
}
framework7ComponentLoader.componentName = 'messages';

