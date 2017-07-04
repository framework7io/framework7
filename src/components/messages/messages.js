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
    Utils.extend(app, {
      messages: {
        create(params) {
          return new Messages(app, params);
        },
        destroy(messagesEl) {
          const $messagesEl = $(messagesEl);
          if (!$messagesEl.length) return undefined;
          const messages = $messagesEl[0].f7Messages;
          if (!messages) return undefined;
          return messages.destroy();
        },
      },
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
