<script>
  import { onMount, onDestroy } from 'svelte';
  import { colorClasses } from '../shared/mixins.js';
  import { classNames, noUndefinedProps } from '../shared/utils.js';
  import { app, f7ready } from '../shared/f7.js';

  let {
    class: className,
    init = true,
    value = 0,
    min = 0,
    max = 100,
    step = 1,
    label = false,
    dual = false,
    vertical = false,
    verticalReversed = false,
    draggableBar = true,
    formatLabel = undefined,
    scale = false,
    scaleSteps = 5,
    scaleSubSteps = 0,
    formatScaleLabel = undefined,
    limitKnobPosition = undefined,
    name = undefined,
    input = false,
    inputId = undefined,
    disabled = false,
    children,
    ...restProps
  } = $props();

  let el = $state(null);
  let f7Range;

  export function instance() {
    return f7Range;
  }

  const classes = $derived(
    classNames(
      className,
      'range-slider',
      {
        'range-slider-horizontal': !vertical,
        'range-slider-vertical': vertical,
        'range-slider-vertical-reversed': vertical && verticalReversed,
        disabled,
      },
      colorClasses(restProps),
    ),
  );

  function watchValue(newValue) {
    if (!f7Range) return;
    f7Range.setValue(newValue);
  }

  $effect(() => watchValue(value));

  onMount(() => {
    if (!init) return;
    f7ready(() => {
      f7Range = app.f7.range.create(
        noUndefinedProps({
          el,
          value,
          min,
          max,
          step,
          label,
          dual,
          draggableBar,
          vertical,
          verticalReversed,
          formatLabel,
          scale,
          scaleSteps,
          scaleSubSteps,
          formatScaleLabel,
          limitKnobPosition,
          on: {
            change(range, val) {
              restProps.onRangeChange?.(val);
              restProps.onrangechange?.(val);
            },
            changed(range, val) {
              restProps.onRangeChanged?.(val);
              restProps.onrangechanged?.(val);
              value = val;
            },
          },
        }),
      );
    });
  });

  onDestroy(() => {
    if (f7Range && f7Range.destroy) {
      f7Range.destroy();
      f7Range = null;
    }
  });
</script>

<div bind:this={el} class={classes} {...restProps}>
  {#if input}<input type="range" {name} id={inputId} />{/if}
  {@render children?.(f7Range)}
</div>
