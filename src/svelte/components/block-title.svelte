<script>
  import { colorClasses } from '../shared/mixins.js';
  import { classNames } from '../shared/utils.js';
  import { restProps } from '../shared/rest-props.js';

  export let large = false;
  export let medium = false;

  let className = undefined;
  export { className as class };

  $: classes = classNames(
    className,
    'block-title',
    {
      'block-title-large': large,
      'block-title-medium': medium,
    },
    colorClasses($$props),
  );
</script>

<div class={classes} {...restProps($$restProps)}>
  <slot />
</div>
