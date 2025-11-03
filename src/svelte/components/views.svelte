<script>
  import { colorClasses } from '../shared/mixins.js';
  import { classNames } from '../shared/utils.js';
  let { class: className, tabs = false, children, ...restProps } = $props();

  const classes = $derived(
    classNames(
      className,
      'views',
      {
        tabs,
      },
      colorClasses(restProps),
    ),
  );
</script>

<div class={classes} {...restProps}>
  {@render children?.()}
</div>
