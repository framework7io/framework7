<script>
  import { colorClasses } from '../shared/mixins.js';
  import { classNames } from '../shared/utils.js';

  let { class: className, children, ...restProps } = $props();

  const classes = $derived(classNames(className, 'messages-title', colorClasses(restProps)));
</script>

<div class={classes} {...restProps}>
  {@render children?.()}
</div>
