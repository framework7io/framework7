<script>
  import { createEventDispatcher, onMount, afterUpdate, onDestroy } from 'svelte';
  import Mixins from '../utils/mixins';
  import Utils from '../utils/utils';
  import f7 from '../utils/f7';
  import hasSlots from '../utils/has-slots';

  const dispatch = createEventDispatcher();

  export let id = undefined;
  export let style = undefined;

  let className = undefined;
  export { className as class };

  export let morphTo = undefined;
  export let href = undefined;
  export let target = undefined;
  export let text = undefined;
  export let position = 'right-bottom';
  export let tooltip = undefined;
  export let f7Slot = 'fixed';

  let el;
  let linkEl;
  let textEl;
  let f7Tooltip;

  $: hrefComputed = href === true ? '#' : href || undefined;

  // eslint-disable-next-line
  $: hasTextSlots = hasSlots(arguments, 'text');

  $: classes = Utils.classNames(
    className,
    'fab',
    `fab-${position}`,
    {
      'fab-morph': morphTo,
      'fab-extended': text || hasTextSlots || typeof textEl !== 'undefined',
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
        targetEl: linkEl,
        text: newText,
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
      const dom7 = f7.instance.$;
      const rootEls = dom7(linkEl).children('.fab-buttons');
      if (rootEls.length) {
        dom7(el).append(rootEls);
      }
      if (tooltip) {
        f7Tooltip = f7.instance.tooltip.create({
          targetEl: linkEl,
          text: tooltip,
        });
      }
    });
  });
  afterUpdate(() => {
    if (!f7.instance) return;
    const dom7 = f7.instance.$;
    const rootEls = dom7(linkEl).children('.fab-buttons');
    if (rootEls.length) {
      dom7(el).append(rootEls);
    }
  });
  onDestroy(() => {
    if (f7Tooltip && f7Tooltip.destroy) {
      f7Tooltip.destroy();
      f7Tooltip = null;
    }
  });

</script>

<div
  id={id}
  style={style}
  class={classes}
  data-morph-to={morphTo}
  bind:this={el}
  data-f7-slot={f7Slot}
>
  <a bind:this={linkEl} on:click={onClick} target={target} href={hrefComputed}>
    <slot />
    {#if typeof text !== 'undefined' || hasTextSlots}
      <div class="fab-text" bind:this={textEl}>{Utils.text(text)}<slot name="text" /></div>
    {/if}
    <slot name="link" />
  </a>
  <slot name="root" />
</div>
