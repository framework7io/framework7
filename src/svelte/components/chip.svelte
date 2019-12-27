<script>
  import { createEventDispatcher } from 'svelte';

  import Mixins from '../utils/mixins';
  import Utils from '../utils/utils';
  import hasSlots from '../utils/has-slots';

  const dispatch = createEventDispatcher();

  export let id = undefined;
  export let style = undefined;

  let className = undefined;
  export { className as class };

  export let media = undefined;
  export let text = undefined;
  export let deleteable = undefined;
  export let mediaBgColor = undefined;
  export let mediaTextColor = undefined;
  export let outline = undefined;

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

  $: hasMediaSlots = hasSlots(arguments, 'media');
  $: hasTextSlots = hasSlots(arguments, 'text');

  function onClick() {
    dispatch('click');
  }
  function onDeleteClick() {
    dispatch('delete');
  }

</script>

<div id={id} style={style} class={classes} on:click={onClick}>
  {#if media || hasMediaSlots}
    <div class={mediaClasses}>
      {media}
      <slot name="media" />
    </div>
  {/if}
  {#if text || hasTextSlots}
    <div class="chip-label">
      {text}
      <slot name="text" />
    </div>
  {/if}
  {#if deleteable}
    <a class="chip-delete" on:click={onDeleteClick} />
  {/if}
</div>
