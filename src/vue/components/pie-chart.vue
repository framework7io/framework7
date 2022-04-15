<template>
  <div ref="elRef" :class="classes">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      :width="size"
      :height="size"
      :viewBox="`-${size / 3} -${size / 3} ${(size * 2) / 3} ${(size * 2) / 3}`"
      :style="{ transform: 'rotate(-90deg)' }"
    >
      <path
        v-for="(path, index) in paths"
        :key="path.label || index"
        :d="path.points"
        :fill="path.color"
        :data-index="index"
        :class="
          classNames({
            'pie-chart-hidden': currentIndex !== null && currentIndex !== index,
          })
        "
        @click="setCurrentIndex(index)"
        @mouseenter="setCurrentIndex(index)"
        @mouseleave="setCurrentIndex(null)"
      />
    </svg>
    <slot />
  </div>
</template>
<script>
import { computed, onBeforeUnmount, ref, watch } from 'vue';
import { classNames } from '../shared/utils.js';
import { f7 } from '../shared/f7.js';

export default {
  name: 'f7-pie-chart',
  props: {
    size: {
      type: Number,
      default: 320,
    },
    tooltip: Boolean,
    datasets: {
      type: Array,
      default: () => [],
    },
    formatTooltip: Function,
  },
  emits: ['select'],
  setup(props, { emit }) {
    const elRef = ref(null);
    let f7Tooltip = null;
    const currentIndex = ref(null);

    const setCurrentIndex = (index) => {
      currentIndex.value = index;
    };

    const summValue = computed(() => {
      let summ = 0;
      props.datasets
        .map((d) => d.value || 0)
        .forEach((value) => {
          summ += value;
        });
      return summ;
    });

    const paths = computed(() => {
      const p = [];

      let cumulativePercentage = 0;

      function getCoordinatesForPercentage(percentage) {
        const x = Math.cos(2 * Math.PI * percentage) * (props.size / 3);
        const y = Math.sin(2 * Math.PI * percentage) * (props.size / 3);
        return [x, y];
      }

      props.datasets.forEach(({ value, label, color }) => {
        const percentage = value / summValue.value;

        const [startX, startY] = getCoordinatesForPercentage(cumulativePercentage);
        cumulativePercentage += percentage;
        const [endX, endY] = getCoordinatesForPercentage(cumulativePercentage);
        const largeArcFlag = percentage > 0.5 ? 1 : 0;
        const points = [
          `M ${startX} ${startY}`, // Move
          `A ${props.size / 3} ${props.size / 3} 0 ${largeArcFlag} 1 ${endX} ${endY}`, // Arc
          'L 0 0', // Line
        ].join(' ');

        p.push({
          points,
          label,
          color,
        });
      });
      return p;
    });

    const formatTooltipText = () => {
      if (currentIndex.value === null) return '';
      const { value, label, color } = props.datasets[currentIndex.value];
      const percentage = (value / summValue.value) * 100;

      const round = (v) => {
        if (parseInt(v, 10) === v) return v;
        return Math.round(v * 100) / 100;
      };

      if (props.formatTooltip) {
        return props.formatTooltip({
          index: currentIndex.value,
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
    };

    const setTooltip = () => {
      const index = currentIndex.value;
      if (index === null && !f7Tooltip) return;
      if (!props.tooltip || !elRef.value || !f7) return;

      if (index !== null && !f7Tooltip) {
        f7Tooltip = f7.tooltip.create({
          trigger: 'manual',
          containerEl: elRef.value,
          targetEl: elRef.value.querySelector(`path[data-index="${index}"]`),
          text: formatTooltipText(),
          cssClass: 'pie-chart-tooltip',
        });
        f7Tooltip.show();
        return;
      }
      if (!f7Tooltip) return;
      if (index !== null) {
        f7Tooltip.setText(formatTooltipText());
        f7Tooltip.setTargetEl(elRef.value.querySelector(`path[data-index="${index}"]`));

        f7Tooltip.show();
      } else {
        f7Tooltip.hide();
      }
    };

    watch(
      () => currentIndex.value,
      () => {
        emit('select', currentIndex.value, props.datasets[currentIndex.value]);
        setTooltip();
      },
    );

    onBeforeUnmount(() => {
      if (f7Tooltip && f7Tooltip.destroy) {
        f7Tooltip.destroy();
      }
      f7Tooltip = null;
    });

    const classes = computed(() => classNames('pie-chart'));

    return {
      elRef,
      currentIndex,
      classes,
      paths,
      classNames,
      setCurrentIndex,
    };
  },
};
</script>
