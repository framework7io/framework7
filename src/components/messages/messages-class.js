import $ from 'dom7';
import Utils from '../../utils/utils';
import Framework7Class from '../../utils/class';

/*
message-first firstMessageRule
- Visible Header
- Hidden avatar

message-last lastMessageRule
- Visible Avatar
- Hidden Header

message-with-tail tailMessageRule
- Visible tail

message-same-name sameNameMessageRule
- Hidden name

message-same-header sameHeaderMessageRule
- Hidden header

message-same-footer sameFooterMessageRule
- Hidden footer

message-same-avatar sameAvatarMessageRule
- Hidden avatar

message-custom-rule customClassMessageRule(message, previous, next)
*/

class Messages extends Framework7Class {
  constructor(app, params = {}) {
    super(params, [app]);

    const messages = this;

    const defaults = {
      autoLayout: true,
      messages: [],
      newMessagesFirst: false,
      scrollMessage: true,
      scrollMessageOnEdge: false,
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
    messages.useInstanceModulesParams(defaults);

    messages.params = Utils.extend(defaults, params);

    const $el = $(params.el).eq(0);
    if ($el.length === 0) return;

    $el[0].f7Messages = messages;

    Utils.extend(messages, {
      messages: messages.params.messages,
      $el,
      el: $el[0],
    });
    // Install Modules
    messages.useInstanceModules();

    // Init
    messages.init();

    return messages;
  }
  getMessageData(messageEl) {
    const messages = this;
    const $messageEl = $(messageEl);
    const data = {
      avatar: $messageEl.css('background-image'),
      name: $messageEl.find('.message-name').html(),
      header: $messageEl.find('.message-header').html(),
      textHeader: $messageEl.find('.message-text-header').html(),
      textFooter: $messageEl.find('.message-text-footer').html(),
      footer: $messageEl.find('.message-footer').html(),
      isTitle: $messageEl.hasClass('messages-title'),
      type: $messageEl.hasClass('message-sent') ? 'sent' : 'received',
      text: $messageEl.find('.message-text').html(),
      image: $messageEl.find('.message-text img').attr('src'),
    };
    if (data.text && data.textHeader) {
      data.text = data.text.replace(`<div class="message-text-header">${data.textHeader}</div>`, '');
    }
    if (data.text && data.textFooter) {
      data.text = data.text.replace(`<div class="message-text-footer">${data.textFooter}</div>`, '');
    }
    let avatar = $messageEl.css('background-image');
    if (avatar === 'none' || avatar === '') avatar = undefined;
    data.avatar = avatar;

    return data;
  }
  getMessagesData() {
    const messages = this;
    const data = [];
    messages.$el.find('.message, .messages-title').each((index, messageEl) => {
      data.push(messages.getMessageData(messageEl));
    });
    return data;
  }
  renderMessage(message) {
    const messages = this;
    if (messages.params.renderMessage) {
      return messages.params.renderMessage(message);
    }
    if (message.isTitle) {
      return `<div class="messages-title">${message.text}</div>`;
    }
    return `
      <div class="messages ${message.type}">
        ${message.avatar ? `
        <div class="message-avatar" style="background-image:url(${message.avatar})"></div>
        ` : ''}
        <div class="message-content">
          ${message.name ? `<div class="message-header">${message.name}</div>` : ''}
          ${message.header ? `<div class="message-header">${message.header}</div>` : ''}
          <div class="message-bubble">
            ${message.textHeader ? `<div class="message-text-header">${message.textHeader}</div>` : ''}
            ${message.image ? `<div class="message-image"><img src="${message.image}"></div>` : ''}
            ${message.text ? `<div class="message-text">${message.text}</div>` : ''}
            ${message.textFooter ? `<div class="message-text-footer">${message.textFooter}</div>` : ''}
          </div>
          ${message.footer ? `<div class="message-footer">${message.footer}</div>` : ''}
        </div>
      </div>
    `;
  }
  renderMessages() {
    const messages = this;
    const html = messages.messages.map(message => messages.renderMessage(message)).join('');
    messages.$el.append(html);
  }
  scroll() {

  }
  isFirstMessage(...args) {
    const messages = this;
    if (messages.params.firstMessageRule) return messages.params.firstMessageRule(...args);
    return false;
  }
  isLastMessage(...args) {
    const messages = this;
    if (messages.params.lastMessageRule) return messages.params.lastMessageRule(...args);
    return false;
  }
  isTailMessage(...args) {
    const messages = this;
    if (messages.params.tailMessageRule) return messages.params.tailMessageRule(...args);
    return false;
  }
  isSameNameMessage(...args) {
    const messages = this;
    if (messages.params.sameNameMessageRule) return messages.params.sameNameMessageRule(...args);
    return false;
  }
  isSameHeaderMessage(...args) {
    const messages = this;
    if (messages.params.sameHeaderMessageRule) return messages.params.sameHeaderMessageRule(...args);
    return false;
  }
  isSameFooterMessage(...args) {
    const messages = this;
    if (messages.params.sameFooterMessageRule) return messages.params.sameFooterMessageRule(...args);
    return false;
  }
  isSameAvatarMessage(...args) {
    const messages = this;
    if (messages.params.sameAvatarMessageRule) return messages.params.sameAvatarMessageRule(...args);
    return false;
  }
  isCustomClassMessage(...args) {
    const messages = this;
    if (messages.params.customClassMessageRule) return messages.params.customClassMessageRule(...args);
    return undefined;
  }
  layout() {
    const messages = this;
    messages.$el.find('.message, .messages-title').each((index, messageEl) => {
      const $messageEl = $(messageEl);
      if (!messages.messages) {
        messages.messages = messages.getMessagesData();
      }
      const classes = [];
      const message = messages.messages[index];
      const previousMessage = messages.messages[index - 1];
      const nextMessage = messages.messages[index + 1];
      if (messages.isFirstMessage(message, previousMessage, nextMessage)) {
        classes.push('message-first');
      }
      if (messages.isLastMessage(message, previousMessage, nextMessage)) {
        classes.push('message-last');
      }
      if (messages.isTailMessage(message, previousMessage, nextMessage)) {
        classes.push('message-tail');
      }
      if (messages.isSameNameMessage(message, previousMessage, nextMessage)) {
        classes.push('message-same-name');
      }
      if (messages.isSameHeaderMessage(message, previousMessage, nextMessage)) {
        classes.push('message-same-header');
      }
      if (messages.isSameFooterMessage(message, previousMessage, nextMessage)) {
        classes.push('message-same-footer');
      }
      if (messages.isSameAvatarMessage(message, previousMessage, nextMessage)) {
        classes.push('message-same-avatar');
      }
      let customMessageClasses = messages.isCustomClassMessage(message, previousMessage, nextMessage);
      if (customMessageClasses && customMessageClasses.length) {
        if (typeof customMessageClasses === 'string') {
          customMessageClasses = customMessageClasses.split(' ');
        }
        customMessageClasses.forEach((customClass) => {
          classes.push(customClass);
        });
      }
      classes.forEach((className) => {
        $messageEl.addClass(className);
      });
    });
  }
  init() {
    const messages = this;
    if (!messages.messages || messages.messages.length === 0) {
      messages.messages = messages.getMessagesData();
    }
    if (messages.params.messages && messages.params.messages.length) {
      messages.renderMessages();
    }
    if (messages.params.autoLayout) messages.layout();
  }
  destroy() {
    const messages = this;
    messages.$el[0].f7Messages = null;
    delete messages.$el[0].f7Messages;
    Utils.deleteProps(messages);
  }
}

export default Messages;
