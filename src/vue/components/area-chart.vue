<template>
  <div ref="elRef" :class="classes">
    <svg
      ref="svgElRef"
      xmlns="http://www.w3.org/2000/svg"
      :width="width"
      :height="height"
      :viewBox="`0 0 ${width} ${height}`"
      preserveAspectRatio="none"
    >
      <component
        :is="ChartTag"
        v-for="(data, index) in chartData"
        :key="`${ChartTag}-${index}`"
        :fill="lineChart ? undefined : data.color"
        :stroke="lineChart ? data.color : undefined"
        fill-rule="evenodd"
        :points="lineChart ? undefined : data.points"
        :d="lineChart ? data.points : undefined"
      />

      <line
        v-for="(line, index) in verticalLines"
        :key="`line-${index}`"
        :data-index="index"
        fill="#000"
        :x1="line"
        :y1="0"
        :x2="line"
        :y2="height"
        :class="
          classNames({
            'area-chart-current-line': currentIndex === index,
          })
        "
      />
    </svg>
    <div v-if="axis" class="area-chart-axis">
      <span v-for="(label, index) in axisLabels" :key="index">
        <span v-if="visibleLegends.includes(label)">{{ formatAxisLabelMethod(label) }}</span>
      </span>
    </div>
    <div v-if="legend" class="area-chart-legend">
      <component
        :is="LegendItemTag"
        v-for="(dataset, index) in datasets"
        :key="index"
        :class="
          classNames('area-chart-legend-item', {
            'area-chart-legend-item-hidden': hiddenDatasets.includes(index),
            'area-chart-legend-button': toggleDatasets,
          })
        "
        :type="toggleDatasets ? 'button' : undefined"
        @click="toggleDataset(index)"
      >
        <span :style="{ backgroundColor: dataset.color }" />
        {{ formatLegendLabelMethod(dataset.label) }}
      </component>
    </div>
    <slot />
  </div>
</template>
<script>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { classNames } from '../shared/utils.js';
import { f7 } from '../shared/f7.js';

