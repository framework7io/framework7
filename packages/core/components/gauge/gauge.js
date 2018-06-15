import $ from 'dom7';
import Gauge from './gauge-class';
import ConstructorMethods from '../../utils/constructor-methods';
import Utils from '../../utils/utils';

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
      $(tabEl).find('.gauge-init').each((index, el) => {
        app.gauge.create(Utils.extend({ el }, $(el).dataset() || {}));
      });
    },
    tabBeforeRemove(tabEl) {
      $(tabEl).find('.gauge-init').each((index, el) => {
        if (el.f7Gauge) el.f7Gauge.destroy();
      });
    },
    pageInit(page) {
      const app = this;
      page.$el.find('.gauge-init').each((index, el) => {
        app.gauge.create(Utils.extend({ el }, $(el).dataset() || {}));
      });
    },
    pageBeforeRemove(page) {
      page.$el.find('.gauge-init').each((index, el) => {
        if (el.f7Gauge) el.f7Gauge.destroy();
      });
    },
  },
};
