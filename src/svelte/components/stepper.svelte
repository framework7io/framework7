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
    formatValue = undefined,
    name = undefined,
    inputId = undefined,
    input = true,
    inputType = 'text',
    inputReadonly = false,
    autorepeat = false,
    autorepeatDynamic = false,
    wraps = false,
    manualInputMode = false,
    decimalPoint = 4,
    buttonsEndInputMode = true,
    disabled = undefined,
    buttonsOnly = undefined,
    round = false,
    roundMd = false,
    roundIos = false,
    fill = false,
    fillMd = false,
    fillIos = false,
    large = false,
    largeMd = false,
    largeIos = false,
    small = false,
    smallMd = false,
    smallIos = false,
    raised = false,
    raisedMd = false,
    raisedIos = false,
    ...restProps
  } = $props();

  let el = $state(null);
  let f7Stepper;

  export function instance() {
    return f7Stepper;
  }

  const classes = $derived(
    classNames(
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
      colorClasses(restProps),
    ),
  );

  function watchValue(newValue) {
    if (!f7Stepper) return;
    f7Stepper.setValue(newValue);
  }

  $effect(() => watchValue(value));

  function onInput(event) {
    restProps.onInput?.(event, f7Stepper);
    restProps.oninput?.(event, f7Stepper);
  }

  function onChange(event) {
    restProps.onChange?.(event, f7Stepper);
    restProps.onchange?.(event, f7Stepper);
  }

  function onMinusClick(event) {
    restProps.onStepperMinusClick?.(event, f7Stepper);
    restProps.onstepperminusclick?.(event, f7Stepper);
  }

  function onPlusClick(event) {
    restProps.onStepperPlusClick?.(event, f7Stepper);
    restProps.onstepperplusclick?.(event, f7Stepper);
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
              restProps.onStepperChange?.(newValue);
              restProps.onstepperchange?.(newValue);
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

<div bind:this={el} class={classes} {...restProps}>
  <div onclick={onMinusClick} class="stepper-button-minus" />
  {#if input && !buttonsOnly}
    <div class="stepper-input-wrap">
      <input
        {name}
        id={inputId}
        type={inputType}
        min={inputType === 'number' ? min : undefined}
        max={inputType === 'number' ? max : undefined}
        step={inputType === 'number' ? step : undefined}
        oninput={onInput}
        onchange={onChange}
        value={typeof value === 'undefined' ? '' : value}
        readonly={inputReadonly}
      />
    </div>
  {/if}
  {#if !input && !buttonsOnly}
    <div class="stepper-value">{value}</div>
  {/if}
  <div onclick={onPlusClick} class="stepper-button-plus" />
</div>
