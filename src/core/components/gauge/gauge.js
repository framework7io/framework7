import $ from '../../shared/dom7.js';
import Gauge from './gauge-class.js';
import ConstructorMethods from '../../shared/constructor-methods.js';
import { extend } from '../../shared/utils.js';

export default {
  name: 'gauge',
  static: {
    Gauge,
  },
  create() {
    const app = this;
    app.gauge = ConstructorMethods({
      defaultSelector: '.gauge',
      constructor: Gauge,
      app,
      domProp: 'f7Gauge',
    });
    app.gauge.update = function update(el, newParams) {
      const $el = $(el);
      if ($el.length === 0) return undefined;
      const gauge = app.gauge.get(el);
      if (!gauge) return undefined;
      gauge.update(newParams);
      return gauge;
    };
  },
  params: {
    gauge: {
      el: null,
      type: 'circle',
      value: 0,
      size: 200,
      bgColor: 'transparent',
      borderBgColor: '#eeeeee',
      borderColor: '#000000',
      borderWidth: 10,
      valueText: null,
      valueTextColor: '#000000',
      valueFontSize: 31,
      valueFontWeight: 500,
      labelText: null,
      labelTextColor: '#888888',
      labelFontSize: 14,
      labelFontWeight: 400,
    },
  },
  on: {
    tabMounted(tabEl) {
      const app = this;
      $(tabEl)
        .find('.gauge-init')
        .each((el) => {
          app.gauge.create(extend({ el }, $(el).dataset() || {}));
        });
    },
    tabBeforeRemove(tabEl) {
      $(tabEl)
        .find('.gauge-init')
        .each((el) => {
          if (el.f7Gauge) el.f7Gauge.destroy();
        });
    },
    pageInit(page) {
      const app = this;
      page.$el.find('.gauge-init').each((el) => {
        app.gauge.create(extend({ el }, $(el).dataset() || {}));
      });
    },
    pageBeforeRemove(page) {
      page.$el.find('.gauge-init').each((el) => {
        if (el.f7Gauge) el.f7Gauge.destroy();
      });
    },
  },
  vnode: {
    'gauge-init': {
      insert(vnode) {
        const app = this;
        const el = vnode.elm;
        app.gauge.create(extend({ el }, $(el).dataset() || {}));
      },
      destroy(vnode) {
        const el = vnode.elm;
        if (el.f7Gauge) el.f7Gauge.destroy();
      },
    },
  },
};
