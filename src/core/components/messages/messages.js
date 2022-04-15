import $ from '../../shared/dom7.js';
import Messages from './messages-class.js';
import ConstructorMethods from '../../shared/constructor-methods.js';

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
      addMethods:
        'renderMessages layout scroll clear removeMessage removeMessages addMessage addMessages'.split(
          ' ',
        ),
    });
  },
  on: {
    tabBeforeRemove(tabEl) {
      const app = this;
      $(tabEl)
        .find('.messages-init')
        .each((messagesEl) => {
          app.messages.destroy(messagesEl);
        });
    },
    tabMounted(tabEl) {
      const app = this;
      $(tabEl)
        .find('.messages-init')
        .each((messagesEl) => {
          app.messages.create({ el: messagesEl });
        });
    },
    pageBeforeRemove(page) {
      const app = this;
      page.$el.find('.messages-init').each((messagesEl) => {
        app.messages.destroy(messagesEl);
      });
    },
    pageInit(page) {
      const app = this;
      page.$el.find('.messages-init').each((messagesEl) => {
        app.messages.create({ el: messagesEl });
      });
    },
  },
  vnode: {
    'messages-init': {
      insert(vnode) {
        const app = this;
        const messagesEl = vnode.elm;
        app.messages.create({ el: messagesEl });
      },
      destroy(vnode) {
        const app = this;
        const messagesEl = vnode.elm;
        app.messages.destroy(messagesEl);
      },
    },
  },
};
