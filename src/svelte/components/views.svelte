<script>
  import Utils from '../utils/utils';
  import Mixins from '../utils/mixins';

  export let id = undefined;
  export let style = undefined;
  export let tabs = false;

  let className = undefined;
  export { className as class };

  $: classes = Utils.classNames(
    className,
    'views',
    {
      tabs,
    },
    Mixins.colorClasses($$props),
  );

</script>

<div class={classes} style={style} id={id}>
  <slot />
</div>
