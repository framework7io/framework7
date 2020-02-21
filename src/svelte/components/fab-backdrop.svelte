<script>
  import Utils from '../utils/utils';

  export let id = undefined;
  export let style = undefined;

  let className = undefined;
  export { className as class };

  export let f7Slot = 'fixed';

  $: classes = Utils.classNames(
    className,
    'fab-backdrop',
  );
</script>

<div
  id={id}
  style={style}
  class={classes}
  data-f7-slot={f7Slot}
></div>
