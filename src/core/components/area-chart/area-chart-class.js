import $ from '../../shared/dom7.js';
import { extend, deleteProps } from '../../shared/utils.js';
import Framework7Class from '../../shared/class.js';
/** @jsx $jsx */
import $jsx from '../../shared/$jsx.js';

class AreaChart extends Framework7Class {
  constructor(app, params = {}) {
    super(params, [app]);

    const self = this;

    const defaults = extend({}, app.params.areaChart);

    // Extend defaults with modules params
    self.useModulesParams(defaults);

    self.params = extend(defaults, params);

    const { el } = self.params;
    if (!el) return self;

    const $el = $(el);
    if ($el.length === 0) return self;

    if ($el[0].f7AreaChart) return $el[0].f7AreaChart;

    extend(self, {
      app,
      $el,
      el: $el && $el[0],
      currentIndex: null,
      hiddenDatasets: [],
      f7Tooltip: null,
      linesOffsets: null,
    });

    $el[0].f7AreaChart = self;

    // Install Modules
    self.useModules();

    self.onMouseEnter = self.onMouseEnter.bind(self);
    self.onMouseMove = self.onMouseMove.bind(self);
    self.onMouseLeave = self.onMouseLeave.bind(self);
    self.onLegendClick = self.onLegendClick.bind(self);

    self.init();

    return self;
  }

  getVisibleLabels() {
    const { maxAxisLabels, axisLabels } = this.params;
    if (!maxAxisLabels || axisLabels.length <= maxAxisLabels) return axisLabels;
    const skipStep = Math.ceil(axisLabels.length / maxAxisLabels);
    const filtered = axisLabels.filter((label, index) => index % skipStep === 0);
    return filtered;
  }

  getSummValues() {
    const { datasets } = this.params;
    const { hiddenDatasets } = this;
    const summValues = [];
    datasets
      .filter((dataset, index) => !hiddenDatasets.includes(index))
      .forEach(({ values }) => {
        values.forEach((value, valueIndex) => {
          if (!summValues[valueIndex]) summValues[valueIndex] = 0;
          summValues[valueIndex] += value;
        });
      });
    return summValues;
  }

  getChartData() {
    const { datasets, lineChart, width, height } = this.params;
    const { hiddenDatasets } = this;
    const data = [];
    if (!datasets.length) {
      return data;
    }
    const lastValues = datasets[0].values.map(() => 0);
    let maxValue = 0;
    if (lineChart) {
      datasets
        .filter((dataset, index) => !hiddenDatasets.includes(index))
        .forEach(({ values }) => {
          const datasetMaxValue = Math.max(...values);
          if (datasetMaxValue > maxValue) maxValue = datasetMaxValue;
        });
    } else {
      maxValue = Math.max(...this.getSummValues());
    }

    datasets
      .filter((dataset, index) => !hiddenDatasets.includes(index))
      .forEach(({ label, values, color }) => {
        const points = values.map((originalValue, valueIndex) => {
          lastValues[valueIndex] += originalValue;
          const value = lineChart ? originalValue : lastValues[valueIndex];
          const x = (valueIndex / (values.length - 1)) * width;
          const y = height - (value / maxValue) * height;
          if (lineChart) {
            return `${valueIndex === 0 ? 'M' : 'L'}${x},${y}`;
          }
          return `${x} ${y}`;
        });
        if (!lineChart) {
          points.push(`${width} ${height} 0 ${height}`);
        }

        data.push({
          label,
          points: points.join(' '),
          color,
        });
      });
    return data.reverse();
  }

  getVerticalLines() {
    const { datasets, width } = this.params;
    const lines = [];
    if (!datasets.length) {
      return lines;
    }
    const values = datasets[0].values;
    values.forEach((value, valueIndex) => {
      const x = (valueIndex / (values.length - 1)) * width;
      lines.push(x);
    });
    return lines;
  }

  toggleDataset(index) {
    const {
      hiddenDatasets,
      params: { toggleDatasets },
    } = this;
    if (!toggleDatasets) return;
    if (hiddenDatasets.includes(index)) {
      hiddenDatasets.splice(hiddenDatasets.indexOf(index), 1);
    } else {
      hiddenDatasets.push(index);
    }
    if (this.$legendEl) {
      this.$legendEl.find('.area-chart-legend-item').removeClass('area-chart-legend-item-hidden');
      hiddenDatasets.forEach((i) => {
        this.$legendEl
          .find(`.area-chart-legend-item[data-index="${i}"]`)
          .addClass('area-chart-legend-item-hidden');
      });
    }
    this.update({}, true);
  }

  formatAxisLabel(label) {
    const { formatAxisLabel } = this.params;
    if (formatAxisLabel) return formatAxisLabel.call(this, label);
    return label;
  }

