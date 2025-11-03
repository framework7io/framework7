<script>
  import { onMount, onDestroy } from 'svelte';
  import { colorClasses } from '../shared/mixins.js';
  import { classNames } from '../shared/utils.js';
  import { app, f7ready } from '../shared/f7.js';
  import { useTooltip } from '../shared/use-tooltip.js';

  let {
    class: className,
    init = true,
    checked = undefined,
    disabled = undefined,
    readonly = undefined,
    name = undefined,
    value = undefined,
    tooltip = undefined,
    tooltipTrigger = undefined,
    ...restProps
  } = $props();

  let el = $state(null);
  let inputEl = $state(null);
  let f7Toggle;

  export function instance() {
    return f7Toggle;
  }

  const classes = $derived(
    classNames(
      'toggle',
      className,
      {
        disabled,
      },
      colorClasses(restProps),
    ),
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

  $effect(() => watchChecked(checked));

  function onChange(event) {
    restProps.onChange?.(event);
    restProps.onchange?.(event);
  }

  onMount(() => {
    if (!init) return;
    f7ready(() => {
      f7Toggle = app.f7.toggle.create({
        el,
        on: {
          change(toggle) {
            restProps.onToggleChange?.(toggle.checked);
            restProps.ontogglechange?.(toggle.checked);
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

<label bind:this={el} class={classes} {...restProps} use:useTooltip={{ tooltip, tooltipTrigger }}>
  <input
    bind:this={inputEl}
    type="checkbox"
    {name}
    {disabled}
    {readonly}
    {checked}
    value={typeof value === 'undefined' ? '' : value}
    onchange={onChange}
  />
  <span class="toggle-icon"></span>
</label>
