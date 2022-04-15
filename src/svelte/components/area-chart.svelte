<script>
  import { createEventDispatcher, onDestroy, onMount } from 'svelte';
  import { classNames, createEmitter } from '../shared/utils.js';
  import { restProps } from '../shared/rest-props.js';
  import { app } from '../shared/f7.js';

  const emit = createEmitter(createEventDispatcher, $$props);

  let className = undefined;
  export { className as class };

  export let lineChart = false;
  export let datasets = [];
  export let axis = false;
  export let axisLabels = [];
  export let tooltip = false;
  export let legend = false;
  export let toggleDatasets = false;
  export let width = 640;
  export let height = 320;
  export let maxAxisLabels = 8;

  let formatAxisLabelProp = undefined;
  export { formatAxisLabelProp as formatAxisLabel };
  let formatLegendLabelProp = undefined;
  export { formatLegendLabelProp as formatLegendLabel };
  let formatTooltipProp = undefined;
  export { formatTooltipProp as formatTooltip };
  export let formatTooltipAxisLabel = undefined;
  export let formatTooltipTotal = undefined;
  export let formatTooltipDataset = undefined;

  let el;
  let svgEl = null;
  let currentIndex = null;
  let previousIndex = null;
  let hiddenDatasets = [];
  let f7Tooltip = null;
  let linesOffsets = null;

  const setCurrentIndex = (value) => {
    previousIndex = currentIndex;
    currentIndex = value;
  };
  const setHiddenDatasets = (value) => {
    hiddenDatasets = value;
  };

  const getVisibleLegends = () => {
    if (!maxAxisLabels || axisLabels.length <= maxAxisLabels) return axisLabels;
    const skipStep = Math.ceil(axisLabels.length / maxAxisLabels);
    const filtered = axisLabels.filter((label, index) => index % skipStep === 0);
    return filtered;
  };

  const getSummValues = () => {
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
  };

  const getChartData = () => {
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
      maxValue = Math.max(...getSummValues());
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
  };

  const getVerticalLines = () => {
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
  };

  const toggleDataset = (index) => {
    if (!toggleDatasets) return;
    if (hiddenDatasets.includes(index)) {
      hiddenDatasets.splice(hiddenDatasets.indexOf(index), 1);
    } else {
      hiddenDatasets.push(index);
    }
    setHiddenDatasets([...hiddenDatasets]);
  };

  const formatAxisLabel = (label) => {
    if (formatAxisLabelProp) return formatAxisLabelProp(label);
    return label;
  };

  const formatLegendLabel = (label) => {
    if (formatLegendLabelProp) return formatLegendLabelProp(label);
    return label;
  };

  const calcLinesOffsets = () => {
    const lines = svgEl.querySelectorAll('line');
    linesOffsets = [];
    for (let i = 0; i < lines.length; i += 1) {
      linesOffsets.push(lines[i].getBoundingClientRect().left);
    }
  };

  const formatTooltip = () => {
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
    if (formatTooltipProp) {
      return formatTooltipProp({
        index: currentIndex,
        total,
        datasets: currentValues,
      });
    }
    let labelText = formatTooltipAxisLabel
      ? formatTooltipAxisLabel(axisLabels[currentIndex])
      : formatAxisLabel(axisLabels[currentIndex]);
    if (!labelText) labelText = '';
    const totalText = formatTooltipTotal ? formatTooltipTotal(total) : total;
    // prettier-ignore
    const datasetsText = currentValues.length > 0 ? `
      <ul class="area-chart-tooltip-list">
        ${currentValues
          .map(({ label, color, value }) => {
            const valueText = formatTooltipDataset
              ? formatTooltipDataset(label, value, color)
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
    if (!tooltip) return;
    if (currentIndex === null && !f7Tooltip) return;
    const hasVisibleDataSets =
      datasets.filter((dataset, index) => !hiddenDatasets.includes(index)).length > 0;
    if (!hasVisibleDataSets) {
      if (f7Tooltip && f7Tooltip.hide) f7Tooltip.hide();
      return;
    }

    if (currentIndex !== null && !f7Tooltip) {
      f7Tooltip = app.f7.tooltip.create({
        trigger: 'manual',
        containerEl: el,
        targetEl: svgEl.querySelector(`line[data-index="${currentIndex}"]`),
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
    if (currentIndex !== null) {
      f7Tooltip.setText(formatTooltip());
      f7Tooltip.setTargetEl(svgEl.querySelector(`line[data-index="${currentIndex}"]`));
      f7Tooltip.show();
    } else {
      f7Tooltip.hide();
    }
  };

  const onMouseEnter = () => {
    calcLinesOffsets();
  };

  const onMouseMove = (e) => {
    if (!linesOffsets) {
      calcLinesOffsets();
    }
    let currentLeft = e.pageX;
    if (typeof currentLeft === 'undefined') currentLeft = 0;
    const distances = linesOffsets.map((left) => Math.abs(currentLeft - left));
    const minDistance = Math.min(...distances);
    const closestIndex = distances.indexOf(minDistance);
    setCurrentIndex(closestIndex);
  };

  const onMouseLeave = () => {
    setCurrentIndex(null);
  };

  const attachEvents = () => {
    if (!svgEl) return;
    svgEl.addEventListener('mouseenter', onMouseEnter);
    svgEl.addEventListener('mousemove', onMouseMove);
    svgEl.addEventListener('mouseleave', onMouseLeave);
  };

  const detachEvents = () => {
    if (!svgEl) return;
    svgEl.removeEventListener('mouseenter', onMouseEnter);
    svgEl.removeEventListener('mousemove', onMouseMove);
    svgEl.removeEventListener('mouseleave', onMouseLeave);
  };

  onMount(() => {
    attachEvents();
  });

  onDestroy(() => {
    detachEvents();
    if (f7Tooltip && f7Tooltip.destroy) {
      f7Tooltip.destroy();
    }
    f7Tooltip = null;
  });

  const watchCurrentIndex = () => {
    if (currentIndex === previousIndex) return;
    emit('select', [currentIndex]);
    setTooltip();
  };

  $: watchCurrentIndex(currentIndex);
  $: classes = classNames('area-chart', className);

  $: chartData = getChartData(datasets, hiddenDatasets);
  $: verticalLines = getVerticalLines(datasets);
  $: visibleLegends = getVisibleLegends(maxAxisLabels, axisLabels);
</script>

<div bind:this={el} class={classes} {...restProps($$restProps)}>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    {width}
    {height}
    viewBox={`0 0 ${width} ${height}`}
    preserveAspectRatio="none"
    bind:this={svgEl}
  >
    {#each chartData as data, index (index)}
      {#if lineChart}
        <path stroke={data.color} fillRule="evenodd" d={data.points} />
      {:else}
        <polygon fill={data.color} fillRule="evenodd" points={data.points} />
      {/if}
    {/each}

    {#each verticalLines as line, index (index)}
      <line
        data-index={index}
        fill="#000"
        x1={line}
        y1={0}
        x2={line}
        y2={height}
        class={classNames({ 'area-chart-current-line': currentIndex === index })}
      />
    {/each}
  </svg>
  {#if axis}
    <div class="area-chart-axis">
      {#each axisLabels as label, index (index)}
        <span>
          {#if visibleLegends.includes(label)}<span>{formatAxisLabel(label)}</span>{/if}
        </span>
      {/each}
    </div>
  {/if}
  {#if legend}
    <div class="area-chart-legend">
      {#each datasets as dataset, index}
        {#if toggleDatasets}
          <button
            class={classNames('area-chart-legend-item', {
              'area-chart-legend-item-hidden': hiddenDatasets.includes(index),
              'area-chart-legend-button': toggleDatasets,
            })}
            type="button"
            on:click={() => toggleDataset(index)}
          >
            <span style={`background-color: ${dataset.color}`} />
            {formatLegendLabel(dataset.label)}
          </button>
        {:else}
          <span class="area-chart-legend-item">
            <span style={`background-color: ${dataset.color}`} />
            {formatLegendLabel(dataset.label)}
          </span>
        {/if}
      {/each}
    </div>
  {/if}
  <slot />
</div>
