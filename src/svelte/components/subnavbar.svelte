<script>
  import { colorClasses } from '../shared/mixins.js';
  import { classNames } from '../shared/utils.js';
  let {
    class: className,
    title = undefined,
    inner = true,
    f7Slot = 'fixed',
    children,
    ...restProps
  } = $props();

  const classes = $derived(classNames(className, 'subnavbar', {}, colorClasses(restProps)));
</script>

<div class={classes} data-f7-slot={f7Slot} {...restProps}>
  {#if inner}
    <div class="subnavbar-inner">
      {#if title}
        <div class="subnavbar-title">{title}</div>
      {/if}
      {@render children?.()}
    </div>
  {:else}
    {@render children?.()}
  {/if}
</div>
