<script>
  import { onMount, onDestroy } from 'svelte';

  import Mixins from '../utils/mixins';
  import Utils from '../utils/utils';
  import restProps from '../utils/rest-props';
  import f7 from '../utils/f7';

  let className = undefined;
  export { className as class };

  export let tooltip = undefined;
  export let tooltipTrigger = undefined;

  let el;
  let f7Tooltip;

  $: classes = Utils.classNames(
    className,
    'badge',
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
