<script>
  import { createEventDispatcher } from 'svelte';
  import { classNames, createEmitter } from '../shared/utils.js';
  import { restProps } from '../shared/rest-props.js';

  let className = undefined;
  export { className as class };

  $: classes = classNames(className, 'breadcrumbs-collapsed');

  const emit = createEmitter(createEventDispatcher, $$props);

  function onClick() {
    emit('click');
  }
</script>

<div class={classes} {...restProps($$restProps)} on:click={onClick}>
  <span />
  <slot />
</div>
