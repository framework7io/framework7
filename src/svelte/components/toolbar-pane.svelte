<script>
  import { colorClasses } from '../shared/mixins.js';
  import { classNames } from '../shared/utils.js';

  let { className, id, style, ref, children, ...restProps } = $props();

  let el = $state(undefined);

  const classes = $derived(classNames(className, 'toolbar-pane', colorClasses(restProps)));
</script>

<div bind:this={el} class={classes} {...restProps}>
  {@render children?.()}
</div>
