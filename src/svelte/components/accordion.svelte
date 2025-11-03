<script>
  import { colorClasses } from '../shared/mixins.js';
  import { classNames } from '../shared/utils.js';

  let {
    class: className,
    accordionOpposite = false,
    children,
    ...restProps
  } = $props();

  const classes = $derived(classNames(
    className,
    'accordion-list',
    accordionOpposite && 'accordion-opposite',
    colorClasses(restProps),
  ));
</script>

<div class={classes} {...restProps}>
  {@render children?.()}
</div>
