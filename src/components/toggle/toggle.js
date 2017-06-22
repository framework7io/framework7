import $ from 'dom7';
import Utils from '../../utils/utils';
import Toggle from './toggle-class';

export default {
  name: 'toggle',
  create() {
    const app = this;
    Utils.extend(app, {
      toggle: {
        create(params) {
          return new Toggle(app, params);
        },
        get(el) {
          const $el = $(el);
          if ($el.length) return $el[0].f7Toggle;
          return undefined;
        },
        destroy(el) {
          if (el && (el instanceof Toggle) && el.destroy) return el.destroy();
          const $el = $(el);
          if ($el.length) return $el[0].f7Toggle.destroy();
          return undefined;
        },
      },
    });
  },
  static: {
    Toggle,
  },
  on: {
    tabMounted(tabEl) {
      const app = this;
      $(tabEl).find('label.toggle').each((index, toggleEl) => new Toggle(app, { el: toggleEl }));
    },
    tabBeforeRemove(tabEl) {
      $(tabEl).find('label.toggle').each((index, toggleEl) => {
        if (toggleEl.f7Toggle) toggleEl.f7Toggle.destroy();
      });
    },
    pageInit(page) {
      const app = this;
      page.$el.find('label.toggle').each((index, toggleEl) => new Toggle(app, { el: toggleEl }));
    },
    pageBeforeRemove(page) {
      page.$el.find('label.toggle').each((index, toggleEl) => {
        if (toggleEl.f7Toggle) toggleEl.f7Toggle.destroy();
      });
    },
  },
};
