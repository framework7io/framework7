import $ from 'dom7';
import Utils from '../../utils/utils';
import PullToRefresh from './pull-to-refresh-class';
import ConstructorMethods from '../../utils/constructor-methods';

export default {
  name: 'pullToRefresh',
  create() {
    const app = this;
    app.ptr = Utils.extend(
      ConstructorMethods({
        defaultSelector: '.ptr-content',
        constructor: PullToRefresh,
        app,
        domProp: 'f7PullToRefresh',
      }),
      {
        done(el) {
          const ptr = app.ptr.get(el);
          if (ptr) return ptr.done();
          return undefined;
        },
        refresh(el) {
          const ptr = app.ptr.get(el);
          if (ptr) return ptr.refresh();
          return undefined;
        },
      }
    );
  },
  static: {
    PullToRefresh,
  },
  on: {
    tabMounted(tabEl) {
      const app = this;
      const $tabEl = $(tabEl);
      $tabEl.find('.ptr-content').each((index, el) => {
        app.ptr.create(el);
      });
    },
    tabBeforeRemove(tabEl) {
      const $tabEl = $(tabEl);
      const app = this;
      $tabEl.find('.ptr-content').each((index, el) => {
        app.ptr.destroy(el);
      });
    },
    pageInit(page) {
      const app = this;
      page.$el.find('.ptr-content').each((index, el) => {
        app.ptr.create(el);
      });
    },
    pageBeforeRemove(page) {
      const app = this;
      page.$el.find('.ptr-content').each((index, el) => {
        app.ptr.destroy(el);
      });
    },
  },
};
