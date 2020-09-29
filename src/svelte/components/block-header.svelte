<script>
  import { restProps } from '../shared/rest-props';
  import { colorClasses } from '../shared/mixins';
  import { classNames } from '../shared/utils';

  let className = undefined;
  export { className as class };

  $: classes = classNames(className, 'block-header', colorClasses($$props));
</script>

<div class={classes} {...restProps($$restProps)}>
  <slot />
</div>
