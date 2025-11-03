<script>
  import { colorClasses } from '../shared/mixins.js';
  import { classNames } from '../shared/utils.js';

  let { class: className, children, ...restProps } = $props();

  const classes = $derived(classNames(className, 'title-large', colorClasses(restProps)));
</script>

<div class={classes} {...restProps}>
  <div class="title-large-text">
    {@render children?.()}
  </div>
</div>
