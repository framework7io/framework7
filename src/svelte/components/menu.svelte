<script>
  import { colorClasses } from '../shared/mixins';
  import { classNames } from '../shared/utils';
  import { restProps } from '../shared/rest-props';

  let className = undefined;
  export { className as class };

  $: classes = classNames(className, 'menu', colorClasses($$props));
</script>

<div class={classes} {...restProps($$restProps)}>
  <div class="menu-inner">
    <slot />
  </div>
</div>
