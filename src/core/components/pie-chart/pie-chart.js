import $ from '../../shared/dom7.js';
import PieChart from './pie-chart-class.js';
import ConstructorMethods from '../../shared/constructor-methods.js';

export default {
  name: 'pieChart',
  params: {
    pieChart: {
      el: null,
      datasets: [],
      size: 320,
      tooltip: false,
      formatTooltip: null,
    },
  },
  create() {
    const app = this;
    app.pieChart = ConstructorMethods({
      defaultSelector: '.pie-chart',
      constructor: PieChart,
      app,
      domProp: 'f7PieChart',
    });
    app.pieChart.update = function update(el, newParams) {
      const $el = $(el);
      if ($el.length === 0) return undefined;
      const pieChart = app.pieChart.get(el);
      if (!pieChart) return undefined;
      pieChart.update(newParams);
      return pieChart;
    };
  },
};
