<script>
  import { colorClasses } from '../shared/mixins.js';
  import { classNames } from '../shared/utils.js';
  import { useTooltip } from '../shared/use-tooltip.js';
  import { useIcon } from '../shared/use-icon.js';

  import UseIcon from './use-icon.svelte';


  let {
    class: className,
    media = undefined,
    text = undefined,
    deleteable = undefined,
    mediaBgColor = undefined,
    mediaTextColor = undefined,
    outline = undefined,
    tooltip = undefined,
    tooltipTrigger = undefined,
    children,
    ...restProps
  } = $props();

  let el;

  const classes = $derived(classNames(
    className,
    'chip',
    {
      'chip-outline': outline,
    },
    colorClasses(restProps),
  ));

  const mediaClasses = $derived(classNames(
    'chip-media',
    mediaTextColor && `text-color-${mediaTextColor}`,
    mediaBgColor && `bg-color-${mediaBgColor}`,
  ));

  const icon = $derived(useIcon(restProps));

  function onDeleteClick(e) {
    restProps.deleteClick?.(e);
  }
</script>

<!-- svelte-ignore a11y-missing-attribute -->
<!-- svelte-ignore a11y-missing-content -->
<div
  bind:this={el}
  class={classes}
  {...restProps}
  use:useTooltip={{ tooltip, tooltipTrigger }}
>
  {#if media || icon}
    <div class={mediaClasses}>
      {#if icon}
        <UseIcon {icon} />
      {/if}
      {#if media}
        {#if typeof media === 'function'}
          {@render media?.()}
        {:else}
          {media}
        {/if}
      {/if}
    </div>
  {/if}
  <div class="chip-label">
    {#if text}
      {#if typeof text === 'function'}
        {@render text?.()}
      {:else}
        {text}
      {/if}
    {/if}

    {@render children?.()}
  </div>
  {#if deleteable}<a class="chip-delete" onclick={onDeleteClick} />{/if}
</div>
