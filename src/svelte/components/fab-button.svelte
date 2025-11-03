<script>
  import { colorClasses } from '../shared/mixins.js';
  import { classNames, plainText } from '../shared/utils.js';
  import { useTooltip } from '../shared/use-tooltip.js';

  let {
    class: className,
    fabClose = false,
    label = undefined,
    target = undefined,
    tooltip = undefined,
    tooltipTrigger = undefined,
    children,
    ...restProps
  } = $props();

  let el = $state(null);

  const classes = $derived(
    classNames(
      className,
      { 'fab-close': fabClose, 'fab-label-button': label },
      colorClasses(restProps),
    ),
  );
</script>

<a
  bind:this={el}
  {target}
  class={classes}
  {...restProps}
  use:useTooltip={{ tooltip, tooltipTrigger }}
>
  {@render children?.()}
  {#if typeof label !== 'undefined'}
    <span class="fab-label">{plainText(label)}</span>
  {/if}
</a>
