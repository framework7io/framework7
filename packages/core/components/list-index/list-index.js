import $ from 'dom7';
import Utils from '../../utils/utils';
import ListIndex from './list-index-class';
import ConstructorMethods from '../../utils/constructor-methods';

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
      $(tabEl).find('.list-index-init').each((index, listIndexEl) => {
        const params = Utils.extend($(listIndexEl).dataset(), { el: listIndexEl });
        app.listIndex.create(params);
      });
    },
    tabBeforeRemove(tabEl) {
      $(tabEl).find('.list-index-init').each((index, listIndexEl) => {
        if (listIndexEl.f7ListIndex) listIndexEl.f7ListIndex.destroy();
      });
    },
    pageInit(page) {
      const app = this;
      page.$el.find('.list-index-init').each((index, listIndexEl) => {
        const params = Utils.extend($(listIndexEl).dataset(), { el: listIndexEl });
        app.listIndex.create(params);
      });
    },
    pageBeforeRemove(page) {
      page.$el.find('.list-index-init').each((index, listIndexEl) => {
        if (listIndexEl.f7ListIndex) listIndexEl.f7ListIndex.destroy();
      });
    },
  },
};
