import $ from 'dom7';
import Utils from '../../utils/utils';
import PullToRefresh from './pull-to-refresh-class';

export default {
  name: 'pullToRefresh',
  create() {
    const app = this;
    Utils.extend(app, {
      ptr: {
        create(el) {
          const $el = $(el);
          if (!$el.length) return undefined;
          if ($el[0].f7PullToRefresh) {
            return $el[0].f7PullToRefresh;
          }
          return new PullToRefresh(app, el);
        },
        destroy(el) {
          const $el = $(el);
          if (!$el.length) return undefined;
          if ($el[0].f7PullToRefresh) {
            $el[0].f7PullToRefresh.destroy();
          }
          return undefined;
        },
        done(el) {
          const $el = $(el);
          if (!$el.length) return undefined;
          if ($el[0].f7PullToRefresh) {
            return $el[0].f7PullToRefresh.done();
          }
          return undefined;
        },
        refresh(el) {
          const $el = $(el);
          if (!$el.length) return undefined;
          if ($el[0].f7PullToRefresh) {
            return $el[0].f7PullToRefresh.refresh();
          }
          return undefined;
        },
      },
    });
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
