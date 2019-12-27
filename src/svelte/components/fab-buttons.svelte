<script>
  import Mixins from '../utils/mixins';
  import Utils from '../utils/utils';

  export let id = undefined;
  export let style = undefined;

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

<div id={id} style={style} class={classes}>
  <slot />
</div>
