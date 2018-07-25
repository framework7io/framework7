import $ from 'dom7';
import Utils from '../../utils/utils';
import Messagebar from './messagebar-class';
import ConstructorMethods from '../../utils/constructor-methods';

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
      addMethods: 'clear getValue setValue setPlaceholder resizePage focus blur attachmentsCreate attachmentsShow attachmentsHide attachmentsToggle renderAttachments sheetCreate sheetShow sheetHide sheetToggle'.split(' '),
    });
  },
  on: {
    tabBeforeRemove(tabEl) {
      const app = this;
      $(tabEl).find('.messagebar-init').each((index, messagebarEl) => {
        app.messagebar.destroy(messagebarEl);
      });
    },
    tabMounted(tabEl) {
      const app = this;
      $(tabEl).find('.messagebar-init').each((index, messagebarEl) => {
        app.messagebar.create(Utils.extend({ el: messagebarEl }, $(messagebarEl).dataset()));
      });
    },
    pageBeforeRemove(page) {
      const app = this;
      page.$el.find('.messagebar-init').each((index, messagebarEl) => {
        app.messagebar.destroy(messagebarEl);
      });
    },
    pageInit(page) {
      const app = this;
      page.$el.find('.messagebar-init').each((index, messagebarEl) => {
        app.messagebar.create(Utils.extend({ el: messagebarEl }, $(messagebarEl).dataset()));
      });
    },
  },
  vnode: {
    'messagebar-init': {
      insert(vnode) {
        const app = this;
        const messagebarEl = vnode.elm;
        app.messagebar.create(Utils.extend({ el: messagebarEl }, $(messagebarEl).dataset()));
      },
      destroy(vnode) {
        const app = this;
        const messagebarEl = vnode.elm;
        app.messagebar.destroy(messagebarEl);
      },
    },
  },
};
