<script>
  import { createEventDispatcher, onMount, onDestroy } from 'svelte';
  import { colorClasses } from '../shared/mixins';
  import { classNames, plainText } from '../shared/utils';
  import { restProps } from '../shared/rest-props';
  import { f7, f7ready } from '../shared/f7';

  const dispatch = createEventDispatcher();

  let className = undefined;
  export { className as class };

  export let fabClose = false;
  export let label = undefined;
  export let target = undefined;
  export let tooltip = undefined;
  export let tooltipTrigger = undefined;

  let el;
  let f7Tooltip;

  $: classes = classNames(
    className,
    {
      'fab-close': fabClose,
      'fab-label-button': label,
    },
    colorClasses($$props),
  );

  let tooltipText = tooltip;
  function watchTooltip(newText) {
    const oldText = tooltipText;
    if (oldText === newText) return;
    tooltipText = newText;
    if (!newText && f7Tooltip) {
      f7Tooltip.destroy();
      f7Tooltip = null;
      return;
    }
    if (newText && !f7Tooltip && f7) {
      f7Tooltip = f7.tooltip.create({
        targetEl: el,
        text: newText,
        trigger: tooltipTrigger,
      });
      return;
    }
    if (!newText || !f7Tooltip) return;
    f7Tooltip.setText(newText);
  }
  $: watchTooltip(tooltip);

  function onClick() {
    dispatch('click');
    if (typeof $$props.onClick === 'function') $$props.onClick();
  }

  onMount(() => {
    f7ready(() => {
      if (tooltip) {
        f7Tooltip = f7.tooltip.create({
          targetEl: el,
          text: tooltip,
          trigger: tooltipTrigger,
        });
      }
    });
  });
  onDestroy(() => {
    if (f7Tooltip && f7Tooltip.destroy) {
      f7Tooltip.destroy();
      f7Tooltip = null;
    }
  });
</script>

<!-- svelte-ignore a11y-missing-attribute -->
<a
  bind:this={el}
  target={target}
  class={classes}
  on:click={onClick}
  {...restProps($$restProps)}
>
  <slot />
  {#if typeof label !== 'undefined'}
    <span class="fab-label">{plainText(label)}</span>
  {/if}
</a>
