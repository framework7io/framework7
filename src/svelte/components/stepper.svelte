<script>
  import { createEventDispatcher, onMount, onDestroy } from 'svelte';
  import { colorClasses } from '../shared/mixins.js';
  import { classNames, noUndefinedProps, plainText, createEmitter } from '../shared/utils.js';
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
  export let fill = false;
  export let fillMd = false;
  export let fillIos = false;
  export let large = false;
  export let largeMd = false;
  export let largeIos = false;
  export let small = false;
  export let smallMd = false;
  export let smallIos = false;
  export let raised = false;
  export let raisedMd = false;
  export let raisedIos = false;

  let el;
  let f7Stepper;

  export function instance() {
    return f7Stepper;
  }

  $: classes = classNames(
    className,
    'stepper',
    {
      disabled,
      'stepper-round': round,
      'stepper-round-ios': roundIos,
      'stepper-round-md': roundMd,
      'stepper-fill': fill,
      'stepper-fill-ios': fillIos,
      'stepper-fill-md': fillMd,
      'stepper-large': large,
      'stepper-large-ios': largeIos,
      'stepper-large-md': largeMd,
      'stepper-small': small,
      'stepper-small-ios': smallIos,
      'stepper-small-md': smallMd,
      'stepper-raised': raised,
      'stepper-raised-ios': raisedIos,
      'stepper-raised-md': raisedMd,
    },
    colorClasses($$props),
  );

  function watchValue(newValue) {
    if (!f7Stepper) return;
    f7Stepper.setValue(newValue);
  }

  $: watchValue(value);

  function onInput(event) {
    emit('input', [event, f7Stepper]);
  }

  function onChange(event) {
    emit('change', [event, f7Stepper]);
  }

  function onMinusClick(event) {
    emit('stepperMinusClick', [event, f7Stepper]);
  }

  function onPlusClick(event) {
    emit('stepperPlusClick', [event, f7Stepper]);
  }

  onMount(() => {
    if (!init) return;
    f7ready(() => {
      f7Stepper = app.f7.stepper.create(
        noUndefinedProps({
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
              emit('stepperChange', [newValue]);
              value = newValue;
            },
          },
        }),
      );
    });
  });

  onDestroy(() => {
    if (f7Stepper && f7Stepper.destroy) {
      f7Stepper.destroy();
      f7Stepper = null;
    }
  });
</script>

<div bind:this={el} class={classes} {...restProps($$restProps)}>
  <div on:click={onMinusClick} class="stepper-button-minus" />
  {#if input && !buttonsOnly}
    <div class="stepper-input-wrap">
      <input
        {name}
        id={inputId}
        type={inputType}
        min={inputType === 'number' ? min : undefined}
        max={inputType === 'number' ? max : undefined}
        step={inputType === 'number' ? step : undefined}
        on:input={onInput}
        on:change={onChange}
        value={typeof value === 'undefined' ? '' : value}
        readonly={inputReadonly}
      />
    </div>
  {/if}
  {#if !input && !buttonsOnly}
    <div class="stepper-value">{plainText(value)}</div>
  {/if}
  <div on:click={onPlusClick} class="stepper-button-plus" />
</div>
