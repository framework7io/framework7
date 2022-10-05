<script>
  import { createEventDispatcher } from 'svelte';

  import { colorClasses } from '../shared/mixins.js';
  import { classNames, createEmitter } from '../shared/utils.js';
  import { restProps } from '../shared/rest-props.js';

  const emit = createEmitter(createEventDispatcher, $$props);

  let className = undefined;
  export { className as class };

  export let strong = false;

  $: classes = classNames(
    className,
    'actions-label',
    {
      'actions-button-strong': strong,
    },
    colorClasses($$props),
  );

  function onClick() {
    emit('click');
  }
</script>

<div class={classes} on:click={onClick} {...restProps($$restProps)}>
  <slot />
</div>
