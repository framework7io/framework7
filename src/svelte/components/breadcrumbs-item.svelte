<script>
  import { classNames } from '../shared/utils.js';

  let {
    class: className,
    active = false,
    children,
    ...restProps
  } = $props();

  const classes = $derived(classNames(className, 'breadcrumbs-item', active && 'breadcrumbs-item-active'));
</script>

<div class={classes} {...restProps}>
  {@render children?.()}
</div>
