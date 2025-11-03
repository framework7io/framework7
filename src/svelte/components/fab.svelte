<script>
  import { onMount } from 'svelte';
  import { colorClasses } from '../shared/mixins.js';
  import { classNames } from '../shared/utils.js';
  import { app, f7ready } from '../shared/f7.js';
  import { useTooltip } from '../shared/use-tooltip.js';

  let {
    class: className,
    morphTo = undefined,
    href = undefined,
    target = undefined,
    text = undefined,
    link = undefined,
    root = undefined,
    position = 'right-bottom',
    tooltip = undefined,
    tooltipTrigger = undefined,
    f7Slot = 'fixed',
    children,
    ...restProps
  } = $props();

  let el = $state(null);
  let linkEl = $state(null);
  let textEl = $state(null);

  const hrefComputed = $derived(href === true ? '#' : href || undefined);

  const classes = $derived(
    classNames(
      className,
      'fab',
      `fab-${position}`,
      {
        'fab-morph': morphTo,
        'fab-extended': text || typeof textEl !== 'undefined',
      },
      colorClasses(restProps),
    ),
  );

  onMount(() => {
    f7ready(() => {
      const dom7 = app.f7.$;
      const rootEls = dom7(linkEl).children('.fab-buttons');
      if (rootEls.length) {
        dom7(el).append(rootEls);
      }
    });
  });
  $effect(() => {
    if (!app.f7) return;
    const dom7 = app.f7.$;
    const rootEls = dom7(linkEl).children('.fab-buttons');
    if (rootEls.length) {
      dom7(el).append(rootEls);
    }
  });
</script>

<div class={classes} data-morph-to={morphTo} bind:this={el} data-f7-slot={f7Slot} {...restProps}>
  <a
    bind:this={linkEl}
    onclick={restProps.onclick?.()}
    {target}
    href={hrefComputed}
    use:useTooltip={{ tooltip, tooltipTrigger }}
  >
    {@render children?.()}
    {#if typeof text !== 'undefined'}
      <div class="fab-text" bind:this={textEl}>
        {#if typeof text === 'function'}
          {@render text?.()}
        {:else if typeof text !== 'undefined'}
          {text}
        {/if}
      </div>
    {/if}
    {#if typeof link === 'function'}
      {@render link?.()}
    {:else if typeof link !== 'undefined'}
      {link}
    {/if}
  </a>
  {#if typeof root === 'function'}
    {@render root?.()}
  {:else if typeof root !== 'undefined'}
    {root}
  {/if}
</div>
