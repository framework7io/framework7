<script>
  import Utils from '../utils/utils';
  import Mixins from '../utils/mixins';

  export let id = undefined;
  export let style = undefined;

  let className = undefined;
  export { className as class };

  $: classes = Utils.classNames(
    className,
    'block-footer',
    Mixins.colorClasses($$props),
  );
</script>

<div id={id} style={style} class={classes}><slot /></div>
