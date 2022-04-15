import $ from '../../shared/dom7.js';
import { extend } from '../../shared/utils.js';
import Messagebar from './messagebar-class.js';
import ConstructorMethods from '../../shared/constructor-methods.js';

export default {
  name: 'messagebar',
  static: {
    Messagebar,
  },
  create() {
    const app = this;
    app.messagebar = ConstructorMethods({
      defaultSelector: '.messagebar',
      constructor: Messagebar,
      app,
      domProp: 'f7Messagebar',
      addMethods:
        'clear getValue setValue setPlaceholder resizePage focus blur attachmentsCreate attachmentsShow attachmentsHide attachmentsToggle renderAttachments sheetCreate sheetShow sheetHide sheetToggle'.split(
          ' ',
        ),
    });
  },
  on: {
    tabBeforeRemove(tabEl) {
      const app = this;
      $(tabEl)
        .find('.messagebar-init')
        .each((messagebarEl) => {
          app.messagebar.destroy(messagebarEl);
        });
    },
    tabMounted(tabEl) {
      const app = this;
      $(tabEl)
        .find('.messagebar-init')
        .each((messagebarEl) => {
          app.messagebar.create(extend({ el: messagebarEl }, $(messagebarEl).dataset()));
        });
    },
    pageBeforeRemove(page) {
      const app = this;
      page.$el.find('.messagebar-init').each((messagebarEl) => {
        app.messagebar.destroy(messagebarEl);
      });
    },
    pageInit(page) {
      const app = this;
      page.$el.find('.messagebar-init').each((messagebarEl) => {
        app.messagebar.create(extend({ el: messagebarEl }, $(messagebarEl).dataset()));
      });
    },
  },
  vnode: {
    'messagebar-init': {
      insert(vnode) {
        const app = this;
        const messagebarEl = vnode.elm;
        app.messagebar.create(extend({ el: messagebarEl }, $(messagebarEl).dataset()));
      },
      destroy(vnode) {
        const app = this;
        const messagebarEl = vnode.elm;
        app.messagebar.destroy(messagebarEl);
      },
    },
  },
};
