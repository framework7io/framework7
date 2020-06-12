<script>
  import Mixins from '../utils/mixins';
  import Utils from '../utils/utils';
  import restProps from '../utils/rest-props';

  let className = undefined;
  export { className as class };

  $: classes = Utils.classNames(
    className,
    'actions-group',
    Mixins.colorClasses($$props),
  );

</script>

<div
  class={classes}
  {...restProps($$restProps)}
>
  <slot />
</div>
