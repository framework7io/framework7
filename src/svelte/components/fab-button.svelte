<script>
  import { createEventDispatcher } from 'svelte';
  import { colorClasses } from '../shared/mixins.js';
  import { classNames, plainText, createEmitter } from '../shared/utils.js';
  import { restProps } from '../shared/rest-props.js';
  import { useTooltip } from '../shared/use-tooltip.js';

  const emit = createEmitter(createEventDispatcher, $$props);

  let className = undefined;
  export { className as class };

  export let fabClose = false;
  export let label = undefined;
  export let target = undefined;
  export let tooltip = undefined;
  export let tooltipTrigger = undefined;

  let el;

  $: classes = classNames(
    className,
    {
      'fab-close': fabClose,
      'fab-label-button': label,
    },
    colorClasses($$props),
  );

  function onClick() {
    emit('click');
  }
</script>

<!-- svelte-ignore a11y-missing-attribute -->
<a
  bind:this={el}
  {target}
  class={classes}
  on:click={onClick}
  {...restProps($$restProps)}
  use:useTooltip={{ tooltip, tooltipTrigger }}
>
  <slot />
  {#if typeof label !== 'undefined'}
    <span class="fab-label">{plainText(label)}</span>
  {/if}
</a>
