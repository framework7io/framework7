<script>
  import { createEventDispatcher } from 'svelte';
  import { colorClasses } from '../shared/mixins';
  import { classNames } from '../shared/utils';
  import { restProps } from '../shared/rest-props';

  const dispatch = createEventDispatcher();

  export let style = undefined;

  let className = undefined;
  export { className as class };

  export let image = undefined;
  export let checked = false;

  $: classes = classNames(className, 'messagebar-sheet-image', 'checkbox', colorClasses($$props));

  $: styles = `${image ? `background-image: url(${image});` : ''}${style || ''}`;

  function onChange(event) {
    if (event.target.checked) dispatch('checked', [event]);
    if (typeof $$props.onChecked === 'function') $$props.onChecked(event);
    else dispatch('unchecked', [event]);
    if (typeof $$props.onUnchecked === 'function') $$props.onUnchecked(event);
    dispatch('change', [event]);
    if (typeof $$props.onChange === 'function') $$props.onChange(event);
  }
</script>

<label class={classes} {...restProps($$restProps)}>
  <input type="checkbox" {checked} on:change={onChange} />
  <i class="icon icon-checkbox" />
  <slot />
</label>
