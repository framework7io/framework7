<script>
  import { createEventDispatcher } from 'svelte';
  import { colorClasses } from '../shared/mixins';
  import { classNames, createEmitter } from '../shared/utils';
  import { restProps } from '../shared/rest-props';

  const emit = createEmitter(createEventDispatcher, $$props);

  let className = undefined;
  export { className as class };

  export let image = undefined;
  export let deletable = true;

  $: classes = classNames(className, 'messagebar-attachment', colorClasses($$props));

  function onClick(event) {
    emit('attachmentClick', [event]);
  }

  function onDeleteClick(event) {
    emit('attachmentDelete', [event]);
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
