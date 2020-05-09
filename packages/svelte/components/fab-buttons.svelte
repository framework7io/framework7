<script>
  import Mixins from '../utils/mixins';
  import Utils from '../utils/utils';
  import restProps from '../utils/rest-props';

  let className = undefined;
  export { className as class };

  export let position = 'top';

  $: classes = Utils.classNames(
    className,
    'fab-buttons',
    `fab-buttons-${position}`,
    Mixins.colorClasses($$props),
  );

</script>

<div class={classes} {...restProps($$restProps)}>
  <slot />
</div>
