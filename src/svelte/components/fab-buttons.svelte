<script>
  import { colorClasses } from '../shared/mixins';
  import { classNames } from '../shared/utils';
  import { restProps } from '../shared/rest-props';

  let className = undefined;
  export { className as class };

  export let position = 'top';

  $: classes = classNames(
    className,
    'fab-buttons',
    `fab-buttons-${position}`,
    colorClasses($$props),
  );
</script>

<div class={classes} {...restProps($$restProps)}>
  <slot />
</div>
