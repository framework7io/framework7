<script>
  import { colorClasses } from '../shared/mixins.js';
  import { classNames } from '../shared/utils.js';

  let {
    class: className,
    title = undefined,
    subtitle = undefined,
    children,
    ...restProps
  } = $props();

  const classes = $derived(classNames(className, 'title', {}, colorClasses(restProps)));
</script>

<div class={classes} {...restProps}>
  {#if typeof title === 'function'}
    {@render title?.()}
  {:else}
    {title}
  {/if}
  {#if typeof subtitle !== 'undefined'}
    <span class="subtitle">
      {#if typeof subtitle === 'function'}
        {@render subtitle?.()}
      {:else}
        {subtitle}
      {/if}
    </span>
  {/if}
  {@render children?.()}
</div>
