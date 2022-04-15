<script>
  import { classNames } from '../shared/utils.js';
  import { restProps } from '../shared/rest-props.js';

  export let active = false;

  let className = undefined;
  export { className as class };

  $: classes = classNames(className, 'breadcrumbs-item', active && 'breadcrumbs-item-active');
</script>

<div class={classes} {...restProps($$restProps)}>
  <slot />
</div>
