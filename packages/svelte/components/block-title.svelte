<script>
  import Mixins from '../utils/mixins';
  import Utils from '../utils/utils';

  export let id = undefined;
  export let style = undefined;
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
  id={id}
  style={style}
  class={classes}
>
  <slot />
</div>
