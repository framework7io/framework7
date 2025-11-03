<script>
  let { content } = $props();
</script>

{#if typeof content === 'function'}
  {@render content?.()}
{:else if typeof content !== 'undefined'}
  {content}
{/if}
