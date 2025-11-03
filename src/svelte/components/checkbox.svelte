<script>
  import { onMount } from 'svelte';
  import { colorClasses } from '../shared/mixins.js';
  import { classNames } from '../shared/utils.js';

  let {
    class: className,
    checked = undefined,
    indeterminate = undefined,
    name = undefined,
    value = undefined,
    disabled = undefined,
    readonly = undefined,
    children,
    ...restProps
  } = $props();

  let inputEl = $state(null);

  const classes = $derived(
    classNames(
      className,
      {
        checkbox: true,
        disabled,
      },
      colorClasses(restProps),
    ),
  );

  function onChange(event) {
    checked = event.target.checked;
    restProps.onchange?.(event);
  }

  onMount(() => {
    if (indeterminate && inputEl) {
      inputEl.indeterminate = true;
    }
  });

  $effect(() => {
    if (inputEl) {
      inputEl.indeterminate = indeterminate;
    }
  });
</script>

<label class={classes} {...restProps}>
  <input
    bind:this={inputEl}
    type="checkbox"
    {name}
    value={typeof value === 'undefined' ? '' : value}
    {disabled}
    {readonly}
    {checked}
    onchange={onChange}
  />
  <i class="icon-checkbox" />
  {@render children?.()}
</label>
