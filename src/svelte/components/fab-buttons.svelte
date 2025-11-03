<script>
  import { colorClasses } from '../shared/mixins.js';
  import { classNames } from '../shared/utils.js';

  let { class: className, position = 'top', children, ...restProps } = $props();

  const classes = $derived(
    classNames(className, 'fab-buttons', `fab-buttons-${position}`, colorClasses(restProps)),
  );
</script>

<div class={classes} {...restProps}>
  {@render children?.()}
</div>
