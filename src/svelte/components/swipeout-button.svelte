<script>
  import { createEventDispatcher } from 'svelte';

  import { colorClasses } from '../shared/mixins';
  import { classNames, plainText } from '../shared/utils';
  import { restProps } from '../shared/rest-props';

  const dispatch = createEventDispatcher();

  let className = undefined;
  export { className as class };

  export let text = undefined;
  export let confirmTitle = undefined;
  export let confirmText = undefined;
  export let overswipe = undefined;
  export let close = undefined;
  let deleteProp = undefined;
  export { deleteProp as delete };
  export let href = undefined;

  $: classes = classNames(
    className,
    {
      'swipeout-overswipe': overswipe,
      'swipeout-delete': deleteProp,
      'swipeout-close': close,
    },
    colorClasses($$props),
  );

  function onClick() {
    dispatch('click');
    if (typeof $$props.onClick === 'function') $$props.onClick();
  }
</script>

<a
  href={href || '#'}
  data-confirm={confirmText || undefined}
  data-confirm-title={confirmTitle || undefined}
  class={classes}
  on:click={onClick}
  {...restProps($$restProps)}>
  {plainText(text)}
  <slot />
</a>