export default {
  name: 'f7-area-chart',
  props: {
    lineChart: Boolean,
    datasets: {
      type: Array,
      default: () => [],
    },
    axis: Boolean,
    axisLabels: {
      type: Array,
      default: () => [],
    },
    tooltip: Boolean,
    legend: Boolean,
    toggleDatasets: Boolean,
    width: {
      type: Number,
      default: 640,
    },
    height: {
      type: Number,
      default: 320,
    },
    maxAxisLabels: {
      type: Number,
      default: 8,
    },
    formatAxisLabel: Function,
    formatLegendLabel: Function,
    formatTooltip: Function,
    formatTooltipAxisLabel: Function,
    formatTooltipTotal: Function,
    formatTooltipDataset: Function,
  },
  emits: ['select'],
  setup(props, { emit }) {
    let f7Tooltip = null;
    const currentIndex = ref(null);
    const hiddenDatasets = ref([]);
    const elRef = ref(null);
    const svgElRef = ref(null);
    const linesOffsets = ref(null);

    const visibleLegends = computed(() => {
      if (!props.maxAxisLabels || props.axisLabels.length <= props.maxAxisLabels)
        return props.axisLabels;
      const skipStep = Math.ceil(props.axisLabels.length / props.maxAxisLabels);
      const filtered = props.axisLabels.filter((label, index) => index % skipStep === 0);
      return filtered;
    });

    const summValues = computed(() => {
      const summ = [];
      props.datasets
        .filter((dataset, index) => !hiddenDatasets.value.includes(index))
        .forEach(({ values }) => {
          values.forEach((value, valueIndex) => {
            if (!summ[valueIndex]) summ[valueIndex] = 0;
            summ[valueIndex] += value;
          });
        });
      return summ;
    });

    const chartData = computed(() => {
      const { datasets, lineChart, width, height } = props;
      const data = [];
      if (!datasets.length) {
        return data;
      }
      const lastValues = datasets[0].values.map(() => 0);
      let maxValue = 0;
      if (lineChart) {
        datasets.forEach(({ values }) => {
          const datasetMaxValue = Math.max(...values);
          if (datasetMaxValue > maxValue) maxValue = datasetMaxValue;
        });
      } else {
        maxValue = Math.max(...summValues.value);
      }

      datasets
        .filter((dataset, index) => !hiddenDatasets.value.includes(index))
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
    });

    const verticalLines = computed(() => {
      const lines = [];
      if (!props.datasets.length) {
        return lines;
      }
      const values = props.datasets[0].values;
      values.forEach((value, valueIndex) => {
        const x = (valueIndex / (values.length - 1)) * props.width;
        lines.push(x);
      });
      return lines;
    });

    const toggleDataset = (index) => {
      if (!props.toggleDatasets) return;
      if (hiddenDatasets.value.includes(index)) {
        hiddenDatasets.value.splice(hiddenDatasets.value.indexOf(index), 1);
      } else {
        hiddenDatasets.value.push(index);
      }
      hiddenDatasets.value = [...hiddenDatasets.value];
    };

    const formatAxisLabelMethod = (label) => {
      if (props.formatAxisLabel) return props.formatAxisLabel(label);
      return label;
    };

    const formatLegendLabelMethod = (label) => {
      if (props.formatLegendLabel) return props.formatLegendLabel(label);
      return label;
    };

    const calcLinesOffsets = () => {
      const lines = svgElRef.value.querySelectorAll('line');
      linesOffsets.value = [];
      for (let i = 0; i < lines.length; i += 1) {
        linesOffsets.value.push(lines[i].getBoundingClientRect().left);
      }
    };

    const formatTooltip = () => {
      const index = currentIndex.value;
      if (index === null) return '';
      let total = 0;
      const currentValues = props.datasets
        .filter((dataset, i) => !hiddenDatasets.value.includes(i))
        .map((dataset) => ({
          color: dataset.color,
          label: dataset.label,
          value: dataset.values[index],
        }));
      currentValues.forEach((dataset) => {
        total += dataset.value;
      });
      if (props.formatTooltip) {
        return props.formatTooltip({
          index,
          total,
          datasets: currentValues,
        });
      }
      let labelText = props.formatTooltipAxisLabel
        ? props.formatTooltipAxisLabel(props.axisLabels[index])
        : formatAxisLabelMethod(props.axisLabels[index]);
      if (!labelText) labelText = '';
      const totalText = props.formatTooltipTotal ? props.formatTooltipTotal(total) : total;
      // prettier-ignore
      const datasetsText = currentValues.length > 0 ? `
      <ul class="area-chart-tooltip-list">
        ${currentValues
          .map(({ label, color, value }) => {
            const valueText = props.formatTooltipDataset
              ? props.formatTooltipDataset(label, value, color)
              : `${label}: ${value}`;
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
    };

    const setTooltip = () => {
      const { tooltip, datasets } = props;
      const index = currentIndex.value;
      if (!tooltip) return;
      const hasVisibleDataSets =
        datasets.filter((dataset, i) => !hiddenDatasets.value.includes(i)).length > 0;
      if (!hasVisibleDataSets) {
        if (f7Tooltip && f7Tooltip.hide) f7Tooltip.hide();
        return;
      }

      if (index !== null && !f7Tooltip) {
        f7Tooltip = f7.tooltip.create({
          trigger: 'manual',
          containerEl: elRef.value,
          targetEl: svgElRef.value.querySelector(`line[data-index="${index}"]`),
          text: formatTooltip(),
          cssClass: 'area-chart-tooltip',
        });
        if (f7Tooltip && f7Tooltip.show) {
          f7Tooltip.show();
        }
        return;
      }
      if (!f7Tooltip || !f7Tooltip.hide || !f7Tooltip.show) {
        return;
      }
      if (index !== null) {
        f7Tooltip.setText(formatTooltip());
        f7Tooltip.setTargetEl(svgElRef.value.querySelector(`line[data-index="${index}"]`));
        f7Tooltip.show();
      } else {
        f7Tooltip.hide();
      }
    };

    const onMouseEnter = () => {
      calcLinesOffsets();
    };

    const onMouseMove = (e) => {
      if (!linesOffsets.value) {
        calcLinesOffsets();
      }
      let currentLeft = e.pageX;
      if (typeof currentLeft === 'undefined') currentLeft = 0;
      const distances = linesOffsets.value.map((left) => Math.abs(currentLeft - left));
      const minDistance = Math.min(...distances);
      const closestIndex = distances.indexOf(minDistance);
      currentIndex.value = closestIndex;
    };

    const onMouseLeave = () => {
      currentIndex.value = null;
    };

    watch(
      () => currentIndex.value,
      () => {
        emit('select', currentIndex.value);
        setTooltip();
      },
    );

    onMounted(() => {
      if (!svgElRef.value) return;
      svgElRef.value.addEventListener('mouseenter', onMouseEnter);
      svgElRef.value.addEventListener('mousemove', onMouseMove);
      svgElRef.value.addEventListener('mouseleave', onMouseLeave);
    });

    onBeforeUnmount(() => {
      if (f7Tooltip && f7Tooltip.destroy) {
        f7Tooltip.destroy();
      }
      f7Tooltip = null;
      if (!svgElRef.value) return;
      svgElRef.value.removeEventListener('mouseenter', onMouseEnter);
      svgElRef.value.removeEventListener('mousemove', onMouseMove);
      svgElRef.value.removeEventListener('mouseleave', onMouseLeave);
    });

    const classes = computed(() => classNames('area-chart'));

    const LegendItemTag = computed(() => (props.toggleDatasets ? 'button' : 'span'));
    const ChartTag = computed(() => (props.lineChart ? 'path' : 'polygon'));

    return {
      currentIndex,
      hiddenDatasets,
      visibleLegends,
      chartData,
      verticalLines,
      elRef,
      svgElRef,
      classes,
      toggleDataset,
      formatAxisLabelMethod,
      formatLegendLabelMethod,
      LegendItemTag,
      ChartTag,
      classNames,
    };
  },
};
</script>
