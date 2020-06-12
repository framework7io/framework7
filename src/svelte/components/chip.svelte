<script>
  import { createEventDispatcher, onMount, onDestroy } from 'svelte';

  import Mixins from '../utils/mixins';
  import Utils from '../utils/utils';
  import restProps from '../utils/rest-props';
  import hasSlots from '../utils/has-slots';
  import f7 from '../utils/f7';

  import Icon from './icon.svelte';

  const dispatch = createEventDispatcher();

  let className = undefined;
  export { className as class };

  export let media = undefined;
  export let text = undefined;
  export let deleteable = undefined;
  export let mediaBgColor = undefined;
  export let mediaTextColor = undefined;
  export let outline = undefined;

  export let tooltip = undefined;
  export let tooltipTrigger = undefined;

  let el;
  let f7Tooltip;

  $: classes = Utils.classNames(
    className,
    'chip',
    {
      'chip-outline': outline,
    },
    Mixins.colorClasses($$props),
  );

  $: mediaClasses = Utils.classNames(
    'chip-media',
    mediaTextColor && `text-color-${mediaTextColor}`,
    mediaBgColor && `bg-color-${mediaBgColor}`,
  );

  // eslint-disable-next-line
  $: hasMediaSlots = hasSlots(arguments, 'media');
  // eslint-disable-next-line
  $: hasTextSlots = hasSlots(arguments, 'text');
  // eslint-disable-next-line
  $: hasDefaultSlots = hasSlots(arguments, 'default');

  $: hasIcon = $$props.icon || $$props.iconMaterial || $$props.iconF7 || $$props.iconMd || $$props.iconIos || $$props.iconAurora;

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

  function onClick(e) {
    dispatch('click', [e]);
    if (typeof $$props.onClick === 'function') $$props.onClick(e);
  }
  function onDeleteClick(e) {
    dispatch('delete', [e]);
    if (typeof $$props.onDelete === 'function') $$props.onDelete(e);
  }

</script>
<!-- svelte-ignore a11y-missing-attribute -->
<!-- svelte-ignore a11y-missing-content -->
<div bind:this={el} class={classes} on:click={onClick} {...restProps($$restProps)}>
  {#if media || hasMediaSlots || hasIcon}
    <div class={mediaClasses}>
      {#if hasIcon}
        <Icon
          material={$$props.iconMaterial}
          f7={$$props.iconF7}
          icon={$$props.icon}
          md={$$props.iconMd}
          ios={$$props.iconIos}
          aurora={$$props.iconAurora}
          color={$$props.iconColor}
          size={$$props.iconSize}
        />
      {/if}
      {Utils.text(media)}
      <slot name="media" />
    </div>
  {/if}
  {#if text || hasTextSlots || hasDefaultSlots}
    <div class="chip-label">
      {Utils.text(text)}
      <slot name="text" />
      <slot />
    </div>
  {/if}
  {#if deleteable}
    <a class="chip-delete" on:click={onDeleteClick} />
  {/if}
</div>
