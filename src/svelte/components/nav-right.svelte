<script>
  import Mixins from '../utils/mixins';
  import Utils from '../utils/utils';

  export let id = undefined;
  export let style = undefined;

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
  id={id}
  style={style}
  class={classes}
>
  <slot />
</div>
