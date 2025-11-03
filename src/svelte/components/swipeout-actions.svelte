<script>
  import { colorClasses } from '../shared/mixins.js';
  import { classNames } from '../shared/utils.js';
  let {
    class: className,
    left = false,
    right = false,
    side = undefined,
    children,
    ...restProps
  } = $props();

  const sideComputed = $derived(side || (left ? 'left' : right ? 'right' : 'left'));

  const classes = $derived(
    classNames(className, `swipeout-actions-${sideComputed}`, colorClasses(restProps)),
  );
</script>

<div class={classes} {...restProps}>
  {@render children?.()}
</div>