  formatLegendLabel(label) {
    const { formatLegendLabel } = this.params;
    if (formatLegendLabel) return formatLegendLabel.call(this, label);
    return label;
  }

  calcLinesOffsets() {
    const lines = this.svgEl.querySelectorAll('line');
    this.linesOffsets = [];
    for (let i = 0; i < lines.length; i += 1) {
      this.linesOffsets.push(lines[i].getBoundingClientRect().left);
    }
  }

  formatTooltip() {
    const self = this;
    const {
      currentIndex,
      hiddenDatasets,
      params: {
        datasets,
        axisLabels,
        formatTooltip,
        formatTooltipTotal,
        formatTooltipAxisLabel,
        formatTooltipDataset,
      },
    } = self;
    if (currentIndex === null) return '';
    let total = 0;
    const currentValues = datasets
      .filter((dataset, index) => !hiddenDatasets.includes(index))
      .map((dataset) => ({
        color: dataset.color,
        label: dataset.label,
        value: dataset.values[currentIndex],
      }));
    currentValues.forEach((dataset) => {
      total += dataset.value;
    });
    if (formatTooltip) {
      return formatTooltip({
        index: currentIndex,
        total,
        datasets: currentValues,
      });
    }
    let labelText = formatTooltipAxisLabel
      ? formatTooltipAxisLabel.call(self, axisLabels[currentIndex])
      : this.formatAxisLabel(axisLabels[currentIndex]);
    if (!labelText) labelText = '';
    const totalText = formatTooltipTotal ? formatTooltipTotal.call(self, total) : total;
    // prettier-ignore
    const datasetsText = currentValues.length > 0 ? `
      <ul class="area-chart-tooltip-list">
        ${currentValues
          .map(({ label, color, value }) => {
            const valueText = formatTooltipDataset
              ? formatTooltipDataset.call(self, label, value, color)
              : `${label ? `${label}: ` : ''}${value}`;
            return `
              <li><span style="background-color: ${color};"></span>${valueText}</li>
            `;
          }).join('')}
      </ul>` : '';
    // prettier-ignore
    return `
      <div class="area-chart-tooltip-label">${labelText}</div>
      <div class="area-chart-tooltip-total">${totalText}</div>
      ${datasetsText}
    `;
  }

  setTooltip() {
    const self = this;
    const {
      app,
      el,
      svgEl,
      hiddenDatasets,
      currentIndex,
      params: { tooltip, datasets },
    } = self;
    if (!tooltip) return;
    const hasVisibleDataSets =
      datasets.filter((dataset, index) => !hiddenDatasets.includes(index)).length > 0;
    if (!hasVisibleDataSets) {
      if (self.f7Tooltip && self.f7Tooltip.hide) self.f7Tooltip.hide();
      return;
    }

    if (currentIndex !== null && !self.f7Tooltip) {
      self.f7Tooltip = app.tooltip.create({
        trigger: 'manual',
        containerEl: el,
        targetEl: svgEl.querySelector(`line[data-index="${currentIndex}"]`),
        text: self.formatTooltip(),
        cssClass: 'area-chart-tooltip',
      });
      if (self.f7Tooltip && self.f7Tooltip.show) {
        self.f7Tooltip.show();
      }
      return;
    }
    if (!self.f7Tooltip || !self.f7Tooltip.hide || !self.f7Tooltip.show) {
      return;
    }
    if (currentIndex !== null) {
      self.f7Tooltip.setText(self.formatTooltip());
      self.f7Tooltip.setTargetEl(svgEl.querySelector(`line[data-index="${currentIndex}"]`));
      self.f7Tooltip.show();
    } else {
      self.f7Tooltip.hide();
    }
  }

  setCurrentIndex(index) {
    if (index === this.currentIndex) return;
    this.currentIndex = index;
    this.$el.trigger('areachart:select', { index });
    this.emit('local::select areaChartSelect', this, index);
    this.$svgEl.find('line').removeClass('area-chart-current-line');
    this.$svgEl.find(`line[data-index="${index}"]`).addClass('area-chart-current-line');
    this.setTooltip();
  }

  onLegendClick(e) {
    const index = parseInt($(e.target).closest('.area-chart-legend-item').attr('data-index'), 10);
    this.toggleDataset(index);
  }

  onMouseEnter() {
    this.calcLinesOffsets();
  }

  onMouseMove(e) {
    const self = this;
    if (!self.linesOffsets) {
      self.calcLinesOffsets();
    }
    let currentLeft = e.pageX;
    if (typeof currentLeft === 'undefined') currentLeft = 0;
    const distances = self.linesOffsets.map((left) => Math.abs(currentLeft - left));
    const minDistance = Math.min(...distances);
    const closestIndex = distances.indexOf(minDistance);
    self.setCurrentIndex(closestIndex);
  }

