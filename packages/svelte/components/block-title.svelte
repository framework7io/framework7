<script>
  import Mixins from '../utils/mixins';
  import Utils from '../utils/utils';
  import restProps from '../utils/rest-props';

  export let large = false;
  export let medium = false;

  let className = undefined;
  export { className as class };

  $: classes = Utils.classNames(
    className,
    'block-title',
    {
      'block-title-large': large,
      'block-title-medium': medium,
    },
    Mixins.colorClasses($$props),
  );
</script>

<div
  class={classes}
  {...restProps($$restProps)}
>
  <slot />
</div>
