<script>
  import { classNames } from '../shared/utils.js';

  let {
    class: className,
    children,
    ...restProps
  } = $props();

  const classes = $derived(classNames(className, 'breadcrumbs'));
</script>

<div class={classes} {...restProps}>
  {@render children?.()}
</div>
