<script>
  import { createEventDispatcher, onMount, onDestroy } from 'svelte';
  import Mixins from '../utils/mixins';
  import Utils from '../utils/utils';
  import restProps from '../utils/rest-props';
  import f7 from '../utils/f7';

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

  $: classes = Utils.classNames(
    className,
    {
      'fab-close': fabClose,
      'fab-label-button': label,
    },
    Mixins.colorClasses($$props),
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
    if (newText && !f7Tooltip && f7.instance) {
      f7Tooltip = f7.instance.tooltip.create({
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
    f7.ready(() => {
      if (tooltip) {
        f7Tooltip = f7.instance.tooltip.create({
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
    <span class="fab-label">{Utils.text(label)}</span>
  {/if}
</a>
