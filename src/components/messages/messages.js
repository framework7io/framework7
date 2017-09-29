import $ from 'dom7';
import Messages from './messages-class';
import ConstructorMethods from '../../utils/constructor-methods';

export default {
  name: 'messages',
  static: {
    Messages,
  },
  create() {
    const app = this;
    app.messages = ConstructorMethods({
      defaultSelector: '.messages',
      constructor: Messages,
      app,
      domProp: 'f7Messages',
      addMethods: 'renderMessages layout scroll clear removeMessage removeMessages addMessage addMessages'.split(' '),
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
