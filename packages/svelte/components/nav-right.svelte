<script>
  import Mixins from '../utils/mixins';
  import Utils from '../utils/utils';
  import restProps from '../utils/rest-props';

  let className = undefined;
  export { className as class };

  export let sliding = undefined;

  $: classes = Utils.classNames(
    className,
    'right',
    {
      sliding,
    },
    Mixins.colorClasses($$props),
  );
</script>
<div
  class={classes}
  {...restProps($$restProps)}
>
  <slot />
</div>
