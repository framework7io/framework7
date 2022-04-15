<script>
  import { createEventDispatcher } from 'svelte';

  import { colorClasses } from '../shared/mixins.js';
  import { classNames, plainText, createEmitter } from '../shared/utils.js';
  import { restProps } from '../shared/rest-props.js';
  import { useTooltip } from '../shared/use-tooltip.js';
  import { useIcon } from '../shared/use-icon.js';

  import UseIcon from './use-icon.svelte';

  const emit = createEmitter(createEventDispatcher, $$props);

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

  $: classes = classNames(
    className,
    'chip',
    {
      'chip-outline': outline,
    },
    colorClasses($$props),
  );

  $: mediaClasses = classNames(
    'chip-media',
    mediaTextColor && `text-color-${mediaTextColor}`,
    mediaBgColor && `bg-color-${mediaBgColor}`,
  );

  // eslint-disable-next-line
  $: hasMediaSlots = $$slots.media;
  // eslint-disable-next-line
  $: hasTextSlots = $$slots.text;
  // eslint-disable-next-line
  $: hasDefaultSlots = $$slots.default;

  $: icon = useIcon($$props);

  function onClick(e) {
    emit('click', [e]);
  }
  function onDeleteClick(e) {
    emit('delete', [e]);
  }
</script>

<!-- svelte-ignore a11y-missing-attribute -->
<!-- svelte-ignore a11y-missing-content -->
<div
  bind:this={el}
  class={classes}
  on:click={onClick}
  {...restProps($$restProps)}
  use:useTooltip={{ tooltip, tooltipTrigger }}
>
  {#if media || hasMediaSlots || icon}
    <div class={mediaClasses}>
      {#if icon}
        <UseIcon {icon} />
      {/if}
      {plainText(media)}
      <slot name="media" />
    </div>
  {/if}
  {#if text || hasTextSlots || hasDefaultSlots}
    <div class="chip-label">
      {plainText(text)}
      <slot name="text" />
      <slot />
    </div>
  {/if}
  {#if deleteable}<a class="chip-delete" on:click={onDeleteClick} />{/if}
</div>
