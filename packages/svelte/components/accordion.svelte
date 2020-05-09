<script>
  import Mixins from '../utils/mixins';
  import Utils from '../utils/utils';
  import restProps from '../utils/rest-props';

  let className = undefined;
  export { className as class };

  export let accordionOpposite = undefined;

  $: classes = Utils.classNames(
    className,
    'accordion-list',
    accordionOpposite && 'accordion-opposite',
    Mixins.colorClasses($$props),
  );

</script>

<div class={classes} {...restProps($$restProps)}>
  <slot />
</div>
