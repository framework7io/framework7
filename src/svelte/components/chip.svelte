<script>
  import { createEventDispatcher } from 'svelte';

  import { colorClasses } from '../shared/mixins';
  import { classNames, plainText, createEmitter } from '../shared/utils';
  import { restProps } from '../shared/rest-props';
  import { hasSlots } from '../shared/has-slots';
  import { useTooltip } from '../shared/use-tooltip';
  import { useIcon } from '../shared/use-icon';

  import UseIcon from './use-icon';

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
  $: hasMediaSlots = hasSlots(arguments, 'media');
  // eslint-disable-next-line
  $: hasTextSlots = hasSlots(arguments, 'text');
  // eslint-disable-next-line
  $: hasDefaultSlots = hasSlots(arguments, 'default');

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
  use:useTooltip={{ tooltip, tooltipTrigger }}>
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
