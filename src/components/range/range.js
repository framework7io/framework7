import $ from 'dom7';
import Range from './range-class';
import Utils from '../../utils/utils';

export default {
  name: 'range',
  create() {
    const app = this;
    Utils.extend(app, {
      range: {
        create(params) {
          return new Range(app, params);
        },
        destroy(el) {
          if (el && (el instanceof Range) && el.destroy) return el.destroy();
          const $el = $(el);
          if ($el.length) return $el[0].f7Range.destroy();
          return undefined;
        },
        get(el) {
          const $el = $(el);
          if ($el.length) return $el[0].f7Range;
          return undefined;
        },
        getValue(el) {
          const $el = $(el);
          if ($el.length) return $el[0].f7Range.get();
          return undefined;
        },
        setValue(el, value) {
          const $el = $(el);
          if ($el.length) return $el[0].f7Range.set(value);
          return undefined;
        },
      },
    });
  },
  static: {
    Range,
  },
  on: {
    tabMounted(tabEl) {
      const app = this;
      $(tabEl).find('.range-slider-init').each((index, rangeEl) => new Range(app, {
        el: rangeEl,
      }));
    },
    tabBeforeRemove(tabEl) {
      $(tabEl).find('.range-slider-init').each((index, rangeEl) => {
        if (rangeEl.f7Range) rangeEl.f7Range.destroy();
      });
    },
    pageInit(page) {
      const app = this;
      page.$el.find('.range-slider-init').each((index, rangeEl) => new Range(app, {
        el: rangeEl,
      }));
    },
    pageBeforeRemove(page) {
      page.$el.find('.range-slider-init').each((index, rangeEl) => {
        if (rangeEl.f7Range) rangeEl.f7Range.destroy();
      });
    },
  },
};
