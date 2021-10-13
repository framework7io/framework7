<script>
  import { restProps } from '../shared/rest-props.js';
  import { colorClasses } from '../shared/mixins.js';
  import { classNames } from '../shared/utils.js';

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
