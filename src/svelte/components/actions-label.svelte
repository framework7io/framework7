<script>
  import { createEventDispatcher } from 'svelte';

  import { colorClasses } from '../shared/mixins';
  import { classNames } from '../shared/utils';
  import { restProps } from '../shared/rest-props';

  const dispatch = createEventDispatcher();

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
    dispatch('click');
    if (typeof $$props.onClick === 'function') $$props.onClick();
  }
</script>

<div class={classes} on:click={onClick} {...restProps($$restProps)}>
  <slot />
</div>
