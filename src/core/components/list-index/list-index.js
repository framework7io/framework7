import $ from '../../shared/dom7.js';
import { extend } from '../../shared/utils.js';
import ListIndex from './list-index-class.js';
import ConstructorMethods from '../../shared/constructor-methods.js';

export default {
  name: 'listIndex',
  static: {
    ListIndex,
  },
  create() {
    const app = this;
    app.listIndex = ConstructorMethods({
      defaultSelector: '.list-index',
      constructor: ListIndex,
      app,
      domProp: 'f7ListIndex',
    });
  },
  on: {
    tabMounted(tabEl) {
      const app = this;
      $(tabEl)
        .find('.list-index-init')
        .each((listIndexEl) => {
          const params = extend($(listIndexEl).dataset(), { el: listIndexEl });
          app.listIndex.create(params);
        });
    },
    tabBeforeRemove(tabEl) {
      $(tabEl)
        .find('.list-index-init')
        .each((listIndexEl) => {
          if (listIndexEl.f7ListIndex) listIndexEl.f7ListIndex.destroy();
        });
    },
    pageInit(page) {
      const app = this;
      page.$el.find('.list-index-init').each((listIndexEl) => {
        const params = extend($(listIndexEl).dataset(), { el: listIndexEl });
        app.listIndex.create(params);
      });
    },
    pageBeforeRemove(page) {
      page.$el.find('.list-index-init').each((listIndexEl) => {
        if (listIndexEl.f7ListIndex) listIndexEl.f7ListIndex.destroy();
      });
    },
  },
  vnode: {
    'list-index-init': {
      insert(vnode) {
        const app = this;
        const listIndexEl = vnode.elm;
        const params = extend($(listIndexEl).dataset(), { el: listIndexEl });
        app.listIndex.create(params);
      },
      destroy(vnode) {
        const listIndexEl = vnode.elm;
        if (listIndexEl.f7ListIndex) listIndexEl.f7ListIndex.destroy();
      },
    },
  },
};
