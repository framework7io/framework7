import $ from 'dom7';
import Utils from '../../utils/utils';
import Framework7Class from '../../utils/class';

class Messages extends Framework7Class {
  constructor(app, params = {}) {
    super(params, [app]);

    const m = this;

    const defaults = {
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

    const $el = $(params.el).eq(0);
    if ($el.length === 0) return m;

    if ($el[0].f7Messages) return $el[0].f7Messages;

    $el[0].f7Messages = m;

    const $pageContentEl = $el.closest('.page-content').eq(0);

    Utils.extend(m, {
      messages: m.params.messages,
      $el,
      el: $el[0],
      $pageContentEl,
      pageContentEl: $pageContentEl[0],

    });
    // Install Modules
    m.useModules();

    // Init
    m.init();

    return m;
  }
  // eslint-disable-next-line
  getMessageData(messageEl) {
    const $messageEl = $(messageEl);
    const data = {
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
      data.text = data.text.replace(`<div class="message-text-header">${data.textHeader}</div>`, '');
    }
    if (data.text && data.textFooter) {
      data.text = data.text.replace(`<div class="message-text-footer">${data.textFooter}</div>`, '');
    }
    let avatar = $messageEl.find('.message-avatar').css('background-image');
    if (avatar === 'none' || avatar === '') avatar = undefined;
    if (avatar && typeof avatar === 'string') {
      avatar = avatar.replace('url(', '').replace(')', '').replace(/"/g, '').replace(/'/g, '');
    } else {
      avatar = undefined;
    }
    data.avatar = avatar;

    return data;
  }

  getMessagesData() {
    const m = this;
    const data = [];
    m.$el.find('.message, .messages-title').each((index, messageEl) => {
      data.push(m.getMessageData(messageEl));
    });
    return data;
  }

  renderMessage(messageToRender) {
    const m = this;
    const message = Utils.extend({
      type: 'sent',
    }, messageToRender);
    if (m.params.renderMessage) {
      return m.params.renderMessage.call(m, message);
    }
    if (message.isTitle) {
      return `<div class="messages-title">${message.text}</div>`;
    }
    return `
      <div class="message message-${message.type} ${message.isTyping ? 'message-typing' : ''}">
        ${message.avatar ? `
        <div class="message-avatar" style="background-image:url(${message.avatar})"></div>
        ` : ''}
        <div class="message-content">
          ${message.name ? `<div class="message-name">${message.name}</div>` : ''}
          ${message.header ? `<div class="message-header">${message.header}</div>` : ''}
          <div class="message-bubble">
            ${message.textHeader ? `<div class="message-text-header">${message.textHeader}</div>` : ''}
            ${message.image ? `<div class="message-image">${message.image}</div>` : ''}
            ${message.imageSrc && !message.image ? `<div class="message-image"><img src="${message.imageSrc}"></div>` : ''}
            ${message.text || message.isTyping ? `<div class="message-text">${message.text || ''}${message.isTyping ? '<div class="message-typing-indicator"><div></div><div></div><div></div></div>' : ''}</div>` : ''}
            ${message.textFooter ? `<div class="message-text-footer">${message.textFooter}</div>` : ''}
          </div>
          ${message.footer ? `<div class="message-footer">${message.footer}</div>` : ''}
        </div>
      </div>
    `;
  }

  renderMessages(messagesToRender = this.messages, method = this.params.newMessagesFirst ? 'prepend' : 'append') {
    const m = this;
    const html = messagesToRender.map(message => m.renderMessage(message)).join('');
    m.$el[method](html);
  }

  isFirstMessage(...args) {
    const m = this;
    if (m.params.firstMessageRule) return m.params.firstMessageRule(...args);
    return false;
  }

  isLastMessage(...args) {
    const m = this;
    if (m.params.lastMessageRule) return m.params.lastMessageRule(...args);
    return false;
  }

  isTailMessage(...args) {
    const m = this;
    if (m.params.tailMessageRule) return m.params.tailMessageRule(...args);
    return false;
  }

  isSameNameMessage(...args) {
    const m = this;
    if (m.params.sameNameMessageRule) return m.params.sameNameMessageRule(...args);
    return false;
  }

  isSameHeaderMessage(...args) {
    const m = this;
    if (m.params.sameHeaderMessageRule) return m.params.sameHeaderMessageRule(...args);
    return false;
  }

  isSameFooterMessage(...args) {
    const m = this;
    if (m.params.sameFooterMessageRule) return m.params.sameFooterMessageRule(...args);
    return false;
  }

  isSameAvatarMessage(...args) {
    const m = this;
    if (m.params.sameAvatarMessageRule) return m.params.sameAvatarMessageRule(...args);
    return false;
  }

  isCustomClassMessage(...args) {
    const m = this;
    if (m.params.customClassMessageRule) return m.params.customClassMessageRule(...args);
    return undefined;
  }

  layout() {
    const m = this;
    m.$el.find('.message, .messages-title').each((index, messageEl) => {
      const $messageEl = $(messageEl);
      if (!m.messages) {
        m.messages = m.getMessagesData();
      }
      const classes = [];
      const message = m.messages[index];
      const previousMessage = m.messages[index - 1];
      const nextMessage = m.messages[index + 1];
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
      let customMessageClasses = m.isCustomClassMessage(message, previousMessage, nextMessage);
      if (customMessageClasses && customMessageClasses.length) {
        if (typeof customMessageClasses === 'string') {
          customMessageClasses = customMessageClasses.split(' ');
        }
        customMessageClasses.forEach((customClass) => {
          classes.push(customClass);
        });
      }
      $messageEl.removeClass('message-first message-last message-tail message-same-name message-same-header message-same-footer message-same-avatar');
      classes.forEach((className) => {
        $messageEl.addClass(className);
      });
    });
  }

  clear() {
    const m = this;
    m.messages = [];
    m.$el.html('');
  }

  removeMessage(messageToRemove, layout = true) {
    const m = this;
    // Index or El
    let index;
    let $el;
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
    if (m.params.autoLayout && layout) m.layout();
    return m;
  }

  removeMessages(messagesToRemove, layout = true) {
    const m = this;
    if (Array.isArray(messagesToRemove)) {
      const messagesToRemoveEls = [];
      messagesToRemove.forEach((messageToRemoveIndex) => {
        messagesToRemoveEls.push(m.$el.find('.message, .messages-title').eq(messageToRemoveIndex));
      });
      messagesToRemoveEls.forEach((messageToRemove) => {
        m.removeMessage(messageToRemove, false);
      });
    } else {
      $(messagesToRemove).each((index, messageToRemove) => {
        m.removeMessage(messageToRemove, false);
      });
    }
    if (m.params.autoLayout && layout) m.layout();
    return m;
  }

  addMessage(...args) {
    const m = this;
    let messageToAdd;
    let animate;
    let method;
    if (typeof args[1] === 'boolean') {
      [messageToAdd, animate, method] = args;
    } else {
      [messageToAdd, method, animate] = args;
    }
    if (typeof animate === 'undefined') {
      animate = true;
    }
    if (typeof method === 'undefined') {
      method = m.params.newMessagesFirst ? 'prepend' : 'append';
    }

    return m.addMessages([messageToAdd], animate, method);
  }

  addMessages(...args) {
    const m = this;
    let messagesToAdd;
    let animate;
    let method;
    if (typeof args[1] === 'boolean') {
      [messagesToAdd, animate, method] = args;
    } else {
      [messagesToAdd, method, animate] = args;
    }
    if (typeof animate === 'undefined') {
      animate = true;
    }
    if (typeof method === 'undefined') {
      method = m.params.newMessagesFirst ? 'prepend' : 'append';
    }

    // Define scroll positions before new messages added
    const scrollHeightBefore = m.pageContentEl.scrollHeight;
    const heightBefore = m.pageContentEl.offsetHeight;
    const scrollBefore = m.pageContentEl.scrollTop;

    // Add message to DOM and data
    let messagesHTML = '';
    const typingMessage = m.messages.filter(el => el.isTyping)[0];
    messagesToAdd.forEach((messageToAdd) => {
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
    const $messagesEls = $(messagesHTML);
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

    if (m.params.scrollMessages && ((method === 'append' && !m.params.newMessagesFirst) || (method === 'prepend' && m.params.newMessagesFirst && !typingMessage))) {
      if (m.params.scrollMessagesOnEdge) {
        let onEdge = false;
        if (m.params.newMessagesFirst && scrollBefore === 0) {
          onEdge = true;
        }
        if (!m.params.newMessagesFirst && (scrollBefore - (scrollHeightBefore - heightBefore) >= -10)) {
          onEdge = true;
        }
        if (onEdge) m.scroll(animate ? undefined : 0);
      } else {
        m.scroll(animate ? undefined : 0);
      }
    }

    return m;
  }

  showTyping(message = {}) {
    const m = this;
    const typingMessage = m.messages.filter(el => el.isTyping)[0];
    if (typingMessage) {
      m.removeMessage(m.messages.indexOf(typingMessage));
    }
    m.addMessage(Utils.extend({
      type: 'received',
      isTyping: true,
    }, message));
    return m;
  }

  hideTyping() {
    const m = this;
    let typingMessageIndex;
    let typingFound;
    m.messages.forEach((message, index) => {
      if (message.isTyping) typingMessageIndex = index;
    });
    if (typeof typingMessageIndex !== 'undefined') {
      if (m.$el.find('.message').eq(typingMessageIndex).hasClass('message-typing')) {
        typingFound = true;
        m.removeMessage(typingMessageIndex);
      }
    }
    if (!typingFound) {
      const $typingMessageEl = m.$el.find('.message-typing');
      if ($typingMessageEl.length) {
        m.removeMessage($typingMessageEl);
      }
    }
    return m;
  }

  scroll(duration = 300, scrollTop) {
    const m = this;
    const currentScroll = m.pageContentEl.scrollTop;
    let newScrollTop;
    if (typeof scrollTop !== 'undefined') newScrollTop = scrollTop;
    else {
      newScrollTop = m.params.newMessagesFirst ? 0 : m.pageContentEl.scrollHeight - m.pageContentEl.offsetHeight;
      if (newScrollTop === currentScroll) return m;
    }
    m.$pageContentEl.scrollTop(newScrollTop, duration);
    return m;
  }

  init() {
    const m = this;
    if (!m.messages || m.messages.length === 0) {
      m.messages = m.getMessagesData();
    }
    if (m.params.messages && m.params.messages.length) {
      m.renderMessages();
    }
    if (m.params.autoLayout) m.layout();
    if (m.params.scrollMessages) m.scroll(0);
  }

  destroy() {
    const m = this;
    m.emit('local::beforeDestroy messagesBeforeDestroy', m);
    m.$el.trigger('messages:beforedestroy', m);
    if (m.$el[0]) {
      m.$el[0].f7Messages = null;
      delete m.$el[0].f7Messages;
    }
    Utils.deleteProps(m);
  }
}

export default Messages;
