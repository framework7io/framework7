import $ from 'dom7';
import Utils from '../../utils/utils';
import Range from './range-class';
import ConstructorMethods from '../../utils/constructor-methods';

export default {
  name: 'range',
  create() {
    const app = this;
    app.range = Utils.extend(
      ConstructorMethods({
        defaultSelector: '.range-slider',
        constructor: Range,
        app,
        domProp: 'f7Range',
      }),
      {
        getValue(el = '.range-slider') {
          const range = app.range.get(el);
          if (range) return range.getValue();
          return undefined;
        },
        setValue(el = '.range-slider', value) {
          const range = app.range.get(el);
          if (range) return range.setValue(value);
          return undefined;
        },
      }
    );
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
