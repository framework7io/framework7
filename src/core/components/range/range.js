import $ from '../../shared/dom7.js';
import { extend } from '../../shared/utils.js';
import Range from './range-class.js';
import ConstructorMethods from '../../shared/constructor-methods.js';

export default {
  name: 'range',
  create() {
    const app = this;
    app.range = extend(
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
      },
    );
  },
  static: {
    Range,
  },
  on: {
    tabMounted(tabEl) {
      const app = this;
      $(tabEl)
        .find('.range-slider-init')
        .each(
          (rangeEl) =>
            new Range(app, {
              el: rangeEl,
            }),
        );
    },
    tabBeforeRemove(tabEl) {
      $(tabEl)
        .find('.range-slider-init')
        .each((rangeEl) => {
          if (rangeEl.f7Range) rangeEl.f7Range.destroy();
        });
    },
    pageInit(page) {
      const app = this;
      page.$el.find('.range-slider-init').each(
        (rangeEl) =>
          new Range(app, {
            el: rangeEl,
          }),
      );
    },
    pageBeforeRemove(page) {
      page.$el.find('.range-slider-init').each((rangeEl) => {
        if (rangeEl.f7Range) rangeEl.f7Range.destroy();
      });
    },
  },
  vnode: {
    'range-slider-init': {
      insert(vnode) {
        const rangeEl = vnode.elm;
        const app = this;
        app.range.create({ el: rangeEl });
      },
      destroy(vnode) {
        const rangeEl = vnode.elm;
        if (rangeEl.f7Range) rangeEl.f7Range.destroy();
      },
    },
  },
};
