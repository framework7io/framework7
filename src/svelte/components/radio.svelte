<script>
  import { createEventDispatcher } from 'svelte';
  import { colorClasses } from '../shared/mixins';
  import { classNames } from '../shared/utils';
  import { restProps } from '../shared/rest-props';

  const dispatch = createEventDispatcher();

  let className = undefined;
  export { className as class };

  export let checked = undefined;
  export let name = undefined;
  export let value = undefined;
  export let disabled = undefined;
  export let readonly = undefined;

  let inputEl;

  $: classes = classNames(
    className,
    'radio',
    {
      disabled,
    },
    colorClasses($$props),
  );

  function onChange(event) {
    dispatch('change', [event]);
    if (typeof $$props.onChange === 'function') $$props.onChange(event);
  }
</script>

<label class={classes} {...restProps($$restProps)}>
  <input
    bind:this={inputEl}
    type="radio"
    {name}
    value={typeof value === 'undefined' ? '' : value}
    {disabled}
    {readonly}
    {checked}
    on:change={onChange} />
  <i class="icon-radio" />
  <slot />
</label>
