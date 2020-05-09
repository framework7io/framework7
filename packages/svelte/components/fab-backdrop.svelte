<script>
  import Utils from '../utils/utils';
  import restProps from '../utils/rest-props';

  let className = undefined;
  export { className as class };

  export let f7Slot = 'fixed';

  $: classes = Utils.classNames(
    className,
    'fab-backdrop',
  );
</script>

<div
  class={classes}
  data-f7-slot={f7Slot}
  {...restProps($$restProps)}
></div>
