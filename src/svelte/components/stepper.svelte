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
  export let formatValue = undefined;
  export let name = undefined;
  export let inputId = undefined;
  export let input = true;
  export let inputType = 'text';
  export let inputReadonly = false;
  export let autorepeat = false;
  export let autorepeatDynamic = false;
  export let wraps = false;
  export let manualInputMode = false;
  export let decimalPoint = 4;
  export let buttonsEndInputMode = true;
  export let disabled = undefined;
  export let buttonsOnly = undefined;

  export let round = false;
  export let roundMd = false;
  export let roundIos = false;
  export let roundAurora = false;
  export let fill = false;
  export let fillMd = false;
  export let fillIos = false;
  export let fillAurora = false;
  export let large = false;
  export let largeMd = false;
  export let largeIos = false;
  export let largeAurora = false;
  export let small = false;
  export let smallMd = false;
  export let smallIos = false;
  export let smallAurora = false;
  export let raised = false;
  export let raisedMd = false;
  export let raisedIos = false;
  export let raisedAurora = false;

  let el;
  let f7Stepper;

  $: classes = Utils.classNames(
    className,
    'stepper',
    {
      disabled,
      'stepper-round': round,
      'stepper-round-ios': roundIos,
      'stepper-round-md': roundMd,
      'stepper-round-aurora': roundAurora,
      'stepper-fill': fill,
      'stepper-fill-ios': fillIos,
      'stepper-fill-md': fillMd,
      'stepper-fill-aurora': fillAurora,
      'stepper-large': large,
      'stepper-large-ios': largeIos,
      'stepper-large-md': largeMd,
      'stepper-large-aurora': largeAurora,
      'stepper-small': small,
      'stepper-small-ios': smallIos,
      'stepper-small-md': smallMd,
      'stepper-small-aurora': smallAurora,
      'stepper-raised': raised,
      'stepper-raised-ios': raisedIos,
      'stepper-raised-md': raisedMd,
      'stepper-raised-aurora': raisedAurora,
    },
    Mixins.colorClasses($$props),
  );

  function watchValue(newValue) {
    if (!f7Stepper) return;
    f7Stepper.setValue(newValue);
  }

  $: watchValue(value);

  function onInput(event) {
    dispatch('input', [event, f7Stepper]);
  }

  function onChange(event) {
    dispatch('change', [event, f7Stepper]);
  }

  function onMinusClick(event) {
    dispatch('stepper:minusclick', [event, f7Stepper]);
  }

  function onPlusClick(event) {
    dispatch('stepper:plusclick', [event, f7Stepper]);
  }

  onMount(() => {
    if (!init) return;
    f7.ready(() => {
      f7Stepper = f7.instance.stepper.create(Utils.noUndefinedProps({
        el,
        min,
        max,
        value,
        step,
        formatValue,
        autorepeat,
        autorepeatDynamic,
        wraps,
        manualInputMode,
        decimalPoint,
        buttonsEndInputMode,
        on: {
          change(stepper, newValue) {
            dispatch('stepper:change', [newValue]);
          },
        },
      }));
    });
  });

  onDestroy(() => {
    if (f7Stepper && f7Stepper.destroy) f7Stepper.destroy();
  });
</script>

<div bind:this={el} id={id} style={style} class={classes}>
  <div on:click={onMinusClick} class="stepper-button-minus" />
  {#if (input && !buttonsOnly)}
  <div class="stepper-input-wrap">
    <input
      name={name}
      id={inputId}
      type={inputType}
      min={inputType === 'number' ? min : undefined}
      max={inputType === 'number' ? max : undefined}
      step={inputType === 'number' ? step : undefined}
      on:input={onInput}
      on:change={onChange}
      value={value}
      readonly={inputReadonly}
    />
  </div>
  {/if}
  {#if (!input && !buttonsOnly)}
    <div class="stepper-value">{value}</div>
  {/if}
  <div on:click={onPlusClick} class="stepper-button-plus" />
</div>
