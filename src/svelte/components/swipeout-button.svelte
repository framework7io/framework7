<script>
  import { colorClasses } from '../shared/mixins.js';
  import { classNames } from '../shared/utils.js';
  let {
    class: className,
    delete: deleteProp,
    text = undefined,
    confirmTitle = undefined,
    confirmText = undefined,
    overswipe = undefined,
    close = undefined,
    href = undefined,
    children,
    ...restProps
  } = $props();

  const classes = $derived(
    classNames(
      className,
      {
        'swipeout-overswipe': overswipe,
        'swipeout-delete': deleteProp,
        'swipeout-close': close,
      },
      colorClasses(restProps),
    ),
  );

  function onClick() {
    restProps.onClick?.();
    restProps.onclick?.();
  }
</script>

<a
  href={href || '#'}
  data-confirm={confirmText || undefined}
  data-confirm-title={confirmTitle || undefined}
  class={classes}
  onclick={onClick}
  {...restProps}
>
  {#if text}
    {text}
  {/if}
  {@render children?.()}
</a>
