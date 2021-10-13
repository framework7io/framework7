<script>
  import { colorClasses } from '../shared/mixins.js';
  import { classNames } from '../shared/utils.js';
  import { restProps } from '../shared/rest-props.js';

  let className = undefined;
  export { className as class };

  export let left = undefined;
  export let right = undefined;
  export let side = undefined;

  $: classes = classNames(className, `swipeout-actions-${sideComputed}`, colorClasses($$props));

  // eslint-disable-next-line
  $: sideComputed = side || (left ? 'left' : right ? 'right' : 'left');
</script>

<div class={classes} {...restProps($$restProps)}>
  <slot />
</div>
