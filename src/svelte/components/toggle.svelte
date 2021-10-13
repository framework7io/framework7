<script>
  import { createEventDispatcher, onMount, onDestroy } from 'svelte';
  import { colorClasses } from '../shared/mixins.js';
  import { classNames, createEmitter } from '../shared/utils.js';
  import { restProps } from '../shared/rest-props.js';
  import { app, f7ready } from '../shared/f7.js';
  import { useTooltip } from '../shared/use-tooltip.js';

  const emit = createEmitter(createEventDispatcher, $$props);

  let className = undefined;
  export { className as class };

  export let init = true;
  export let checked = undefined;
  export let disabled = undefined;
  export let readonly = undefined;
  export let name = undefined;
  export let value = undefined;

  export let tooltip = undefined;
  export let tooltipTrigger = undefined;

  let el;
  let inputEl;
  let f7Toggle;

  export function instance() {
    return f7Toggle;
  }

  $: classes = classNames(
    'toggle',
    className,
    {
      disabled,
    },
    colorClasses($$props),
  );

  let initialWatched = false;
  function watchChecked(isChecked) {
    if (!initialWatched) {
      initialWatched = true;
      return;
    }
    if (!f7Toggle) return;
    f7Toggle.checked = isChecked;
  }

  $: watchChecked(checked);

  function onChange(event) {
    emit('change', [event]);
  }

  onMount(() => {
    if (!init) return;
    f7ready(() => {
      f7Toggle = app.f7.toggle.create({
        el,
        on: {
          change(toggle) {
            emit('toggleChange', [toggle.checked]);
            checked = toggle.checked;
          },
        },
      });
    });
  });

  onDestroy(() => {
    if (f7Toggle && f7Toggle.destroy && f7Toggle.$el) {
      f7Toggle.destroy();
      f7Toggle = null;
    }
  });
</script>

<label
  bind:this={el}
  class={classes}
  {...restProps($$restProps)}
  use:useTooltip={{ tooltip, tooltipTrigger }}
>
  <input
    bind:this={inputEl}
    type="checkbox"
    {name}
    {disabled}
    {readonly}
    {checked}
    value={typeof value === 'undefined' ? '' : value}
    on:change={onChange}
  />
  <span class="toggle-icon" />
</label>
