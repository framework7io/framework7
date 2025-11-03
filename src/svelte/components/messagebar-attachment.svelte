<script>
  import { colorClasses } from '../shared/mixins.js';
  import { classNames } from '../shared/utils.js';

  let { class: className, image = undefined, deletable = true, children, ...restProps } = $props();

  const classes = $derived(classNames(className, 'messagebar-attachment', colorClasses(restProps)));

  function onClick(event) {
    restProps.onAttachmentClick?.();
    restProps.onattachmentclick?.();
  }

  function onDeleteClick(event) {
    restProps.onAttachmentDelete?.();
    restProps.onattachmentdelete?.();
  }
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div onclick={onClick} class={classes} {...restProps}>
  {#if image && typeof image === 'string'}
    <img src={image} />
  {/if}
  {#if typeof image === 'function'}
    {@render image?.()}
  {/if}
  {#if deletable}
    <span onclick={onDeleteClick} class="messagebar-attachment-delete"></span>
  {/if}
  {@render children?.()}
</div>
