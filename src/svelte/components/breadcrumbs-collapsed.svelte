<script>
  import { classNames } from '../shared/utils.js';

  let {
    class: className,
    children,
    ...restProps
  } = $props();

  const classes = $derived(classNames(className, 'breadcrumbs-collapsed'));
</script>

<div class={classes} {...restProps}>
  <span></span>
  {@render children?.()}
</div>
