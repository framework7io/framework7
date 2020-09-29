<script>
  import { onMount, onDestroy } from 'svelte';

  import { colorClasses } from '../shared/mixins';
  import { classNames } from '../shared/utils';
  import { restProps } from '../shared/rest-props';
  import { f7 } from '../shared/f7';

  let className = undefined;
  export { className as class };

  export let tooltip = undefined;
  export let tooltipTrigger = undefined;

  let el;
  let f7Tooltip;

  $: classes = classNames(className, 'badge', colorClasses($$props));

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

  onMount(() => {
    if (!tooltip) return;
    f7.ready(() => {
      f7Tooltip = f7.instance.tooltip.create({
        targetEl: el,
        text: tooltip,
        trigger: tooltipTrigger,
      });
    });
  });

  onDestroy(() => {
    if (f7Tooltip && f7Tooltip.destroy) {
      f7Tooltip.destroy();
      f7Tooltip = null;
    }
  });
</script>

<span class={classes} {...restProps($$restProps)}>
  <slot />
</span>
