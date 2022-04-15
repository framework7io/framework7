<script>
  import { createEventDispatcher, onMount, onDestroy } from 'svelte';
  import { colorClasses } from '../shared/mixins.js';
  import { classNames, noUndefinedProps, createEmitter } from '../shared/utils.js';
  import { restProps } from '../shared/rest-props.js';
  import { app, f7ready } from '../shared/f7.js';

  const emit = createEmitter(createEventDispatcher, $$props);

  let className = undefined;
  export { className as class };

  export let init = true;
  export let value = 0;
  export let min = 0;
  export let max = 100;
  export let step = 1;
  export let label = false;
  export let dual = false;
  export let vertical = false;
  export let verticalReversed = false;
  export let draggableBar = true;
  export let formatLabel = undefined;
  export let scale = false;
  export let scaleSteps = 5;
  export let scaleSubSteps = 0;
  export let formatScaleLabel = undefined;
  export let limitKnobPosition = undefined;
  export let name = undefined;
  export let input = false;
  export let inputId = undefined;
  export let disabled = false;

  let el;
  let f7Range;

  export function instance() {
    return f7Range;
  }

  $: classes = classNames(
    className,
    'range-slider',
    {
      'range-slider-horizontal': !vertical,
      'range-slider-vertical': vertical,
      'range-slider-vertical-reversed': vertical && verticalReversed,
      disabled,
    },
    colorClasses($$props),
  );

  function watchValue(newValue) {
    if (!f7Range) return;
    f7Range.setValue(newValue);
  }

  $: watchValue(value);

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
              emit('rangeChange', [val]);
            },
            changed(range, val) {
              emit('rangeChanged', [val]);
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

<div bind:this={el} class={classes} {...restProps($$restProps)}>
  {#if input}<input type="range" {name} id={inputId} />{/if}
  <slot range={f7Range} />
</div>
