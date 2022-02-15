<script>
  import { classNames } from '../shared/utils.js';
  import { restProps } from '../shared/rest-props.js';

  let className = undefined;
  export { className as class };

  $: classes = classNames(className, 'breadcrumbs');
</script>

<div class={classes} {...restProps($$restProps)}>
  <slot />
</div>
