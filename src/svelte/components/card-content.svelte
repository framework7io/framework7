<script>
  import { colorClasses } from '../shared/mixins.js';
  import { classNames } from '../shared/utils.js';

  let {
    class: className,
    padding = true,
    children,
    ...restProps
  } = $props();

  const classes = $derived(classNames(
    className,
    'card-content',
    {
      'card-content-padding': padding,
    },
    colorClasses(restProps),
  ));
</script>

<div class={classes} {...restProps}>
  {@render children?.()}
</div>
