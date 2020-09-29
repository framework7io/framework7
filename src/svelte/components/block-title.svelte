<script>
  import { colorClasses } from '../shared/mixins';
  import { classNames } from '../shared/utils';
  import { restProps } from '../shared/rest-props';

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
