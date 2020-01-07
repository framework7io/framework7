<script>
  import { createEventDispatcher } from 'svelte';
  import Mixins from '../utils/mixins';
  import Utils from '../utils/utils';

  const dispatch = createEventDispatcher();

  export let id = undefined;
  export let style = undefined;

  let className = undefined;
  export { className as class };

  export let image = undefined;
  export let deletable = true;

  $: classes = Utils.classNames(
    className,
    'messagebar-attachment',
    Mixins.colorClasses($$props),
  );

  function onClick(event) {
    dispatch('attachmentClick', [event]);
    if (typeof $$props.onAttachmentClick === 'function') $$props.onAttachmentClick(event);
  }

  function onDeleteClick(event) {
    dispatch('attachmentDelete', [event]);
    if (typeof $$props.onAttachmentDelete === 'function') $$props.onAttachmentDelete(event);
  }
</script>
<!-- svelte-ignore a11y-missing-attribute -->
<div on:click={onClick} id={id} style={style} class={classes}>
  {#if image}
    <img src={image} />
  {/if}
  {#if deletable}
    <span on:click={onDeleteClick}  class="messagebar-attachment-delete" />
  {/if}
  <slot />
</div>
