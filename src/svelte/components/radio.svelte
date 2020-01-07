<script>
  import { createEventDispatcher } from 'svelte';
  import Mixins from '../utils/mixins';
  import Utils from '../utils/utils';

  const dispatch = createEventDispatcher();

  export let id = undefined;
  export let style = undefined;

  let className = undefined;
  export { className as class };

  export let checked = undefined;
  export let name = undefined;
  export let value = undefined;
  export let disabled = undefined;
  export let readonly = undefined;

  let inputEl;

  $: classes = Utils.classNames(
    className,
    'radio',
    {
      disabled,
    },
    Mixins.colorClasses($$props),
  );

  function onChange(event) {
    dispatch('change', [event]);
    if (typeof $$props.onChange === 'function') $$props.onChange(event);
  }
</script>

<label id={id} style={style} class={classes}>
  <input
    bind:this={inputEl}
    type="radio"
    name={name}
    value={typeof value === 'undefined' ? '' : value}
    disabled={disabled}
    readonly={readonly}
    checked={checked}
    on:change={onChange}
  />
  <i class="icon-radio" />
  <slot />
</label>
