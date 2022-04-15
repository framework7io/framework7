<script>
  import { restProps } from '../shared/rest-props.js';
  import { colorClasses } from '../shared/mixins.js';
  import { classNames } from '../shared/utils.js';

  let className = undefined;
  export { className as class };

  $: classes = classNames(className, 'block-header', colorClasses($$props));
</script>

<div class={classes} {...restProps($$restProps)}>
  <slot />
</div>
