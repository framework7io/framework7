<script>
  import { onDestroy } from 'svelte';
  import { classNames } from '../shared/utils.js';
  import { app } from '../shared/f7.js';

  let {
    class: className,
    size = 320,
    tooltip = false,
    datasets = [],
    formatTooltip = undefined,
    children,
    ...restProps
  } = $props();

  let el = $state(null);
  let currentIndex = $state(null);
  let previousIndex = $state(null);
  let f7Tooltip = null;
  let timeout = $state(null);

  const setCurrentIndex = (index) => {
    if (index === null) {
      timeout = setTimeout(() => {
        previousIndex = currentIndex;
        currentIndex = index;
      });
    } else {
      clearTimeout(timeout);
      previousIndex = currentIndex;
      currentIndex = index;
    }
  };

  const getSummValue = () => {
    let summ = 0;
    datasets
      .map((d) => d.value || 0)
      .forEach((value) => {
        summ += value;
      });
    return summ;
  };

  const getPaths = () => {
    const paths = [];

    let cumulativePercentage = 0;

    function getCoordinatesForPercentage(percentage) {
      const x = Math.cos(2 * Math.PI * percentage) * (size / 3);
      const y = Math.sin(2 * Math.PI * percentage) * (size / 3);
      return [x, y];
    }

    datasets.forEach(({ value, label, color }) => {
      const percentage = value / getSummValue();

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
  };

  const formatTooltipText = () => {
    if (currentIndex === null) return '';
    const { value, label, color } = datasets[currentIndex];
    const percentage = (value / getSummValue()) * 100;

    const round = (v) => {
      if (parseInt(v, 10) === v) return v;
      return Math.round(v * 100) / 100;
    };

    if (formatTooltip) {
      return formatTooltip({
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
  };

  const setTooltip = () => {
    if (currentIndex === null && !f7Tooltip) return;
    if (!tooltip || !el || !app.f7) return;
    if (currentIndex !== null && !f7Tooltip) {
      f7Tooltip = app.f7.tooltip.create({
        trigger: 'manual',
        containerEl: el,
        targetEl: el.querySelector(`path[data-index="${currentIndex}"]`),
        text: formatTooltipText(),
        cssClass: 'pie-chart-tooltip',
      });
      f7Tooltip.show();
      return;
    }
    if (!f7Tooltip) return;
    if (currentIndex !== null) {
      f7Tooltip.setText(formatTooltipText());
      f7Tooltip.setTargetEl(el.querySelector(`path[data-index="${currentIndex}"]`));

      f7Tooltip.show();
    } else {
      f7Tooltip.hide();
    }
  };

  const watchCurrentIndex = () => {
    if (currentIndex === previousIndex) return;
    restProps.onSelect?.(currentIndex, datasets[currentIndex]);
    restProps.onselect?.(currentIndex, datasets[currentIndex]);
    setTooltip();
  };

  const classes = $derived(classNames('pie-chart', className));
  const paths = $derived(getPaths(datasets));

  $effect(() => watchCurrentIndex(currentIndex));

  onDestroy(() => {
    if (f7Tooltip && f7Tooltip.destroy) {
      f7Tooltip.destroy();
    }
    f7Tooltip = null;
  });
</script>

<div bind:this={el} class={classes} {...restProps}>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox={`-${size / 3} -${size / 3} ${(size * 2) / 3} ${(size * 2) / 3}`}
    style="transform: rotate(-90deg)"
  >
    {#each paths as path, index (index)}
      <!-- svelte-ignore a11y_click_events_have_key_events -->
      <!-- svelte-ignore a11y_no_static_element_interactions -->
      <path
        d={path.points}
        fill={path.color}
        data-index={index}
        class={classNames({ 'pie-chart-hidden': currentIndex !== null && currentIndex !== index })}
        onclick={() => setCurrentIndex(index)}
        onmouseenter={() => setCurrentIndex(index)}
        onmouseleave={() => setCurrentIndex(null)}
      ></path>
    {/each}
  </svg>
  {@render children?.()}
</div>
