<script>
  import Mixins from '../shared/mixins';
  import Utils from '../shared/utils';
  import restProps from '../shared/rest-props';

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
