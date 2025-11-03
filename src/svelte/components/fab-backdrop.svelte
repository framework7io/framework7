<script>
  import { classNames } from '../shared/utils.js';

  let { class: className, f7Slot = 'fixed', children, ...restProps } = $props();

  const classes = $derived(classNames(className, 'fab-backdrop'));
</script>

<div class={classes} data-f7-slot={f7Slot} {...restProps}>
  {@render children?.()}
</div>
