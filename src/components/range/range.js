import $ from 'dom7';
import Range from './range-class';
import Utils from '../../utils/utils';

export default {
  name: 'range',
  create() {
    const app = this;
    Utils.extend(app, {
      create(params) {
        return new Range(app, params);
      },
      destroy(el) {
        const $el = $(el);
        if ($el.length) return $el[0].f7Range.destroy();
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
    });
  },
  static: {
    Range,
  },
  on: {
    tabAttached(tabEl) {
      $(tabEl).find('.range-slider-init').each((index, rangeEl) => {
        if (rangeEl.f7Range) rangeEl.f7Range.destroy();
      });
    },
    tabBeforeRemove(tabEl) {
      const app = this;
      $(tabEl).find('.range-slider-init').each((index, rangeEl) => new Range(app, {
        el: rangeEl,
      }));
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
