<script>
  import Utils from '../shared/utils';
  import restProps from '../shared/rest-props';
  import Mixins from '../shared/mixins';

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

<div class={classes} {...restProps($$restProps)}>
  <slot />
</div>
