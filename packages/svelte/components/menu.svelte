<script>
  import Mixins from '../utils/mixins';
  import Utils from '../utils/utils';

  export let id = undefined;
  export let style = undefined;

  let className = undefined;
  export { className as class };

  $: classes = Utils.classNames(
    className,
    'menu',
    Mixins.colorClasses($$props),
  );

</script>

<div id={id} style={style} class={classes}>
  <div class="menu-inner">
    <slot />
  </div>
</div>
