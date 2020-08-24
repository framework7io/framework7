import $ from '../../shared/dom7';
import { extend, deleteProps } from '../../shared/utils';
import Framework7Class from '../../shared/class';

class PieChart extends Framework7Class {
  constructor(app, params = {}) {
    super(params, [app]);

    const pieChart = this;

    const defaults = extend({}, app.params.pieChart);

    // Extend defaults with modules params
    pieChart.useModulesParams(defaults);

    pieChart.params = extend(defaults, params);

    const { el } = pieChart.params;
    if (!el) return pieChart;

    const $el = $(el);
    if ($el.length === 0) return pieChart;

    if ($el[0].f7PieChart) return $el[0].f7PieChart;

    extend(pieChart, {
      app,
      $el,
      el: $el && $el[0],
      currentIndex: null,
      f7Tooltip: null,
    });

    $el[0].f7PieChart = pieChart;

    // Install Modules
    pieChart.useModules();

    pieChart.showTooltip = pieChart.showTooltip.bind(this);
    pieChart.hideTooltip = pieChart.hideTooltip.bind(this);

    pieChart.init();

    return pieChart;
  }

  getSummValue() {
    const { dataset } = this.params;
    let summ = 0;
    dataset
      .map((d) => d.value || 0)
      .forEach((value) => {
        summ += value;
      });
    return summ;
  }

  getPaths() {
    const { dataset, size } = this.params;
    const paths = [];

    let cumulativePercentage = 0;

    function getCoordinatesForPercentage(percentage) {
      const x = Math.cos(2 * Math.PI * percentage) * (size / 3);
      const y = Math.sin(2 * Math.PI * percentage) * (size / 3);
      return [x, y];
    }

    dataset.forEach(({ value, label, color }) => {
      const percentage = value / this.getSummValue();

      const [startX, startY] = getCoordinatesForPercentage(cumulativePercentage);
      cumulativePercentage += percentage;
      const [endX, endY] = getCoordinatesForPercentage(cumulativePercentage);
      const largeArcFlag = percentage > 0.5 ? 1 : 0;
      const points = [
        `M ${startX} ${startY}`, // Move
        `A ${size / 3} ${size / 3} 0 ${largeArcFlag} 1 ${endX} ${endY}`, // Arc
        'L 0 0', // Line
      ].join(' ');

      paths.push({
        points,
        label,
        color,
      });
    });
    return paths;
  }

  formatTooltipText() {
    const { dataset } = this.params;
    const { currentIndex } = this;
    if (currentIndex === null) return '';
    const { value, label, color } = dataset[currentIndex];
    const percentage = (value / this.getSummValue()) * 100;

    const round = (v) => {
      if (parseInt(v, 10) === v) return v;
      return Math.round(v * 100) / 100;
    };

    if (this.params.formatTooltip) {
      return this.params.formatTooltip.call(this, {
        index: currentIndex,
        value,
        label,
        color,
        percentage,
      });
    }

    const tooltipText = `${label ? `${label}: ` : ''}${round(value)} (${round(percentage)}%)`;

    return `
      <div class="pie-chart-tooltip-label">
        <span class="pie-chart-tooltip-color" style="background-color: ${color};"></span> ${tooltipText}
      </div>
    `;
  }

  setTooltip() {
    const pieChart = this;
    const { currentIndex, el, app, params } = pieChart;
    const { tooltip, dataset } = params;
    if (currentIndex === null && !pieChart.f7Tooltip) return;
    if (!tooltip || !el) return;
    pieChart.emit('local::select pieChartSelect', pieChart, currentIndex, dataset[currentIndex]);
    if (currentIndex !== null && !pieChart.f7Tooltip) {
      pieChart.f7Tooltip = app.tooltip.create({
        trigger: 'manual',
        containerEl: el,
        targetEl: el.querySelector(`path[data-index="${currentIndex}"]`),
        text: pieChart.formatTooltipText(),
        cssClass: 'pie-chart-tooltip',
      });
      pieChart.f7Tooltip.show();
      return;
    }
    if (!pieChart.f7Tooltip) return;
    if (currentIndex !== null) {
      pieChart.f7Tooltip.setText(pieChart.formatTooltipText());
      pieChart.f7Tooltip.targetEl = el.querySelector(`path[data-index="${currentIndex}"]`);
      pieChart.f7Tooltip.$targetEl = pieChart.f7Tooltip.app.$(
        el.querySelector(`path[data-index="${currentIndex}"]`),
      );

      pieChart.f7Tooltip.show();
    } else {
      pieChart.f7Tooltip.hide();
    }
  }

  render() {
    const pieChart = this;
    const size = pieChart.params.size;
    const paths = pieChart.getPaths();
    // prettier-ignore
    return `
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="${size}"
        viewBox="-${size / 3} -${size / 3} ${(size * 2) / 3} ${(size * 2) / 3}"
        style="transform: rotate(-90deg)"
      >
        ${paths.map((path, index) =>`
          <path
            d="${path.points}"
            fill="${path.color}"
            data-index="${index}"
          />
        `).join('')}
      </svg>
    `;
  }

  update(newParams = {}) {
    const pieChart = this;
    const { params } = pieChart;
    Object.keys(newParams).forEach((param) => {
      if (typeof newParams[param] !== 'undefined') {
        params[param] = newParams[param];
      }
    });
    if (pieChart.$svgEl.length === 0) return pieChart;
    pieChart.$svgEl.remove();
    delete pieChart.$svgEl.f7PieChart;
    const $svgEl = $(pieChart.render()).eq(0);
    $svgEl.f7PieChart = pieChart;
    extend(pieChart, {
      $svgEl,
      svgEl: $svgEl && $svgEl[0],
    });
    pieChart.$el.append($svgEl);
    return pieChart;
  }

  showTooltip(e) {
    this.currentIndex = parseInt(e.target.getAttribute('data-index'), 10);
    this.$svgEl
      .find('path')
      .removeClass('pie-chart-hidden')
      .forEach((el, index) => {
        if (index !== this.currentIndex) $(el).addClass('pie-chart-hidden');
      });
    this.setTooltip();
  }

  hideTooltip() {
    this.currentIndex = null;
    this.$svgEl.find('path').removeClass('pie-chart-hidden');
    this.setTooltip();
  }

  init() {
    const pieChart = this;
    const $svgEl = $(pieChart.render()).eq(0);
    $svgEl.f7PieChart = pieChart;
    extend(pieChart, {
      $svgEl,
      svgEl: $svgEl && $svgEl[0],
    });
    pieChart.$el.append($svgEl);
    pieChart.$el.on('click mouseenter', 'path', pieChart.showTooltip, true);
    pieChart.$el.on('mouseleave', 'path', pieChart.hideTooltip, true);
    return pieChart;
  }

  destroy() {
    const pieChart = this;
    if (!pieChart.$el || pieChart.destroyed) return;
    pieChart.$el.trigger('piechart:beforedestroy');
    pieChart.emit('local::beforeDestroy pieChartBeforeDestroy', pieChart);
    pieChart.$el.off('click mouseenter', 'path', pieChart.showTooltip, true);
    pieChart.$el.off('mouseleave', 'path', pieChart.hideTooltip, true);
    pieChart.$svgEl.remove();
    delete pieChart.$el[0].f7PieChart;
    deleteProps(pieChart);
    pieChart.destroyed = true;
  }
}

export default PieChart;
