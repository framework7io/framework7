<script>
  import { createEventDispatcher } from 'svelte';
  import { colorClasses } from '../shared/mixins';
  import { classNames } from '../shared/utils';
  import { restProps } from '../shared/rest-props';

  const dispatch = createEventDispatcher();

  let className = undefined;
  export { className as class };

  export let image = undefined;
  export let deletable = true;

  $: classes = classNames(className, 'messagebar-attachment', colorClasses($$props));

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
<div on:click={onClick} class={classes} {...restProps($$restProps)}>
  {#if image}
    <img src={image} />
  {/if}
  {#if deletable}
    <span on:click={onDeleteClick}  class="messagebar-attachment-delete" />
  {/if}
  <slot />
</div>
