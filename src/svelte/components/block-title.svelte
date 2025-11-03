<script>
  import { colorClasses } from '../shared/mixins.js';
  import { classNames } from '../shared/utils.js';

  let {
    class: className,
    large = false,
    medium = false,
    children,
    ...restProps
  } = $props();


  const classes = $derived(classNames(
    className,
    'block-title',
    {
      'block-title-large': large,
      'block-title-medium': medium,
    },
    colorClasses(restProps),
  ));
</script>

<div class={classes} {...restProps}>
  {@render children?.()}
</div>
