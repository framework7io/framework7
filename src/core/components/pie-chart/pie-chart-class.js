import $ from '../../shared/dom7.js';
import { extend, deleteProps } from '../../shared/utils.js';
import Framework7Class from '../../shared/class.js';
/** @jsx $jsx */
import $jsx from '../../shared/$jsx.js';

class PieChart extends Framework7Class {
  constructor(app, params = {}) {
    super(params, [app]);

    const self = this;

    const defaults = extend({}, app.params.pieChart);

    // Extend defaults with modules params
    self.useModulesParams(defaults);

    self.params = extend(defaults, params);

    const { el } = self.params;
    if (!el) return self;

    const $el = $(el);
    if ($el.length === 0) return self;

    if ($el[0].f7PieChart) return $el[0].f7PieChart;

    extend(self, {
      app,
      $el,
      el: $el && $el[0],
      currentIndex: null,
      f7Tooltip: null,
    });

    $el[0].f7PieChart = self;

    // Install Modules
    self.useModules();

    self.showTooltip = self.showTooltip.bind(this);
    self.hideTooltip = self.hideTooltip.bind(this);

    self.init();

    return self;
  }

  getSummValue() {
    const { datasets } = this.params;
    let summ = 0;
    datasets
      .map((d) => d.value || 0)
      .forEach((value) => {
        summ += value;
      });
    return summ;
  }

  getPaths() {
    const { datasets, size } = this.params;
    const paths = [];

    let cumulativePercentage = 0;

    function getCoordinatesForPercentage(percentage) {
      const x = Math.cos(2 * Math.PI * percentage) * (size / 3);
      const y = Math.sin(2 * Math.PI * percentage) * (size / 3);
      return [x, y];
    }

    datasets.forEach(({ value, label, color }) => {
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
    const { datasets } = this.params;
    const { currentIndex } = this;
    if (currentIndex === null) return '';
    const { value, label, color } = datasets[currentIndex];
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
    const self = this;
    const { currentIndex, el, app, params } = self;
    const { tooltip } = params;
    if (currentIndex === null && !self.f7Tooltip) return;
    if (!tooltip || !el) return;

    if (currentIndex !== null && !self.f7Tooltip) {
      self.f7Tooltip = app.tooltip.create({
        trigger: 'manual',
        containerEl: el,
        targetEl: el.querySelector(`path[data-index="${currentIndex}"]`),
        text: self.formatTooltipText(),
        cssClass: 'pie-chart-tooltip',
      });
      self.f7Tooltip.show();
      return;
    }
    if (!self.f7Tooltip) return;
    if (currentIndex !== null) {
      self.f7Tooltip.setText(self.formatTooltipText());
      self.f7Tooltip.setTargetEl(el.querySelector(`path[data-index="${currentIndex}"]`));

      self.f7Tooltip.show();
    } else {
      self.f7Tooltip.hide();
    }
  }

  render() {
    const self = this;
    const size = self.params.size;
    const paths = self.getPaths();
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        viewBox={`-${size / 3} -${size / 3} ${(size * 2) / 3} ${(size * 2) / 3}`}
        style="transform: rotate(-90deg)"
      >
        {paths.map((path, index) => (
          <path d={path.points} fill={path.color} data-index={index} />
        ))}
      </svg>
    );
  }

  update(newParams = {}) {
    const self = this;
    const { params } = self;
    Object.keys(newParams).forEach((param) => {
      if (typeof newParams[param] !== 'undefined') {
        params[param] = newParams[param];
      }
    });
    if (self.$svgEl.length === 0) return self;
    self.$svgEl.remove();
    delete self.$svgEl.f7PieChart;
    const $svgEl = $(self.render()).eq(0);
    $svgEl.f7PieChart = self;
    extend(self, {
      $svgEl,
      svgEl: $svgEl && $svgEl[0],
    });
    self.$el.append($svgEl);
    return self;
  }

  setCurrentIndex(index) {
    const self = this;
    if (index === self.currentIndex) return;
    const { datasets } = self.params;
    self.currentIndex = index;
    self.$el.trigger('piechart:select', { index, dataset: datasets[index] });
    self.emit('local::select pieChartSelect', self, index, datasets[index]);
  }

  showTooltip(e) {
    const newIndex = parseInt(e.target.getAttribute('data-index'), 10);
    this.setCurrentIndex(newIndex);
    this.$svgEl
      .find('path')
      .removeClass('pie-chart-hidden')
      .forEach((el, index) => {
        if (index !== this.currentIndex) $(el).addClass('pie-chart-hidden');
      });
    this.setTooltip();
  }

  hideTooltip() {
    this.setCurrentIndex(null);
    this.$svgEl.find('path').removeClass('pie-chart-hidden');
    this.setTooltip();
  }

  init() {
    const self = this;
    const $svgEl = $(self.render()).eq(0);
    $svgEl.f7PieChart = self;
    extend(self, {
      $svgEl,
      svgEl: $svgEl && $svgEl[0],
    });
    self.$el.append($svgEl);
    self.$el.on('click mouseenter', 'path', self.showTooltip, true);
    self.$el.on('mouseleave', 'path', self.hideTooltip, true);
    return self;
  }

  destroy() {
    const self = this;
    if (!self.$el || self.destroyed) return;
    self.$el.trigger('piechart:beforedestroy');
    self.emit('local::beforeDestroy pieChartBeforeDestroy', self);
    self.$el.off('click mouseenter', 'path', self.showTooltip, true);
    self.$el.off('mouseleave', 'path', self.hideTooltip, true);
    self.$svgEl.remove();
    if (self.f7Tooltip && self.f7Tooltip.destroy) {
      self.f7Tooltip.destroy();
    }
    delete self.$el[0].f7PieChart;
    deleteProps(self);
    self.destroyed = true;
  }
}

export default PieChart;
