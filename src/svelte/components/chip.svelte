<script>
  import { createEventDispatcher } from 'svelte';

  import Mixins from '../utils/mixins';
  import Utils from '../utils/utils';
  import restProps from '../utils/rest-props';
  import hasSlots from '../utils/has-slots';

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
<div class={classes} on:click={onClick} {...restProps($$restProps)}>
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
