<script>
  import Utils from '../utils/utils';
  import restProps from '../utils/rest-props';
  import Mixins from '../utils/mixins';

  let className = undefined;
  export { className as class };

  $: classes = Utils.classNames(
    className,
    'block-footer',
    Mixins.colorClasses($$props),
  );
</script>

<div class={classes} {...restProps($$restProps)}><slot /></div>
