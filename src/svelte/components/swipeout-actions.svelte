<script>
  import Mixins from '../utils/mixins';
  import Utils from '../utils/utils';
  import restProps from '../utils/rest-props';

  let className = undefined;
  export { className as class };

  export let left = undefined;
  export let right = undefined;
  export let side = undefined;

  $: classes = Utils.classNames(
    className,
    `swipeout-actions-${sideComputed}`,
    Mixins.colorClasses($$props),
  );

  // eslint-disable-next-line
  $: sideComputed = side || (left ? 'left' : (right ? 'right' : 'left'));

</script>

<div class={classes} {...restProps($$restProps)}>
  <slot />
</div>
