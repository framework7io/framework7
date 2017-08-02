import $ from 'dom7';
import Utils from '../../utils/utils';
import Messages from './messages-class';

export default {
  name: 'messages',
  static: {
    Messages,
  },
  create() {
    const app = this;
    const messages = {
      create(params) {
        return new Messages(app, params);
      },
      get(messagesEl) {
        const $messagesEl = $(messagesEl);
        if ($messagesEl.length && $messagesEl[0].f7Messages) {
          return $messagesEl[0].f7Messages;
        }
        return undefined;
      },
    };
    ('renderMessages layout scroll clear removeMessage removeMessages addMessage addMessages destroy').split(' ').forEach((messagesMethod) => {
      messages[messagesMethod] = (messagesEl = '.messages', ...args) => {
        const m = app.messages.get(messagesEl);
        if (m) return m[messagesMethod](...args);
        return undefined;
      };
    });
    Utils.extend(app, {
      messages,
    });
  },
  on: {
    tabBeforeRemove(tabEl) {
      const app = this;
      $(tabEl).find('.messages-init').each((index, messagesEl) => {
        app.messages.destroy(messagesEl);
      });
    },
    tabMounted(tabEl) {
      const app = this;
      $(tabEl).find('.messages-init').each((index, messagesEl) => {
        app.messages.create({ el: messagesEl });
      });
    },
    pageBeforeRemove(page) {
      const app = this;
      page.$el.find('.messages-init').each((index, messagesEl) => {
        app.messages.destroy(messagesEl);
      });
    },
    pageInit(page) {
      const app = this;
      page.$el.find('.messages-init').each((index, messagesEl) => {
        app.messages.create({ el: messagesEl });
      });
    },
  },
  clicks: {

  },
};
