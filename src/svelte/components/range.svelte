<script>
  import { createEventDispatcher, onMount, onDestroy } from 'svelte';
  import Mixins from '../utils/mixins';
  import Utils from '../utils/utils';
  import f7 from '../utils/f7';

  const dispatch = createEventDispatcher();

  export let id = undefined;
  export let style = undefined;

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
  export function setValue(newValue) {
    if (f7Range && f7Range.setValue) f7Range.setValue(newValue);
  }
  export function getValue() {
    if (f7Range && f7Range.getValue) {
      return f7Range.getValue();
    }
    return undefined;
  }

  $: classes = Utils.classNames(
    className,
    'range-slider',
    {
      'range-slider-horizontal': !vertical,
      'range-slider-vertical': vertical,
      'range-slider-vertical-reversed': vertical && verticalReversed,
      disabled,
    },
    Mixins.colorClasses($$props),
  );

  function watchValue(newValue) {
    if (!f7Range) return;
    f7Range.setValue(newValue);
  }

  $: watchValue(value);

  onMount(() => {
    if (!init) return;
    f7.ready(() => {
      f7Range = f7.instance.range.create(Utils.noUndefinedProps({
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
            dispatch('rangeChange', [val]);
            if (typeof $$props.onRangeChange === 'function') $$props.onRangeChange(val);
          },
          changed(range, val) {
            dispatch('rangeChanged', [val]);
            if (typeof $$props.onRangeChanged === 'function') $$props.onRangeChanged(val);
          },
        },
      }));
    });
  });

  onDestroy(() => {
    if (f7Range && f7Range.destroy) f7Range.destroy();
  });
</script>

<div
  bind:this={el}
  id={id}
  style={style}
  class={classes}
>
  {#if input}
    <input type="range" name={name} id={inputId} />
  {/if}
  <slot />
</div>
