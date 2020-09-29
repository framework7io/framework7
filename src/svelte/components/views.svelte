<script>
  import { restProps } from '../shared/rest-props';
  import { colorClasses } from '../shared/mixins';
  import { classNames } from '../shared/utils';

  export let tabs = false;

  let className = undefined;
  export { className as class };

  $: classes = classNames(
    className,
    'views',
    {
      tabs,
    },
    colorClasses($$props),
  );
</script>

<div class={classes} {...restProps($$restProps)}>
  <slot />
</div>