  onMouseLeave() {
    this.setCurrentIndex(null);
  }

  attachEvents() {
    const { svgEl, $el } = this;
    if (!svgEl) return;
    svgEl.addEventListener('mouseenter', this.onMouseEnter);
    svgEl.addEventListener('mousemove', this.onMouseMove);
    svgEl.addEventListener('mouseleave', this.onMouseLeave);
    $el.on('click', '.area-chart-legend-item', this.onLegendClick);
  }

  detachEvents() {
    const { svgEl, $el } = this;
    if (!svgEl) return;
    svgEl.removeEventListener('mouseenter', this.onMouseEnter);
    svgEl.removeEventListener('mousemove', this.onMouseMove);
    svgEl.removeEventListener('mouseleave', this.onMouseLeave);
    $el.off('click', '.area-chart-legend-item', this.onLegendClick);
  }

  render() {
    const self = this;
    const { lineChart, toggleDatasets, width, height, axis, axisLabels, legend, datasets } =
      self.params;
    const chartData = self.getChartData();
    const verticalLines = self.getVerticalLines();
    const visibleLegends = self.getVisibleLabels();

    const LegendItemTag = toggleDatasets ? 'button' : 'span';
    return (
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          preserveAspectRatio="none"
        >
          {chartData.map((data) =>
            lineChart ? (
              <path stroke={data.color} fill-rule="evenodd" d={data.points} />
            ) : (
              <polygon fill={data.color} fill-rule="evenodd" points={data.points} />
            ),
          )}

          {verticalLines.map((line, index) => (
            <line data-index={index} fill="#000" x1={line} y1={0} x2={line} y2={height} />
          ))}
        </svg>
        {axis && (
          <div class="area-chart-axis">
            {axisLabels.map((label) => (
              <span>
                {visibleLegends.includes(label) && <span>{self.formatAxisLabel(label)}</span>}
              </span>
            ))}
          </div>
        )}
        {legend && (
          <div class="area-chart-legend">
            {datasets.map((dataset, index) => (
              <LegendItemTag
                data-index={index}
                class={`area-chart-legend-item ${toggleDatasets ? 'area-chart-legend-button' : ''}`}
                _type={toggleDatasets ? 'button' : undefined}
              >
                <span style={`background-color: ${dataset.color}`}></span>
                {self.formatLegendLabel(dataset.label)}
              </LegendItemTag>
            ))}
          </div>
        )}
      </div>
    );
  }

  update(newParams = {}, onlySvg = false) {
    const self = this;
    const { params } = self;
    Object.keys(newParams).forEach((param) => {
      if (typeof newParams[param] !== 'undefined') {
        params[param] = newParams[param];
      }
    });
    if (self.$svgEl.length === 0) return self;
    self.detachEvents();
    self.$svgEl.remove();
    if (!onlySvg) {
      self.$axisEl.remove();
      self.$legendEl.remove();
    }
    const $rendered = $(self.render());
    const $svgEl = $rendered.find('svg');
    extend(self, {
      svgEl: $svgEl && $svgEl[0],
      $svgEl,
    });

    if (!onlySvg) {
      const $axisEl = $rendered.find('.area-chart-axis');
      const $legendEl = $rendered.find('.area-chart-legend');
      extend(self, {
        $axisEl,
        $legendEl,
      });
      self.$el.append($axisEl);
      self.$el.append($legendEl);
    }
    self.$el.prepend($svgEl);

    self.attachEvents();
    return self;
  }

  init() {
    const self = this;
    const $rendered = $(self.render());
    const $svgEl = $rendered.find('svg');
    const $axisEl = $rendered.find('.area-chart-axis');
    const $legendEl = $rendered.find('.area-chart-legend');
    extend(self, {
      svgEl: $svgEl && $svgEl[0],
      $svgEl,
      $axisEl,
      $legendEl,
    });
    self.$el.append($svgEl);
    self.$el.append($axisEl);
    self.$el.append($legendEl);
    self.attachEvents();
    return self;
  }

  destroy() {
    const self = this;
    if (!self.$el || self.destroyed) return;
    self.$el.trigger('piechart:beforedestroy');
    self.emit('local::beforeDestroy areaChartBeforeDestroy', self);
    self.detachEvents();
    self.$svgEl.remove();
    self.$axisEl.remove();
    self.$legendEl.remove();
    if (self.f7Tooltip && self.f7Tooltip.destroy) {
      self.f7Tooltip.destroy();
    }
    delete self.$el[0].f7AreaChart;
    deleteProps(self);
    self.destroyed = true;
  }
}

export default AreaChart;
