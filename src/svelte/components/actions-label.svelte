<script>
  import { createEventDispatcher } from 'svelte';

  import { colorClasses } from '../shared/mixins';
  import { classNames, createEmitter } from '../shared/utils';
  import { restProps } from '../shared/rest-props';

  const emit = createEmitter(createEventDispatcher, $$props);

  let className = undefined;
  export { className as class };

  export let bold = false;

  $: classes = classNames(
    className,
    'actions-label',
    {
      'actions-button-bold': bold,
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
