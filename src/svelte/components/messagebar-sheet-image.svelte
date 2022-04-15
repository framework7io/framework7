<script>
  import { createEventDispatcher } from 'svelte';
  import { colorClasses } from '../shared/mixins.js';
  import { classNames, createEmitter } from '../shared/utils.js';
  import { restProps } from '../shared/rest-props.js';

  const emit = createEmitter(createEventDispatcher, $$props);

  export let style = undefined;

  let className = undefined;
  export { className as class };

  export let image = undefined;
  export let checked = false;

  $: classes = classNames(className, 'messagebar-sheet-image', 'checkbox', colorClasses($$props));

  $: styles = `${image ? `background-image: url(${image});` : ''}${style || ''}`;

  function onChange(event) {
    if (event.target.checked) emit('checked', [event]);
    else emit('unchecked', [event]);
    emit('change', [event]);
    checked = event.target.checked;
  }
</script>

<label class={classes} style={styles} {...restProps($$restProps)}>
  <input type="checkbox" {checked} on:change={onChange} />
  <i class="icon icon-checkbox" />
  <slot />
</label>
