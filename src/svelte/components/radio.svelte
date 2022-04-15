<script>
  import { createEventDispatcher } from 'svelte';
  import { colorClasses } from '../shared/mixins.js';
  import { classNames, createEmitter } from '../shared/utils.js';
  import { restProps } from '../shared/rest-props.js';

  const emit = createEmitter(createEventDispatcher, $$props);

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
    emit('change', [event]);
    checked = event.target.checked;
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
    on:change={onChange}
  />
  <i class="icon-radio" />
  <slot />
</label>
